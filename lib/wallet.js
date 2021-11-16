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
const W3 = __importStar(require("web3"));
const Web3 = require('web3');
const bignumber_js_1 = require("bignumber.js");
const erc20_1 = require("./contracts/erc20");
const kms_1 = require("./kms");
var Wallet;
(function (Wallet_1) {
    Wallet_1.Networks = {
        1: {
            chainId: 1,
            chainName: "Mainnet"
        },
        3: {
            chainId: 3,
            chainName: "Ropsten"
        },
        4: {
            chainId: 4,
            chainName: "Rinkeby"
        },
        42: {
            chainId: 42,
            chainName: "Kovan"
        },
        56: {
            chainId: '56',
            chainName: 'Binance Mainnet',
            rpcUrls: ['https://bsc-dataseed.binance.org'],
            blockExplorerUrls: ['https://bscscan.com'],
            nativeCurrency: {
                decimals: 18,
                name: 'BNB',
                symbol: 'BNB'
            }
        },
        97: {
            chainId: '97',
            chainName: 'Binance Testnet',
            rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
            blockExplorerUrls: ['https://testnet.bscscan.com'],
            nativeCurrency: {
                decimals: 18,
                name: 'BNB',
                symbol: 'BNB'
            }
        },
        1287: {
            chainId: '1287',
            chainName: 'Moonbeam Testnet',
            rpcUrls: ['https://rpc.testnet.moonbeam.network'],
            blockExplorerUrls: ['https://moonbase-blockscout.testnet.moonbeam.network'],
            nativeCurrency: {
                decimals: 18,
                name: 'MOON',
                symbol: 'MOON'
            }
        }
    };
    const WalletUtils = {
        fromWei(value) {
            return new bignumber_js_1.BigNumber(W3.default.utils.fromWei(value));
        }
    };
    class Wallet {
        constructor(provider, account) {
            this._abiHashDict = {};
            this._abiAddressDict = {};
            this._abiEventDict = {};
            this._eventHandler = {};
            this._contracts = {};
            this._provider = provider;
            this._web3 = new Web3(provider);
            if (Array.isArray(account)) {
                this._accounts = account;
                this._account = account[0];
            }
            else
                this._account = account;
            if (this._account && this._account.privateKey && !this._account.address)
                this._account.address = this._web3.eth.accounts.privateKeyToAccount(this._account.privateKey).address;
        }
        get accounts() {
            return new Promise((resolve) => {
                if (this._accounts) {
                    let result = [];
                    for (let i = 0; i < this._accounts.length; i++) {
                        if (!this._accounts[i].address && this._accounts[i].privateKey)
                            this._accounts[i].address = this._web3.eth.accounts.privateKeyToAccount(this._accounts[i].privateKey).address;
                        result.push(this._accounts[i].address);
                    }
                    return resolve(result);
                }
                else if (this._account)
                    return resolve([this._account.address]);
                resolve(this._web3.eth.getAccounts());
            });
        }
        get address() {
            if (this._account && this._account.privateKey) {
                if (!this._account.address)
                    this._account.address = this._web3.eth.accounts.privateKeyToAccount(this._account.privateKey).address;
                return this._account.address;
            }
            else if (this._kms && this._account) {
                return this._account.address;
            }
            else if (this._web3.eth.defaultAccount) {
                return this._web3.eth.defaultAccount;
            }
            if (!this._account) {
                this._account = this.createAccount();
                return this._account.address;
            }
            else
                return this._account.address;
        }
        get account() {
            return {
                address: this.address
            };
        }
        set account(value) {
            this._kms = null;
            this._web3.eth.defaultAccount = '';
            this._account = value;
        }
        createAccount() {
            let acc = this._web3.eth.accounts.create();
            return {
                address: acc.address,
                privateKey: acc.privateKey
            };
        }
        ;
        get defaultAccount() {
            if (this._account)
                return this._account.address;
            return this._web3.eth.defaultAccount;
        }
        set defaultAccount(address) {
            if (this._accounts) {
                for (let i = 0; i < this._accounts.length; i++) {
                    if (!this._accounts[i].address && this._accounts[i].privateKey)
                        this._accounts[i].address = this._web3.eth.accounts.privateKeyToAccount(this._accounts[i].privateKey).address;
                    if (this._accounts[i].address && this._accounts[i].address.toLowerCase() == address.toLowerCase()) {
                        this._account = this._accounts[i];
                        return;
                    }
                }
            }
            else if (this._account && this._account.address && this._account.address.toLowerCase() == address.toLowerCase()) {
                return;
            }
            else
                this._web3.eth.defaultAccount = address;
        }
        async getChainId() {
            if (!this.chainId)
                this.chainId = await this._web3.eth.getChainId();
            return this.chainId;
        }
        get provider() {
            return this._provider;
        }
        sendSignedTransaction(tx) {
            let _web3 = this._web3;
            return _web3.eth.sendSignedTransaction(tx);
        }
        async signTransaction(tx, privateKey) {
            let _web3 = this._web3;
            let gas = tx.gas || await _web3.eth.estimateGas({
                from: this.address,
                to: tx.to,
                data: tx.data,
            });
            let gasLimit = tx.gasLimit || gas;
            let nonce = tx.nonce || await _web3.eth.getTransactionCount(this.address);
            if (privateKey || (this._account && this._account.privateKey)) {
                let signedTx = await _web3.eth.accounts.signTransaction({
                    nonce: nonce,
                    gas: gas,
                    gasLimit: gasLimit,
                    data: tx.data,
                    from: this.address,
                    to: tx.to
                }, privateKey ? privateKey : this._account.privateKey);
                return signedTx.rawTransaction;
            }
            else if (this._account && this._account.kms) {
                let chainId = await this.getChainId();
                let txHash = await this.kms.signTransaction(chainId, {
                    from: this.address,
                    nonce: nonce,
                    gasLimit: gas,
                    gas: gas,
                    to: tx.to,
                    data: tx.data
                });
                return txHash;
            }
            else {
                let t = await _web3.eth.signTransaction({
                    from: this.address,
                    nonce: nonce,
                    gasLimit: gasLimit,
                    gas: gas,
                    to: tx.to,
                    data: tx.data
                }, this.address);
                return t.raw;
            }
        }
        async _methods(...args) {
            let _web3 = this._web3;
            let result;
            let value;
            let method;
            let methodAbi;
            let byteCode;
            let abi = args.shift();
            let address = args.shift();
            let methodName = args.shift();
            if (methodName == 'deploy')
                byteCode = args.shift();
            let contract;
            let hash;
            if (this._contracts[address])
                contract = this._contracts[address];
            else {
                hash = this._web3.utils.sha3(JSON.stringify(abi));
                if (this._contracts[hash]) {
                    contract = this._contracts[hash];
                }
            }
            if (!contract) {
                contract = new this._web3.eth.Contract(abi);
                this._contracts[address] = contract;
                this._contracts[hash] = contract;
            }
            if (methodName == 'deploy') {
                method = contract[methodName]({
                    data: byteCode,
                    arguments: args
                });
            }
            else {
                for (let i = 0; i < abi.length; i++) {
                    if (abi[i].name == methodName) {
                        methodAbi = abi[i];
                        break;
                    }
                }
                if (methodAbi.payable)
                    value = args.pop();
                for (let i = 0; i < methodAbi.inputs.length; i++) {
                    if (methodAbi.inputs[i].type.indexOf('bytes') == 0) {
                        args[i] = args[i] || '';
                        if (methodAbi.inputs[i].type.indexOf('[]') > 0) {
                            let a = [];
                            for (let k = 0; k < args[i].length; k++) {
                                let s = args[i][k] || '';
                                if (s.indexOf('0x') != 0)
                                    a.push(_web3.utils.fromAscii(s));
                                else
                                    a.push(s);
                            }
                            args[i] = a;
                        }
                        else if (args[i].indexOf('0x') != 0)
                            args[i] = _web3.utils.fromAscii(args[i]);
                    }
                    else if (methodAbi.inputs[i].type == 'address') {
                        if (!args[i])
                            args[i] = _web3.eth.abi.encodeParameter('address', 0);
                    }
                }
                method = contract.methods[methodName].apply(contract, args);
            }
            let tx = {
                to: address,
                data: method.encodeABI(),
            };
            return tx;
        }
        async methods(...args) {
            let _web3 = this._web3;
            if (_web3.methods) {
                return _web3.methods.apply(_web3, args);
            }
            else {
                let result;
                let value;
                let method;
                let methodAbi;
                let byteCode;
                let abi = args.shift();
                let address = args.shift();
                let methodName = args.shift();
                if (methodName == 'deploy')
                    byteCode = args.shift();
                let contract;
                let hash;
                if (address && this._contracts[address])
                    contract = this._contracts[address];
                else {
                    hash = this._web3.utils.sha3(JSON.stringify(abi));
                    if (this._contracts[hash]) {
                        contract = this._contracts[hash];
                    }
                }
                ;
                if (!contract) {
                    contract = new this._web3.eth.Contract(abi);
                    if (address)
                        this._contracts[address] = contract;
                    this._contracts[hash] = contract;
                }
                ;
                if (methodName == 'deploy') {
                    method = contract[methodName]({
                        data: byteCode,
                        arguments: args
                    });
                }
                else {
                    for (let i = 0; i < abi.length; i++) {
                        if (abi[i].name == methodName) {
                            methodAbi = abi[i];
                            break;
                        }
                    }
                    if (methodAbi.payable)
                        value = args.pop();
                    for (let i = 0; i < methodAbi.inputs.length; i++) {
                        if (methodAbi.inputs[i].type.indexOf('bytes') == 0) {
                            args[i] = args[i] || '';
                            if (methodAbi.inputs[i].type.indexOf('[]') > 0) {
                                let a = [];
                                for (let k = 0; k < args[i].length; k++) {
                                    let s = args[i][k] || '';
                                    if (s.indexOf('0x') != 0)
                                        a.push(_web3.utils.fromAscii(s));
                                    else
                                        a.push(s);
                                }
                                args[i] = a;
                            }
                            else if (args[i].indexOf('0x') != 0)
                                args[i] = _web3.utils.fromAscii(args[i]);
                        }
                        else if (methodAbi.inputs[i].type == 'address') {
                            if (!args[i])
                                args[i] = _web3.eth.abi.encodeParameter('address', 0);
                        }
                    }
                    method = contract.methods[methodName].apply(contract, args);
                }
                ;
                contract.options.address = address;
                if (methodAbi && methodAbi.constant || (methodAbi.stateMutability == 'view')) {
                    return method.call({ from: this.address });
                }
                if (!this._blockGasLimit) {
                    this._blockGasLimit = (await _web3.eth.getBlock('latest')).gasLimit;
                }
                let gas;
                try {
                    gas = await method.estimateGas({ from: this.address, to: address, value: value });
                    gas = Math.min(this._blockGasLimit, Math.round(gas * 1.5));
                }
                catch (e) {
                    if (e.message == "Returned error: out of gas") {
                        console.log(e.message);
                        gas = Math.round(this._blockGasLimit * 0.5);
                    }
                    else {
                        throw e;
                    }
                }
                let gasPrice = await _web3.eth.getGasPrice();
                if (this._account && this._account.privateKey) {
                    let tx = {
                        gas: gas,
                        gasPrice: gasPrice,
                        data: method.encodeABI(),
                        from: this.address,
                        to: address,
                        value: value
                    };
                    let signedTx = await _web3.eth.accounts.signTransaction(tx, this._account.privateKey);
                    result = await _web3.eth.sendSignedTransaction(signedTx.rawTransaction);
                    if (methodName == 'deploy')
                        return result.contractAddress;
                    return result;
                }
                else if (this._account && this._account.kms) {
                    let nonce = await _web3.eth.getTransactionCount(this.address);
                    let price = _web3.utils.numberToHex(await _web3.eth.getGasPrice());
                    let tx = {
                        from: this.address,
                        nonce: nonce,
                        gasPrice: price,
                        gasLimit: gas,
                        gas: gas,
                        to: address,
                        data: method.encodeABI(),
                    };
                    let chainId = await this.getChainId();
                    let txHash = await this.kms.signTransaction(chainId, tx);
                    result = await _web3.eth.sendSignedTransaction(txHash);
                    if (methodName == 'deploy')
                        return result.contractAddress;
                    return result;
                }
                else {
                    contract.options.address = address;
                    result = await method.send({
                        from: this.address,
                        to: address,
                        gas: gas,
                        value: value
                    });
                    if (methodName == 'deploy')
                        return result.options.address;
                    return result;
                }
            }
        }
        get balance() {
            let self = this;
            let _web3 = this._web3;
            return new Promise(async function (resolve) {
                try {
                    let network = Wallet_1.Networks[self.chainId];
                    let decimals = 18;
                    if (network && network.nativeCurrency && network.nativeCurrency.decimals)
                        decimals = network.nativeCurrency.decimals;
                    let result = await _web3.eth.getBalance(self.address);
                    resolve(new bignumber_js_1.BigNumber(result).div(10 ** decimals));
                }
                catch (err) {
                    resolve(new bignumber_js_1.BigNumber(0));
                }
            });
        }
        balanceOf(address) {
            let self = this;
            let _web3 = this._web3;
            return new Promise(async function (resolve) {
                try {
                    let network = Wallet_1.Networks[self.chainId];
                    let decimals = 18;
                    if (network && network.nativeCurrency && network.nativeCurrency.decimals)
                        decimals = network.nativeCurrency.decimals;
                    let result = await _web3.eth.getBalance(address);
                    resolve(new bignumber_js_1.BigNumber(result).div(10 ** decimals));
                }
                catch (err) {
                    resolve(new bignumber_js_1.BigNumber(0));
                }
            });
        }
        recoverSigner(msg, signature) {
            let _web3 = this._web3;
            return new Promise(async function (resolve, reject) {
                try {
                    let signing_address = await _web3.eth.accounts.recover(msg, signature);
                    resolve(signing_address);
                }
                catch (err) {
                    reject(err);
                }
                ;
            });
        }
        ;
        getBlock(blockHashOrBlockNumber, returnTransactionObjects) {
            return this._web3.eth.getBlock(blockHashOrBlockNumber || 'latest', returnTransactionObjects);
        }
        ;
        getBlockNumber() {
            return this._web3.eth.getBlockNumber();
        }
        ;
        async getBlockTimestamp(blockHashOrBlockNumber) {
            let block = await this._web3.eth.getBlock(blockHashOrBlockNumber || 'latest', false);
            if (typeof (block.timestamp) == 'string')
                return parseInt(block.timestamp);
            else
                return block.timestamp;
        }
        ;
        async initKMS(value) {
            value = value || this._account.kms;
            if (value) {
                this._kms = new kms_1.KMS(value);
                this._account = {
                    address: await this._kms.getAddress(),
                    kms: value
                };
            }
        }
        get kms() {
            if (this._account && !this._kms && this._account.kms)
                this._kms = new kms_1.KMS(this._account.kms);
            return this._kms;
        }
        set privateKey(value) {
            if (value) {
                this._kms = null;
                this._web3.eth.defaultAccount = '';
            }
            this._account = {
                address: '',
                privateKey: value
            };
        }
        getAbiEvents(abi) {
            let _web3 = this._web3;
            let events = abi.filter(e => e.type == "event");
            let eventMap = {};
            for (let i = 0; i < events.length; i++) {
                let topic = _web3.utils.soliditySha3(events[i].name + "(" + events[i].inputs.map(e => e.type).join(",") + ")");
                eventMap[topic] = events[i];
            }
            return eventMap;
        }
        getAbiTopics(abi, eventNames) {
            if (!eventNames)
                return;
            let _web3 = this._web3;
            let result = [];
            let events = abi.filter(e => e.type == "event");
            for (let i = 0; i < events.length; i++) {
                if (eventNames.indexOf(events[i].name) >= 0) {
                    let topic = _web3.utils.soliditySha3(events[i].name + "(" + events[i].inputs.map(e => e.type).join(",") + ")");
                    result.push(topic);
                }
            }
            return result;
        }
        getContractAbi(address) {
            return this._abiAddressDict[address];
        }
        getContractAbiEvents(address) {
            let events = this._abiEventDict[address];
            if (events)
                return events;
            let abi = this._abiHashDict[this._abiAddressDict[address]];
            if (abi) {
                events = this.getAbiEvents(abi);
                this._abiEventDict[address] = events;
                return events;
            }
        }
        registerAbi(abi, address, handler) {
            let hash = '';
            if (typeof (abi) == 'string')
                hash = abi;
            else
                hash = this._web3.utils.sha3(JSON.stringify(abi));
            this._abiHashDict[hash] = abi;
            if (address)
                this.registerAbiContracts(hash, address, handler);
            return hash;
        }
        registerAbiContracts(abiHash, address, handler) {
            if (address) {
                if (!Array.isArray(address))
                    address = [address];
                for (let i = 0; i < address.length; i++) {
                    this._abiAddressDict[address[i]] = abiHash;
                    if (handler)
                        this._eventHandler[address[i]] = handler;
                }
            }
        }
        async decodeEventData(data, events) {
            let _web3 = this._web3;
            let event;
            if (events)
                event = events[data.topics[0]];
            else {
                let _events = this.getContractAbiEvents(data.address);
                if (_events)
                    event = _events[data.topics[0]];
                else
                    event = null;
            }
            ;
            let d;
            if (event) {
                d = _web3.eth.abi.decodeLog(event.inputs, data.data, data.topics.slice(1));
                if (d.__length__) {
                    for (let k = 0; k < d.__length__; k++)
                        delete d[k];
                    delete d['__length__'];
                }
                ;
            }
            let log = {
                address: data.address,
                blockNumber: data.blockNumber,
                topics: data.topics,
                data: d ? d : data.data,
                rawData: d ? data.data : undefined,
                logIndex: data.logIndex,
                name: event ? event.name : undefined,
                transactionHash: data.transactionHash,
                transactionIndex: data.transactionIndex
            };
            let handler = this._eventHandler[data.address];
            if (handler)
                await handler(this, log);
            return log;
        }
        scanEvents(fromBlock, toBlock, topics, events, address) {
            let _web3 = this._web3;
            return new Promise(async (resolve, reject) => {
                try {
                    let logs = await _web3.eth.getPastLogs({
                        fromBlock: fromBlock,
                        toBlock: toBlock,
                        address: address,
                        topics: topics ? topics : null
                    });
                    let result = [];
                    for (let i = 0; i < logs.length; i++) {
                        let e = logs[i];
                        result.push(await this.decodeEventData(e, events));
                    }
                    resolve(result);
                }
                catch (err) {
                    reject(err);
                }
            });
        }
        ;
        send(to, amount) {
            let _web3 = this._web3;
            let address = this.address;
            let self = this;
            return new Promise(async function (resolve, reject) {
                try {
                    let value = _web3.utils.numberToHex(_web3.utils.toWei(amount.toString()));
                    let result;
                    if ((self._account && self._account.privateKey) || self.kms) {
                        let nonce = await _web3.eth.getTransactionCount(address);
                        let gas = await _web3.eth.estimateGas({
                            from: address,
                            nonce: nonce,
                            to: to,
                            value: value
                        });
                        let price = _web3.utils.numberToHex(await _web3.eth.getGasPrice());
                        let tx = {
                            from: address,
                            nonce: nonce,
                            gasPrice: price,
                            gasLimit: gas,
                            gas: gas,
                            to: to,
                            value: value
                        };
                        if (self.kms) {
                            let chainId = await self.getChainId();
                            let txHash = await self.kms.signTransaction(chainId, tx);
                            result = await _web3.eth.sendSignedTransaction(txHash);
                        }
                        else {
                            let signedTx = await _web3.eth.accounts.signTransaction(tx, self._account.privateKey);
                            result = await _web3.eth.sendSignedTransaction(signedTx.rawTransaction);
                        }
                        resolve(result);
                    }
                    else {
                        result = await _web3.eth.sendTransaction({ from: address, to: to, value: _web3.utils.toWei(amount.toString()).toString() });
                        resolve(result);
                    }
                }
                catch (err) {
                    reject(err);
                }
            });
        }
        setBlockTime(time) {
            return new Promise((resolve, reject) => {
                this._web3.currentProvider.send({
                    jsonrpc: '2.0',
                    method: time > 1000000000 ? 'evm_mine' : 'evm_increaseTime',
                    params: [time],
                    id: new Date().getTime()
                }, (err, result) => {
                    if (err)
                        return reject(err);
                    resolve(result);
                });
            });
        }
        signMessage(msg) {
            let _web3 = this._web3;
            let address = this.address;
            let self = this;
            return new Promise(async function (resolve, reject) {
                try {
                    let result;
                    if ((self._account && self._account.privateKey) || self.kms) {
                        if (self.kms) {
                            result = await self.kms.signMessage(self.chainId, _web3.utils.stringToHex(msg));
                            resolve(result);
                        }
                        else {
                            result = await _web3.eth.accounts.sign(msg, self._account.privateKey);
                            resolve(result.signature);
                        }
                    }
                    else {
                        result = await _web3.eth.sign(msg, address, null);
                        resolve(result);
                    }
                }
                catch (err) {
                    reject(err);
                }
            });
        }
        ;
        token(tokenAddress, decimals) {
            return new erc20_1.Erc20(this, tokenAddress, decimals);
        }
        get utils() {
            return this._web3.utils;
        }
        ;
        verifyMessage(account, msg, signature) {
            let _web3 = this._web3;
            return new Promise(async function (resolve, reject) {
                try {
                    let signing_address = await _web3.eth.accounts.recover(msg, signature);
                    resolve(signing_address && account.toLowerCase() == signing_address.toLowerCase());
                }
                catch (err) {
                    reject(err);
                }
                ;
            });
        }
        ;
        get web3() {
            return this._web3;
        }
    }
    Wallet_1.Wallet = Wallet;
})(Wallet || (Wallet = {}));
;
module.exports = Wallet;
