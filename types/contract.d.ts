import { IWallet, TransactionReceipt, Event } from "./wallet";
import { BigNumber } from "bignumber.js";
declare module Contract {
    interface EventType {
        name: string;
    }
    class Contract {
        wallet: IWallet;
        _abi: any;
        _bytecode: any;
        _address: string;
        private _events;
        privateKey: string;
        constructor(wallet: IWallet, address?: string, abi?: any, bytecode?: any);
        at(address: string): Contract;
        set address(value: string);
        get address(): string;
        protected decodeEvents(receipt: TransactionReceipt): any[];
        protected parseEvents(receipt: TransactionReceipt, eventName: string): Event[];
        get events(): EventType[];
        protected methodsToUtf8(...args: any[]): Promise<string>;
        protected methodsToUtf8Array(...args: any[]): Promise<string[]>;
        protected methodsFromWeiArray(...args: any[]): Promise<BigNumber[]>;
        protected methodsFromWei(...args: any[]): Promise<BigNumber>;
        protected methods(...args: any[]): Promise<any>;
        protected getAbiTopics(eventNames?: string[]): any[];
        protected getAbiEvents(): any;
        scanEvents(fromBlock: number, toBlock: number | string, eventNames?: string[]): Promise<Event[]>;
        _deploy(...args: any[]): Promise<string>;
    }
    class TAuthContract extends Contract {
        rely(address: string): Promise<any>;
        deny(address: string): Promise<any>;
    }
}
export = Contract;
