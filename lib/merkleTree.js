"use strict";
/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = require("bignumber.js");
class MerkleTree {
    constructor(wallet, leaves) {
        this.tree = [];
        this.tree.push(leaves);
        while (this.tree[this.tree.length - 1].length > 1) {
            let children = this.tree[this.tree.length - 1];
            let parent = [];
            for (let i = 0; i < children.length - 1; i += 2) {
                if (new bignumber_js_1.BigNumber(children[i]).lt(children[i + 1])) {
                    parent.push(wallet.soliditySha3("0x" + children[i].replace("0x", "") + children[i + 1].replace("0x", "")));
                }
                else {
                    parent.push(wallet.soliditySha3("0x" + children[i + 1].replace("0x", "") + children[i].replace("0x", "")));
                }
            }
            if (children.length % 2 == 1) {
                parent.push("0x" + children[children.length - 1].replace("0x", ""));
            }
            this.tree.push(parent);
        }
    }
    static create(wallet, leaves) {
        let tree = new this(wallet, leaves);
        return tree;
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
        let index = this.tree[0].indexOf(leaf);
        proof.push(this.tree[0][index % 2 == 0 ? (index + 1) : (index - 1)]);
        for (let i = 1; i < this.tree.length - 1; i++) {
            index = Math.floor(index / 2);
            proof.push(this.tree[i][index % 2 == 0 ? (index + 1) : (index - 1)]);
        }
        return proof;
    }
}
exports.default = MerkleTree;
