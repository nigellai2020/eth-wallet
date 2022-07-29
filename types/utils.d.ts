import { BigNumber } from "bignumber.js";
import { Wallet } from "./wallet";
export declare function sleep(millisecond: number): Promise<unknown>;
export declare function numberToBytes32(value: number | BigNumber, prefix?: boolean): string;
export declare function padLeft(string: string, chars: number, sign?: string): string;
export declare function padRight(string: string, chars: number, sign?: string): string;
declare type stringArray = string | _stringArray;
interface _stringArray extends Array<stringArray> {
}
export declare function stringToBytes32(value: string | stringArray): string | string[];
export declare function stringToBytes(value: string | stringArray, nByte?: number): string | string[];
export declare function addressToBytes32(value: string, prefix?: boolean): string;
export declare function bytes32ToAddress(value: string): string;
export declare function bytes32ToString(value: string): string;
export declare function addressToBytes32Right(value: string, prefix?: boolean): string;
export declare function toNumber(value: string | number | BigNumber): number;
export declare function toDecimals(value: BigNumber | number | string, decimals?: number): BigNumber;
export declare function fromDecimals(value: BigNumber | number | string, decimals?: number): BigNumber;
export declare function toString(value: any): any;
export declare const nullAddress = "0x0000000000000000000000000000000000000000";
export interface IWhitelistTreeData {
    account: string;
    [key: string]: any;
}
export interface IWhitelistTreeABIItem {
    name: string;
    type: string;
}
export declare function getSha3HashBufferFunc(wallet: Wallet, abi: IWhitelistTreeABIItem[]): (treeItem: IWhitelistTreeData) => any;
export declare function generateWhitelistTree(wallet: Wallet, data: IWhitelistTreeData[], abi: IWhitelistTreeABIItem[]): {
    root: any;
    tree: any;
};
export declare function getWhitelistTreeProof(wallet: Wallet, inputRoot: string, rawData: IWhitelistTreeData[], abi: IWhitelistTreeABIItem[]): any;
export {};
