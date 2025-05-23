/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/

import { BigNumber } from "bignumber.js";
import { EIP712TypeMap, IEIP712Domain, MessageTypes, TypedMessage } from "./types";
import { EIP712DomainAbi } from "./constants";
import { ISendTxEventsOptions, Wallet } from "./wallet";

let EthersLib: any;
if (typeof window !== "undefined") {
    EthersLib = window["ethers"];
} else {
    EthersLib = require("ethers");
}

// let Web3 = initWeb3Lib(); // tslint:disable-line

// export function initWeb3Lib() {
//     if (typeof window !== "undefined") {
//         Web3 = window["Web3"];
//         return window["Web3"]
//     }
//     else {
//         let { Web3 } = require("./web3");
//         return Web3;
//     };
// };
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
    } else {
        if (value.length === 66 && value.startsWith('0x')) {
            return value; 
        }

        let hex = '0x' + Array.from(value)
            .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
            .join('');

        if (hex.length < 66) {
            hex = hex.padEnd(66, '0');
        }
        return hex;
    }
}
export function stringToBytes(value: string | stringArray, nByte?: number): string | string[] {
    if (Array.isArray(value)) {
        let result = [];
        for (let i = 0; i < value.length; i++) {
            result.push(stringToBytes(value[i], nByte));
        }
        return result;
    } else {
        if (nByte) {
            if (new RegExp(`^0x[0-9a-fA-F]{${2 * nByte}}$`).test(value)) {
                return value;
            }
            else if (/^0x([0-9a-fA-F][0-9a-fA-F])*$/.test(value)) {
                if (value.length >= ((nByte * 2) + 2)) {
                    return value;
                } else {
                    return "0x" + value.substring(2).padEnd(nByte * 2, "0");
                }
            }
            else if (/^([0-9a-fA-F][0-9a-fA-F])+$/.test(value)) {
                if (value.length >= (nByte * 2)) {
                    return value;
                } else {
                    return "0x" + value.padEnd(nByte * 2, "0");
                }
            }
            else {
                const hex = "0x" + Array.from(value)
                    .map(char => char.charCodeAt(0).toString(16).padStart(2, "0"))
                    .join("");
                return hex.padEnd(nByte * 2 + 2, "0");
            }
        } else {
            if (/^0x([0-9a-fA-F][0-9a-fA-F])*$/.test(value)) {
                return value;
            } else if (/^([0-9a-fA-F][0-9a-fA-F])+$/.test(value)) {
                return "0x" + value;
            } else {
                return "0x" + Array.from(value)
                    .map(char => char.charCodeAt(0).toString(16).padStart(2, "0"))
                    .join("");
            }
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
    if (!value.startsWith("0x")) {
        throw new Error("Invalid bytes32 value. It must start with '0x'.");
    }

    const hex = value.slice(2);

    let result = "";
    for (let i = 0; i < hex.length; i += 2) {
        const charCode = parseInt(hex.substring(i, i + 2), 16);
        if (charCode === 0) {
            break; 
        }
        result += String.fromCharCode(charCode);
    }

    return result;
}
export function addressToBytes32Right(value: string, prefix?: boolean): string {
    let v = value
    v = v.replace("0x", "");
    v = padRight(v, 64);
    if (prefix)
        v = '0x' + v;
    return v;
}
export function toNumber(value: string | number | BigNumber | bigint): number {
    if (typeof value === 'number') {
        return value;
    } else if (typeof value === 'string') {
        return new BigNumber(value).toNumber();
    } else if (typeof value === "bigint") {
        return Number(value);
    } else {
        return (value as BigNumber).toNumber();
    }
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

export function soliditySha3(...val: any[]) {
    const ethers = EthersLib.ethers;
    const types: string[] = [];
    const values: any[] = [];
    val.forEach(arg => {
        if (typeof arg === 'object' && arg !== null && 'type' in arg && 'value' in arg) {
            types.push(arg.type);
            values.push(arg.value);
        } else {
            throw new Error("Invalid input format for soliditySha3. Expected {type: string, value: any}.");
        }
    });
    const soliditySha3Value = ethers.solidityPackedKeccak256(types, values);
    return soliditySha3Value;
}
export function toChecksumAddress(address: string) {
    const ethers = EthersLib.ethers;
    return ethers.getAddress(address);
}

export function registerSendTxEvents(sendTxEventHandlers: ISendTxEventsOptions) {
    const wallet = Wallet.getClientInstance();
    wallet.registerSendTxEvents({
        transactionHash: (error: Error, receipt?: string) => {
            if (sendTxEventHandlers.transactionHash) {
                sendTxEventHandlers.transactionHash(error, receipt);
            }
        },
        confirmation: (receipt: any) => {
            if (sendTxEventHandlers.confirmation) {
                sendTxEventHandlers.confirmation(receipt);
            }
        },
    })
}

export function uint8ArrayToHex(byteArray: Uint8Array): string {
    let ret = '';
    byteArray.forEach(e => { ret += e.toString(16).padStart(2, "0"); });
    return ret;
}
export function stringToUnicodeHex(str: string): string {
    return str.split('').map(e => (e.codePointAt(0) as number).toString(16).padStart(2, "0")).join('');
}
export function hexToString(hex: string): string {
    let ret = '';
    for (let i = 0; i < hex.length; i += 2) {
        ret += String.fromCharCode(parseInt(hex.substring(i, i + 2), 16));
    }
    return ret;
}