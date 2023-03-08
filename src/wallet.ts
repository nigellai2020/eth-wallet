/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/

import * as W3 from 'web3';
const Web3 = initWeb3Lib(); // tslint:disable-line
import {BigNumber} from 'bignumber.js';
import {MultiCall} from './contracts';
import {Erc20} from './contracts/erc20';
import * as Utils from "./utils";
import { IAbiDefinition, MessageTypes, TypedMessage } from './types';

let Web3Modal;
let WalletConnectProvider;

const RequireJS = {    
    require(reqs:string[], callback:any):void {
        (<any>window.require)(reqs, callback);
    }
}
function initWeb3Lib(){
	if (typeof window !== "undefined" && window["Web3"])
        return window["Web3"];
	else
		return require("web3");
};
function initWeb3ModalLib(callback: () => void){
	if (typeof window !== "undefined") {
		RequireJS.require(['WalletConnectProvider', 'Web3Modal'], (walletconnect, web3modal) => {
			window["WalletConnectProvider"] = walletconnect;
			window["Web3Modal"] = web3modal;
			callback();
		})		
	}
};
// module Wallet{    	
	export function toString(value: any) {
		if (Array.isArray(value)) {
			let result = [];
			for (let i = 0; i < value.length; i++) {
				result.push(toString(value[i]));
			}
			return result;
		}
		else if (typeof value === "number")
			return value.toString(10);
		else if (BigNumber.isBigNumber(value))
			return value.toFixed();
		else
			return value;
	};
	export function stringToBytes32(value: string | stringArray): string | string[] {
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
			return Web3.utils.padRight(Web3.utils.asciiToHex(value), 64)
		}
	};
	export function stringToBytes(value: string | stringArray, nByte?: number): string | string[] {
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
				} else if (/^([0-9a-fA-F][0-9a-fA-F])+$/.test(value)) {
					if (value.length >= (nByte * 2))
						return value;
					else
						return "0x" + value + "00".repeat(nByte - (value.length / 2));
				} else
					return Web3.utils.padRight(Web3.utils.asciiToHex(value), nByte * 2)
			} else {
				if (/^0x([0-9a-fA-F][0-9a-fA-F])*$/.test(value))
					return value;
				else if (/^([0-9a-fA-F][0-9a-fA-F])+$/.test(value))
					return "0x" + value;
				else
					return Web3.utils.asciiToHex(value)
			}
		}
	};
	export type stringArray = string | _stringArray;
	export interface _stringArray extends Array<stringArray> { };
	export interface IWalletUtils{
		fromDecimals(value: BigNumber | number | string, decimals?: number): BigNumber;
		fromWei(value: any, unit?: string): string;
		hexToUtf8(value: string): string;
		sha3(value: string): string;
		stringToBytes(value: string | stringArray, nByte?: number): string | string[];
		stringToBytes32(value: string | stringArray): string | string[];
		toDecimals(value: BigNumber | number | string, decimals?: number): BigNumber;
		toString(value: any): string;
		toUtf8(value: any): string;		
		toWei(value: string, unit?: string): string;
	};
	export interface IWalletTransaction {
		hash: string;
		nonce: number;
		blockHash: string | null;
		blockNumber: number | null;
		transactionIndex: number | null;
		from: string;
		to: string | null;
		value: string;
		gasPrice: string;
		maxPriorityFeePerGas?: number | string | BigNumber;
		maxFeePerGas?: number | string | BigNumber;
		gas: number;
		input: string;
	};
	export interface IWalletBlockTransactionObject{
		number: number;
		hash: string;
		parentHash: string;
		nonce: string;
		sha3Uncles: string;
		logsBloom: string;
		transactionRoot: string;
		stateRoot: string;
		receiptsRoot: string;
		miner: string;
		extraData: string;
		gasLimit: number;
		gasUsed: number;
		timestamp: number | string;
		baseFeePerGas?: number;
		size: number;
		difficulty: number;
		totalDifficulty: number;
		uncles: string[];
		transactions: IWalletTransaction[];
	};
	export interface ITokenInfo{
		name: string;
		symbol: string;
		totalSupply: BigNumber;
		decimals: number;	
	}
	export interface IBatchRequestResult {
		key: string;
		result: any;
	}	
	export interface IBatchRequestObj {
		batch: any;
		promises: Promise<IBatchRequestResult>[];
		execute: (batch: IBatchRequestObj, promises: Promise<IBatchRequestResult>[]) => Promise<IBatchRequestResult[]>;
	}
	export interface IWallet {		
		account: IAccount;
		accounts: Promise<string[]>;
		address: string;
		balance: Promise<BigNumber>;
		balanceOf(address: string): Promise<BigNumber>;
		_call(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<any>;
		chainId: number;
		createAccount(): IAccount;
		decode(abi: any, event: Log | EventLog, raw?: {
			data: string;
			topics: string[];
		}): Event;
		decodeErrorMessage(msg: string): any;
		decodeEventData(data: Log, events?: any): Promise<Event>;
		decodeLog(inputs: any, hexString: string, topics: any): any;
		defaultAccount: string;
		getAbiEvents(abi: any[]): any;
		getAbiTopics(abi: any[], eventNames: string[]): any[];
		getBlock(blockHashOrBlockNumber?: number | string, returnTransactionObjects?: boolean): Promise<IWalletBlockTransactionObject>;
		getBlockNumber(): Promise<number>;
		getBlockTimestamp(blockHashOrBlockNumber?: number | string): Promise<number>;
		getChainId(): Promise<number>;
		getContractAbi(address: string): any;
		getContractAbiEvents(address: string): any;
		getTransaction(transactionHash: string): Promise<Transaction>;
		methods(...args: any): Promise<any>;
		privateKey: string;
		recoverSigner(msg: string, signature: string): Promise<string>;
		registerAbi(abi: any[] | string, address?: string | string[], handler?: any): string;
		registerAbiContracts(abiHash: string, address: string | string[], handler?: any): any;
		send(to: string, amount: number): Promise<TransactionReceipt>;
		_send(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<any>;
		scanEvents(fromBlock: number, toBlock: number | string, topics?: any, events?: any, address?: string | string[]): Promise<Event[]>;
		scanEvents(params: {fromBlock: number, toBlock: number | string, topics?: any, events?: any, address?: string | string[]}): Promise<Event[]>;
		signMessage(msg: string): Promise<string>;
		signTransaction(tx: any, privateKey?: string): Promise<string>;
		soliditySha3(...val: any[]): string;
		toChecksumAddress(address: string): string;
		tokenInfo(address: string): Promise<ITokenInfo>;
		_txData(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<string>;
		_txObj(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<Transaction>;
		utils: IWalletUtils;
		verifyMessage(account: string, msg: string, signature: string): Promise<boolean>;
		multiCall(calls: {to: string; data: string}[], gasBuffer?: string): Promise<{results: string[]; lastSuccessIndex: BigNumber}>;
		encodeFunctionCall<T extends IAbiDefinition, F extends Extract<keyof T, { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]>>(
			contract: T, 
			methodName: F, 
			params: string[]
		): string;
	};
	export interface IClientWallet extends IWallet {	
		blockGasLimit(): Promise<number>;
		clientSideProvider: ClientSideProvider;
		connect(walletPlugin: WalletPlugin, events?: IClientSideProviderEvents, providerOptions?: IClientProviderOptions): Promise<any>;
		disconnect(): Promise<void>;
		getGasPrice(): Promise<BigNumber>;
		getTransaction(transactionHash: string): Promise<Transaction>;
		getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt>;
		isConnected: boolean;
		newContract(abi: any, address?: string): IContract;
		provider: any;	
		registerEvent(abi: any, eventMap: {
            [topics: string]: any;
        }, address: string, handler: any): any;
		registerSendTxEvents(eventsOptions: ISendTxEventsOptions): void; 
		sendSignedTransaction(signedTransaction: string): Promise<TransactionReceipt>;
		sendTransaction(transaction: Transaction): Promise<TransactionReceipt>;
		signTypedDataV4(data: TypedMessage<MessageTypes>): Promise<string>;
        switchNetwork(chainId: number, onChainChanged?: (chainId: string) => void): Promise<boolean>;        
        transactionCount(): Promise<number>;   
		getNetworkInfo(chainId: number): INetwork;
		setNetworkInfo(network: INetwork): void;
		setMultipleNetworksInfo(networks: INetwork[]): void;
	};
	export interface IContractMethod {
		call: any;
		estimateGas(...params:any[]): Promise<number>;
		encodeABI(): string;
	}
	export interface IContract {
		deploy(params: {data: string, arguments?: any[]}): IContractMethod;
		methods: {[methodName: string]: (...params:any[]) => IContractMethod};
	}
    export interface Event{
		name: string;
        address: string;
        blockNumber: number;
		logIndex: number;
		topics: string[];
        transactionHash: string;
        transactionIndex: number;        
        data: any;
		rawData: any;
	}
    export interface Log {
	    address: string;
	    data: string;
	    topics: Array <string>;
        logIndex: number;
	    transactionHash?: string;
	    transactionIndex: number;
	    blockHash?: string;
	    type?: string;
	    blockNumber: number;
	}
	export interface EventLog {
	    event: string
	    address: string
	    returnValues: any
	    logIndex: number
	    transactionIndex: number
	    transactionHash: string
	    blockHash: string
	    blockNumber: number
	    raw ? : {
	        data: string,
	        topics: string[]
	    }
	}
    export interface TransactionReceipt {
	    transactionHash: string;
	    transactionIndex: number;
	    blockHash: string;
	    blockNumber: number;
	    from: string;
	    to: string;
	    contractAddress?: string;
	    cumulativeGasUsed: number;
	    gasUsed: number;
	    logs ? : Array <Log>;
        events ? : {
            [eventName: string]: EventLog | EventLog[]
        };
        status: boolean;
	}
	export interface Transaction{
		from?: string;
		to?: string;
		nonce?: number;
		gas?: number;
		gasPrice?: BigNumber;
		data?: string;
		value?: BigNumber;
	}
	export interface TransactionOptions {
		from?: string;
		nonce?: number;
		gas?: number;
		gasLimit?: number;
		gasPrice?: BigNumber | number;
		data?: string;
		value?: BigNumber | number;
	}
    export interface IKMS{

    }
    export interface IAccount {
        address: string;        
        privateKey?: string;
		kms?: IKMS;
        sign?(): Promise<string>;
        signTransaction?(): Promise<any>;
    }    
	const WalletUtils = {
		fromWei(value: any): BigNumber{
			return new BigNumber(W3.default.utils.fromWei(value))
		}
	}
	interface IDictionary {
		[index: string]: any;
   	}
	export interface ITokenOption{
	    address: string, // The address that the token is at.
	    symbol: string, // A ticker symbol or shorthand, up to 5 chars.
	    decimals: number, // The number of decimals in the token
	    image?: string, // A string url of the token logo
	}
	export interface INetwork {
		chainId: number; 
		chainName: string;
		nativeCurrency: {
			name: string;
			symbol: string; // 2-6 characters long
			decimals: number;
		};
		rpcUrls: string[];
		blockExplorerUrls?: string[];
		iconUrls?: string[]; // Currently ignored.
	}
	export interface IClientSideProviderEvents {
		onAccountChanged?: (account: string)=>void; 
		onChainChanged?: (chainId: string)=>void;
		onConnect?: (connectInfo: any)=>void;
		onDisconnect?: (error: any)=>void;
	}
	export type NetworksMapType = { [chainId: number]: INetwork }
	export const DefaultNetworksMap: NetworksMapType = {
		1: {
			chainId: 1,
			chainName: "Ethereum Mainnet",
			rpcUrls: ['https://mainnet.infura.io/v3/{INFURA_ID}'],
			blockExplorerUrls: ['https://etherscan.io/'],
			nativeCurrency: {
				decimals: 18,
				name: 'ETH',
				symbol: 'ETH'
			}
		},
		3: {
			chainId: 3,
			chainName: "Ropsten Test Network",
			rpcUrls: ['https://ropsten.infura.io/v3/{INFURA_ID}'],
			blockExplorerUrls: ['https://ropsten.etherscan.io'],
			nativeCurrency: {
				decimals: 18,
				name: 'ETH',
				symbol: 'ETH'
			}
		},
		4: {
			chainId: 4,
			chainName: "Rinkeby Test Network",
			rpcUrls: ['https://rinkeby.infura.io/v3/{INFURA_ID}'],
			blockExplorerUrls: ['https://rinkeby.etherscan.io'],
			nativeCurrency: {
				decimals: 18,
				name: 'ETH',
				symbol: 'ETH'
			}
		},
		42: {
			chainId: 42,
			chainName: "Kovan Test Network",
			rpcUrls: ['https://kovan.infura.io/v3/{INFURA_ID}'],
			blockExplorerUrls: ['https://kovan.etherscan.io/'],
			nativeCurrency: {
				decimals: 18,
				name: 'ETH',
				symbol: 'ETH'
			}
		},
		56: {
			chainId: 56,
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
			chainId: 97,
			chainName: 'Binance Testnet',
			rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
			blockExplorerUrls: ['https://testnet.bscscan.com'],
			nativeCurrency: {
				decimals: 18,
				name: 'BNB',
				symbol: 'BNB'
			}
		},
		137: {
			chainId: 137,
			chainName: "Polygon",
			rpcUrls: ['https://polygon-rpc.com'],
			blockExplorerUrls: ['https://polygonscan.com/'],
			nativeCurrency: {
				decimals: 18,
				name: 'MATIC',
				symbol: 'MATIC'
			}
		},
		1287: {
			chainId: 1287,
			chainName: 'Moonbeam Testnet',
			rpcUrls: ['https://rpc.testnet.moonbeam.network'],
			blockExplorerUrls: ['https://moonbase-blockscout.testnet.moonbeam.network'],
			nativeCurrency: {
				decimals: 18,
				name: 'MOON',
				symbol: 'MOON'
			}
		},
		31337: {
			chainId: 31337,
			chainName: "Amino Testnet",
			rpcUrls: ['https://leucine0.node.alphacarbon.network'],
			blockExplorerUrls: ['https://leucine0.blockscout.alphacarbon.network'],
			nativeCurrency: {
				decimals: 18,
				name: 'TACT',
				symbol: 'TACT'
			}
		},
		80001: {
			chainId: 80001,
			chainName: "Mumbai",
			rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
			blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
			nativeCurrency: {
				decimals: 18,
				name: 'MATIC',
				symbol: 'MATIC'
			}
		},
		43113: {
			chainId: 43113,
			chainName: "Avalanche FUJI C-Chain",
			rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
			blockExplorerUrls: ['https://testnet.snowtrace.io/'],
			nativeCurrency: {
				decimals: 18,
				name: 'AVAX',
				symbol: 'AVAX'
			}
		},
		43114: {
			chainId: 43114,
			chainName: "Avalanche Mainnet C-Chain",
			rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
			blockExplorerUrls: ['https://snowtrace.io/'],
			nativeCurrency: {
				decimals: 18,
				name: 'AVAX',
				symbol: 'AVAX'
			}
		},
		4002: {
			chainId: 4002,
			chainName: "Fantom Testnet",
			rpcUrls: ['https://rpc.testnet.fantom.network/'],
			blockExplorerUrls: ['https://testnet.ftmscan.com/', 'https://explorer.testnet.fantom.network/'],
			nativeCurrency: {
				decimals: 18,
				name: 'FTM',
				symbol: 'FTM'
			}
		},
		250: {
			chainId: 250,
			chainName: "Fantom Opera",
			rpcUrls: ['https://rpc.ftm.tools/'],
			blockExplorerUrls: ['https://ftmscan.com/', 'https://explorer.fantom.network/'],
			nativeCurrency: {
				decimals: 18,
				name: 'FTM',
				symbol: 'FTM'
			}
		},
		13370: {
			chainId: 13370,
			chainName: "AminoX Testnet",
			rpcUrls: ['https://aminoxtestnet.node.alphacarbon.network'],
			blockExplorerUrls: ['https://aminoxtestnet.blockscout.alphacarbon.network/'],
			nativeCurrency: {
				decimals: 18,
				name: 'TACT',
				symbol: 'TACT'
			}
		}
	}
	export enum WalletPlugin {
		MetaMask = 'metamask',
		Coin98 = 'coin98',
		TrustWallet = 'trustwallet',
		BinanceChainWallet = 'binancechainwallet',
		ONTOWallet = 'onto',
		WalletConnect = 'walletconnect',
		BitKeepWallet = 'bitkeepwallet',
		FrontierWallet = 'frontierwallet',
	}
	export type WalletPluginConfigType = { [key in WalletPlugin]?: {
		provider: () => any;
		installed: () => boolean;
		homepage?: () => string;
	} };
	export const WalletPluginConfig: WalletPluginConfigType = {
		[WalletPlugin.MetaMask]: {
			provider: () => {
				return window['ethereum']
			},
			installed: () => {
				let ethereum = window['ethereum'];
				return !!ethereum && !!ethereum.isMetaMask;
			},
			homepage: () => {
				return 'https://metamask.io/download.html'
			}
		},
		[WalletPlugin.Coin98]: {
			provider: () => {
				return window['ethereum']
			},
			installed: () => {
				let ethereum = window['ethereum'];
				return !!ethereum && (!!ethereum.isCoin98 || !!window['isCoin98']);
			},
			homepage: () => {
				return 'https://docs.coin98.com/products/coin98-wallet'
			}
		},
		[WalletPlugin.TrustWallet]: {
			provider: () => {
				return window['ethereum']
			},
			installed: () => {
				let ethereum = window['ethereum'];
				return !!ethereum && !!ethereum.isTrust;
			},
			homepage: () => {
				return 'https://link.trustwallet.com/open_url?url=' + window.location.href
			}
		},
		[WalletPlugin.BinanceChainWallet]: {
			provider: () => {
				return window['BinanceChain']
			},
			installed: () => {
				return !!window['BinanceChain'];
			},
			homepage: () => {
				return 'https://www.binance.org/en'
			}
		},
		[WalletPlugin.ONTOWallet]: {
			provider: () => {
				return window['onto']
			},
			installed: () => {
				return !!window['onto'];
			},
			homepage: () => {
				return 'https://onto.app/en/download/?mode=app'
			}
		},
		[WalletPlugin.BitKeepWallet]: {
			provider: () => {
				return window['bitkeep']['ethereum']
			},
			installed: () => {
				return !!window['isBitKeep'];
			},
			homepage: () => {
				return 'https://bitkeep.com/download?type=2'
			}
		},
		[WalletPlugin.FrontierWallet]: {
			provider: () => {
				return window['frontier']['ethereum'];
			},
			installed: () => {
				return !!window['frontier'];
			},
			homepage: () => {
				return 'https://www.frontier.xyz/browser-extension';
			}
		},
	}
	export interface IClientProviderOptions {	
		infuraId?: string;
		callWithDefaultProvider?: boolean;
		[key: string]: any;		
	}
	export class ClientSideProvider {
		protected wallet: Wallet;
		protected _events?: IClientSideProviderEvents;
		protected _options?: IClientProviderOptions;
		protected _isConnected: boolean = false;
		public provider: any;
		public readonly walletPlugin: WalletPlugin;
		public onAccountChanged: (account: string) => void;
		public onChainChanged: (chainId: string) => void;
		public onConnect: (connectInfo: any) => void;
		public onDisconnect: (error: any) => void;

		constructor(wallet: Wallet, walletPlugin: WalletPlugin, events?: IClientSideProviderEvents, options?: IClientProviderOptions) {
			this.wallet = wallet;
			this.walletPlugin = walletPlugin;
			this._events = events;
			this._options = options;
		}
		get installed(): boolean {
			return WalletPluginConfig[this.walletPlugin].installed();
		}
		initEvents() {
			let self = this;
			if (this.installed) {
				this.provider.on('accountsChanged', (accounts) => {
					let accountAddress;
					let hasAccounts = accounts && accounts.length > 0;
					if (hasAccounts) {
						accountAddress = self.wallet.web3.utils.toChecksumAddress(accounts[0]);
						(<any>self.wallet.web3).selectedAddress = accountAddress;
						self.wallet.account = {
							address: accountAddress
						};
					}
					this._isConnected = hasAccounts;
					if (self.onAccountChanged)
						self.onAccountChanged(accountAddress);
				});
				this.provider.on('chainChanged', (chainId) => {
					self.wallet.chainId = parseInt(chainId);
					if (this._options && this._options.callWithDefaultProvider) {
						if (this._options.infuraId) this.wallet.infuraId = this._options.infuraId;
						self.wallet.setDefaultProvider();
					}
					if (self.onChainChanged)
						self.onChainChanged(chainId);
				});
				this.provider.on('connect', (connectInfo) => {
					if (self.onConnect)
						self.onConnect(connectInfo);
				});
				this.provider.on('disconnect', (error) => {
					if (self.onDisconnect)
						self.onDisconnect(error);
				});
			};
		}
		async connect() {
			this.provider = WalletPluginConfig[this.walletPlugin].provider();
			this.wallet.chainId = parseInt(this.provider.chainId, 16);
			this.wallet.web3.setProvider(this.provider);
			if (this._events) {
				this.onAccountChanged = this._events.onAccountChanged;
				this.onChainChanged = this._events.onChainChanged;
				this.onConnect = this._events.onConnect;
				this.onDisconnect = this._events.onDisconnect;
			}
			this.initEvents();
			let self = this;
			try {
				if (this.installed) {
					await this.provider.request({ method: 'eth_requestAccounts' }).then((accounts) => {
						let accountAddress;
						let hasAccounts = accounts && accounts.length > 0;
						if (hasAccounts) {
							accountAddress = self.wallet.web3.utils.toChecksumAddress(accounts[0]);
							(<any>self.wallet.web3).selectedAddress = accountAddress;
							self.wallet.account = {
								address: accountAddress
							};
						}
						this._isConnected = hasAccounts;
						if (self.onAccountChanged)
							self.onAccountChanged(accountAddress);
					});
				}
			} catch (error) {
				console.error(error);
			}
			return this.provider;
		}
		async disconnect() {
			if (this.provider == null) {
				return;
			}
			if (this.provider.disconnect) {
				await this.provider.disconnect()
			}
			this.wallet.account = null;
			this._isConnected = false;
		}
		get isConnected() {
			return this._isConnected;
		}
		addToken(option: ITokenOption, type?: string): Promise<boolean> {
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
					reject(err)
				}
			})
		}
		switchNetwork(chainId: number, onChainChanged?: (chainId: string) => void): Promise<boolean> {
			let self = this;
			if (onChainChanged) {
				this.onChainChanged = onChainChanged;
			}
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
					} catch (error) {
						if (error.code === 4902) {
							try {
								let network = self.wallet.networksMap[chainId];
								if (!network) resolve(false);
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
							} catch (error) {
								reject(error);
							}
						} else
							reject(error);
					}
				}
				catch (err) {
					reject(err)
				}
			})
		}
		addNetwork(options: INetwork): Promise<boolean> {
			return new Promise(async function (resolve, reject) {
				try {
					options = JSON.parse(JSON.stringify(options));
					let chainIdHex = '0x' + options.chainId.toString(16)
					try {
						await this.provider.request({
							method: 'wallet_switchEthereumChain',
							params: [{ chainId: chainIdHex }],
						});
						resolve(true);
					}
					catch (err) {
						let result = await this.provider.request({
							method: 'wallet_addEthereumChain',
							params: [
								options
							],
						});
						resolve(!result);
					}
				}
				catch (err) {
					reject(err)
				}
			})
		}
	}
	export class BinanceChainWalletProvider extends ClientSideProvider {
		switchNetwork(chainId: number, onChainChanged?: (chainId: string) => void): Promise<boolean> {
			let self = this;
			if (onChainChanged) {
				this.onChainChanged = onChainChanged;
			}
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
					} catch (error) {
						if (error.code === 4902) {
							try {
								let network = self.wallet.networksMap[chainId];
								if (!network) resolve(false);
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
							} catch (error) {
								reject(error);
							}
						} else
							reject(error);
					}
				}
				catch (err) {
					reject(err)
				}
			})
		}
	}
	export class Web3ModalProvider extends ClientSideProvider {
		private web3Modal: any;
		constructor(wallet: Wallet, walletPlugin: WalletPlugin, events?: IClientSideProviderEvents, options?: IClientProviderOptions) {
			super(wallet, walletPlugin, events);
			this.initializeWeb3Modal(options);
		}
		get installed(): boolean {
			return true;
		}
		private initializeWeb3Modal(options?: IClientProviderOptions): any {
			let func = () => {
				WalletConnectProvider = window["WalletConnectProvider"];
				const providerOptions = {
					walletconnect: {
						package: WalletConnectProvider.default,
						options
					}
				};
				Web3Modal = window["Web3Modal"]
				this.web3Modal = new Web3Modal.default({
					cacheProvider: false,
					providerOptions,
				});
			}
			initWeb3ModalLib(func);
		}
		async connect() {
			await this.disconnect();
			this.provider = await this.web3Modal.connectTo(WalletPlugin.WalletConnect);
			this.wallet.chainId = this.provider.chainId;
			this.wallet.web3.setProvider(this.provider);
			if (this._events) {
				this.onAccountChanged = this._events.onAccountChanged;
				this.onChainChanged = this._events.onChainChanged;
				this.onConnect = this._events.onConnect;
				this.onDisconnect = this._events.onDisconnect;
			}
			this.initEvents();
			let self = this;
			try {
				await this.wallet.web3.eth.getAccounts((err, accounts) => {
					let accountAddress;
					let hasAccounts = accounts && accounts.length > 0;
					if (hasAccounts) {
						accountAddress = self.wallet.web3.utils.toChecksumAddress(accounts[0]);
						(<any>self.wallet.web3).selectedAddress = accountAddress;
						this.wallet.account = {
							address: accountAddress
						};
					}
					this._isConnected = hasAccounts;
					if (self.onAccountChanged)
						self.onAccountChanged(accountAddress);
				});
			} catch (error) {
				console.error(error);
			}
			return this.provider;
		}
		async disconnect() {
			if (this.provider == null) {
				return;
			}
			if (this.provider.disconnect) {
				await this.provider.disconnect()
			}
			this.wallet.account = null;
			this._isConnected = false;
		}
	}
	export function createClientSideProvider(wallet: Wallet, walletPlugin: WalletPlugin, events?: IClientSideProviderEvents, providerOptions?: IClientProviderOptions) {
		if (Wallet.isInstalled(walletPlugin)) {
			if (walletPlugin == WalletPlugin.BinanceChainWallet) {
				return new BinanceChainWalletProvider(wallet, walletPlugin, events, providerOptions);
			}
			if (walletPlugin == WalletPlugin.WalletConnect) {
				return new Web3ModalProvider(wallet, walletPlugin, events, providerOptions);
			}
			else {
				return new ClientSideProvider(wallet, walletPlugin, events, providerOptions);
			}
		}
		return null;
	}
	export interface ISendTxEventsOptions {
		transactionHash?: (error: Error, receipt?: string) => void;
		confirmation?: (receipt: any) => void;
	};	
    export class Wallet implements IClientWallet{
		protected _web3: W3.default;		
        protected _account: IAccount;
		private _accounts: IAccount[];
		private _provider: any;
		private _eventTopicAbi: {[topic:string]:any} = {};
		private _eventHandler = {};
		protected _sendTxEventHandler: ISendTxEventsOptions = {};
		protected _contracts = {};
		protected _blockGasLimit: number;
		private _networksMap: NetworksMapType = {};    
		public chainId: number;   
		public clientSideProvider: ClientSideProvider;  
		private _infuraId: string;
		private _utils: IWalletUtils;

		constructor(provider?: any, account?: IAccount|IAccount[]){
			this._provider = provider;			
			this._web3 = new Web3(provider);
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
			}
			if (Array.isArray(account)){
				this._accounts = account;
				this._account = account[0];
			}
			else
            	this._account = account;

			if (this._account && this._account.privateKey && !this._account.address)
				this._account.address = this._web3.eth.accounts.privateKeyToAccount(this._account.privateKey).address;
			this._networksMap = DefaultNetworksMap;
		}		
		private static readonly instance: Wallet = new Wallet();
		static getInstance(): IWallet {
		  return Wallet.instance;
		}
		static getClientInstance(): IClientWallet {
			return Wallet.instance;
		  }
		static isInstalled(walletPlugin: WalletPlugin) {
			if (walletPlugin == WalletPlugin.WalletConnect) return true;
			return WalletPluginConfig[walletPlugin] ? WalletPluginConfig[walletPlugin].installed() : false;
		}
		get isConnected() {
			return this.clientSideProvider ? this.clientSideProvider.isConnected : false;
		}
		async switchNetwork(chainId: number, onChainChanged?: (chainId: string) => void) {
			let result;
			if (this.clientSideProvider) {
				result = await this.clientSideProvider.switchNetwork(chainId, onChainChanged);
			}
			else {
				this.chainId = chainId;
				this.setDefaultProvider();
				onChainChanged('0x' + chainId.toString(16));
			}
			return result;
		}
		setDefaultProvider(){
			if (!this.chainId) this.chainId = 56;	
			if (this._networksMap[this.chainId] && this._networksMap[this.chainId].rpcUrls.length > 0) {
				let rpc = this._networksMap[this.chainId].rpcUrls[0];
				if (rpc.indexOf('{INFURA_ID}')) {
					rpc = rpc.replace('{INFURA_ID}', this._infuraId??'');
				}
				this.provider = rpc;
			}
		}
		async connect(walletPlugin: WalletPlugin, events?: IClientSideProviderEvents, providerOptions?: IClientProviderOptions) {
			this.clientSideProvider = createClientSideProvider(this, walletPlugin, events, providerOptions);
			if (this.clientSideProvider) {
				await this.clientSideProvider.connect();
				if (providerOptions && providerOptions.callWithDefaultProvider) {
					if (providerOptions.infuraId) this._infuraId = providerOptions.infuraId;
					this.setDefaultProvider();
				}
				else {
					this.provider = this.clientSideProvider.provider;
				}
			}
			else {
				this.setDefaultProvider();
			}
			return this.clientSideProvider;
		}
		async disconnect(){
			if (this.clientSideProvider) {
				await this.clientSideProvider.disconnect();
			}
			this.setDefaultProvider();
		}
		get accounts(): Promise<string[]>{
			return new Promise((resolve)=>{
				if (this._accounts){
					let result = [];
					for (let i = 0; i < this._accounts.length; i ++){
						if (!this._accounts[i].address && this._accounts[i].privateKey )
							this._accounts[i].address = this._web3.eth.accounts.privateKeyToAccount(this._accounts[i].privateKey).address
						result.push(this._accounts[i].address)
					}
					return resolve(result);
				}
				else if (this._account)
					return resolve([this._account.address]);
				resolve(this._web3.eth.getAccounts())
			});
		}
		get address(): string{			
        	if (this._account && this._account.privateKey){
				if (!this._account.address)
					this._account.address = this._web3.eth.accounts.privateKeyToAccount(this._account.privateKey).address;
        		return this._account.address;
        	}
			else if ((<any>this._web3).selectedAddress){				
				return (<any>this._web3).selectedAddress
			}
			else if (this._web3.eth.defaultAccount){
				return this._web3.eth.defaultAccount;
			}
			if (!this._account){        
				this._account = this.createAccount();
				return this._account.address;
			}
        	else
        		return this._account.address;
        }
		get account(): IAccount{
			return {
				address: this.address
			}
		}
        set account(value: IAccount){
			this._web3.eth.defaultAccount = '';
            this._account = value;
        }
		get infuraId() {
			return this._infuraId;
		}
		set infuraId(value: string) {
			this._infuraId = value;
			this.setDefaultProvider();
		}
		get networksMap() {
			return this._networksMap;
		}
		getNetworkInfo(chainId: number){
			return this._networksMap[chainId];
		}
		setNetworkInfo(network: INetwork){
			this._networksMap[network.chainId] = network;
		}
		setMultipleNetworksInfo(networks: INetwork[]){
			for (let network of networks) {
				this.setNetworkInfo(network);
			}
		}
        createAccount(): IAccount{
        	let acc = this._web3.eth.accounts.create();
        	return {
        		address: acc.address,
        		privateKey: acc.privateKey
        	};
        };
		decodeLog(inputs: any, hexString: string, topics: any): any{
			return this.web3.eth.abi.decodeLog(inputs, hexString, topics)
		};
		get defaultAccount(): string{
			if (this._account)
				return this._account.address
			return this._web3.eth.defaultAccount;
		}
		set defaultAccount(address: string){
			if (this._accounts){
				for (let i = 0; i < this._accounts.length; i ++){
					if (!this._accounts[i].address && this._accounts[i].privateKey)
						this._accounts[i].address = this._web3.eth.accounts.privateKeyToAccount(this._accounts[i].privateKey).address;
					if (this._accounts[i].address && this._accounts[i].address.toLowerCase() == address.toLowerCase()){
						this._account = this._accounts[i];
						return;
					}
				}
			}
			else if (this._account && this._account.address && this._account.address.toLowerCase() == address.toLowerCase()){
				return;
			}
			else
				this._web3.eth.defaultAccount = address;
		}
		async getChainId(){
			if (!this.chainId)
				this.chainId = await this._web3.eth.getChainId();
			return this.chainId;
		}
		get provider(): any{
			return this._provider;
		}
		set provider(value: any){
			this._web3.setProvider(value);
			this._provider = value;
		}
		sendSignedTransaction(tx: string): Promise<TransactionReceipt>{
			let _web3 = this._web3;        	
			return _web3.eth.sendSignedTransaction(tx);
		}
		async signTransaction(tx: any, privateKey?: string): Promise<string>{
			let _web3 = this._web3;  
			// let gasPrice = tx.gasPrice ||  _web3.utils.numberToHex(await _web3.eth.getGasPrice());     	
			let gas = tx.gas || await _web3.eth.estimateGas({
				from: this.address,				
				to: tx.to,
				data: tx.data,
			})		
			let gasLimit = tx.gasLimit || gas;				
			let nonce = tx.nonce || await _web3.eth.getTransactionCount(this.address);
			if (privateKey || (this._account && this._account.privateKey)){
				let signedTx = await _web3.eth.accounts.signTransaction(<any>{
					nonce: nonce,
					// gasPrice: gasPrice,
					gas: gas,
					gasLimit: gasLimit,
					data: tx.data,
					from: this.address,
					to: tx.to
				}, privateKey?privateKey:this._account.privateKey);
				return signedTx.rawTransaction;
			}
			else{
				let t = await _web3.eth.signTransaction(<any>{
					from: this.address,
					nonce: nonce,
					// gasPrice: gasPrice,
					gasLimit: gasLimit,
					gas: gas,
					to: tx.to,
					data: tx.data
				}, this.address);
				return t.raw;
			}
		}
		registerSendTxEvents(eventsOptions: ISendTxEventsOptions) {
			this._sendTxEventHandler = eventsOptions;
		};
		private getContract(abiHash: string): IContract{
            let contract: IContract;			
			if (!this._abiContractDict[abiHash]){
				contract = this.newContract(this._abiHashDict[abiHash]);
				this._abiContractDict[abiHash] = contract;
				return contract;
			};
			return this._abiContractDict[abiHash];    
        }
		async _call(abiHash: string, address: string, methodName: string, params?:any[], options?:number|BigNumber|TransactionOptions): Promise<any>{
			if (!address || !methodName)
				throw new Error("no contract address or method name");
			let method = this._getMethod(abiHash, address, methodName, params);
            let tx:Transaction = {} as Transaction;
            tx.to = address;
            tx.data = method.encodeABI();
			if (options) {
				if (typeof options === "number") {
					tx.value = new BigNumber(options);
				} else if (BigNumber.isBigNumber(options)) {
					tx.value = options;
				} else if (options.value) {
					if (typeof options.value === "number") {
						tx.value = new BigNumber(options.value);
					} else if (BigNumber.isBigNumber(options.value)) {
						tx.value = options.value;
					}
				}
			}
			options = <TransactionOptions>options;
			tx.from = (options && options.from) || this.address;
			if (options && (options.gas || options.gasLimit)) {
                tx.gas = options.gas || options.gasLimit;			
			}
            let result = await method.call({from:this.address, ...tx});
			return result;
		}
		private _getMethod(abiHash: string, address: string, methodName:string, params?:any[]): IContractMethod{
            let contract:any = this.getContract(abiHash);
            params = params || [];
			let bytecode: string;
			if (!methodName){
				bytecode = params.shift();
				contract.options.address = undefined;
			}
			else
				contract.options.address = address;

			let abi = this._abiHashDict[abiHash];
            let methodAbi = abi.find((e:any)=>methodName ? e.name==methodName : e.type=="constructor");
            if (methodAbi)
            for (let i = 0; i < methodAbi.inputs.length; i ++){
                if (methodAbi.inputs[i].type.indexOf('bytes') == 0){
                    params[i] = params[i] || '';
                    if (methodAbi.inputs[i].type.indexOf('[]') > 0){
                        let a = [];
                        for (let k = 0; k < params[i].length; k ++){
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
                else if (methodAbi.inputs[i].type == 'address'){
                    if (!params[i])
                        params[i] = Utils.nullAddress;
                }
            }

            let method: IContractMethod;
            if (!methodName)
                method = contract.deploy({data:bytecode, arguments:params});
            else
                method = contract.methods[methodName].apply(this, params);
			return method;
		}
		async _txObj(abiHash: string, address: string, methodName:string, params?:any[], options?:number|BigNumber|TransactionOptions): Promise<Transaction>{
			let method = this._getMethod(abiHash, address, methodName, params);
            let tx:Transaction = {} as Transaction;
            tx.from = this.address;
            tx.to = address || undefined;
            tx.data = method.encodeABI();
			if (options) {
				if (typeof options === "number") {
					tx.value = new BigNumber(options);
					options = undefined;
				} else if (BigNumber.isBigNumber(options)) {
					tx.value = options;
					options = undefined;
				} else if (options.value) {
					if (typeof options.value === "number") {
						tx.value = new BigNumber(options.value);
					} else if (BigNumber.isBigNumber(options.value)) {
						tx.value = options.value;
					}
				}
			}
			options = <TransactionOptions>options;
			if (options && (options.gas || options.gasLimit)) {
                tx.gas = options.gas || options.gasLimit;
            } else {
                try {
                    tx.gas = await method.estimateGas({ from: this.address, to: address ? address : undefined, value: tx.value });
                    tx.gas = Math.min(await this.blockGasLimit(), Math.round(tx.gas * 1.5));

                } catch (e) {
                    if (e.message == "Returned error: out of gas"){ // amino
                        console.log(e.message);
                        tx.gas = Math.round(await this.blockGasLimit() * 0.5);
                    } else {
                        if (e.message.includes("Returned error: execution reverted: ")) {
                            throw e;
                        }
                        try{
                            await method.call({from:this.address, ...tx});
                        } catch(e) {
                            if (e.message.includes("VM execution error.")) {
                                var msg = (e.data || e.message).match(/0x[0-9a-fA-F]+/);
                                if (msg && msg.length) {
                                    msg = msg[0];
                                    if (msg.startsWith("0x08c379a")) {
                                        msg = this.decodeErrorMessage(msg);//('string', "0x"+msg.substring(10));
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
            if (options && options.nonce){
                tx.nonce = options.nonce;
            } else {
                tx.nonce = await this.transactionCount();
            }
            return tx;
        }
		async _send(abiHash: string, address: string, methodName: string, params?:any[], options?:number|BigNumber|TransactionOptions): Promise<TransactionReceipt>{			
			let tx = await this._txObj(abiHash, address, methodName, params, options);
            let receipt = await this.sendTransaction(tx);
            return receipt;
		}
		async _txData(abiHash: string, address: string, methodName:string, params?:any[], options?:number|BigNumber|TransactionOptions): Promise<string>{
			let method = this._getMethod(abiHash, address, methodName, params);
			let data = method.encodeABI();
			return data;
		}
		async _methods(...args){
			let _web3 = this._web3;        	
			let result: any;
			let value: any;
			let method: any;
			let methodAbi: any;
			let byteCode: any;
			
			let abi = args.shift();
			let address = args.shift();
			let methodName = args.shift();
			if (methodName == 'deploy')
				byteCode = args.shift();			
			let contract;
			let hash;
			if (this._contracts[address])
				contract = this._contracts[address]
			else{
				hash = this._web3.utils.sha3(JSON.stringify(abi));
				if (this._contracts[hash]){
					contract = this._contracts[hash];
				}
			}
			if (!contract){
				contract = new this._web3.eth.Contract(abi);			
				this._contracts[address] = contract;
				this._contracts[hash] = contract;
			}
			if (methodName == 'deploy'){
				method = contract[methodName]({
					data: byteCode,
					arguments: args
				});
			}
			else {
				for (let i = 0; i < abi.length; i ++)	{
					if (abi[i].name == methodName){
						methodAbi = abi[i];
						break;
					}
				}						
				if (methodAbi.payable)
					value = args.pop();
				for (let i = 0; i < methodAbi.inputs.length; i ++){
					if (methodAbi.inputs[i].type.indexOf('bytes') == 0){
						args[i] = args[i] || '';
						if (methodAbi.inputs[i].type.indexOf('[]') > 0){
							let a = [];
							for (let k = 0; k < args[i].length; k ++){
								let s = args[i][k] || '';
								if (s.indexOf('0x') != 0)
									a.push(_web3.utils.fromAscii(s))
								else
									a.push(s);
							}
							args[i] = a;
						}
						else if (args[i].indexOf('0x') != 0)
							args[i] = _web3.utils.fromAscii(args[i]);
					}
					else if (methodAbi.inputs[i].type == 'address'){
						if (!args[i])
							args[i] = _web3.eth.abi.encodeParameter('address', 0);
					}
				}
				method = contract.methods[methodName].apply(contract, args);
			}
			// let gas = await method.estimateGas({from: this.address, value: value});
			let tx = {
				// from: this.address,
				// nonce: nonce,
				// gas: gas,
				to: address,
				data: method.encodeABI(),
			};
			return tx;							
        }
		// rollback
		async methods(...args: any): Promise<any>{
        	let _web3 = this._web3;
        	if ((<any>_web3).methods){
        		return (<any>_web3).methods.apply(_web3, args);
        	}
        	else{
        		let result: any;
        		let value: any;
        		let method: any;
        		let methodAbi: any;
        		let byteCode: any;
        		
        		let abi = args.shift();
        		let address = args.shift();
        		let methodName = args.shift();
        		if (methodName == 'deploy')
        			byteCode = args.shift();

				let contract;				
				let hash;
				if (address && this._contracts[address])
					contract = this._contracts[address]
				else{
					hash = this._web3.utils.sha3(JSON.stringify(abi));
					if (this._contracts[hash]){
						contract = this._contracts[hash];
					}
				};
				if (!contract){
					contract = new this._web3.eth.Contract(abi);			
					if (address)
						this._contracts[address] = contract;
					this._contracts[hash] = contract;
				};
				if (methodName == 'deploy'){
					method = contract[methodName]({
						data: byteCode,
						arguments: args
					});
				}
				else {
					for (let i = 0; i < abi.length; i ++)	{
						if (abi[i].name == methodName){
							methodAbi = abi[i];
							break;
						}
					}						
					if (methodAbi.payable)
						value = args.pop();
					for (let i = 0; i < methodAbi.inputs.length; i ++){
						if (methodAbi.inputs[i].type.indexOf('bytes') == 0){
							args[i] = args[i] || '';
							if (methodAbi.inputs[i].type.indexOf('[]') > 0){
								let a = [];
								for (let k = 0; k < args[i].length; k ++){
									let s = args[i][k] || '';
									if (s.indexOf('0x') != 0)
										a.push(_web3.utils.fromAscii(s))
									else
										a.push(s);
								}
								args[i] = a;
							}
							else if (args[i].indexOf('0x') != 0)
								args[i] = _web3.utils.fromAscii(args[i]);
						}
						else if (methodAbi.inputs[i].type == 'address'){
							if (!args[i])
								args[i] = _web3.eth.abi.encodeParameter('address', 0);
						}
					}					
					method = contract.methods[methodName].apply(contract, args);
				};

				contract.options.address = address;				
				if (methodAbi && (methodAbi.constant || methodAbi.stateMutability == 'view')) {
					return method.call({from: this.address});
				}				

                if (!this._blockGasLimit) {
                    this._blockGasLimit = (await _web3.eth.getBlock('latest')).gasLimit;
                }
                let gas;
                try {
                    gas = await method.estimateGas({ from: this.address, to: address, value: value });
                    gas = Math.min(this._blockGasLimit, Math.round(gas * 1.5));
                } catch (e) {
                    if (e.message == "Returned error: out of gas"){ // amino
                        console.log(e.message);
                        gas = Math.round(this._blockGasLimit * 0.5);
                    } else {
						try{
							await method.call({from:this.address, value: value});
						} catch(e) {
							if (e.message.includes("VM execution error.")) {
								var msg = (e.data || e.message).match(/0x[0-9a-fA-F]+/);
								if (msg && msg.length) {
									msg = msg[0];
									if (msg.startsWith("0x08c379a")) {
										msg = _web3.eth.abi.decodeParameter('string', "0x"+msg.substring(10));
										throw new Error(msg);
									}
								}
							}
						}
                        throw e;
                    }
                }

                let gasPrice = await _web3.eth.getGasPrice();

				if (this._account && this._account.privateKey){
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
				else{					
					contract.options.address = address;
					let nonce = await _web3.eth.getTransactionCount(this.address);
					let tx = {
						from: this.address, 
						nonce,
						gasPrice,
						gas,
						to: address,
						value,
						data: method.encodeABI(),
					}

					let promiEvent = _web3.eth.sendTransaction(tx);
					promiEvent.on('error', (error: Error) =>{
						if (error.message.startsWith("Transaction was not mined within 50 blocks")) {
							return;
						}
						if (this._sendTxEventHandler.transactionHash)
							this._sendTxEventHandler.transactionHash(error);
					});
					promiEvent.on('transactionHash', (receipt: string) => {
						if (this._sendTxEventHandler.transactionHash)
							this._sendTxEventHandler.transactionHash(null, receipt);
					});
					promiEvent.on('confirmation', (confNumber: number, receipt: any) => {           
						if (this._sendTxEventHandler.confirmation && confNumber == 1)
							this._sendTxEventHandler.confirmation(receipt);                
					});
					result = await promiEvent;
					if (methodName == 'deploy')
						return result.contractAddress;
					return result;
				}	
        	}
        };
		// end of rollback
		get balance(): Promise<BigNumber>{
			let self = this;
            let _web3 = this._web3;
			return new Promise(async function(resolve){
				try{
					let network = self._networksMap[self.chainId];
					let decimals = 18;
					if (network && network.nativeCurrency && network.nativeCurrency.decimals)
						decimals = network.nativeCurrency.decimals;
					
					let result = await _web3.eth.getBalance(self.address);	
					resolve(new BigNumber(result).div(10 ** decimals));
				}
				catch(err){
					resolve(new BigNumber(0));
				}	
			})
		};
		balanceOf(address: string): Promise<BigNumber>{
			let self = this;
            let _web3 = this._web3;
			return new Promise(async function(resolve){
				try{
					let network = self._networksMap[self.chainId];
					let decimals = 18;
					if (network && network.nativeCurrency && network.nativeCurrency.decimals)
						decimals = network.nativeCurrency.decimals;
					
					let result = await _web3.eth.getBalance(address);	
					resolve(new BigNumber(result).div(10 ** decimals));
				}
				catch(err){
					resolve(new BigNumber(0));
				}	
			})
		};
		recoverSigner(msg: string, signature: string): Promise<string>{
			let _web3 = this._web3;
			return new Promise(async function(resolve, reject){
				try{
					let signing_address = await _web3.eth.accounts.recover(msg, signature);
	        		resolve(signing_address);
				}
				catch(err){
					reject(err);
				};	
			})
        };
		getBlock(blockHashOrBlockNumber?: number | string, returnTransactionObjects?: boolean): Promise<IWalletBlockTransactionObject>{
			if (returnTransactionObjects) {
				return <any>this._web3.eth.getBlock(blockHashOrBlockNumber || 'latest', true);
			}
			return <any>this._web3.eth.getBlock(blockHashOrBlockNumber || 'latest', false);
		};
		getBlockNumber(): Promise<number>{
			return this._web3.eth.getBlockNumber();
		};		
		async getBlockTimestamp(blockHashOrBlockNumber?: number | string): Promise<number>{	
			let block = await this._web3.eth.getBlock(blockHashOrBlockNumber || 'latest', false);
			if (typeof(block.timestamp) == 'string')
				return parseInt(block.timestamp)
			else	
				return <number>block.timestamp
		};
        set privateKey(value: string){
			if (value){
				this._web3.eth.defaultAccount = '';
			}			
        	this._account = {
				address: '',
				privateKey: value
			}
        };
		registerEvent(abi: any, eventMap:{[topics:string]:any}, address: string, handler: any) {
			let hash = '';			
			if (typeof(abi) == 'string'){
				hash = this._web3.utils.sha3(abi);
				abi = JSON.parse(abi);
			} else {
				hash = this._web3.utils.sha3(JSON.stringify(abi));
			}
			this.registerAbiContracts(hash, address, handler);
			this._eventTopicAbi[hash] = {};
			for (let topic in eventMap){
				this._eventTopicAbi[hash][topic] = eventMap[topic];
			}
		};
        // rollback
		private _abiHashDict: IDictionary = {};
		private _abiContractDict: IDictionary = {};
		private _abiAddressDict: IDictionary = {};
		private _abiEventDict: IDictionary = {};
        getAbiEvents(abi: any[]): any {
        	let _web3 = this._web3;
		    let events = abi.filter(e => e.type=="event");    
		    let eventMap = {};
		
		    for (let i = 0 ; i < events.length ; i++) {
		        let topic = _web3.utils.soliditySha3(events[i].name + "(" + events[i].inputs.map(e=>e.type=="tuple" ? "("+(e.components.map(f=>f.type)) +")" : e.type).join(",") + ")");
		        eventMap[topic] = events[i];
		    }
		    return eventMap;
		};
        getAbiTopics(abi: any[], eventNames?: string[]): any[]{
			if (!eventNames || eventNames.length == 0)
				eventNames = null;
			let _web3 = this._web3;
			let result = [];
			let events = abi.filter(e => e.type=="event");			
			for (let i = 0 ; i < events.length ; i++) {
				if (!eventNames || eventNames.indexOf(events[i].name) >= 0){
					let topic = _web3.utils.soliditySha3(events[i].name + "(" + events[i].inputs.map(e=>e.type=="tuple" ? "("+(e.components.map(f=>f.type)) +")" : e.type).join(",") + ")");
					result.push(topic);
				}
		    }
			if (result.length == 0 && eventNames && eventNames.length > 0)
				return ['NULL']
		    return [result];
		};
		getContractAbi(address: string){
			return this._abiAddressDict[address];
		};
		getContractAbiEvents(address: string){
			let events = this._abiEventDict[address];
			if (events)
				return events;			
			let abi = this._abiHashDict[this._abiAddressDict[address]];
			if (abi){
				events = this.getAbiEvents(abi)
				this._abiEventDict[address] = events;
				return events;
			}
		};
		registerAbi(abi: any[] | string, address?: string|string[], handler?: any): string{
			let hash = '';			
			if (typeof(abi) == 'string'){
				hash = this._web3.utils.sha3(abi);
				abi = JSON.parse(abi);
			}else{
				hash = this._web3.utils.sha3(JSON.stringify(abi));
			}
			if (!address && !handler && this._abiHashDict[hash])
				return hash;

			let eventMap: any;
			eventMap = this.getAbiEvents(<any[]>abi);
			this._eventTopicAbi[hash] = {};
			for (let topic in eventMap){
				this._eventTopicAbi[hash][topic] = eventMap[topic];
			}
			this._abiHashDict[hash] = abi;
			if (address)
				this.registerAbiContracts(hash, address, handler);
			return hash;
		};
		registerAbiContracts(abiHash: string, address: string|string[], handler?: any){			
			if (address){
				if (!Array.isArray(address))
					address = [address];
				for (let i = 0; i < address.length; i ++){
					this._abiAddressDict[address[i]] = abiHash;
					if (handler)
						this._eventHandler[address[i]] = handler;
				}
			}
		};
		// end of rollback
		decode(abi:any, event:Log|EventLog, raw?:{data: string,topics: string[]}): Event{
			if (!raw)
				raw = event as Log;
			let d;
			try {
				if (abi) {
					d = this.web3.eth.abi.decodeLog(abi.inputs, raw.data, raw.topics.slice(1));
					if (d.__length__){
						for (let k = 0; k < d.__length__; k ++)
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
				data: d?d:raw.data,
				rawData: d?raw.data:undefined,
				logIndex: event.logIndex,
				name: abi?abi.name:undefined,
				transactionHash: event.transactionHash,
				transactionIndex: event.transactionIndex
			};
			return log;
		};
		async decodeEventData(data: Log, events?: any): Promise<Event>{
			let _web3 = this._web3;        	
			let event;
			if (events)
				event = events[data.topics[0]]
			else{
				const abiHash = this._abiAddressDict[data.address];
				if (abiHash && this._eventTopicAbi[abiHash]) {
					event = this._eventTopicAbi[abiHash][data.topics[0]];
				}
			};
			let log = this.decode(event, data);
			let handler = this._eventHandler[data.address]
			if (handler)
				await handler(this, log);
			return log;
		};
		scanEvents(params: {fromBlock: number, toBlock: number | string, topics?: any, events?: any, address?: string|string[]}): Promise<Event[]>;
        scanEvents(fromBlock: number, toBlock: number | string, topics?: any, events?: any, address?: string|string[]): Promise<Event[]>;
		scanEvents(param1: any, param2?: any | string, param3?: any, param4?: any, param5?: string|string[]): Promise<Event[]>{
			let fromBlock: number;
			let toBlock: number | string;
			let topics: any 
			let events: any 
			let address: string|string[];
			
			if (typeof(param1) == 'number'){
				fromBlock = param1;
				toBlock = param2;
				topics = param3;
				events = param4;
				address = param5;
			}
			else{
				fromBlock = param1.fromBlock;
				toBlock = param1.toBlock
				topics = param1.topics
				events = param1.events
				address = param1.address
			};
        	let _web3 = this._web3;        	
        	return new Promise(async (resolve, reject)=>{
        		try{
        			let logs = await _web3.eth.getPastLogs({
		                fromBlock: fromBlock,   
		                toBlock: toBlock,
		                address: address,
		                topics: topics?topics:null
		            });
		            let result = [];					
					// let event;
		            for (let i = 0 ; i < logs.length ; i++) {
		                let e = logs[i];				
						result.push(await this.decodeEventData(<any>e, events));
						// if (events)
		                // 	event = events[e.topics[0]]
						// else{
						// 	let _events = this.getContractAbiEvents(e.address);
						// 	if (_events)
						// 		event = _events[e.topics[0]]
						// 	else
						// 		event = null;
						// }
						// let data;
		                // if (event){
		                //     data = <any>_web3.eth.abi.decodeLog(event.inputs, e.data, e.topics.slice(1));
		                //     if (data.__length__){
		                //     	for (var k = 0; k < data.__length__; k ++)
		                //     		delete data[k];
		                //     	delete data['__length__'];
		                //     };
		                // }
						// let log = {
						// 	address: e.address,
						// 	blockNumber: e.blockNumber,
						// 	topics: e.topics,
						// 	data: data?data:e.data,
						// 	_data: data?e.data:null,
						// 	logIndex: e.logIndex,
						// 	name: event?event.name:null,
						// 	transactionHash: e.transactionHash,
						// 	transactionIndex: e.transactionIndex
						// };						
						// result.push(log);
						// let handler = this._eventHandler[e.address]
						// if (handler)
						// 	await handler(this, log);
		            }
		            resolve(result);
        		}
        		catch(err){
        			reject(err);
        		}
        	})
        };
        send(to: string, amount: number|BigNumber): Promise<TransactionReceipt>{
        	let _web3 = this._web3;
        	let address = this.address;
        	let self = this;
        	return new Promise(async function(resolve, reject){
        		try{
        			let value = _web3.utils.numberToHex(_web3.utils.toWei(amount.toString()));
        			let result;
        			if ((self._account && self._account.privateKey)){
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
						let signedTx = await _web3.eth.accounts.signTransaction(tx, self._account.privateKey);
						result = await _web3.eth.sendSignedTransaction(signedTx.rawTransaction);
						resolve(result);	
        			}
        			else{
        				result = await _web3.eth.sendTransaction({from: address, to: to, value: _web3.utils.toWei(amount.toString()).toString()});	
        				resolve(result);	
        			}
        		}
        		catch(err){					
        			reject(err);
        		}
        	})
		};
		setBlockTime(time: number): Promise<any>{
			return new Promise((resolve, reject) => {
				let method = time > 1000000000 ? 'evm_mine' : 'evm_increaseTime'; 
				(<any>this._web3.currentProvider).send({
					jsonrpc: '2.0',
					method: method,
					params: [time],
					id: new Date().getTime()
				}, 
				(err, result) => {
					if (err)
						return reject(err); 
					if (method == 'evm_mine') {
						return resolve(result);
					} else {
						(<any>this._web3.currentProvider).send({
							jsonrpc: '2.0',
							method:  'evm_mine',
							params: [],
							id: new Date().getTime()
						}, 
						(err, result) => {
							if (err)
								return reject(err); 
							return resolve(result);
						});
					}
				})
			});
		};
	    increaseBlockTime(value: number): Promise<any>{
			return new Promise((resolve, reject) => {
				(<any>this._web3.currentProvider).send({
					jsonrpc: "2.0",
					method: "evm_increaseTime",
					params: [value],
					id: new Date().getTime()
				}, (err, result) => {
					(<any>this._web3.currentProvider).send({
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
		signMessage(msg: string): Promise<string> {
			let _web3 = this._web3;
			let address = this.address;
			let self = this;
			let currentProvider = this.provider;
			if (typeof window !== "undefined" && this.clientSideProvider) {
				this.provider = this.clientSideProvider.provider;
			}
			let promise = new Promise<string>(async function(resolve, reject){
				try{
					let result;					
					if (self._account && self._account.privateKey){
						result = await _web3.eth.accounts.sign(msg, self._account.privateKey);
						resolve(result.signature);
					}
					else if (typeof window !== "undefined" && self.clientSideProvider){
						result = await _web3.eth.personal.sign(msg, address, null);
						resolve(result);
					}
					else {
						result = await _web3.eth.sign(msg, address, null);
						resolve(result);	
					}
				}	
				catch(err){
					reject(err);
				}
			})
			promise.finally(() => {
				this.provider = currentProvider;
			})
			return promise;
        };	
		signTypedDataV4(data: TypedMessage<MessageTypes>): Promise<string> {
			let self = this;
			let currentProvider = this.provider;
			this.provider = this.clientSideProvider.provider;
			let promise = new Promise<string>(async (resolve, reject) => {
				try {
					((<any>self._web3.currentProvider)).send({
						jsonrpc: "2.0",
						method: 'eth_signTypedData_v4',
						params: [
							self.defaultAccount,
							JSON.stringify(data)
						],
						id: Date.now()
					}, function (err: Error, result: any) {
						if (err)
							return reject(err);
						if (result.error)
							return reject(result.error);
						let signature = result.result;
						resolve(signature);
					});		
				} catch (e) {
					reject(e);
				}
			});
			promise.finally(() => {
				this.provider = currentProvider;
			})
			return promise;
		}			
		token(tokenAddress: string, decimals?: number): Erc20{
			return new Erc20(this, tokenAddress, decimals);
		};
		async tokenInfo(tokenAddress: string): Promise<ITokenInfo>{
			let erc20 = this.token(tokenAddress);			
			return {
				decimals: await erc20.decimals,
				name: await erc20.name,
				symbol: await erc20.symbol,
				totalSupply: await erc20.totalSupply 
			}
		};
        get utils(): IWalletUtils{
            return this._utils;
        };
		verifyMessage(account: string, msg: string, signature: string): Promise<boolean>{
			let _web3 = this._web3;
			return new Promise(async function(resolve, reject){
				try{
					let signing_address = await _web3.eth.accounts.recover(msg, signature);
	        		resolve(signing_address && account.toLowerCase() == signing_address.toLowerCase());
				}
				catch(err){
					reject(err);
				};	
			})
        };

		private _gasLimit: number;
		blockGasLimit(): Promise<number> {
			return new Promise(async (resolve,reject)=>{
				try{
					if (!this._gasLimit)
						this._gasLimit = (await this._web3.eth.getBlock('latest')).gasLimit;
					resolve(this._gasLimit);
				}catch(e){
					reject(e);
				}
			});
		};
		getGasPrice(): Promise<BigNumber> {
			return (async ()=>(new BigNumber(await this._web3.eth.getGasPrice())))();
		}
		transactionCount(): Promise<number> {
			return (async ()=>(await this._web3.eth.getTransactionCount(this.address)))();
		}
		async sendTransaction(transaction: Transaction): Promise<TransactionReceipt> {
			let _transaction = {...transaction, value:transaction.value?transaction.value.toFixed():undefined, gasPrice:transaction.gasPrice?transaction.gasPrice.toFixed():undefined};
			let currentProvider = this.provider;
			try {
				if (typeof window !== "undefined" && this.clientSideProvider) {
					this.provider = this.clientSideProvider.provider;
				}
				if (this._account && this._account.privateKey){
					let signedTx = await this._web3.eth.accounts.signTransaction(_transaction, this._account.privateKey);
					return await this._web3.eth.sendSignedTransaction(signedTx.rawTransaction);
				}
				else {
					let promiEvent = this._web3.eth.sendTransaction(_transaction);
					promiEvent.on('error', (error: Error) =>{
						if (error.message.startsWith("Transaction was not mined within 50 blocks")) {
							return;
						}
						if (this._sendTxEventHandler.transactionHash)
							this._sendTxEventHandler.transactionHash(error);
					});
					promiEvent.on('transactionHash', (receipt: string) => {
						if (this._sendTxEventHandler.transactionHash)
							this._sendTxEventHandler.transactionHash(null, receipt);
					});
					promiEvent.on('confirmation', (confNumber: number, receipt: any) => {           
						if (this._sendTxEventHandler.confirmation && confNumber == 1)
							this._sendTxEventHandler.confirmation(receipt);                
					});
					return await promiEvent;
				}
			}
			catch(err) {
				throw err;
			} finally {
				this.provider = currentProvider;
			}
		}
		async getTransaction(transactionHash: string): Promise<Transaction> {
			let web3Receipt = await this._web3.eth.getTransaction(transactionHash);
			return {
				from: web3Receipt.from,
				to: web3Receipt.to,
				nonce: web3Receipt.nonce,
				gas: web3Receipt.gas,
				gasPrice: new BigNumber(web3Receipt.gasPrice),
				data: web3Receipt.input,
				value: new BigNumber(web3Receipt.value)
			}
		}
		getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt> {
			return this._web3.eth.getTransactionReceipt(transactionHash);
		}
		call(transaction: Transaction): Promise<any> {
			let _transaction = {...transaction, value:transaction.value?transaction.value.toFixed():undefined, gasPrice:transaction.gasPrice?transaction.gasPrice.toFixed():undefined};
			return this._web3.eth.call(_transaction);
		}
		newContract(abi:any, address?:string): IContract {
			return new this._web3.eth.Contract(abi, address);
		}
		decodeErrorMessage(msg: string): any {
			return this._web3.eth.abi.decodeParameter('string', "0x"+msg.substring(10));
		}
        async newBatchRequest(): Promise<IBatchRequestObj> {
            return new Promise((resolve, reject) => {
                try {            
                    resolve({
                        batch: new this._web3.BatchRequest(),
                        promises: [],
                        execute: (batch: any, promises: any[]) => {
                            batch.execute(); 
                            return Promise.all(promises);
                        }
                    });
                } catch (e) {
                    reject(e)
                }
            });
        }		
		soliditySha3(...val: any[]) {
			return this._web3.utils.soliditySha3(...val);
		}
		toChecksumAddress(address: string) {
			return this._web3.utils.toChecksumAddress(address);
		}
		async multiCall(calls: {to: string; data: string}[], gasBuffer?: string) {
			const chainId = await this.getChainId();
			const contractAddress = Utils.getMultiCallAddress(chainId);
			if (!contractAddress) return null;
			const multiCall = new MultiCall(this, contractAddress);
			const result = await multiCall.multicallWithGasLimitation.call({
				calls,
				gasBuffer: new BigNumber(gasBuffer??'3000000')
			});
			return result;
		}
		encodeFunctionCall<T extends IAbiDefinition, F extends Extract<keyof T, { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]>>(
			contract: T, 
			methodName: F, 
			params: string[]
		) {
			const abi = contract._abi.find(v => v.name == methodName);
			return abi ? this._web3.eth.abi.encodeFunctionCall(abi, params) : '';
		}
		public get web3(): W3.default{
			return this._web3;
		}
	}
// };
// export = Wallet;