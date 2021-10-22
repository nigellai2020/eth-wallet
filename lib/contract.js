"use strict";
const bignumber_js_1 = require("bignumber.js");
const Web3 = require('web3');
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
            let self = this;
            if (address)
                this._address = address;
        }
        at(address) {
            this._address = address;
            return this;
        }
        set address(value) {
            this._address = value;
        }
        get address() {
            return this._address || '';
        }
        decodeEvents(receipt) {
            let events = this.getAbiEvents();
            let result = [];
            for (let name in receipt.events) {
                let data = receipt.events[name].raw;
                let event = events[data.topics[0]];
                result.push(Object.assign({ _name: name }, this.web3.eth.abi.decodeLog(event.inputs, data.data, data.topics.slice(1))));
            }
            return result;
        }
        parseEvents(receipt, eventName) {
            let events = this.getAbiEvents();
            let result = [];
            let topic0 = this.getAbiTopics([eventName])[0];
            for (let name in receipt.events) {
                let data = receipt.events[name].raw;
                if (topic0 == data.topics[0]) {
                    let event = events[data.topics[0]];
                    result.push(Object.assign({ _name: name }, this.web3.eth.abi.decodeLog(event.inputs, data.data, data.topics.slice(1))));
                }
            }
            return result;
        }
        get events() {
            let result = [];
            for (let i = 0; i < this._abi.length; i++) {
                if (this._abi[i].type == 'event')
                    result.push(this._abi[i]);
            }
            return result;
        }
        methodsToUtf8(...args) {
            let self = this;
            return new Promise(async function (resolve, reject) {
                let result = await self.methods.apply(self, args);
                resolve(self.wallet.utils.toUtf8(result));
            });
        }
        methodsToUtf8Array(...args) {
            let self = this;
            return new Promise(async function (resolve, reject) {
                let result = await self.methods.apply(self, args);
                let arr = [];
                for (let i = 0; i < result.length; i++) {
                    arr.push(self.wallet.utils.toUtf8(result[i]));
                }
                resolve(arr);
            });
        }
        methodsFromWeiArray(...args) {
            let self = this;
            return new Promise(async function (resolve, reject) {
                let result = await self.methods.apply(self, args);
                let arr = [];
                for (let i = 0; i < result.length; i++) {
                    arr.push(new bignumber_js_1.BigNumber(self.wallet.utils.fromWei(result[i])));
                }
                resolve(arr);
            });
        }
        methodsFromWei(...args) {
            let self = this;
            return new Promise(async function (resolve, reject) {
                let result = await self.methods.apply(self, args);
                return resolve(new bignumber_js_1.BigNumber(self.wallet.utils.fromWei(result)));
            });
        }
        _methods(...args) {
            args.unshift(this._address);
            args.unshift(this._abi);
            return this.wallet._methods.apply(this.wallet, args);
        }
        methods(...args) {
            args.unshift(this._address);
            args.unshift(this._abi);
            return this.wallet.methods.apply(this.wallet, args);
        }
        getAbiTopics(eventNames) {
            return this.wallet.getAbiTopics(this._abi, eventNames);
        }
        getAbiEvents() {
            if (!this._events)
                this._events = this.wallet.getAbiEvents(this._abi);
            return this._events;
        }
        scanEvents(fromBlock, toBlock, eventNames) {
            let topics = this.getAbiTopics(eventNames);
            let events = this.getAbiEvents();
            return this.wallet.scanEvents(fromBlock, toBlock, topics, events, this._address);
        }
        ;
        async _deploy(...args) {
            if (typeof (args[args.length - 1]) == 'undefined')
                args.pop();
            args.unshift(this._bytecode);
            args.unshift('deploy');
            args.unshift(null);
            args.unshift(this._abi);
            this._address = await this.wallet.methods.apply(this.wallet, args);
            return this._address;
        }
        get web3() {
            return this.wallet.web3;
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
