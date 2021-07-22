"use strict";
const contract_1 = require("../contract");
const bignumber_js_1 = require("bignumber.js");
const ABI = require('./erc20_abi').abi;
var ERC20;
(function (ERC20_1) {
    class ERC20 extends contract_1.Contract {
        constructor(wallet, address) {
            super(wallet, address, ABI);
        }
        get balance() {
            return this.balanceOf(this.wallet.address);
        }
        async balanceOf(address) {
            let self = this;
            return new Promise(async function (resolve, reject) {
                try {
                    let decimals = await self.decimals;
                    let balance = new bignumber_js_1.BigNumber(await self.methods('balanceOf', address));
                    let base = new bignumber_js_1.BigNumber(10).pow(decimals);
                    resolve(balance.div(base));
                }
                catch (err) {
                    reject(err);
                }
            });
        }
        get decimals() {
            let self = this;
            return new Promise(async function (resolve, reject) {
                try {
                    if (!self._decimals)
                        self._decimals = new bignumber_js_1.BigNumber(await self.methods('decimals'));
                    resolve(self._decimals.toNumber());
                }
                catch (err) {
                    reject(err);
                }
            });
        }
        get name() {
            return this.methods('name');
        }
        get symbol() {
            return this.methods('symbol');
        }
        get totalSupply() {
            let self = this;
            return new Promise(async function (resolve, reject) {
                try {
                    let decimals = await self.decimals;
                    let balance = new bignumber_js_1.BigNumber(await self.methods('totalSupply'));
                    let base = new bignumber_js_1.BigNumber(10).pow(decimals);
                    resolve(balance.div(base));
                }
                catch (err) {
                    reject(err);
                }
            });
        }
        async transfer(address, amount) {
            let decimals = await this.decimals;
            let base = new bignumber_js_1.BigNumber(10).pow(decimals);
            amount = new bignumber_js_1.BigNumber(amount).multipliedBy(base);
            return this.methods('transfer', address, amount);
        }
    }
    ERC20_1.ERC20 = ERC20;
    ;
})(ERC20 || (ERC20 = {}));
;
module.exports = ERC20;
