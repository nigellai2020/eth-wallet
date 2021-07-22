import { Wallet } from "./wallet";
import { BigNumber } from "bignumber.js";
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
    class Contract {
        wallet: Wallet;
        _abi: any;
        _bytecode: any;
        _address: string;
        privateKey: string;
        constructor(wallet: Wallet, address?: string, abi?: any, bytecode?: any);
        at(address: string): Contract;
        get address(): string;
        get events(): IEventType[];
        methodsToUtf8(...args: any[]): Promise<string>;
        methodsToUtf8Array(...args: any[]): Promise<string[]>;
        methodsFromWeiArray(...args: any[]): Promise<BigNumber[]>;
        methodsFromWei(...args: any[]): Promise<BigNumber>;
        methods(...args: any[]): Promise<any>;
        scanEvents(fromBlock: number, toBlock: number, eventNames?: string[]): Promise<IEvent[]>;
        _deploy(...args: any[]): Promise<string>;
    }
    class TAuthContract extends Contract {
        rely(address: string): Promise<any>;
        deny(address: string): Promise<any>;
    }
}
export = Contract;
