define("aws-sdk", ()=>{});
define("asn1.js", ()=>{});
define("bn.js", ()=>{});
define("ethereumjs-tx", ()=>{});
define("ethereumjs-util", ()=>{});
define("web3", (require,exports)=>{
    exports['web3'] = window["Web3"];
});
define("bignumber.js", (require,exports)=>{
    exports['BigNumber'] = window["BigNumber"];
});
define("base64-js", ()=>{});
define("ieee754", ()=>{});
define("isarray", ()=>{});
define("js-sha3", (require,exports)=>{
  exports["js-sha3"] = window["js-sha3"];
});
define("merkletreejs", (require,exports)=>{
  exports['MerkleTree'] = window["MerkleTree"];
});
define("@ijstech/eth-wallet",(require, exports)=>{
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
      }
      return parts.join("");
    }
  }
});

// node_modules/buffer/node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/buffer/node_modules/ieee754/index.js"(exports) {
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports) {
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer2;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function Buffer2(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError('The "string" argument must be of type string. Received type number');
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer2.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError('The "value" argument must not be of type number. Received type number');
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer2.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b)
        return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    }
    Buffer2.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer2, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer2.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer2.alloc(+length);
    }
    Buffer2.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer2.prototype;
    };
    Buffer2.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array))
        a = Buffer2.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array))
        b = Buffer2.from(b, b.offset, b.byteLength);
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      }
      if (a === b)
        return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer2.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer2.isBuffer(buf))
              buf = Buffer2.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(buffer, buf, pos);
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer2.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0)
        return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer2.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString2() {
      const length = this.length;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = function equals(b) {
      if (!Buffer2.isBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer2.compare(this, b) === 0;
    };
    Buffer2.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max)
        str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i;
            if (i - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found)
            return i;
        }
      }
      return -1;
    }
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer2.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer2.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target))
        throw new TypeError("argument should be a Buffer");
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E("ERR_BUFFER_OUT_OF_BOUNDS", function(name) {
      if (name) {
        return `${name} is outside of buffer bounds`;
      }
      return "Attempt to access memory outside buffer bounds";
    }, RangeError);
    E("ERR_INVALID_ARG_TYPE", function(name, actual) {
      return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
    }, TypeError);
    E("ERR_OUT_OF_RANGE", function(str, range, input) {
      let msg = `The value of "${str}" is out of range.`;
      let received = input;
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
          received = addNumericalSeparator(received);
        }
        received += "n";
      }
      msg += ` It must be ${range}. Received ${received}`;
      return msg;
    }, RangeError);
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0)
          break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length)
          break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// node_modules/js-sha3/src/sha3.js
var require_sha3 = __commonJS({
  "node_modules/js-sha3/src/sha3.js"(exports, module2) {
    (function() {
      "use strict";
      var INPUT_ERROR = "input is invalid type";
      var FINALIZE_ERROR = "finalize already called";
      var WINDOW = typeof window === "object";
      var root = WINDOW ? window : {};
      if (root.JS_SHA3_NO_WINDOW) {
        WINDOW = false;
      }
      var WEB_WORKER = !WINDOW && typeof self === "object";
      var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
      if (NODE_JS) {
        root = global;
      } else if (WEB_WORKER) {
        root = self;
      }
      var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && typeof module2 === "object" && module2.exports;
      var AMD = typeof define === "function" && define.amd;
      var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
      var HEX_CHARS = "0123456789abcdef".split("");
      var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
      var CSHAKE_PADDING = [4, 1024, 262144, 67108864];
      var KECCAK_PADDING = [1, 256, 65536, 16777216];
      var PADDING = [6, 1536, 393216, 100663296];
      var SHIFT = [0, 8, 16, 24];
      var RC = [
        1,
        0,
        32898,
        0,
        32906,
        2147483648,
        2147516416,
        2147483648,
        32907,
        0,
        2147483649,
        0,
        2147516545,
        2147483648,
        32777,
        2147483648,
        138,
        0,
        136,
        0,
        2147516425,
        0,
        2147483658,
        0,
        2147516555,
        0,
        139,
        2147483648,
        32905,
        2147483648,
        32771,
        2147483648,
        32770,
        2147483648,
        128,
        2147483648,
        32778,
        0,
        2147483658,
        2147483648,
        2147516545,
        2147483648,
        32896,
        2147483648,
        2147483649,
        0,
        2147516424,
        2147483648
      ];
      var BITS = [224, 256, 384, 512];
      var SHAKE_BITS = [128, 256];
      var OUTPUT_TYPES = ["hex", "buffer", "arrayBuffer", "array", "digest"];
      var CSHAKE_BYTEPAD = {
        "128": 168,
        "256": 136
      };
      if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
        Array.isArray = function(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
      }
      if (ARRAY_BUFFER && (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
        ArrayBuffer.isView = function(obj) {
          return typeof obj === "object" && obj.buffer && obj.buffer.constructor === ArrayBuffer;
        };
      }
      var createOutputMethod = function(bits2, padding, outputType) {
        return function(message) {
          return new Keccak(bits2, padding, bits2).update(message)[outputType]();
        };
      };
      var createShakeOutputMethod = function(bits2, padding, outputType) {
        return function(message, outputBits) {
          return new Keccak(bits2, padding, outputBits).update(message)[outputType]();
        };
      };
      var createCshakeOutputMethod = function(bits2, padding, outputType) {
        return function(message, outputBits, n, s) {
          return methods["cshake" + bits2].update(message, outputBits, n, s)[outputType]();
        };
      };
      var createKmacOutputMethod = function(bits2, padding, outputType) {
        return function(key, message, outputBits, s) {
          return methods["kmac" + bits2].update(key, message, outputBits, s)[outputType]();
        };
      };
      var createOutputMethods = function(method, createMethod2, bits2, padding) {
        for (var i2 = 0; i2 < OUTPUT_TYPES.length; ++i2) {
          var type = OUTPUT_TYPES[i2];
          method[type] = createMethod2(bits2, padding, type);
        }
        return method;
      };
      var createMethod = function(bits2, padding) {
        var method = createOutputMethod(bits2, padding, "hex");
        method.create = function() {
          return new Keccak(bits2, padding, bits2);
        };
        method.update = function(message) {
          return method.create().update(message);
        };
        return createOutputMethods(method, createOutputMethod, bits2, padding);
      };
      var createShakeMethod = function(bits2, padding) {
        var method = createShakeOutputMethod(bits2, padding, "hex");
        method.create = function(outputBits) {
          return new Keccak(bits2, padding, outputBits);
        };
        method.update = function(message, outputBits) {
          return method.create(outputBits).update(message);
        };
        return createOutputMethods(method, createShakeOutputMethod, bits2, padding);
      };
      var createCshakeMethod = function(bits2, padding) {
        var w = CSHAKE_BYTEPAD[bits2];
        var method = createCshakeOutputMethod(bits2, padding, "hex");
        method.create = function(outputBits, n, s) {
          if (!n && !s) {
            return methods["shake" + bits2].create(outputBits);
          } else {
            return new Keccak(bits2, padding, outputBits).bytepad([n, s], w);
          }
        };
        method.update = function(message, outputBits, n, s) {
          return method.create(outputBits, n, s).update(message);
        };
        return createOutputMethods(method, createCshakeOutputMethod, bits2, padding);
      };
      var createKmacMethod = function(bits2, padding) {
        var w = CSHAKE_BYTEPAD[bits2];
        var method = createKmacOutputMethod(bits2, padding, "hex");
        method.create = function(key, outputBits, s) {
          return new Kmac(bits2, padding, outputBits).bytepad(["KMAC", s], w).bytepad([key], w);
        };
        method.update = function(key, message, outputBits, s) {
          return method.create(key, outputBits, s).update(message);
        };
        return createOutputMethods(method, createKmacOutputMethod, bits2, padding);
      };
      var algorithms = [
        { name: "keccak", padding: KECCAK_PADDING, bits: BITS, createMethod },
        { name: "sha3", padding: PADDING, bits: BITS, createMethod },
        { name: "shake", padding: SHAKE_PADDING, bits: SHAKE_BITS, createMethod: createShakeMethod },
        { name: "cshake", padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createCshakeMethod },
        { name: "kmac", padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createKmacMethod }
      ];
      var methods = {}, methodNames = [];
      for (var i = 0; i < algorithms.length; ++i) {
        var algorithm = algorithms[i];
        var bits = algorithm.bits;
        for (var j = 0; j < bits.length; ++j) {
          var methodName = algorithm.name + "_" + bits[j];
          methodNames.push(methodName);
          methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding);
          if (algorithm.name !== "sha3") {
            var newMethodName = algorithm.name + bits[j];
            methodNames.push(newMethodName);
            methods[newMethodName] = methods[methodName];
          }
        }
      }
      function Keccak(bits2, padding, outputBits) {
        this.blocks = [];
        this.s = [];
        this.padding = padding;
        this.outputBits = outputBits;
        this.reset = true;
        this.finalized = false;
        this.block = 0;
        this.start = 0;
        this.blockCount = 1600 - (bits2 << 1) >> 5;
        this.byteCount = this.blockCount << 2;
        this.outputBlocks = outputBits >> 5;
        this.extraBytes = (outputBits & 31) >> 3;
        for (var i2 = 0; i2 < 50; ++i2) {
          this.s[i2] = 0;
        }
      }
      Keccak.prototype.update = function(message) {
        if (this.finalized) {
          throw new Error(FINALIZE_ERROR);
        }
        var notString, type = typeof message;
        if (type !== "string") {
          if (type === "object") {
            if (message === null) {
              throw new Error(INPUT_ERROR);
            } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
              message = new Uint8Array(message);
            } else if (!Array.isArray(message)) {
              if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
                throw new Error(INPUT_ERROR);
              }
            }
          } else {
            throw new Error(INPUT_ERROR);
          }
          notString = true;
        }
        var blocks = this.blocks, byteCount = this.byteCount, length = message.length, blockCount = this.blockCount, index = 0, s = this.s, i2, code;
        while (index < length) {
          if (this.reset) {
            this.reset = false;
            blocks[0] = this.block;
            for (i2 = 1; i2 < blockCount + 1; ++i2) {
              blocks[i2] = 0;
            }
          }
          if (notString) {
            for (i2 = this.start; index < length && i2 < byteCount; ++index) {
              blocks[i2 >> 2] |= message[index] << SHIFT[i2++ & 3];
            }
          } else {
            for (i2 = this.start; index < length && i2 < byteCount; ++index) {
              code = message.charCodeAt(index);
              if (code < 128) {
                blocks[i2 >> 2] |= code << SHIFT[i2++ & 3];
              } else if (code < 2048) {
                blocks[i2 >> 2] |= (192 | code >> 6) << SHIFT[i2++ & 3];
                blocks[i2 >> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
              } else if (code < 55296 || code >= 57344) {
                blocks[i2 >> 2] |= (224 | code >> 12) << SHIFT[i2++ & 3];
                blocks[i2 >> 2] |= (128 | code >> 6 & 63) << SHIFT[i2++ & 3];
                blocks[i2 >> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
              } else {
                code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
                blocks[i2 >> 2] |= (240 | code >> 18) << SHIFT[i2++ & 3];
                blocks[i2 >> 2] |= (128 | code >> 12 & 63) << SHIFT[i2++ & 3];
                blocks[i2 >> 2] |= (128 | code >> 6 & 63) << SHIFT[i2++ & 3];
                blocks[i2 >> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
              }
            }
          }
          this.lastByteIndex = i2;
          if (i2 >= byteCount) {
            this.start = i2 - byteCount;
            this.block = blocks[blockCount];
            for (i2 = 0; i2 < blockCount; ++i2) {
              s[i2] ^= blocks[i2];
            }
            f(s);
            this.reset = true;
          } else {
            this.start = i2;
          }
        }
        return this;
      };
      Keccak.prototype.encode = function(x, right) {
        var o = x & 255, n = 1;
        var bytes = [o];
        x = x >> 8;
        o = x & 255;
        while (o > 0) {
          bytes.unshift(o);
          x = x >> 8;
          o = x & 255;
          ++n;
        }
        if (right) {
          bytes.push(n);
        } else {
          bytes.unshift(n);
        }
        this.update(bytes);
        return bytes.length;
      };
      Keccak.prototype.encodeString = function(str) {
        var notString, type = typeof str;
        if (type !== "string") {
          if (type === "object") {
            if (str === null) {
              throw new Error(INPUT_ERROR);
            } else if (ARRAY_BUFFER && str.constructor === ArrayBuffer) {
              str = new Uint8Array(str);
            } else if (!Array.isArray(str)) {
              if (!ARRAY_BUFFER || !ArrayBuffer.isView(str)) {
                throw new Error(INPUT_ERROR);
              }
            }
          } else {
            throw new Error(INPUT_ERROR);
          }
          notString = true;
        }
        var bytes = 0, length = str.length;
        if (notString) {
          bytes = length;
        } else {
          for (var i2 = 0; i2 < str.length; ++i2) {
            var code = str.charCodeAt(i2);
            if (code < 128) {
              bytes += 1;
            } else if (code < 2048) {
              bytes += 2;
            } else if (code < 55296 || code >= 57344) {
              bytes += 3;
            } else {
              code = 65536 + ((code & 1023) << 10 | str.charCodeAt(++i2) & 1023);
              bytes += 4;
            }
          }
        }
        bytes += this.encode(bytes * 8);
        this.update(str);
        return bytes;
      };
      Keccak.prototype.bytepad = function(strs, w) {
        var bytes = this.encode(w);
        for (var i2 = 0; i2 < strs.length; ++i2) {
          bytes += this.encodeString(strs[i2]);
        }
        var paddingBytes = w - bytes % w;
        var zeros = [];
        zeros.length = paddingBytes;
        this.update(zeros);
        return this;
      };
      Keccak.prototype.finalize = function() {
        if (this.finalized) {
          return;
        }
        this.finalized = true;
        var blocks = this.blocks, i2 = this.lastByteIndex, blockCount = this.blockCount, s = this.s;
        blocks[i2 >> 2] |= this.padding[i2 & 3];
        if (this.lastByteIndex === this.byteCount) {
          blocks[0] = blocks[blockCount];
          for (i2 = 1; i2 < blockCount + 1; ++i2) {
            blocks[i2] = 0;
          }
        }
        blocks[blockCount - 1] |= 2147483648;
        for (i2 = 0; i2 < blockCount; ++i2) {
          s[i2] ^= blocks[i2];
        }
        f(s);
      };
      Keccak.prototype.toString = Keccak.prototype.hex = function() {
        this.finalize();
        var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
        var hex = "", block;
        while (j2 < outputBlocks) {
          for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
            block = s[i2];
            hex += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15] + HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15] + HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15] + HEX_CHARS[block >> 28 & 15] + HEX_CHARS[block >> 24 & 15];
          }
          if (j2 % blockCount === 0) {
            f(s);
            i2 = 0;
          }
        }
        if (extraBytes) {
          block = s[i2];
          hex += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15];
          if (extraBytes > 1) {
            hex += HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15];
          }
          if (extraBytes > 2) {
            hex += HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15];
          }
        }
        return hex;
      };
      Keccak.prototype.arrayBuffer = function() {
        this.finalize();
        var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
        var bytes = this.outputBits >> 3;
        var buffer;
        if (extraBytes) {
          buffer = new ArrayBuffer(outputBlocks + 1 << 2);
        } else {
          buffer = new ArrayBuffer(bytes);
        }
        var array = new Uint32Array(buffer);
        while (j2 < outputBlocks) {
          for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
            array[j2] = s[i2];
          }
          if (j2 % blockCount === 0) {
            f(s);
          }
        }
        if (extraBytes) {
          array[i2] = s[i2];
          buffer = buffer.slice(0, bytes);
        }
        return buffer;
      };
      Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;
      Keccak.prototype.digest = Keccak.prototype.array = function() {
        this.finalize();
        var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
        var array = [], offset, block;
        while (j2 < outputBlocks) {
          for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
            offset = j2 << 2;
            block = s[i2];
            array[offset] = block & 255;
            array[offset + 1] = block >> 8 & 255;
            array[offset + 2] = block >> 16 & 255;
            array[offset + 3] = block >> 24 & 255;
          }
          if (j2 % blockCount === 0) {
            f(s);
          }
        }
        if (extraBytes) {
          offset = j2 << 2;
          block = s[i2];
          array[offset] = block & 255;
          if (extraBytes > 1) {
            array[offset + 1] = block >> 8 & 255;
          }
          if (extraBytes > 2) {
            array[offset + 2] = block >> 16 & 255;
          }
        }
        return array;
      };
      function Kmac(bits2, padding, outputBits) {
        Keccak.call(this, bits2, padding, outputBits);
      }
      Kmac.prototype = new Keccak();
      Kmac.prototype.finalize = function() {
        this.encode(this.outputBits, true);
        return Keccak.prototype.finalize.call(this);
      };
      var f = function(s) {
        var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
        for (n = 0; n < 48; n += 2) {
          c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
          c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
          c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
          c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
          c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
          c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
          c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
          c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
          c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
          c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];
          h = c8 ^ (c2 << 1 | c3 >>> 31);
          l = c9 ^ (c3 << 1 | c2 >>> 31);
          s[0] ^= h;
          s[1] ^= l;
          s[10] ^= h;
          s[11] ^= l;
          s[20] ^= h;
          s[21] ^= l;
          s[30] ^= h;
          s[31] ^= l;
          s[40] ^= h;
          s[41] ^= l;
          h = c0 ^ (c4 << 1 | c5 >>> 31);
          l = c1 ^ (c5 << 1 | c4 >>> 31);
          s[2] ^= h;
          s[3] ^= l;
          s[12] ^= h;
          s[13] ^= l;
          s[22] ^= h;
          s[23] ^= l;
          s[32] ^= h;
          s[33] ^= l;
          s[42] ^= h;
          s[43] ^= l;
          h = c2 ^ (c6 << 1 | c7 >>> 31);
          l = c3 ^ (c7 << 1 | c6 >>> 31);
          s[4] ^= h;
          s[5] ^= l;
          s[14] ^= h;
          s[15] ^= l;
          s[24] ^= h;
          s[25] ^= l;
          s[34] ^= h;
          s[35] ^= l;
          s[44] ^= h;
          s[45] ^= l;
          h = c4 ^ (c8 << 1 | c9 >>> 31);
          l = c5 ^ (c9 << 1 | c8 >>> 31);
          s[6] ^= h;
          s[7] ^= l;
          s[16] ^= h;
          s[17] ^= l;
          s[26] ^= h;
          s[27] ^= l;
          s[36] ^= h;
          s[37] ^= l;
          s[46] ^= h;
          s[47] ^= l;
          h = c6 ^ (c0 << 1 | c1 >>> 31);
          l = c7 ^ (c1 << 1 | c0 >>> 31);
          s[8] ^= h;
          s[9] ^= l;
          s[18] ^= h;
          s[19] ^= l;
          s[28] ^= h;
          s[29] ^= l;
          s[38] ^= h;
          s[39] ^= l;
          s[48] ^= h;
          s[49] ^= l;
          b0 = s[0];
          b1 = s[1];
          b32 = s[11] << 4 | s[10] >>> 28;
          b33 = s[10] << 4 | s[11] >>> 28;
          b14 = s[20] << 3 | s[21] >>> 29;
          b15 = s[21] << 3 | s[20] >>> 29;
          b46 = s[31] << 9 | s[30] >>> 23;
          b47 = s[30] << 9 | s[31] >>> 23;
          b28 = s[40] << 18 | s[41] >>> 14;
          b29 = s[41] << 18 | s[40] >>> 14;
          b20 = s[2] << 1 | s[3] >>> 31;
          b21 = s[3] << 1 | s[2] >>> 31;
          b2 = s[13] << 12 | s[12] >>> 20;
          b3 = s[12] << 12 | s[13] >>> 20;
          b34 = s[22] << 10 | s[23] >>> 22;
          b35 = s[23] << 10 | s[22] >>> 22;
          b16 = s[33] << 13 | s[32] >>> 19;
          b17 = s[32] << 13 | s[33] >>> 19;
          b48 = s[42] << 2 | s[43] >>> 30;
          b49 = s[43] << 2 | s[42] >>> 30;
          b40 = s[5] << 30 | s[4] >>> 2;
          b41 = s[4] << 30 | s[5] >>> 2;
          b22 = s[14] << 6 | s[15] >>> 26;
          b23 = s[15] << 6 | s[14] >>> 26;
          b4 = s[25] << 11 | s[24] >>> 21;
          b5 = s[24] << 11 | s[25] >>> 21;
          b36 = s[34] << 15 | s[35] >>> 17;
          b37 = s[35] << 15 | s[34] >>> 17;
          b18 = s[45] << 29 | s[44] >>> 3;
          b19 = s[44] << 29 | s[45] >>> 3;
          b10 = s[6] << 28 | s[7] >>> 4;
          b11 = s[7] << 28 | s[6] >>> 4;
          b42 = s[17] << 23 | s[16] >>> 9;
          b43 = s[16] << 23 | s[17] >>> 9;
          b24 = s[26] << 25 | s[27] >>> 7;
          b25 = s[27] << 25 | s[26] >>> 7;
          b6 = s[36] << 21 | s[37] >>> 11;
          b7 = s[37] << 21 | s[36] >>> 11;
          b38 = s[47] << 24 | s[46] >>> 8;
          b39 = s[46] << 24 | s[47] >>> 8;
          b30 = s[8] << 27 | s[9] >>> 5;
          b31 = s[9] << 27 | s[8] >>> 5;
          b12 = s[18] << 20 | s[19] >>> 12;
          b13 = s[19] << 20 | s[18] >>> 12;
          b44 = s[29] << 7 | s[28] >>> 25;
          b45 = s[28] << 7 | s[29] >>> 25;
          b26 = s[38] << 8 | s[39] >>> 24;
          b27 = s[39] << 8 | s[38] >>> 24;
          b8 = s[48] << 14 | s[49] >>> 18;
          b9 = s[49] << 14 | s[48] >>> 18;
          s[0] = b0 ^ ~b2 & b4;
          s[1] = b1 ^ ~b3 & b5;
          s[10] = b10 ^ ~b12 & b14;
          s[11] = b11 ^ ~b13 & b15;
          s[20] = b20 ^ ~b22 & b24;
          s[21] = b21 ^ ~b23 & b25;
          s[30] = b30 ^ ~b32 & b34;
          s[31] = b31 ^ ~b33 & b35;
          s[40] = b40 ^ ~b42 & b44;
          s[41] = b41 ^ ~b43 & b45;
          s[2] = b2 ^ ~b4 & b6;
          s[3] = b3 ^ ~b5 & b7;
          s[12] = b12 ^ ~b14 & b16;
          s[13] = b13 ^ ~b15 & b17;
          s[22] = b22 ^ ~b24 & b26;
          s[23] = b23 ^ ~b25 & b27;
          s[32] = b32 ^ ~b34 & b36;
          s[33] = b33 ^ ~b35 & b37;
          s[42] = b42 ^ ~b44 & b46;
          s[43] = b43 ^ ~b45 & b47;
          s[4] = b4 ^ ~b6 & b8;
          s[5] = b5 ^ ~b7 & b9;
          s[14] = b14 ^ ~b16 & b18;
          s[15] = b15 ^ ~b17 & b19;
          s[24] = b24 ^ ~b26 & b28;
          s[25] = b25 ^ ~b27 & b29;
          s[34] = b34 ^ ~b36 & b38;
          s[35] = b35 ^ ~b37 & b39;
          s[44] = b44 ^ ~b46 & b48;
          s[45] = b45 ^ ~b47 & b49;
          s[6] = b6 ^ ~b8 & b0;
          s[7] = b7 ^ ~b9 & b1;
          s[16] = b16 ^ ~b18 & b10;
          s[17] = b17 ^ ~b19 & b11;
          s[26] = b26 ^ ~b28 & b20;
          s[27] = b27 ^ ~b29 & b21;
          s[36] = b36 ^ ~b38 & b30;
          s[37] = b37 ^ ~b39 & b31;
          s[46] = b46 ^ ~b48 & b40;
          s[47] = b47 ^ ~b49 & b41;
          s[8] = b8 ^ ~b0 & b2;
          s[9] = b9 ^ ~b1 & b3;
          s[18] = b18 ^ ~b10 & b12;
          s[19] = b19 ^ ~b11 & b13;
          s[28] = b28 ^ ~b20 & b22;
          s[29] = b29 ^ ~b21 & b23;
          s[38] = b38 ^ ~b30 & b32;
          s[39] = b39 ^ ~b31 & b33;
          s[48] = b48 ^ ~b40 & b42;
          s[49] = b49 ^ ~b41 & b43;
          s[0] ^= RC[n];
          s[1] ^= RC[n + 1];
        }
      };
      if (COMMON_JS) {
        module2.exports = methods;
      } else {
        for (i = 0; i < methodNames.length; ++i) {
          root[methodNames[i]] = methods[methodNames[i]];
        }
        if (AMD) {
          define(function() {
            return methods;
          });
        }
      }
    })();
  }
});

// node_modules/buffer-reverse/index.js
var require_buffer_reverse = __commonJS({
  "node_modules/buffer-reverse/index.js"(exports, module2) {
    module2.exports = function reverse(src) {
      var buffer = new Buffer(src.length);
      for (var i = 0, j = src.length - 1; i <= j; ++i, --j) {
        buffer[i] = src[j];
        buffer[j] = src[i];
      }
      return buffer;
    };
  }
});

// node_modules/crypto-js/core.js
var require_core = __commonJS({
  "node_modules/crypto-js/core.js"(exports, module2) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module2.exports = exports = factory();
      } else if (typeof define === "function" && define.amd) {
        define([], factory);
      } else {
        root.CryptoJS = factory();
      }
    })(exports, function() {
      var CryptoJS = CryptoJS || function(Math2, undefined2) {
        var create = Object.create || function() {
          function F() {
          }
          ;
          return function(obj) {
            var subtype;
            F.prototype = obj;
            subtype = new F();
            F.prototype = null;
            return subtype;
          };
        }();
        var C = {};
        var C_lib = C.lib = {};
        var Base = C_lib.Base = function() {
          return {
            extend: function(overrides) {
              var subtype = create(this);
              if (overrides) {
                subtype.mixIn(overrides);
              }
              if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                subtype.init = function() {
                  subtype.$super.init.apply(this, arguments);
                };
              }
              subtype.init.prototype = subtype;
              subtype.$super = this;
              return subtype;
            },
            create: function() {
              var instance = this.extend();
              instance.init.apply(instance, arguments);
              return instance;
            },
            init: function() {
            },
            mixIn: function(properties) {
              for (var propertyName in properties) {
                if (properties.hasOwnProperty(propertyName)) {
                  this[propertyName] = properties[propertyName];
                }
              }
              if (properties.hasOwnProperty("toString")) {
                this.toString = properties.toString;
              }
            },
            clone: function() {
              return this.init.prototype.extend(this);
            }
          };
        }();
        var WordArray = C_lib.WordArray = Base.extend({
          init: function(words, sigBytes) {
            words = this.words = words || [];
            if (sigBytes != undefined2) {
              this.sigBytes = sigBytes;
            } else {
              this.sigBytes = words.length * 4;
            }
          },
          toString: function(encoder) {
            return (encoder || Hex).stringify(this);
          },
          concat: function(wordArray) {
            var thisWords = this.words;
            var thatWords = wordArray.words;
            var thisSigBytes = this.sigBytes;
            var thatSigBytes = wordArray.sigBytes;
            this.clamp();
            if (thisSigBytes % 4) {
              for (var i = 0; i < thatSigBytes; i++) {
                var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
              }
            } else {
              for (var i = 0; i < thatSigBytes; i += 4) {
                thisWords[thisSigBytes + i >>> 2] = thatWords[i >>> 2];
              }
            }
            this.sigBytes += thatSigBytes;
            return this;
          },
          clamp: function() {
            var words = this.words;
            var sigBytes = this.sigBytes;
            words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
            words.length = Math2.ceil(sigBytes / 4);
          },
          clone: function() {
            var clone = Base.clone.call(this);
            clone.words = this.words.slice(0);
            return clone;
          },
          random: function(nBytes) {
            var words = [];
            var r = function(m_w) {
              var m_w = m_w;
              var m_z = 987654321;
              var mask = 4294967295;
              return function() {
                m_z = 36969 * (m_z & 65535) + (m_z >> 16) & mask;
                m_w = 18e3 * (m_w & 65535) + (m_w >> 16) & mask;
                var result = (m_z << 16) + m_w & mask;
                result /= 4294967296;
                result += 0.5;
                return result * (Math2.random() > 0.5 ? 1 : -1);
              };
            };
            for (var i = 0, rcache; i < nBytes; i += 4) {
              var _r = r((rcache || Math2.random()) * 4294967296);
              rcache = _r() * 987654071;
              words.push(_r() * 4294967296 | 0);
            }
            return new WordArray.init(words, nBytes);
          }
        });
        var C_enc = C.enc = {};
        var Hex = C_enc.Hex = {
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var hexChars = [];
            for (var i = 0; i < sigBytes; i++) {
              var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              hexChars.push((bite >>> 4).toString(16));
              hexChars.push((bite & 15).toString(16));
            }
            return hexChars.join("");
          },
          parse: function(hexStr) {
            var hexStrLength = hexStr.length;
            var words = [];
            for (var i = 0; i < hexStrLength; i += 2) {
              words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
            }
            return new WordArray.init(words, hexStrLength / 2);
          }
        };
        var Latin1 = C_enc.Latin1 = {
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var latin1Chars = [];
            for (var i = 0; i < sigBytes; i++) {
              var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              latin1Chars.push(String.fromCharCode(bite));
            }
            return latin1Chars.join("");
          },
          parse: function(latin1Str) {
            var latin1StrLength = latin1Str.length;
            var words = [];
            for (var i = 0; i < latin1StrLength; i++) {
              words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
            }
            return new WordArray.init(words, latin1StrLength);
          }
        };
        var Utf8 = C_enc.Utf8 = {
          stringify: function(wordArray) {
            try {
              return decodeURIComponent(escape(Latin1.stringify(wordArray)));
            } catch (e) {
              throw new Error("Malformed UTF-8 data");
            }
          },
          parse: function(utf8Str) {
            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
          }
        };
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
          reset: function() {
            this._data = new WordArray.init();
            this._nDataBytes = 0;
          },
          _append: function(data) {
            if (typeof data == "string") {
              data = Utf8.parse(data);
            }
            this._data.concat(data);
            this._nDataBytes += data.sigBytes;
          },
          _process: function(doFlush) {
            var data = this._data;
            var dataWords = data.words;
            var dataSigBytes = data.sigBytes;
            var blockSize = this.blockSize;
            var blockSizeBytes = blockSize * 4;
            var nBlocksReady = dataSigBytes / blockSizeBytes;
            if (doFlush) {
              nBlocksReady = Math2.ceil(nBlocksReady);
            } else {
              nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
            }
            var nWordsReady = nBlocksReady * blockSize;
            var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
            if (nWordsReady) {
              for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                this._doProcessBlock(dataWords, offset);
              }
              var processedWords = dataWords.splice(0, nWordsReady);
              data.sigBytes -= nBytesReady;
            }
            return new WordArray.init(processedWords, nBytesReady);
          },
          clone: function() {
            var clone = Base.clone.call(this);
            clone._data = this._data.clone();
            return clone;
          },
          _minBufferSize: 0
        });
        var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
          cfg: Base.extend(),
          init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
            this.reset();
          },
          reset: function() {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
          },
          update: function(messageUpdate) {
            this._append(messageUpdate);
            this._process();
            return this;
          },
          finalize: function(messageUpdate) {
            if (messageUpdate) {
              this._append(messageUpdate);
            }
            var hash = this._doFinalize();
            return hash;
          },
          blockSize: 512 / 32,
          _createHelper: function(hasher) {
            return function(message, cfg) {
              return new hasher.init(cfg).finalize(message);
            };
          },
          _createHmacHelper: function(hasher) {
            return function(message, key) {
              return new C_algo.HMAC.init(hasher, key).finalize(message);
            };
          }
        });
        var C_algo = C.algo = {};
        return C;
      }(Math);
      return CryptoJS;
    });
  }
});

