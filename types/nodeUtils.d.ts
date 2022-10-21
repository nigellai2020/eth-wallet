/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
import { Wallet } from "./wallet";
import { IGetMerkleLeafDataOptions, IGetMerkleProofOptions, IMerkleTreeOptions, MerkleTree } from './merkleTree';
import { IMerkleTreeAbiItem } from './nodeTypes';
export declare function getSha3HashBufferFunc(wallet: Wallet, abi: IMerkleTreeAbiItem[]): (leafData: Record<string, any>) => string;
export declare function generateMerkleTree(wallet: Wallet, options: IMerkleTreeOptions): MerkleTree;
export declare function getMerkleProofs(wallet: Wallet, tree: MerkleTree, options: IGetMerkleProofOptions): string[][];
export declare function getMerkleLeavesData(tree: MerkleTree, options: IGetMerkleLeafDataOptions): Record<string, any>[];
