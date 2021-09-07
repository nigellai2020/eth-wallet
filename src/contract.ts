import {Wallet, TransactionReceipt} from "./wallet";
import {BigNumber} from "bignumber.js";
import * as W3 from 'web3';
const Web3 = require('web3'); // tslint:disable-line

module Contract {
    export interface IEvent{
		name: string;
        address: string;
        blockNumber: number;
        transactionHash: string;
        transactionIndex: number;
        type: string;
        data: any;
	}
    export interface IEventType{
		name: string
	}
    export interface Log {
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
	export interface EventLog {
	    event: string;
	    address: string;
	    returnValues: any;
	    logIndex: number;
	    transactionIndex: number;
	    transactionHash: string;
	    blockHash: string;
	    blockNumber: number;
	    raw ? : {
	        data: string,
	        topics: string[]
	    };
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
	    logs ? : Array < Log >;
        events ? : {
            [eventName: string]: EventLog
        };
        status: string;
	}
    export class Contract {
        public wallet: Wallet;
        public _abi: any;
        public _bytecode: any;
        public _address: string;
        private _events: any;
        public privateKey: string;
        
        constructor(wallet: Wallet, address?: string, abi?: any, bytecode?: any) {            
            this.wallet = wallet;                        
            if (typeof(abi) == 'string')
                this._abi = JSON.parse(abi)
            else
                this._abi = abi
            this._bytecode = bytecode
            var self = this;
            if (address)
                this._address = address;
        }    
        at(address: string): Contract {
            this._address = address;
            return this;
        }
        get address(): string{
            return this._address || '';
        }
        protected decodeEvents(receipt: TransactionReceipt): any[]{
            let events = this.getAbiEvents();
            let result = [];
            for (let name in receipt.events){
                let data = receipt.events[name].raw;
                let event = events[data.topics[0]];
                result.push(this.web3.eth.abi.decodeLog(event.inputs, data.data, data.topics.slice(1)))
            }
            return result;
        }
        get events(): IEventType[]{
            let result = [];
            for (var i = 0; i < this._abi.length; i ++)	{
                if (this._abi[i].type == 'event')
                    result.push(this._abi[i])
            }
            return result;
        }
        protected methodsToUtf8(...args): Promise<string>{
            var self = this;            
            return new Promise<string>(async function(resolve, reject){
                let result = await self.methods.apply(self, args);
                resolve(self.wallet.utils.toUtf8(result));
            })
        }
        protected methodsToUtf8Array(...args): Promise<string[]>{
            var self = this;            
            return new Promise<string[]>(async function(resolve, reject){
                let result = await self.methods.apply(self, args);
                var arr = [];
                for (var i = 0; i < result.length; i ++){
                    arr.push(self.wallet.utils.toUtf8(result[i]))
                }
                resolve(arr);
            })
        }
        protected methodsFromWeiArray(...args): Promise<BigNumber[]>{            
            var self = this;            
            return new Promise<BigNumber[]>(async function(resolve, reject){
                let result = await self.methods.apply(self, args)
                var arr = [];
                for (var i = 0; i < result.length; i ++){
                    arr.push(new BigNumber(self.wallet.utils.fromWei(result[i])))
                }
                resolve(arr);
            })
        }
        protected methodsFromWei(...args): Promise<BigNumber>{            
            var self = this;
            return new Promise<BigNumber>(async function(resolve, reject){
                let result = await self.methods.apply(self, args);
                return resolve(new BigNumber(self.wallet.utils.fromWei(result)));
            })
        }
        protected _methods(...args): Promise<any>{
            args.unshift(this._address);
            args.unshift(this._abi);
            return this.wallet._methods.apply(this.wallet, args);
        }
        protected methods(...args): Promise<any>{
            args.unshift(this._address);
            args.unshift(this._abi);
            return this.wallet.methods.apply(this.wallet, args);
        }
        protected getAbiTopics(eventNames?: string[]){
            return this.wallet.getAbiTopics(this._abi, eventNames);
        }
        protected getAbiEvents(){
            if (!this._events)
                this._events = this.wallet.getAbiEvents(this._abi);
            return this._events;
        }
        scanEvents(fromBlock: number, toBlock: number|string, eventNames?: string[]): Promise<IEvent[]>{
            let topics = this.getAbiTopics(eventNames);
        	let events = this.getAbiEvents();
            return this.wallet.scanEvents(fromBlock, toBlock, topics, events, this._address);
        };
        async _deploy(...args): Promise<string>{
            if (typeof(args[args.length-1]) == 'undefined')
                args.pop();
            args.unshift(this._bytecode);
            args.unshift('deploy');
            args.unshift(null);
            args.unshift(this._abi);
            this._address = await this.wallet.methods.apply(this.wallet, args);
            return this._address;
        }
        get web3(): W3.default{
            return this.wallet.web3;
        }
    }
    export class TAuthContract extends Contract {
        rely(address: string): Promise<any>{
            return this.methods('rely', address)
        }
        deny(address: string): Promise<any>{
            return this.methods('deny', address)
        }
    }
}
export = Contract;