// node_modules/crypto-js/sha256.js
var require_sha256 = __commonJS({
  "node_modules/crypto-js/sha256.js"(exports, module2) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function(Math2) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var H = [];
        var K = [];
        (function() {
          function isPrime(n2) {
            var sqrtN = Math2.sqrt(n2);
            for (var factor = 2; factor <= sqrtN; factor++) {
              if (!(n2 % factor)) {
                return false;
              }
            }
            return true;
          }
          function getFractionalBits(n2) {
            return (n2 - (n2 | 0)) * 4294967296 | 0;
          }
          var n = 2;
          var nPrime = 0;
          while (nPrime < 64) {
            if (isPrime(n)) {
              if (nPrime < 8) {
                H[nPrime] = getFractionalBits(Math2.pow(n, 1 / 2));
              }
              K[nPrime] = getFractionalBits(Math2.pow(n, 1 / 3));
              nPrime++;
            }
            n++;
          }
        })();
        var W = [];
        var SHA256 = C_algo.SHA256 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray.init(H.slice(0));
          },
          _doProcessBlock: function(M, offset) {
            var H2 = this._hash.words;
            var a = H2[0];
            var b = H2[1];
            var c = H2[2];
            var d = H2[3];
            var e = H2[4];
            var f = H2[5];
            var g = H2[6];
            var h = H2[7];
            for (var i = 0; i < 64; i++) {
              if (i < 16) {
                W[i] = M[offset + i] | 0;
              } else {
                var gamma0x = W[i - 15];
                var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                var gamma1x = W[i - 2];
                var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
              }
              var ch = e & f ^ ~e & g;
              var maj = a & b ^ a & c ^ b & c;
              var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
              var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
              var t1 = h + sigma1 + ch + K[i] + W[i];
              var t2 = sigma0 + maj;
              h = g;
              g = f;
              f = e;
              e = d + t1 | 0;
              d = c;
              c = b;
              b = a;
              a = t1 + t2 | 0;
            }
            H2[0] = H2[0] + a | 0;
            H2[1] = H2[1] + b | 0;
            H2[2] = H2[2] + c | 0;
            H2[3] = H2[3] + d | 0;
            H2[4] = H2[4] + e | 0;
            H2[5] = H2[5] + f | 0;
            H2[6] = H2[6] + g | 0;
            H2[7] = H2[7] + h | 0;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math2.floor(nBitsTotal / 4294967296);
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;
            this._process();
            return this._hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        C.SHA256 = Hasher._createHelper(SHA256);
        C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
      })(Math);
      return CryptoJS.SHA256;
    });
  }
});

// node_modules/treeify/treeify.js
var require_treeify = __commonJS({
  "node_modules/treeify/treeify.js"(exports, module2) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module2.exports = factory();
      } else if (typeof define === "function" && define.amd) {
        define(factory);
      } else {
        root.treeify = factory();
      }
    })(exports, function() {
      function makePrefix(key, last) {
        var str = last ? "\u2514" : "\u251C";
        if (key) {
          str += "\u2500 ";
        } else {
          str += "\u2500\u2500\u2510";
        }
        return str;
      }
      function filterKeys(obj, hideFunctions) {
        var keys = [];
        for (var branch in obj) {
          if (!obj.hasOwnProperty(branch)) {
            continue;
          }
          if (hideFunctions && typeof obj[branch] === "function") {
            continue;
          }
          keys.push(branch);
        }
        return keys;
      }
      function growBranch(key, root, last, lastStates, showValues, hideFunctions, callback) {
        var line = "", index = 0, lastKey, circular, lastStatesCopy = lastStates.slice(0);
        if (lastStatesCopy.push([root, last]) && lastStates.length > 0) {
          lastStates.forEach(function(lastState, idx) {
            if (idx > 0) {
              line += (lastState[1] ? " " : "\u2502") + "  ";
            }
            if (!circular && lastState[0] === root) {
              circular = true;
            }
          });
          line += makePrefix(key, last) + key;
          showValues && (typeof root !== "object" || root instanceof Date) && (line += ": " + root);
          circular && (line += " (circular ref.)");
          callback(line);
        }
        if (!circular && typeof root === "object") {
          var keys = filterKeys(root, hideFunctions);
          keys.forEach(function(branch) {
            lastKey = ++index === keys.length;
            growBranch(branch, root[branch], lastKey, lastStatesCopy, showValues, hideFunctions, callback);
          });
        }
      }
      ;
      var Treeify = {};
      Treeify.asLines = function(obj, showValues, hideFunctions, lineCallback) {
        var hideFunctionsArg = typeof hideFunctions !== "function" ? hideFunctions : false;
        growBranch(".", obj, false, [], showValues, hideFunctionsArg, lineCallback || hideFunctions);
      };
      Treeify.asTree = function(obj, showValues, hideFunctions) {
        var tree = "";
        growBranch(".", obj, false, [], showValues, hideFunctions, function(line) {
          tree += line + "\n";
        });
        return tree;
      };
      return Treeify;
    });
  }
});

// node_modules/crypto-js/x64-core.js
var require_x64_core = __commonJS({
  "node_modules/crypto-js/x64-core.js"(exports, module2) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function(undefined2) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var X32WordArray = C_lib.WordArray;
        var C_x64 = C.x64 = {};
        var X64Word = C_x64.Word = Base.extend({
          init: function(high, low) {
            this.high = high;
            this.low = low;
          }
        });
        var X64WordArray = C_x64.WordArray = Base.extend({
          init: function(words, sigBytes) {
            words = this.words = words || [];
            if (sigBytes != undefined2) {
              this.sigBytes = sigBytes;
            } else {
              this.sigBytes = words.length * 8;
            }
          },
          toX32: function() {
            var x64Words = this.words;
            var x64WordsLength = x64Words.length;
            var x32Words = [];
            for (var i = 0; i < x64WordsLength; i++) {
              var x64Word = x64Words[i];
              x32Words.push(x64Word.high);
              x32Words.push(x64Word.low);
            }
            return X32WordArray.create(x32Words, this.sigBytes);
          },
          clone: function() {
            var clone = Base.clone.call(this);
            var words = clone.words = this.words.slice(0);
            var wordsLength = words.length;
            for (var i = 0; i < wordsLength; i++) {
              words[i] = words[i].clone();
            }
            return clone;
          }
        });
      })();
      return CryptoJS;
    });
  }
});

// node_modules/crypto-js/lib-typedarrays.js
var require_lib_typedarrays = __commonJS({
  "node_modules/crypto-js/lib-typedarrays.js"(exports, module2) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        if (typeof ArrayBuffer != "function") {
          return;
        }
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var superInit = WordArray.init;
        var subInit = WordArray.init = function(typedArray) {
          if (typedArray instanceof ArrayBuffer) {
            typedArray = new Uint8Array(typedArray);
          }
          if (typedArray instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
          }
          if (typedArray instanceof Uint8Array) {
            var typedArrayByteLength = typedArray.byteLength;
            var words = [];
            for (var i = 0; i < typedArrayByteLength; i++) {
              words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
            }
            superInit.call(this, words, typedArrayByteLength);
          } else {
            superInit.apply(this, arguments);
          }
        };
        subInit.prototype = WordArray;
      })();
      return CryptoJS.lib.WordArray;
    });
  }
});

// node_modules/crypto-js/enc-utf16.js
var require_enc_utf16 = __commonJS({
  "node_modules/crypto-js/enc-utf16.js"(exports, module2) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var utf16Chars = [];
            for (var i = 0; i < sigBytes; i += 2) {
              var codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 65535;
              utf16Chars.push(String.fromCharCode(codePoint));
            }
            return utf16Chars.join("");
          },
          parse: function(utf16Str) {
            var utf16StrLength = utf16Str.length;
            var words = [];
            for (var i = 0; i < utf16StrLength; i++) {
              words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16;
            }
            return WordArray.create(words, utf16StrLength * 2);
          }
        };
        C_enc.Utf16LE = {
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var utf16Chars = [];
            for (var i = 0; i < sigBytes; i += 2) {
              var codePoint = swapEndian(words[i >>> 2] >>> 16 - i % 4 * 8 & 65535);
              utf16Chars.push(String.fromCharCode(codePoint));
            }
            return utf16Chars.join("");
          },
          parse: function(utf16Str) {
            var utf16StrLength = utf16Str.length;
            var words = [];
            for (var i = 0; i < utf16StrLength; i++) {
              words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << 16 - i % 2 * 16);
            }
            return WordArray.create(words, utf16StrLength * 2);
          }
        };
        function swapEndian(word) {
          return word << 8 & 4278255360 | word >>> 8 & 16711935;
        }
      })();
      return CryptoJS.enc.Utf16;
    });
  }
});

// node_modules/crypto-js/enc-base64.js
var require_enc_base64 = __commonJS({
  "node_modules/crypto-js/enc-base64.js"(exports, module2) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        var Base64 = C_enc.Base64 = {
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map = this._map;
            wordArray.clamp();
            var base64Chars = [];
            for (var i = 0; i < sigBytes; i += 3) {
              var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
              var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
              var triplet = byte1 << 16 | byte2 << 8 | byte3;
              for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
                base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
              }
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
              while (base64Chars.length % 4) {
                base64Chars.push(paddingChar);
              }
            }
            return base64Chars.join("");
          },
          parse: function(base64Str) {
            var base64StrLength = base64Str.length;
            var map = this._map;
            var reverseMap = this._reverseMap;
            if (!reverseMap) {
              reverseMap = this._reverseMap = [];
              for (var j = 0; j < map.length; j++) {
                reverseMap[map.charCodeAt(j)] = j;
              }
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
              var paddingIndex = base64Str.indexOf(paddingChar);
              if (paddingIndex !== -1) {
                base64StrLength = paddingIndex;
              }
            }
            return parseLoop(base64Str, base64StrLength, reverseMap);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
        function parseLoop(base64Str, base64StrLength, reverseMap) {
          var words = [];
          var nBytes = 0;
          for (var i = 0; i < base64StrLength; i++) {
            if (i % 4) {
              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
              words[nBytes >>> 2] |= (bits1 | bits2) << 24 - nBytes % 4 * 8;
              nBytes++;
            }
          }
          return WordArray.create(words, nBytes);
        }
      })();
      return CryptoJS.enc.Base64;
    });
  }
});

// node_modules/crypto-js/md5.js
var require_md5 = __commonJS({
  "node_modules/crypto-js/md5.js"(exports, module2) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function(Math2) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var T = [];
        (function() {
          for (var i = 0; i < 64; i++) {
            T[i] = Math2.abs(Math2.sin(i + 1)) * 4294967296 | 0;
          }
        })();
        var MD5 = C_algo.MD5 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray.init([
              1732584193,
              4023233417,
              2562383102,
              271733878
            ]);
          },
          _doProcessBlock: function(M, offset) {
            for (var i = 0; i < 16; i++) {
              var offset_i = offset + i;
              var M_offset_i = M[offset_i];
              M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
            }
            var H = this._hash.words;
            var M_offset_0 = M[offset + 0];
            var M_offset_1 = M[offset + 1];
            var M_offset_2 = M[offset + 2];
            var M_offset_3 = M[offset + 3];
            var M_offset_4 = M[offset + 4];
            var M_offset_5 = M[offset + 5];
            var M_offset_6 = M[offset + 6];
            var M_offset_7 = M[offset + 7];
            var M_offset_8 = M[offset + 8];
            var M_offset_9 = M[offset + 9];
            var M_offset_10 = M[offset + 10];
            var M_offset_11 = M[offset + 11];
            var M_offset_12 = M[offset + 12];
            var M_offset_13 = M[offset + 13];
            var M_offset_14 = M[offset + 14];
            var M_offset_15 = M[offset + 15];
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            a = FF(a, b, c, d, M_offset_0, 7, T[0]);
            d = FF(d, a, b, c, M_offset_1, 12, T[1]);
            c = FF(c, d, a, b, M_offset_2, 17, T[2]);
            b = FF(b, c, d, a, M_offset_3, 22, T[3]);
            a = FF(a, b, c, d, M_offset_4, 7, T[4]);
            d = FF(d, a, b, c, M_offset_5, 12, T[5]);
            c = FF(c, d, a, b, M_offset_6, 17, T[6]);
            b = FF(b, c, d, a, M_offset_7, 22, T[7]);
            a = FF(a, b, c, d, M_offset_8, 7, T[8]);
            d = FF(d, a, b, c, M_offset_9, 12, T[9]);
            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
            a = FF(a, b, c, d, M_offset_12, 7, T[12]);
            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
            b = FF(b, c, d, a, M_offset_15, 22, T[15]);
            a = GG(a, b, c, d, M_offset_1, 5, T[16]);
            d = GG(d, a, b, c, M_offset_6, 9, T[17]);
            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
            b = GG(b, c, d, a, M_offset_0, 20, T[19]);
            a = GG(a, b, c, d, M_offset_5, 5, T[20]);
            d = GG(d, a, b, c, M_offset_10, 9, T[21]);
            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
            b = GG(b, c, d, a, M_offset_4, 20, T[23]);
            a = GG(a, b, c, d, M_offset_9, 5, T[24]);
            d = GG(d, a, b, c, M_offset_14, 9, T[25]);
            c = GG(c, d, a, b, M_offset_3, 14, T[26]);
            b = GG(b, c, d, a, M_offset_8, 20, T[27]);
            a = GG(a, b, c, d, M_offset_13, 5, T[28]);
            d = GG(d, a, b, c, M_offset_2, 9, T[29]);
            c = GG(c, d, a, b, M_offset_7, 14, T[30]);
            b = GG(b, c, d, a, M_offset_12, 20, T[31]);
            a = HH(a, b, c, d, M_offset_5, 4, T[32]);
            d = HH(d, a, b, c, M_offset_8, 11, T[33]);
            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
            a = HH(a, b, c, d, M_offset_1, 4, T[36]);
            d = HH(d, a, b, c, M_offset_4, 11, T[37]);
            c = HH(c, d, a, b, M_offset_7, 16, T[38]);
            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
            a = HH(a, b, c, d, M_offset_13, 4, T[40]);
            d = HH(d, a, b, c, M_offset_0, 11, T[41]);
            c = HH(c, d, a, b, M_offset_3, 16, T[42]);
            b = HH(b, c, d, a, M_offset_6, 23, T[43]);
            a = HH(a, b, c, d, M_offset_9, 4, T[44]);
            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
            b = HH(b, c, d, a, M_offset_2, 23, T[47]);
            a = II(a, b, c, d, M_offset_0, 6, T[48]);
            d = II(d, a, b, c, M_offset_7, 10, T[49]);
            c = II(c, d, a, b, M_offset_14, 15, T[50]);
            b = II(b, c, d, a, M_offset_5, 21, T[51]);
            a = II(a, b, c, d, M_offset_12, 6, T[52]);
            d = II(d, a, b, c, M_offset_3, 10, T[53]);
            c = II(c, d, a, b, M_offset_10, 15, T[54]);
            b = II(b, c, d, a, M_offset_1, 21, T[55]);
            a = II(a, b, c, d, M_offset_8, 6, T[56]);
            d = II(d, a, b, c, M_offset_15, 10, T[57]);
            c = II(c, d, a, b, M_offset_6, 15, T[58]);
            b = II(b, c, d, a, M_offset_13, 21, T[59]);
            a = II(a, b, c, d, M_offset_4, 6, T[60]);
            d = II(d, a, b, c, M_offset_11, 10, T[61]);
            c = II(c, d, a, b, M_offset_2, 15, T[62]);
            b = II(b, c, d, a, M_offset_9, 21, T[63]);
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            var nBitsTotalH = Math2.floor(nBitsTotal / 4294967296);
            var nBitsTotalL = nBitsTotal;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
            data.sigBytes = (dataWords.length + 1) * 4;
            this._process();
            var hash = this._hash;
            var H = hash.words;
            for (var i = 0; i < 4; i++) {
              var H_i = H[i];
              H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
            }
            return hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        function FF(a, b, c, d, x, s, t) {
          var n = a + (b & c | ~b & d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function GG(a, b, c, d, x, s, t) {
          var n = a + (b & d | c & ~d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function HH(a, b, c, d, x, s, t) {
          var n = a + (b ^ c ^ d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function II(a, b, c, d, x, s, t) {
          var n = a + (c ^ (b | ~d)) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        C.MD5 = Hasher._createHelper(MD5);
        C.HmacMD5 = Hasher._createHmacHelper(MD5);
      })(Math);
      return CryptoJS.MD5;
    });
  }
});

// node_modules/crypto-js/sha1.js
var require_sha1 = __commonJS({
  "node_modules/crypto-js/sha1.js"(exports, module2) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var W = [];
        var SHA1 = C_algo.SHA1 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray.init([
              1732584193,
              4023233417,
              2562383102,
              271733878,
              3285377520
            ]);
          },
          _doProcessBlock: function(M, offset) {
            var H = this._hash.words;
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];
            for (var i = 0; i < 80; i++) {
              if (i < 16) {
                W[i] = M[offset + i] | 0;
              } else {
                var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                W[i] = n << 1 | n >>> 31;
              }
              var t = (a << 5 | a >>> 27) + e + W[i];
              if (i < 20) {
                t += (b & c | ~b & d) + 1518500249;
              } else if (i < 40) {
                t += (b ^ c ^ d) + 1859775393;
              } else if (i < 60) {
                t += (b & c | b & d | c & d) - 1894007588;
              } else {
                t += (b ^ c ^ d) - 899497514;
              }
              e = d;
              d = c;
              c = b << 30 | b >>> 2;
              b = a;
              a = t;
            }
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
            H[4] = H[4] + e | 0;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;
            this._process();
            return this._hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        C.SHA1 = Hasher._createHelper(SHA1);
        C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
      })();
      return CryptoJS.SHA1;
    });
  }
});

// node_modules/crypto-js/sha224.js
var require_sha224 = __commonJS({
  "node_modules/crypto-js/sha224.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_sha256());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./sha256"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var SHA256 = C_algo.SHA256;
        var SHA224 = C_algo.SHA224 = SHA256.extend({
          _doReset: function() {
            this._hash = new WordArray.init([
              3238371032,
              914150663,
              812702999,
              4144912697,
              4290775857,
              1750603025,
              1694076839,
              3204075428
            ]);
          },
          _doFinalize: function() {
            var hash = SHA256._doFinalize.call(this);
            hash.sigBytes -= 4;
            return hash;
          }
        });
        C.SHA224 = SHA256._createHelper(SHA224);
        C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
      })();
      return CryptoJS.SHA224;
    });
  }
});

// node_modules/crypto-js/sha512.js
var require_sha512 = __commonJS({
  "node_modules/crypto-js/sha512.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_x64_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./x64-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Hasher = C_lib.Hasher;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var X64WordArray = C_x64.WordArray;
        var C_algo = C.algo;
        function X64Word_create() {
          return X64Word.create.apply(X64Word, arguments);
        }
        var K = [
          X64Word_create(1116352408, 3609767458),
          X64Word_create(1899447441, 602891725),
          X64Word_create(3049323471, 3964484399),
          X64Word_create(3921009573, 2173295548),
          X64Word_create(961987163, 4081628472),
          X64Word_create(1508970993, 3053834265),
          X64Word_create(2453635748, 2937671579),
          X64Word_create(2870763221, 3664609560),
          X64Word_create(3624381080, 2734883394),
          X64Word_create(310598401, 1164996542),
          X64Word_create(607225278, 1323610764),
          X64Word_create(1426881987, 3590304994),
          X64Word_create(1925078388, 4068182383),
          X64Word_create(2162078206, 991336113),
          X64Word_create(2614888103, 633803317),
          X64Word_create(3248222580, 3479774868),
          X64Word_create(3835390401, 2666613458),
          X64Word_create(4022224774, 944711139),
          X64Word_create(264347078, 2341262773),
          X64Word_create(604807628, 2007800933),
          X64Word_create(770255983, 1495990901),
          X64Word_create(1249150122, 1856431235),
          X64Word_create(1555081692, 3175218132),
          X64Word_create(1996064986, 2198950837),
          X64Word_create(2554220882, 3999719339),
          X64Word_create(2821834349, 766784016),
          X64Word_create(2952996808, 2566594879),
          X64Word_create(3210313671, 3203337956),
          X64Word_create(3336571891, 1034457026),
          X64Word_create(3584528711, 2466948901),
          X64Word_create(113926993, 3758326383),
          X64Word_create(338241895, 168717936),
          X64Word_create(666307205, 1188179964),
          X64Word_create(773529912, 1546045734),
          X64Word_create(1294757372, 1522805485),
          X64Word_create(1396182291, 2643833823),
          X64Word_create(1695183700, 2343527390),
          X64Word_create(1986661051, 1014477480),
          X64Word_create(2177026350, 1206759142),
          X64Word_create(2456956037, 344077627),
          X64Word_create(2730485921, 1290863460),
          X64Word_create(2820302411, 3158454273),
          X64Word_create(3259730800, 3505952657),
          X64Word_create(3345764771, 106217008),
          X64Word_create(3516065817, 3606008344),
          X64Word_create(3600352804, 1432725776),
          X64Word_create(4094571909, 1467031594),
          X64Word_create(275423344, 851169720),
          X64Word_create(430227734, 3100823752),
          X64Word_create(506948616, 1363258195),
          X64Word_create(659060556, 3750685593),
          X64Word_create(883997877, 3785050280),
          X64Word_create(958139571, 3318307427),
          X64Word_create(1322822218, 3812723403),
          X64Word_create(1537002063, 2003034995),
          X64Word_create(1747873779, 3602036899),
          X64Word_create(1955562222, 1575990012),
          X64Word_create(2024104815, 1125592928),
          X64Word_create(2227730452, 2716904306),
          X64Word_create(2361852424, 442776044),
          X64Word_create(2428436474, 593698344),
          X64Word_create(2756734187, 3733110249),
          X64Word_create(3204031479, 2999351573),
          X64Word_create(3329325298, 3815920427),
          X64Word_create(3391569614, 3928383900),
          X64Word_create(3515267271, 566280711),
          X64Word_create(3940187606, 3454069534),
          X64Word_create(4118630271, 4000239992),
          X64Word_create(116418474, 1914138554),
          X64Word_create(174292421, 2731055270),
          X64Word_create(289380356, 3203993006),
          X64Word_create(460393269, 320620315),
          X64Word_create(685471733, 587496836),
          X64Word_create(852142971, 1086792851),
          X64Word_create(1017036298, 365543100),
          X64Word_create(1126000580, 2618297676),
          X64Word_create(1288033470, 3409855158),
          X64Word_create(1501505948, 4234509866),
          X64Word_create(1607167915, 987167468),
          X64Word_create(1816402316, 1246189591)
        ];
        var W = [];
        (function() {
          for (var i = 0; i < 80; i++) {
            W[i] = X64Word_create();
          }
        })();
        var SHA512 = C_algo.SHA512 = Hasher.extend({
          _doReset: function() {
            this._hash = new X64WordArray.init([
              new X64Word.init(1779033703, 4089235720),
              new X64Word.init(3144134277, 2227873595),
              new X64Word.init(1013904242, 4271175723),
              new X64Word.init(2773480762, 1595750129),
              new X64Word.init(1359893119, 2917565137),
              new X64Word.init(2600822924, 725511199),
              new X64Word.init(528734635, 4215389547),
              new X64Word.init(1541459225, 327033209)
            ]);
          },
          _doProcessBlock: function(M, offset) {
            var H = this._hash.words;
            var H0 = H[0];
            var H1 = H[1];
            var H2 = H[2];
            var H3 = H[3];
            var H4 = H[4];
            var H5 = H[5];
            var H6 = H[6];
            var H7 = H[7];
            var H0h = H0.high;
            var H0l = H0.low;
            var H1h = H1.high;
            var H1l = H1.low;
            var H2h = H2.high;
            var H2l = H2.low;
            var H3h = H3.high;
            var H3l = H3.low;
            var H4h = H4.high;
            var H4l = H4.low;
            var H5h = H5.high;
            var H5l = H5.low;
            var H6h = H6.high;
            var H6l = H6.low;
            var H7h = H7.high;
            var H7l = H7.low;
            var ah = H0h;
            var al = H0l;
            var bh = H1h;
            var bl = H1l;
            var ch = H2h;
            var cl = H2l;
            var dh = H3h;
            var dl = H3l;
            var eh = H4h;
            var el = H4l;
            var fh = H5h;
            var fl = H5l;
            var gh = H6h;
            var gl = H6l;
            var hh = H7h;
            var hl = H7l;
            for (var i = 0; i < 80; i++) {
              var Wi = W[i];
              if (i < 16) {
                var Wih = Wi.high = M[offset + i * 2] | 0;
                var Wil = Wi.low = M[offset + i * 2 + 1] | 0;
              } else {
                var gamma0x = W[i - 15];
                var gamma0xh = gamma0x.high;
                var gamma0xl = gamma0x.low;
                var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
                var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);
                var gamma1x = W[i - 2];
                var gamma1xh = gamma1x.high;
                var gamma1xl = gamma1x.low;
                var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
                var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);
                var Wi7 = W[i - 7];
                var Wi7h = Wi7.high;
                var Wi7l = Wi7.low;
                var Wi16 = W[i - 16];
                var Wi16h = Wi16.high;
                var Wi16l = Wi16.low;
                var Wil = gamma0l + Wi7l;
                var Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
                var Wil = Wil + gamma1l;
                var Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
                var Wil = Wil + Wi16l;
                var Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);
                Wi.high = Wih;
                Wi.low = Wil;
              }
              var chh = eh & fh ^ ~eh & gh;
              var chl = el & fl ^ ~el & gl;
              var majh = ah & bh ^ ah & ch ^ bh & ch;
              var majl = al & bl ^ al & cl ^ bl & cl;
              var sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
              var sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
              var sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
              var sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);
              var Ki = K[i];
              var Kih = Ki.high;
              var Kil = Ki.low;
              var t1l = hl + sigma1l;
              var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
              var t1l = t1l + chl;
              var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
              var t1l = t1l + Kil;
              var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
              var t1l = t1l + Wil;
              var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);
              var t2l = sigma0l + majl;
              var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);
              hh = gh;
              hl = gl;
              gh = fh;
              gl = fl;
              fh = eh;
              fl = el;
              el = dl + t1l | 0;
              eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
              dh = ch;
              dl = cl;
              ch = bh;
              cl = bl;
              bh = ah;
              bl = al;
              al = t1l + t2l | 0;
              ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
            }
            H0l = H0.low = H0l + al;
            H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
            H1l = H1.low = H1l + bl;
            H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
            H2l = H2.low = H2l + cl;
            H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
            H3l = H3.low = H3l + dl;
            H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
            H4l = H4.low = H4l + el;
            H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
            H5l = H5.low = H5l + fl;
            H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
            H6l = H6.low = H6l + gl;
            H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
            H7l = H7.low = H7l + hl;
            H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0);
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[(nBitsLeft + 128 >>> 10 << 5) + 30] = Math.floor(nBitsTotal / 4294967296);
            dataWords[(nBitsLeft + 128 >>> 10 << 5) + 31] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;
            this._process();
            var hash = this._hash.toX32();
            return hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          },
          blockSize: 1024 / 32
        });
        C.SHA512 = Hasher._createHelper(SHA512);
        C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
      })();
      return CryptoJS.SHA512;
    });
  }
});

// node_modules/crypto-js/sha384.js
var require_sha384 = __commonJS({
  "node_modules/crypto-js/sha384.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_x64_core(), require_sha512());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./x64-core", "./sha512"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var X64WordArray = C_x64.WordArray;
        var C_algo = C.algo;
        var SHA512 = C_algo.SHA512;
        var SHA384 = C_algo.SHA384 = SHA512.extend({
          _doReset: function() {
            this._hash = new X64WordArray.init([
              new X64Word.init(3418070365, 3238371032),
              new X64Word.init(1654270250, 914150663),
              new X64Word.init(2438529370, 812702999),
              new X64Word.init(355462360, 4144912697),
              new X64Word.init(1731405415, 4290775857),
              new X64Word.init(2394180231, 1750603025),
              new X64Word.init(3675008525, 1694076839),
              new X64Word.init(1203062813, 3204075428)
            ]);
          },
          _doFinalize: function() {
            var hash = SHA512._doFinalize.call(this);
            hash.sigBytes -= 16;
            return hash;
          }
        });
        C.SHA384 = SHA512._createHelper(SHA384);
        C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
      })();
      return CryptoJS.SHA384;
    });
  }
});

