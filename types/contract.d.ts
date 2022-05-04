import { IWallet, IContract, Transaction, TransactionReceipt, Event } from "./wallet";
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
        static contracts: {
            [abiHash: string]: IContract;
        };
        private getContract;
        constructor(wallet: IWallet, address?: string, abi?: any, bytecode?: any);
        at(address: string): Contract;
        set address(value: string);
        get address(): string;
        protected decodeEvents(receipt: TransactionReceipt): any[];
        protected parseEvents(receipt: TransactionReceipt, eventName: string): Event[];
        get events(): EventType[];
        protected getAbiTopics(eventNames?: string[]): any[];
        protected getAbiEvents(): any;
        scanEvents(fromBlock: number, toBlock: number | string, eventNames?: string[]): Promise<Event[]>;
        call(methodName: string, params?: any[], options?: any): Promise<any>;
        txObj(methodName: string, params?: any[], options?: any): Promise<Transaction>;
        private _send;
        _deploy(...params: any[]): Promise<string>;
        __deploy(params?: any[], options?: any): Promise<string>;
        send(methodName: string, params?: any[], options?: any): Promise<TransactionReceipt>;
    }
}
export = Contract;
