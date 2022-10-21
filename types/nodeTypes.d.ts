/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
/// <reference types="node" />
export interface IMerkleTreeAbiItem {
    name: string;
    type: string;
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
