"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeWallet = void 0;
const wallet_1 = require("./wallet");
class NodeWallet extends wallet_1.Wallet {
    set account(value) {
        super.account = value;
    }
    ;
    get address() {
        return super.address;
    }
    ;
    async methods(...args) {
    }
    ;
    set privateKey(value) {
        super.privateKey = value;
    }
    ;
}
exports.NodeWallet = NodeWallet;
