import * as W3 from 'web3';
const Web3 = require('web3'); // tslint:disable-line
import {BigNumber} from 'bignumber.js';
import {ERC20} from './contracts/erc20';
import {KMS} from './kms';

// module Wallet{    
    export interface IEvent{
		name: string;
        address: string;
        blockNumber: number;
        transactionHash: string;
        transactionIndex: number;
        type: string;
        data: any;
	}
    export interface ILog {
	    address: string;
	    data: string;
	    topics: Array <string>;
        logIndex: number;
	    transactionHash: string;
	    transactionIndex: number;
	    blockHash: string;
	    type: string;
	    blockNumber: number;
	}
	export interface IEventLog {
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
    export interface ITransactionReceipt {
	    transactionHash: string;
	    transactionIndex: number;
	    blockHash: string;
	    blockNumber: number;
	    from: string;
	    to: string;
	    contractAddress: string;
	    cumulativeGasUsed: number;
	    gasUsed: number;
	    logs ? : Array <ILog>;
        events ? : {
            [eventName: string]: IEventLog
        };
        status: string;
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
    export class Wallet{        
		private _web3: W3.default;		
        private _account: IAccount;
		private _kms: KMS;		
		public chainId: number;        

		constructor(provider?: string, account?: IAccount){
			this._web3 = new Web3(provider);
            this._account = account;
		}
		get address(): string{    			
			if (!this._account)        
				this._account = this.createAccount();
				
        	if (this._account.privateKey){
				if (!this._account.address)
					this._account.address = this._web3.eth.accounts.privateKeyToAccount(this._account.privateKey).address;
        		return this._account.address;
        	}
        	else
        		return this._account.address;
        }
        set account(value: IAccount){
            this._account = value;
        }
        createAccount(): IAccount{
        	let acc = this._web3.eth.accounts.create();
        	return {
        		address: acc.address,
        		privateKey: acc.privateKey
        	};
        };
		async getChainId(){
			if (!this.chainId)
				this.chainId = await this._web3.eth.getChainId();
			return this.chainId;
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
        		let contract = new this._web3.eth.Contract(abi, address);
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
        		if (methodAbi && methodAbi.constant)
        			return method.call({from: this.address});

        		let gas = await method.estimateGas({from: this.address, value: value});
        		if (this._account.privateKey){
        			var tx = {
					    gas: gas,
					    data: method.encodeABI(),
					    from: this.address,
					    to: address
					};
					let signedTx = await _web3.eth.accounts.signTransaction(tx, this._account.privateKey);
					result = await _web3.eth.sendSignedTransaction(signedTx.rawTransaction);
					if (methodName == 'deploy')
						return result.contractAddress;
					return result;
        		}
				else if (this._account.kms){
					let nonce = await _web3.eth.getTransactionCount(this.address);
					let price = _web3.utils.numberToHex(await _web3.eth.getGasPrice());
					let tx = {
						from: address,
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
		getBlockNumber(): Promise<number>{
			return this._web3.eth.getBlockNumber();
		}		
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
		get kms(): KMS{
			if (!this._kms && this._account.kms)
				this._kms = new KMS(this._account.kms);
			return this._kms;
		}
        set privateKey(value: string){
			this._kms = null;
        	this._account = {
				address: '',
				privateKey: value
			}
        }
        getAbiEvents(abi) {
        	let _web3 = this._web3;
		    let events = abi.filter(e => e.type=="event");    
		    let eventMap = {};
		
		    for (let i = 0 ; i < events.length ; i++) {
		        let topic = _web3.utils.soliditySha3(events[i].name + "(" + events[i].inputs.map(e=>e.type).join(",") + ")");
		        eventMap[topic] = events[i];
		    }
		    return eventMap;
		}
        getAbiTopics(abi, eventNames: string[]){
			if (!eventNames)
				return;
			let _web3 = this._web3;
			let result = [];
			let events = abi.filter(e => e.type=="event");
			for (let i = 0 ; i < events.length ; i++) {
				if (eventNames.indexOf(events[i].name) >= 0){
					let topic = _web3.utils.soliditySha3(events[i].name + "(" + events[i].inputs.map(e=>e.type).join(",") + ")");
					result.push(topic);
				}
		    }
		    return result;
		}
        scanEvents(abi, address: string, fromBlock: number, toBlock: number, eventNames?: string[]): Promise<IEvent[]>{
        	let _web3 = this._web3;
        	let topics = this.getAbiTopics(abi, eventNames);
        	let events = this.getAbiEvents(abi);
        	return new Promise(async function(resolve, reject){
        		try{
        			let logs = await _web3.eth.getPastLogs({
		                fromBlock: fromBlock,   
		                toBlock: toBlock,
		                address: address,
		                topics: topics?topics:null
		            });		            
		            let result = [];
		            for (let i = 0 ; i < logs.length ; i++) {
		                let e = logs[i];
		                let event = events[e.topics[0]];
		                if (event){
		                    let data = <any>_web3.eth.abi.decodeLog(event.inputs, e.data, e.topics.slice(1));
		                    if (data.__length__){
		                    	for (var k = 0; k < data.__length__; k ++)
		                    		delete data[k];
		                    	delete data['__length__'];
		                    };
		                    let log = {
		                    	name: event.name,
			                    blockNumber: e.blockNumber,
			                    transactionHash: e.transactionHash,
			                    transactionIndex: e.transactionIndex,			                    
			                    data: data
		                    };
		                    result.push(log);
		                }
		            }
		            resolve(result);
        		}
        		catch(err){
        			reject(err);
        		}
        	})
        };
        send(to: string, amount: number): Promise<ITransactionReceipt>{
        	let _web3 = this._web3;
        	let address = this.address;
        	let self = this;
        	return new Promise(async function(resolve, reject){
        		try{
        			let value = _web3.utils.numberToHex(_web3.utils.toWei(amount.toString()));
        			let result;
        			if (self._account.privateKey || self.kms){
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
		signMessage(msg: string): Promise<string> {
			let _web3 = this._web3;
			let address = this.address;
			let self = this;
			return new Promise(async function(resolve, reject){
				try{
					let result;
					if (self._account.privateKey || self.kms){
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
						result = await _web3.eth.personal.sign(msg, address, null);
						resolve(result);	
					}
				}	
				catch(err){
					reject(err);
				}
			})
        };
		token(tokenAddress: string): ERC20{
			return new ERC20(this, tokenAddress);
		}
        get utils(){
            return this._web3.utils;
        };
		verifyMessage(account: string, msg: string, signature: string): Promise<boolean>{
			let _web3 = this._web3;
			return new Promise(async function(resolve, reject){
				try{
					var signing_address = await _web3.eth.accounts.recover(msg, signature);
	        		resolve(signing_address && account.toLowerCase() == signing_address.toLowerCase());
				}
				catch(err){
					reject(err);
				};	
			})
        };		
    }
// };
// export = Wallet;