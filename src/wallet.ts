/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/

let Web3 = initWeb3Lib(); // tslint:disable-line
import {IWeb3, ConfirmationObject, TransactionReceipt, PromiEvent} from './web3';
import {BigNumber} from 'bignumber.js';
import {MultiCall} from './contracts';
import {Erc20} from './contracts/erc20';
import * as Utils from "./utils";
import { IAbiDefinition, MessageTypes, TypedMessage, INacl } from './types';
import { EventBus, IEventBusRegistry } from './eventBus';
import { ClientWalletEvent, RpcWalletEvent } from './constants';
import Providers from "./providers.json";

export {TransactionReceipt, ConfirmationObject};

let Web3Modal: any;

const RequireJS = {    
    require(reqs:string[], callback:any):void {
        (<any>window.require)(reqs, callback);
    }
};
let currentModuleDir: string;
if (typeof window !== "undefined" && window["application"]){
	currentModuleDir = window["application"].currentModuleDir;
};
function initWeb3Lib(){
	if (typeof window !== "undefined"){
		Web3 = window["Web3"];
        return window["Web3"]
	}
	else{
		let {Web3} = require("./web3");
		return Web3;
	};
};
function initWeb3ModalLib(callback: () => void){
	if (typeof window !== "undefined") {
		RequireJS.require(['@ijstech/eth-wallet-web3modal'], (web3modal) => {
			window["@ijstech/eth-wallet-web3modal"] = web3modal;
			callback();
		})		
	};
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
		nonce: bigint;
		blockHash: string | null;
		blockNumber: bigint | null;
		transactionIndex: bigint | null;
		from: string;
		to: string | null;
		value: BigNumber;
		gasPrice: BigNumber;
		maxPriorityFeePerGas?: bigint | string | BigNumber;
		maxFeePerGas?: bigint | string | BigNumber;
		gas: bigint;
		input: string;
	}
	export interface IWalletBlockTransactionObject {
		number: bigint;
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
		gasLimit: bigint;
		gasUsed: bigint;
		timestamp: bigint | string;
		baseFeePerGas?: bigint;
		size: bigint;
		difficulty: bigint;
		totalDifficulty: bigint;
		uncles: string[];
		transactions: IWalletTransaction[];
	}
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
	export interface IConnectWalletEventPayload {
		userTriggeredConnect?: boolean;
		[key: string]: any;	
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
		scanEvents(fromBlock: number, toBlock?: number | string, topics?: any, events?: any, address?: string | string[]): Promise<Event[]>;
		scanEvents(params: {fromBlock: number, toBlock?: number | string, topics?: any, events?: any, address?: string | string[]}): Promise<Event[]>;
		signMessage(msg: string): Promise<string>;
		signTransaction(tx: any, privateKey?: string): Promise<string>;
		soliditySha3(...val: any[]): string;
		toChecksumAddress(address: string): string;
		isAddress(address: string): boolean;
		tokenInfo(address: string): Promise<ITokenInfo>;
		_txData(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<string>;
		_txObj(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<Transaction>;
		utils: IWalletUtils;
		verifyMessage(account: string, msg: string, signature: string): Promise<boolean>;
		multiCall(calls: {to: string; data: string}[], gasBuffer?: string): Promise<{results: string[]; lastSuccessIndex: BigNumber}>;
		doMulticall(
			contracts: IMulticallContractCall[], 
			gasBuffer?: string
		): Promise<any[]>;
		encodeFunctionCall<T extends IAbiDefinition, F extends Extract<keyof T, { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]>>(
			contract: T, 
			methodName: F, 
			params: string[]
		): string;
		decodeAbiEncodedParameters<T extends IAbiDefinition, F extends Extract<keyof T, { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]>>(
			contract: T, 
			methodName: F, 
			hexString: string
		): any;
	};
	export interface IClientWallet extends IWallet {	
		init(): Promise<void>;
		blockGasLimit(): Promise<number>;
		clientSideProvider: IClientSideProvider;
		initClientWallet(config: IClientWalletConfig): void;
		connect(clientSideProvider: IClientSideProvider, eventPayload?: Record<string, any>): Promise<any>;
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
        switchNetwork(chainId: number): Promise<boolean>;        
        transactionCount(): Promise<number>;   
		getNetworkInfo(chainId: number): INetwork;
		setNetworkInfo(network: INetwork): void;
		setMultipleNetworksInfo(networks: INetwork[]): void;
		registerWalletEvent(sender: any, event: string, callback: Function): IEventBusRegistry;
		// registerRpcWalletEvent(sender: any, instanceId: string, event: string, callback: Function): IEventBusRegistry;
		unregisterWalletEvent(registry: IEventBusRegistry): void;
		unregisterAllWalletEvents(): void;
		destoryRpcWalletInstance(instanceId: string): void;
		initRpcWallet(config: IRpcWalletConfig): string;
		encrypt: (key: string) => Promise<string>;
		decrypt: (data: string) => Promise<string>;
	};
	export interface IRpcWallet extends IWallet {
		init(): Promise<void>;
		instanceId: string;  
		isConnected: boolean;
		switchNetwork(chainId: number): Promise<boolean>;  
		registerWalletEvent(sender: any, event: string, callback: Function): IEventBusRegistry;
		unregisterAllWalletEvents(): void;
		unregisterWalletEvent(registry: IEventBusRegistry): void;
	}
	export interface IContractMethod {
		call: any;
		estimateGas(...params:any[]): Promise<bigint>;
		encodeABI(): string;
	}
	export interface IContract {
		deploy(params: {data: string, arguments?: any[]}): IContractMethod;
		methods: {[methodName: string]: (...params:any[]) => IContractMethod};
		options: {address: string};
	}
    export interface Event{
		name: string;
        address: string;
        blockNumber: bigint;
		logIndex: bigint;
		topics: string[];
        transactionHash: string;
        transactionIndex: bigint;        
        data: any;
		rawData: any;
	}
    export interface Log {
	    address: string;
	    data: string;
	    topics: Array <string>;
        logIndex: bigint;
	    transactionHash?: string;
	    transactionIndex: bigint;
	    blockHash?: string;
	    type?: string;
	    blockNumber: bigint;
	}
	export interface EventLog {
	    event: string
	    address: string
	    returnValues: any
	    logIndex: bigint
	    transactionIndex: bigint
	    transactionHash: string
	    blockHash: string
	    blockNumber: bigint
	    raw ? : {
	        data: string,
	        topics: string[]
	    }
	}
    // export interface TransactionReceipt {
	//     transactionHash: string;
	//     transactionIndex: number;
	//     blockHash: string;
	//     blockNumber: number;
	//     from: string;
	//     to: string;
	//     contractAddress?: string;
	//     cumulativeGasUsed: number;
	//     gasUsed: number;
	//     logs ? : Array <Log>;
    //     events ? : {
    //         [eventName: string]: EventLog | EventLog[]
    //     };
    //     status: boolean;
	// }
	export interface Transaction{
		from?: string;
		to?: string;
		nonce?: number;
		gas?: number;
		gasLimit?: number;
		gasPrice?: BigNumber | number;
		data?: string;
		value?: BigNumber | number;
	}
	export interface TransactionOptions {
		from?: string;
		to?: string;
		nonce?: number;
		gas?: number;
		gasLimit?: number;
		gasPrice?: string | BigNumber | number;
		data?: string;
		value?: BigNumber | number | string;
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
			return new BigNumber(Web3.utils.fromWei(value))
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
		image?: string;
		//Same as the AddEthereumChainParameter interface at https://docs.metamask.io/guide/rpc-api.html 
		networkCode?: string;
		networkType?: string;
		chainId?: number; 
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
	export interface IMulticallInfo {
		chainId: number; 
		contractAddress: string;
		gasBuffer: string;
	}
	export type NetworksMapType = { [chainId: number]: INetwork }
	export type MulticallInfoMapType = { [chainId: number]: IMulticallInfo }
	export interface IMulticallContractCall {
		to: string;
		contract: IAbiDefinition;
		methodName: string;
		params: any[];
	}
	export interface IRpcWalletConfig {
		networks: INetwork[];
		defaultChainId?: number;
		infuraId: string;
		multicalls?: IMulticallInfo[];
	}
	export interface IClientWalletConfig {
		defaultChainId: number;
		networks: INetwork[];
		infuraId: string;
		multicalls?: IMulticallInfo[];
	}
	export interface IClientProviderOptions {	
		name?: string;
		image?: string;
		infuraId?: string;
		useDefaultProvider?: boolean;
		[key: string]: any;		
	}
	export interface IClientSideProvider {
		name: string;
		displayName: string;
		provider: any;
		selectedAddress: string;
		image: string;
		homepage?: string;
		events?: IClientSideProviderEvents;
		options?: IClientProviderOptions;
		installed(): boolean;
		isConnected(): boolean;
		connect: (eventPayload?: Record<string, any>) => Promise<void>;
		disconnect: () => Promise<void>;
		switchNetwork?: (chainId: number, onChainChanged?: (chainId: string) => void) => Promise<boolean>;
		encrypt: (key: string) => Promise<string>;
		decrypt: (data: string) => Promise<string>;
	}
	export class EthereumProvider implements IClientSideProvider {
		protected wallet: Wallet;
		protected _events?: IClientSideProviderEvents;
		protected _options?: IClientProviderOptions;
		protected _isConnected: boolean = false;
		protected _name: string;
		protected _image: string;
		protected _selectedAddress: string;
		public onAccountChanged: (account: string) => void;
		public onChainChanged: (chainId: string) => void;
		public onConnect: (connectInfo: any) => void;
		public onDisconnect: (error: any) => void;
		private handleAccountsChanged: (accounts: string[]) => void;
		private handleChainChanged: (chainId: string) => void;
		private handleConnect: (connectInfo: any) => void;
		private handleDisconnect: (error: any) => void;

		constructor(wallet: Wallet, events?: IClientSideProviderEvents, options?: IClientProviderOptions) {
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

		protected toChecksumAddress(address: string) {
			address = address.toLowerCase().replace('0x','');
			let sha3 = window['sha3'];
			let hash = sha3.keccak256(address);
			let ret = '0x';
			
			for (let i = 0; i < address.length; i++) {
			  if (parseInt(hash[i], 16) >= 8) {
				ret += address[i].toUpperCase();
			  } else {
				ret += address[i];
			  }
			}
		  
			return ret;
		}
		protected removeListeners() {
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
		private _handleAccountsChanged(accounts: string[], eventPayload?: Record<string, any>) {
			let accountAddress;
			let hasAccounts = accounts && accounts.length > 0;
			if (hasAccounts) {
				this._selectedAddress = this.toChecksumAddress(accounts[0]);
				accountAddress = this._selectedAddress;
				if (this.wallet.web3) {
					(<any>this.wallet.web3).selectedAddress = this._selectedAddress;
				}
				this.wallet.account = {
					address: accountAddress
				};
			}
			this._isConnected = hasAccounts;
			EventBus.getInstance().dispatch(ClientWalletEvent.AccountsChanged, {
				...eventPayload,
				account: accountAddress
			});
			//TODO: check if this is needed
			if (this.onAccountChanged)
				this.onAccountChanged(accountAddress);
		}
		protected initEvents() {
			let self = this;
			if (this.installed()) {
				this.removeListeners();
				this.handleAccountsChanged = (accounts) => {
					self._handleAccountsChanged(accounts);
				};
				this.handleChainChanged = (chainId) => {
					self.wallet.chainId = parseInt(chainId);
					if (this._options && this._options.useDefaultProvider) {
						if (this._options.infuraId) this.wallet.infuraId = this._options.infuraId;
						self.wallet.setDefaultProvider();
					}
					EventBus.getInstance().dispatch(ClientWalletEvent.ChainChanged, chainId);
					if (self.onChainChanged)
						self.onChainChanged(chainId);
				};
				this.handleConnect = (connectInfo) => {
					EventBus.getInstance().dispatch(ClientWalletEvent.Connect, connectInfo);
					if (self.onConnect)
						self.onConnect(connectInfo);
				}
				this.handleDisconnect = (error) => {
					this._isConnected = false;
					EventBus.getInstance().dispatch(ClientWalletEvent.Disconnect, error);
					if (self.onDisconnect)
						self.onDisconnect(error);
				}
				this.provider.on('accountsChanged', this.handleAccountsChanged);
				this.provider.on('chainChanged', this.handleChainChanged);
				this.provider.on('connect', this.handleConnect);
				this.provider.on('disconnect', this.handleDisconnect);
			};
		}
		async connect(eventPayload?: IConnectWalletEventPayload) {
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
					if (eventPayload?.userTriggeredConnect) {
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
				try {
					await this.provider.disconnect()
				}
				catch (error) {
					console.error(error);
				}
			}
			this.wallet.account = null;
			this._isConnected = false;
			await this.provider.request({
				method: "wallet_revokePermissions",
				params: [
					{
						eth_accounts: {},
					},
				],
			});
		}
		isConnected() {
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
		switchNetwork(chainId: number): Promise<boolean> {
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
		encrypt(key: string): Promise<string> {
			throw new Error("Method not implemented.");
		}
		decrypt(data: string): Promise<string> {
			throw new Error("Method not implemented.");
		}
	}
	export class MetaMaskProvider extends EthereumProvider {
		get displayName() {
			return Providers.MetaMask.displayName;
		}
		get image() {
			return Providers.MetaMask.image;
		}
		get homepage() {
			return Providers.MetaMask.homepage;
		}
		installed() {
			let ethereum = window['ethereum'];
			return !!ethereum && !!ethereum.isMetaMask;
		}
		async encrypt(key: string): Promise<string> {
			// get public key
			let response = await new Promise((resolve, reject) => {
				(<any>this.provider).send({
					jsonrpc: '2.0',
					id: new Date().getTime(),
					method: 'eth_getEncryptionPublicKey',
					params: [this.wallet.address]
				},
					(error: any, result: any) => {
						if (error) return reject(error);
						if (typeof result === 'string') result = JSON.parse(result);
						if (result.error) return reject(result.error)
						resolve(result);
					});
			});

			// key is in base64
			let publicKey = new Uint8Array(
				window.atob((response as any).result)
					.split('').map(e => e.codePointAt(0) as number)
			);

			// nonce 192 bit / 24 bytes
			// ephemPublicKey 256 bit / 32 bytes
			// encKey 32+16
			const encoder = new TextEncoder();
			const msg = encoder.encode(key);
			let nacl: INacl = window['nacl'];
			const nonce = nacl.randomBytes(nacl.box.nonceLength);
			const ephemeralKeyPair = nacl.box.keyPair();
			const encKey = nacl.box(msg, nonce, publicKey, ephemeralKeyPair.secretKey);
			return Utils.uint8ArrayToHex(nonce) +
				Utils.uint8ArrayToHex(ephemeralKeyPair.publicKey) +
				Utils.uint8ArrayToHex(encKey);			
		}
		async decrypt(data: string): Promise<string> {
			let encMsg = Utils.stringToUnicodeHex(JSON.stringify({
				version: 'x25519-xsalsa20-poly1305',
				nonce: window.btoa(Utils.hexToString(data.substring(0, 48))),
				ephemPublicKey: window.btoa(Utils.hexToString(data.substring(48, 112))),
				ciphertext: window.btoa(Utils.hexToString(data.substring(112)))
			}));
			let msg = await new Promise((resolve, reject) => {
				(<any>this.provider).send({
					jsonrpc: '2.0',
					id: new Date().getTime(),
					method: 'eth_decrypt',
					params: [encMsg, this.wallet.address]
				},
					(error: any, result: any) => {
						if (error) return reject(error);
						if (typeof result === 'string') result = JSON.parse(result);
						if (result.error) return reject(result.error)
						resolve(result);
					});
			});
			return (msg as any).result;			
		}
	}
	export class Web3ModalProvider extends EthereumProvider {
		private _provider: any;

		constructor(wallet: Wallet, events?: IClientSideProviderEvents, options?: IClientProviderOptions) {
			super(wallet, events, options);
		}
		get name() {
			return 'walletconnect';
		}
		get displayName() {
			return Providers.Web3Modal.displayName;
		}
		get provider() {
			return this._provider;
		}
		get image() {
			return Providers.Web3Modal.image;
		}
		get homepage() {
			return null;
		}
		installed(): boolean {
			return true;
		}
		get options() {
			return this._options;
		}
		private initializeWeb3Modal(options?: IClientProviderOptions): any {
			let func = () => {
				Web3Modal = window["@ijstech/eth-wallet-web3modal"].EthereumProvider;
			}
			initWeb3ModalLib(func);
		}
		async connect(eventPayload?: IConnectWalletEventPayload) {
			if (!this._provider) {
				this.initializeWeb3Modal(this._options);
			}			
			await this.disconnect();
			this._provider = await Web3Modal.init({
				showQrModal: true,
				qrModalOptions: { themeMode: "light" },
				methods: ["eth_sendTransaction", "personal_sign"],
				events: ["chainChanged", "accountsChanged"],
				...this._options
			});
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
						(<any>self.wallet.web3).selectedAddress = this._selectedAddress;
					}
					this.wallet.account = {
						address: accountAddress
					};
					EventBus.getInstance().dispatch(ClientWalletEvent.AccountsChanged, {
						...eventPayload,
						account: accountAddress
					});
					//TODO: check if this is needed
					if (self.onAccountChanged)
						self.onAccountChanged(accountAddress);
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
				try {
					await this.provider.disconnect()
				}
				catch (error) {
					console.error(error);
					//Workaround to clear WalletConnect session manually
					Object.keys(localStorage)
						.filter(key => key.startsWith("wc@2:"))
						.forEach(key => localStorage.removeItem(key));
				}
			}
			this.wallet.account = null;
			this._isConnected = false;
		}
	}
	export interface ISendTxEventsOptions {
		transactionHash?: (error: Error, receipt?: string) => void;
		confirmation?: (receipt: any) => void;
	};	
    export class Wallet implements IClientWallet{
		protected _web3: IWeb3;
        protected _account: IAccount;
		private _accounts: IAccount[];
		protected _provider: any;
		private _eventTopicAbi: {[topic:string]:any} = {};
		private _eventHandler: {[address: string]: any[]} = {};
		protected _sendTxEventHandler: ISendTxEventsOptions = {};
		protected _contracts = {};
		protected _blockGasLimit: number;
		private _networksMap: NetworksMapType = {};    
		private _multicallInfoMap: MulticallInfoMapType = {};
		public chainId: number;   
		public clientSideProvider: IClientSideProvider;  
		private _infuraId: string;
		protected _utils: IWalletUtils;
		private static _rpcWalletPoolMap: Record<string, IRpcWallet> = {};
		protected _walletEventIds: Set<number> = new Set<number>();

		constructor(provider?: any, account?: IAccount|IAccount[]){
			this._provider = provider;	
			if (Array.isArray(account)){
				this._accounts = account;
				this._account = account[0];
			}
			else{
            	this._account = account;
			};
			if (Web3)
				this.init();
		};	
		private static readonly instance: Wallet = new Wallet();
		static getInstance(): IWallet {
		  return Wallet.instance;
		}
		static getClientInstance(): IClientWallet {
			return Wallet.instance;
		}
		static getRpcWalletInstance(instanceId: string): IRpcWallet {
			return Wallet._rpcWalletPoolMap[instanceId];
		}
		static async initWeb3(){
			if (!Web3 && currentModuleDir && !window['Web3']){
				await window['application'].loadScript(currentModuleDir + '/web3.js');
				Web3 = initWeb3Lib();
				Utils.initWeb3Lib();
			};
		};
		async init(){
			if (!this._web3){
				if (!Web3 && currentModuleDir && !window['Web3']){
					await window['application'].loadScript(currentModuleDir + '/web3.js');
					Web3 = initWeb3Lib();
					Utils.initWeb3Lib();
				};
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
			};
		};
		get isConnected() {
			return this.clientSideProvider ? this.clientSideProvider.isConnected() : false;
		}
		async switchNetwork(chainId: number) {
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
		initClientWallet(config: IClientWalletConfig) {			
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
		registerWalletEvent(sender: any, event: string, callback: Function): IEventBusRegistry {
			const registry = EventBus.getInstance().register(sender, event, callback);
			this._walletEventIds.add(registry.id);
			return registry;
		};
		unregisterWalletEvent(registry: IEventBusRegistry) {
			registry.unregister();
			this._walletEventIds.delete(registry.id);
		}
		unregisterAllWalletEvents() {
			const eventBus = EventBus.getInstance();
			this._walletEventIds.forEach(id => {
				eventBus.unregister(id);
			});
			this._walletEventIds.clear();
		}
		destoryRpcWalletInstance(instanceId: string) {
			delete Wallet._rpcWalletPoolMap[instanceId];
		}
		private generateUUID(): string {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		}
		//To be removed
		initRpcWallet(config: IRpcWalletConfig): string {
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
		setDefaultProvider(){
			if (this._networksMap[this.chainId] && this._networksMap[this.chainId].rpcUrls.length > 0) {
				let rpc = this._networksMap[this.chainId].rpcUrls[0];
				if (!rpc || (rpc.indexOf('{INFURA_ID}') && !this._infuraId)) {
				}
				else {
					if (rpc.indexOf('{INFURA_ID}')) {
						rpc = rpc.replace('{INFURA_ID}', this._infuraId??'');
					}
					this.provider = rpc;
				}
			}
		}
		async connect(clientSideProvider: IClientSideProvider, eventPayload?: IConnectWalletEventPayload) {
			this.clientSideProvider = clientSideProvider;
			await this.clientSideProvider.connect(eventPayload);
			
			const providerOptions = this.clientSideProvider.options;
			if (providerOptions && providerOptions.useDefaultProvider) {
				if (providerOptions.infuraId) this._infuraId = providerOptions.infuraId;
				this.setDefaultProvider();
			}
			else {
				this.provider = this.clientSideProvider.provider;
			}
		}
		async disconnect(){
			if (this.clientSideProvider) {
				await this.clientSideProvider.disconnect();
				this.clientSideProvider = null;
				EventBus.getInstance().dispatch(ClientWalletEvent.AccountsChanged, {
					account: null
				});
			}
			this.setDefaultProvider();
		}
		async encrypt(key: string): Promise<string> {
			if (this.clientSideProvider) {
				return this.clientSideProvider.encrypt(key);
			}
		}
		async decrypt(data: string): Promise<string> {
			if (this.clientSideProvider) {
				return this.clientSideProvider.decrypt(data);
			}
		}
		get accounts(): Promise<string[]>{
			return new Promise(async (resolve)=>{
				await this.init();
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
			if (this.clientSideProvider) {
				return this.clientSideProvider.selectedAddress;
			}
			else if (this._web3){
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
        	return '';
        }
		get account(): IAccount{
			return {
				address: this.address
			}
		}
        set account(value: IAccount){
			if (this._web3)
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
		get multicallInfoMap() {
			return this._multicallInfoMap;
		}
		set multicallInfoMap(value: MulticallInfoMapType) {
			this._multicallInfoMap = value;
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
        createAccount(): IAccount {
			if (this._web3){
				let acc = this._web3.eth.accounts.create();
				return {
					address: acc.address,
					privateKey: acc.privateKey
				};
			};
        };
		decodeLog(inputs: any, hexString: string, topics: any): any{
			return this.web3.eth.abi.decodeLog(inputs, hexString, topics)
		};
		get defaultAccount(): string{
			if (this._account)
				return this._account.address
			else if(this._web3)
				return this._web3.eth.defaultAccount;
		}
		set defaultAccount(address: string){
			if (this._accounts){
				for (let i = 0; i < this._accounts.length; i ++){
					if (!this._accounts[i].address && this._accounts[i].privateKey && this._web3)
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
			else if (this._web3)
				this._web3.eth.defaultAccount = address;
		}
		async getChainId(){
			await this.init();
			if (!this.chainId)
				this.chainId = Number(await this._web3.eth.getChainId());
			return this.chainId;
		}
		get provider(): any{
			return this._provider;
		}
		set provider(value: any){
			if (this._web3)
				this._web3.setProvider(value);
			this._provider = value;
		}
		async sendSignedTransaction(tx: string): Promise<TransactionReceipt>{
			await this.init();
			let _web3 = this._web3;        	
			return _web3.eth.sendSignedTransaction(tx);
		}
		async signTransaction(tx: any, privateKey?: string): Promise<string>{
			await this.init();
			let _web3 = this._web3;  
			// let gasPrice = tx.gasPrice ||  _web3.utils.numberToHex(await _web3.eth.getGasPrice());     	
			let gas = tx.gas || Number(await _web3.eth.estimateGas({
				from: this.address,				
				to: tx.to,
				data: tx.data,
			}))	
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
            let contract:IContract = this.getContract(abiHash);
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
                    tx.gas = Number(await method.estimateGas({ from: this.address, to: address ? address : undefined, value: tx.value?.toFixed() }));
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
			let tx: TransactionOptions = await this._txObj(abiHash, address, methodName, params, options);
            let receipt = await this.sendTransaction(tx);
            return receipt;
		}
		async _txData(abiHash: string, address: string, methodName:string, params?:any[], options?:number|BigNumber|TransactionOptions): Promise<string>{
			let method = this._getMethod(abiHash, address, methodName, params);
			let data = method.encodeABI();
			return data;
		}
		async _methods(...args){
			await this.init();
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
			await this.init();
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

				let contract: IContract;				
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
                    this._blockGasLimit = Number((await _web3.eth.getBlock('latest')).gasLimit);
                }
                let gas: number;
                try {
                    gas = Number(await method.estimateGas({ from: this.address, to: address, value: value }));
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

                let gasPrice = Number(await _web3.eth.getGasPrice());

				if (this._account && this._account.privateKey){
					let tx: TransactionOptions = {
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
					let nonce = Number(await _web3.eth.getTransactionCount(this.address));
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
					this.monitorTransactionEvents(promiEvent);
					result = await promiEvent;
					if (methodName == 'deploy')
						return result.contractAddress;
					return result;
				}	
        	}
        };
		// end of rollback
		get balance(): Promise<BigNumber>{			       
			return this.balanceOf(this.address);
		};
		balanceOf(address: string): Promise<BigNumber>{			
			let self = this;
			return new Promise(async function(resolve){
				try{
					let network = self._networksMap[self.chainId];
					let decimals = 18;
					if (network) {
						if (network.nativeCurrency && network.nativeCurrency.decimals) {
							decimals = network.nativeCurrency.decimals;
						}
						let url = network.rpcUrls[0];
						if (typeof window !== "undefined" && self.clientSideProvider?.provider) {
							const balance = await self.clientSideProvider.provider.request({
								method: 'eth_getBalance',
								params: [address, 'latest'],
							});
			
							resolve(new BigNumber(balance).div(10 ** decimals));
						} 
						else if (!url || (url.indexOf('{INFURA_ID}') && !self._infuraId)) {
							throw new Error("No provider available");
						}
						else {
							if (url.indexOf('{INFURA_ID}')) {
								url = url.replace('{INFURA_ID}', this._infuraId ?? '');
							}
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
								resolve(new BigNumber(0));
							}	
							resolve(new BigNumber(json.result).div(10 ** decimals));
						}
					}
					else {
						await self.init();
						let _web3 = self._web3;
						let result = Number(await _web3.eth.getBalance(address));
						resolve(new BigNumber(result).div(10 ** decimals));
					}
				}
				catch(err){
					resolve(new BigNumber(0));
				}	
			})
		};
		recoverSigner(msg: string, signature: string): Promise<string>{
			let self = this;
			return new Promise(async function(resolve, reject){
				await self.init();
				let _web3 = self._web3;
				try{
					let signing_address = await _web3.eth.accounts.recover(msg, signature);
	        		resolve(signing_address);
				}
				catch(err){
					reject(err);
				};	
			})
        };
		async getBlock(blockHashOrBlockNumber?: number | string, returnTransactionObjects?: boolean): Promise<IWalletBlockTransactionObject>{
			await this.init();
			if (returnTransactionObjects) {
				return <any>this._web3.eth.getBlock(blockHashOrBlockNumber || 'latest', true);
			}
			return <any>this._web3.eth.getBlock(blockHashOrBlockNumber || 'latest', false);
		};
		async getBlockNumber(): Promise<number>{
			await this.init();
			return Number(await this._web3.eth.getBlockNumber());
		};		
		async getBlockTimestamp(blockHashOrBlockNumber?: number | string): Promise<number>{	
			await this.init();
			let block = await this._web3.eth.getBlock(blockHashOrBlockNumber || 'latest', false);
			if (typeof(block.timestamp) == 'string')
				return parseInt(block.timestamp)
			else	
				return Number(block.timestamp)
		};
        set privateKey(value: string){
			if (value && this._web3){
				this._web3.eth.defaultAccount = '';
			}			
        	this._account = {
				address: '',
				privateKey: value
			}
        };
		async registerEvent(abi: any, eventMap:{[topics:string]:any}, address: string, handler: any): Promise<void> {
			await this.init();
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
			if (this._web3){
				let _web3 = this._web3;
				let events = abi.filter(e => e.type=="event");    
				let eventMap = {};
			
				for (let i = 0 ; i < events.length ; i++) {
					let topic = _web3.utils.soliditySha3(events[i].name + "(" + events[i].inputs.map(e=>e.type=="tuple" ? "("+(e.components.map(f=>f.type)) +")" : e.type).join(",") + ")");
					eventMap[topic] = events[i];
				}
				return eventMap;
			};        	
		};
        getAbiTopics(abi: any[], eventNames?: string[]): any[]{
			if (this._web3){
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
			if (this._web3){
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
		};
		registerAbiContracts(abiHash: string, address: string|string[], handler?: any){			
			if (address){
				if (!Array.isArray(address))
					address = [address];
				for (let i = 0; i < address.length; i ++){
					this._abiAddressDict[address[i]] = abiHash;
					if (handler) {
						if (this._eventHandler[address[i]]) {
							this._eventHandler[address[i]].push(handler);
						} else {
							this._eventHandler[address[i]] = [handler];
						}
					}
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
			let handlers = this._eventHandler[data.address];
			if (handlers) {
                for (let handler of handlers) {
                    await handler(this, log);
                }
			}
			return log;
		};
		scanEvents(params: {fromBlock: number, toBlock?: number | string, topics?: any, events?: any, address?: string|string[]}): Promise<Event[]>;
        scanEvents(fromBlock: number, toBlock?: number | string, topics?: any, events?: any, address?: string|string[]): Promise<Event[]>;
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
        	return new Promise(async (resolve, reject)=>{
				await this.init();
				let _web3 = this._web3;     
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
        	let address = this.address;
        	let self = this;
			let currentProvider = this.provider;
			if (typeof window !== "undefined" && this.clientSideProvider && this.provider !== this.clientSideProvider.provider) {
				this.provider = this.clientSideProvider.provider;
			}
        	let promise = new Promise<TransactionReceipt>(async function(resolve, reject){
				await self.init();
        		let _web3 = self._web3;
        		try{
        			let value = _web3.utils.numberToHex(_web3.utils.toWei(amount.toString(), "ether"));
        			let result;
        			if ((self._account && self._account.privateKey)){
						let nonce = Number(await _web3.eth.getTransactionCount(address));        				
        				let gas = Number(await _web3.eth.estimateGas({
						     from: address,       
						     nonce: nonce, 
						     to: to,     
						     value: value
						}));
						let price = Number(await _web3.eth.getGasPrice());
        				let tx: TransactionOptions = {
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
        				result = await _web3.eth.sendTransaction({from: address, to: to, value: _web3.utils.toWei(amount.toString(), "ether").toString()});	
        				resolve(result);	
        			}
        		}
        		catch(err){					
        			reject(err);
        		}
        	})
			promise.finally(() => {
				if (this.provider !== currentProvider) {
					this.provider = currentProvider;
				}
			})
			return promise;
		};
		setBlockTime(time: number): Promise<any>{
			return new Promise(async (resolve, reject) => {
				await this.init();
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
			return new Promise(async (resolve, reject) => {
				await this.init();
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
			let address = this.address;
			let self = this;
			let currentProvider = this.provider;
			if (typeof window !== "undefined" && this.clientSideProvider && this.provider !== this.clientSideProvider.provider) {
				this.provider = this.clientSideProvider.provider;
			}
			let promise = new Promise<string>(async function(resolve, reject){				
				try{
					let result;					
					if (self._account && self._account.privateKey){
						await self.init();
						let _web3 = self._web3;
						result = await _web3.eth.accounts.sign(msg, self._account.privateKey);
						resolve(result.signature);
					}
					else if (typeof window !== "undefined" && self.clientSideProvider){
						result = await self.clientSideProvider.provider.request({
						  method: 'personal_sign',
						  params: [msg, address],
						});
						// result = await _web3.eth.personal.sign(msg, address, null);
						resolve(result);
					}
					else {
						await self.init();
						let _web3 = self._web3;
						result = await _web3.eth.sign(msg, address);
						resolve(result);	
					}
				}	
				catch(err){
					reject(err);
				}
			})
			promise.finally(() => {
				if (this.provider !== currentProvider) {
					this.provider = currentProvider;
				}
			})
			return promise;
        };	
		signTypedDataV4(data: TypedMessage<MessageTypes>): Promise<string> {
			let self = this;
			let currentProvider = this.provider;
			if (typeof window !== "undefined" && this.clientSideProvider && this.provider !== this.clientSideProvider.provider) {
				this.provider = this.clientSideProvider.provider;
			}
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
				if (this.provider !== currentProvider) {
					this.provider = currentProvider;
				}
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
			let self = this;
			return new Promise(async function(resolve, reject){
				await self.init();
				let _web3 = self._web3;
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
			let self = this;
			return new Promise(async (resolve,reject)=>{
				await self.init();
				try{
					if (!this._gasLimit)
						this._gasLimit = Number((await this._web3.eth.getBlock('latest')).gasLimit);
					resolve(this._gasLimit);
				}catch(e){
					reject(e);
				}
			});
		};
		getGasPrice(): Promise<BigNumber> {
			return new Promise(async (resolve,reject)=>{
				await this.init();
				try{					
					resolve(new BigNumber(Number(await this._web3.eth.getGasPrice())));
				}catch(e){
					reject(e);
				}
			});
		}
		transactionCount(): Promise<number> {
			return new Promise(async (resolve,reject)=>{
				await this.init();
				try{					
					resolve(Number(await this._web3.eth.getTransactionCount(this.address)));
				}catch(e){
					reject(e);
				}
			});
		}
		private monitorTransactionEvents(promiEvent: PromiEvent<TransactionReceipt>) {
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
			promiEvent.once('confirmation', (confirmationObj: ConfirmationObject) => {           
				// if (this._sendTxEventHandler.confirmation && Number(confNumber) == 1)
					this._sendTxEventHandler.confirmation(confirmationObj.receipt);                
			});
		}
		async sendTransaction(transaction: TransactionOptions): Promise<TransactionReceipt> {
			await this.init();
			let _transaction = {...transaction, 
				value:typeof(transaction.value)=='string'?transaction.value:transaction.value?transaction.value.toFixed():undefined, 
				gasPrice:typeof(transaction.gasPrice)=='string'?transaction.gasPrice:transaction.gasPrice?transaction.gasPrice.toFixed():undefined
			};
			let currentProvider = this.provider;
			try {
				const isClientSide = typeof window !== "undefined" && !!this.clientSideProvider;
				if (isClientSide && this.provider !== this.clientSideProvider.provider) {
					this.provider = this.clientSideProvider.provider;
				}
				if (this._account && this._account.privateKey){
					let signedTx = await this._web3.eth.accounts.signTransaction(_transaction, this._account.privateKey);
					let promiEvent =  this._web3.eth.sendSignedTransaction(signedTx.rawTransaction);
					if (isClientSide) {
						this.monitorTransactionEvents(promiEvent);
					}
					return await promiEvent;
				}
				else {
					let promiEvent = this._web3.eth.sendTransaction(_transaction);
					this.monitorTransactionEvents(promiEvent);
					return await promiEvent;
				}
			}
			catch (err) {
				throw err;
			} finally {
				if (this.provider !== currentProvider) {
					this.provider = currentProvider;
				}
			}
		}
		async getTransaction(transactionHash: string): Promise<Transaction> {
			await this.init();
			let web3Receipt = await this._web3.eth.getTransaction(transactionHash);
			return {
				from: web3Receipt.from,
				to: web3Receipt.to,
				nonce: Number(web3Receipt.nonce),
				gas: Number(web3Receipt.gas),
				gasPrice: new BigNumber(web3Receipt.gasPrice),
				data: web3Receipt.input,
				value: new BigNumber(web3Receipt.value)
			}
		}
		async getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt> {
			await this.init();
			return this._web3.eth.getTransactionReceipt(transactionHash);
		}
		async call(transaction: Transaction): Promise<any> {
			await this.init();
			let _transaction = {...transaction, value:transaction.value?transaction.value.toFixed():undefined, gasPrice:transaction.gasPrice?transaction.gasPrice.toFixed():undefined};
			return this._web3.eth.call(_transaction);
		}
		newContract(abi:any, address?:string): IContract {
			if (this._web3)
				return new this._web3.eth.Contract(abi, address);
		}
		decodeErrorMessage(msg: string): any {
			if (this._web3)
				return this._web3.eth.abi.decodeParameter('string', "0x"+msg.substring(10));
		}
        async newBatchRequest(): Promise<IBatchRequestObj> {
            return new Promise(async (resolve, reject) => {
				await this.init();
                try {            
                    resolve({
                        batch: new this._web3.eth.BatchRequest(),
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
			if (this._web3)
				return this._web3.utils.soliditySha3(...val);
		}
		toChecksumAddress(address: string) {
			if (this._web3)
				return this._web3.utils.toChecksumAddress(address);
		}
		isAddress(address: string) {
			if (this._web3)
				return this._web3.utils.isAddress(address);
		}
		//To be removed
		async multiCall(calls: {to: string; data: string}[], gasBuffer?: string) {
			const chainId = await this.getChainId();
			const multicallInfo = this._multicallInfoMap[chainId];
			if (!multicallInfo) return null;
			const multiCall = new MultiCall(this, multicallInfo.contractAddress);
			const result = await multiCall.multicallWithGasLimitation.call({
				calls,
				gasBuffer: new BigNumber(gasBuffer ?? multicallInfo.gasBuffer)
			});
			return result;
		}
		async doMulticall(
			contracts: IMulticallContractCall[], 
			gasBuffer?: string
		): Promise<any[]> {
			if (!this._web3) return null;
			const chainId = await this.getChainId();
			const multicallInfo = this._multicallInfoMap[chainId];
			if (!multicallInfo) return null;
			const multiCall = new MultiCall(this, multicallInfo.contractAddress);
			let calls = [];
			for (let i = 0; i < contracts.length; i++) {
				const { to, contract, methodName, params } = contracts[i];
				const abi = contract._abi.find(v => v.name == methodName);
				const callData = abi ? this._web3.eth.abi.encodeFunctionCall(abi, params) : '';
				calls.push({
					to,
					data: callData
				});
			}
			const multicallResult = await multiCall.multicallWithGasLimitation.call({
				calls,
				gasBuffer: new BigNumber(gasBuffer ?? multicallInfo.gasBuffer)
			});
			const calculateOutputValue = (decodedValue: any, abiOutput: any) => {
				let outputValue;
				if (abiOutput.type.endsWith('[]')) {
					if (abiOutput.type.startsWith('uint') || abiOutput.type.startsWith('int')) {
						outputValue = decodedValue.map((v: any) => new BigNumber(v));
					}
					else {
						outputValue = decodedValue;
					}
				}
				else if (abiOutput.type.startsWith('uint') || abiOutput.type.startsWith('int')) {
					outputValue = new BigNumber(decodedValue);
				}
				else {
					switch (abiOutput.type) {
						case 'address':
						case 'bool':					
						default:
							outputValue = decodedValue;
							break;
					}
				}
				return outputValue;
			}
			let outputValues = [];
			for (let i = 0; i <= multicallResult.lastSuccessIndex.toNumber(); i++) {
				const callResult = multicallResult.results[i];
				if (callResult === '0x') {
					outputValues.push(null);
					continue;
				}
				const abi = contracts[i].contract._abi.find(v => v.name == contracts[i].methodName);
				const outputs = abi?.outputs || [];
				const decodedValues = this._web3.eth.abi.decodeParameters(outputs, callResult);
				if (outputs.length == 0) {
					outputValues.push(null);
				}
				else if (outputs.length == 1) {
					let outputValue = calculateOutputValue(decodedValues[0], outputs[0]);
					outputValues.push(outputValue);
				}
				else {
					let outputNames: string[] = outputs.map(v => v.name);
					if (outputNames.every(v => v !== '')) {
						let outputValueObj = {};
						for (let j = 0; j < outputs.length; j++) {
							const output = outputs[j];
							const decodedValue = decodedValues[j];
							const outputValue = calculateOutputValue(decodedValue, output);
							outputValueObj[outputNames[j]] = outputValue;
						}
						outputValues.push(outputValueObj);
					}
					else {
						let outputValueArr = [];
						for (let j = 0; j < outputs.length; j++) {
							const output = outputs[j];
							const decodedValue = decodedValues[j];
							const outputValue = calculateOutputValue(decodedValue, output);
							outputValueArr.push(outputValue);
						}
						outputValues.push(outputValueArr);
					}
				}
			}
			return outputValues;
		}
		encodeFunctionCall<T extends IAbiDefinition, F extends Extract<keyof T, { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]>>(
			contract: T, 
			methodName: F, 
			params: string[]
		) {
			if (this._web3){
				const abi = contract._abi.find(v => v.name == methodName);
				return abi ? this._web3.eth.abi.encodeFunctionCall(abi, params) : '';
			}
		}		
		decodeAbiEncodedParameters<T extends IAbiDefinition, F extends Extract<keyof T, { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]>>(
			contract: T, 
			methodName: F, 
			hexString: string
		) {
			if (this._web3){
				const abi = contract._abi.find(v => v.name == methodName);
				const outputs = abi?.outputs || [];
				return abi ? this._web3.eth.abi.decodeParameters(outputs, hexString) : {};
			}
		}
		public get web3(): typeof Web3{
			return this._web3;
		}
	}
	export class RpcWallet extends Wallet implements IRpcWallet{
		public static rpcWalletRegistry: Record<string, IRpcWallet> = {};
		public instanceId: string;  
		private _address: string;
		get address(): string{
			return this._address;
		}
		set address(value: string){
			this._address = value;
		}
		setProvider(provider: any): void{
			if (this._web3) {
				this._web3.setProvider(provider);
			}
			this._provider = provider;
		};
		get isConnected() {
			const clientWallet = Wallet.getClientInstance();
			return clientWallet.isConnected && this.chainId === clientWallet.chainId;
		};
		static getRpcWallet(chainId: number) {
			if (this.rpcWalletRegistry[chainId]) {	
				return this.rpcWalletRegistry[chainId];
			}
			const application = window["application"];
			if (!application) throw new Error("application is not initialized");
			const clientWallet = Wallet.getClientInstance();
			const networkList: INetwork[] = Object.values(application.store?.networkMap || []);
			const instanceId = clientWallet.initRpcWallet({
			  networks: networkList,
			  defaultChainId: chainId,
			  infuraId: application.store?.infuraId,
			  multicalls: application.store?.multicalls
			});
			const rpcWallet = Wallet.getRpcWalletInstance(instanceId);
			this.rpcWalletRegistry[chainId] = rpcWallet;
			if (clientWallet.address) {
			  rpcWallet.address = clientWallet.address;
			}
			return rpcWallet;
		}
		async switchNetwork(chainId: number) {
			await this.init();
			this.chainId = chainId;
			const rpc = this.networksMap[chainId].rpcUrls[0];
			this._web3.setProvider(rpc);
			const eventId = `${this.instanceId}:${RpcWalletEvent.ChainChanged}`;
			EventBus.getInstance().dispatch(eventId, chainId);
			return null;
		}
		initWalletEvents() {
			const eventId = `${this.instanceId}:${RpcWalletEvent.Connected}`;
			const eventBus = EventBus.getInstance();
			const accountsChangedRegistry = eventBus.register(this, ClientWalletEvent.AccountsChanged, (payload: Record<string, any>) => {
				this.address = payload.account;
				eventBus.dispatch(eventId, this.isConnected);
			});
			const chainChangedRegistry = eventBus.register(this, ClientWalletEvent.ChainChanged, (chainIdHex: string) => {
				eventBus.dispatch(eventId, this.isConnected);
			});	
			this._walletEventIds.add(accountsChangedRegistry.id);
			this._walletEventIds.add(chainChangedRegistry.id);
		}
		registerWalletEvent(sender: any, event: string, callback: Function): IEventBusRegistry {
			const eventId = `${this.instanceId}:${event}`;
			const eventBus = EventBus.getInstance();
			const registry = eventBus.register(sender, eventId, callback);
			this._walletEventIds.add(registry.id);
			return registry;
		}
	}
// };
// export = Wallet;