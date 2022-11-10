/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
import { Wallet } from "./wallet";
declare class MerkleTree {
    private tree;
    protected constructor(wallet: Wallet, leaves: string[]);
    static create(wallet: Wallet, leaves: string[]): MerkleTree;
    toString(): string;
    getHexRoot(): string;
    getHexProof(leaf: string): any[];
}
export default MerkleTree;
