/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
/// <reference types="node" />
export interface IWhitelistTreeData {
    account: string;
    [key: string]: any;
}
export interface IWhitelistTreeABIItem {
    name: string;
    type: string;
}
export interface MessageTypeProperty {
    name: string;
    type: string;
}
export declare type EIP712TypeMap = {
    [type: string]: MessageTypeProperty[];
};
export interface IEIP712Domain {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
}
export declare enum SignTypedDataVersion {
    V1 = "V1",
    V3 = "V3",
    V4 = "V4"
}
export interface MessageTypes {
    EIP712Domain: MessageTypeProperty[];
    [additionalProperties: string]: MessageTypeProperty[];
}
export interface TypedMessage<T extends MessageTypes> {
    types: T;
    primaryType: keyof T;
    domain: {
        name?: string;
        version?: string;
        chainId?: number;
        verifyingContract?: string;
        salt?: ArrayBuffer;
    };
    message: Record<string, unknown>;
}
export interface TransformableToArray {
    toArray(): Uint8Array;
    toBuffer?(): Buffer;
}
export interface TransformableToBuffer {
    toBuffer(): Buffer;
    toArray?(): Uint8Array;
}
export declare type NestedUint8Array = Array<Uint8Array | NestedUint8Array>;
export declare type NestedBufferArray = Array<Buffer | NestedBufferArray>;
export declare type PrefixedHexString = string;
export declare type ToBufferInputTypes = PrefixedHexString | number | bigint | Buffer | Uint8Array | number[] | TransformableToArray | TransformableToBuffer | null | undefined;
