"use strict";
const bignumber_js_1 = require("bignumber.js");
var Contract;
(function (Contract_1) {
    class Contract {
        constructor(wallet, address, abi, bytecode) {
            this.wallet = wallet;
            if (typeof (abi) == 'string')
                this._abi = JSON.parse(abi);
            else
                this._abi = abi;
            this._bytecode = bytecode;
            var self = this;
            if (address)
                this._address = address;
        }
        at(address) {
            this._address = address;
            return this;
        }
        get address() {
            return this._address || '';
        }
        get events() {
            let result = [];
            for (var i = 0; i < this._abi.length; i++) {
                if (this._abi[i].type == 'event')
                    result.push(this._abi[i]);
            }
            return result;
        }
        methodsToUtf8(...args) {
            var self = this;
            return new Promise(async function (resolve, reject) {
                let result = await self.methods.apply(self, args);
                resolve(self.wallet.utils.toUtf8(result));
            });
        }
        methodsToUtf8Array(...args) {
            var self = this;
            return new Promise(async function (resolve, reject) {
                let result = await self.methods.apply(self, args);
                var arr = [];
                for (var i = 0; i < result.length; i++) {
                    arr.push(self.wallet.utils.toUtf8(result[i]));
                }
                resolve(arr);
            });
        }
        methodsFromWeiArray(...args) {
            var self = this;
            return new Promise(async function (resolve, reject) {
                let result = await self.methods.apply(self, args);
                var arr = [];
                for (var i = 0; i < result.length; i++) {
                    arr.push(new bignumber_js_1.BigNumber(self.wallet.utils.fromWei(result[i])));
                }
                resolve(arr);
            });
        }
        methodsFromWei(...args) {
            var self = this;
            return new Promise(async function (resolve, reject) {
                let result = await self.methods.apply(self, args);
                return resolve(new bignumber_js_1.BigNumber(self.wallet.utils.fromWei(result)));
            });
        }
        methods(...args) {
            args.unshift(this._address);
            args.unshift(this._abi);
            return this.wallet.methods.apply(this.wallet, args);
        }
        scanEvents(fromBlock, toBlock, eventNames) {
            return this.wallet.scanEvents(this._abi, this._address, fromBlock, toBlock, eventNames);
        }
        ;
        _deploy(...args) {
            if (typeof (args[args.length - 1]) == 'undefined')
                args.pop();
            args.unshift(this._bytecode);
            args.unshift('deploy');
            args.unshift(null);
            args.unshift(this._abi);
            return this.wallet.methods.apply(this.wallet, args);
        }
    }
    Contract_1.Contract = Contract;
    class TAuthContract extends Contract {
        rely(address) {
            return this.methods('rely', address);
        }
        deny(address) {
            return this.methods('deny', address);
        }
    }
    Contract_1.TAuthContract = TAuthContract;
})(Contract || (Contract = {}));
module.exports = Contract;
