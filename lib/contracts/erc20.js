"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const contract_1 = require("../contract");
const bignumber_js_1 = require("bignumber.js");
const Utils = __importStar(require("../utils"));
const Abi = require('./bin/erc20').abi;
const Bytecode = require('./bin/erc20').bytecode;
var ERC20;
(function (ERC20) {
    class Erc20 extends contract_1.Contract {
        constructor(wallet, address, decimals) {
            super(wallet, address, Abi, Bytecode);
            this._decimals = decimals;
        }
        async deploy(params) {
            return this._deploy(params.name, params.symbol, params.minter || this.wallet.address, this.wallet.utils.toWei(params.cap ? params.cap.toString() : '1000000000'));
        }
        async allowance(params) {
            return Utils.fromDecimals(await this.methods('allowance', params.owner, params.spender), await this.decimals);
        }
        approve(params) {
            return new Promise(async (resolve, reject) => {
                try {
                    resolve(this.methods('approve', params.spender, await Utils.toDecimals(params.amount, await this.decimals)));
                }
                catch (err) {
                    reject(err);
                }
            });
        }
        get balance() {
            return this.balanceOf(this.wallet.address);
        }
        async balanceOf(address) {
            return new Promise(async (resolve, reject) => {
                try {
                    resolve(await Utils.fromDecimals(await this.methods('balanceOf', address), await this.decimals));
                }
                catch (err) {
                    reject(err);
                }
            });
        }
        get cap() {
            return new Promise(async (resolve, reject) => {
                try {
                    resolve(await Utils.fromDecimals(await this.methods('cap'), await this.decimals));
                }
                catch (err) {
                    reject(err);
                }
            });
        }
        get decimals() {
            return new Promise(async (resolve, reject) => {
                try {
                    if (!this._decimals)
                        this._decimals = new bignumber_js_1.BigNumber(await this.methods('decimals')).toNumber();
                    resolve(this._decimals);
                }
                catch (err) {
                    reject(err);
                }
            });
        }
        mint(params) {
            return new Promise(async (resolve, reject) => {
                try {
                    resolve(await this.methods('mint', params.address, await Utils.toDecimals(params.amount, await this.decimals)));
                }
                catch (err) {
                    reject(err);
                }
            });
        }
        async _mint(params) {
            return this._methods('mint', params.address, await Utils.toDecimals(params.amount, await this.decimals));
        }
        minter() {
            return this.methods('minter');
        }
        get name() {
            return this.methods('name');
        }
        get symbol() {
            return this.methods('symbol');
        }
        get totalSupply() {
            return new Promise(async (resolve, reject) => {
                try {
                    resolve(await Utils.fromDecimals(await this.methods('totalSupply'), await this.decimals));
                }
                catch (err) {
                    reject(err);
                }
            });
        }
        async transfer(params) {
            return this.methods('transfer', params.address, await Utils.toDecimals(params.amount, await this.decimals));
        }
        async _transfer(params) {
            return this._methods('transfer', params.address, await Utils.toDecimals(params.amount, await this.decimals));
        }
    }
    ERC20.Erc20 = Erc20;
    ;
})(ERC20 || (ERC20 = {}));
;
module.exports = ERC20;
