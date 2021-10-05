import * as AwsSDK from 'aws-sdk';
import * as asn1 from 'asn1.js';
import BN from 'bn.js';
import * as ethutil from 'ethereumjs-util';
import { Transaction, TxData } from 'ethereumjs-tx';
// const keccak256 = require('./sha3').keccak256;

module KMS {
    const EcdsaSigAsnParse = asn1.define('EcdsaSig', function(this: any) {
        this.seq().obj(
            this.key('r').int(),
            this.key('s').int(),
        );
    });    
    const EcdsaPubKey = asn1.define('EcdsaPubKey', function(this: any) {
        this.seq().obj(
            this.key('algo').seq().obj(
                this.key('a').objid(),
                this.key('b').objid(),
            ),
            this.key('pubKey').bitstr()
        );
    });
    function recoverPubKeyFromSig(msg: Buffer, r : BN, s : BN, v: number) {
        let rBuffer = r.toBuffer();
        let sBuffer = s.toBuffer();
        let pubKey = ethutil.ecrecover(msg, v, rBuffer, sBuffer);
        let addrBuf = ethutil.pubToAddress(pubKey);
        let recoveredEthAddr = ethutil.bufferToHex(addrBuf);
        return recoveredEthAddr;
    }
    export class KMS {
        private _sdk: AwsSDK.KMS;
        private _options: any;
        private _address: string;

        constructor(options){
            this._options = options;
            this._sdk = new AwsSDK.KMS(options);
        }        
        getEthereumAddress(publicKey: Buffer): string {
            let res = EcdsaPubKey.decode(publicKey, 'der');
            let pubKeyBuffer : Buffer = res.pubKey.data;
        
            pubKeyBuffer = pubKeyBuffer.slice(1, pubKeyBuffer.length);
        
            // const address = keccak256(pubKeyBuffer);                        
            // const buf2 = Buffer.from(address, 'hex');
            // const ethAddr = "0x" + buf2.slice(-20).toString('hex');
            // return ethAddr;
            
            let buf = ethutil.keccak256(pubKeyBuffer);            
            return "0x" + buf.slice(-20).toString('hex');
        }
        async sign(msgHash: any) {            
            const params = {
                // key id or 'Alias/<alias>'
                KeyId: this._options.keyId,
                Message: msgHash,
                SigningAlgorithm: 'ECDSA_SHA_256',
                MessageType: 'DIGEST'
            };
            return await this._sdk.sign(params).promise();
        }
        async signMessage(chainId: number, message: string){            
            let hash = ethutil.hashPersonalMessage(ethutil.toBuffer(message)); 
            let sig = await this.findEthereumSig(hash);
            let address = await this.getAddress();
            let recoveredPubAddr = this.findRightKey(hash, sig.r, sig.s, address);
            let r = sig.r.toBuffer();
            let s = sig.s.toBuffer();
            let v = new BN(recoveredPubAddr.v + (chainId > 1 ? (8 + chainId * 2) : 0)).toBuffer();
            return '0x' + Buffer.concat([r,s,v]).toString('hex');
        }
        async findEthereumSig(plaintext: any) {
            let signature = await this.sign(plaintext);
            if (signature.Signature == undefined) {
                throw new Error('Signature is undefined.');
            }            
            let decoded = EcdsaSigAsnParse.decode(signature.Signature, 'der');
            let r: BN = decoded.r;
            let s: BN = decoded.s;  
            
            let secp256k1N = new BN("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", 16); // max value on the curve
            let secp256k1halfN = secp256k1N.div(new BN(2)); // half of the curve
            // Because of EIP-2 not all elliptic curve signatures are accepted
            // the value of s needs to be SMALLER than half of the curve
            // i.e. we need to flip s if it's greater than half of the curve
            if (s.gt(secp256k1halfN)) {
                s = secp256k1N.sub(s);
            }
            return { r, s }
        }
        findRightKey(msg: Buffer, r : BN, s: BN, expectedEthAddr: string) {
            // This is the wrapper function to find the right v value
            // There are two matching signatues on the elliptic curve
            // we need to find the one that matches to our public key
            // it can be v = 27 or v = 28
            let v = 27;
            let pubKey = recoverPubKeyFromSig(msg, r, s, v);
            if (pubKey != expectedEthAddr) {
                // if the pub key for v = 27 does not match
                // it has to be v = 28
                v = 28;
                pubKey = recoverPubKeyFromSig(msg, r, s, v)
            }
            return { pubKey, v };
        }
        async getPublicKey() {
            return this._sdk.getPublicKey({
                KeyId: this._options.keyId
            }).promise();
        }
        async getAddress(): Promise<string>{
            if (!this._address){
                let pubKey = await this.getPublicKey();                
                this._address = this.getEthereumAddress(pubKey.PublicKey as Buffer);
            }
            return this._address;
        }
        async signTransaction(chainId: number, txData: any){
            const tx = new Transaction(txData, {
                chain: chainId,
            });
        
            let txHash = tx.hash(false);
            let sig = await this.findEthereumSig(txHash);
            let address = await this.getAddress();
            let recoveredPubAddr = this.findRightKey(txHash, sig.r, sig.s, address);
            tx.r = sig.r.toBuffer();
            tx.s = sig.s.toBuffer();
            tx.v = new BN(recoveredPubAddr.v + (chainId > 1 ? (8 + chainId * 2) : 0)).toBuffer();
        
            // Send signed tx to ethereum network
            const serializedTx = tx.serialize().toString('hex');
            return '0x' + serializedTx;
        }
    }
}
export = KMS;