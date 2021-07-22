import {Wallet} from "./wallet";
import {BigNumber} from "bignumber.js";

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
    export class Contract {
        public wallet: Wallet;
        public _abi: any;
        public _bytecode: any;
        public _address: string;
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
        get events(): IEventType[]{
            let result = [];
            for (var i = 0; i < this._abi.length; i ++)	{
                if (this._abi[i].type == 'event')
                    result.push(this._abi[i])
            }
            return result;
        }
        methodsToUtf8(...args): Promise<string>{
            var self = this;            
            return new Promise<string>(async function(resolve, reject){
                let result = await self.methods.apply(self, args);
                resolve(self.wallet.utils.toUtf8(result));
            })
        }
        methodsToUtf8Array(...args): Promise<string[]>{
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
        methodsFromWeiArray(...args): Promise<BigNumber[]>{            
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
        methodsFromWei(...args): Promise<BigNumber>{            
            var self = this;
            return new Promise<BigNumber>(async function(resolve, reject){
                let result = await self.methods.apply(self, args);
                return resolve(new BigNumber(self.wallet.utils.fromWei(result)));
            })
        }
        methods(...args): Promise<any>{
            args.unshift(this._address);
            args.unshift(this._abi);
            return this.wallet.methods.apply(this.wallet, args);
        }
        scanEvents(fromBlock: number, toBlock: number, eventNames?: string[]): Promise<IEvent[]>{
            return this.wallet.scanEvents(this._abi, this._address, fromBlock, toBlock, eventNames);
        };
        _deploy(...args): Promise<string>{
            if (typeof(args[args.length-1]) == 'undefined')
                args.pop();
            args.unshift(this._bytecode);
            args.unshift('deploy');
            args.unshift(null);
            args.unshift(this._abi);
            return this.wallet.methods.apply(this.wallet, args);
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