import {BigNumber} from "bignumber.js";
import { Wallet } from "./wallet";
import MerkleTree from './merkleTree';
const Web3 = Web3Lib(); // tslint:disable-line

function Web3Lib(){
	if (typeof window !== "undefined" && window["Web3"])
        return window["Web3"];
	else
        return require("web3");
};
export function sleep(millisecond: number){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(null);
        },millisecond);
    });
};
export function numberToBytes32(value: number|BigNumber, prefix?:boolean) {
    let v = new BigNumber(value).toString(16)
    v = v.replace("0x", "");
    v = padLeft(v, 64);
    if (prefix)
        v = '0x' + v
    return v;
}
export function padLeft(string: string, chars: number, sign?: string): string{
    return new Array(chars - string.length + 1).join(sign ? sign : "0") + string;
}
export function padRight(string: string, chars: number, sign?: string): string{
    return string + new Array(chars - string.length + 1).join(sign ? sign : "0");
}

type stringArray = string | _stringArray;
interface _stringArray extends Array<stringArray>{}

export function stringToBytes32(value: string|stringArray): string|string[]{
    if (Array.isArray(value)){
        let result = [];
        for (let i = 0; i < value.length; i ++){
            result.push(stringToBytes32(value[i]));
        }
        return result;
    }
    else{
        if (value.length == 66 && value.startsWith('0x'))
            return value;
        return Web3.utils.padRight(Web3.utils.asciiToHex(value),64)
    }
}
export function stringToBytes(value: string|stringArray, nByte?: number): string|string[]{
    if (Array.isArray(value)){
        let result = [];
        for (let i = 0; i < value.length; i ++){
            result.push(stringToBytes(value[i]));
        }
        return result;
    }
    else{
        if (nByte){
            if (new RegExp(`^0x[0-9a-fA-F]{${2*nByte}}$`).test(value))
                return value;
            else if (/^0x([0-9a-fA-F][0-9a-fA-F])*$/.test(value)) {
                if (value.length >= ((nByte*2) + 2))
                    return value;
                else
                    return "0x" + value.substring(2) + "00".repeat(nByte-((value.length-2)/2));
            } else if (/^([0-9a-fA-F][0-9a-fA-F])+$/.test(value)) {
                if (value.length >= (nByte*2))
                    return value;
                else 
                    return "0x" + value + "00".repeat(nByte-(value.length/2));
            } else
                return Web3.utils.padRight(Web3.utils.asciiToHex(value), nByte*2)
        } else {
            if (/^0x([0-9a-fA-F][0-9a-fA-F])*$/.test(value))
                return value;
            else if (/^([0-9a-fA-F][0-9a-fA-F])+$/.test(value))
                return "0x" + value;
            else
                return Web3.utils.asciiToHex(value)
        }
    }
}
export function addressToBytes32(value: string, prefix?: boolean): string{
    let v = value
    v = v.replace("0x", "");
    v = padLeft(v, 64);
    if (prefix)
        v = '0x' + v;
    return v;
}
export function bytes32ToAddress(value: string): string{
    return '0x' + value.replace('0x000000000000000000000000','');
}
export function bytes32ToString(value: string): string{
    return Web3.utils.hexToUtf8(value);
}
export function addressToBytes32Right(value: string, prefix?: boolean): string{
    let v = value
    v = v.replace("0x", "");
    v = padRight(v, 64);
    if (prefix)
        v = '0x' + v;
    return v;
}
export function toNumber(value: string|number|BigNumber): number{
    if (typeof(value) == 'number')
        return value
    else if (typeof(value) == 'string')
        return new BigNumber(value).toNumber()
    else
        return value.toNumber()
}
export function toDecimals(value: BigNumber|number|string, decimals?: number): BigNumber{    
    decimals = decimals || 18;
    return new BigNumber(value).shiftedBy(decimals);
}
export function fromDecimals(value: BigNumber|number|string, decimals?: number): BigNumber{
    decimals = decimals || 18;
    return new BigNumber(value).shiftedBy(-decimals);
}
export function toString(value:any){
    if (Array.isArray(value)){
        let result = [];
        for (let i = 0; i < value.length; i ++){
            result.push(toString(value[i]));
        }
        return result;
    }
    else if (typeof value === "number")
        return value.toString(10);
    else if (BigNumber.isBigNumber(value))
        return value.toFixed();
    else
        return value;
}
export const nullAddress = "0x0000000000000000000000000000000000000000";

export interface IWhitelistTreeData {
    account: string;
    [key: string]: any;
}

export interface IWhitelistTreeABIItem {
    name: string;
    type: string;
}

function getSha3HashBufferFunc(wallet: Wallet, abi: IWhitelistTreeABIItem[]){
    return (treeItem: IWhitelistTreeData) => {
        let encodePackedInput = abi.map((abiItem) => {
            return {
                t: abiItem.type,
                v: treeItem[abiItem.name]
            }
        })
        let hex = wallet.soliditySha3(
            { t: "address", v: treeItem.account },
            ...encodePackedInput
        );
        return hex;
    };    
}
export function generateWhitelistTree(wallet: Wallet, data: IWhitelistTreeData[], abi: IWhitelistTreeABIItem[]){
    const hashFunc = getSha3HashBufferFunc(wallet, abi);
    const leaves = data.map((item) => hashFunc(item));
    const merkleTree = MerkleTree.create(wallet, leaves);
    const merkleRoot = merkleTree.getHexRoot();
    return {
        root: merkleRoot,
        tree: merkleTree.toString()
    };
}

export function getWhitelistTreeProof(wallet: Wallet, inputRoot: string, rawData: IWhitelistTreeData[], abi: IWhitelistTreeABIItem[]) {
    const hashFunc = getSha3HashBufferFunc(wallet, abi);
    let accountLeaf: string;
    let leaves: string[] = [];
    for (let item of rawData) {
        let leaf = hashFunc(item);
        if (wallet.address == item.account) {
            accountLeaf = leaf;
        }
        leaves.push(leaf);
    }
    if (!accountLeaf) return null;
    const tree = MerkleTree.create(wallet, leaves);
    const calculatedRoot = tree.getHexRoot();
    if (calculatedRoot != inputRoot) return null;
    const proof = tree.getHexProof(accountLeaf);
    return proof;
}