"use strict";
/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMultiCallAddress = exports.constructTypedMessageData = exports.nullAddress = exports.toString = exports.fromDecimals = exports.toDecimals = exports.toNumber = exports.addressToBytes32Right = exports.bytes32ToString = exports.bytes32ToAddress = exports.addressToBytes32 = exports.stringToBytes = exports.stringToBytes32 = exports.padRight = exports.padLeft = exports.numberToBytes32 = exports.sleep = void 0;
const bignumber_js_1 = require("bignumber.js");
const constants_1 = require("./constants");
const Web3 = Web3Lib();
function Web3Lib() {
    if (typeof window !== "undefined" && window["Web3"])
        return window["Web3"];
    else
        return require("./web3");
}
;
function sleep(millisecond) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(null);
        }, millisecond);
    });
}
exports.sleep = sleep;
;
function numberToBytes32(value, prefix) {
    let v = new bignumber_js_1.BigNumber(value).toString(16);
    v = v.replace("0x", "");
    v = padLeft(v, 64);
    if (prefix)
        v = '0x' + v;
    return v;
}
exports.numberToBytes32 = numberToBytes32;
function padLeft(string, chars, sign) {
    return new Array(chars - string.length + 1).join(sign ? sign : "0") + string;
}
exports.padLeft = padLeft;
function padRight(string, chars, sign) {
    return string + new Array(chars - string.length + 1).join(sign ? sign : "0");
}
exports.padRight = padRight;
function stringToBytes32(value) {
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
        return Web3.utils.padRight(Web3.utils.asciiToHex(value), 64);
    }
}
exports.stringToBytes32 = stringToBytes32;
function stringToBytes(value, nByte) {
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
            }
            else if (/^([0-9a-fA-F][0-9a-fA-F])+$/.test(value)) {
                if (value.length >= (nByte * 2))
                    return value;
                else
                    return "0x" + value + "00".repeat(nByte - (value.length / 2));
            }
            else
                return Web3.utils.padRight(Web3.utils.asciiToHex(value), nByte * 2);
        }
        else {
            if (/^0x([0-9a-fA-F][0-9a-fA-F])*$/.test(value))
                return value;
            else if (/^([0-9a-fA-F][0-9a-fA-F])+$/.test(value))
                return "0x" + value;
            else
                return Web3.utils.asciiToHex(value);
        }
    }
}
exports.stringToBytes = stringToBytes;
function addressToBytes32(value, prefix) {
    let v = value;
    v = v.replace("0x", "");
    v = padLeft(v, 64);
    if (prefix)
        v = '0x' + v;
    return v;
}
exports.addressToBytes32 = addressToBytes32;
function bytes32ToAddress(value) {
    return '0x' + value.replace('0x000000000000000000000000', '');
}
exports.bytes32ToAddress = bytes32ToAddress;
function bytes32ToString(value) {
    return Web3.utils.hexToUtf8(value);
}
exports.bytes32ToString = bytes32ToString;
function addressToBytes32Right(value, prefix) {
    let v = value;
    v = v.replace("0x", "");
    v = padRight(v, 64);
    if (prefix)
        v = '0x' + v;
    return v;
}
exports.addressToBytes32Right = addressToBytes32Right;
function toNumber(value) {
    if (typeof (value) == 'number')
        return value;
    else if (typeof (value) == 'string')
        return new bignumber_js_1.BigNumber(value).toNumber();
    else
        return value.toNumber();
}
exports.toNumber = toNumber;
function toDecimals(value, decimals) {
    decimals = decimals || 18;
    return new bignumber_js_1.BigNumber(value).shiftedBy(decimals);
}
exports.toDecimals = toDecimals;
function fromDecimals(value, decimals) {
    decimals = decimals || 18;
    return new bignumber_js_1.BigNumber(value).shiftedBy(-decimals);
}
exports.fromDecimals = fromDecimals;
function toString(value) {
    if (Array.isArray(value)) {
        let result = [];
        for (let i = 0; i < value.length; i++) {
            result.push(toString(value[i]));
        }
        return result;
    }
    else if (typeof value === "number")
        return value.toString(10);
    else if (bignumber_js_1.BigNumber.isBigNumber(value))
        return value.toFixed();
    else
        return value;
}
exports.toString = toString;
exports.nullAddress = "0x0000000000000000000000000000000000000000";
function constructTypedMessageData(domain, customTypes, primaryType, message) {
    let data = {
        types: Object.assign({ EIP712Domain: constants_1.EIP712DomainAbi }, customTypes),
        primaryType: primaryType,
        domain: domain,
        message: message
    };
    return data;
}
exports.constructTypedMessageData = constructTypedMessageData;
function getMultiCallAddress(chainId) {
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
exports.getMultiCallAddress = getMultiCallAddress;