// node_modules/crypto-js/sha3.js
var require_sha32 = __commonJS({
  "node_modules/crypto-js/sha3.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_x64_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./x64-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function(Math2) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var C_algo = C.algo;
        var RHO_OFFSETS = [];
        var PI_INDEXES = [];
        var ROUND_CONSTANTS = [];
        (function() {
          var x = 1, y = 0;
          for (var t = 0; t < 24; t++) {
            RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;
            var newX = y % 5;
            var newY = (2 * x + 3 * y) % 5;
            x = newX;
            y = newY;
          }
          for (var x = 0; x < 5; x++) {
            for (var y = 0; y < 5; y++) {
              PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
            }
          }
          var LFSR = 1;
          for (var i = 0; i < 24; i++) {
            var roundConstantMsw = 0;
            var roundConstantLsw = 0;
            for (var j = 0; j < 7; j++) {
              if (LFSR & 1) {
                var bitPosition = (1 << j) - 1;
                if (bitPosition < 32) {
                  roundConstantLsw ^= 1 << bitPosition;
                } else {
                  roundConstantMsw ^= 1 << bitPosition - 32;
                }
              }
              if (LFSR & 128) {
                LFSR = LFSR << 1 ^ 113;
              } else {
                LFSR <<= 1;
              }
            }
            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
          }
        })();
        var T = [];
        (function() {
          for (var i = 0; i < 25; i++) {
            T[i] = X64Word.create();
          }
        })();
        var SHA3 = C_algo.SHA3 = Hasher.extend({
          cfg: Hasher.cfg.extend({
            outputLength: 512
          }),
          _doReset: function() {
            var state = this._state = [];
            for (var i = 0; i < 25; i++) {
              state[i] = new X64Word.init();
            }
            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
          },
          _doProcessBlock: function(M, offset) {
            var state = this._state;
            var nBlockSizeLanes = this.blockSize / 2;
            for (var i = 0; i < nBlockSizeLanes; i++) {
              var M2i = M[offset + 2 * i];
              var M2i1 = M[offset + 2 * i + 1];
              M2i = (M2i << 8 | M2i >>> 24) & 16711935 | (M2i << 24 | M2i >>> 8) & 4278255360;
              M2i1 = (M2i1 << 8 | M2i1 >>> 24) & 16711935 | (M2i1 << 24 | M2i1 >>> 8) & 4278255360;
              var lane = state[i];
              lane.high ^= M2i1;
              lane.low ^= M2i;
            }
            for (var round = 0; round < 24; round++) {
              for (var x = 0; x < 5; x++) {
                var tMsw = 0, tLsw = 0;
                for (var y = 0; y < 5; y++) {
                  var lane = state[x + 5 * y];
                  tMsw ^= lane.high;
                  tLsw ^= lane.low;
                }
                var Tx = T[x];
                Tx.high = tMsw;
                Tx.low = tLsw;
              }
              for (var x = 0; x < 5; x++) {
                var Tx4 = T[(x + 4) % 5];
                var Tx1 = T[(x + 1) % 5];
                var Tx1Msw = Tx1.high;
                var Tx1Lsw = Tx1.low;
                var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
                var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
                for (var y = 0; y < 5; y++) {
                  var lane = state[x + 5 * y];
                  lane.high ^= tMsw;
                  lane.low ^= tLsw;
                }
              }
              for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
                var lane = state[laneIndex];
                var laneMsw = lane.high;
                var laneLsw = lane.low;
                var rhoOffset = RHO_OFFSETS[laneIndex];
                if (rhoOffset < 32) {
                  var tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
                  var tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset;
                } else {
                  var tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
                  var tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
                }
                var TPiLane = T[PI_INDEXES[laneIndex]];
                TPiLane.high = tMsw;
                TPiLane.low = tLsw;
              }
              var T0 = T[0];
              var state0 = state[0];
              T0.high = state0.high;
              T0.low = state0.low;
              for (var x = 0; x < 5; x++) {
                for (var y = 0; y < 5; y++) {
                  var laneIndex = x + 5 * y;
                  var lane = state[laneIndex];
                  var TLane = T[laneIndex];
                  var Tx1Lane = T[(x + 1) % 5 + 5 * y];
                  var Tx2Lane = T[(x + 2) % 5 + 5 * y];
                  lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
                  lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
                }
              }
              var lane = state[0];
              var roundConstant = ROUND_CONSTANTS[round];
              lane.high ^= roundConstant.high;
              lane.low ^= roundConstant.low;
              ;
            }
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            var blockSizeBits = this.blockSize * 32;
            dataWords[nBitsLeft >>> 5] |= 1 << 24 - nBitsLeft % 32;
            dataWords[(Math2.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 128;
            data.sigBytes = dataWords.length * 4;
            this._process();
            var state = this._state;
            var outputLengthBytes = this.cfg.outputLength / 8;
            var outputLengthLanes = outputLengthBytes / 8;
            var hashWords = [];
            for (var i = 0; i < outputLengthLanes; i++) {
              var lane = state[i];
              var laneMsw = lane.high;
              var laneLsw = lane.low;
              laneMsw = (laneMsw << 8 | laneMsw >>> 24) & 16711935 | (laneMsw << 24 | laneMsw >>> 8) & 4278255360;
              laneLsw = (laneLsw << 8 | laneLsw >>> 24) & 16711935 | (laneLsw << 24 | laneLsw >>> 8) & 4278255360;
              hashWords.push(laneLsw);
              hashWords.push(laneMsw);
            }
            return new WordArray.init(hashWords, outputLengthBytes);
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            var state = clone._state = this._state.slice(0);
            for (var i = 0; i < 25; i++) {
              state[i] = state[i].clone();
            }
            return clone;
          }
        });
        C.SHA3 = Hasher._createHelper(SHA3);
        C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
      })(Math);
      return CryptoJS.SHA3;
    });
  }
});

// node_modules/crypto-js/ripemd160.js
var require_ripemd160 = __commonJS({
  "node_modules/crypto-js/ripemd160.js"(exports, module2) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function(Math2) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var _zl = WordArray.create([
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          7,
          4,
          13,
          1,
          10,
          6,
          15,
          3,
          12,
          0,
          9,
          5,
          2,
          14,
          11,
          8,
          3,
          10,
          14,
          4,
          9,
          15,
          8,
          1,
          2,
          7,
          0,
          6,
          13,
          11,
          5,
          12,
          1,
          9,
          11,
          10,
          0,
          8,
          12,
          4,
          13,
          3,
          7,
          15,
          14,
          5,
          6,
          2,
          4,
          0,
          5,
          9,
          7,
          12,
          2,
          10,
          14,
          1,
          3,
          8,
          11,
          6,
          15,
          13
        ]);
        var _zr = WordArray.create([
          5,
          14,
          7,
          0,
          9,
          2,
          11,
          4,
          13,
          6,
          15,
          8,
          1,
          10,
          3,
          12,
          6,
          11,
          3,
          7,
          0,
          13,
          5,
          10,
          14,
          15,
          8,
          12,
          4,
          9,
          1,
          2,
          15,
          5,
          1,
          3,
          7,
          14,
          6,
          9,
          11,
          8,
          12,
          2,
          10,
          0,
          4,
          13,
          8,
          6,
          4,
          1,
          3,
          11,
          15,
          0,
          5,
          12,
          2,
          13,
          9,
          7,
          10,
          14,
          12,
          15,
          10,
          4,
          1,
          5,
          8,
          7,
          6,
          2,
          13,
          14,
          0,
          3,
          9,
          11
        ]);
        var _sl = WordArray.create([
          11,
          14,
          15,
          12,
          5,
          8,
          7,
          9,
          11,
          13,
          14,
          15,
          6,
          7,
          9,
          8,
          7,
          6,
          8,
          13,
          11,
          9,
          7,
          15,
          7,
          12,
          15,
          9,
          11,
          7,
          13,
          12,
          11,
          13,
          6,
          7,
          14,
          9,
          13,
          15,
          14,
          8,
          13,
          6,
          5,
          12,
          7,
          5,
          11,
          12,
          14,
          15,
          14,
          15,
          9,
          8,
          9,
          14,
          5,
          6,
          8,
          6,
          5,
          12,
          9,
          15,
          5,
          11,
          6,
          8,
          13,
          12,
          5,
          12,
          13,
          14,
          11,
          8,
          5,
          6
        ]);
        var _sr = WordArray.create([
          8,
          9,
          9,
          11,
          13,
          15,
          15,
          5,
          7,
          7,
          8,
          11,
          14,
          14,
          12,
          6,
          9,
          13,
          15,
          7,
          12,
          8,
          9,
          11,
          7,
          7,
          12,
          7,
          6,
          15,
          13,
          11,
          9,
          7,
          15,
          11,
          8,
          6,
          6,
          14,
          12,
          13,
          5,
          14,
          13,
          13,
          7,
          5,
          15,
          5,
          8,
          11,
          14,
          14,
          6,
          14,
          6,
          9,
          12,
          9,
          12,
          5,
          15,
          8,
          8,
          5,
          12,
          9,
          12,
          5,
          14,
          6,
          8,
          13,
          6,
          5,
          15,
          13,
          11,
          11
        ]);
        var _hl = WordArray.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
        var _hr = WordArray.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
        var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
          _doReset: function() {
            this._hash = WordArray.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
          },
          _doProcessBlock: function(M, offset) {
            for (var i = 0; i < 16; i++) {
              var offset_i = offset + i;
              var M_offset_i = M[offset_i];
              M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
            }
            var H = this._hash.words;
            var hl = _hl.words;
            var hr = _hr.words;
            var zl = _zl.words;
            var zr = _zr.words;
            var sl = _sl.words;
            var sr = _sr.words;
            var al, bl, cl, dl, el;
            var ar, br, cr, dr, er;
            ar = al = H[0];
            br = bl = H[1];
            cr = cl = H[2];
            dr = dl = H[3];
            er = el = H[4];
            var t;
            for (var i = 0; i < 80; i += 1) {
              t = al + M[offset + zl[i]] | 0;
              if (i < 16) {
                t += f1(bl, cl, dl) + hl[0];
              } else if (i < 32) {
                t += f2(bl, cl, dl) + hl[1];
              } else if (i < 48) {
                t += f3(bl, cl, dl) + hl[2];
              } else if (i < 64) {
                t += f4(bl, cl, dl) + hl[3];
              } else {
                t += f5(bl, cl, dl) + hl[4];
              }
              t = t | 0;
              t = rotl(t, sl[i]);
              t = t + el | 0;
              al = el;
              el = dl;
              dl = rotl(cl, 10);
              cl = bl;
              bl = t;
              t = ar + M[offset + zr[i]] | 0;
              if (i < 16) {
                t += f5(br, cr, dr) + hr[0];
              } else if (i < 32) {
                t += f4(br, cr, dr) + hr[1];
              } else if (i < 48) {
                t += f3(br, cr, dr) + hr[2];
              } else if (i < 64) {
                t += f2(br, cr, dr) + hr[3];
              } else {
                t += f1(br, cr, dr) + hr[4];
              }
              t = t | 0;
              t = rotl(t, sr[i]);
              t = t + er | 0;
              ar = er;
              er = dr;
              dr = rotl(cr, 10);
              cr = br;
              br = t;
            }
            t = H[1] + cl + dr | 0;
            H[1] = H[2] + dl + er | 0;
            H[2] = H[3] + el + ar | 0;
            H[3] = H[4] + al + br | 0;
            H[4] = H[0] + bl + cr | 0;
            H[0] = t;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 16711935 | (nBitsTotal << 24 | nBitsTotal >>> 8) & 4278255360;
            data.sigBytes = (dataWords.length + 1) * 4;
            this._process();
            var hash = this._hash;
            var H = hash.words;
            for (var i = 0; i < 5; i++) {
              var H_i = H[i];
              H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
            }
            return hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        function f1(x, y, z) {
          return x ^ y ^ z;
        }
        function f2(x, y, z) {
          return x & y | ~x & z;
        }
        function f3(x, y, z) {
          return (x | ~y) ^ z;
        }
        function f4(x, y, z) {
          return x & z | y & ~z;
        }
        function f5(x, y, z) {
          return x ^ (y | ~z);
        }
        function rotl(x, n) {
          return x << n | x >>> 32 - n;
        }
        C.RIPEMD160 = Hasher._createHelper(RIPEMD160);
        C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
      })(Math);
      return CryptoJS.RIPEMD160;
    });
  }
});

// node_modules/crypto-js/hmac.js
var require_hmac = __commonJS({
  "node_modules/crypto-js/hmac.js"(exports, module2) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var C_algo = C.algo;
        var HMAC = C_algo.HMAC = Base.extend({
          init: function(hasher, key) {
            hasher = this._hasher = new hasher.init();
            if (typeof key == "string") {
              key = Utf8.parse(key);
            }
            var hasherBlockSize = hasher.blockSize;
            var hasherBlockSizeBytes = hasherBlockSize * 4;
            if (key.sigBytes > hasherBlockSizeBytes) {
              key = hasher.finalize(key);
            }
            key.clamp();
            var oKey = this._oKey = key.clone();
            var iKey = this._iKey = key.clone();
            var oKeyWords = oKey.words;
            var iKeyWords = iKey.words;
            for (var i = 0; i < hasherBlockSize; i++) {
              oKeyWords[i] ^= 1549556828;
              iKeyWords[i] ^= 909522486;
            }
            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
            this.reset();
          },
          reset: function() {
            var hasher = this._hasher;
            hasher.reset();
            hasher.update(this._iKey);
          },
          update: function(messageUpdate) {
            this._hasher.update(messageUpdate);
            return this;
          },
          finalize: function(messageUpdate) {
            var hasher = this._hasher;
            var innerHash = hasher.finalize(messageUpdate);
            hasher.reset();
            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
            return hmac;
          }
        });
      })();
    });
  }
});

// node_modules/crypto-js/pbkdf2.js
var require_pbkdf2 = __commonJS({
  "node_modules/crypto-js/pbkdf2.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_sha1(), require_hmac());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./sha1", "./hmac"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var SHA1 = C_algo.SHA1;
        var HMAC = C_algo.HMAC;
        var PBKDF2 = C_algo.PBKDF2 = Base.extend({
          cfg: Base.extend({
            keySize: 128 / 32,
            hasher: SHA1,
            iterations: 1
          }),
          init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
          },
          compute: function(password, salt) {
            var cfg = this.cfg;
            var hmac = HMAC.create(cfg.hasher, password);
            var derivedKey = WordArray.create();
            var blockIndex = WordArray.create([1]);
            var derivedKeyWords = derivedKey.words;
            var blockIndexWords = blockIndex.words;
            var keySize = cfg.keySize;
            var iterations = cfg.iterations;
            while (derivedKeyWords.length < keySize) {
              var block = hmac.update(salt).finalize(blockIndex);
              hmac.reset();
              var blockWords = block.words;
              var blockWordsLength = blockWords.length;
              var intermediate = block;
              for (var i = 1; i < iterations; i++) {
                intermediate = hmac.finalize(intermediate);
                hmac.reset();
                var intermediateWords = intermediate.words;
                for (var j = 0; j < blockWordsLength; j++) {
                  blockWords[j] ^= intermediateWords[j];
                }
              }
              derivedKey.concat(block);
              blockIndexWords[0]++;
            }
            derivedKey.sigBytes = keySize * 4;
            return derivedKey;
          }
        });
        C.PBKDF2 = function(password, salt, cfg) {
          return PBKDF2.create(cfg).compute(password, salt);
        };
      })();
      return CryptoJS.PBKDF2;
    });
  }
});

// node_modules/crypto-js/evpkdf.js
var require_evpkdf = __commonJS({
  "node_modules/crypto-js/evpkdf.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_sha1(), require_hmac());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./sha1", "./hmac"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var MD5 = C_algo.MD5;
        var EvpKDF = C_algo.EvpKDF = Base.extend({
          cfg: Base.extend({
            keySize: 128 / 32,
            hasher: MD5,
            iterations: 1
          }),
          init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
          },
          compute: function(password, salt) {
            var cfg = this.cfg;
            var hasher = cfg.hasher.create();
            var derivedKey = WordArray.create();
            var derivedKeyWords = derivedKey.words;
            var keySize = cfg.keySize;
            var iterations = cfg.iterations;
            while (derivedKeyWords.length < keySize) {
              if (block) {
                hasher.update(block);
              }
              var block = hasher.update(password).finalize(salt);
              hasher.reset();
              for (var i = 1; i < iterations; i++) {
                block = hasher.finalize(block);
                hasher.reset();
              }
              derivedKey.concat(block);
            }
            derivedKey.sigBytes = keySize * 4;
            return derivedKey;
          }
        });
        C.EvpKDF = function(password, salt, cfg) {
          return EvpKDF.create(cfg).compute(password, salt);
        };
      })();
      return CryptoJS.EvpKDF;
    });
  }
});

// node_modules/crypto-js/cipher-core.js
var require_cipher_core = __commonJS({
  "node_modules/crypto-js/cipher-core.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_evpkdf());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./evpkdf"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      CryptoJS.lib.Cipher || function(undefined2) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var Base64 = C_enc.Base64;
        var C_algo = C.algo;
        var EvpKDF = C_algo.EvpKDF;
        var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
          cfg: Base.extend(),
          createEncryptor: function(key, cfg) {
            return this.create(this._ENC_XFORM_MODE, key, cfg);
          },
          createDecryptor: function(key, cfg) {
            return this.create(this._DEC_XFORM_MODE, key, cfg);
          },
          init: function(xformMode, key, cfg) {
            this.cfg = this.cfg.extend(cfg);
            this._xformMode = xformMode;
            this._key = key;
            this.reset();
          },
          reset: function() {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
          },
          process: function(dataUpdate) {
            this._append(dataUpdate);
            return this._process();
          },
          finalize: function(dataUpdate) {
            if (dataUpdate) {
              this._append(dataUpdate);
            }
            var finalProcessedData = this._doFinalize();
            return finalProcessedData;
          },
          keySize: 128 / 32,
          ivSize: 128 / 32,
          _ENC_XFORM_MODE: 1,
          _DEC_XFORM_MODE: 2,
          _createHelper: function() {
            function selectCipherStrategy(key) {
              if (typeof key == "string") {
                return PasswordBasedCipher;
              } else {
                return SerializableCipher;
              }
            }
            return function(cipher) {
              return {
                encrypt: function(message, key, cfg) {
                  return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                },
                decrypt: function(ciphertext, key, cfg) {
                  return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                }
              };
            };
          }()
        });
        var StreamCipher = C_lib.StreamCipher = Cipher.extend({
          _doFinalize: function() {
            var finalProcessedBlocks = this._process(true);
            return finalProcessedBlocks;
          },
          blockSize: 1
        });
        var C_mode = C.mode = {};
        var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
          createEncryptor: function(cipher, iv) {
            return this.Encryptor.create(cipher, iv);
          },
          createDecryptor: function(cipher, iv) {
            return this.Decryptor.create(cipher, iv);
          },
          init: function(cipher, iv) {
            this._cipher = cipher;
            this._iv = iv;
          }
        });
        var CBC = C_mode.CBC = function() {
          var CBC2 = BlockCipherMode.extend();
          CBC2.Encryptor = CBC2.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              xorBlock.call(this, words, offset, blockSize);
              cipher.encryptBlock(words, offset);
              this._prevBlock = words.slice(offset, offset + blockSize);
            }
          });
          CBC2.Decryptor = CBC2.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var thisBlock = words.slice(offset, offset + blockSize);
              cipher.decryptBlock(words, offset);
              xorBlock.call(this, words, offset, blockSize);
              this._prevBlock = thisBlock;
            }
          });
          function xorBlock(words, offset, blockSize) {
            var iv = this._iv;
            if (iv) {
              var block = iv;
              this._iv = undefined2;
            } else {
              var block = this._prevBlock;
            }
            for (var i = 0; i < blockSize; i++) {
              words[offset + i] ^= block[i];
            }
          }
          return CBC2;
        }();
        var C_pad = C.pad = {};
        var Pkcs7 = C_pad.Pkcs7 = {
          pad: function(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
            var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
            var paddingWords = [];
            for (var i = 0; i < nPaddingBytes; i += 4) {
              paddingWords.push(paddingWord);
            }
            var padding = WordArray.create(paddingWords, nPaddingBytes);
            data.concat(padding);
          },
          unpad: function(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
            data.sigBytes -= nPaddingBytes;
          }
        };
        var BlockCipher = C_lib.BlockCipher = Cipher.extend({
          cfg: Cipher.cfg.extend({
            mode: CBC,
            padding: Pkcs7
          }),
          reset: function() {
            Cipher.reset.call(this);
            var cfg = this.cfg;
            var iv = cfg.iv;
            var mode = cfg.mode;
            if (this._xformMode == this._ENC_XFORM_MODE) {
              var modeCreator = mode.createEncryptor;
            } else {
              var modeCreator = mode.createDecryptor;
              this._minBufferSize = 1;
            }
            if (this._mode && this._mode.__creator == modeCreator) {
              this._mode.init(this, iv && iv.words);
            } else {
              this._mode = modeCreator.call(mode, this, iv && iv.words);
              this._mode.__creator = modeCreator;
            }
          },
          _doProcessBlock: function(words, offset) {
            this._mode.processBlock(words, offset);
          },
          _doFinalize: function() {
            var padding = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
              padding.pad(this._data, this.blockSize);
              var finalProcessedBlocks = this._process(true);
            } else {
              var finalProcessedBlocks = this._process(true);
              padding.unpad(finalProcessedBlocks);
            }
            return finalProcessedBlocks;
          },
          blockSize: 128 / 32
        });
        var CipherParams = C_lib.CipherParams = Base.extend({
          init: function(cipherParams) {
            this.mixIn(cipherParams);
          },
          toString: function(formatter) {
            return (formatter || this.formatter).stringify(this);
          }
        });
        var C_format = C.format = {};
        var OpenSSLFormatter = C_format.OpenSSL = {
          stringify: function(cipherParams) {
            var ciphertext = cipherParams.ciphertext;
            var salt = cipherParams.salt;
            if (salt) {
              var wordArray = WordArray.create([1398893684, 1701076831]).concat(salt).concat(ciphertext);
            } else {
              var wordArray = ciphertext;
            }
            return wordArray.toString(Base64);
          },
          parse: function(openSSLStr) {
            var ciphertext = Base64.parse(openSSLStr);
            var ciphertextWords = ciphertext.words;
            if (ciphertextWords[0] == 1398893684 && ciphertextWords[1] == 1701076831) {
              var salt = WordArray.create(ciphertextWords.slice(2, 4));
              ciphertextWords.splice(0, 4);
              ciphertext.sigBytes -= 16;
            }
            return CipherParams.create({ ciphertext, salt });
          }
        };
        var SerializableCipher = C_lib.SerializableCipher = Base.extend({
          cfg: Base.extend({
            format: OpenSSLFormatter
          }),
          encrypt: function(cipher, message, key, cfg) {
            cfg = this.cfg.extend(cfg);
            var encryptor = cipher.createEncryptor(key, cfg);
            var ciphertext = encryptor.finalize(message);
            var cipherCfg = encryptor.cfg;
            return CipherParams.create({
              ciphertext,
              key,
              iv: cipherCfg.iv,
              algorithm: cipher,
              mode: cipherCfg.mode,
              padding: cipherCfg.padding,
              blockSize: cipher.blockSize,
              formatter: cfg.format
            });
          },
          decrypt: function(cipher, ciphertext, key, cfg) {
            cfg = this.cfg.extend(cfg);
            ciphertext = this._parse(ciphertext, cfg.format);
            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
            return plaintext;
          },
          _parse: function(ciphertext, format) {
            if (typeof ciphertext == "string") {
              return format.parse(ciphertext, this);
            } else {
              return ciphertext;
            }
          }
        });
        var C_kdf = C.kdf = {};
        var OpenSSLKdf = C_kdf.OpenSSL = {
          execute: function(password, keySize, ivSize, salt) {
            if (!salt) {
              salt = WordArray.random(64 / 8);
            }
            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);
            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
            key.sigBytes = keySize * 4;
            return CipherParams.create({ key, iv, salt });
          }
        };
        var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
          cfg: SerializableCipher.cfg.extend({
            kdf: OpenSSLKdf
          }),
          encrypt: function(cipher, message, password, cfg) {
            cfg = this.cfg.extend(cfg);
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);
            cfg.iv = derivedParams.iv;
            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
            ciphertext.mixIn(derivedParams);
            return ciphertext;
          },
          decrypt: function(cipher, ciphertext, password, cfg) {
            cfg = this.cfg.extend(cfg);
            ciphertext = this._parse(ciphertext, cfg.format);
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
            cfg.iv = derivedParams.iv;
            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
            return plaintext;
          }
        });
      }();
    });
  }
});

// node_modules/crypto-js/mode-cfb.js
var require_mode_cfb = __commonJS({
  "node_modules/crypto-js/mode-cfb.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      CryptoJS.mode.CFB = function() {
        var CFB = CryptoJS.lib.BlockCipherMode.extend();
        CFB.Encryptor = CFB.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
            this._prevBlock = words.slice(offset, offset + blockSize);
          }
        });
        CFB.Decryptor = CFB.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var thisBlock = words.slice(offset, offset + blockSize);
            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
            this._prevBlock = thisBlock;
          }
        });
        function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
          var iv = this._iv;
          if (iv) {
            var keystream = iv.slice(0);
            this._iv = void 0;
          } else {
            var keystream = this._prevBlock;
          }
          cipher.encryptBlock(keystream, 0);
          for (var i = 0; i < blockSize; i++) {
            words[offset + i] ^= keystream[i];
          }
        }
        return CFB;
      }();
      return CryptoJS.mode.CFB;
    });
  }
});

// node_modules/crypto-js/mode-ctr.js
var require_mode_ctr = __commonJS({
  "node_modules/crypto-js/mode-ctr.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      CryptoJS.mode.CTR = function() {
        var CTR = CryptoJS.lib.BlockCipherMode.extend();
        var Encryptor = CTR.Encryptor = CTR.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;
            if (iv) {
              counter = this._counter = iv.slice(0);
              this._iv = void 0;
            }
            var keystream = counter.slice(0);
            cipher.encryptBlock(keystream, 0);
            counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;
            for (var i = 0; i < blockSize; i++) {
              words[offset + i] ^= keystream[i];
            }
          }
        });
        CTR.Decryptor = Encryptor;
        return CTR;
      }();
      return CryptoJS.mode.CTR;
    });
  }
});

// node_modules/crypto-js/mode-ctr-gladman.js
var require_mode_ctr_gladman = __commonJS({
  "node_modules/crypto-js/mode-ctr-gladman.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      CryptoJS.mode.CTRGladman = function() {
        var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();
        function incWord(word) {
          if ((word >> 24 & 255) === 255) {
            var b1 = word >> 16 & 255;
            var b2 = word >> 8 & 255;
            var b3 = word & 255;
            if (b1 === 255) {
              b1 = 0;
              if (b2 === 255) {
                b2 = 0;
                if (b3 === 255) {
                  b3 = 0;
                } else {
                  ++b3;
                }
              } else {
                ++b2;
              }
            } else {
              ++b1;
            }
            word = 0;
            word += b1 << 16;
            word += b2 << 8;
            word += b3;
          } else {
            word += 1 << 24;
          }
          return word;
        }
        function incCounter(counter) {
          if ((counter[0] = incWord(counter[0])) === 0) {
            counter[1] = incWord(counter[1]);
          }
          return counter;
        }
        var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;
            if (iv) {
              counter = this._counter = iv.slice(0);
              this._iv = void 0;
            }
            incCounter(counter);
            var keystream = counter.slice(0);
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) {
              words[offset + i] ^= keystream[i];
            }
          }
        });
        CTRGladman.Decryptor = Encryptor;
        return CTRGladman;
      }();
      return CryptoJS.mode.CTRGladman;
    });
  }
});

// node_modules/crypto-js/mode-ofb.js
var require_mode_ofb = __commonJS({
  "node_modules/crypto-js/mode-ofb.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      CryptoJS.mode.OFB = function() {
        var OFB = CryptoJS.lib.BlockCipherMode.extend();
        var Encryptor = OFB.Encryptor = OFB.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var keystream = this._keystream;
            if (iv) {
              keystream = this._keystream = iv.slice(0);
              this._iv = void 0;
            }
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) {
              words[offset + i] ^= keystream[i];
            }
          }
        });
        OFB.Decryptor = Encryptor;
        return OFB;
      }();
      return CryptoJS.mode.OFB;
    });
  }
});

// node_modules/crypto-js/mode-ecb.js
var require_mode_ecb = __commonJS({
  "node_modules/crypto-js/mode-ecb.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      CryptoJS.mode.ECB = function() {
        var ECB = CryptoJS.lib.BlockCipherMode.extend();
        ECB.Encryptor = ECB.extend({
          processBlock: function(words, offset) {
            this._cipher.encryptBlock(words, offset);
          }
        });
        ECB.Decryptor = ECB.extend({
          processBlock: function(words, offset) {
            this._cipher.decryptBlock(words, offset);
          }
        });
        return ECB;
      }();
      return CryptoJS.mode.ECB;
    });
  }
});

// node_modules/crypto-js/pad-ansix923.js
var require_pad_ansix923 = __commonJS({
  "node_modules/crypto-js/pad-ansix923.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      CryptoJS.pad.AnsiX923 = {
        pad: function(data, blockSize) {
          var dataSigBytes = data.sigBytes;
          var blockSizeBytes = blockSize * 4;
          var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
          var lastBytePos = dataSigBytes + nPaddingBytes - 1;
          data.clamp();
          data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
          data.sigBytes += nPaddingBytes;
        },
        unpad: function(data) {
          var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
          data.sigBytes -= nPaddingBytes;
        }
      };
      return CryptoJS.pad.Ansix923;
    });
  }
});

// node_modules/crypto-js/pad-iso10126.js
var require_pad_iso10126 = __commonJS({
  "node_modules/crypto-js/pad-iso10126.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      CryptoJS.pad.Iso10126 = {
        pad: function(data, blockSize) {
          var blockSizeBytes = blockSize * 4;
          var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
          data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
        },
        unpad: function(data) {
          var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
          data.sigBytes -= nPaddingBytes;
        }
      };
      return CryptoJS.pad.Iso10126;
    });
  }
});

// node_modules/crypto-js/pad-iso97971.js
var require_pad_iso97971 = __commonJS({
  "node_modules/crypto-js/pad-iso97971.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      CryptoJS.pad.Iso97971 = {
        pad: function(data, blockSize) {
          data.concat(CryptoJS.lib.WordArray.create([2147483648], 1));
          CryptoJS.pad.ZeroPadding.pad(data, blockSize);
        },
        unpad: function(data) {
          CryptoJS.pad.ZeroPadding.unpad(data);
          data.sigBytes--;
        }
      };
      return CryptoJS.pad.Iso97971;
    });
  }
});

// node_modules/crypto-js/pad-zeropadding.js
var require_pad_zeropadding = __commonJS({
  "node_modules/crypto-js/pad-zeropadding.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      CryptoJS.pad.ZeroPadding = {
        pad: function(data, blockSize) {
          var blockSizeBytes = blockSize * 4;
          data.clamp();
          data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
        },
        unpad: function(data) {
          var dataWords = data.words;
          var i = data.sigBytes - 1;
          while (!(dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 255)) {
            i--;
          }
          data.sigBytes = i + 1;
        }
      };
      return CryptoJS.pad.ZeroPadding;
    });
  }
});

// node_modules/crypto-js/pad-nopadding.js
var require_pad_nopadding = __commonJS({
  "node_modules/crypto-js/pad-nopadding.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      CryptoJS.pad.NoPadding = {
        pad: function() {
        },
        unpad: function() {
        }
      };
      return CryptoJS.pad.NoPadding;
    });
  }
});

