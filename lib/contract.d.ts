import { Wallet } from "./wallet";
import { BigNumber } from "bignumber.js";
import * as W3 from 'web3';
declare module Contract {
    interface IEvent {
        name: string;
        address: string;
        blockNumber: number;
        transactionHash: string;
        transactionIndex: number;
        type: string;
        data: any;
    }
    interface IEventType {
        name: string;
    }
    interface Log {
        address: string;
        data: string;
        topics: Array<string>;
        logIndex: number;
        transactionHash: string;
        transactionIndex: number;
        blockHash: string;
        type: string;
        blockNumber: number;
    }
    interface EventLog {
        event: string;
        address: string;
        returnValues: any;
        logIndex: number;
        transactionIndex: number;
        transactionHash: string;
        blockHash: string;
        blockNumber: number;
        raw?: {
            data: string;
            topics: string[];
        };
    }
    interface TransactionReceipt {
        transactionHash: string;
        transactionIndex: number;
        blockHash: string;
        blockNumber: number;
        from: string;
        to: string;
        contractAddress: string;
        cumulativeGasUsed: number;
        gasUsed: number;
        logs?: Array<Log>;
        events?: {
            [eventName: string]: EventLog;
        };
        status: string;
    }
    class Contract {
        wallet: Wallet;
        _abi: any;
        _bytecode: any;
        _address: string;
        private _events;
        privateKey: string;
        constructor(wallet: Wallet, address?: string, abi?: any, bytecode?: any);
        at(address: string): Contract;
        get address(): string;
        protected decodeEvents(receipt: TransactionReceipt): any[];
        get events(): IEventType[];
        protected methodsToUtf8(...args: any[]): Promise<string>;
        protected methodsToUtf8Array(...args: any[]): Promise<string[]>;
        protected methodsFromWeiArray(...args: any[]): Promise<BigNumber[]>;
        protected methodsFromWei(...args: any[]): Promise<BigNumber>;
        protected _methods(...args: any[]): Promise<any>;
        protected methods(...args: any[]): Promise<any>;
        protected getAbiTopics(eventNames?: string[]): any[];
        protected getAbiEvents(): any;
        scanEvents(fromBlock: number, toBlock: number | string, eventNames?: string[]): Promise<IEvent[]>;
        _deploy(...args: any[]): Promise<string>;
        get web3(): W3.default;
    }
    class TAuthContract extends Contract {
        rely(address: string): Promise<any>;
        deny(address: string): Promise<any>;
    }
}
export = Contract;
