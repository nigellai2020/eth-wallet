"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3 = void 0;
const eth = require('web3-eth');
const utils = require('web3-utils');
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
class Web3 {
    constructor(provider) {
        this.utils = utils;
        this.eth = new eth(provider);
    }
    get currentProvider() {
        return this.eth.currentProvider;
    }
    setProvider(provider) {
        return this.eth.setProvider(provider);
    }
}
exports.Web3 = Web3;
;
module.exports = Web3;
