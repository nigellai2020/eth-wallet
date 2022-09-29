/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
import { Wallet } from "./wallet";
import { IMerkleTreeAbiItem } from "./types";
export declare class MerkleTree {
    private tree;
    private leavesMap;
    private abi;
    private nodeInfoMap;
    constructor(wallet: Wallet, leavesMap: Record<string, string>, abi: IMerkleTreeAbiItem[]);
    toString(): string;
    getHexRoot(): string;
    getHexProofByKey(key: string): any[];
    getHexProof(leaf: string): any[];
    getABI(): IMerkleTreeAbiItem[];
}
