/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/

import { BigNumber } from "bignumber.js";
import { EIP712TypeMap, IEIP712Domain, MessageTypes, TypedMessage } from "./types";
import { EIP712DomainAbi } from "./constants";
const Web3 = Web3Lib(); // tslint:disable-line

function Web3Lib() {
    if (typeof window !== "undefined" && window["Web3"])
        return window["Web3"];
    else
    return require("./web3");
};
export function sleep(millisecond: number) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(null);
        }, millisecond);
    });
};
export function numberToBytes32(value: number | BigNumber, prefix?: boolean) {
    let v = new BigNumber(value).toString(16)
    v = v.replace("0x", "");
    v = padLeft(v, 64);
    if (prefix)
        v = '0x' + v
    return v;
}
export function padLeft(string: string, chars: number, sign?: string): string {
    return new Array(chars - string.length + 1).join(sign ? sign : "0") + string;
}
export function padRight(string: string, chars: number, sign?: string): string {
    return string + new Array(chars - string.length + 1).join(sign ? sign : "0");
}

type stringArray = string | _stringArray;
interface _stringArray extends Array<stringArray> { }

export function stringToBytes32(value: string | stringArray): string | string[] {
    if (Array.isArray(value)) {
        let result = [];
        for (let i = 0; i < value.length; i++) {
            result.push(stringToBytes32(value[i]));
        }
        return result;
    }
    else {
        if (value.length == 66 && value.startsWith('0x'))
            return value;
        return Web3.utils.padRight(Web3.utils.asciiToHex(value), 64)
    }
}
export function stringToBytes(value: string | stringArray, nByte?: number): string | string[] {
    if (Array.isArray(value)) {
        let result = [];
        for (let i = 0; i < value.length; i++) {
            result.push(stringToBytes(value[i]));
        }
        return result;
    }
    else {
        if (nByte) {
            if (new RegExp(`^0x[0-9a-fA-F]{${2 * nByte}}$`).test(value))
                return value;
            else if (/^0x([0-9a-fA-F][0-9a-fA-F])*$/.test(value)) {
                if (value.length >= ((nByte * 2) + 2))
                    return value;
                else
                    return "0x" + value.substring(2) + "00".repeat(nByte - ((value.length - 2) / 2));
            } else if (/^([0-9a-fA-F][0-9a-fA-F])+$/.test(value)) {
                if (value.length >= (nByte * 2))
                    return value;
                else
                    return "0x" + value + "00".repeat(nByte - (value.length / 2));
            } else
                return Web3.utils.padRight(Web3.utils.asciiToHex(value), nByte * 2)
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
export function addressToBytes32(value: string, prefix?: boolean): string {
    let v = value
    v = v.replace("0x", "");
    v = padLeft(v, 64);
    if (prefix)
        v = '0x' + v;
    return v;
}
export function bytes32ToAddress(value: string): string {
    return '0x' + value.replace('0x000000000000000000000000', '');
}
export function bytes32ToString(value: string): string {
    return Web3.utils.hexToUtf8(value);
}
export function addressToBytes32Right(value: string, prefix?: boolean): string {
    let v = value
    v = v.replace("0x", "");
    v = padRight(v, 64);
    if (prefix)
        v = '0x' + v;
    return v;
}
export function toNumber(value: string | number | BigNumber): number {
    if (typeof (value) == 'number')
        return value
    else if (typeof (value) == 'string')
        return new BigNumber(value).toNumber()
    else
        return value.toNumber()
}
export function toDecimals(value: BigNumber | number | string, decimals?: number): BigNumber {
    decimals = decimals || 18;
    return new BigNumber(value).shiftedBy(decimals);
}
export function fromDecimals(value: BigNumber | number | string, decimals?: number): BigNumber {
    decimals = decimals || 18;
    return new BigNumber(value).shiftedBy(-decimals);
}
export function toString(value: any) {
    if (Array.isArray(value)) {
        let result = [];
        for (let i = 0; i < value.length; i++) {
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

export function constructTypedMessageData(
    domain: IEIP712Domain,
    customTypes: EIP712TypeMap,
    primaryType: string,
    message: Record<string, unknown>
) {
    let data: TypedMessage<MessageTypes> = {
        types: {
            EIP712Domain: EIP712DomainAbi,
            ...customTypes
        },
        primaryType: primaryType,
        domain: domain,
        message: message
    };
    return data;
}

export function getMultiCallAddress(chainId: number) {
    let address;
    switch (chainId) {
        case 1:
            address = '0x8d035edd8e09c3283463dade67cc0d49d6868063';
            break;        
        case 56:
            address = '0x804708de7af615085203fa2b18eae59c5738e2a9';
            break;
        case 97:
            address = '0xFe482bde67982C73D215032184312E4707B437C1';
            break;
        case 137:
            address = '0x0196e8a9455a90d392b46df8560c867e7df40b34';
            break;      
        case 250:
            address = '0xA31bB36c5164B165f9c36955EA4CcBaB42B3B28E';
            break;             
        case 43113:
            address = '0x40784b92542649DDA13FF97580e8A021aC57b320';
            break;       
        case 43114:
            address = '0xC4A8B7e29E3C8ec560cd4945c1cF3461a85a148d';
            break;   
        case 80001:
            address = '0x7810eC500061f5469fF6e1485Ab130045B3af6b0';
            break;        
        case 421613:
            address = '0xee25cCcc02550DdBF4b90eb06b0D796eBE247E1B';
            break;             
        case 42161:
            address = '0x11DEE30E710B8d4a8630392781Cc3c0046365d4c';
            break;               
    }
    return address;
}