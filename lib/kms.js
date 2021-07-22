"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const AwsSDK = __importStar(require("aws-sdk"));
const asn1 = __importStar(require("asn1.js"));
const bn_js_1 = __importDefault(require("bn.js"));
const ethutil = __importStar(require("ethereumjs-util"));
const ethereumjs_tx_1 = require("ethereumjs-tx");
const keccak256 = require('./sha3').keccak256;
var KMS;
(function (KMS_1) {
    const EcdsaSigAsnParse = asn1.define('EcdsaSig', function () {
        this.seq().obj(this.key('r').int(), this.key('s').int());
    });
    const EcdsaPubKey = asn1.define('EcdsaPubKey', function () {
        this.seq().obj(this.key('algo').seq().obj(this.key('a').objid(), this.key('b').objid()), this.key('pubKey').bitstr());
    });
    function recoverPubKeyFromSig(msg, r, s, v) {
        let rBuffer = r.toBuffer();
        let sBuffer = s.toBuffer();
        let pubKey = ethutil.ecrecover(msg, v, rBuffer, sBuffer);
        let addrBuf = ethutil.pubToAddress(pubKey);
        let recoveredEthAddr = ethutil.bufferToHex(addrBuf);
        return recoveredEthAddr;
    }
    class KMS {
        constructor(options) {
            this._options = options;
            this._sdk = new AwsSDK.KMS(options);
        }
        getEthereumAddress(publicKey) {
            let res = EcdsaPubKey.decode(publicKey, 'der');
            let pubKeyBuffer = res.pubKey.data;
            pubKeyBuffer = pubKeyBuffer.slice(1, pubKeyBuffer.length);
            const address = keccak256(pubKeyBuffer);
            const buf2 = Buffer.from(address, 'hex');
            const ethAddr = "0x" + buf2.slice(-20).toString('hex');
            return ethAddr;
        }
        async sign(msgHash) {
            const params = {
                KeyId: this._options.keyId,
                Message: msgHash,
                SigningAlgorithm: 'ECDSA_SHA_256',
                MessageType: 'DIGEST'
            };
            const res = await this._sdk.sign(params).promise();
            return res;
        }
        async findEthereumSig(plaintext) {
            console.dir(plaintext);
            let signature = await this.sign(plaintext);
            if (signature.Signature == undefined) {
                throw new Error('Signature is undefined.');
            }
            console.dir(signature.Signature);
            let decoded = EcdsaSigAsnParse.decode(signature.Signature, 'der');
            let r = new bn_js_1.default(decoded.r);
            let s = new bn_js_1.default(decoded.s);
            console.dir(s.gt);
            let secp256k1N = new bn_js_1.default("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", 16);
            let secp256k1halfN = secp256k1N.div(new bn_js_1.default(2));
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
            const tx = new ethereumjs_tx_1.Transaction(txData, {
                chain: chainId,
            });
            let txHash = tx.hash(false);
            let sig = await this.findEthereumSig(txHash);
            let address = await this.getAddress();
            let recoveredPubAddr = this.findRightKey(txHash, sig.r, sig.s, address);
            tx.r = sig.r.toBuffer();
            tx.s = sig.s.toBuffer();
            tx.v = new bn_js_1.default(recoveredPubAddr.v + (chainId > 1 ? (8 + chainId * 2) : 0)).toBuffer();
            const serializedTx = tx.serialize().toString('hex');
            return '0x' + serializedTx;
        }
    }
    KMS_1.KMS = KMS;
})(KMS || (KMS = {}));
module.exports = KMS;
