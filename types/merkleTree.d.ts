/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
import { Wallet } from "./wallet";
import { IMerkleTreeAbiItem } from "./types";
export interface IMerkleTreeOptions {
    leavesData: Record<string, any>[];
    abi: IMerkleTreeAbiItem[];
    abiKeyName?: string;
    getCustomKey?: (leafData: Record<string, any>) => string;
}
export interface IGetMerkleProofOptions {
    leafData?: Record<string, any>;
    key?: string;
}
export interface IGetMerkleLeafDataOptions {
    key?: string;
    hash?: string;
}
export declare class MerkleTree {
    private tree;
    leavesData: Record<string, any>;
    private leavesKeyHashMap;
    private leavesHashDataMap;
    private abi;
    private nodeInfoMap;
    constructor(wallet: Wallet, options: IMerkleTreeOptions);
    toString(): string;
    getHexRoot(): string;
    getHexProofByKey(key: string): any[];
    getHexProof(leaf: string): any[];
    getABI(): IMerkleTreeAbiItem[];
    getLeafDataByKey(key: string): Record<string, any>;
    getLeafData(leaf: string): Record<string, any>;
}
