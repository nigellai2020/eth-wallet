"use strict";
/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverTypedSignature = exports.signTypedDataWithPrivateKey = void 0;
const types_1 = require("./types");
const constants_1 = require("./constants");
const bn_js_1 = __importDefault(require("bn.js"));
const keccak_1 = require("ethereum-cryptography/keccak");
const ethereumjs_util_1 = require("ethereumjs-util");
function encodeType(primaryType, types) {
    let result = '';
    const unsortedDeps = findTypeDependencies(primaryType, types);
    unsortedDeps.delete(primaryType);
    const deps = [primaryType, ...Array.from(unsortedDeps).sort()];
    for (const type of deps) {
        const children = types[type];
        if (!children) {
            throw new Error(`No type definition specified: ${type}`);
        }
        result += `${type}(${types[type]
            .map(({ name, type: t }) => `${t} ${name}`)
            .join(',')})`;
    }
    return result;
}
function isArray(type) {
    return type.lastIndexOf(']') === type.length - 1;
}
function isHexString(value, length) {
    if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/))
        return false;
    if (typeof length !== 'undefined' && length > 0 && value.length !== 2 + 2 * length)
        return false;
    return true;
}
function parseTypeArray(type) {
    const tmp = type.match(/(.*)\[(.*?)\]$/u);
    if (tmp) {
        return tmp[2] === '' ? 'dynamic' : parseInt(tmp[2], 10);
    }
    return null;
}
function elementaryName(name) {
    if (name.startsWith('int[')) {
        return `int256${name.slice(3)}`;
    }
    else if (name === 'int') {
        return 'int256';
    }
    else if (name.startsWith('uint[')) {
        return `uint256${name.slice(4)}`;
    }
    else if (name === 'uint') {
        return 'uint256';
    }
    else if (name.startsWith('fixed[')) {
        return `fixed128x128${name.slice(5)}`;
    }
    else if (name === 'fixed') {
        return 'fixed128x128';
    }
    else if (name.startsWith('ufixed[')) {
        return `ufixed128x128${name.slice(6)}`;
    }
    else if (name === 'ufixed') {
        return 'ufixed128x128';
    }
    return name;
}
function isDynamic(type) {
    return (type === 'string' || type === 'bytes' || parseTypeArray(type) === 'dynamic');
}
function isHexPrefixed(str) {
    if (typeof str !== 'string') {
        throw new Error(`[isHexPrefixed] input must be type 'string', received type ${typeof str}`);
    }
    return str[0] === '0' && str[1] === 'x';
}
const stripHexPrefix = (str) => {
    if (typeof str !== 'string')
        throw new Error(`[stripHexPrefix] input must be type 'string', received ${typeof str}`);
    return isHexPrefixed(str) ? str.slice(2) : str;
};
function parseNumber(arg) {
    const type = typeof arg;
    if (type === 'string') {
        if (isHexPrefixed(arg)) {
            return new bn_js_1.default(stripHexPrefix(arg), 16);
        }
        return new bn_js_1.default(arg, 10);
    }
    else if (type === 'number') {
        return new bn_js_1.default(arg);
    }
    else if (arg.toArray) {
        return arg;
    }
    throw new Error('Argument is not a number');
}
function parseTypeN(type) {
    return parseInt(/^\D+(\d+)$/u.exec(type)[1], 10);
}
function parseTypeNxM(type) {
    const tmp = /^\D+(\d+)x(\d+)$/u.exec(type);
    return [parseInt(tmp[1], 10), parseInt(tmp[2], 10)];
}
const zeros = function (bytes) {
    return Buffer.allocUnsafe(bytes).fill(0);
};
const assertIsBuffer = function (input) {
    if (!Buffer.isBuffer(input)) {
        const msg = `This method only supports Buffer but input was: ${input}`;
        throw new Error(msg);
    }
};
const setLength = function (msg, length, right) {
    const buf = zeros(length);
    if (right) {
        if (msg.length < length) {
            msg.copy(buf);
            return buf;
        }
        return msg.slice(0, length);
    }
    else {
        if (msg.length < length) {
            msg.copy(buf, length - msg.length);
            return buf;
        }
        return msg.slice(-length);
    }
};
const setLengthRight = function (msg, length) {
    assertIsBuffer(msg);
    return setLength(msg, length, true);
};
function padToEven(value) {
    let a = value;
    if (typeof a !== 'string') {
        throw new Error(`[padToEven] value must be type 'string', received ${typeof a}`);
    }
    if (a.length % 2)
        a = `0${a}`;
    return a;
}
const intToHex = function (i) {
    if (!Number.isSafeInteger(i) || i < 0) {
        throw new Error(`Received an invalid integer type: ${i}`);
    }
    return `0x${i.toString(16)}`;
};
const intToBuffer = function (i) {
    const hex = intToHex(i);
    return Buffer.from(padToEven(hex.slice(2)), 'hex');
};
const bufferToHex = function (buf) {
    buf = toBuffer(buf);
    return '0x' + buf.toString('hex');
};
const addHexPrefix = function (str) {
    if (typeof str !== 'string') {
        return str;
    }
    return isHexPrefixed(str) ? str : '0x' + str;
};
const toBuffer = function (v) {
    if (v === null || v === undefined) {
        return Buffer.allocUnsafe(0);
    }
    if (Buffer.isBuffer(v)) {
        return Buffer.from(v);
    }
    if (Array.isArray(v) || v instanceof Uint8Array) {
        return Buffer.from(v);
    }
    if (typeof v === 'string') {
        if (!isHexString(v)) {
            throw new Error(`Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: ${v}`);
        }
        return Buffer.from(padToEven(stripHexPrefix(v)), 'hex');
    }
    if (typeof v === 'number') {
        return intToBuffer(v);
    }
    if (typeof v === 'bigint') {
        if (v < BigInt(0)) {
            throw new Error(`Cannot convert negative bigint to buffer. Given: ${v}`);
        }
        let n = v.toString(16);
        if (n.length % 2)
            n = '0' + n;
        return Buffer.from(n, 'hex');
    }
    if (v.toArray) {
        return Buffer.from(v.toArray());
    }
    if (v.toBuffer) {
        return Buffer.from(v.toBuffer());
    }
    throw new Error('invalid type');
};
function normalize(input) {
    if (!input) {
        return undefined;
    }
    if (typeof input === 'number') {
        if (input < 0) {
            return '0x';
        }
        const buffer = toBuffer(input);
        input = bufferToHex(buffer);
    }
    if (typeof input !== 'string') {
        let msg = 'eth-sig-util.normalize() requires hex string or integer input.';
        msg += ` received ${typeof input}: ${input}`;
        throw new Error(msg);
    }
    return addHexPrefix(input.toLowerCase());
}
function encodeSingle(type, arg) {
    let size, num, ret, i;
    if (type === 'address') {
        return encodeSingle('uint160', parseNumber(arg));
    }
    else if (type === 'bool') {
        return encodeSingle('uint8', arg ? 1 : 0);
    }
    else if (type === 'string') {
        return encodeSingle('bytes', Buffer.from(arg, 'utf8'));
    }
    else if (isArray(type)) {
        if (typeof arg.length === 'undefined') {
            throw new Error('Not an array?');
        }
        size = parseTypeArray(type);
        if (size !== 'dynamic' && size !== 0 && arg.length > size) {
            throw new Error(`Elements exceed array size: ${size}`);
        }
        ret = [];
        type = type.slice(0, type.lastIndexOf('['));
        if (typeof arg === 'string') {
            arg = JSON.parse(arg);
        }
        for (i in arg) {
            if (Object.prototype.hasOwnProperty.call(arg, i)) {
                ret.push(encodeSingle(type, arg[i]));
            }
        }
        if (size === 'dynamic') {
            const length = encodeSingle('uint256', arg.length);
            ret.unshift(length);
        }
        return Buffer.concat(ret);
    }
    else if (type === 'bytes') {
        arg = Buffer.from(arg);
        ret = Buffer.concat([encodeSingle('uint256', arg.length), arg]);
        if (arg.length % 32 !== 0) {
            ret = Buffer.concat([ret, zeros(32 - (arg.length % 32))]);
        }
        return ret;
    }
    else if (type.startsWith('bytes')) {
        size = parseTypeN(type);
        if (size < 1 || size > 32) {
            throw new Error(`Invalid bytes<N> width: ${size}`);
        }
        if (typeof arg === 'number') {
            arg = normalize(arg);
        }
        return setLengthRight(toBuffer(arg), 32);
    }
    else if (type.startsWith('uint')) {
        size = parseTypeN(type);
        if (size % 8 || size < 8 || size > 256) {
            throw new Error(`Invalid uint<N> width: ${size}`);
        }
        num = parseNumber(arg);
        if (num.bitLength() > size) {
            throw new Error(`Supplied uint exceeds width: ${size} vs ${num.bitLength()}`);
        }
        if (num < 0) {
            throw new Error('Supplied uint is negative');
        }
        return num.toArrayLike(Buffer, 'be', 32);
    }
    else if (type.startsWith('int')) {
        size = parseTypeN(type);
        if (size % 8 || size < 8 || size > 256) {
            throw new Error(`Invalid int<N> width: ${size}`);
        }
        num = parseNumber(arg);
        if (num.bitLength() > size) {
            throw new Error(`Supplied int exceeds width: ${size} vs ${num.bitLength()}`);
        }
        return num.toTwos(256).toArrayLike(Buffer, 'be', 32);
    }
    else if (type.startsWith('ufixed')) {
        size = parseTypeNxM(type);
        num = parseNumber(arg);
        if (num < 0) {
            throw new Error('Supplied ufixed is negative');
        }
        return encodeSingle('uint256', num.mul(new bn_js_1.default(2).pow(new bn_js_1.default(size[1]))));
    }
    else if (type.startsWith('fixed')) {
        size = parseTypeNxM(type);
        return encodeSingle('int256', parseNumber(arg).mul(new bn_js_1.default(2).pow(new bn_js_1.default(size[1]))));
    }
    throw new Error(`Unsupported or invalid type: ${type}`);
}
function rawEncode(types, values) {
    const output = [];
    const data = [];
    let headLength = 0;
    types.forEach(function (type) {
        if (isArray(type)) {
            const size = parseTypeArray(type);
            if (size !== 'dynamic') {
                headLength += 32 * size;
            }
            else {
                headLength += 32;
            }
        }
        else {
            headLength += 32;
        }
    });
    for (let i = 0; i < types.length; i++) {
        const type = elementaryName(types[i]);
        const value = values[i];
        const cur = encodeSingle(type, value);
        if (isDynamic(type)) {
            output.push(encodeSingle('uint256', headLength));
            data.push(cur);
            headLength += cur.length;
        }
        else {
            output.push(cur);
        }
    }
    return Buffer.concat(output.concat(data));
}
function numberToBuffer(num) {
    const hexVal = num.toString(16);
    const prepend = hexVal.length % 2 ? '0' : '';
    return Buffer.from(prepend + hexVal, 'hex');
}
function arrToBufArr(arr) {
    if (!Array.isArray(arr)) {
        return Buffer.from(arr);
    }
    return arr.map((a) => arrToBufArr(a));
}
function encodeField(types, name, type, value, version) {
    if (types[type] !== undefined) {
        return [
            'bytes32',
            version === types_1.SignTypedDataVersion.V4 && value == null
                ? '0x0000000000000000000000000000000000000000000000000000000000000000'
                : arrToBufArr((0, keccak_1.keccak256)(encodeData(type, value, types, version))),
        ];
    }
    if (value === undefined) {
        throw new Error(`missing value for field ${name} of type ${type}`);
    }
    if (type === 'bytes') {
        if (typeof value === 'number') {
            value = numberToBuffer(value);
        }
        else if (isHexString(value)) {
            value = numberToBuffer(parseInt(value, 16));
        }
        else {
            value = Buffer.from(value, 'utf8');
        }
        return ['bytes32', arrToBufArr((0, keccak_1.keccak256)(value))];
    }
    if (type === 'string') {
        if (typeof value === 'number') {
            value = numberToBuffer(value);
        }
        else {
            value = Buffer.from(value !== null && value !== void 0 ? value : '', 'utf8');
        }
        return ['bytes32', arrToBufArr((0, keccak_1.keccak256)(value))];
    }
    if (type.lastIndexOf(']') === type.length - 1) {
        if (version === types_1.SignTypedDataVersion.V3) {
            throw new Error('Arrays are unimplemented in encodeData; use V4 extension');
        }
        const parsedType = type.slice(0, type.lastIndexOf('['));
        const typeValuePairs = value.map((item) => encodeField(types, name, parsedType, item, version));
        return [
            'bytes32',
            arrToBufArr((0, keccak_1.keccak256)(rawEncode(typeValuePairs.map(([t]) => t), typeValuePairs.map(([, v]) => v)))),
        ];
    }
    return [type, value];
}
function findTypeDependencies(primaryType, types, results = new Set()) {
    [primaryType] = primaryType.match(/^\w*/u);
    if (results.has(primaryType) || types[primaryType] === undefined) {
        return results;
    }
    results.add(primaryType);
    for (const field of types[primaryType]) {
        findTypeDependencies(field.type, types, results);
    }
    return results;
}
function hashType(primaryType, types) {
    const encodedHashType = Buffer.from(encodeType(primaryType, types), 'utf-8');
    return arrToBufArr((0, keccak_1.keccak256)(encodedHashType));
}
function hashStruct(primaryType, data, types, version) {
    let encodedData = encodeData(primaryType, data, types, version);
    return arrToBufArr((0, keccak_1.keccak256)(encodedData));
}
function encodeData(primaryType, data, types, version) {
    const encodedTypes = ['bytes32'];
    const encodedValues = [hashType(primaryType, types)];
    for (const field of types[primaryType]) {
        if (version === types_1.SignTypedDataVersion.V3 && data[field.name] === undefined) {
            continue;
        }
        const [type, value] = encodeField(types, field.name, field.type, data[field.name], version);
        encodedTypes.push(type);
        encodedValues.push(value);
    }
    return rawEncode(encodedTypes, encodedValues);
}
function sanitizeData(data) {
    const sanitizedData = {};
    for (const key in constants_1.TYPED_MESSAGE_SCHEMA.properties) {
        if (data[key]) {
            sanitizedData[key] = data[key];
        }
    }
    if ('types' in sanitizedData) {
        sanitizedData.types = Object.assign({ EIP712Domain: [] }, sanitizedData.types);
    }
    return sanitizedData;
}
function eip712Hash(typedData, version) {
    const sanitizedData = sanitizeData(typedData);
    const parts = [Buffer.from('1901', 'hex')];
    parts.push(hashStruct('EIP712Domain', sanitizedData.domain, sanitizedData.types, version));
    if (sanitizedData.primaryType !== 'EIP712Domain') {
        parts.push(hashStruct(sanitizedData.primaryType, sanitizedData.message, sanitizedData.types, version));
    }
    return arrToBufArr((0, keccak_1.keccak256)(Buffer.concat(parts)));
}
function padWithZeroes(hexString, targetLength) {
    if (hexString !== '' && !/^[a-f0-9]+$/iu.test(hexString)) {
        throw new Error(`Expected an unprefixed hex string. Received: ${hexString}`);
    }
    if (targetLength < 0) {
        throw new Error(`Expected a non-negative integer target length. Received: ${targetLength}`);
    }
    return String.prototype.padStart.call(hexString, targetLength, '0');
}
function concatSig(v, r, s) {
    const rSig = (0, ethereumjs_util_1.fromSigned)(r);
    const sSig = (0, ethereumjs_util_1.fromSigned)(s);
    const vSig = (0, ethereumjs_util_1.bufferToInt)(v);
    const rStr = padWithZeroes((0, ethereumjs_util_1.toUnsigned)(rSig).toString('hex'), 64);
    const sStr = padWithZeroes((0, ethereumjs_util_1.toUnsigned)(sSig).toString('hex'), 64);
    const vStr = stripHexPrefix(intToHex(vSig));
    return addHexPrefix(rStr.concat(sStr, vStr));
}
function recoverPublicKey(messageHash, signature) {
    const sigParams = (0, ethereumjs_util_1.fromRpcSig)(signature);
    return (0, ethereumjs_util_1.ecrecover)(messageHash, sigParams.v, sigParams.r, sigParams.s);
}
function signTypedDataWithPrivateKey({ privateKey, data, version, }) {
    const bufferPrivateKey = Buffer.from(privateKey.replace('0x', ''), 'hex');
    const messageHash = eip712Hash(data, version);
    const sig = (0, ethereumjs_util_1.ecsign)(messageHash, bufferPrivateKey);
    return concatSig(toBuffer(sig.v), sig.r, sig.s);
}
exports.signTypedDataWithPrivateKey = signTypedDataWithPrivateKey;
function recoverTypedSignature({ data, signature, version, }) {
    const messageHash = eip712Hash(data, version);
    const publicKey = recoverPublicKey(messageHash, signature);
    const sender = (0, ethereumjs_util_1.publicToAddress)(publicKey);
    return bufferToHex(sender);
}
exports.recoverTypedSignature = recoverTypedSignature;
