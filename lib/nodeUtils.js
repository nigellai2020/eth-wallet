"use strict";
/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMerkleLeavesData = exports.getMerkleProofs = exports.generateMerkleTree = exports.getSha3HashBufferFunc = exports.toChecksumAddress = exports.soliditySha3 = exports.constructTypedMessageData = exports.nullAddress = exports.toString = exports.fromDecimals = exports.toDecimals = exports.toNumber = exports.addressToBytes32Right = exports.bytes32ToString = exports.bytes32ToAddress = exports.addressToBytes32 = exports.stringToBytes = exports.stringToBytes32 = exports.padRight = exports.padLeft = exports.numberToBytes32 = exports.sleep = void 0;
const merkleTree_1 = require("./merkleTree");
const bignumber_js_1 = require("bignumber.js");
const constants_1 = require("./constants");
let EthersLib = initEthersLib();
function initEthersLib() {
    if (typeof window !== "undefined") {
        EthersLib = window["ethers"];
        return window["ethers"];
    }
    else {
        EthersLib = require("ethers");
        return EthersLib;
    }
}
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
exports.stringToBytes32 = stringToBytes32;
function stringToBytes(value, nByte) {
    if (Array.isArray(value)) {
        let result = [];
        for (let i = 0; i < value.length; i++) {
            result.push(stringToBytes(value[i], nByte));
        }
        return result;
    }
    else {
        if (nByte) {
            if (new RegExp(`^0x[0-9a-fA-F]{${2 * nByte}}$`).test(value)) {
                return value;
            }
            else if (/^0x([0-9a-fA-F][0-9a-fA-F])*$/.test(value)) {
                if (value.length >= ((nByte * 2) + 2)) {
                    return value;
                }
                else {
                    return "0x" + value.substring(2).padEnd(nByte * 2, "0");
                }
            }
            else if (/^([0-9a-fA-F][0-9a-fA-F])+$/.test(value)) {
                if (value.length >= (nByte * 2)) {
                    return value;
                }
                else {
                    return "0x" + value.padEnd(nByte * 2, "0");
                }
            }
            else {
                const hex = "0x" + Array.from(value)
                    .map(char => char.charCodeAt(0).toString(16).padStart(2, "0"))
                    .join("");
                return hex.padEnd(nByte * 2 + 2, "0");
            }
        }
        else {
            if (/^0x([0-9a-fA-F][0-9a-fA-F])*$/.test(value)) {
                return value;
            }
            else if (/^([0-9a-fA-F][0-9a-fA-F])+$/.test(value)) {
                return "0x" + value;
            }
            else {
                return "0x" + Array.from(value)
                    .map(char => char.charCodeAt(0).toString(16).padStart(2, "0"))
                    .join("");
            }
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
    if (typeof value === 'number') {
        return value;
    }
    else if (typeof value === 'string') {
        return new bignumber_js_1.BigNumber(value).toNumber();
    }
    else if (typeof value === "bigint") {
        return Number(value);
    }
    else {
        return value.toNumber();
    }
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
function soliditySha3(...val) {
    const ethers = EthersLib.ethers;
    const types = [];
    const values = [];
    val.forEach(arg => {
        if (typeof arg === 'object' && arg !== null && 'type' in arg && 'value' in arg) {
            types.push(arg.type);
            values.push(arg.value);
        }
        else {
            throw new Error("Invalid input format for soliditySha3. Expected {type: string, value: any}.");
        }
    });
    const soliditySha3Value = ethers.solidityPackedKeccak256(types, values);
    return soliditySha3Value;
}
exports.soliditySha3 = soliditySha3;
function toChecksumAddress(address) {
    const ethers = EthersLib.ethers;
    return ethers.getAddress(address);
}
exports.toChecksumAddress = toChecksumAddress;
function getSha3HashBufferFunc(wallet, abi) {
    return (leafData) => {
        let encodePackedInput = abi.map((abiItem) => {
            return {
                t: abiItem.type,
                v: leafData[abiItem.name]
            };
        });
        let hex = wallet.soliditySha3.apply(wallet, encodePackedInput);
        return hex;
    };
}
exports.getSha3HashBufferFunc = getSha3HashBufferFunc;
function generateMerkleTree(wallet, options) {
    const merkleTree = new merkleTree_1.MerkleTree(wallet, options);
    return merkleTree;
}
exports.generateMerkleTree = generateMerkleTree;
function getMerkleProofs(wallet, tree, options) {
    let proofs = [];
    if (options.key) {
        proofs = tree.getHexProofsByKey(options.key);
    }
    else if (options.leafData) {
        let abi = tree.getABI();
        const hashFunc = getSha3HashBufferFunc(wallet, abi);
        let leaf = hashFunc(options.leafData);
        proofs.push(tree.getHexProof(leaf));
    }
    return proofs;
}
exports.getMerkleProofs = getMerkleProofs;
function getMerkleLeavesData(tree, options) {
    let data;
    if (options.key) {
        data = tree.getLeavesDataByKey(options.key);
    }
    else if (options.hash) {
        data.push(tree.getLeafData(options.hash));
    }
    return data;
}
exports.getMerkleLeavesData = getMerkleLeavesData;
