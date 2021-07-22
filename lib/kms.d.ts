/// <reference types="node" />
import * as AwsSDK from 'aws-sdk';
import BN from 'bn.js';
declare module KMS {
    class KMS {
        private _sdk;
        private _options;
        private _address;
        constructor(options: any);
        getEthereumAddress(publicKey: Buffer): string;
        sign(msgHash: any): Promise<import("aws-sdk/lib/request").PromiseResult<AwsSDK.KMS.SignResponse, AwsSDK.AWSError>>;
        findEthereumSig(plaintext: any): Promise<{
            r: BN;
            s: BN;
        }>;
        findRightKey(msg: Buffer, r: BN, s: BN, expectedEthAddr: string): {
            pubKey: string;
            v: number;
        };
        getPublicKey(): Promise<import("aws-sdk/lib/request").PromiseResult<AwsSDK.KMS.GetPublicKeyResponse, AwsSDK.AWSError>>;
        getAddress(): Promise<string>;
        signTransaction(chainId: number, txData: any): Promise<string>;
    }
}
export = KMS;
