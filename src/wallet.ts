import * as W3 from 'web3';
import {BlockTransactionObject} from 'web3-eth';
import {rlp} from 'ethereumjs-util';
const Web3 = Web3Lib(); // tslint:disable-line
import {BigNumber} from 'bignumber.js';
import {Erc20} from './contracts/erc20';
import {Utils} from 'web3-utils';
import {KMS} from './kms';

function Web3Lib(){
	if (typeof window !== "undefined" && window["Web3"])
        return window["Web3"];
	else
        return require("web3");
}
module Wallet{    
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
	    contractAddress: string;
	    cumulativeGasUsed: number;
	    gasUsed: number;
	    logs ? : Array <Log>;
        events ? : {
            [eventName: string]: EventLog | EventLog[]
        };
        status: string;
	}
	export interface Transaction{
		to: string;
		gas: number,
		data: string;
	}
    export const Networks = {
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
	export interface INetworkOption {
		chainId: string; // A 0x-prefixed hexadecimal string
		chainName: string;
		nativeCurrency: {
			name: string;
			symbol: string; // 2-6 characters long
			decimals: 18;
		};
		rpcUrls: string[];
		blockExplorerUrls?: string[];
		iconUrls?: string[]; // Currently ignored.
	}
	export class MetaMask {
		private wallet: Wallet;
		constructor(wallet: Wallet){
			this.wallet = wallet;
			let self = this;
			let ethereum = window['ethereum'];
			if (this.installed){
				ethereum.on('accountsChanged', (accounts) => {
					let account;
					if (accounts && accounts.length > 0)
						account = accounts[0]
					(<any>self.wallet.web3).selectedAddress = account;
					if (self.wallet.onAccountChanged)
						self.wallet.onAccountChanged(account);
				});
				ethereum.on('chainChanged', (chainId) => {
					self.wallet.chainId = parseInt(chainId);
					if (self.wallet.onChainChanged)
						self.wallet.onChainChanged(chainId);
				});
				ethereum.on('connect', (connectInfo) => {
					if (self.wallet.onConnect)
						self.wallet.onConnect(connectInfo);
				});
				ethereum.on('disconnect', (error) => {
					if (self.wallet.onDisconnect)
						self.wallet.onDisconnect(error);
				});	
			};
		}
		async connect(){
			let self = this;
			try {								
				if (this.installed){
					let ethereum = window['ethereum'];
					await ethereum.request({ method: 'eth_requestAccounts' });
				}
			} catch (error) {
				console.error(error);
			}
		}
		get installed(): boolean{
			let ethereum = window['ethereum'];
			if (typeof(ethereum) != 'undefined' && ethereum.isMetaMask)
				return true;
		}
		get provider(){
			let ethereum = window['ethereum'];
			return ethereum;
		}
		addToken(option: ITokenOption, type?: string): Promise<boolean>{
			return new Promise(async function(resolve, reject){
				try{
					let ethereum = window['network'];
					let result = await ethereum.request({
					    method: 'wallet_watchAsset',
					    params: {
					      type: type || 'ERC20', 
					      options: option,
					    },
					  });
					resolve(result);
				}
				catch(err){
					reject(err)
				}
			})
		}
		switchNetwork(chainId: number): Promise<boolean>{
			return new Promise(async function(resolve, reject){
				try{
					let ethereum = window['ethereum'];
					let result = await ethereum.request({
					    method: 'wallet_switchEthereumChain',
					    params: {
					    	chainId: '0x4'
					    }
					  });
					resolve(!result);
				}	
				catch(err){
					reject(err)
				}
			})
		}
		addNetwork(options: INetworkOption): Promise<boolean>{
			return new Promise(async function(resolve, reject){
				try{
					options = JSON.parse(JSON.stringify(options));
					options.chainId = '0x' + parseInt(options.chainId).toString(16)
					let ethereum = window['ethereum'];
					try{
						await ethereum.request({
						    method: 'wallet_switchEthereumChain',
						    params: [{ chainId: options.chainId}],
						});
						resolve(true);
					}
					catch(err){
						let result = await ethereum.request({
						    method: 'wallet_addEthereumChain',
						    params: [
						    	options
						    ],
						  });
						resolve(!result);	
					}
				}
				catch(err){
					reject(err)
				}
			})
		}
	}
    export class Wallet{
		private _web3: W3.default;		
        private _account: IAccount;
		private _accounts: IAccount[];
		private _kms: KMS;		
		private _provider: any;
		private _abiHashDict: IDictionary = {};
		private _abiAddressDict: IDictionary = {};
		private _abiEventDict: IDictionary = {};
		private _eventHandler = {};
		private _contracts = {};
		private _blockGasLimit: number;
		private _metaMask: MetaMask;
		public isMetaMask: boolean = false;
		public chainId: number;       
		public onAccountChanged: (account: string)=>void; 
		public onChainChanged: (chainId: string)=>void;
		public onConnect: (connectInfo: any)=>void;
		public onDisconnect: (error: any)=>void;

		constructor(provider?: any, account?: IAccount|IAccount[]){
			if (!provider && typeof(window) !== 'undefined' && window['ethereum'] && window['ethereum'].isMetaMask){
				this.isMetaMask = true;
				provider = window['ethereum'];
			}
			this._provider = provider;			
			this._web3 = new Web3(provider);
			if (this.isMetaMask){
				this._web3.eth.getAccounts((err, accounts)=>{
					if (accounts){
						(<any>this._web3).selectedAddress = accounts[0];
					}					
				});								
				this._web3.eth.net.getId((err, chainId)=>{
					this.chainId = chainId;
				})
			}
			if (Array.isArray(account)){
				this._accounts = account;
				this._account = account[0];
			}
			else
            	this._account = account;

			if (this._account && this._account.privateKey && !this._account.address)
				this._account.address = this._web3.eth.accounts.privateKeyToAccount(this._account.privateKey).address;
			if (this.isMetaMask)
				this._metaMask = new MetaMask(this);
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
			else if (this._kms && this._account){
				return this._account.address
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
			this._kms = null;
			this._web3.eth.defaultAccount = '';
            this._account = value;
        }
        createAccount(): IAccount{
        	let acc = this._web3.eth.accounts.create();
        	return {
        		address: acc.address,
        		privateKey: acc.privateKey
        	};
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
		get metaMask(){
			if (!this._metaMask)
				this._metaMask = new MetaMask(this);
			return this._metaMask;
		};
		get provider(): any{
			return this._provider;
		}
		sendSignedTransaction(tx: string): Promise<any>{
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
			else if (this._account && this._account.kms){	
				let chainId = await this.getChainId();
				let txHash = await this.kms.signTransaction(chainId, {
					from: this.address,
					nonce: nonce,
					// gasPrice: gasPrice,
					gasLimit: gas,
					gas: gas,
					to: tx.to,
					data: tx.data
				});
				return txHash;
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
		async methods(...args){
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
							await method.call({from:this.address});
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
				else if (this._account && this._account.kms){
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
					result = await _web3.eth.sendSignedTransaction(txHash)
					if (methodName == 'deploy')
						return result.contractAddress;
					return result;
				}
				else{					
					contract.options.address = address;
					result = await method.send(
						{
							from: this.address,
							to: address,
							gas: gas,
							value: value
						}	
					);
					if (methodName == 'deploy')
						return result.options.address;
					return result;
				}	
        	}
        }
		get balance(): Promise<BigNumber>{
			let self = this;
            let _web3 = this._web3;
			return new Promise(async function(resolve){
				try{
					let network = Networks[self.chainId];
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
		}
		balanceOf(address: string): Promise<BigNumber>{
			let self = this;
            let _web3 = this._web3;
			return new Promise(async function(resolve){
				try{
					let network = Networks[self.chainId];
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
		}
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
		getBlock(blockHashOrBlockNumber?: number | string, returnTransactionObjects?: boolean): Promise<BlockTransactionObject>{
			return this._web3.eth.getBlock(blockHashOrBlockNumber || 'latest', returnTransactionObjects);
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
		// get network(): INetwork{
		// 	return Networks[this.chainId];
		// };
		async initKMS(value?: IKMS){			
			value = value || this._account.kms;			
			if (value){
				this._kms = new KMS(value);
				this._account = {
					address: await this._kms.getAddress(),
					kms: value
				};
			}
		}
		private get kms(): KMS{
			if (this._account && !this._kms && this._account.kms)
				this._kms = new KMS(this._account.kms);
			return this._kms;
		}
        set privateKey(value: string){
			if (value){
				this._kms = null;
				this._web3.eth.defaultAccount = '';
			}			
        	this._account = {
				address: '',
				privateKey: value
			}
        }
        getAbiEvents(abi: any[]): any {
        	let _web3 = this._web3;
		    let events = abi.filter(e => e.type=="event");    
		    let eventMap = {};
		
		    for (let i = 0 ; i < events.length ; i++) {
		        let topic = _web3.utils.soliditySha3(events[i].name + "(" + events[i].inputs.map(e=>e.type=="tuple" ? "("+(e.components.map(f=>f.type)) +")" : e.type).join(",") + ")");
		        eventMap[topic] = events[i];
		    }
		    return eventMap;
		}
        getAbiTopics(abi: any[], eventNames: string[]){
			if (!eventNames)
				return;
			let _web3 = this._web3;
			let result = [];
			let events = abi.filter(e => e.type=="event");
			for (let i = 0 ; i < events.length ; i++) {
				if (eventNames.indexOf(events[i].name) >= 0){
					let topic = _web3.utils.soliditySha3(events[i].name + "(" + events[i].inputs.map(e=>e.type=="tuple" ? "("+(e.components.map(f=>f.type)) +")" : e.type).join(",") + ")");
					result.push(topic);
				}
		    }
		    return result;
		}
		getContractAbi(address: string){
			return this._abiAddressDict[address];
		}
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
		}
		registerAbi(abi: any[] | string, address?: string|string[], handler?: any): string{
			let hash = '';
			if (typeof(abi) == 'string')
				hash = abi
			else
				hash = this._web3.utils.sha3(JSON.stringify(abi));
			this._abiHashDict[hash] = abi;
			if (address)
				this.registerAbiContracts(hash, address, handler);
			return hash;
		}
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
		}
		async decodeEventData(data: Log, events?: any): Promise<Event>{
			let _web3 = this._web3;        	
			let event;
			if (events)
				event = events[data.topics[0]]
			else{
				let _events = this.getContractAbiEvents(data.address);
				if (_events)
					event = _events[data.topics[0]]
				else
					event = null;
			};
			let d;
			if (event){
				d = <any>_web3.eth.abi.decodeLog(event.inputs, data.data, data.topics.slice(1));
				if (d.__length__){
					for (let k = 0; k < d.__length__; k ++)
						delete d[k];
					delete d['__length__'];
				};
			}
			let log = {
				address: data.address,
				blockNumber: data.blockNumber,
				topics: data.topics,
				data: d?d:data.data,
				rawData: d?data.data:undefined,
				logIndex: data.logIndex,
				name: event?event.name:undefined,
				transactionHash: data.transactionHash,
				transactionIndex: data.transactionIndex
			};						
			let handler = this._eventHandler[data.address]
			if (handler)
				await handler(this, log);
			return log;
		}
        scanEvents(fromBlock: number, toBlock: number | string, topics?: any, events?: any, address?: string): Promise<Event[]>{
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
        send(to: string, amount: number): Promise<TransactionReceipt>{
        	let _web3 = this._web3;
        	let address = this.address;
        	let self = this;
        	return new Promise(async function(resolve, reject){
        		try{
        			let value = _web3.utils.numberToHex(_web3.utils.toWei(amount.toString()));
        			let result;
        			if ((self._account && self._account.privateKey) || self.kms){
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
						if (self.kms){
							let chainId = await self.getChainId();
							let txHash = await self.kms.signTransaction(chainId, tx);
							result = await _web3.eth.sendSignedTransaction(txHash);
						}
						else{
							let signedTx = await _web3.eth.accounts.signTransaction(tx, self._account.privateKey);
							result = await _web3.eth.sendSignedTransaction(signedTx.rawTransaction);			
						}						
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
		}
		setBlockTime(time: number): Promise<any>{
			return new Promise((resolve, reject) => {
				(<any>this._web3.currentProvider).send({
					jsonrpc: '2.0',
					method: time > 1000000000 ? 'evm_mine' : 'evm_increaseTime', 
					params: [time], //[(3600*24*60*60)], //[time],
					id: new Date().getTime()
				}, 
				(err, result) => {
					if (err)
						return reject(err); 
					resolve(result);
				})
			});
		}
		signMessage(msg: string): Promise<string> {
			let _web3 = this._web3;
			let address = this.address;
			let self = this;
			return new Promise(async function(resolve, reject){
				try{
					let result;
					if ((self._account && self._account.privateKey) || self.kms){
						if (self.kms){
							result = await self.kms.signMessage(self.chainId, _web3.utils.stringToHex(msg))
							resolve(result);
						}
						else{
							result = await _web3.eth.accounts.sign(msg, self._account.privateKey);
							resolve(result.signature);
						}
					}
					else{
						// result = await _web3.eth.personal.sign(msg, address, null);
						result = await _web3.eth.sign(msg, address, null);
						resolve(result);	
					}
				}	
				catch(err){
					reject(err);
				}
			})
        };
		token(tokenAddress: string, decimals?: number): Erc20{
			return new Erc20(this, tokenAddress, decimals);
		}
        get utils(): Utils{
            return this._web3.utils;
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
		public get web3(): W3.default{
			return this._web3;
		}		
    }
};
export = Wallet;