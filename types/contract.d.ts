/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
import { IWallet, TransactionReceipt, Event, IBatchRequestObj } from "./wallet";
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
        private abiHash;
        constructor(wallet: IWallet, address?: string, abi?: any, bytecode?: any);
        at(address: string): Contract;
        set address(value: string);
        get address(): string;
        protected decodeEvents(receipt: TransactionReceipt): any[];
        protected parseEvents(receipt: TransactionReceipt, eventName: string): Event[];
        get events(): EventType[];
        getAbiEvents(): any;
        getAbiTopics(eventNames?: string[]): any[];
        scanEvents(fromBlock: number, toBlock: number | string, eventNames?: string[]): Promise<Event[]>;
        batchCall(batchObj: IBatchRequestObj, key: string, methodName: string, params?: any[], options?: any): Promise<void>;
        protected call(methodName: string, params?: any[], options?: any): Promise<any>;
        private _send;
        protected __deploy(params?: any[], options?: any): Promise<string>;
        protected send(methodName: string, params?: any[], options?: any): Promise<TransactionReceipt>;
        protected _deploy(...params: any[]): Promise<string>;
        protected methods(methodName: string, ...params: any[]): Promise<any>;
    }
}
export = Contract;
