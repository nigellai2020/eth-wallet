import {IWallet, IContract, IContractMethod, Transaction, TransactionReceipt, Event, Log, EventLog} from "./wallet";
import * as Utils from "./utils";

import {BigNumber} from "bignumber.js";
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

        static contracts:{[abiHash:string]:IContract} = {};
        private async getContract(): Promise<IContract>{
            let contract;
            if (this.address) {
                contract = Contract.contracts[(await this.wallet.getChainId()) + ":" + this.address];
                if (!contract) {
                    contract = this.wallet.newContract(this._abi, this.address);
                    Contract.contracts[(await this.wallet.getChainId()) + ":" + this.address] = contract;
                }
            }
            else {
                if (!contract) {
                    let hash = this.wallet.utils.sha3(JSON.stringify(this._abi));
                    contract = Contract.contracts[hash];
                    if (!contract) {
                        contract = this.wallet.newContract(this._abi);
                        Contract.contracts[hash] = contract;
                    }
                }
            }
            return contract;            
        }

        constructor(wallet: IWallet, address?: string, abi?: any, bytecode?: any) {            
            this.wallet = wallet;                        
            if (typeof(abi) == 'string')
                this._abi = JSON.parse(abi)
            else
                this._abi = abi
            this._bytecode = bytecode
            let self = this;
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
        // protected methods(...args): Promise<any>{
        //     args.unshift(this._address);
        //     args.unshift(this._abi);
        //     return this.wallet.methods.apply(this.wallet, args);
        // }
        protected getAbiTopics(eventNames?: string[]){
            return this.wallet.getAbiTopics(this._abi, eventNames);
        }
        protected getAbiEvents(){
            if (!this._events)
                this._events = this.wallet.getAbiEvents(this._abi);
            return this._events;
        }
        scanEvents(fromBlock: number, toBlock: number|string, eventNames?: string[]): Promise<Event[]>{
            let topics = this.getAbiTopics(eventNames);
        	let events = this.getAbiEvents();
            return this.wallet.scanEvents(fromBlock, toBlock, topics, events, this._address);
        };
        // async _deploy(...args): Promise<string>{
        //     if (typeof(args[args.length-1]) == 'undefined')
        //         args.pop();
        //     args.unshift(this._bytecode);
        //     args.unshift('deploy');
        //     args.unshift(null);
        //     args.unshift(this._abi);
        //     this._address = await this.wallet.methods.apply(this.wallet, args);
        //     return this._address;
        // }
        async call(methodName:string, params?:any[], options?:any): Promise<any>{
            let contract = await this.getContract();
            params = params || [];
            let method = <IContractMethod>contract.methods[methodName].apply(this, params);
            return method.call({from:this.address, ...options});
        }
		async txObj(methodName:string, params?:any[], options?:any): Promise<Transaction>{
            let contract = await this.getContract();
            params = params || [];

            let methodAbi = this._abi.find(e=>methodName ? e.name==methodName : e.type=="constructor");
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
                method = contract.deploy({data:this._bytecode, arguments:params});
            else
                method = contract.methods[methodName].apply(this, params);

            let tx:any = {};
            tx.from = this.wallet.address;
            tx.to = this.address;
            tx.data = method.encodeABI();
            if (options && options.value) {
                tx.value = options.value;
            } else {
                tx.value = 0;
            }
            if (options && (options.gas || options.gasLimit)) {
                tx.gas = options.gas || options.gasLimit;
            } else {
                try {
                    tx.gas = await method.estimateGas({ from: this.wallet.address, to: this.address ? this.address : undefined, value: (options&&options.value) || 0 });
                    tx.gas = Math.min(await this.wallet.blockGasLimit(), Math.round(tx.gas * 1.5));

                } catch (e) {
                    if (e.message == "Returned error: out of gas"){ // amino
                        console.log(e.message);
                        tx.gas = Math.round(await this.wallet.blockGasLimit() * 0.5);
                    } else {
                        try{
                            await method.call({from:this.address, ...options});
                        } catch(e) {
                            if (e.message.includes("VM execution error.")) {
                                var msg = (e.data || e.message).match(/0x[0-9a-fA-F]+/);
                                if (msg && msg.length) {
                                    msg = msg[0];
                                    if (msg.startsWith("0x08c379a")) {
                                        msg = this.wallet.decodeErrorMessage(msg);//('string', "0x"+msg.substring(10));
                                        throw new Error(msg);
                                    }
                                }
                            }
                        }
                        throw e;
                    }
                }
            }
            if (!tx.gasPrice) {
                tx.gasPrice = await this.wallet.getGasPrice();
            }
            if (options && options.nonce){
                tx.nonce = options.nonce;
            } else {
                tx.nonce = await this.wallet.transactionCount();
            }
            return tx;
        }
        private async _send(methodName:string, params?:any[], options?:any): Promise<TransactionReceipt>{
            let tx = await this.txObj(methodName, params, options);
            let receipt = await this.wallet.sendTransaction(tx);
            return receipt;
        }
        _deploy(...params:any[]): Promise<string>{
            return this.__deploy(params);
        }
        async __deploy(params?:any[], options?:any): Promise<string>{
            let receipt = await this._send('', params, options);
            this.address = receipt.contractAddress;
            return this.address;
        }
        send(methodName:string, params?:any[], options?:any): Promise<TransactionReceipt>{
            let receipt = this._send(methodName, params, options);
            return receipt;
        }
    }
}
export = Contract;