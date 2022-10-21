"use strict";
/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMerkleLeavesData = exports.getMerkleProofs = exports.generateMerkleTree = exports.getSha3HashBufferFunc = void 0;
const merkleTree_1 = require("./merkleTree");
function getSha3HashBufferFunc(wallet, abi) {
    return (leafData) => {
        let encodePackedInput = abi.map((abiItem) => {
            return {
                t: abiItem.type,
                v: leafData[abiItem.name]
            };
        });
        let hex = wallet.soliditySha3.apply(wallet, encodePackedInput);
        return hex;
    };
}
exports.getSha3HashBufferFunc = getSha3HashBufferFunc;
function generateMerkleTree(wallet, options) {
    const merkleTree = new merkleTree_1.MerkleTree(wallet, options);
    return merkleTree;
}
exports.generateMerkleTree = generateMerkleTree;
function getMerkleProofs(wallet, tree, options) {
    let proofs = [];
    if (options.key) {
        proofs = tree.getHexProofsByKey(options.key);
    }
    else if (options.leafData) {
        let abi = tree.getABI();
        const hashFunc = getSha3HashBufferFunc(wallet, abi);
        let leaf = hashFunc(options.leafData);
        proofs.push(tree.getHexProof(leaf));
    }
    return proofs;
}
exports.getMerkleProofs = getMerkleProofs;
function getMerkleLeavesData(tree, options) {
    let data;
    if (options.key) {
        data = tree.getLeavesDataByKey(options.key);
    }
    else if (options.hash) {
        data.push(tree.getLeafData(options.hash));
    }
    return data;
}
exports.getMerkleLeavesData = getMerkleLeavesData;