// node_modules/crypto-js/format-hex.js
var require_format_hex = __commonJS({
  "node_modules/crypto-js/format-hex.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function(undefined2) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var CipherParams = C_lib.CipherParams;
        var C_enc = C.enc;
        var Hex = C_enc.Hex;
        var C_format = C.format;
        var HexFormatter = C_format.Hex = {
          stringify: function(cipherParams) {
            return cipherParams.ciphertext.toString(Hex);
          },
          parse: function(input) {
            var ciphertext = Hex.parse(input);
            return CipherParams.create({ ciphertext });
          }
        };
      })();
      return CryptoJS.format.Hex;
    });
  }
});

// node_modules/crypto-js/aes.js
var require_aes = __commonJS({
  "node_modules/crypto-js/aes.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;
        var SBOX = [];
        var INV_SBOX = [];
        var SUB_MIX_0 = [];
        var SUB_MIX_1 = [];
        var SUB_MIX_2 = [];
        var SUB_MIX_3 = [];
        var INV_SUB_MIX_0 = [];
        var INV_SUB_MIX_1 = [];
        var INV_SUB_MIX_2 = [];
        var INV_SUB_MIX_3 = [];
        (function() {
          var d = [];
          for (var i = 0; i < 256; i++) {
            if (i < 128) {
              d[i] = i << 1;
            } else {
              d[i] = i << 1 ^ 283;
            }
          }
          var x = 0;
          var xi = 0;
          for (var i = 0; i < 256; i++) {
            var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
            sx = sx >>> 8 ^ sx & 255 ^ 99;
            SBOX[x] = sx;
            INV_SBOX[sx] = x;
            var x2 = d[x];
            var x4 = d[x2];
            var x8 = d[x4];
            var t = d[sx] * 257 ^ sx * 16843008;
            SUB_MIX_0[x] = t << 24 | t >>> 8;
            SUB_MIX_1[x] = t << 16 | t >>> 16;
            SUB_MIX_2[x] = t << 8 | t >>> 24;
            SUB_MIX_3[x] = t;
            var t = x8 * 16843009 ^ x4 * 65537 ^ x2 * 257 ^ x * 16843008;
            INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
            INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
            INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
            INV_SUB_MIX_3[sx] = t;
            if (!x) {
              x = xi = 1;
            } else {
              x = x2 ^ d[d[d[x8 ^ x2]]];
              xi ^= d[d[xi]];
            }
          }
        })();
        var RCON = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
        var AES = C_algo.AES = BlockCipher.extend({
          _doReset: function() {
            if (this._nRounds && this._keyPriorReset === this._key) {
              return;
            }
            var key = this._keyPriorReset = this._key;
            var keyWords = key.words;
            var keySize = key.sigBytes / 4;
            var nRounds = this._nRounds = keySize + 6;
            var ksRows = (nRounds + 1) * 4;
            var keySchedule = this._keySchedule = [];
            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
              if (ksRow < keySize) {
                keySchedule[ksRow] = keyWords[ksRow];
              } else {
                var t = keySchedule[ksRow - 1];
                if (!(ksRow % keySize)) {
                  t = t << 8 | t >>> 24;
                  t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                  t ^= RCON[ksRow / keySize | 0] << 24;
                } else if (keySize > 6 && ksRow % keySize == 4) {
                  t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                }
                keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
              }
            }
            var invKeySchedule = this._invKeySchedule = [];
            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
              var ksRow = ksRows - invKsRow;
              if (invKsRow % 4) {
                var t = keySchedule[ksRow];
              } else {
                var t = keySchedule[ksRow - 4];
              }
              if (invKsRow < 4 || ksRow <= 4) {
                invKeySchedule[invKsRow] = t;
              } else {
                invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[t & 255]];
              }
            }
          },
          encryptBlock: function(M, offset) {
            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
          },
          decryptBlock: function(M, offset) {
            var t = M[offset + 1];
            M[offset + 1] = M[offset + 3];
            M[offset + 3] = t;
            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
            var t = M[offset + 1];
            M[offset + 1] = M[offset + 3];
            M[offset + 3] = t;
          },
          _doCryptBlock: function(M, offset, keySchedule, SUB_MIX_02, SUB_MIX_12, SUB_MIX_22, SUB_MIX_32, SBOX2) {
            var nRounds = this._nRounds;
            var s0 = M[offset] ^ keySchedule[0];
            var s1 = M[offset + 1] ^ keySchedule[1];
            var s2 = M[offset + 2] ^ keySchedule[2];
            var s3 = M[offset + 3] ^ keySchedule[3];
            var ksRow = 4;
            for (var round = 1; round < nRounds; round++) {
              var t0 = SUB_MIX_02[s0 >>> 24] ^ SUB_MIX_12[s1 >>> 16 & 255] ^ SUB_MIX_22[s2 >>> 8 & 255] ^ SUB_MIX_32[s3 & 255] ^ keySchedule[ksRow++];
              var t1 = SUB_MIX_02[s1 >>> 24] ^ SUB_MIX_12[s2 >>> 16 & 255] ^ SUB_MIX_22[s3 >>> 8 & 255] ^ SUB_MIX_32[s0 & 255] ^ keySchedule[ksRow++];
              var t2 = SUB_MIX_02[s2 >>> 24] ^ SUB_MIX_12[s3 >>> 16 & 255] ^ SUB_MIX_22[s0 >>> 8 & 255] ^ SUB_MIX_32[s1 & 255] ^ keySchedule[ksRow++];
              var t3 = SUB_MIX_02[s3 >>> 24] ^ SUB_MIX_12[s0 >>> 16 & 255] ^ SUB_MIX_22[s1 >>> 8 & 255] ^ SUB_MIX_32[s2 & 255] ^ keySchedule[ksRow++];
              s0 = t0;
              s1 = t1;
              s2 = t2;
              s3 = t3;
            }
            var t0 = (SBOX2[s0 >>> 24] << 24 | SBOX2[s1 >>> 16 & 255] << 16 | SBOX2[s2 >>> 8 & 255] << 8 | SBOX2[s3 & 255]) ^ keySchedule[ksRow++];
            var t1 = (SBOX2[s1 >>> 24] << 24 | SBOX2[s2 >>> 16 & 255] << 16 | SBOX2[s3 >>> 8 & 255] << 8 | SBOX2[s0 & 255]) ^ keySchedule[ksRow++];
            var t2 = (SBOX2[s2 >>> 24] << 24 | SBOX2[s3 >>> 16 & 255] << 16 | SBOX2[s0 >>> 8 & 255] << 8 | SBOX2[s1 & 255]) ^ keySchedule[ksRow++];
            var t3 = (SBOX2[s3 >>> 24] << 24 | SBOX2[s0 >>> 16 & 255] << 16 | SBOX2[s1 >>> 8 & 255] << 8 | SBOX2[s2 & 255]) ^ keySchedule[ksRow++];
            M[offset] = t0;
            M[offset + 1] = t1;
            M[offset + 2] = t2;
            M[offset + 3] = t3;
          },
          keySize: 256 / 32
        });
        C.AES = BlockCipher._createHelper(AES);
      })();
      return CryptoJS.AES;
    });
  }
});

// node_modules/crypto-js/tripledes.js
var require_tripledes = __commonJS({
  "node_modules/crypto-js/tripledes.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;
        var PC1 = [
          57,
          49,
          41,
          33,
          25,
          17,
          9,
          1,
          58,
          50,
          42,
          34,
          26,
          18,
          10,
          2,
          59,
          51,
          43,
          35,
          27,
          19,
          11,
          3,
          60,
          52,
          44,
          36,
          63,
          55,
          47,
          39,
          31,
          23,
          15,
          7,
          62,
          54,
          46,
          38,
          30,
          22,
          14,
          6,
          61,
          53,
          45,
          37,
          29,
          21,
          13,
          5,
          28,
          20,
          12,
          4
        ];
        var PC2 = [
          14,
          17,
          11,
          24,
          1,
          5,
          3,
          28,
          15,
          6,
          21,
          10,
          23,
          19,
          12,
          4,
          26,
          8,
          16,
          7,
          27,
          20,
          13,
          2,
          41,
          52,
          31,
          37,
          47,
          55,
          30,
          40,
          51,
          45,
          33,
          48,
          44,
          49,
          39,
          56,
          34,
          53,
          46,
          42,
          50,
          36,
          29,
          32
        ];
        var BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
        var SBOX_P = [
          {
            0: 8421888,
            268435456: 32768,
            536870912: 8421378,
            805306368: 2,
            1073741824: 512,
            1342177280: 8421890,
            1610612736: 8389122,
            1879048192: 8388608,
            2147483648: 514,
            2415919104: 8389120,
            2684354560: 33280,
            2952790016: 8421376,
            3221225472: 32770,
            3489660928: 8388610,
            3758096384: 0,
            4026531840: 33282,
            134217728: 0,
            402653184: 8421890,
            671088640: 33282,
            939524096: 32768,
            1207959552: 8421888,
            1476395008: 512,
            1744830464: 8421378,
            2013265920: 2,
            2281701376: 8389120,
            2550136832: 33280,
            2818572288: 8421376,
            3087007744: 8389122,
            3355443200: 8388610,
            3623878656: 32770,
            3892314112: 514,
            4160749568: 8388608,
            1: 32768,
            268435457: 2,
            536870913: 8421888,
            805306369: 8388608,
            1073741825: 8421378,
            1342177281: 33280,
            1610612737: 512,
            1879048193: 8389122,
            2147483649: 8421890,
            2415919105: 8421376,
            2684354561: 8388610,
            2952790017: 33282,
            3221225473: 514,
            3489660929: 8389120,
            3758096385: 32770,
            4026531841: 0,
            134217729: 8421890,
            402653185: 8421376,
            671088641: 8388608,
            939524097: 512,
            1207959553: 32768,
            1476395009: 8388610,
            1744830465: 2,
            2013265921: 33282,
            2281701377: 32770,
            2550136833: 8389122,
            2818572289: 514,
            3087007745: 8421888,
            3355443201: 8389120,
            3623878657: 0,
            3892314113: 33280,
            4160749569: 8421378
          },
          {
            0: 1074282512,
            16777216: 16384,
            33554432: 524288,
            50331648: 1074266128,
            67108864: 1073741840,
            83886080: 1074282496,
            100663296: 1073758208,
            117440512: 16,
            134217728: 540672,
            150994944: 1073758224,
            167772160: 1073741824,
            184549376: 540688,
            201326592: 524304,
            218103808: 0,
            234881024: 16400,
            251658240: 1074266112,
            8388608: 1073758208,
            25165824: 540688,
            41943040: 16,
            58720256: 1073758224,
            75497472: 1074282512,
            92274688: 1073741824,
            109051904: 524288,
            125829120: 1074266128,
            142606336: 524304,
            159383552: 0,
            176160768: 16384,
            192937984: 1074266112,
            209715200: 1073741840,
            226492416: 540672,
            243269632: 1074282496,
            260046848: 16400,
            268435456: 0,
            285212672: 1074266128,
            301989888: 1073758224,
            318767104: 1074282496,
            335544320: 1074266112,
            352321536: 16,
            369098752: 540688,
            385875968: 16384,
            402653184: 16400,
            419430400: 524288,
            436207616: 524304,
            452984832: 1073741840,
            469762048: 540672,
            486539264: 1073758208,
            503316480: 1073741824,
            520093696: 1074282512,
            276824064: 540688,
            293601280: 524288,
            310378496: 1074266112,
            327155712: 16384,
            343932928: 1073758208,
            360710144: 1074282512,
            377487360: 16,
            394264576: 1073741824,
            411041792: 1074282496,
            427819008: 1073741840,
            444596224: 1073758224,
            461373440: 524304,
            478150656: 0,
            494927872: 16400,
            511705088: 1074266128,
            528482304: 540672
          },
          {
            0: 260,
            1048576: 0,
            2097152: 67109120,
            3145728: 65796,
            4194304: 65540,
            5242880: 67108868,
            6291456: 67174660,
            7340032: 67174400,
            8388608: 67108864,
            9437184: 67174656,
            10485760: 65792,
            11534336: 67174404,
            12582912: 67109124,
            13631488: 65536,
            14680064: 4,
            15728640: 256,
            524288: 67174656,
            1572864: 67174404,
            2621440: 0,
            3670016: 67109120,
            4718592: 67108868,
            5767168: 65536,
            6815744: 65540,
            7864320: 260,
            8912896: 4,
            9961472: 256,
            11010048: 67174400,
            12058624: 65796,
            13107200: 65792,
            14155776: 67109124,
            15204352: 67174660,
            16252928: 67108864,
            16777216: 67174656,
            17825792: 65540,
            18874368: 65536,
            19922944: 67109120,
            20971520: 256,
            22020096: 67174660,
            23068672: 67108868,
            24117248: 0,
            25165824: 67109124,
            26214400: 67108864,
            27262976: 4,
            28311552: 65792,
            29360128: 67174400,
            30408704: 260,
            31457280: 65796,
            32505856: 67174404,
            17301504: 67108864,
            18350080: 260,
            19398656: 67174656,
            20447232: 0,
            21495808: 65540,
            22544384: 67109120,
            23592960: 256,
            24641536: 67174404,
            25690112: 65536,
            26738688: 67174660,
            27787264: 65796,
            28835840: 67108868,
            29884416: 67109124,
            30932992: 67174400,
            31981568: 4,
            33030144: 65792
          },
          {
            0: 2151682048,
            65536: 2147487808,
            131072: 4198464,
            196608: 2151677952,
            262144: 0,
            327680: 4198400,
            393216: 2147483712,
            458752: 4194368,
            524288: 2147483648,
            589824: 4194304,
            655360: 64,
            720896: 2147487744,
            786432: 2151678016,
            851968: 4160,
            917504: 4096,
            983040: 2151682112,
            32768: 2147487808,
            98304: 64,
            163840: 2151678016,
            229376: 2147487744,
            294912: 4198400,
            360448: 2151682112,
            425984: 0,
            491520: 2151677952,
            557056: 4096,
            622592: 2151682048,
            688128: 4194304,
            753664: 4160,
            819200: 2147483648,
            884736: 4194368,
            950272: 4198464,
            1015808: 2147483712,
            1048576: 4194368,
            1114112: 4198400,
            1179648: 2147483712,
            1245184: 0,
            1310720: 4160,
            1376256: 2151678016,
            1441792: 2151682048,
            1507328: 2147487808,
            1572864: 2151682112,
            1638400: 2147483648,
            1703936: 2151677952,
            1769472: 4198464,
            1835008: 2147487744,
            1900544: 4194304,
            1966080: 64,
            2031616: 4096,
            1081344: 2151677952,
            1146880: 2151682112,
            1212416: 0,
            1277952: 4198400,
            1343488: 4194368,
            1409024: 2147483648,
            1474560: 2147487808,
            1540096: 64,
            1605632: 2147483712,
            1671168: 4096,
            1736704: 2147487744,
            1802240: 2151678016,
            1867776: 4160,
            1933312: 2151682048,
            1998848: 4194304,
            2064384: 4198464
          },
          {
            0: 128,
            4096: 17039360,
            8192: 262144,
            12288: 536870912,
            16384: 537133184,
            20480: 16777344,
            24576: 553648256,
            28672: 262272,
            32768: 16777216,
            36864: 537133056,
            40960: 536871040,
            45056: 553910400,
            49152: 553910272,
            53248: 0,
            57344: 17039488,
            61440: 553648128,
            2048: 17039488,
            6144: 553648256,
            10240: 128,
            14336: 17039360,
            18432: 262144,
            22528: 537133184,
            26624: 553910272,
            30720: 536870912,
            34816: 537133056,
            38912: 0,
            43008: 553910400,
            47104: 16777344,
            51200: 536871040,
            55296: 553648128,
            59392: 16777216,
            63488: 262272,
            65536: 262144,
            69632: 128,
            73728: 536870912,
            77824: 553648256,
            81920: 16777344,
            86016: 553910272,
            90112: 537133184,
            94208: 16777216,
            98304: 553910400,
            102400: 553648128,
            106496: 17039360,
            110592: 537133056,
            114688: 262272,
            118784: 536871040,
            122880: 0,
            126976: 17039488,
            67584: 553648256,
            71680: 16777216,
            75776: 17039360,
            79872: 537133184,
            83968: 536870912,
            88064: 17039488,
            92160: 128,
            96256: 553910272,
            100352: 262272,
            104448: 553910400,
            108544: 0,
            112640: 553648128,
            116736: 16777344,
            120832: 262144,
            124928: 537133056,
            129024: 536871040
          },
          {
            0: 268435464,
            256: 8192,
            512: 270532608,
            768: 270540808,
            1024: 268443648,
            1280: 2097152,
            1536: 2097160,
            1792: 268435456,
            2048: 0,
            2304: 268443656,
            2560: 2105344,
            2816: 8,
            3072: 270532616,
            3328: 2105352,
            3584: 8200,
            3840: 270540800,
            128: 270532608,
            384: 270540808,
            640: 8,
            896: 2097152,
            1152: 2105352,
            1408: 268435464,
            1664: 268443648,
            1920: 8200,
            2176: 2097160,
            2432: 8192,
            2688: 268443656,
            2944: 270532616,
            3200: 0,
            3456: 270540800,
            3712: 2105344,
            3968: 268435456,
            4096: 268443648,
            4352: 270532616,
            4608: 270540808,
            4864: 8200,
            5120: 2097152,
            5376: 268435456,
            5632: 268435464,
            5888: 2105344,
            6144: 2105352,
            6400: 0,
            6656: 8,
            6912: 270532608,
            7168: 8192,
            7424: 268443656,
            7680: 270540800,
            7936: 2097160,
            4224: 8,
            4480: 2105344,
            4736: 2097152,
            4992: 268435464,
            5248: 268443648,
            5504: 8200,
            5760: 270540808,
            6016: 270532608,
            6272: 270540800,
            6528: 270532616,
            6784: 8192,
            7040: 2105352,
            7296: 2097160,
            7552: 0,
            7808: 268435456,
            8064: 268443656
          },
          {
            0: 1048576,
            16: 33555457,
            32: 1024,
            48: 1049601,
            64: 34604033,
            80: 0,
            96: 1,
            112: 34603009,
            128: 33555456,
            144: 1048577,
            160: 33554433,
            176: 34604032,
            192: 34603008,
            208: 1025,
            224: 1049600,
            240: 33554432,
            8: 34603009,
            24: 0,
            40: 33555457,
            56: 34604032,
            72: 1048576,
            88: 33554433,
            104: 33554432,
            120: 1025,
            136: 1049601,
            152: 33555456,
            168: 34603008,
            184: 1048577,
            200: 1024,
            216: 34604033,
            232: 1,
            248: 1049600,
            256: 33554432,
            272: 1048576,
            288: 33555457,
            304: 34603009,
            320: 1048577,
            336: 33555456,
            352: 34604032,
            368: 1049601,
            384: 1025,
            400: 34604033,
            416: 1049600,
            432: 1,
            448: 0,
            464: 34603008,
            480: 33554433,
            496: 1024,
            264: 1049600,
            280: 33555457,
            296: 34603009,
            312: 1,
            328: 33554432,
            344: 1048576,
            360: 1025,
            376: 34604032,
            392: 33554433,
            408: 34603008,
            424: 0,
            440: 34604033,
            456: 1049601,
            472: 1024,
            488: 33555456,
            504: 1048577
          },
          {
            0: 134219808,
            1: 131072,
            2: 134217728,
            3: 32,
            4: 131104,
            5: 134350880,
            6: 134350848,
            7: 2048,
            8: 134348800,
            9: 134219776,
            10: 133120,
            11: 134348832,
            12: 2080,
            13: 0,
            14: 134217760,
            15: 133152,
            2147483648: 2048,
            2147483649: 134350880,
            2147483650: 134219808,
            2147483651: 134217728,
            2147483652: 134348800,
            2147483653: 133120,
            2147483654: 133152,
            2147483655: 32,
            2147483656: 134217760,
            2147483657: 2080,
            2147483658: 131104,
            2147483659: 134350848,
            2147483660: 0,
            2147483661: 134348832,
            2147483662: 134219776,
            2147483663: 131072,
            16: 133152,
            17: 134350848,
            18: 32,
            19: 2048,
            20: 134219776,
            21: 134217760,
            22: 134348832,
            23: 131072,
            24: 0,
            25: 131104,
            26: 134348800,
            27: 134219808,
            28: 134350880,
            29: 133120,
            30: 2080,
            31: 134217728,
            2147483664: 131072,
            2147483665: 2048,
            2147483666: 134348832,
            2147483667: 133152,
            2147483668: 32,
            2147483669: 134348800,
            2147483670: 134217728,
            2147483671: 134219808,
            2147483672: 134350880,
            2147483673: 134217760,
            2147483674: 134219776,
            2147483675: 0,
            2147483676: 133120,
            2147483677: 2080,
            2147483678: 131104,
            2147483679: 134350848
          }
        ];
        var SBOX_MASK = [
          4160749569,
          528482304,
          33030144,
          2064384,
          129024,
          8064,
          504,
          2147483679
        ];
        var DES = C_algo.DES = BlockCipher.extend({
          _doReset: function() {
            var key = this._key;
            var keyWords = key.words;
            var keyBits = [];
            for (var i = 0; i < 56; i++) {
              var keyBitPos = PC1[i] - 1;
              keyBits[i] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1;
            }
            var subKeys = this._subKeys = [];
            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
              var subKey = subKeys[nSubKey] = [];
              var bitShift = BIT_SHIFTS[nSubKey];
              for (var i = 0; i < 24; i++) {
                subKey[i / 6 | 0] |= keyBits[(PC2[i] - 1 + bitShift) % 28] << 31 - i % 6;
                subKey[4 + (i / 6 | 0)] |= keyBits[28 + (PC2[i + 24] - 1 + bitShift) % 28] << 31 - i % 6;
              }
              subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
              for (var i = 1; i < 7; i++) {
                subKey[i] = subKey[i] >>> (i - 1) * 4 + 3;
              }
              subKey[7] = subKey[7] << 5 | subKey[7] >>> 27;
            }
            var invSubKeys = this._invSubKeys = [];
            for (var i = 0; i < 16; i++) {
              invSubKeys[i] = subKeys[15 - i];
            }
          },
          encryptBlock: function(M, offset) {
            this._doCryptBlock(M, offset, this._subKeys);
          },
          decryptBlock: function(M, offset) {
            this._doCryptBlock(M, offset, this._invSubKeys);
          },
          _doCryptBlock: function(M, offset, subKeys) {
            this._lBlock = M[offset];
            this._rBlock = M[offset + 1];
            exchangeLR.call(this, 4, 252645135);
            exchangeLR.call(this, 16, 65535);
            exchangeRL.call(this, 2, 858993459);
            exchangeRL.call(this, 8, 16711935);
            exchangeLR.call(this, 1, 1431655765);
            for (var round = 0; round < 16; round++) {
              var subKey = subKeys[round];
              var lBlock = this._lBlock;
              var rBlock = this._rBlock;
              var f = 0;
              for (var i = 0; i < 8; i++) {
                f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
              }
              this._lBlock = rBlock;
              this._rBlock = lBlock ^ f;
            }
            var t = this._lBlock;
            this._lBlock = this._rBlock;
            this._rBlock = t;
            exchangeLR.call(this, 1, 1431655765);
            exchangeRL.call(this, 8, 16711935);
            exchangeRL.call(this, 2, 858993459);
            exchangeLR.call(this, 16, 65535);
            exchangeLR.call(this, 4, 252645135);
            M[offset] = this._lBlock;
            M[offset + 1] = this._rBlock;
          },
          keySize: 64 / 32,
          ivSize: 64 / 32,
          blockSize: 64 / 32
        });
        function exchangeLR(offset, mask) {
          var t = (this._lBlock >>> offset ^ this._rBlock) & mask;
          this._rBlock ^= t;
          this._lBlock ^= t << offset;
        }
        function exchangeRL(offset, mask) {
          var t = (this._rBlock >>> offset ^ this._lBlock) & mask;
          this._lBlock ^= t;
          this._rBlock ^= t << offset;
        }
        C.DES = BlockCipher._createHelper(DES);
        var TripleDES = C_algo.TripleDES = BlockCipher.extend({
          _doReset: function() {
            var key = this._key;
            var keyWords = key.words;
            this._des1 = DES.createEncryptor(WordArray.create(keyWords.slice(0, 2)));
            this._des2 = DES.createEncryptor(WordArray.create(keyWords.slice(2, 4)));
            this._des3 = DES.createEncryptor(WordArray.create(keyWords.slice(4, 6)));
          },
          encryptBlock: function(M, offset) {
            this._des1.encryptBlock(M, offset);
            this._des2.decryptBlock(M, offset);
            this._des3.encryptBlock(M, offset);
          },
          decryptBlock: function(M, offset) {
            this._des3.decryptBlock(M, offset);
            this._des2.encryptBlock(M, offset);
            this._des1.decryptBlock(M, offset);
          },
          keySize: 192 / 32,
          ivSize: 64 / 32,
          blockSize: 64 / 32
        });
        C.TripleDES = BlockCipher._createHelper(TripleDES);
      })();
      return CryptoJS.TripleDES;
    });
  }
});

// node_modules/crypto-js/rc4.js
var require_rc4 = __commonJS({
  "node_modules/crypto-js/rc4.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var RC4 = C_algo.RC4 = StreamCipher.extend({
          _doReset: function() {
            var key = this._key;
            var keyWords = key.words;
            var keySigBytes = key.sigBytes;
            var S = this._S = [];
            for (var i = 0; i < 256; i++) {
              S[i] = i;
            }
            for (var i = 0, j = 0; i < 256; i++) {
              var keyByteIndex = i % keySigBytes;
              var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 255;
              j = (j + S[i] + keyByte) % 256;
              var t = S[i];
              S[i] = S[j];
              S[j] = t;
            }
            this._i = this._j = 0;
          },
          _doProcessBlock: function(M, offset) {
            M[offset] ^= generateKeystreamWord.call(this);
          },
          keySize: 256 / 32,
          ivSize: 0
        });
        function generateKeystreamWord() {
          var S = this._S;
          var i = this._i;
          var j = this._j;
          var keystreamWord = 0;
          for (var n = 0; n < 4; n++) {
            i = (i + 1) % 256;
            j = (j + S[i]) % 256;
            var t = S[i];
            S[i] = S[j];
            S[j] = t;
            keystreamWord |= S[(S[i] + S[j]) % 256] << 24 - n * 8;
          }
          this._i = i;
          this._j = j;
          return keystreamWord;
        }
        C.RC4 = StreamCipher._createHelper(RC4);
        var RC4Drop = C_algo.RC4Drop = RC4.extend({
          cfg: RC4.cfg.extend({
            drop: 192
          }),
          _doReset: function() {
            RC4._doReset.call(this);
            for (var i = this.cfg.drop; i > 0; i--) {
              generateKeystreamWord.call(this);
            }
          }
        });
        C.RC4Drop = StreamCipher._createHelper(RC4Drop);
      })();
      return CryptoJS.RC4;
    });
  }
});

