"use strict";
/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcWallet = exports.Wallet = exports.Web3ModalProvider = exports.MetaMaskProvider = exports.EthereumProvider = exports.stringToBytes = exports.stringToBytes32 = exports.toString = void 0;
let Web3 = initWeb3Lib();
const bignumber_js_1 = require("bignumber.js");
const contracts_1 = require("./contracts");
const erc20_1 = require("./contracts/erc20");
const Utils = __importStar(require("./utils"));
const eventBus_1 = require("./eventBus");
const constants_1 = require("./constants");
const providers_json_1 = __importDefault(require("./providers.json"));
let Web3Modal;
const RequireJS = {
    require(reqs, callback) {
        window.require(reqs, callback);
    }
};
let currentModuleDir;
if (typeof window !== "undefined" && window["application"]) {
    currentModuleDir = window["application"].currentModuleDir;
}
;
function initWeb3Lib() {
    if (typeof window !== "undefined") {
        Web3 = window["Web3"];
        return window["Web3"];
    }
    else {
        let { Web3 } = require("./web3");
        return Web3;
    }
    ;
}
;
function initWeb3ModalLib(callback) {
    if (typeof window !== "undefined") {
        RequireJS.require(['@ijstech/eth-wallet-web3modal'], (web3modal) => {
            window["@ijstech/eth-wallet-web3modal"] = web3modal;
            callback();
        });
    }
    ;
}
;
function toString(value) {
    if (Array.isArray(value)) {
        let result = [];
        for (let i = 0; i < value.length; i++) {
            result.push(toString(value[i]));
        }
        return result;
    }
    else if (typeof value === "number")
        return value.toString(10);
    else if (bignumber_js_1.BigNumber.isBigNumber(value))
        return value.toFixed();
    else
        return value;
}
exports.toString = toString;
;
function stringToBytes32(value) {
    if (Array.isArray(value)) {
        let result = [];
        for (let i = 0; i < value.length; i++) {
            result.push(stringToBytes32(value[i]));
        }
        return result;
    }
    else {
        if (value.length == 66 && value.startsWith('0x'))
            return value;
        return Web3.utils.padRight(Web3.utils.asciiToHex(value), 64);
    }
}
exports.stringToBytes32 = stringToBytes32;
;
function stringToBytes(value, nByte) {
    if (Array.isArray(value)) {
        let result = [];
        for (let i = 0; i < value.length; i++) {
            result.push(stringToBytes(value[i]));
        }
        return result;
    }
    else {
        if (nByte) {
            if (new RegExp(`^0x[0-9a-fA-F]{${2 * nByte}}$`).test(value))
                return value;
            else if (/^0x([0-9a-fA-F][0-9a-fA-F])*$/.test(value)) {
                if (value.length >= ((nByte * 2) + 2))
                    return value;
                else
                    return "0x" + value.substring(2) + "00".repeat(nByte - ((value.length - 2) / 2));
            }
            else if (/^([0-9a-fA-F][0-9a-fA-F])+$/.test(value)) {
                if (value.length >= (nByte * 2))
                    return value;
                else
                    return "0x" + value + "00".repeat(nByte - (value.length / 2));
            }
            else
                return Web3.utils.padRight(Web3.utils.asciiToHex(value), nByte * 2);
        }
        else {
            if (/^0x([0-9a-fA-F][0-9a-fA-F])*$/.test(value))
                return value;
            else if (/^([0-9a-fA-F][0-9a-fA-F])+$/.test(value))
                return "0x" + value;
            else
                return Web3.utils.asciiToHex(value);
        }
    }
}
exports.stringToBytes = stringToBytes;
;
;
;
;
;
const WalletUtils = {
    fromWei(value) {
        return new bignumber_js_1.BigNumber(Web3.utils.fromWei(value));
    }
};
class EthereumProvider {
    constructor(wallet, events, options) {
        this._isConnected = false;
        this.wallet = wallet;
        this._events = events;
        this._options = options;
        if (this._options) {
            if (this._options.name) {
                this._name = this._options.name;
            }
            if (this._options.image) {
                this._image = this._options.image;
            }
        }
    }
    get name() {
        return this._name;
    }
    get displayName() {
        return 'Ethereum';
    }
    get provider() {
        return window['ethereum'];
    }
    get image() {
        return this._image;
    }
    installed() {
        return !!window['ethereum'];
    }
    get events() {
        return this._events;
    }
    get options() {
        return this._options;
    }
    get selectedAddress() {
        return this._selectedAddress;
    }
    toChecksumAddress(address) {
        address = address.toLowerCase().replace('0x', '');
        let sha3 = window['sha3'];
        let hash = sha3.keccak256(address);
        let ret = '0x';
        for (let i = 0; i < address.length; i++) {
            if (parseInt(hash[i], 16) >= 8) {
                ret += address[i].toUpperCase();
            }
            else {
                ret += address[i];
            }
        }
        return ret;
    }
    removeListeners() {
        if (this.handleAccountsChanged) {
            this.provider.removeListener('accountsChanged', this.handleAccountsChanged);
        }
        if (this.handleChainChanged) {
            this.provider.removeListener('chainChanged', this.handleChainChanged);
        }
        if (this.handleConnect) {
            this.provider.removeListener('connect', this.handleConnect);
        }
        if (this.handleDisconnect) {
            this.provider.removeListener('disconnect', this.handleDisconnect);
        }
    }
    _handleAccountsChanged(accounts, eventPayload) {
        let accountAddress;
        let hasAccounts = accounts && accounts.length > 0;
        if (hasAccounts) {
            this._selectedAddress = this.toChecksumAddress(accounts[0]);
            accountAddress = this._selectedAddress;
            if (this.wallet.web3) {
                this.wallet.web3.selectedAddress = this._selectedAddress;
            }
            this.wallet.account = {
                address: accountAddress
            };
        }
        this._isConnected = hasAccounts;
        eventBus_1.EventBus.getInstance().dispatch(constants_1.ClientWalletEvent.AccountsChanged, Object.assign(Object.assign({}, eventPayload), { account: accountAddress }));
        if (this.onAccountChanged)
            this.onAccountChanged(accountAddress);
    }
    initEvents() {
        let self = this;
        if (this.installed()) {
            this.removeListeners();
            this.handleAccountsChanged = (accounts) => {
                self._handleAccountsChanged(accounts);
            };
            this.handleChainChanged = (chainId) => {
                self.wallet.chainId = parseInt(chainId);
                if (this._options && this._options.useDefaultProvider) {
                    if (this._options.infuraId)
                        this.wallet.infuraId = this._options.infuraId;
                    self.wallet.setDefaultProvider();
                }
                eventBus_1.EventBus.getInstance().dispatch(constants_1.ClientWalletEvent.ChainChanged, chainId);
                if (self.onChainChanged)
                    self.onChainChanged(chainId);
            };
            this.handleConnect = (connectInfo) => {
                eventBus_1.EventBus.getInstance().dispatch(constants_1.ClientWalletEvent.Connect, connectInfo);
                if (self.onConnect)
                    self.onConnect(connectInfo);
            };
            this.handleDisconnect = (error) => {
                eventBus_1.EventBus.getInstance().dispatch(constants_1.ClientWalletEvent.Disconnect, error);
                if (self.onDisconnect)
                    self.onDisconnect(error);
            };
            this.provider.on('accountsChanged', this.handleAccountsChanged);
            this.provider.on('chainChanged', this.handleChainChanged);
            this.provider.on('connect', this.handleConnect);
            this.provider.on('disconnect', this.handleDisconnect);
        }
        ;
    }
    async connect(eventPayload) {
        this.wallet.chainId = parseInt(this.provider.chainId, 16);
        this.wallet.provider = this.provider;
        if (this._events) {
            this.onAccountChanged = this._events.onAccountChanged;
            this.onChainChanged = this._events.onChainChanged;
            this.onConnect = this._events.onConnect;
            this.onDisconnect = this._events.onDisconnect;
        }
        this.initEvents();
        let self = this;
        try {
            if (this.installed()) {
                if (eventPayload === null || eventPayload === void 0 ? void 0 : eventPayload.userTriggeredConnect) {
                    await this.provider.request({ method: 'eth_requestAccounts' }).then((accounts) => {
                        self._handleAccountsChanged(accounts, eventPayload);
                    });
                }
                else {
                    if (this.provider.selectedAddress) {
                        self._handleAccountsChanged([this.provider.selectedAddress], eventPayload);
                    }
                }
            }
        }
        catch (error) {
            console.error(error);
        }
        return this.provider;
    }
    async disconnect() {
        if (this.provider == null) {
            return;
        }
        if (this.provider.disconnect) {
            await this.provider.disconnect();
        }
        this.wallet.account = null;
        this._isConnected = false;
    }
    isConnected() {
        return this._isConnected;
    }
    addToken(option, type) {
        return new Promise(async function (resolve, reject) {
            try {
                let result = await this.provider.request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: type || 'ERC20',
                        options: option,
                    },
                });
                resolve(result);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    switchNetwork(chainId) {
        let self = this;
        return new Promise(async function (resolve, reject) {
            try {
                let chainIdHex = '0x' + chainId.toString(16);
                try {
                    let result = await self.provider.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{
                                chainId: chainIdHex
                            }]
                    });
                    resolve(!result);
                }
                catch (error) {
                    if (error.code === 4902) {
                        try {
                            let network = self.wallet.networksMap[chainId];
                            if (!network)
                                resolve(false);
                            let { chainName, nativeCurrency, rpcUrls, blockExplorerUrls, iconUrls } = network;
                            if (!Array.isArray(rpcUrls))
                                rpcUrls = [rpcUrls];
                            if (blockExplorerUrls && !Array.isArray(blockExplorerUrls))
                                blockExplorerUrls = [blockExplorerUrls];
                            if (iconUrls && !Array.isArray(iconUrls))
                                iconUrls = [iconUrls];
                            let result = await self.provider.request({
                                method: 'wallet_addEthereumChain',
                                params: [{
                                        chainId: chainIdHex,
                                        chainName: chainName,
                                        nativeCurrency: nativeCurrency,
                                        rpcUrls: rpcUrls,
                                        blockExplorerUrls: blockExplorerUrls,
                                        iconUrls: iconUrls
                                    }]
                            });
                            resolve(!result);
                        }
                        catch (error) {
                            reject(error);
                        }
                    }
                    else
                        reject(error);
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }
}
exports.EthereumProvider = EthereumProvider;
class MetaMaskProvider extends EthereumProvider {
    get displayName() {
        return providers_json_1.default.MetaMask.displayName;
    }
    get image() {
        return providers_json_1.default.MetaMask.image;
    }
    get homepage() {
        return providers_json_1.default.MetaMask.homepage;
    }
    installed() {
        let ethereum = window['ethereum'];
        return !!ethereum && !!ethereum.isMetaMask;
    }
}
exports.MetaMaskProvider = MetaMaskProvider;
class Web3ModalProvider extends EthereumProvider {
    constructor(wallet, events, options) {
        super(wallet, events, options);
    }
    get name() {
        return 'walletconnect';
    }
    get displayName() {
        return providers_json_1.default.Web3Modal.displayName;
    }
    get provider() {
        return this._provider;
    }
    get image() {
        return providers_json_1.default.Web3Modal.image;
    }
    get homepage() {
        return null;
    }
    installed() {
        return true;
    }
    get options() {
        return this._options;
    }
    initializeWeb3Modal(options) {
        let func = () => {
            Web3Modal = window["@ijstech/eth-wallet-web3modal"].EthereumProvider;
        };
        initWeb3ModalLib(func);
    }
    async connect(eventPayload) {
        if (!this._provider) {
            this.initializeWeb3Modal(this._options);
        }
        await this.disconnect();
        this._provider = await Web3Modal.init(Object.assign({ showQrModal: true, qrModalOptions: { themeMode: "light" }, methods: ["eth_sendTransaction", "personal_sign"], events: ["chainChanged", "accountsChanged"] }, this._options));
        await this._provider.enable();
        this.wallet.chainId = this.provider.chainId;
        this.wallet.provider = this.provider;
        await this.wallet.init();
        if (this._events) {
            this.onAccountChanged = this._events.onAccountChanged;
            this.onChainChanged = this._events.onChainChanged;
            this.onConnect = this._events.onConnect;
            this.onDisconnect = this._events.onDisconnect;
        }
        this.initEvents();
        let self = this;
        try {
            let hasAccounts = this._provider.accounts && this._provider.accounts.length > 0;
            this._isConnected = hasAccounts;
            if (hasAccounts) {
                let accountAddress = this._provider.accounts[0];
                this._selectedAddress = self.toChecksumAddress(accountAddress);
                if (self.wallet.web3) {
                    self.wallet.web3.selectedAddress = this._selectedAddress;
                }
                this.wallet.account = {
                    address: accountAddress
                };
                eventBus_1.EventBus.getInstance().dispatch(constants_1.ClientWalletEvent.AccountsChanged, Object.assign(Object.assign({}, eventPayload), { account: accountAddress }));
                if (self.onAccountChanged)
                    self.onAccountChanged(accountAddress);
            }
        }
        catch (error) {
            console.error(error);
        }
        return this.provider;
    }
    async disconnect() {
        if (this.provider == null) {
            return;
        }
        if (this.provider.disconnect) {
            await this.provider.disconnect();
        }
        this.wallet.account = null;
        this._isConnected = false;
    }
}
exports.Web3ModalProvider = Web3ModalProvider;
;
class Wallet {
    constructor(provider, account) {
        this._eventTopicAbi = {};
        this._eventHandler = {};
        this._sendTxEventHandler = {};
        this._contracts = {};
        this._networksMap = {};
        this._multicallInfoMap = {};
        this._walletEventIds = new Set();
        this._abiHashDict = {};
        this._abiContractDict = {};
        this._abiAddressDict = {};
        this._abiEventDict = {};
        this._provider = provider;
        if (Array.isArray(account)) {
            this._accounts = account;
            this._account = account[0];
        }
        else {
            this._account = account;
        }
        ;
        if (Web3)
            this.init();
    }
    ;
    static getInstance() {
        return Wallet.instance;
    }
    static getClientInstance() {
        return Wallet.instance;
    }
    static getRpcWalletInstance(instanceId) {
        return Wallet._rpcWalletPoolMap[instanceId];
    }
    static async initWeb3() {
        if (!Web3 && currentModuleDir && !window['Web3']) {
            await window['application'].loadScript(currentModuleDir + '/web3.js');
            Web3 = initWeb3Lib();
            Utils.initWeb3Lib();
        }
        ;
    }
    ;
    async init() {
        if (!this._web3) {
            if (!Web3 && currentModuleDir && !window['Web3']) {
                await window['application'].loadScript(currentModuleDir + '/web3.js');
                Web3 = initWeb3Lib();
                Utils.initWeb3Lib();
            }
            ;
            this._web3 = new Web3(this._provider);
            this._web3.eth.transactionConfirmationBlocks = 1;
            this._utils = {
                fromDecimals: Utils.fromDecimals,
                fromWei: this._web3.utils.fromWei,
                hexToUtf8: this._web3.utils.hexToUtf8,
                sha3: this._web3.utils.sha3,
                toDecimals: Utils.toDecimals,
                toString: Utils.toString,
                toUtf8: this._web3.utils.toUtf8,
                toWei: this._web3.utils.toWei,
                stringToBytes: Utils.stringToBytes,
                stringToBytes32: Utils.stringToBytes32
            };
            if (this._account && this._account.privateKey && !this._account.address)
                this._account.address = this._web3.eth.accounts.privateKeyToAccount(this._account.privateKey).address;
        }
        ;
    }
    ;
    get isConnected() {
        return this.clientSideProvider ? this.clientSideProvider.isConnected() : false;
    }
    async switchNetwork(chainId) {
        let result;
        if (this.clientSideProvider) {
            result = await this.clientSideProvider.switchNetwork(chainId);
        }
        else {
            this.chainId = chainId;
            this.setDefaultProvider();
        }
        return result;
    }
    initClientWallet(config) {
        const wallet = Wallet.instance;
        wallet.chainId = config.defaultChainId;
        wallet._infuraId = config.infuraId;
        wallet._networksMap = {};
        wallet.setMultipleNetworksInfo(config.networks);
        wallet.setDefaultProvider();
        wallet._multicallInfoMap = {};
        if (config.multicalls) {
            for (let multicall of config.multicalls) {
                wallet._multicallInfoMap[multicall.chainId] = multicall;
            }
        }
    }
    registerWalletEvent(sender, event, callback) {
        const registry = eventBus_1.EventBus.getInstance().register(sender, event, callback);
        this._walletEventIds.add(registry.id);
        return registry;
    }
    ;
    unregisterWalletEvent(registry) {
        registry.unregister();
        this._walletEventIds.delete(registry.id);
    }
    unregisterAllWalletEvents() {
        const eventBus = eventBus_1.EventBus.getInstance();
        this._walletEventIds.forEach(id => {
            eventBus.unregister(id);
        });
        this._walletEventIds.clear();
    }
    destoryRpcWalletInstance(instanceId) {
        delete Wallet._rpcWalletPoolMap[instanceId];
    }
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    initRpcWallet(config) {
        const wallet = new RpcWallet();
        const defaultNetwork = config.defaultChainId ? config.networks.find(v => v.chainId === config.defaultChainId) : config.networks[0];
        wallet.chainId = defaultNetwork.chainId;
        const rpc = defaultNetwork.rpcUrls[0];
        wallet.setProvider(rpc);
        wallet._infuraId = config.infuraId;
        wallet._networksMap = {};
        wallet.setMultipleNetworksInfo(config.networks);
        wallet._multicallInfoMap = {};
        if (config.multicalls) {
            for (let multicall of config.multicalls) {
                wallet._multicallInfoMap[multicall.chainId] = multicall;
            }
        }
        let instanceId = this.generateUUID();
        while (Wallet._rpcWalletPoolMap[instanceId]) {
            instanceId = this.generateUUID();
        }
        wallet.instanceId = instanceId;
        Wallet._rpcWalletPoolMap[instanceId] = wallet;
        wallet.initWalletEvents();
        return instanceId;
    }
    setDefaultProvider() {
        var _a;
        if (this._networksMap[this.chainId] && this._networksMap[this.chainId].rpcUrls.length > 0) {
            let rpc = this._networksMap[this.chainId].rpcUrls[0];
            if (rpc.indexOf('{INFURA_ID}')) {
                rpc = rpc.replace('{INFURA_ID}', (_a = this._infuraId) !== null && _a !== void 0 ? _a : '');
            }
            this.provider = rpc;
        }
    }
    async connect(clientSideProvider, eventPayload) {
        this.clientSideProvider = clientSideProvider;
        await this.clientSideProvider.connect(eventPayload);
        const providerOptions = this.clientSideProvider.options;
        if (providerOptions && providerOptions.useDefaultProvider) {
            if (providerOptions.infuraId)
                this._infuraId = providerOptions.infuraId;
            this.setDefaultProvider();
        }
        else {
            this.provider = this.clientSideProvider.provider;
        }
    }
    async disconnect() {
        if (this.clientSideProvider) {
            await this.clientSideProvider.disconnect();
            this.clientSideProvider = null;
            eventBus_1.EventBus.getInstance().dispatch(constants_1.ClientWalletEvent.AccountsChanged, {
                account: null
            });
        }
        this.setDefaultProvider();
    }
    get accounts() {
        return new Promise(async (resolve) => {
            await this.init();
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
        if (this.clientSideProvider) {
            return this.clientSideProvider.selectedAddress;
        }
        else if (this._web3) {
            if (this._account && this._account.privateKey) {
                if (!this._account.address)
                    this._account.address = this._web3.eth.accounts.privateKeyToAccount(this._account.privateKey).address;
                return this._account.address;
            }
            else if (this._web3.selectedAddress) {
                return this._web3.selectedAddress;
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
        return '';
    }
    get account() {
        return {
            address: this.address
        };
    }
    set account(value) {
        if (this._web3)
            this._web3.eth.defaultAccount = '';
        this._account = value;
    }
    get infuraId() {
        return this._infuraId;
    }
    set infuraId(value) {
        this._infuraId = value;
        this.setDefaultProvider();
    }
    get networksMap() {
        return this._networksMap;
    }
    getNetworkInfo(chainId) {
        return this._networksMap[chainId];
    }
    setNetworkInfo(network) {
        this._networksMap[network.chainId] = network;
    }
    setMultipleNetworksInfo(networks) {
        for (let network of networks) {
            this.setNetworkInfo(network);
        }
    }
    createAccount() {
        if (this._web3) {
            let acc = this._web3.eth.accounts.create();
            return {
                address: acc.address,
                privateKey: acc.privateKey
            };
        }
        ;
    }
    ;
    decodeLog(inputs, hexString, topics) {
        return this.web3.eth.abi.decodeLog(inputs, hexString, topics);
    }
    ;
    get defaultAccount() {
        if (this._account)
            return this._account.address;
        else if (this._web3)
            return this._web3.eth.defaultAccount;
    }
    set defaultAccount(address) {
        if (this._accounts) {
            for (let i = 0; i < this._accounts.length; i++) {
                if (!this._accounts[i].address && this._accounts[i].privateKey && this._web3)
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
        else if (this._web3)
            this._web3.eth.defaultAccount = address;
    }
    async getChainId() {
        await this.init();
        if (!this.chainId)
            this.chainId = Number(await this._web3.eth.getChainId());
        return this.chainId;
    }
    get provider() {
        return this._provider;
    }
    set provider(value) {
        if (this._web3)
            this._web3.setProvider(value);
        this._provider = value;
    }
    async sendSignedTransaction(tx) {
        await this.init();
        let _web3 = this._web3;
        return _web3.eth.sendSignedTransaction(tx);
    }
    async signTransaction(tx, privateKey) {
        await this.init();
        let _web3 = this._web3;
        let gas = tx.gas || Number(await _web3.eth.estimateGas({
            from: this.address,
            to: tx.to,
            data: tx.data,
        }));
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
    registerSendTxEvents(eventsOptions) {
        this._sendTxEventHandler = eventsOptions;
    }
    ;
    getContract(abiHash) {
        let contract;
        if (!this._abiContractDict[abiHash]) {
            contract = this.newContract(this._abiHashDict[abiHash]);
            this._abiContractDict[abiHash] = contract;
            return contract;
        }
        ;
        return this._abiContractDict[abiHash];
    }
    async _call(abiHash, address, methodName, params, options) {
        if (!address || !methodName)
            throw new Error("no contract address or method name");
        let method = this._getMethod(abiHash, address, methodName, params);
        let tx = {};
        tx.to = address;
        tx.data = method.encodeABI();
        if (options) {
            if (typeof options === "number") {
                tx.value = new bignumber_js_1.BigNumber(options);
            }
            else if (bignumber_js_1.BigNumber.isBigNumber(options)) {
                tx.value = options;
            }
            else if (options.value) {
                if (typeof options.value === "number") {
                    tx.value = new bignumber_js_1.BigNumber(options.value);
                }
                else if (bignumber_js_1.BigNumber.isBigNumber(options.value)) {
                    tx.value = options.value;
                }
            }
        }
        options = options;
        tx.from = (options && options.from) || this.address;
        if (options && (options.gas || options.gasLimit)) {
            tx.gas = options.gas || options.gasLimit;
        }
        let result = await method.call(Object.assign({ from: this.address }, tx));
        return result;
    }
    _getMethod(abiHash, address, methodName, params) {
        let contract = this.getContract(abiHash);
        params = params || [];
        let bytecode;
        if (!methodName) {
            bytecode = params.shift();
            contract.options.address = undefined;
        }
        else
            contract.options.address = address;
        let abi = this._abiHashDict[abiHash];
        let methodAbi = abi.find((e) => methodName ? e.name == methodName : e.type == "constructor");
        if (methodAbi)
            for (let i = 0; i < methodAbi.inputs.length; i++) {
                if (methodAbi.inputs[i].type.indexOf('bytes') == 0) {
                    params[i] = params[i] || '';
                    if (methodAbi.inputs[i].type.indexOf('[]') > 0) {
                        let a = [];
                        for (let k = 0; k < params[i].length; k++) {
                            let s = params[i][k] || '';
                            if (!params[i][k])
                                a.push("0x");
                            else
                                a.push(s);
                        }
                        params[i] = a;
                    }
                    else if (!params[i])
                        params[i] = "0x";
                }
                else if (methodAbi.inputs[i].type == 'address') {
                    if (!params[i])
                        params[i] = Utils.nullAddress;
                }
            }
        let method;
        if (!methodName)
            method = contract.deploy({ data: bytecode, arguments: params });
        else
            method = contract.methods[methodName].apply(this, params);
        return method;
    }
    async _txObj(abiHash, address, methodName, params, options) {
        var _a;
        let method = this._getMethod(abiHash, address, methodName, params);
        let tx = {};
        tx.from = this.address;
        tx.to = address || undefined;
        tx.data = method.encodeABI();
        if (options) {
            if (typeof options === "number") {
                tx.value = new bignumber_js_1.BigNumber(options);
                options = undefined;
            }
            else if (bignumber_js_1.BigNumber.isBigNumber(options)) {
                tx.value = options;
                options = undefined;
            }
            else if (options.value) {
                if (typeof options.value === "number") {
                    tx.value = new bignumber_js_1.BigNumber(options.value);
                }
                else if (bignumber_js_1.BigNumber.isBigNumber(options.value)) {
                    tx.value = options.value;
                }
            }
        }
        options = options;
        if (options && (options.gas || options.gasLimit)) {
            tx.gas = options.gas || options.gasLimit;
        }
        else {
            try {
                tx.gas = Number(await method.estimateGas({ from: this.address, to: address ? address : undefined, value: (_a = tx.value) === null || _a === void 0 ? void 0 : _a.toFixed() }));
                tx.gas = Math.min(await this.blockGasLimit(), Math.round(tx.gas * 1.5));
            }
            catch (e) {
                if (e.message == "Returned error: out of gas") {
                    console.log(e.message);
                    tx.gas = Math.round(await this.blockGasLimit() * 0.5);
                }
                else {
                    if (e.message.includes("Returned error: execution reverted: ")) {
                        throw e;
                    }
                    try {
                        await method.call(Object.assign({ from: this.address }, tx));
                    }
                    catch (e) {
                        if (e.message.includes("VM execution error.")) {
                            var msg = (e.data || e.message).match(/0x[0-9a-fA-F]+/);
                            if (msg && msg.length) {
                                msg = msg[0];
                                if (msg.startsWith("0x08c379a")) {
                                    msg = this.decodeErrorMessage(msg);
                                    throw new Error("Returned error: execution reverted: " + msg);
                                }
                            }
                        }
                    }
                    throw e;
                }
            }
        }
        if (!tx.gasPrice) {
            tx.gasPrice = (await this.getGasPrice());
        }
        if (options && options.nonce) {
            tx.nonce = options.nonce;
        }
        else {
            tx.nonce = await this.transactionCount();
        }
        return tx;
    }
    async _send(abiHash, address, methodName, params, options) {
        let tx = await this._txObj(abiHash, address, methodName, params, options);
        let receipt = await this.sendTransaction(tx);
        return receipt;
    }
    async _txData(abiHash, address, methodName, params, options) {
        let method = this._getMethod(abiHash, address, methodName, params);
        let data = method.encodeABI();
        return data;
    }
    async _methods(...args) {
        await this.init();
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
        await this.init();
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
            if (methodAbi && (methodAbi.constant || methodAbi.stateMutability == 'view')) {
                return method.call({ from: this.address });
            }
            if (!this._blockGasLimit) {
                this._blockGasLimit = Number((await _web3.eth.getBlock('latest')).gasLimit);
            }
            let gas;
            try {
                gas = Number(await method.estimateGas({ from: this.address, to: address, value: value }));
                gas = Math.min(this._blockGasLimit, Math.round(gas * 1.5));
            }
            catch (e) {
                if (e.message == "Returned error: out of gas") {
                    console.log(e.message);
                    gas = Math.round(this._blockGasLimit * 0.5);
                }
                else {
                    try {
                        await method.call({ from: this.address, value: value });
                    }
                    catch (e) {
                        if (e.message.includes("VM execution error.")) {
                            var msg = (e.data || e.message).match(/0x[0-9a-fA-F]+/);
                            if (msg && msg.length) {
                                msg = msg[0];
                                if (msg.startsWith("0x08c379a")) {
                                    msg = _web3.eth.abi.decodeParameter('string', "0x" + msg.substring(10));
                                    throw new Error(msg);
                                }
                            }
                        }
                    }
                    throw e;
                }
            }
            let gasPrice = Number(await _web3.eth.getGasPrice());
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
            else {
                contract.options.address = address;
                let nonce = Number(await _web3.eth.getTransactionCount(this.address));
                let tx = {
                    from: this.address,
                    nonce,
                    gasPrice,
                    gas,
                    to: address,
                    value,
                    data: method.encodeABI(),
                };
                let promiEvent = _web3.eth.sendTransaction(tx);
                promiEvent.on('error', (error) => {
                    if (error.message.startsWith("Transaction was not mined within 50 blocks")) {
                        return;
                    }
                    if (this._sendTxEventHandler.transactionHash)
                        this._sendTxEventHandler.transactionHash(error);
                });
                promiEvent.on('transactionHash', (receipt) => {
                    if (this._sendTxEventHandler.transactionHash)
                        this._sendTxEventHandler.transactionHash(null, receipt);
                });
                promiEvent.once('confirmation', (confirmationObj) => {
                    this._sendTxEventHandler.confirmation(confirmationObj.receipt);
                });
                result = await promiEvent;
                if (methodName == 'deploy')
                    return result.contractAddress;
                return result;
            }
        }
    }
    ;
    get balance() {
        return this.balanceOf(this.address);
    }
    ;
    balanceOf(address) {
        let self = this;
        return new Promise(async function (resolve) {
            try {
                let network = self._networksMap[self.chainId];
                let decimals = 18;
                if (network) {
                    if (network.nativeCurrency && network.nativeCurrency.decimals) {
                        decimals = network.nativeCurrency.decimals;
                    }
                    const url = network.rpcUrls[0];
                    const data = {
                        id: 1,
                        jsonrpc: '2.0',
                        method: 'eth_getBalance',
                        params: [address, 'latest'],
                    };
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });
                    const json = await response.json();
                    if (json.error) {
                        resolve(new bignumber_js_1.BigNumber(0));
                    }
                    resolve(new bignumber_js_1.BigNumber(json.result).div(10 ** decimals));
                }
                else {
                    await self.init();
                    let _web3 = self._web3;
                    let result = Number(await _web3.eth.getBalance(address));
                    resolve(new bignumber_js_1.BigNumber(result).div(10 ** decimals));
                }
            }
            catch (err) {
                resolve(new bignumber_js_1.BigNumber(0));
            }
        });
    }
    ;
    recoverSigner(msg, signature) {
        let self = this;
        return new Promise(async function (resolve, reject) {
            await self.init();
            let _web3 = self._web3;
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
    async getBlock(blockHashOrBlockNumber, returnTransactionObjects) {
        await this.init();
        if (returnTransactionObjects) {
            return this._web3.eth.getBlock(blockHashOrBlockNumber || 'latest', true);
        }
        return this._web3.eth.getBlock(blockHashOrBlockNumber || 'latest', false);
    }
    ;
    async getBlockNumber() {
        await this.init();
        return Number(await this._web3.eth.getBlockNumber());
    }
    ;
    async getBlockTimestamp(blockHashOrBlockNumber) {
        await this.init();
        let block = await this._web3.eth.getBlock(blockHashOrBlockNumber || 'latest', false);
        if (typeof (block.timestamp) == 'string')
            return parseInt(block.timestamp);
        else
            return Number(block.timestamp);
    }
    ;
    set privateKey(value) {
        if (value && this._web3) {
            this._web3.eth.defaultAccount = '';
        }
        this._account = {
            address: '',
            privateKey: value
        };
    }
    ;
    async registerEvent(abi, eventMap, address, handler) {
        await this.init();
        let hash = '';
        if (typeof (abi) == 'string') {
            hash = this._web3.utils.sha3(abi);
            abi = JSON.parse(abi);
        }
        else {
            hash = this._web3.utils.sha3(JSON.stringify(abi));
        }
        this.registerAbiContracts(hash, address, handler);
        this._eventTopicAbi[hash] = {};
        for (let topic in eventMap) {
            this._eventTopicAbi[hash][topic] = eventMap[topic];
        }
    }
    ;
    getAbiEvents(abi) {
        if (this._web3) {
            let _web3 = this._web3;
            let events = abi.filter(e => e.type == "event");
            let eventMap = {};
            for (let i = 0; i < events.length; i++) {
                let topic = _web3.utils.soliditySha3(events[i].name + "(" + events[i].inputs.map(e => e.type == "tuple" ? "(" + (e.components.map(f => f.type)) + ")" : e.type).join(",") + ")");
                eventMap[topic] = events[i];
            }
            return eventMap;
        }
        ;
    }
    ;
    getAbiTopics(abi, eventNames) {
        if (this._web3) {
            if (!eventNames || eventNames.length == 0)
                eventNames = null;
            let _web3 = this._web3;
            let result = [];
            let events = abi.filter(e => e.type == "event");
            for (let i = 0; i < events.length; i++) {
                if (!eventNames || eventNames.indexOf(events[i].name) >= 0) {
                    let topic = _web3.utils.soliditySha3(events[i].name + "(" + events[i].inputs.map(e => e.type == "tuple" ? "(" + (e.components.map(f => f.type)) + ")" : e.type).join(",") + ")");
                    result.push(topic);
                }
            }
            if (result.length == 0 && eventNames && eventNames.length > 0)
                return ['NULL'];
            return [result];
        }
        ;
    }
    ;
    getContractAbi(address) {
        return this._abiAddressDict[address];
    }
    ;
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
    ;
    registerAbi(abi, address, handler) {
        if (this._web3) {
            let hash = '';
            if (typeof (abi) == 'string') {
                hash = this._web3.utils.sha3(abi);
                abi = JSON.parse(abi);
            }
            else {
                hash = this._web3.utils.sha3(JSON.stringify(abi));
            }
            if (!address && !handler && this._abiHashDict[hash])
                return hash;
            let eventMap;
            eventMap = this.getAbiEvents(abi);
            this._eventTopicAbi[hash] = {};
            for (let topic in eventMap) {
                this._eventTopicAbi[hash][topic] = eventMap[topic];
            }
            this._abiHashDict[hash] = abi;
            if (address)
                this.registerAbiContracts(hash, address, handler);
            return hash;
        }
        ;
    }
    ;
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
    ;
    decode(abi, event, raw) {
        if (!raw)
            raw = event;
        let d;
        try {
            if (abi) {
                d = this.web3.eth.abi.decodeLog(abi.inputs, raw.data, raw.topics.slice(1));
                if (d.__length__) {
                    for (let k = 0; k < d.__length__; k++)
                        delete d[k];
                    delete d['__length__'];
                }
            }
        }
        catch (err) {
        }
        let log = {
            address: event.address,
            blockNumber: event.blockNumber,
            topics: raw.topics,
            data: d ? d : raw.data,
            rawData: d ? raw.data : undefined,
            logIndex: event.logIndex,
            name: abi ? abi.name : undefined,
            transactionHash: event.transactionHash,
            transactionIndex: event.transactionIndex
        };
        return log;
    }
    ;
    async decodeEventData(data, events) {
        let event;
        if (events)
            event = events[data.topics[0]];
        else {
            const abiHash = this._abiAddressDict[data.address];
            if (abiHash && this._eventTopicAbi[abiHash]) {
                event = this._eventTopicAbi[abiHash][data.topics[0]];
            }
        }
        ;
        let log = this.decode(event, data);
        let handler = this._eventHandler[data.address];
        if (handler)
            await handler(this, log);
        return log;
    }
    ;
    scanEvents(param1, param2, param3, param4, param5) {
        let fromBlock;
        let toBlock;
        let topics;
        let events;
        let address;
        if (typeof (param1) == 'number') {
            fromBlock = param1;
            toBlock = param2;
            topics = param3;
            events = param4;
            address = param5;
        }
        else {
            fromBlock = param1.fromBlock;
            toBlock = param1.toBlock;
            topics = param1.topics;
            events = param1.events;
            address = param1.address;
        }
        ;
        return new Promise(async (resolve, reject) => {
            await this.init();
            let _web3 = this._web3;
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
        let address = this.address;
        let self = this;
        let currentProvider = this.provider;
        if (typeof window !== "undefined" && this.clientSideProvider && this.provider !== this.clientSideProvider.provider) {
            this.provider = this.clientSideProvider.provider;
        }
        let promise = new Promise(async function (resolve, reject) {
            await self.init();
            let _web3 = self._web3;
            try {
                let value = _web3.utils.numberToHex(_web3.utils.toWei(amount.toString()));
                let result;
                if ((self._account && self._account.privateKey)) {
                    let nonce = Number(await _web3.eth.getTransactionCount(address));
                    let gas = Number(await _web3.eth.estimateGas({
                        from: address,
                        nonce: nonce,
                        to: to,
                        value: value
                    }));
                    let price = Number(await _web3.eth.getGasPrice());
                    let tx = {
                        from: address,
                        nonce: nonce,
                        gasPrice: price,
                        gasLimit: gas,
                        gas: gas,
                        to: to,
                        value: value
                    };
                    let signedTx = await _web3.eth.accounts.signTransaction(tx, self._account.privateKey);
                    result = await _web3.eth.sendSignedTransaction(signedTx.rawTransaction);
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
        promise.finally(() => {
            if (this.provider !== currentProvider) {
                this.provider = currentProvider;
            }
        });
        return promise;
    }
    ;
    setBlockTime(time) {
        return new Promise(async (resolve, reject) => {
            await this.init();
            let method = time > 1000000000 ? 'evm_mine' : 'evm_increaseTime';
            this._web3.currentProvider.send({
                jsonrpc: '2.0',
                method: method,
                params: [time],
                id: new Date().getTime()
            }, (err, result) => {
                if (err)
                    return reject(err);
                if (method == 'evm_mine') {
                    return resolve(result);
                }
                else {
                    this._web3.currentProvider.send({
                        jsonrpc: '2.0',
                        method: 'evm_mine',
                        params: [],
                        id: new Date().getTime()
                    }, (err, result) => {
                        if (err)
                            return reject(err);
                        return resolve(result);
                    });
                }
            });
        });
    }
    ;
    increaseBlockTime(value) {
        return new Promise(async (resolve, reject) => {
            await this.init();
            this._web3.currentProvider.send({
                jsonrpc: "2.0",
                method: "evm_increaseTime",
                params: [value],
                id: new Date().getTime()
            }, (err, result) => {
                this._web3.currentProvider.send({
                    jsonrpc: '2.0',
                    method: 'evm_mine',
                    params: [],
                    id: new Date().getTime()
                }, (err, result) => {
                    resolve(result);
                });
            });
        });
    }
    signMessage(msg) {
        let address = this.address;
        let self = this;
        let currentProvider = this.provider;
        if (typeof window !== "undefined" && this.clientSideProvider && this.provider !== this.clientSideProvider.provider) {
            this.provider = this.clientSideProvider.provider;
        }
        let promise = new Promise(async function (resolve, reject) {
            try {
                let result;
                if (self._account && self._account.privateKey) {
                    await self.init();
                    let _web3 = self._web3;
                    result = await _web3.eth.accounts.sign(msg, self._account.privateKey);
                    resolve(result.signature);
                }
                else if (typeof window !== "undefined" && self.clientSideProvider) {
                    result = await self.clientSideProvider.provider.request({
                        method: 'personal_sign',
                        params: [msg, address],
                    });
                    resolve(result);
                }
                else {
                    await self.init();
                    let _web3 = self._web3;
                    result = await _web3.eth.sign(msg, address);
                    resolve(result);
                }
            }
            catch (err) {
                reject(err);
            }
        });
        promise.finally(() => {
            if (this.provider !== currentProvider) {
                this.provider = currentProvider;
            }
        });
        return promise;
    }
    ;
    signTypedDataV4(data) {
        let self = this;
        let currentProvider = this.provider;
        if (typeof window !== "undefined" && this.clientSideProvider && this.provider !== this.clientSideProvider.provider) {
            this.provider = this.clientSideProvider.provider;
        }
        let promise = new Promise(async (resolve, reject) => {
            try {
                self._web3.currentProvider.send({
                    jsonrpc: "2.0",
                    method: 'eth_signTypedData_v4',
                    params: [
                        self.defaultAccount,
                        JSON.stringify(data)
                    ],
                    id: Date.now()
                }, function (err, result) {
                    if (err)
                        return reject(err);
                    if (result.error)
                        return reject(result.error);
                    let signature = result.result;
                    resolve(signature);
                });
            }
            catch (e) {
                reject(e);
            }
        });
        promise.finally(() => {
            if (this.provider !== currentProvider) {
                this.provider = currentProvider;
            }
        });
        return promise;
    }
    token(tokenAddress, decimals) {
        return new erc20_1.Erc20(this, tokenAddress, decimals);
    }
    ;
    async tokenInfo(tokenAddress) {
        let erc20 = this.token(tokenAddress);
        return {
            decimals: await erc20.decimals,
            name: await erc20.name,
            symbol: await erc20.symbol,
            totalSupply: await erc20.totalSupply
        };
    }
    ;
    get utils() {
        return this._utils;
    }
    ;
    verifyMessage(account, msg, signature) {
        let self = this;
        return new Promise(async function (resolve, reject) {
            await self.init();
            let _web3 = self._web3;
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
    blockGasLimit() {
        let self = this;
        return new Promise(async (resolve, reject) => {
            await self.init();
            try {
                if (!this._gasLimit)
                    this._gasLimit = Number((await this._web3.eth.getBlock('latest')).gasLimit);
                resolve(this._gasLimit);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    ;
    getGasPrice() {
        return new Promise(async (resolve, reject) => {
            await this.init();
            try {
                resolve(new bignumber_js_1.BigNumber(Number(await this._web3.eth.getGasPrice())));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    transactionCount() {
        return new Promise(async (resolve, reject) => {
            await this.init();
            try {
                resolve(Number(await this._web3.eth.getTransactionCount(this.address)));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    async sendTransaction(transaction) {
        await this.init();
        let _transaction = Object.assign(Object.assign({}, transaction), { value: typeof (transaction.value) == 'string' ? transaction.value : transaction.value ? transaction.value.toFixed() : undefined, gasPrice: typeof (transaction.gasPrice) == 'string' ? transaction.gasPrice : transaction.gasPrice ? transaction.gasPrice.toFixed() : undefined });
        let currentProvider = this.provider;
        try {
            if (typeof window !== "undefined" && this.clientSideProvider && this.provider !== this.clientSideProvider.provider) {
                this.provider = this.clientSideProvider.provider;
            }
            if (this._account && this._account.privateKey) {
                let signedTx = await this._web3.eth.accounts.signTransaction(_transaction, this._account.privateKey);
                return await this._web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            }
            else {
                let promiEvent = this._web3.eth.sendTransaction(_transaction);
                promiEvent.on('error', (error) => {
                    if (error.message.startsWith("Transaction was not mined within 50 blocks")) {
                        return;
                    }
                    if (this._sendTxEventHandler.transactionHash)
                        this._sendTxEventHandler.transactionHash(error);
                });
                promiEvent.on('transactionHash', (receipt) => {
                    if (this._sendTxEventHandler.transactionHash)
                        this._sendTxEventHandler.transactionHash(null, receipt);
                });
                promiEvent.once('confirmation', (confirmationObj) => {
                    this._sendTxEventHandler.confirmation(confirmationObj.receipt);
                });
                return await promiEvent;
            }
        }
        catch (err) {
            throw err;
        }
        finally {
            if (this.provider !== currentProvider) {
                this.provider = currentProvider;
            }
        }
    }
    async getTransaction(transactionHash) {
        await this.init();
        let web3Receipt = await this._web3.eth.getTransaction(transactionHash);
        return {
            from: web3Receipt.from,
            to: web3Receipt.to,
            nonce: Number(web3Receipt.nonce),
            gas: Number(web3Receipt.gas),
            gasPrice: new bignumber_js_1.BigNumber(web3Receipt.gasPrice),
            data: web3Receipt.input,
            value: new bignumber_js_1.BigNumber(web3Receipt.value)
        };
    }
    async getTransactionReceipt(transactionHash) {
        await this.init();
        return this._web3.eth.getTransactionReceipt(transactionHash);
    }
    async call(transaction) {
        await this.init();
        let _transaction = Object.assign(Object.assign({}, transaction), { value: transaction.value ? transaction.value.toFixed() : undefined, gasPrice: transaction.gasPrice ? transaction.gasPrice.toFixed() : undefined });
        return this._web3.eth.call(_transaction);
    }
    newContract(abi, address) {
        if (this._web3)
            return new this._web3.eth.Contract(abi, address);
    }
    decodeErrorMessage(msg) {
        if (this._web3)
            return this._web3.eth.abi.decodeParameter('string', "0x" + msg.substring(10));
    }
    async newBatchRequest() {
        return new Promise(async (resolve, reject) => {
            await this.init();
            try {
                resolve({
                    batch: new this._web3.eth.BatchRequest(),
                    promises: [],
                    execute: (batch, promises) => {
                        batch.execute();
                        return Promise.all(promises);
                    }
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    soliditySha3(...val) {
        if (this._web3)
            return this._web3.utils.soliditySha3(...val);
    }
    toChecksumAddress(address) {
        if (this._web3)
            return this._web3.utils.toChecksumAddress(address);
    }
    async multiCall(calls, gasBuffer) {
        const chainId = await this.getChainId();
        const multicallInfo = this._multicallInfoMap[chainId];
        if (!multicallInfo)
            return null;
        const multiCall = new contracts_1.MultiCall(this, multicallInfo.contractAddress);
        const result = await multiCall.multicallWithGasLimitation.call({
            calls,
            gasBuffer: new bignumber_js_1.BigNumber(gasBuffer !== null && gasBuffer !== void 0 ? gasBuffer : multicallInfo.gasBuffer)
        });
        return result;
    }
    encodeFunctionCall(contract, methodName, params) {
        if (this._web3) {
            const abi = contract._abi.find(v => v.name == methodName);
            return abi ? this._web3.eth.abi.encodeFunctionCall(abi, params) : '';
        }
    }
    get web3() {
        return this._web3;
    }
}
Wallet._rpcWalletPoolMap = {};
Wallet.instance = new Wallet();
exports.Wallet = Wallet;
class RpcWallet extends Wallet {
    get address() {
        return this._address;
    }
    set address(value) {
        this._address = value;
    }
    setProvider(provider) {
        if (this._web3) {
            this._web3.setProvider(provider);
        }
        this._provider = provider;
    }
    ;
    get isConnected() {
        const clientWallet = Wallet.getClientInstance();
        return clientWallet.isConnected && this.chainId === clientWallet.chainId;
    }
    ;
    async switchNetwork(chainId) {
        await this.init();
        this.chainId = chainId;
        const rpc = this.networksMap[chainId].rpcUrls[0];
        this._web3.setProvider(rpc);
        const eventId = `${this.instanceId}:${constants_1.RpcWalletEvent.ChainChanged}`;
        eventBus_1.EventBus.getInstance().dispatch(eventId, chainId);
        return null;
    }
    initWalletEvents() {
        const eventId = `${this.instanceId}:${constants_1.RpcWalletEvent.Connected}`;
        const eventBus = eventBus_1.EventBus.getInstance();
        const accountsChangedRegistry = eventBus.register(this, constants_1.ClientWalletEvent.AccountsChanged, (payload) => {
            this.address = payload.account;
            eventBus.dispatch(eventId, this.isConnected);
        });
        const chainChangedRegistry = eventBus.register(this, constants_1.ClientWalletEvent.ChainChanged, (chainIdHex) => {
            eventBus.dispatch(eventId, this.isConnected);
        });
        this._walletEventIds.add(accountsChangedRegistry.id);
        this._walletEventIds.add(chainChangedRegistry.id);
    }
    registerWalletEvent(sender, event, callback) {
        const eventId = `${this.instanceId}:${event}`;
        const eventBus = eventBus_1.EventBus.getInstance();
        const registry = eventBus.register(sender, eventId, callback);
        this._walletEventIds.add(registry.id);
        return registry;
    }
}
exports.RpcWallet = RpcWallet;
