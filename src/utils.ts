import {BigNumber} from "bignumber.js";
const Web3 = require('web3'); // tslint:disable-line

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
export function stringToBytes32(value: string|string[]): string|string[]{
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
            if (typeof value[i] === "number" || BigNumber.isBigNumber(value[i]))
                result.push(value[i].toString(10))
            else
                result.push(value[i]);
        }
        return result;
    }
    else if (typeof value === "number" || BigNumber.isBigNumber(value))
        return value.toString(10);
    else
        return value;
}
export const nullAddress = "0x0000000000000000000000000000000000000000";