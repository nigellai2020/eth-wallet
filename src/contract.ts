/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/

import {IWallet, IContract, IContractMethod, Transaction, TransactionReceipt, Event, EventLog, IBatchRequestObj} from "./wallet";
import * as Utils from "./utils";

// import * as W3 from 'web3';
// const Web3 = require('web3'); // tslint:disable-line
module Contract {
    export interface EventType{
		name: string
	}
    export class Contract {
        public wallet: IWallet;
        public _abi: any;
        public _bytecode: any;
        public _address: string;
        private _events: any;
        public privateKey: string;
        private abiHash: string;        

        constructor(wallet: IWallet, address?: string, abi?: any, bytecode?: any) {            
            this.wallet = wallet;
            if (abi)
                this.abiHash = this.wallet.registerAbi(abi);
            if (typeof(abi) == 'string')
                this._abi = JSON.parse(abi)
            else
                this._abi = abi            
            this._bytecode = bytecode
            if (address)
                this._address = address;
        }    
        at(address: string): Contract {
            this._address = address;
            return this;
        }
        set address(value: string){
            this._address = value;
        }
        get address(): string{
            return this._address || '';
        }
        protected decodeEvents(receipt: TransactionReceipt): any[]{
            let events = this.getAbiEvents();
            let result = [];
            for (let name in receipt.events){
                let events = <EventLog[]>( Array.isArray(receipt.events[name]) ? receipt.events[name] : [receipt.events[name]] );
                events.forEach(e=>{
                    let data = e.raw;
                    let event = events[data.topics[0]];
                    result.push(Object.assign({_name:name, _address:this.address},this.wallet.decodeLog(event.inputs, data.data, data.topics.slice(1))));
                });
            }
            return result;
        }
        protected parseEvents(receipt: TransactionReceipt, eventName: string): Event[]{
            let eventAbis = this.getAbiEvents();
            let topic0 = this.getAbiTopics([eventName])[0];

            let result = [];
            if (receipt.events) {
                for (let name in receipt.events){
                    let events = <EventLog[]>( Array.isArray(receipt.events[name]) ? receipt.events[name] : [receipt.events[name]] );
                    events.forEach(event=>{
                        if (topic0 == event.raw.topics[0] && (this.address && this.address==event.address)) {
                            result.push(this.wallet.decode(eventAbis[topic0], event, event.raw));
                        }
                    });
                }
            } else if (receipt.logs) {
                for (let i = 0 ; i < receipt.logs.length ; i++) {
                    let log = receipt.logs[i];
                    if (topic0 == log.topics[0] && (this.address && this.address==log.address)) {
                        result.push(this.wallet.decode(eventAbis[topic0], log));
                    }
                }

            }
            return result;
        }
        get events(): EventType[]{
            let result = [];
            for (let i = 0; i < this._abi.length; i ++)	{
                if (this._abi[i].type == 'event')
                    result.push(this._abi[i])
            }
            return result;
        }
        protected getAbiEvents(){
            if (!this._events){
                this._events = {};
                let events = this._abi.filter(e => e.type=="event");
                for (let i = 0 ; i < events.length ; i++) {
                    let topic = this.wallet.utils.sha3(events[i].name + "(" + events[i].inputs.map(e=>e.type=="tuple" ? "("+(e.components.map(f=>f.type)) +")" : e.type).join(",") + ")");
                    this._events[topic] = events[i];
                }
            }
            return this._events;
        }
        protected getAbiTopics(eventNames?: string[]): any[]{
			if (!eventNames || eventNames.length == 0)
				eventNames = null;
			let result = [];
            let events = this.getAbiEvents();
            for (let topic in events) {
                if (!eventNames || eventNames.includes(events[topic].name)){
                    result.push(topic);
                }
            }
			if (result.length == 0 && eventNames && eventNames.length > 0)
				return ['NULL']
		    return [result];
		}
        registerEvents(handler: any) {
            if (this._address)
                this.wallet.registerEvent(this.getAbiEvents(), this._address, handler);
        }
        scanEvents(fromBlock: number, toBlock: number|string, eventNames?: string[]): Promise<Event[]>{
            let topics = this.getAbiTopics(eventNames);
        	let events = this.getAbiEvents();
            return this.wallet.scanEvents(fromBlock, toBlock, topics, events, this._address);
        };
        async batchCall(batchObj: IBatchRequestObj, key: string, methodName: string, params?: any[], options?:any){
            //TODO: implement the batch call

            // let contract = await this.getContract();
            // if (!contract.methods[methodName]) return;
            // let method = <IContractMethod>contract.methods[methodName].apply(this, params);
            // batchObj.promises.push(new Promise((resolve, reject) => {
            //     batchObj.batch.add(method.call.request({from: this.wallet.address, ...options}, 
            //         (e,v) => {
            //             return resolve({
            //                 key:key, 
            //                 result:e ? null : v
            //             });
            //         }
            //     ));
            // }));
        }        
        protected async call(methodName:string, params?:any[], options?:any): Promise<any>{
            return await this.wallet._call(this.abiHash, this._address, methodName, params, options);
        }
        private async _send(methodName:string, params?:any[], options?:any): Promise<TransactionReceipt>{
            params = params || [];         
            if (!methodName)   
                params.unshift(this._bytecode);
            return await this.wallet._send(this.abiHash, this._address, methodName, params, options);
        }
        protected async __deploy(params?:any[], options?:any): Promise<string>{                        
            let receipt = await this._send('', params, options);
            this.address = receipt.contractAddress;
            return this.address;
        }
        protected send(methodName:string, params?:any[], options?:any): Promise<TransactionReceipt>{
            let receipt = this._send(methodName, params, options);
            return receipt;
        }

        // backward compatability
        protected _deploy(...params:any[]): Promise<string>{            
            return this.__deploy(params);
        }
        protected methods(methodName:string, ...params:any[]) {
            let method = this._abi.find(e=>e.name==methodName);
            if (method.stateMutability == "view" || method.stateMutability == "pure") {
                return this.call(methodName, params);
            } else if (method.stateMutability=='payable') {
                let value = params.pop();
                return this.call(methodName, params, {value:value});
            } else {
                return this.send(methodName, params);
            }
        }
    }
}
export = Contract;