// node_modules/crypto-js/rabbit.js
var require_rabbit = __commonJS({
  "node_modules/crypto-js/rabbit.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var S = [];
        var C_ = [];
        var G = [];
        var Rabbit = C_algo.Rabbit = StreamCipher.extend({
          _doReset: function() {
            var K = this._key.words;
            var iv = this.cfg.iv;
            for (var i = 0; i < 4; i++) {
              K[i] = (K[i] << 8 | K[i] >>> 24) & 16711935 | (K[i] << 24 | K[i] >>> 8) & 4278255360;
            }
            var X = this._X = [
              K[0],
              K[3] << 16 | K[2] >>> 16,
              K[1],
              K[0] << 16 | K[3] >>> 16,
              K[2],
              K[1] << 16 | K[0] >>> 16,
              K[3],
              K[2] << 16 | K[1] >>> 16
            ];
            var C2 = this._C = [
              K[2] << 16 | K[2] >>> 16,
              K[0] & 4294901760 | K[1] & 65535,
              K[3] << 16 | K[3] >>> 16,
              K[1] & 4294901760 | K[2] & 65535,
              K[0] << 16 | K[0] >>> 16,
              K[2] & 4294901760 | K[3] & 65535,
              K[1] << 16 | K[1] >>> 16,
              K[3] & 4294901760 | K[0] & 65535
            ];
            this._b = 0;
            for (var i = 0; i < 4; i++) {
              nextState.call(this);
            }
            for (var i = 0; i < 8; i++) {
              C2[i] ^= X[i + 4 & 7];
            }
            if (iv) {
              var IV = iv.words;
              var IV_0 = IV[0];
              var IV_1 = IV[1];
              var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
              var i2 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
              var i1 = i0 >>> 16 | i2 & 4294901760;
              var i3 = i2 << 16 | i0 & 65535;
              C2[0] ^= i0;
              C2[1] ^= i1;
              C2[2] ^= i2;
              C2[3] ^= i3;
              C2[4] ^= i0;
              C2[5] ^= i1;
              C2[6] ^= i2;
              C2[7] ^= i3;
              for (var i = 0; i < 4; i++) {
                nextState.call(this);
              }
            }
          },
          _doProcessBlock: function(M, offset) {
            var X = this._X;
            nextState.call(this);
            S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
            S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
            S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
            S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
            for (var i = 0; i < 4; i++) {
              S[i] = (S[i] << 8 | S[i] >>> 24) & 16711935 | (S[i] << 24 | S[i] >>> 8) & 4278255360;
              M[offset + i] ^= S[i];
            }
          },
          blockSize: 128 / 32,
          ivSize: 64 / 32
        });
        function nextState() {
          var X = this._X;
          var C2 = this._C;
          for (var i = 0; i < 8; i++) {
            C_[i] = C2[i];
          }
          C2[0] = C2[0] + 1295307597 + this._b | 0;
          C2[1] = C2[1] + 3545052371 + (C2[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
          C2[2] = C2[2] + 886263092 + (C2[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
          C2[3] = C2[3] + 1295307597 + (C2[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
          C2[4] = C2[4] + 3545052371 + (C2[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
          C2[5] = C2[5] + 886263092 + (C2[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
          C2[6] = C2[6] + 1295307597 + (C2[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
          C2[7] = C2[7] + 3545052371 + (C2[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
          this._b = C2[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
          for (var i = 0; i < 8; i++) {
            var gx = X[i] + C2[i];
            var ga = gx & 65535;
            var gb = gx >>> 16;
            var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
            var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
            G[i] = gh ^ gl;
          }
          X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
          X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
          X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
          X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
          X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
          X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
          X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
          X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
        }
        C.Rabbit = StreamCipher._createHelper(Rabbit);
      })();
      return CryptoJS.Rabbit;
    });
  }
});

// node_modules/crypto-js/rabbit-legacy.js
var require_rabbit_legacy = __commonJS({
  "node_modules/crypto-js/rabbit-legacy.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var S = [];
        var C_ = [];
        var G = [];
        var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
          _doReset: function() {
            var K = this._key.words;
            var iv = this.cfg.iv;
            var X = this._X = [
              K[0],
              K[3] << 16 | K[2] >>> 16,
              K[1],
              K[0] << 16 | K[3] >>> 16,
              K[2],
              K[1] << 16 | K[0] >>> 16,
              K[3],
              K[2] << 16 | K[1] >>> 16
            ];
            var C2 = this._C = [
              K[2] << 16 | K[2] >>> 16,
              K[0] & 4294901760 | K[1] & 65535,
              K[3] << 16 | K[3] >>> 16,
              K[1] & 4294901760 | K[2] & 65535,
              K[0] << 16 | K[0] >>> 16,
              K[2] & 4294901760 | K[3] & 65535,
              K[1] << 16 | K[1] >>> 16,
              K[3] & 4294901760 | K[0] & 65535
            ];
            this._b = 0;
            for (var i = 0; i < 4; i++) {
              nextState.call(this);
            }
            for (var i = 0; i < 8; i++) {
              C2[i] ^= X[i + 4 & 7];
            }
            if (iv) {
              var IV = iv.words;
              var IV_0 = IV[0];
              var IV_1 = IV[1];
              var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
              var i2 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
              var i1 = i0 >>> 16 | i2 & 4294901760;
              var i3 = i2 << 16 | i0 & 65535;
              C2[0] ^= i0;
              C2[1] ^= i1;
              C2[2] ^= i2;
              C2[3] ^= i3;
              C2[4] ^= i0;
              C2[5] ^= i1;
              C2[6] ^= i2;
              C2[7] ^= i3;
              for (var i = 0; i < 4; i++) {
                nextState.call(this);
              }
            }
          },
          _doProcessBlock: function(M, offset) {
            var X = this._X;
            nextState.call(this);
            S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
            S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
            S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
            S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
            for (var i = 0; i < 4; i++) {
              S[i] = (S[i] << 8 | S[i] >>> 24) & 16711935 | (S[i] << 24 | S[i] >>> 8) & 4278255360;
              M[offset + i] ^= S[i];
            }
          },
          blockSize: 128 / 32,
          ivSize: 64 / 32
        });
        function nextState() {
          var X = this._X;
          var C2 = this._C;
          for (var i = 0; i < 8; i++) {
            C_[i] = C2[i];
          }
          C2[0] = C2[0] + 1295307597 + this._b | 0;
          C2[1] = C2[1] + 3545052371 + (C2[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
          C2[2] = C2[2] + 886263092 + (C2[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
          C2[3] = C2[3] + 1295307597 + (C2[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
          C2[4] = C2[4] + 3545052371 + (C2[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
          C2[5] = C2[5] + 886263092 + (C2[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
          C2[6] = C2[6] + 1295307597 + (C2[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
          C2[7] = C2[7] + 3545052371 + (C2[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
          this._b = C2[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
          for (var i = 0; i < 8; i++) {
            var gx = X[i] + C2[i];
            var ga = gx & 65535;
            var gb = gx >>> 16;
            var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
            var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
            G[i] = gh ^ gl;
          }
          X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
          X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
          X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
          X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
          X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
          X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
          X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
          X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
        }
        C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
      })();
      return CryptoJS.RabbitLegacy;
    });
  }
});

// node_modules/crypto-js/index.js
var require_crypto_js = __commonJS({
  "node_modules/crypto-js/index.js"(exports, module2) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module2.exports = exports = factory(require_core(), require_x64_core(), require_lib_typedarrays(), require_enc_utf16(), require_enc_base64(), require_md5(), require_sha1(), require_sha256(), require_sha224(), require_sha512(), require_sha384(), require_sha32(), require_ripemd160(), require_hmac(), require_pbkdf2(), require_evpkdf(), require_cipher_core(), require_mode_cfb(), require_mode_ctr(), require_mode_ctr_gladman(), require_mode_ofb(), require_mode_ecb(), require_pad_ansix923(), require_pad_iso10126(), require_pad_iso97971(), require_pad_zeropadding(), require_pad_nopadding(), require_format_hex(), require_aes(), require_tripledes(), require_rc4(), require_rabbit(), require_rabbit_legacy());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./x64-core", "./lib-typedarrays", "./enc-utf16", "./enc-base64", "./md5", "./sha1", "./sha256", "./sha224", "./sha512", "./sha384", "./sha3", "./ripemd160", "./hmac", "./pbkdf2", "./evpkdf", "./cipher-core", "./mode-cfb", "./mode-ctr", "./mode-ctr-gladman", "./mode-ofb", "./mode-ecb", "./pad-ansix923", "./pad-iso10126", "./pad-iso97971", "./pad-zeropadding", "./pad-nopadding", "./format-hex", "./aes", "./tripledes", "./rc4", "./rabbit", "./rabbit-legacy"], factory);
      } else {
        root.CryptoJS = factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      return CryptoJS;
    });
  }
});

// node_modules/merkletreejs/dist/Base.js
var require_Base = __commonJS({
  "node_modules/merkletreejs/dist/Base.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Base = void 0;
    var buffer_1 = require_buffer();
    var crypto_js_1 = __importDefault(require_crypto_js());
    var Base = class {
      print() {
        Base.print(this);
      }
      _bufferIndexOf(array, element) {
        for (let i = 0; i < array.length; i++) {
          if (element.equals(array[i])) {
            return i;
          }
        }
        return -1;
      }
      static bufferify(value) {
        if (!buffer_1.Buffer.isBuffer(value)) {
          if (typeof value === "object" && value.words) {
            return buffer_1.Buffer.from(value.toString(crypto_js_1.default.enc.Hex), "hex");
          } else if (Base.isHexString(value)) {
            return buffer_1.Buffer.from(value.replace(/^0x/, ""), "hex");
          } else if (typeof value === "string") {
            return buffer_1.Buffer.from(value);
          } else if (typeof value === "number") {
            let s = value.toString();
            if (s.length % 2) {
              s = `0${s}`;
            }
            return buffer_1.Buffer.from(s, "hex");
          } else if (ArrayBuffer.isView(value)) {
            return buffer_1.Buffer.from(value.buffer, value.byteOffset, value.byteLength);
          }
        }
        return value;
      }
      static isHexString(v) {
        return typeof v === "string" && /^(0x)?[0-9A-Fa-f]*$/.test(v);
      }
      static print(tree) {
        console.log(tree.toString());
      }
      bufferToHex(value, withPrefix = true) {
        return Base.bufferToHex(value, withPrefix);
      }
      static bufferToHex(value, withPrefix = true) {
        return `${withPrefix ? "0x" : ""}${(value || buffer_1.Buffer.alloc(0)).toString("hex")}`;
      }
      bufferify(value) {
        return Base.bufferify(value);
      }
      bufferifyFn(f) {
        return (value) => {
          const v = f(value);
          if (buffer_1.Buffer.isBuffer(v)) {
            return v;
          }
          if (this._isHexString(v)) {
            return buffer_1.Buffer.from(v.replace("0x", ""), "hex");
          }
          if (typeof v === "string") {
            return buffer_1.Buffer.from(v);
          }
          if (ArrayBuffer.isView(v)) {
            return buffer_1.Buffer.from(v.buffer, v.byteOffset, v.byteLength);
          }
          return buffer_1.Buffer.from(f(crypto_js_1.default.enc.Hex.parse(value.toString("hex"))).toString(crypto_js_1.default.enc.Hex), "hex");
        };
      }
      _isHexString(value) {
        return Base.isHexString(value);
      }
      _log2(n) {
        return n === 1 ? 0 : 1 + this._log2(n / 2 | 0);
      }
      _zip(a, b) {
        return a.map((e, i) => [e, b[i]]);
      }
    };
    exports.Base = Base;
    exports.default = Base;
  }
});

// node_modules/merkletreejs/dist/MerkleTree.js
var require_MerkleTree = __commonJS({
  "node_modules/merkletreejs/dist/MerkleTree.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MerkleTree = void 0;
    var buffer_1 = require_buffer();
    var buffer_reverse_1 = __importDefault(require_buffer_reverse());
    var sha256_1 = __importDefault(require_sha256());
    var treeify_1 = __importDefault(require_treeify());
    var Base_1 = __importDefault(require_Base());
    var MerkleTree = class extends Base_1.default {
      constructor(leaves, hashFn = sha256_1.default, options = {}) {
        super();
        this.duplicateOdd = false;
        this.hashLeaves = false;
        this.isBitcoinTree = false;
        this.leaves = [];
        this.layers = [];
        this.sortLeaves = false;
        this.sortPairs = false;
        this.sort = false;
        this.fillDefaultHash = null;
        this.isBitcoinTree = !!options.isBitcoinTree;
        this.hashLeaves = !!options.hashLeaves;
        this.sortLeaves = !!options.sortLeaves;
        this.sortPairs = !!options.sortPairs;
        if (options.fillDefaultHash) {
          if (typeof options.fillDefaultHash === "function") {
            this.fillDefaultHash = options.fillDefaultHash;
          } else if (buffer_1.Buffer.isBuffer(options.fillDefaultHash) || typeof options.fillDefaultHash === "string") {
            this.fillDefaultHash = (idx, hashFn2) => options.fillDefaultHash;
          } else {
            throw new Error('method "fillDefaultHash" must be a function, Buffer, or string');
          }
        }
        this.sort = !!options.sort;
        if (this.sort) {
          this.sortLeaves = true;
          this.sortPairs = true;
        }
        this.duplicateOdd = !!options.duplicateOdd;
        this.hashFn = this.bufferifyFn(hashFn);
        this.processLeaves(leaves);
      }
      processLeaves(leaves) {
        if (this.hashLeaves) {
          leaves = leaves.map(this.hashFn);
        }
        this.leaves = leaves.map(this.bufferify);
        if (this.sortLeaves) {
          this.leaves = this.leaves.sort(buffer_1.Buffer.compare);
        }
        if (this.fillDefaultHash) {
          for (let i = 0; i < Math.pow(2, Math.ceil(Math.log2(this.leaves.length))); i++) {
            if (i >= this.leaves.length) {
              this.leaves.push(this.bufferify(this.fillDefaultHash(i, this.hashFn)));
            }
          }
        }
        this.layers = [this.leaves];
        this._createHashes(this.leaves);
      }
      _createHashes(nodes) {
        while (nodes.length > 1) {
          const layerIndex = this.layers.length;
          this.layers.push([]);
          for (let i = 0; i < nodes.length; i += 2) {
            if (i + 1 === nodes.length) {
              if (nodes.length % 2 === 1) {
                let data2 = nodes[nodes.length - 1];
                let hash2 = data2;
                if (this.isBitcoinTree) {
                  data2 = buffer_1.Buffer.concat([buffer_reverse_1.default(data2), buffer_reverse_1.default(data2)]);
                  hash2 = this.hashFn(data2);
                  hash2 = buffer_reverse_1.default(this.hashFn(hash2));
                  this.layers[layerIndex].push(hash2);
                  continue;
                } else {
                  if (this.duplicateOdd) {
                  } else {
                    this.layers[layerIndex].push(nodes[i]);
                    continue;
                  }
                }
              }
            }
            const left = nodes[i];
            const right = i + 1 === nodes.length ? left : nodes[i + 1];
            let data = null;
            let combined = null;
            if (this.isBitcoinTree) {
              combined = [buffer_reverse_1.default(left), buffer_reverse_1.default(right)];
            } else {
              combined = [left, right];
            }
            if (this.sortPairs) {
              combined.sort(buffer_1.Buffer.compare);
            }
            data = buffer_1.Buffer.concat(combined);
            let hash = this.hashFn(data);
            if (this.isBitcoinTree) {
              hash = buffer_reverse_1.default(this.hashFn(hash));
            }
            this.layers[layerIndex].push(hash);
          }
          nodes = this.layers[layerIndex];
        }
      }
      addLeaf(leaf, shouldHash = false) {
        if (shouldHash) {
          leaf = this.hashFn(leaf);
        }
        this.processLeaves(this.leaves.concat(leaf));
      }
      addLeaves(leaves, shouldHash = false) {
        if (shouldHash) {
          leaves = leaves.map(this.hashFn);
        }
        this.processLeaves(this.leaves.concat(leaves));
      }
      getLeaves(values) {
        if (Array.isArray(values)) {
          if (this.hashLeaves) {
            values = values.map(this.hashFn);
            if (this.sortLeaves) {
              values = values.sort(buffer_1.Buffer.compare);
            }
          }
          return this.leaves.filter((leaf) => this._bufferIndexOf(values, leaf) !== -1);
        }
        return this.leaves;
      }
      getLeaf(index) {
        if (index < 0 || index > this.leaves.length - 1) {
          return buffer_1.Buffer.from([]);
        }
        return this.leaves[index];
      }
      getLeafIndex(target) {
        target = this.bufferify(target);
        const leaves = this.getLeaves();
        for (let i = 0; i < leaves.length; i++) {
          const leaf = leaves[i];
          if (leaf.equals(target)) {
            return i;
          }
        }
        return -1;
      }
      getLeafCount() {
        return this.leaves.length;
      }
      getHexLeaves() {
        return this.leaves.map((leaf) => this.bufferToHex(leaf));
      }
      static marshalLeaves(leaves) {
        return JSON.stringify(leaves.map((leaf) => MerkleTree.bufferToHex(leaf)), null, 2);
      }
      static unmarshalLeaves(jsonStr) {
        let parsed = null;
        if (typeof jsonStr === "string") {
          parsed = JSON.parse(jsonStr);
        } else if (jsonStr instanceof Object) {
          parsed = jsonStr;
        } else {
          throw new Error("Expected type of string or object");
        }
        if (!parsed) {
          return [];
        }
        if (!Array.isArray(parsed)) {
          throw new Error("Expected JSON string to be array");
        }
        return parsed.map(MerkleTree.bufferify);
      }
      getLayers() {
        return this.layers;
      }
      getHexLayers() {
        return this.layers.reduce((acc, item) => {
          if (Array.isArray(item)) {
            acc.push(item.map((layer) => this.bufferToHex(layer)));
          } else {
            acc.push(item);
          }
          return acc;
        }, []);
      }
      getLayersFlat() {
        const layers = this.layers.reduce((acc, item) => {
          if (Array.isArray(item)) {
            acc.unshift(...item);
          } else {
            acc.unshift(item);
          }
          return acc;
        }, []);
        layers.unshift(buffer_1.Buffer.from([0]));
        return layers;
      }
      getHexLayersFlat() {
        return this.getLayersFlat().map((layer) => this.bufferToHex(layer));
      }
      getLayerCount() {
        return this.getLayers().length;
      }
      getRoot() {
        if (this.layers.length === 0) {
          return buffer_1.Buffer.from([]);
        }
        return this.layers[this.layers.length - 1][0] || buffer_1.Buffer.from([]);
      }
      getHexRoot() {
        return this.bufferToHex(this.getRoot());
      }
      getProof(leaf, index) {
        if (typeof leaf === "undefined") {
          throw new Error("leaf is required");
        }
        leaf = this.bufferify(leaf);
        const proof = [];
        if (!Number.isInteger(index)) {
          index = -1;
          for (let i = 0; i < this.leaves.length; i++) {
            if (buffer_1.Buffer.compare(leaf, this.leaves[i]) === 0) {
              index = i;
            }
          }
        }
        if (index <= -1) {
          return [];
        }
        for (let i = 0; i < this.layers.length; i++) {
          const layer = this.layers[i];
          const isRightNode = index % 2;
          const pairIndex = isRightNode ? index - 1 : this.isBitcoinTree && index === layer.length - 1 && i < this.layers.length - 1 ? index : index + 1;
          if (pairIndex < layer.length) {
            proof.push({
              position: isRightNode ? "left" : "right",
              data: layer[pairIndex]
            });
          }
          index = index / 2 | 0;
        }
        return proof;
      }
      getHexProof(leaf, index) {
        return this.getProof(leaf, index).map((item) => this.bufferToHex(item.data));
      }
      getPositionalHexProof(leaf, index) {
        return this.getProof(leaf, index).map((item) => {
          return [
            item.position === "left" ? 0 : 1,
            this.bufferToHex(item.data)
          ];
        });
      }
      static marshalProof(proof) {
        const json = proof.map((item) => {
          if (typeof item === "string") {
            return item;
          }
          if (buffer_1.Buffer.isBuffer(item)) {
            return MerkleTree.bufferToHex(item);
          }
          return {
            position: item.position,
            data: MerkleTree.bufferToHex(item.data)
          };
        });
        return JSON.stringify(json, null, 2);
      }
      static unmarshalProof(jsonStr) {
        let parsed = null;
        if (typeof jsonStr === "string") {
          parsed = JSON.parse(jsonStr);
        } else if (jsonStr instanceof Object) {
          parsed = jsonStr;
        } else {
          throw new Error("Expected type of string or object");
        }
        if (!parsed) {
          return [];
        }
        if (!Array.isArray(parsed)) {
          throw new Error("Expected JSON string to be array");
        }
        return parsed.map((item) => {
          if (typeof item === "string") {
            return MerkleTree.bufferify(item);
          } else if (item instanceof Object) {
            return {
              position: item.position,
              data: MerkleTree.bufferify(item.data)
            };
          } else {
            throw new Error("Expected item to be of type string or object");
          }
        });
      }
      getProofIndices(treeIndices, depth) {
        const leafCount = Math.pow(2, depth);
        let maximalIndices = new Set();
        for (const index of treeIndices) {
          let x = leafCount + index;
          while (x > 1) {
            maximalIndices.add(x ^ 1);
            x = x / 2 | 0;
          }
        }
        const a = treeIndices.map((index) => leafCount + index);
        const b = Array.from(maximalIndices).sort((a2, b2) => a2 - b2).reverse();
        maximalIndices = a.concat(b);
        const redundantIndices = new Set();
        const proof = [];
        for (let index of maximalIndices) {
          if (!redundantIndices.has(index)) {
            proof.push(index);
            while (index > 1) {
              redundantIndices.add(index);
              if (!redundantIndices.has(index ^ 1))
                break;
              index = index / 2 | 0;
            }
          }
        }
        return proof.filter((index) => {
          return !treeIndices.includes(index - leafCount);
        });
      }
      getProofIndicesForUnevenTree(sortedLeafIndices, leavesCount) {
        const depth = Math.ceil(Math.log2(leavesCount));
        const unevenLayers = [];
        for (let index = 0; index < depth; index++) {
          const unevenLayer = leavesCount % 2 !== 0;
          if (unevenLayer) {
            unevenLayers.push({ index, leavesCount });
          }
          leavesCount = Math.ceil(leavesCount / 2);
        }
        const proofIndices = [];
        let layerNodes = sortedLeafIndices;
        for (let layerIndex = 0; layerIndex < depth; layerIndex++) {
          const siblingIndices = layerNodes.map((index) => {
            if (index % 2 === 0) {
              return index + 1;
            }
            return index - 1;
          });
          let proofNodeIndices = siblingIndices.filter((index) => !layerNodes.includes(index));
          const unevenLayer = unevenLayers.find(({ index }) => index === layerIndex);
          if (unevenLayer && layerNodes.includes(unevenLayer.leavesCount - 1)) {
            proofNodeIndices = proofNodeIndices.slice(0, -1);
          }
          proofIndices.push(proofNodeIndices);
          layerNodes = [...new Set(layerNodes.map((index) => {
            if (index % 2 === 0) {
              return index / 2;
            }
            if (index % 2 === 0) {
              return (index + 1) / 2;
            }
            return (index - 1) / 2;
          }))];
        }
        return proofIndices;
      }
      getMultiProof(tree, indices) {
        if (!indices) {
          indices = tree;
          tree = this.getLayersFlat();
        }
        const isUneven = this.isUnevenTree();
        if (isUneven) {
          if (indices.every(Number.isInteger)) {
            return this.getMultiProofForUnevenTree(indices);
          }
        }
        if (!indices.every(Number.isInteger)) {
          let els = indices;
          if (this.sortPairs) {
            els = els.sort(buffer_1.Buffer.compare);
          }
          let ids = els.map((el) => this._bufferIndexOf(this.leaves, el)).sort((a, b) => a === b ? 0 : a > b ? 1 : -1);
          if (!ids.every((idx) => idx !== -1)) {
            throw new Error("Element does not exist in Merkle tree");
          }
          const hashes = [];
          const proof = [];
          let nextIds = [];
          for (let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            for (let j = 0; j < ids.length; j++) {
              const idx = ids[j];
              const pairElement = this._getPairNode(layer, idx);
              hashes.push(layer[idx]);
              if (pairElement) {
                proof.push(pairElement);
              }
              nextIds.push(idx / 2 | 0);
            }
            ids = nextIds.filter((value, i2, self2) => self2.indexOf(value) === i2);
            nextIds = [];
          }
          return proof.filter((value) => !hashes.includes(value));
        }
        return this.getProofIndices(indices, this._log2(tree.length / 2 | 0)).map((index) => tree[index]);
      }
      getMultiProofForUnevenTree(tree, indices) {
        if (!indices) {
          indices = tree;
          tree = this.getLayers();
        }
        let proofHashes = [];
        let currentLayerIndices = indices;
        for (const treeLayer of tree) {
          const siblings = [];
          for (const index of currentLayerIndices) {
            if (index % 2 === 0) {
              const idx2 = index + 1;
              if (!currentLayerIndices.includes(idx2)) {
                if (treeLayer[idx2]) {
                  siblings.push(treeLayer[idx2]);
                  continue;
                }
              }
            }
            const idx = index - 1;
            if (!currentLayerIndices.includes(idx)) {
              if (treeLayer[idx]) {
                siblings.push(treeLayer[idx]);
                continue;
              }
            }
          }
          proofHashes = proofHashes.concat(siblings);
          const uniqueIndices = new Set();
          for (const index of currentLayerIndices) {
            if (index % 2 === 0) {
              uniqueIndices.add(index / 2);
              continue;
            }
            if (index % 2 === 0) {
              uniqueIndices.add((index + 1) / 2);
              continue;
            }
            uniqueIndices.add((index - 1) / 2);
          }
          currentLayerIndices = Array.from(uniqueIndices);
        }
        return proofHashes;
      }
      getHexMultiProof(tree, indices) {
        return this.getMultiProof(tree, indices).map((x) => this.bufferToHex(x));
      }
      getProofFlags(leaves, proofs) {
        if (!Array.isArray(leaves) || leaves.length <= 0) {
          throw new Error("Invalid Inputs!");
        }
        let ids;
        if (leaves.every(Number.isInteger)) {
          ids = leaves.sort((a, b) => a === b ? 0 : a > b ? 1 : -1);
        } else {
          ids = leaves.map((el) => this._bufferIndexOf(this.leaves, el)).sort((a, b) => a === b ? 0 : a > b ? 1 : -1);
        }
        if (!ids.every((idx) => idx !== -1)) {
          throw new Error("Element does not exist in Merkle tree");
        }
        const _proofs = proofs.map((item) => this.bufferify(item));
        const tested = [];
        const flags = [];
        for (let index = 0; index < this.layers.length; index++) {
          const layer = this.layers[index];
          ids = ids.reduce((ids2, idx) => {
            const skipped = tested.includes(layer[idx]);
            if (!skipped) {
              const pairElement = this._getPairNode(layer, idx);
              const proofUsed = _proofs.includes(layer[idx]) || _proofs.includes(pairElement);
              pairElement && flags.push(!proofUsed);
              tested.push(layer[idx]);
              tested.push(pairElement);
            }
            ids2.push(idx / 2 | 0);
            return ids2;
          }, []);
        }
        return flags;
      }
      verify(proof, targetNode, root) {
        let hash = this.bufferify(targetNode);
        root = this.bufferify(root);
        if (!Array.isArray(proof) || !targetNode || !root) {
          return false;
        }
        for (let i = 0; i < proof.length; i++) {
          const node = proof[i];
          let data = null;
          let isLeftNode = null;
          if (typeof node === "string") {
            data = this.bufferify(node);
            isLeftNode = true;
          } else if (Array.isArray(node)) {
            isLeftNode = node[0] === 0;
            data = this.bufferify(node[1]);
          } else if (buffer_1.Buffer.isBuffer(node)) {
            data = node;
            isLeftNode = true;
          } else if (node instanceof Object) {
            data = this.bufferify(node.data);
            isLeftNode = node.position === "left";
          } else {
            throw new Error("Expected node to be of type string or object");
          }
          const buffers = [];
          if (this.isBitcoinTree) {
            buffers.push(buffer_reverse_1.default(hash));
            buffers[isLeftNode ? "unshift" : "push"](buffer_reverse_1.default(data));
            hash = this.hashFn(buffer_1.Buffer.concat(buffers));
            hash = buffer_reverse_1.default(this.hashFn(hash));
          } else {
            if (this.sortPairs) {
              if (buffer_1.Buffer.compare(hash, data) === -1) {
                buffers.push(hash, data);
                hash = this.hashFn(buffer_1.Buffer.concat(buffers));
              } else {
                buffers.push(data, hash);
                hash = this.hashFn(buffer_1.Buffer.concat(buffers));
              }
            } else {
              buffers.push(hash);
              buffers[isLeftNode ? "unshift" : "push"](data);
              hash = this.hashFn(buffer_1.Buffer.concat(buffers));
            }
          }
        }
        return buffer_1.Buffer.compare(hash, root) === 0;
      }
      verifyMultiProof(root, proofIndices, proofLeaves, leavesCount, proof) {
        const isUneven = this.isUnevenTree();
        if (isUneven) {
          return this.verifyMultiProofForUnevenTree(root, proofIndices, proofLeaves, leavesCount, proof);
        }
        const depth = Math.ceil(Math.log2(leavesCount));
        root = this.bufferify(root);
        proofLeaves = proofLeaves.map((leaf) => this.bufferify(leaf));
        proof = proof.map((leaf) => this.bufferify(leaf));
        const tree = {};
        for (const [index, leaf] of this._zip(proofIndices, proofLeaves)) {
          tree[Math.pow(2, depth) + index] = leaf;
        }
        for (const [index, proofitem] of this._zip(this.getProofIndices(proofIndices, depth), proof)) {
          tree[index] = proofitem;
        }
        let indexqueue = Object.keys(tree).map((value) => +value).sort((a, b) => a - b);
        indexqueue = indexqueue.slice(0, indexqueue.length - 1);
        let i = 0;
        while (i < indexqueue.length) {
          const index = indexqueue[i];
          if (index >= 2 && {}.hasOwnProperty.call(tree, index ^ 1)) {
            let pair = [tree[index - index % 2], tree[index - index % 2 + 1]];
            if (this.sortPairs) {
              pair = pair.sort(buffer_1.Buffer.compare);
            }
            const hash = pair[1] ? this.hashFn(buffer_1.Buffer.concat(pair)) : pair[0];
            tree[index / 2 | 0] = hash;
            indexqueue.push(index / 2 | 0);
          }
          i += 1;
        }
        return !proofIndices.length || {}.hasOwnProperty.call(tree, 1) && tree[1].equals(root);
      }
      verifyMultiProofWithFlags(root, leaves, proofs, proofFlag) {
        root = this.bufferify(root);
        leaves = leaves.map(this.bufferify);
        proofs = proofs.map(this.bufferify);
        const leavesLen = leaves.length;
        const totalHashes = proofFlag.length;
        const hashes = [];
        let leafPos = 0;
        let hashPos = 0;
        let proofPos = 0;
        for (let i = 0; i < totalHashes; i++) {
          const bufA = proofFlag[i] ? leafPos < leavesLen ? leaves[leafPos++] : hashes[hashPos++] : proofs[proofPos++];
          const bufB = leafPos < leavesLen ? leaves[leafPos++] : hashes[hashPos++];
          const buffers = [bufA, bufB].sort(buffer_1.Buffer.compare);
          hashes[i] = this.hashFn(buffer_1.Buffer.concat(buffers));
        }
        return buffer_1.Buffer.compare(hashes[totalHashes - 1], root) === 0;
      }
      verifyMultiProofForUnevenTree(root, indices, leaves, leavesCount, proof) {
        root = this.bufferify(root);
        leaves = leaves.map((leaf) => this.bufferify(leaf));
        proof = proof.map((leaf) => this.bufferify(leaf));
        const computedRoot = this.calculateRootForUnevenTree(indices, leaves, leavesCount, proof);
        return root.equals(computedRoot);
      }
      getDepth() {
        return this.getLayers().length - 1;
      }
      getLayersAsObject() {
        const layers = this.getLayers().map((layer) => layer.map((value) => this.bufferToHex(value, false)));
        const objs = [];
        for (let i = 0; i < layers.length; i++) {
          const arr = [];
          for (let j = 0; j < layers[i].length; j++) {
            const obj = { [layers[i][j]]: null };
            if (objs.length) {
              obj[layers[i][j]] = {};
              const a = objs.shift();
              const akey = Object.keys(a)[0];
              obj[layers[i][j]][akey] = a[akey];
              if (objs.length) {
                const b = objs.shift();
                const bkey = Object.keys(b)[0];
                obj[layers[i][j]][bkey] = b[bkey];
              }
            }
            arr.push(obj);
          }
          objs.push(...arr);
        }
        return objs[0];
      }
      static verify(proof, targetNode, root, hashFn = sha256_1.default, options = {}) {
        const tree = new MerkleTree([], hashFn, options);
        return tree.verify(proof, targetNode, root);
      }
      static getMultiProof(tree, indices) {
        const t = new MerkleTree([]);
        return t.getMultiProof(tree, indices);
      }
      resetTree() {
        this.leaves = [];
        this.layers = [];
      }
      _getPairNode(layer, idx) {
        const pairIdx = idx % 2 === 0 ? idx + 1 : idx - 1;
        if (pairIdx < layer.length) {
          return layer[pairIdx];
        } else {
          return null;
        }
      }
      _toTreeString() {
        const obj = this.getLayersAsObject();
        return treeify_1.default.asTree(obj, true);
      }
      toString() {
        return this._toTreeString();
      }
      isUnevenTree(treeLayers) {
        const depth = (treeLayers === null || treeLayers === void 0 ? void 0 : treeLayers.length) || this.getDepth();
        return !this.isPowOf2(depth);
      }
      isPowOf2(v) {
        return v && !(v & v - 1);
      }
      calculateRootForUnevenTree(leafIndices, leafHashes, totalLeavesCount, proofHashes) {
        const leafTuples = this._zip(leafIndices, leafHashes).sort(([indexA], [indexB]) => indexA - indexB);
        const leafTupleIndices = leafTuples.map(([index]) => index);
        const proofIndices = this.getProofIndicesForUnevenTree(leafTupleIndices, totalLeavesCount);
        let nextSliceStart = 0;
        const proofTuplesByLayers = [];
        for (let i = 0; i < proofIndices.length; i++) {
          const indices = proofIndices[i];
          const sliceStart = nextSliceStart;
          nextSliceStart += indices.length;
          proofTuplesByLayers[i] = this._zip(indices, proofHashes.slice(sliceStart, nextSliceStart));
        }
        const tree = [leafTuples];
        for (let layerIndex = 0; layerIndex < proofTuplesByLayers.length; layerIndex++) {
          const currentLayer = proofTuplesByLayers[layerIndex].concat(tree[layerIndex]).sort(([indexA], [indexB]) => indexA - indexB).map(([, hash]) => hash);
          const s = tree[layerIndex].map(([layerIndex2]) => layerIndex2);
          const parentIndices = [...new Set(s.map((index) => {
            if (index % 2 === 0) {
              return index / 2;
            }
            if (index % 2 === 0) {
              return (index + 1) / 2;
            }
            return (index - 1) / 2;
          }))];
          const parentLayer = [];
          for (let i = 0; i < parentIndices.length; i++) {
            const parentNodeTreeIndex = parentIndices[i];
            const bufA = currentLayer[i * 2];
            const bufB = currentLayer[i * 2 + 1];
            const hash = bufB ? this.hashFn(buffer_1.Buffer.concat([bufA, bufB])) : bufA;
            parentLayer.push([parentNodeTreeIndex, hash]);
          }
          tree.push(parentLayer);
        }
        return tree[tree.length - 1][0][1];
      }
    };
    exports.MerkleTree = MerkleTree;
    if (typeof window !== "undefined") {
      ;
      window.MerkleTree = MerkleTree;
    }
    exports.default = MerkleTree;
  }
});

// node_modules/merkletreejs/dist/MerkleMountainRange.js
var require_MerkleMountainRange = __commonJS({
  "node_modules/merkletreejs/dist/MerkleMountainRange.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MerkleMountainRange = void 0;
    var buffer_1 = require_buffer();
    var sha256_1 = __importDefault(require_sha256());
    var Base_1 = __importDefault(require_Base());
    var MerkleMountainRange = class extends Base_1.default {
      constructor(hashFn = sha256_1.default, leaves = [], hashLeafFn, peakBaggingFn, hashBranchFn) {
        super();
        this.root = buffer_1.Buffer.alloc(0);
        this.size = 0;
        this.width = 0;
        this.hashes = {};
        this.data = {};
        leaves = leaves.map(this.bufferify);
        this.hashFn = this.bufferifyFn(hashFn);
        this.hashLeafFn = hashLeafFn;
        this.peakBaggingFn = peakBaggingFn;
        this.hashBranchFn = hashBranchFn;
        for (const leaf of leaves) {
          this.append(leaf);
        }
      }
      append(data) {
        data = this.bufferify(data);
        const dataHash = this.hashFn(data);
        const dataHashHex = this.bufferToHex(dataHash);
        if (!this.data[dataHashHex] || this.bufferToHex(this.hashFn(this.data[dataHashHex])) !== dataHashHex) {
          this.data[dataHashHex] = data;
        }
        const leaf = this.hashLeaf(this.size + 1, dataHash);
        this.hashes[this.size + 1] = leaf;
        this.width += 1;
        const peakIndexes = this.getPeakIndexes(this.width);
        this.size = this.getSize(this.width);
        const peaks = [];
        for (let i = 0; i < peakIndexes.length; i++) {
          peaks[i] = this._getOrCreateNode(peakIndexes[i]);
        }
        this.root = this.peakBagging(this.width, peaks);
      }
      hashLeaf(index, dataHash) {
        dataHash = this.bufferify(dataHash);
        if (this.hashLeafFn) {
          return this.bufferify(this.hashLeafFn(index, dataHash));
        }
        return this.hashFn(buffer_1.Buffer.concat([this.bufferify(index), dataHash]));
      }
      hashBranch(index, left, right) {
        if (this.hashBranchFn) {
          return this.bufferify(this.hashBranchFn(index, left, right));
        }
        return this.hashFn(buffer_1.Buffer.concat([this.bufferify(index), this.bufferify(left), this.bufferify(right)]));
      }
      getPeaks() {
        const peakIndexes = this.getPeakIndexes(this.width);
        const peaks = [];
        for (let i = 0; i < peakIndexes.length; i++) {
          peaks[i] = this.hashes[peakIndexes[i]];
        }
        return peaks;
      }
      getLeafIndex(width) {
        if (width % 2 === 1) {
          return this.getSize(width);
        }
        return this.getSize(width - 1) + 1;
      }
      getPeakIndexes(width) {
        const numPeaks = this.numOfPeaks(width);
        const peakIndexes = [];
        let count = 0;
        let size = 0;
        for (let i = 255; i > 0; i--) {
          if ((width & 1 << i - 1) !== 0) {
            size = size + (1 << i) - 1;
            peakIndexes[count++] = size;
            if (peakIndexes.length >= numPeaks) {
              break;
            }
          }
        }
        if (count !== peakIndexes.length) {
          throw new Error("invalid bit calculation");
        }
        return peakIndexes;
      }
      numOfPeaks(width) {
        let bits = width;
        let num = 0;
        while (bits > 0) {
          if (bits % 2 === 1) {
            num++;
          }
          bits = bits >> 1;
        }
        return num;
      }
      peakBagging(width, peaks) {
        const size = this.getSize(width);
        if (this.numOfPeaks(width) !== peaks.length) {
          throw new Error("received invalid number of peaks");
        }
        if (width === 0 && !peaks.length) {
          return buffer_1.Buffer.alloc(0);
        }
        if (this.peakBaggingFn) {
          return this.bufferify(this.peakBaggingFn(size, peaks));
        }
        return this.hashFn(buffer_1.Buffer.concat([this.bufferify(size), ...peaks.map(this.bufferify)]));
      }
      getSize(width) {
        return (width << 1) - this.numOfPeaks(width);
      }
      getRoot() {
        return this.root;
      }
      getHexRoot() {
        return this.bufferToHex(this.getRoot());
      }
      getNode(index) {
        return this.hashes[index];
      }
      mountainHeight(size) {
        let height = 1;
        while (1 << height <= size + height) {
          height++;
        }
        return height - 1;
      }
      heightAt(index) {
        let reducedIndex = index;
        let peakIndex = 0;
        let height = 0;
        while (reducedIndex > peakIndex) {
          reducedIndex -= (1 << height) - 1;
          height = this.mountainHeight(reducedIndex);
          peakIndex = (1 << height) - 1;
        }
        return height - (peakIndex - reducedIndex);
      }
      isLeaf(index) {
        return this.heightAt(index) === 1;
      }
      getChildren(index) {
        const left = index - (1 << this.heightAt(index) - 1);
        const right = index - 1;
        if (left === right) {
          throw new Error("not a parent");
        }
        return [left, right];
      }
      getMerkleProof(index) {
        if (index > this.size) {
          throw new Error("out of range");
        }
        if (!this.isLeaf(index)) {
          throw new Error("not a leaf");
        }
        const root = this.root;
        const width = this.width;
        const peaks = this.getPeakIndexes(this.width);
        const peakBagging = [];
        let cursor = 0;
        for (let i = 0; i < peaks.length; i++) {
          peakBagging[i] = this.hashes[peaks[i]];
          if (peaks[i] >= index && cursor === 0) {
            cursor = peaks[i];
          }
        }
        let left = 0;
        let right = 0;
        let height = this.heightAt(cursor);
        const siblings = [];
        while (cursor !== index) {
          height--;
          [left, right] = this.getChildren(cursor);
          cursor = index <= left ? left : right;
          siblings[height - 1] = this.hashes[index <= left ? right : left];
        }
        return {
          root,
          width,
          peakBagging,
          siblings
        };
      }
      verify(root, width, index, value, peaks, siblings) {
        value = this.bufferify(value);
        const size = this.getSize(width);
        if (size < index) {
          throw new Error("index is out of range");
        }
        if (!root.equals(this.peakBagging(width, peaks))) {
          throw new Error("invalid root hash from the peaks");
        }
        let cursor = 0;
        let targetPeak;
        const peakIndexes = this.getPeakIndexes(width);
        for (let i = 0; i < peakIndexes.length; i++) {
          if (peakIndexes[i] >= index) {
            targetPeak = peaks[i];
            cursor = peakIndexes[i];
            break;
          }
        }
        if (!targetPeak) {
          throw new Error("target not found");
        }
        let height = siblings.length + 1;
        const path = new Array(height);
        let left = 0;
        let right = 0;
        while (height > 0) {
          path[--height] = cursor;
          if (cursor === index) {
            break;
          } else {
            [left, right] = this.getChildren(cursor);
            cursor = index > left ? right : left;
            continue;
          }
        }
        let node;
        while (height < path.length) {
          cursor = path[height];
          if (height === 0) {
            node = this.hashLeaf(cursor, this.hashFn(value));
          } else if (cursor - 1 === path[height - 1]) {
            node = this.hashBranch(cursor, siblings[height - 1], node);
          } else {
            node = this.hashBranch(cursor, node, siblings[height - 1]);
          }
          height++;
        }
        if (!node.equals(targetPeak)) {
          throw new Error("hashed peak is invalid");
        }
        return true;
      }
      peaksToPeakMap(width, peaks) {
        const peakMap = {};
        let bitIndex = 0;
        let peakRef = 0;
        let count = peaks.length;
        for (let height = 1; height <= 32; height++) {
          bitIndex = 32 - height;
          peakRef = 1 << height - 1;
          if ((width & peakRef) !== 0) {
            peakMap[bitIndex] = peaks[--count];
          } else {
            peakMap[bitIndex] = 0;
          }
        }
        if (count !== 0) {
          throw new Error("invalid number of peaks");
        }
        return peakMap;
      }
      peakMapToPeaks(width, peakMap) {
        const arrLength = this.numOfPeaks(width);
        const peaks = new Array(arrLength);
        let count = 0;
        for (let i = 0; i < 32; i++) {
          if (peakMap[i] !== 0) {
            peaks[count++] = peakMap[i];
          }
        }
        if (count !== arrLength) {
          throw new Error("invalid number of peaks");
        }
        return peaks;
      }
      peakUpdate(width, prevPeakMap, itemHash) {
        const nextPeakMap = {};
        const newWidth = width + 1;
        let cursorIndex = this.getLeafIndex(newWidth);
        let cursorNode = this.hashLeaf(cursorIndex, itemHash);
        let bitIndex = 0;
        let peakRef = 0;
        let prevPeakExist = false;
        let nextPeakExist = false;
        let obtained = false;
        for (let height = 1; height <= 32; height++) {
          bitIndex = 32 - height;
          if (obtained) {
            nextPeakMap[bitIndex] = prevPeakMap[bitIndex];
          } else {
            peakRef = 1 << height - 1;
            prevPeakExist = (width & peakRef) !== 0;
            nextPeakExist = (newWidth & peakRef) !== 0;
            cursorIndex++;
            if (prevPeakExist) {
              cursorNode = this.hashBranch(cursorIndex, prevPeakMap[bitIndex], cursorNode);
            }
            if (nextPeakExist) {
              if (prevPeakExist) {
                nextPeakMap[bitIndex] = prevPeakMap[bitIndex];
              } else {
                nextPeakMap[bitIndex] = cursorNode;
              }
              obtained = true;
            } else {
              nextPeakMap[bitIndex] = 0;
            }
          }
        }
        return nextPeakMap;
      }
      rollUp(root, width, peaks, itemHashes) {
        if (!root.equals(this.peakBagging(width, peaks))) {
          throw new Error("invalid root hash from the peaks");
        }
        let tmpWidth = width;
        let tmpPeakMap = this.peaksToPeakMap(width, peaks);
        for (let i = 0; i < itemHashes.length; i++) {
          tmpPeakMap = this.peakUpdate(tmpWidth, tmpPeakMap, itemHashes[i]);
          tmpWidth++;
        }
        return this.peakBagging(tmpWidth, this.peakMapToPeaks(tmpWidth, tmpPeakMap));
      }
      _getOrCreateNode(index) {
        if (index > this.size) {
          throw new Error("out of range");
        }
        if (!this.hashes[index]) {
          const [leftIndex, rightIndex] = this.getChildren(index);
          const leftHash = this._getOrCreateNode(leftIndex);
          const rightHash = this._getOrCreateNode(rightIndex);
          this.hashes[index] = this.hashBranch(index, leftHash, rightHash);
        }
        return this.hashes[index];
      }
    };
    exports.MerkleMountainRange = MerkleMountainRange;
    exports.default = MerkleMountainRange;
  }
});

// node_modules/merkletreejs/dist/index.js
var require_dist = __commonJS({
  "node_modules/merkletreejs/dist/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MerkleTree = void 0;
    var MerkleTree_1 = __importDefault(require_MerkleTree());
    exports.MerkleTree = MerkleTree_1.default;
    var MerkleMountainRange_1 = require_MerkleMountainRange();
    Object.defineProperty(exports, "MerkleMountainRange", { enumerable: true, get: function() {
      return MerkleMountainRange_1.MerkleMountainRange;
    } });
    exports.default = MerkleTree_1.default;
  }
});

// src/utils.ts
var utils_exports = {};
__export(utils_exports, {
  addressToBytes32: () => addressToBytes32,
  addressToBytes32Right: () => addressToBytes32Right,
  bytes32ToAddress: () => bytes32ToAddress,
  bytes32ToString: () => bytes32ToString,
  fromDecimals: () => fromDecimals,
  generateWhitelistTree: () => generateWhitelistTree,
  getSha3HashBufferFunc: () => getSha3HashBufferFunc,
  getWhitelistTreeProof: () => getWhitelistTreeProof,
  nullAddress: () => nullAddress,
  numberToBytes32: () => numberToBytes32,
  padLeft: () => padLeft,
  padRight: () => padRight,
  sleep: () => sleep,
  stringToBytes: () => stringToBytes,
  stringToBytes32: () => stringToBytes32,
  toDecimals: () => toDecimals,
  toNumber: () => toNumber,
  toString: () => toString
});
function Web3Lib() {
  if (typeof window !== "undefined" && window["Web3"])
    return window["Web3"];
  else
    return require("web3");
}
function sleep(millisecond) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(null);
    }, millisecond);
  });
}
function numberToBytes32(value, prefix) {
  let v = new import_bignumber.BigNumber(value).toString(16);
  v = v.replace("0x", "");
  v = padLeft(v, 64);
  if (prefix)
    v = "0x" + v;
  return v;
}
function padLeft(string, chars, sign) {
  return new Array(chars - string.length + 1).join(sign ? sign : "0") + string;
}
function padRight(string, chars, sign) {
  return string + new Array(chars - string.length + 1).join(sign ? sign : "0");
}
function stringToBytes32(value) {
  if (Array.isArray(value)) {
    let result = [];
    for (let i = 0; i < value.length; i++) {
      result.push(stringToBytes32(value[i]));
    }
    return result;
  } else {
    if (value.length == 66 && value.startsWith("0x"))
      return value;
    return Web3.utils.padRight(Web3.utils.asciiToHex(value), 64);
  }
}
function stringToBytes(value, nByte) {
  if (Array.isArray(value)) {
    let result = [];
    for (let i = 0; i < value.length; i++) {
      result.push(stringToBytes(value[i]));
    }
    return result;
  } else {
    if (nByte) {
      if (new RegExp(`^0x[0-9a-fA-F]{${2 * nByte}}$`).test(value))
        return value;
      else if (/^0x([0-9a-fA-F][0-9a-fA-F])*$/.test(value)) {
        if (value.length >= nByte * 2 + 2)
          return value;
        else
          return "0x" + value.substring(2) + "00".repeat(nByte - (value.length - 2) / 2);
      } else if (/^([0-9a-fA-F][0-9a-fA-F])+$/.test(value)) {
        if (value.length >= nByte * 2)
          return value;
        else
          return "0x" + value + "00".repeat(nByte - value.length / 2);
      } else
        return Web3.utils.padRight(Web3.utils.asciiToHex(value), nByte * 2);
    } else {
      if (/^0x([0-9a-fA-F][0-9a-fA-F])*$/.test(value))
        return value;
      else if (/^([0-9a-fA-F][0-9a-fA-F])+$/.test(value))
        return "0x" + value;
      else
        return Web3.utils.asciiToHex(value);
    }
  }
}
function addressToBytes32(value, prefix) {
  let v = value;
  v = v.replace("0x", "");
  v = padLeft(v, 64);
  if (prefix)
    v = "0x" + v;
  return v;
}
function bytes32ToAddress(value) {
  return "0x" + value.replace("0x000000000000000000000000", "");
}
function bytes32ToString(value) {
  return Web3.utils.hexToUtf8(value);
}
function addressToBytes32Right(value, prefix) {
  let v = value;
  v = v.replace("0x", "");
  v = padRight(v, 64);
  if (prefix)
    v = "0x" + v;
  return v;
}
function toNumber(value) {
  if (typeof value == "number")
    return value;
  else if (typeof value == "string")
    return new import_bignumber.BigNumber(value).toNumber();
  else
    return value.toNumber();
}
function toDecimals(value, decimals) {
  decimals = decimals || 18;
  return new import_bignumber.BigNumber(value).shiftedBy(decimals);
}
function fromDecimals(value, decimals) {
  decimals = decimals || 18;
  return new import_bignumber.BigNumber(value).shiftedBy(-decimals);
}
function toString(value) {
  if (Array.isArray(value)) {
    let result = [];
    for (let i = 0; i < value.length; i++) {
      result.push(toString(value[i]));
    }
    return result;
  } else if (typeof value === "number")
    return value.toString(10);
  else if (import_bignumber.BigNumber.isBigNumber(value))
    return value.toFixed();
  else
    return value;
}
function importBufferModule() {
  if (typeof window !== "undefined") {
    return require_buffer().Buffer;
  } else
    return Buffer;
}
function importJsSha3Module() {
  if (typeof window !== "undefined") {
    return window["js-sha3"];
  } else
    return require_sha3();
}
function importMerkleTreeModule() {
  if (typeof window !== "undefined") {
    return window["MerkleTree"];
  } else
    return require_dist().MerkleTree;
}
function getSha3HashBufferFunc(wallet, abi) {
  const import_buffer = importBufferModule();
  return (treeItem) => {
    let encodePackedInput = abi.map((abiItem) => {
      return {
        t: abiItem.type,
        v: treeItem[abiItem.name]
      };
    });
    let hex = wallet.soliditySha3({ t: "address", v: treeItem.account }, ...encodePackedInput).slice(2);
    return import_buffer.from(hex, "hex");
  };
}
function generateWhitelistTree(wallet, data, abi) {
  const import_jsSha3 = importJsSha3Module();
  const import_merkleTree = importMerkleTreeModule();
  const hashFunc = getSha3HashBufferFunc(wallet, abi);
  const leaves = data.map((item) => hashFunc(item));
  const merkleTree = new import_merkleTree(leaves, import_jsSha3.keccak256, { sortPairs: true });
  const merkleRoot = merkleTree.getHexRoot();
  return {
    root: merkleRoot,
    tree: merkleTree.toString()
  };
}
function getWhitelistTreeProof(wallet, inputRoot, rawData, abi) {
  const import_jsSha3 = importJsSha3Module();
  const import_merkleTree = importMerkleTreeModule();
  const hashFunc = getSha3HashBufferFunc(wallet, abi);
  let accountLeaf;
  let leaves = [];
  for (let item of rawData) {
    let leaf = hashFunc(item);
    if (wallet.address == item.account) {
      accountLeaf = leaf;
    }
    leaves.push(leaf);
  }
  if (!accountLeaf)
    return null;
  const tree = new import_merkleTree(leaves, import_jsSha3.keccak256, { sortPairs: true });
  const calculatedRoot = tree.getHexRoot();
  if (calculatedRoot != inputRoot)
    return null;
  const proof = tree.getHexProof(accountLeaf);
  const valid = tree.verify(proof, accountLeaf, calculatedRoot);
  return valid ? proof : null;
}
var import_bignumber, Web3, nullAddress;
var init_utils = __esm({
  "src/utils.ts"() {
    import_bignumber = __toModule(require("bignumber.js"));
    Web3 = Web3Lib();
    nullAddress = "0x0000000000000000000000000000000000000000";
  }
});

// src/contract.ts
var require_contract = __commonJS({
  "src/contract.ts"(exports, module2) {
    init_utils();
    var Contract3;
    (function(_Contract) {
      const _Contract2 = class {
        async getContract() {
          let contract;
          if (this.address) {
            contract = _Contract2.contracts[await this.wallet.getChainId() + ":" + this.address];
            if (!contract) {
              contract = this.wallet.newContract(this._abi, this.address);
              _Contract2.contracts[await this.wallet.getChainId() + ":" + this.address] = contract;
            }
          } else {
            contract = this.wallet.newContract(this._abi);
          }
          return contract;
        }
        constructor(wallet, address, abi, bytecode) {
          this.wallet = wallet;
          if (typeof abi == "string")
            this._abi = JSON.parse(abi);
          else
            this._abi = abi;
          this._bytecode = bytecode;
          let self2 = this;
          if (address)
            this._address = address;
        }
        at(address) {
          this._address = address;
          return this;
        }
        set address(value) {
          this._address = value;
        }
        get address() {
          return this._address || "";
        }
        decodeEvents(receipt) {
          let events = this.getAbiEvents();
          let result = [];
          for (let name in receipt.events) {
            let events2 = Array.isArray(receipt.events[name]) ? receipt.events[name] : [receipt.events[name]];
            events2.forEach((e) => {
              let data = e.raw;
              let event = events2[data.topics[0]];
              result.push(Object.assign({ _name: name, _address: this.address }, this.wallet.decodeLog(event.inputs, data.data, data.topics.slice(1))));
            });
          }
          return result;
        }
        parseEvents(receipt, eventName) {
          let eventAbis = this.getAbiEvents();
          let topic0 = this.getAbiTopics([eventName])[0];
          let result = [];
          if (receipt.events) {
            for (let name in receipt.events) {
              let events = Array.isArray(receipt.events[name]) ? receipt.events[name] : [receipt.events[name]];
              events.forEach((event) => {
                if (topic0 == event.raw.topics[0] && (this.address && this.address == event.address)) {
                  result.push(this.wallet.decode(eventAbis[topic0], event, event.raw));
                }
              });
            }
          } else if (receipt.logs) {
            for (let i = 0; i < receipt.logs.length; i++) {
              let log = receipt.logs[i];
              if (topic0 == log.topics[0] && (this.address && this.address == log.address)) {
                result.push(this.wallet.decode(eventAbis[topic0], log));
              }
            }
          }
          return result;
        }
        get events() {
          let result = [];
          for (let i = 0; i < this._abi.length; i++) {
            if (this._abi[i].type == "event")
              result.push(this._abi[i]);
          }
          return result;
        }
        getAbiEvents() {
          if (!this._events) {
            this._events = {};
            let events = this._abi.filter((e) => e.type == "event");
            for (let i = 0; i < events.length; i++) {
              let topic = this.wallet.utils.sha3(events[i].name + "(" + events[i].inputs.map((e) => e.type == "tuple" ? "(" + e.components.map((f) => f.type) + ")" : e.type).join(",") + ")");
              this._events[topic] = events[i];
            }
          }
          return this._events;
        }
        getAbiTopics(eventNames) {
          if (!eventNames || eventNames.length == 0)
            eventNames = null;
          let result = [];
          let events = this.getAbiEvents();
          for (let topic in events) {
            if (!eventNames || eventNames.includes(events[topic].name)) {
              result.push(topic);
            }
          }
          if (result.length == 0 && eventNames && eventNames.length > 0)
            return ["NULL"];
          return [result];
        }
        registerEvents(handler) {
          if (this._address)
            this.wallet.registerEvent(this.getAbiEvents(), this._address, handler);
        }
        scanEvents(fromBlock, toBlock, eventNames) {
          let topics = this.getAbiTopics(eventNames);
          let events = this.getAbiEvents();
          return this.wallet.scanEvents(fromBlock, toBlock, topics, events, this._address);
        }
        async batchCall(batchObj, key, methodName, params, options) {
          let contract = await this.getContract();
          if (!contract.methods[methodName])
            return;
          let method = contract.methods[methodName].apply(this, params);
          batchObj.promises.push(new Promise((resolve, reject) => {
            batchObj.batch.add(method.call.request(__spreadValues({ from: this.wallet.address }, options), (e, v) => {
              return resolve({
                key,
                result: e ? null : v
              });
            }));
          }));
        }
        async call(methodName, params, options) {
          let contract = await this.getContract();
          params = params || [];
          let method = contract.methods[methodName].apply(this, params);
          return method.call(__spreadValues({ from: this.wallet.address }, options));
        }
        async txObj(methodName, params, options) {
          let contract = await this.getContract();
          params = params || [];
          let methodAbi = this._abi.find((e) => methodName ? e.name == methodName : e.type == "constructor");
          if (methodAbi)
            for (let i = 0; i < methodAbi.inputs.length; i++) {
              if (methodAbi.inputs[i].type.indexOf("bytes") == 0) {
                params[i] = params[i] || "";
                if (methodAbi.inputs[i].type.indexOf("[]") > 0) {
                  let a = [];
                  for (let k = 0; k < params[i].length; k++) {
                    let s = params[i][k] || "";
                    if (!params[i][k])
                      a.push("0x");
                    else
                      a.push(s);
                  }
                  params[i] = a;
                } else if (!params[i])
                  params[i] = "0x";
              } else if (methodAbi.inputs[i].type == "address") {
                if (!params[i])
                  params[i] = nullAddress;
              }
            }
          let method;
          if (!methodName)
            method = contract.deploy({ data: this._bytecode, arguments: params });
          else
            method = contract.methods[methodName].apply(this, params);
          let tx = {};
          tx.from = this.wallet.address;
          tx.to = this._address;
          tx.data = method.encodeABI();
          if (options && options.value) {
            tx.value = options.value;
          } else {
            tx.value = 0;
          }
          if (options && (options.gas || options.gasLimit)) {
            tx.gas = options.gas || options.gasLimit;
          } else {
            try {
              tx.gas = await method.estimateGas({ from: this.wallet.address, to: this.address ? this.address : void 0, value: options && options.value || 0 });
              tx.gas = Math.min(await this.wallet.blockGasLimit(), Math.round(tx.gas * 1.5));
            } catch (e) {
              if (e.message == "Returned error: out of gas") {
                console.log(e.message);
                tx.gas = Math.round(await this.wallet.blockGasLimit() * 0.5);
              } else {
                try {
                  await method.call(__spreadValues({ from: this.wallet.address }, options));
                } catch (e2) {
                  if (e2.message.includes("VM execution error.")) {
                    var msg = (e2.data || e2.message).match(/0x[0-9a-fA-F]+/);
                    if (msg && msg.length) {
                      msg = msg[0];
                      if (msg.startsWith("0x08c379a")) {
                        msg = this.wallet.decodeErrorMessage(msg);
                        throw new Error(msg);
                      }
                    }
                  }
                }
                throw e;
              }
            }
          }
          if (!tx.gasPrice) {
            tx.gasPrice = await this.wallet.getGasPrice();
          }
          if (options && options.nonce) {
            tx.nonce = options.nonce;
          } else {
            tx.nonce = await this.wallet.transactionCount();
          }
          return tx;
        }
        async _send(methodName, params, options) {
          let tx = await this.txObj(methodName, params, options);
          let receipt = await this.wallet.sendTransaction(tx);
          return receipt;
        }
        async __deploy(params, options) {
          let receipt = await this._send("", params, options);
          this.address = receipt.contractAddress;
          return this.address;
        }
        send(methodName, params, options) {
          let receipt = this._send(methodName, params, options);
          return receipt;
        }
        _deploy(...params) {
          return this.__deploy(params);
        }
        methods(methodName, ...params) {
          let method = this._abi.find((e) => e.name == methodName);
          if (method.stateMutability == "view" || method.stateMutability == "pure") {
            return this.call(methodName, params);
          } else if (method.stateMutability == "payable") {
            let value = params.pop();
            return this.call(methodName, params, { value });
          } else {
            return this.send(methodName, params);
          }
        }
      };
      let Contract4 = _Contract2;
      Contract4.contracts = {};
      _Contract.Contract = Contract4;
    })(Contract3 || (Contract3 = {}));
    module2.exports = Contract3;
  }
});

// src/contracts/bin/erc20.json
var require_erc20 = __commonJS({
  "src/contracts/bin/erc20.json"(exports, module2) {
    module2.exports = {
      abi: [{ inputs: [{ internalType: "string", name: "name", type: "string" }, { internalType: "string", name: "symbol", type: "string" }, { internalType: "address", name: "_minter", type: "address" }, { internalType: "uint256", name: "totalSupply", type: "uint256" }], stateMutability: "nonpayable", type: "constructor" }, { anonymous: false, inputs: [{ indexed: true, internalType: "address", name: "owner", type: "address" }, { indexed: true, internalType: "address", name: "spender", type: "address" }, { indexed: false, internalType: "uint256", name: "value", type: "uint256" }], name: "Approval", type: "event" }, { anonymous: false, inputs: [{ indexed: true, internalType: "address", name: "from", type: "address" }, { indexed: true, internalType: "address", name: "to", type: "address" }, { indexed: false, internalType: "uint256", name: "value", type: "uint256" }], name: "Transfer", type: "event" }, { inputs: [{ internalType: "address", name: "owner", type: "address" }, { internalType: "address", name: "spender", type: "address" }], name: "allowance", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" }, { inputs: [{ internalType: "address", name: "spender", type: "address" }, { internalType: "uint256", name: "amount", type: "uint256" }], name: "approve", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "nonpayable", type: "function" }, { inputs: [{ internalType: "address", name: "account", type: "address" }], name: "balanceOf", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" }, { inputs: [], name: "cap", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" }, { inputs: [], name: "decimals", outputs: [{ internalType: "uint8", name: "", type: "uint8" }], stateMutability: "view", type: "function" }, { inputs: [{ internalType: "address", name: "spender", type: "address" }, { internalType: "uint256", name: "subtractedValue", type: "uint256" }], name: "decreaseAllowance", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "nonpayable", type: "function" }, { inputs: [{ internalType: "address", name: "spender", type: "address" }, { internalType: "uint256", name: "addedValue", type: "uint256" }], name: "increaseAllowance", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "nonpayable", type: "function" }, { inputs: [{ internalType: "address", name: "account", type: "address" }, { internalType: "uint256", name: "amount", type: "uint256" }], name: "mint", outputs: [], stateMutability: "nonpayable", type: "function" }, { inputs: [], name: "minter", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" }, { inputs: [], name: "name", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" }, { inputs: [], name: "symbol", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" }, { inputs: [], name: "totalSupply", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" }, { inputs: [{ internalType: "address", name: "recipient", type: "address" }, { internalType: "uint256", name: "amount", type: "uint256" }], name: "transfer", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "nonpayable", type: "function" }, { inputs: [{ internalType: "address", name: "sender", type: "address" }, { internalType: "address", name: "recipient", type: "address" }, { internalType: "uint256", name: "amount", type: "uint256" }], name: "transferFrom", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "nonpayable", type: "function" }],
      bytecode: "60a06040523480156200001157600080fd5b50604051620012a0380380620012a0833981810160405260808110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200010a57600080fd5b9083019060208201858111156200012057600080fd5b82516401000000008111828201881017156200013b57600080fd5b82525081516020918201929091019080838360005b838110156200016a57818101518382015260200162000150565b50505050905090810190601f168015620001985780820380516001836020036101000a031916815260200191505b506040908152602082810151929091015186519294509250829186918691620001c891600391908501906200025e565b508051620001de9060049060208401906200025e565b50506005805460ff19166012179055508062000241576040805162461bcd60e51b815260206004820152601560248201527f45524332304361707065643a2063617020697320300000000000000000000000604482015290519081900360640190fd5b6006555060601b6001600160601b03191660805250620003039050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620002a157805160ff1916838001178555620002d1565b82800160010185558215620002d1579182015b82811115620002d1578251825591602001919060010190620002b4565b50620002df929150620002e3565b5090565b6200030091905b80821115620002df5760008155600101620002ea565b90565b60805160601c610f7a620003266000398061047f52806105f35250610f7a6000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c8063395093511161008c57806395d89b411161006657806395d89b4114610314578063a457c2d71461031c578063a9059cbb14610355578063dd62ed3e1461038e576100ea565b8063395093511461026d57806340c10f19146102a657806370a08231146102e1576100ea565b806318160ddd116100c857806318160ddd146101ea57806323b872dd14610204578063313ce56714610247578063355274ea14610265576100ea565b806306fdde03146100ef578063075461721461016c578063095ea7b31461019d575b600080fd5b6100f76103c9565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610131578181015183820152602001610119565b50505050905090810190601f16801561015e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61017461047d565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6101d6600480360360408110156101b357600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356104a1565b604080519115158252519081900360200190f35b6101f26104be565b60408051918252519081900360200190f35b6101d66004803603606081101561021a57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135811691602081013590911690604001356104c4565b61024f61056b565b6040805160ff9092168252519081900360200190f35b6101f2610574565b6101d66004803603604081101561028357600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813516906020013561057a565b6102df600480360360408110156102bc57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356105db565b005b6101f2600480360360208110156102f757600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661068d565b6100f76106b5565b6101d66004803603604081101561033257600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135610734565b6101d66004803603604081101561036b57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356107af565b6101f2600480360360408110156103a457600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160200135166107c3565b60038054604080516020601f60027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104735780601f1061044857610100808354040283529160200191610473565b820191906000526020600020905b81548152906001019060200180831161045657829003601f168201915b5050505050905090565b7f000000000000000000000000000000000000000000000000000000000000000081565b60006104b56104ae6107fb565b84846107ff565b50600192915050565b60025490565b60006104d1848484610946565b610561846104dd6107fb565b61055c85604051806060016040528060288152602001610eaf6028913973ffffffffffffffffffffffffffffffffffffffff8a166000908152600160205260408120906105286107fb565b73ffffffffffffffffffffffffffffffffffffffff168152602081019190915260400160002054919063ffffffff610b2216565b6107ff565b5060019392505050565b60055460ff1690565b60065490565b60006104b56105876107fb565b8461055c85600160006105986107fb565b73ffffffffffffffffffffffffffffffffffffffff908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff610bd316565b3373ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000161461067f57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4e6f742066726f6d206d696e7465720000000000000000000000000000000000604482015290519081900360640190fd5b6106898282610c4e565b5050565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b60048054604080516020601f60027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104735780601f1061044857610100808354040283529160200191610473565b60006104b56107416107fb565b8461055c85604051806060016040528060258152602001610f20602591396001600061076b6107fb565b73ffffffffffffffffffffffffffffffffffffffff908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff610b2216565b60006104b56107bc6107fb565b8484610946565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260016020908152604080832093909416825291909152205490565b3390565b73ffffffffffffffffffffffffffffffffffffffff831661086b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526024815260200180610efc6024913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff82166108d7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180610e676022913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b73ffffffffffffffffffffffffffffffffffffffff83166109b2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180610ed76025913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8216610a1e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526023815260200180610e446023913960400191505060405180910390fd5b610a29838383610d8b565b610a7981604051806060016040528060268152602001610e896026913973ffffffffffffffffffffffffffffffffffffffff8616600090815260208190526040902054919063ffffffff610b2216565b73ffffffffffffffffffffffffffffffffffffffff8085166000908152602081905260408082209390935590841681522054610abb908263ffffffff610bd316565b73ffffffffffffffffffffffffffffffffffffffff8084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b60008184841115610bcb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610b90578181015183820152602001610b78565b50505050905090810190601f168015610bbd5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082820183811015610c4757604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b73ffffffffffffffffffffffffffffffffffffffff8216610cd057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b610cdc60008383610d8b565b600254610cef908263ffffffff610bd316565b60025573ffffffffffffffffffffffffffffffffffffffff8216600090815260208190526040902054610d28908263ffffffff610bd316565b73ffffffffffffffffffffffffffffffffffffffff83166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b610d96838383610e3e565b73ffffffffffffffffffffffffffffffffffffffff8316610e3e57610db9610574565b610dd182610dc56104be565b9063ffffffff610bd316565b1115610e3e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f45524332304361707065643a2063617020657863656564656400000000000000604482015290519081900360640190fd5b50505056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa26469706673582212207fc226d6e4710807cc45df55579a0cf7761d5ad01ffb12d78b630a3ab9858ef364736f6c634300060b0033"
    };
  }
});

// src/contracts/erc20.ts
var import_contract, import_bignumber2, Abi, Bytecode, Erc20;
var init_erc20 = __esm({
  "src/contracts/erc20.ts"() {
    import_contract = __toModule(require_contract());
    import_bignumber2 = __toModule(require("bignumber.js"));
    init_utils();
    Abi = require_erc20().abi;
    Bytecode = require_erc20().bytecode;
    Erc20 = class extends import_contract.Contract {
      constructor(wallet, address, decimals) {
        super(wallet, address, Abi, Bytecode);
        this._decimals = decimals;
      }
      async deploy(params) {
        return this.__deploy([params.name, params.symbol, params.minter || this.wallet.address, this.wallet.utils.toWei(params.cap ? params.cap.toString() : "1000000000")]);
      }
      parseApprovalEvent(receipt) {
        return this.parseEvents(receipt, "Approval").map((e) => this.decodeApprovalEvent(e));
      }
      decodeApprovalEvent(event) {
        let result = event.data;
        return {
          owner: result.owner,
          spender: result.spender,
          value: new import_bignumber2.BigNumber(result.value),
          _event: event
        };
      }
      parseTransferEvent(receipt) {
        return this.parseEvents(receipt, "Transfer").map((e) => this.decodeTransferEvent(e));
      }
      decodeTransferEvent(event) {
        let result = event.data;
        return {
          from: result.from,
          to: result.to,
          value: new import_bignumber2.BigNumber(result.value),
          _event: event
        };
      }
      async allowance(params) {
        return fromDecimals(await this.methods("allowance", params.owner, params.spender), await this.decimals);
      }
      approve(params) {
        return new Promise(async (resolve, reject) => {
          try {
            resolve(this.methods("approve", params.spender, await toDecimals(params.amount, await this.decimals)));
          } catch (err) {
            reject(err);
          }
        });
      }
      get balance() {
        return this.balanceOf(this.wallet.address);
      }
      async balanceOf(address) {
        return new Promise(async (resolve, reject) => {
          try {
            resolve(await fromDecimals(await this.methods("balanceOf", address), await this.decimals));
          } catch (err) {
            reject(err);
          }
        });
      }
      get cap() {
        return new Promise(async (resolve, reject) => {
          try {
            resolve(await fromDecimals(await this.methods("cap"), await this.decimals));
          } catch (err) {
            reject(err);
          }
        });
      }
      get decimals() {
        return new Promise(async (resolve, reject) => {
          try {
            if (!this._decimals)
              this._decimals = new import_bignumber2.BigNumber(await this.methods("decimals")).toNumber();
            resolve(this._decimals);
          } catch (err) {
            reject(err);
          }
        });
      }
      mint(params) {
        return new Promise(async (resolve, reject) => {
          try {
            resolve(await this.methods("mint", params.address, await toDecimals(params.amount, await this.decimals)));
          } catch (err) {
            reject(err);
          }
        });
      }
      minter() {
        return this.methods("minter");
      }
      get name() {
        return this.methods("name");
      }
      get symbol() {
        return this.methods("symbol");
      }
      get totalSupply() {
        return new Promise(async (resolve, reject) => {
          try {
            resolve(await fromDecimals(await this.methods("totalSupply"), await this.decimals));
          } catch (err) {
            reject(err);
          }
        });
      }
      async transfer(params) {
        return this.methods("transfer", params.address, await toDecimals(params.amount, await this.decimals));
      }
    };
  }
});

// src/kms.ts
var require_kms = __commonJS({
  "src/kms.ts"(exports, module2) {
    var AwsSDK = __toModule(require("aws-sdk"));
    var asn1 = __toModule(require("asn1.js"));
    var import_bn = __toModule(require("bn.js"));
    var ethutil = __toModule(require("ethereumjs-util"));
    var import_ethereumjs_tx = __toModule(require("ethereumjs-tx"));
    var KMS;
    (function(_KMS) {
      const EcdsaSigAsnParse = asn1 && asn1.define ? asn1.define("EcdsaSig", function() {
        this.seq().obj(this.key("r").int(), this.key("s").int());
      }) : void 0;
      const EcdsaPubKey = asn1 && asn1.define ? asn1.define("EcdsaPubKey", function() {
        this.seq().obj(this.key("algo").seq().obj(this.key("a").objid(), this.key("b").objid()), this.key("pubKey").bitstr());
      }) : void 0;
      function recoverPubKeyFromSig(msg, r, s, v) {
        let rBuffer = r.toBuffer();
        let sBuffer = s.toBuffer();
        let pubKey = ethutil.ecrecover(msg, v, rBuffer, sBuffer);
        let addrBuf = ethutil.pubToAddress(pubKey);
        let recoveredEthAddr = ethutil.bufferToHex(addrBuf);
        return recoveredEthAddr;
      }
      class KMS3 {
        constructor(options) {
          this._options = options;
          this._sdk = new AwsSDK.KMS(options);
        }
        getEthereumAddress(publicKey) {
          let res = EcdsaPubKey.decode(publicKey, "der");
          let pubKeyBuffer = res.pubKey.data;
          pubKeyBuffer = pubKeyBuffer.slice(1, pubKeyBuffer.length);
          let buf = ethutil.keccak256(pubKeyBuffer);
          return "0x" + buf.slice(-20).toString("hex");
        }
        async sign(msgHash) {
          const params = {
            KeyId: this._options.keyId,
            Message: msgHash,
            SigningAlgorithm: "ECDSA_SHA_256",
            MessageType: "DIGEST"
          };
          return await this._sdk.sign(params).promise();
        }
        async signMessage(chainId, message) {
          let hash = ethutil.hashPersonalMessage(ethutil.toBuffer(message));
          let sig = await this.findEthereumSig(hash);
          let address = await this.getAddress();
          let recoveredPubAddr = this.findRightKey(hash, sig.r, sig.s, address);
          let r = sig.r.toBuffer();
          let s = sig.s.toBuffer();
          let v = new import_bn.default(recoveredPubAddr.v + (chainId > 1 ? 8 + chainId * 2 : 0)).toBuffer();
          return "0x" + Buffer.concat([r, s, v]).toString("hex");
        }
        async findEthereumSig(plaintext) {
          let signature = await this.sign(plaintext);
          if (signature.Signature == void 0) {
            throw new Error("Signature is undefined.");
          }
          let decoded = EcdsaSigAsnParse.decode(signature.Signature, "der");
          let r = decoded.r;
          let s = decoded.s;
          let secp256k1N = new import_bn.default("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", 16);
          let secp256k1halfN = secp256k1N.div(new import_bn.default(2));
          if (s.gt(secp256k1halfN)) {
            s = secp256k1N.sub(s);
          }
          return { r, s };
        }
        findRightKey(msg, r, s, expectedEthAddr) {
          let v = 27;
          let pubKey = recoverPubKeyFromSig(msg, r, s, v);
          if (pubKey != expectedEthAddr) {
            v = 28;
            pubKey = recoverPubKeyFromSig(msg, r, s, v);
          }
          return { pubKey, v };
        }
        async getPublicKey() {
          return this._sdk.getPublicKey({
            KeyId: this._options.keyId
          }).promise();
        }
        async getAddress() {
          if (!this._address) {
            let pubKey = await this.getPublicKey();
            this._address = this.getEthereumAddress(pubKey.PublicKey);
          }
          return this._address;
        }
        async signTransaction(chainId, txData) {
          const tx = new import_ethereumjs_tx.Transaction(txData, {
            chain: chainId
          });
          let txHash = tx.hash(false);
          let sig = await this.findEthereumSig(txHash);
          let address = await this.getAddress();
          let recoveredPubAddr = this.findRightKey(txHash, sig.r, sig.s, address);
          tx.r = sig.r.toBuffer();
          tx.s = sig.s.toBuffer();
          tx.v = new import_bn.default(recoveredPubAddr.v + (chainId > 1 ? 8 + chainId * 2 : 0)).toBuffer();
          const serializedTx = tx.serialize().toString("hex");
          return "0x" + serializedTx;
        }
      }
      _KMS.KMS = KMS3;
    })(KMS || (KMS = {}));
    module2.exports = KMS;
  }
});

// src/wallet.ts
var require_wallet = __commonJS({
  "src/wallet.ts"(exports, module2) {
    var W3 = __toModule(require("web3"));
    var import_bignumber4 = __toModule(require("bignumber.js"));
    init_erc20();
    var import_kms = __toModule(require_kms());
    var Web32 = initWeb3Lib();
    var Web3Modal;
    var WalletConnectProvider;
    var RequireJS = {
      require(reqs, callback) {
        window.require(reqs, callback);
      }
    };
    function initWeb3Lib() {
      if (typeof window !== "undefined" && window["Web3"])
        return window["Web3"];
      else
        return require("web3");
    }
    function initWeb3ModalLib(callback) {
      if (typeof window !== "undefined") {
        RequireJS.require(["WalletConnectProvider", "Web3Modal"], (walletconnect, web3modal) => {
          window["WalletConnectProvider"] = walletconnect;
          window["Web3Modal"] = web3modal;
          callback();
        });
      }
    }
    var Wallet2;
    (function(_Wallet) {
      ;
      ;
      ;
      ;
      const WalletUtils = {
        fromWei(value) {
          return new import_bignumber4.BigNumber(W3.default.utils.fromWei(value));
        }
      };
      _Wallet.DefaultNetworksMap = {
        1: {
          chainId: 1,
          chainName: "Ethereum Mainnet",
          rpcUrls: ["https://mainnet.infura.io/v3/{INFURA_ID}"],
          blockExplorerUrls: ["https://etherscan.io/"],
          nativeCurrency: {
            decimals: 18,
            name: "ETH",
            symbol: "ETH"
          }
        },
        3: {
          chainId: 3,
          chainName: "Ropsten Test Network",
          rpcUrls: ["https://ropsten.infura.io/v3/{INFURA_ID}"],
          blockExplorerUrls: ["https://ropsten.etherscan.io"],
          nativeCurrency: {
            decimals: 18,
            name: "ETH",
            symbol: "ETH"
          }
        },
        4: {
          chainId: 4,
          chainName: "Rinkeby Test Network",
          rpcUrls: ["https://rinkeby.infura.io/v3/{INFURA_ID}"],
          blockExplorerUrls: ["https://rinkeby.etherscan.io"],
          nativeCurrency: {
            decimals: 18,
            name: "ETH",
            symbol: "ETH"
          }
        },
        42: {
          chainId: 42,
          chainName: "Kovan Test Network",
          rpcUrls: ["https://kovan.infura.io/v3/{INFURA_ID}"],
          blockExplorerUrls: ["https://kovan.etherscan.io/"],
          nativeCurrency: {
            decimals: 18,
            name: "ETH",
            symbol: "ETH"
          }
        },
        56: {
          chainId: 56,
          chainName: "Binance Mainnet",
          rpcUrls: ["https://bsc-dataseed.binance.org"],
          blockExplorerUrls: ["https://bscscan.com"],
          nativeCurrency: {
            decimals: 18,
            name: "BNB",
            symbol: "BNB"
          }
        },
        97: {
          chainId: 97,
          chainName: "Binance Testnet",
          rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
          blockExplorerUrls: ["https://testnet.bscscan.com"],
          nativeCurrency: {
            decimals: 18,
            name: "BNB",
            symbol: "BNB"
          }
        },
        137: {
          chainId: 137,
          chainName: "Polygon",
          rpcUrls: ["https://polygon-rpc.com"],
          blockExplorerUrls: ["https://polygonscan.com/"],
          nativeCurrency: {
            decimals: 18,
            name: "MATIC",
            symbol: "MATIC"
          }
        },
        1287: {
          chainId: 1287,
          chainName: "Moonbeam Testnet",
          rpcUrls: ["https://rpc.testnet.moonbeam.network"],
          blockExplorerUrls: ["https://moonbase-blockscout.testnet.moonbeam.network"],
          nativeCurrency: {
            decimals: 18,
            name: "MOON",
            symbol: "MOON"
          }
        },
        31337: {
          chainId: 31337,
          chainName: "Amino Testnet",
          rpcUrls: ["https://leucine0.node.alphacarbon.network"],
          blockExplorerUrls: ["https://leucine0.blockscout.alphacarbon.network"],
          nativeCurrency: {
            decimals: 18,
            name: "TACT",
            symbol: "TACT"
          }
        },
        80001: {
          chainId: 80001,
          chainName: "Mumbai",
          rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
          blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
          nativeCurrency: {
            decimals: 18,
            name: "MATIC",
            symbol: "MATIC"
          }
        },
        43113: {
          chainId: 43113,
          chainName: "Avalanche FUJI C-Chain",
          rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
          blockExplorerUrls: ["https://testnet.snowtrace.io/"],
          nativeCurrency: {
            decimals: 18,
            name: "AVAX",
            symbol: "AVAX"
          }
        },
        43114: {
          chainId: 43114,
          chainName: "Avalanche Mainnet C-Chain",
          rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
          blockExplorerUrls: ["https://snowtrace.io/"],
          nativeCurrency: {
            decimals: 18,
            name: "AVAX",
            symbol: "AVAX"
          }
        },
        4002: {
          chainId: 4002,
          chainName: "Fantom Testnet",
          rpcUrls: ["https://rpc.testnet.fantom.network/"],
          blockExplorerUrls: ["https://testnet.ftmscan.com/", "https://explorer.testnet.fantom.network/"],
          nativeCurrency: {
            decimals: 18,
            name: "FTM",
            symbol: "FTM"
          }
        },
        250: {
          chainId: 250,
          chainName: "Fantom Opera",
          rpcUrls: ["https://rpc.ftm.tools/"],
          blockExplorerUrls: ["https://ftmscan.com/", "https://explorer.fantom.network/"],
          nativeCurrency: {
            decimals: 18,
            name: "FTM",
            symbol: "FTM"
          }
        },
        13370: {
          chainId: 13370,
          chainName: "AminoX Testnet",
          rpcUrls: ["https://aminoxtestnet.node.alphacarbon.network"],
          blockExplorerUrls: ["https://aminoxtestnet.blockscout.alphacarbon.network/"],
          nativeCurrency: {
            decimals: 18,
            name: "TACT",
            symbol: "TACT"
          }
        }
      };
      let WalletPlugin2;
      (function(WalletPlugin3) {
        WalletPlugin3["MetaMask"] = "metamask";
        WalletPlugin3["Coin98"] = "coin98";
        WalletPlugin3["TrustWallet"] = "trustwallet";
        WalletPlugin3["BinanceChainWallet"] = "binancechainwallet";
        WalletPlugin3["ONTOWallet"] = "onto";
        WalletPlugin3["WalletConnect"] = "walletconnect";
      })(WalletPlugin2 = _Wallet.WalletPlugin || (_Wallet.WalletPlugin = {}));
      _Wallet.WalletPluginConfig = {
        [WalletPlugin2.MetaMask]: {
          provider: () => {
            return window["ethereum"];
          },
          installed: () => {
            let ethereum = window["ethereum"];
            return !!ethereum && !!ethereum.isMetaMask;
          },
          homepage: () => {
            return "https://metamask.io/download.html";
          }
        },
        [WalletPlugin2.Coin98]: {
          provider: () => {
            return window["ethereum"];
          },
          installed: () => {
            let ethereum = window["ethereum"];
            return !!ethereum && (!!ethereum.isCoin98 || !!window["isCoin98"]);
          },
          homepage: () => {
            return "https://docs.coin98.com/products/coin98-wallet";
          }
        },
        [WalletPlugin2.TrustWallet]: {
          provider: () => {
            return window["ethereum"];
          },
          installed: () => {
            let ethereum = window["ethereum"];
            return !!ethereum && !!ethereum.isTrust;
          },
          homepage: () => {
            return "https://link.trustwallet.com/open_url?url=" + window.location.href;
          }
        },
        [WalletPlugin2.BinanceChainWallet]: {
          provider: () => {
            return window["BinanceChain"];
          },
          installed: () => {
            return !!window["BinanceChain"];
          },
          homepage: () => {
            return "https://www.binance.org/en";
          }
        },
        [WalletPlugin2.ONTOWallet]: {
          provider: () => {
            return window["onto"];
          },
          installed: () => {
            return !!window["onto"];
          },
          homepage: () => {
            return "https://onto.app/en/download/?mode=app";
          }
        }
      };
      class ClientSideProvider {
        constructor(wallet, walletPlugin, events, options) {
          this._isConnected = false;
          this.wallet = wallet;
          this.walletPlugin = walletPlugin;
          this._events = events;
          this._options = options;
        }
        get installed() {
          return _Wallet.WalletPluginConfig[this.walletPlugin].installed();
        }
        initEvents() {
          let self2 = this;
          if (this.installed) {
            this.provider.on("accountsChanged", (accounts) => {
              let accountAddress;
              let hasAccounts = accounts && accounts.length > 0;
              if (hasAccounts) {
                accountAddress = self2.wallet.web3.utils.toChecksumAddress(accounts[0]);
                self2.wallet.web3.selectedAddress = accountAddress;
                self2.wallet.account = {
                  address: accountAddress
                };
              }
              this._isConnected = hasAccounts;
              if (self2.onAccountChanged)
                self2.onAccountChanged(accountAddress);
            });
            this.provider.on("chainChanged", (chainId) => {
              self2.wallet.chainId = parseInt(chainId);
              if (this._options && this._options.callWithDefaultProvider) {
                if (this._options.infuraId)
                  this.wallet.infuraId = this._options.infuraId;
                self2.wallet.setDefaultProvider();
              }
              if (self2.onChainChanged)
                self2.onChainChanged(chainId);
            });
            this.provider.on("connect", (connectInfo) => {
              if (self2.onConnect)
                self2.onConnect(connectInfo);
            });
            this.provider.on("disconnect", (error) => {
              if (self2.onDisconnect)
                self2.onDisconnect(error);
            });
          }
          ;
        }
        async connect() {
          this.provider = _Wallet.WalletPluginConfig[this.walletPlugin].provider();
          this.wallet.chainId = parseInt(this.provider.chainId, 16);
          if (this._events) {
            this.onAccountChanged = this._events.onAccountChanged;
            this.onChainChanged = this._events.onChainChanged;
            this.onConnect = this._events.onConnect;
            this.onDisconnect = this._events.onDisconnect;
          }
          this.initEvents();
          let self2 = this;
          try {
            if (this.installed) {
              await this.provider.request({ method: "eth_requestAccounts" }).then((accounts) => {
                let accountAddress;
                let hasAccounts = accounts && accounts.length > 0;
                if (hasAccounts) {
                  accountAddress = self2.wallet.web3.utils.toChecksumAddress(accounts[0]);
                  self2.wallet.web3.selectedAddress = accountAddress;
                  self2.wallet.account = {
                    address: accountAddress
                  };
                }
                this._isConnected = hasAccounts;
                if (self2.onAccountChanged)
                  self2.onAccountChanged(accountAddress);
              });
            }
          } catch (error) {
            console.error(error);
          }
          return this.provider;
        }
        async disconnect() {
          if (this.provider == null) {
            return;
          }
          if (this.provider.disconnect) {
            await this.provider.disconnect();
          }
          this.wallet.account = null;
          this._isConnected = false;
        }
        get isConnected() {
          return this._isConnected;
        }
        addToken(option, type) {
          return new Promise(async function(resolve, reject) {
            try {
              let result = await this.provider.request({
                method: "wallet_watchAsset",
                params: {
                  type: type || "ERC20",
                  options: option
                }
              });
              resolve(result);
            } catch (err) {
              reject(err);
            }
          });
        }
        switchNetwork(chainId, onChainChanged) {
          let self2 = this;
          if (onChainChanged) {
            this.onChainChanged = onChainChanged;
          }
          return new Promise(async function(resolve, reject) {
            try {
              let chainIdHex = "0x" + chainId.toString(16);
              try {
                let result = await self2.provider.request({
                  method: "wallet_switchEthereumChain",
                  params: [{
                    chainId: chainIdHex
                  }]
                });
                resolve(!result);
              } catch (error) {
                if (error.code === 4902) {
                  try {
                    let network = self2.wallet.networksMap[chainId];
                    if (!network)
                      resolve(false);
                    let { chainName, nativeCurrency, rpcUrls, blockExplorerUrls, iconUrls } = network;
                    if (!Array.isArray(rpcUrls))
                      rpcUrls = [rpcUrls];
                    if (blockExplorerUrls && !Array.isArray(blockExplorerUrls))
                      blockExplorerUrls = [blockExplorerUrls];
                    if (iconUrls && !Array.isArray(iconUrls))
                      iconUrls = [iconUrls];
                    let result = await self2.provider.request({
                      method: "wallet_addEthereumChain",
                      params: [{
                        chainId: chainIdHex,
                        chainName,
                        nativeCurrency,
                        rpcUrls,
                        blockExplorerUrls,
                        iconUrls
                      }]
                    });
                    resolve(!result);
                  } catch (error2) {
                    reject(error2);
                  }
                } else
                  reject(error);
              }
            } catch (err) {
              reject(err);
            }
          });
        }
        addNetwork(options) {
          return new Promise(async function(resolve, reject) {
            try {
              options = JSON.parse(JSON.stringify(options));
              let chainIdHex = "0x" + options.chainId.toString(16);
              try {
                await this.provider.request({
                  method: "wallet_switchEthereumChain",
                  params: [{ chainId: chainIdHex }]
                });
                resolve(true);
              } catch (err) {
                let result = await this.provider.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    options
                  ]
                });
                resolve(!result);
              }
            } catch (err) {
              reject(err);
            }
          });
        }
      }
      _Wallet.ClientSideProvider = ClientSideProvider;
      class BinanceChainWalletProvider extends ClientSideProvider {
        switchNetwork(chainId, onChainChanged) {
          let self2 = this;
          if (onChainChanged) {
            this.onChainChanged = onChainChanged;
          }
          return new Promise(async function(resolve, reject) {
            try {
              let chainIdHex = "0x" + chainId.toString(16);
              try {
                let result = await self2.provider.request({
                  method: "wallet_switchEthereumChain",
                  params: [{
                    chainId: chainIdHex
                  }]
                });
                resolve(!result);
              } catch (error) {
                if (error.code === 4902) {
                  try {
                    let network = self2.wallet.networksMap[chainId];
                    if (!network)
                      resolve(false);
                    let { chainName, nativeCurrency, rpcUrls, blockExplorerUrls, iconUrls } = network;
                    if (!Array.isArray(rpcUrls))
                      rpcUrls = [rpcUrls];
                    if (blockExplorerUrls && !Array.isArray(blockExplorerUrls))
                      blockExplorerUrls = [blockExplorerUrls];
                    if (iconUrls && !Array.isArray(iconUrls))
                      iconUrls = [iconUrls];
                    let result = await self2.provider.request({
                      method: "wallet_addEthereumChain",
                      params: [{
                        chainId: chainIdHex,
                        chainName,
                        nativeCurrency,
                        rpcUrls,
                        blockExplorerUrls,
                        iconUrls
                      }]
                    });
                    resolve(!result);
                  } catch (error2) {
                    reject(error2);
                  }
                } else
                  reject(error);
              }
            } catch (err) {
              reject(err);
            }
          });
        }
      }
      _Wallet.BinanceChainWalletProvider = BinanceChainWalletProvider;
      class Web3ModalProvider extends ClientSideProvider {
        constructor(wallet, walletPlugin, events, options) {
          super(wallet, walletPlugin, events);
          this.initializeWeb3Modal(options);
        }
        get installed() {
          return true;
        }
        initializeWeb3Modal(options) {
          let func = () => {
            WalletConnectProvider = window["WalletConnectProvider"];
            const providerOptions = {
              walletconnect: {
                package: WalletConnectProvider.default,
                options
              }
            };
            Web3Modal = window["Web3Modal"];
            this.web3Modal = new Web3Modal.default({
              cacheProvider: false,
              providerOptions
            });
          };
          initWeb3ModalLib(func);
        }
        async connect() {
          await this.disconnect();
          this.provider = await this.web3Modal.connectTo(WalletPlugin2.WalletConnect);
          this.wallet.chainId = this.provider.chainId;
          this.wallet.web3.setProvider(this.provider);
          if (this._events) {
            this.onAccountChanged = this._events.onAccountChanged;
            this.onChainChanged = this._events.onChainChanged;
            this.onConnect = this._events.onConnect;
            this.onDisconnect = this._events.onDisconnect;
          }
          this.initEvents();
          let self2 = this;
          try {
            await this.wallet.web3.eth.getAccounts((err, accounts) => {
              let accountAddress;
              let hasAccounts = accounts && accounts.length > 0;
              if (hasAccounts) {
                accountAddress = self2.wallet.web3.utils.toChecksumAddress(accounts[0]);
                self2.wallet.web3.selectedAddress = accountAddress;
                this.wallet.account = {
                  address: accountAddress
                };
              }
              this._isConnected = hasAccounts;
              if (self2.onAccountChanged)
                self2.onAccountChanged(accountAddress);
            });
          } catch (error) {
            console.error(error);
          }
          return this.provider;
        }
        async disconnect() {
          if (this.provider == null) {
            return;
          }
          if (this.provider.disconnect) {
            await this.provider.disconnect();
          }
          this.wallet.account = null;
          this._isConnected = false;
        }
      }
      _Wallet.Web3ModalProvider = Web3ModalProvider;
      function createClientSideProvider(wallet, walletPlugin, events, providerOptions) {
        if (Wallet3.isInstalled(walletPlugin)) {
          if (walletPlugin == WalletPlugin2.BinanceChainWallet) {
            return new BinanceChainWalletProvider(wallet, walletPlugin, events);
          }
          if (walletPlugin == WalletPlugin2.WalletConnect) {
            return new Web3ModalProvider(wallet, walletPlugin, events, providerOptions);
          } else {
            return new ClientSideProvider(wallet, walletPlugin, events);
          }
        }
        return null;
      }
      _Wallet.createClientSideProvider = createClientSideProvider;
      const _Wallet2 = class {
        constructor(provider, account) {
          this._eventTopicAbi = {};
          this._eventHandler = {};
          this._sendTxEventHandler = {};
          this._contracts = {};
          this._networksMap = {};
          this._abiHashDict = {};
          this._abiAddressDict = {};
          this._abiEventDict = {};
          this._provider = provider;
          this._web3 = new Web32(provider);
          if (Array.isArray(account)) {
            this._accounts = account;
            this._account = account[0];
          } else
            this._account = account;
          if (this._account && this._account.privateKey && !this._account.address)
            this._account.address = this._web3.eth.accounts.privateKeyToAccount(this._account.privateKey).address;
          this._networksMap = _Wallet.DefaultNetworksMap;
        }
        static getInstance() {
          return _Wallet2.instance;
        }
        static isInstalled(walletPlugin) {
          if (walletPlugin == WalletPlugin2.WalletConnect)
            return true;
          return _Wallet.WalletPluginConfig[walletPlugin] ? _Wallet.WalletPluginConfig[walletPlugin].installed() : false;
        }
        get isConnected() {
          return this.clientSideProvider ? this.clientSideProvider.isConnected : false;
        }
        async switchNetwork(chainId, onChainChanged) {
          let result;
          if (this.clientSideProvider) {
            result = await this.clientSideProvider.switchNetwork(chainId, onChainChanged);
          } else {
            this.chainId = chainId;
            this.setDefaultProvider();
            onChainChanged("0x" + chainId.toString(16));
          }
          return result;
        }
        setDefaultProvider() {
          var _a;
          if (!this.chainId)
            this.chainId = 56;
          if (this._networksMap[this.chainId] && this._networksMap[this.chainId].rpcUrls.length > 0) {
            let rpc = this._networksMap[this.chainId].rpcUrls[0];
            if (rpc.indexOf("{INFURA_ID}")) {
              rpc = rpc.replace("{INFURA_ID}", (_a = this._infuraId) != null ? _a : "");
            }
            this.provider = rpc;
          }
        }
        async connect(walletPlugin, events, providerOptions) {
          this.clientSideProvider = createClientSideProvider(this, walletPlugin, events, providerOptions);
          if (this.clientSideProvider) {
            await this.clientSideProvider.connect();
            if (providerOptions && providerOptions.callWithDefaultProvider) {
              if (providerOptions.infuraId)
                this._infuraId = providerOptions.infuraId;
              this.setDefaultProvider();
            } else {
              this.provider = this.clientSideProvider.provider;
            }
          } else {
            this.setDefaultProvider();
          }
          return this.clientSideProvider;
        }
        async disconnect() {
          if (this.clientSideProvider) {
            await this.clientSideProvider.disconnect();
          }
          this.setDefaultProvider();
        }
        get accounts() {
          return new Promise((resolve) => {
            if (this._accounts) {
              let result = [];
              for (let i = 0; i < this._accounts.length; i++) {
                if (!this._accounts[i].address && this._accounts[i].privateKey)
                  this._accounts[i].address = this._web3.eth.accounts.privateKeyToAccount(this._accounts[i].privateKey).address;
                result.push(this._accounts[i].address);
              }
              return resolve(result);
            } else if (this._account)
              return resolve([this._account.address]);
            resolve(this._web3.eth.getAccounts());
          });
        }
        get address() {
          if (this._account && this._account.privateKey) {
            if (!this._account.address)
              this._account.address = this._web3.eth.accounts.privateKeyToAccount(this._account.privateKey).address;
            return this._account.address;
          } else if (this._kms && this._account) {
            return this._account.address;
          } else if (this._web3.selectedAddress) {
            return this._web3.selectedAddress;
          } else if (this._web3.eth.defaultAccount) {
            return this._web3.eth.defaultAccount;
          }
          if (!this._account) {
            this._account = this.createAccount();
            return this._account.address;
          } else
            return this._account.address;
        }
        get account() {
          return {
            address: this.address
          };
        }
        set account(value) {
          this._kms = null;
          this._web3.eth.defaultAccount = "";
          this._account = value;
        }
        get infuraId() {
          return this._infuraId;
        }
        set infuraId(value) {
          this._infuraId = value;
          this.setDefaultProvider();
        }
        get networksMap() {
          return this._networksMap;
        }
        getNetworkInfo(chainId) {
          return this._networksMap[chainId];
        }
        setNetworkInfo(network) {
          this._networksMap[network.chainId] = network;
        }
        setMultipleNetworksInfo(networks) {
          for (let network of networks) {
            this.setNetworkInfo(network);
          }
        }
        createAccount() {
          let acc = this._web3.eth.accounts.create();
          return {
            address: acc.address,
            privateKey: acc.privateKey
          };
        }
        decodeLog(inputs, hexString, topics) {
          return this.web3.eth.abi.decodeLog(inputs, hexString, topics);
        }
        get defaultAccount() {
          if (this._account)
            return this._account.address;
          return this._web3.eth.defaultAccount;
        }
        set defaultAccount(address) {
          if (this._accounts) {
            for (let i = 0; i < this._accounts.length; i++) {
              if (!this._accounts[i].address && this._accounts[i].privateKey)
                this._accounts[i].address = this._web3.eth.accounts.privateKeyToAccount(this._accounts[i].privateKey).address;
              if (this._accounts[i].address && this._accounts[i].address.toLowerCase() == address.toLowerCase()) {
                this._account = this._accounts[i];
                return;
              }
            }
          } else if (this._account && this._account.address && this._account.address.toLowerCase() == address.toLowerCase()) {
            return;
          } else
            this._web3.eth.defaultAccount = address;
        }
        async getChainId() {
          if (!this.chainId)
            this.chainId = await this._web3.eth.getChainId();
          return this.chainId;
        }
        get provider() {
          return this._provider;
        }
        set provider(value) {
          this._web3.setProvider(value);
          this._provider = value;
        }
        sendSignedTransaction(tx) {
          let _web3 = this._web3;
          return _web3.eth.sendSignedTransaction(tx);
        }
        async signTransaction(tx, privateKey) {
          let _web3 = this._web3;
          let gas = tx.gas || await _web3.eth.estimateGas({
            from: this.address,
            to: tx.to,
            data: tx.data
          });
          let gasLimit = tx.gasLimit || gas;
          let nonce = tx.nonce || await _web3.eth.getTransactionCount(this.address);
          if (privateKey || this._account && this._account.privateKey) {
            let signedTx = await _web3.eth.accounts.signTransaction({
              nonce,
              gas,
              gasLimit,
              data: tx.data,
              from: this.address,
              to: tx.to
            }, privateKey ? privateKey : this._account.privateKey);
            return signedTx.rawTransaction;
          } else if (this._account && this._account.kms) {
            let chainId = await this.getChainId();
            let txHash = await this.kms.signTransaction(chainId, tx);
            return txHash;
          } else {
            let t = await _web3.eth.signTransaction({
              from: this.address,
              nonce,
              gasLimit,
              gas,
              to: tx.to,
              data: tx.data
            }, this.address);
            return t.raw;
          }
        }
        registerSendTxEvents(eventsOptions) {
          this._sendTxEventHandler = eventsOptions;
        }
        async _methods(...args) {
          let _web3 = this._web3;
          let result;
          let value;
          let method;
          let methodAbi;
          let byteCode;
          let abi = args.shift();
          let address = args.shift();
          let methodName = args.shift();
          if (methodName == "deploy")
            byteCode = args.shift();
          let contract;
          let hash;
          if (this._contracts[address])
            contract = this._contracts[address];
          else {
            hash = this._web3.utils.sha3(JSON.stringify(abi));
            if (this._contracts[hash]) {
              contract = this._contracts[hash];
            }
          }
          if (!contract) {
            contract = new this._web3.eth.Contract(abi);
            this._contracts[address] = contract;
            this._contracts[hash] = contract;
          }
          if (methodName == "deploy") {
            method = contract[methodName]({
              data: byteCode,
              arguments: args
            });
          } else {
            for (let i = 0; i < abi.length; i++) {
              if (abi[i].name == methodName) {
                methodAbi = abi[i];
                break;
              }
            }
            if (methodAbi.payable)
              value = args.pop();
            for (let i = 0; i < methodAbi.inputs.length; i++) {
              if (methodAbi.inputs[i].type.indexOf("bytes") == 0) {
                args[i] = args[i] || "";
                if (methodAbi.inputs[i].type.indexOf("[]") > 0) {
                  let a = [];
                  for (let k = 0; k < args[i].length; k++) {
                    let s = args[i][k] || "";
                    if (s.indexOf("0x") != 0)
                      a.push(_web3.utils.fromAscii(s));
                    else
                      a.push(s);
                  }
                  args[i] = a;
                } else if (args[i].indexOf("0x") != 0)
                  args[i] = _web3.utils.fromAscii(args[i]);
              } else if (methodAbi.inputs[i].type == "address") {
                if (!args[i])
                  args[i] = _web3.eth.abi.encodeParameter("address", 0);
              }
            }
            method = contract.methods[methodName].apply(contract, args);
          }
          let tx = {
            to: address,
            data: method.encodeABI()
          };
          return tx;
        }
        async methods(...args) {
          let _web3 = this._web3;
          if (_web3.methods) {
            return _web3.methods.apply(_web3, args);
          } else {
            let result;
            let value;
            let method;
            let methodAbi;
            let byteCode;
            let abi = args.shift();
            let address = args.shift();
            let methodName = args.shift();
            if (methodName == "deploy")
              byteCode = args.shift();
            let contract;
            let hash;
            if (address && this._contracts[address])
              contract = this._contracts[address];
            else {
              hash = this._web3.utils.sha3(JSON.stringify(abi));
              if (this._contracts[hash]) {
                contract = this._contracts[hash];
              }
            }
            ;
            if (!contract) {
              contract = new this._web3.eth.Contract(abi);
              if (address)
                this._contracts[address] = contract;
              this._contracts[hash] = contract;
            }
            ;
            if (methodName == "deploy") {
              method = contract[methodName]({
                data: byteCode,
                arguments: args
              });
            } else {
              for (let i = 0; i < abi.length; i++) {
                if (abi[i].name == methodName) {
                  methodAbi = abi[i];
                  break;
                }
              }
              if (methodAbi.payable)
                value = args.pop();
              for (let i = 0; i < methodAbi.inputs.length; i++) {
                if (methodAbi.inputs[i].type.indexOf("bytes") == 0) {
                  args[i] = args[i] || "";
                  if (methodAbi.inputs[i].type.indexOf("[]") > 0) {
                    let a = [];
                    for (let k = 0; k < args[i].length; k++) {
                      let s = args[i][k] || "";
                      if (s.indexOf("0x") != 0)
                        a.push(_web3.utils.fromAscii(s));
                      else
                        a.push(s);
                    }
                    args[i] = a;
                  } else if (args[i].indexOf("0x") != 0)
                    args[i] = _web3.utils.fromAscii(args[i]);
                } else if (methodAbi.inputs[i].type == "address") {
                  if (!args[i])
                    args[i] = _web3.eth.abi.encodeParameter("address", 0);
                }
              }
              method = contract.methods[methodName].apply(contract, args);
            }
            ;
            contract.options.address = address;
            if (methodAbi && (methodAbi.constant || methodAbi.stateMutability == "view")) {
              return method.call({ from: this.address });
            }
            if (!this._blockGasLimit) {
              this._blockGasLimit = (await _web3.eth.getBlock("latest")).gasLimit;
            }
            let gas;
            try {
              gas = await method.estimateGas({ from: this.address, to: address, value });
              gas = Math.min(this._blockGasLimit, Math.round(gas * 1.5));
            } catch (e) {
              if (e.message == "Returned error: out of gas") {
                console.log(e.message);
                gas = Math.round(this._blockGasLimit * 0.5);
              } else {
                try {
                  await method.call({ from: this.address, value });
                } catch (e2) {
                  if (e2.message.includes("VM execution error.")) {
                    var msg = (e2.data || e2.message).match(/0x[0-9a-fA-F]+/);
                    if (msg && msg.length) {
                      msg = msg[0];
                      if (msg.startsWith("0x08c379a")) {
                        msg = _web3.eth.abi.decodeParameter("string", "0x" + msg.substring(10));
                        throw new Error(msg);
                      }
                    }
                  }
                }
                throw e;
              }
            }
            let gasPrice = await _web3.eth.getGasPrice();
            if (this._account && this._account.privateKey) {
              let tx = {
                gas,
                gasPrice,
                data: method.encodeABI(),
                from: this.address,
                to: address,
                value
              };
              let signedTx = await _web3.eth.accounts.signTransaction(tx, this._account.privateKey);
              result = await _web3.eth.sendSignedTransaction(signedTx.rawTransaction);
              if (methodName == "deploy")
                return result.contractAddress;
              return result;
            } else if (this._account && this._account.kms) {
              let nonce = await _web3.eth.getTransactionCount(this.address);
              let price = _web3.utils.numberToHex(await _web3.eth.getGasPrice());
              let tx = {
                from: this.address,
                nonce,
                gasPrice: price,
                gasLimit: gas,
                gas,
                to: address,
                data: method.encodeABI()
              };
              let chainId = await this.getChainId();
              let txHash = await this.kms.signTransaction(chainId, tx);
              result = await _web3.eth.sendSignedTransaction(txHash);
              if (methodName == "deploy")
                return result.contractAddress;
              return result;
            } else {
              contract.options.address = address;
              let nonce = await _web3.eth.getTransactionCount(this.address);
              let tx = {
                from: this.address,
                nonce,
                gasPrice,
                gas,
                to: address,
                value,
                data: method.encodeABI()
              };
              let promiEvent = _web3.eth.sendTransaction(tx);
              promiEvent.on("error", (error) => {
                if (error.message.startsWith("Transaction was not mined within 50 blocks")) {
                  return;
                }
                if (this._sendTxEventHandler.transactionHash)
                  this._sendTxEventHandler.transactionHash(error);
              });
              promiEvent.on("transactionHash", (receipt) => {
                if (this._sendTxEventHandler.transactionHash)
                  this._sendTxEventHandler.transactionHash(null, receipt);
              });
              promiEvent.on("confirmation", (confNumber, receipt) => {
                if (this._sendTxEventHandler.confirmation && confNumber == 1)
                  this._sendTxEventHandler.confirmation(receipt);
              });
              result = await promiEvent;
              if (methodName == "deploy")
                return result.contractAddress;
              return result;
            }
          }
        }
        get balance() {
          let self2 = this;
          let _web3 = this._web3;
          return new Promise(async function(resolve) {
            try {
              let network = self2._networksMap[self2.chainId];
              let decimals = 18;
              if (network && network.nativeCurrency && network.nativeCurrency.decimals)
                decimals = network.nativeCurrency.decimals;
              let result = await _web3.eth.getBalance(self2.address);
              resolve(new import_bignumber4.BigNumber(result).div(10 ** decimals));
            } catch (err) {
              resolve(new import_bignumber4.BigNumber(0));
            }
          });
        }
        balanceOf(address) {
          let self2 = this;
          let _web3 = this._web3;
          return new Promise(async function(resolve) {
            try {
              let network = self2._networksMap[self2.chainId];
              let decimals = 18;
              if (network && network.nativeCurrency && network.nativeCurrency.decimals)
                decimals = network.nativeCurrency.decimals;
              let result = await _web3.eth.getBalance(address);
              resolve(new import_bignumber4.BigNumber(result).div(10 ** decimals));
            } catch (err) {
              resolve(new import_bignumber4.BigNumber(0));
            }
          });
        }
        recoverSigner(msg, signature) {
          let _web3 = this._web3;
          return new Promise(async function(resolve, reject) {
            try {
              let signing_address = await _web3.eth.accounts.recover(msg, signature);
              resolve(signing_address);
            } catch (err) {
              reject(err);
            }
            ;
          });
        }
        getBlock(blockHashOrBlockNumber, returnTransactionObjects) {
          return this._web3.eth.getBlock(blockHashOrBlockNumber || "latest", returnTransactionObjects);
        }
        getBlockNumber() {
          return this._web3.eth.getBlockNumber();
        }
        async getBlockTimestamp(blockHashOrBlockNumber) {
          let block = await this._web3.eth.getBlock(blockHashOrBlockNumber || "latest", false);
          if (typeof block.timestamp == "string")
            return parseInt(block.timestamp);
          else
            return block.timestamp;
        }
        async initKMS(value) {
          value = value || this._account.kms;
          if (value) {
            this._kms = new import_kms.KMS(value);
            this._account = {
              address: await this._kms.getAddress(),
              kms: value
            };
          }
        }
        get kms() {
          if (this._account && !this._kms && this._account.kms)
            this._kms = new import_kms.KMS(this._account.kms);
          return this._kms;
        }
        set privateKey(value) {
          if (value) {
            this._kms = null;
            this._web3.eth.defaultAccount = "";
          }
          this._account = {
            address: "",
            privateKey: value
          };
        }
        registerEvent(eventMap, address, handler) {
          for (let topic in eventMap) {
            this._eventTopicAbi[topic] = eventMap[topic];
          }
          if (address && handler) {
            this._eventHandler[address] = handler;
          }
        }
        getAbiEvents(abi) {
          let _web3 = this._web3;
          let events = abi.filter((e) => e.type == "event");
          let eventMap = {};
          for (let i = 0; i < events.length; i++) {
            let topic = _web3.utils.soliditySha3(events[i].name + "(" + events[i].inputs.map((e) => e.type == "tuple" ? "(" + e.components.map((f) => f.type) + ")" : e.type).join(",") + ")");
            eventMap[topic] = events[i];
          }
          return eventMap;
        }
        getAbiTopics(abi, eventNames) {
          if (!eventNames || eventNames.length == 0)
            eventNames = null;
          let _web3 = this._web3;
          let result = [];
          let events = abi.filter((e) => e.type == "event");
          for (let i = 0; i < events.length; i++) {
            if (!eventNames || eventNames.indexOf(events[i].name) >= 0) {
              let topic = _web3.utils.soliditySha3(events[i].name + "(" + events[i].inputs.map((e) => e.type == "tuple" ? "(" + e.components.map((f) => f.type) + ")" : e.type).join(",") + ")");
              result.push(topic);
            }
          }
          if (result.length == 0 && eventNames && eventNames.length > 0)
            return ["NULL"];
          return [result];
        }
        getContractAbi(address) {
          return this._abiAddressDict[address];
        }
        getContractAbiEvents(address) {
          let events = this._abiEventDict[address];
          if (events)
            return events;
          let abi = this._abiHashDict[this._abiAddressDict[address]];
          if (abi) {
            events = this.getAbiEvents(abi);
            this._abiEventDict[address] = events;
            return events;
          }
        }
        registerAbi(abi, address, handler) {
          let hash = "";
          let eventMap;
          if (typeof abi == "string") {
            hash = this._web3.utils.sha3(abi);
            abi = JSON.parse(abi);
          } else {
            hash = this._web3.utils.sha3(JSON.stringify(abi));
          }
          eventMap = this.getAbiEvents(abi);
          for (let topic in eventMap) {
            this._eventTopicAbi[topic] = eventMap[topic];
          }
          this._abiHashDict[hash] = abi;
          if (address)
            this.registerAbiContracts(hash, address, handler);
          return hash;
        }
        registerAbiContracts(abiHash, address, handler) {
          if (address) {
            if (!Array.isArray(address))
              address = [address];
            for (let i = 0; i < address.length; i++) {
              this._abiAddressDict[address[i]] = abiHash;
              if (handler)
                this._eventHandler[address[i]] = handler;
            }
          }
        }
        decode(abi, event, raw) {
          if (!raw)
            raw = event;
          let d;
          try {
            if (abi) {
              d = this.web3.eth.abi.decodeLog(abi.inputs, raw.data, raw.topics.slice(1));
              if (d.__length__) {
                for (let k = 0; k < d.__length__; k++)
                  delete d[k];
                delete d["__length__"];
              }
            }
          } catch (err) {
          }
          let log = {
            address: event.address,
            blockNumber: event.blockNumber,
            topics: raw.topics,
            data: d ? d : raw.data,
            rawData: d ? raw.data : void 0,
            logIndex: event.logIndex,
            name: abi ? abi.name : void 0,
            transactionHash: event.transactionHash,
            transactionIndex: event.transactionIndex
          };
          return log;
        }
        async decodeEventData(data, events) {
          let _web3 = this._web3;
          let event;
          if (events)
            event = events[data.topics[0]];
          else {
            event = this._eventTopicAbi[data.topics[0]];
          }
          ;
          let log = this.decode(event, data);
          let handler = this._eventHandler[data.address];
          if (handler)
            await handler(this, log);
          return log;
        }
        scanEvents(fromBlock, toBlock, topics, events, address) {
          let _web3 = this._web3;
          return new Promise(async (resolve, reject) => {
            try {
              let logs = await _web3.eth.getPastLogs({
                fromBlock,
                toBlock,
                address,
                topics: topics ? topics : null
              });
              let result = [];
              for (let i = 0; i < logs.length; i++) {
                let e = logs[i];
                result.push(await this.decodeEventData(e, events));
              }
              resolve(result);
            } catch (err) {
              reject(err);
            }
          });
        }
        send(to, amount) {
          let _web3 = this._web3;
          let address = this.address;
          let self2 = this;
          return new Promise(async function(resolve, reject) {
            try {
              let value = _web3.utils.numberToHex(_web3.utils.toWei(amount.toString()));
              let result;
              if (self2._account && self2._account.privateKey || self2.kms) {
                let nonce = await _web3.eth.getTransactionCount(address);
                let gas = await _web3.eth.estimateGas({
                  from: address,
                  nonce,
                  to,
                  value
                });
                let price = _web3.utils.numberToHex(await _web3.eth.getGasPrice());
                let tx = {
                  from: address,
                  nonce,
                  gasPrice: price,
                  gasLimit: gas,
                  gas,
                  to,
                  value
                };
                if (self2.kms) {
                  let chainId = await self2.getChainId();
                  let txHash = await self2.kms.signTransaction(chainId, tx);
                  result = await _web3.eth.sendSignedTransaction(txHash);
                } else {
                  let signedTx = await _web3.eth.accounts.signTransaction(tx, self2._account.privateKey);
                  result = await _web3.eth.sendSignedTransaction(signedTx.rawTransaction);
                }
                resolve(result);
              } else {
                result = await _web3.eth.sendTransaction({ from: address, to, value: _web3.utils.toWei(amount.toString()).toString() });
                resolve(result);
              }
            } catch (err) {
              reject(err);
            }
          });
        }
        setBlockTime(time) {
          return new Promise((resolve, reject) => {
            let method = time > 1e9 ? "evm_mine" : "evm_increaseTime";
            this._web3.currentProvider.send({
              jsonrpc: "2.0",
              method,
              params: [time],
              id: new Date().getTime()
            }, (err, result) => {
              if (err)
                return reject(err);
              if (method == "evm_mine") {
                return resolve(result);
              } else {
                this._web3.currentProvider.send({
                  jsonrpc: "2.0",
                  method: "evm_mine",
                  params: [],
                  id: new Date().getTime()
                }, (err2, result2) => {
                  if (err2)
                    return reject(err2);
                  return resolve(result2);
                });
              }
            });
          });
        }
        increaseBlockTime(value) {
          return new Promise((resolve, reject) => {
            this._web3.currentProvider.send({
              jsonrpc: "2.0",
              method: "evm_increaseTime",
              params: [value],
              id: new Date().getTime()
            }, (err, result) => {
              this._web3.currentProvider.send({
                jsonrpc: "2.0",
                method: "evm_mine",
                params: [],
                id: new Date().getTime()
              }, (err2, result2) => {
                resolve(result2);
              });
            });
          });
        }
        signMessage(msg) {
          let _web3 = this._web3;
          let address = this.address;
          let self2 = this;
          return new Promise(async function(resolve, reject) {
            try {
              let result;
              if (self2._account && self2._account.privateKey || self2.kms) {
                if (self2.kms) {
                  result = await self2.kms.signMessage(self2.chainId, _web3.utils.stringToHex(msg));
                  resolve(result);
                } else {
                  result = await _web3.eth.accounts.sign(msg, self2._account.privateKey);
                  resolve(result.signature);
                }
              } else {
                result = await _web3.eth.sign(msg, address, null);
                resolve(result);
              }
            } catch (err) {
              reject(err);
            }
          });
        }
        token(tokenAddress, decimals) {
          return new Erc20(this, tokenAddress, decimals);
        }
        async tokenInfo(tokenAddress) {
          let erc20 = this.token(tokenAddress);
          return {
            decimals: await erc20.decimals,
            name: await erc20.name,
            symbol: await erc20.symbol,
            totalSupply: await erc20.totalSupply
          };
        }
        get utils() {
          return this._web3.utils;
        }
        verifyMessage(account, msg, signature) {
          let _web3 = this._web3;
          return new Promise(async function(resolve, reject) {
            try {
              let signing_address = await _web3.eth.accounts.recover(msg, signature);
              resolve(signing_address && account.toLowerCase() == signing_address.toLowerCase());
            } catch (err) {
              reject(err);
            }
            ;
          });
        }
        blockGasLimit() {
          return new Promise(async (resolve, reject) => {
            try {
              if (!this._gasLimit)
                this._gasLimit = (await this._web3.eth.getBlock("latest")).gasLimit;
              resolve(this._gasLimit);
            } catch (e) {
              reject(e);
            }
          });
        }
        getGasPrice() {
          return (async () => new import_bignumber4.BigNumber(await this._web3.eth.getGasPrice()))();
        }
        transactionCount() {
          return (async () => await this._web3.eth.getTransactionCount(this.address))();
        }
        async sendTransaction(transaction) {
          transaction.value = new import_bignumber4.BigNumber(transaction.value).toFixed();
          transaction.gasPrice = new import_bignumber4.BigNumber(transaction.gasPrice).toFixed();
          let currentProvider = this.provider;
          try {
            if (typeof window !== "undefined" && this.clientSideProvider) {
              this.provider = this.clientSideProvider.provider;
            }
            if (this._account && this._account.privateKey) {
              let signedTx = await this._web3.eth.accounts.signTransaction(transaction, this._account.privateKey);
              return await this._web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            } else if (this._account && this._account.kms) {
              let chainId = await this.getChainId();
              let signedTx = await this.kms.signTransaction(chainId, transaction);
              return await this._web3.eth.sendSignedTransaction(signedTx);
            } else {
              let promiEvent = this._web3.eth.sendTransaction(transaction);
              promiEvent.on("error", (error) => {
                if (error.message.startsWith("Transaction was not mined within 50 blocks")) {
                  return;
                }
                if (this._sendTxEventHandler.transactionHash)
                  this._sendTxEventHandler.transactionHash(error);
              });
              promiEvent.on("transactionHash", (receipt) => {
                if (this._sendTxEventHandler.transactionHash)
                  this._sendTxEventHandler.transactionHash(null, receipt);
              });
              promiEvent.on("confirmation", (confNumber, receipt) => {
                if (this._sendTxEventHandler.confirmation && confNumber == 1)
                  this._sendTxEventHandler.confirmation(receipt);
              });
              return await promiEvent;
            }
          } catch (err) {
          }
          this.provider = currentProvider;
          return null;
        }
        async getTransaction(transactionHash) {
          let web3Receipt = await this._web3.eth.getTransaction(transactionHash);
          return {
            from: web3Receipt.from,
            to: web3Receipt.to,
            nonce: web3Receipt.nonce,
            gas: web3Receipt.gas,
            gasPrice: web3Receipt.gasPrice,
            data: web3Receipt.input,
            value: web3Receipt.value
          };
        }
        getTransactionReceipt(transactionHash) {
          return this._web3.eth.getTransactionReceipt(transactionHash);
        }
        call(transaction) {
          transaction.value = new import_bignumber4.BigNumber(transaction.value).toFixed();
          transaction.gasPrice = new import_bignumber4.BigNumber(transaction.gasPrice).toFixed();
          return this._web3.eth.call(transaction);
        }
        newContract(abi, address) {
          return new this._web3.eth.Contract(abi, address);
        }
        decodeErrorMessage(msg) {
          return this._web3.eth.abi.decodeParameter("string", "0x" + msg.substring(10));
        }
        async newBatchRequest() {
          return new Promise((resolve, reject) => {
            try {
              resolve({
                batch: new this._web3.BatchRequest(),
                promises: [],
                execute: (batch, promises) => {
                  batch.execute();
                  return Promise.all(promises);
                }
              });
            } catch (e) {
              reject(e);
            }
          });
        }
        soliditySha3(...val) {
          return this._web3.utils.soliditySha3(...val);
        }
        get web3() {
          return this._web3;
        }
      };
      let Wallet3 = _Wallet2;
      Wallet3.instance = new _Wallet2();
      _Wallet.Wallet = Wallet3;
    })(Wallet2 || (Wallet2 = {}));
    module2.exports = Wallet2;
  }
});

// src/index.ts
__export(exports, {
  BigNumber: () => import_bignumber3.BigNumber,
  Contract: () => import_contract2.Contract,
  Erc20: () => Erc20,
  Event: () => import_wallet.Event,
  IAccount: () => import_wallet.IAccount,
  IBatchRequestObj: () => import_wallet.IBatchRequestObj,
  IClientProviderOptions: () => import_wallet.IClientProviderOptions,
  INetwork: () => import_wallet.INetwork,
  ISendTxEventsOptions: () => import_wallet.ISendTxEventsOptions,
  IWallet: () => import_wallet.IWallet,
  IWalletUtils: () => import_wallet.IWalletUtils,
  Transaction: () => import_wallet.Transaction,
  TransactionReceipt: () => import_wallet.TransactionReceipt,
  Utils: () => utils_exports,
  Wallet: () => import_wallet.Wallet,
  WalletPlugin: () => import_wallet.WalletPlugin,
  WalletPluginConfig: () => import_wallet.WalletPluginConfig
});
var import_wallet = __toModule(require_wallet());
var import_contract2 = __toModule(require_contract());
var import_bignumber3 = __toModule(require("bignumber.js"));
init_erc20();
init_utils();
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */
/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
/** @preserve
 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
 * derived from CryptoJS.mode.CTR
 * Jan Hruby jhruby.web@gmail.com
 */

});