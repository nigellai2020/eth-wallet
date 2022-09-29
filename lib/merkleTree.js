"use strict";
/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerkleTree = void 0;
const bignumber_js_1 = require("bignumber.js");
class MerkleTree {
    constructor(wallet, leaves, abi) {
        this.tree = [];
        this.nodeInfoMap = {};
        this.abi = abi;
        this.tree.push(leaves);
        while (this.tree[this.tree.length - 1].length > 1) {
            let layer = this.tree.length - 1;
            let children = this.tree[layer];
            let parent = [];
            this.nodeInfoMap[layer] = {};
            for (let i = 0; i < children.length - 1; i += 2) {
                let parentHash;
                let firstChild = children[i];
                let secondChild = children[i + 1];
                if (new bignumber_js_1.BigNumber(firstChild).lt(secondChild)) {
                    parentHash = wallet.soliditySha3("0x" + firstChild.replace("0x", "") + secondChild.replace("0x", ""));
                }
                else {
                    parentHash = wallet.soliditySha3("0x" + secondChild.replace("0x", "") + firstChild.replace("0x", ""));
                }
                parent.push(parentHash);
                this.nodeInfoMap[layer][firstChild] = {
                    parent: parentHash,
                    sibling: secondChild
                };
                this.nodeInfoMap[layer][secondChild] = {
                    parent: parentHash,
                    sibling: firstChild
                };
            }
            if (children.length % 2 == 1) {
                let child = children[children.length - 1];
                let parentHash = "0x" + child.replace("0x", "");
                parent.push(parentHash);
                this.nodeInfoMap[layer][child] = {
                    parent: parentHash
                };
            }
            this.tree.push(parent);
        }
    }
    toString() {
        let arr = [];
        for (let i = this.tree.length - 1; i >= 0; i--) {
            arr.push(this.tree[i].join(','));
        }
        return arr.join(',');
    }
    getHexRoot() {
        return this.tree[this.tree.length - 1][0];
    }
    getHexProof(leaf) {
        let proof = [];
        if (this.tree.length == 1)
            return proof;
        let leafInfo = this.nodeInfoMap[0][leaf];
        if (leafInfo.sibling) {
            proof.push(leafInfo.sibling);
        }
        let parentHash = leafInfo.parent;
        for (let i = 1; i < this.tree.length - 1; i++) {
            if (parentHash == this.getHexRoot())
                break;
            let leafInfo = this.nodeInfoMap[i][parentHash];
            if (leafInfo.sibling) {
                proof.push(leafInfo.sibling);
            }
            parentHash = leafInfo.parent;
        }
        return proof;
    }
    getABI() {
        return this.abi;
    }
}
exports.MerkleTree = MerkleTree;
