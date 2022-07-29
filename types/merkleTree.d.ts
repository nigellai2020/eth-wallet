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
