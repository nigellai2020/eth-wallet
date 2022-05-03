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
        _deploy(...args: any[]): Promise<string>;
        call(methodName: string, params?: any[], options?: any): Promise<any>;
        txObj(methodName: string, params?: any[], options?: any): Promise<Transaction>;
        send(methodName: string, params?: any[], options?: any): Promise<any>;
    }
}
export = Contract;
