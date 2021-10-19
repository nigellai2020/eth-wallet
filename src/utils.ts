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
export function stringToBytes32(value: string, prefix?: boolean): string{
    if (value.length == 66 && value.startsWith('0x'))
        return value;
    
    let v = value
    v = v.replace("0x", "");
    v = v.split('').map((c) => {c = c.charCodeAt(0).toString(16); return (c.length < 2 ? ("0" + c) : c);}).join('');    
    // v = v.split('').map((c) => {var c = c.charCodeAt(0).toString(16); return (c.length < 2 ? ("0" + c) : c);}).join('');    
    v = padRight(v, 64);
    if (prefix)
        v = '0x' + v;
    return v;
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
export function toString(value:number|BigNumber|number[]|BigNumber[]){
    if (Array.isArray(value)){
        let result = [];
        for (let i = 0; i < value.length; i ++){
            result.push(value[i].toString())
        }
        return result;
    }
    else
        return value.toString();
}