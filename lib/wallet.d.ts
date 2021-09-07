import { BigNumber } from 'bignumber.js';
import { ERC20 } from './contracts/erc20';
import { KMS } from './kms';
export interface IEvent {
    name: string;
    address: string;
    blockNumber: number;
    transactionHash: string;
    transactionIndex: number;
    type: string;
    data: any;
}
export interface ILog {
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
export interface IEventLog {
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
export interface ITransactionReceipt {
    transactionHash: string;
    transactionIndex: number;
    blockHash: string;
    blockNumber: number;
    from: string;
    to: string;
    contractAddress: string;
    cumulativeGasUsed: number;
    gasUsed: number;
    logs?: Array<ILog>;
    events?: {
        [eventName: string]: IEventLog;
    };
    status: string;
}
export declare const Networks: {
    1: {
        chainId: number;
        chainName: string;
    };
    3: {
        chainId: number;
        chainName: string;
    };
    4: {
        chainId: number;
        chainName: string;
    };
    42: {
        chainId: number;
        chainName: string;
    };
    56: {
        chainId: string;
        chainName: string;
        rpcUrls: string[];
        blockExplorerUrls: string[];
        nativeCurrency: {
            decimals: number;
            name: string;
            symbol: string;
        };
    };
    97: {
        chainId: string;
        chainName: string;
        rpcUrls: string[];
        blockExplorerUrls: string[];
        nativeCurrency: {
            decimals: number;
            name: string;
            symbol: string;
        };
    };
    1287: {
        chainId: string;
        chainName: string;
        rpcUrls: string[];
        blockExplorerUrls: string[];
        nativeCurrency: {
            decimals: number;
            name: string;
            symbol: string;
        };
    };
};
export interface IKMS {
}
export interface IAccount {
    address: string;
    privateKey?: string;
    kms?: IKMS;
    sign?(): Promise<string>;
    signTransaction?(): Promise<any>;
}
export declare class Wallet {
    private _web3;
    private _account;
    private _kms;
    chainId: number;
    constructor(provider?: string, account?: IAccount);
    get address(): string;
    set account(value: IAccount);
    createAccount(): IAccount;
    getChainId(): Promise<number>;
    methods(...args: any[]): Promise<any>;
    get balance(): Promise<BigNumber>;
    getBlockNumber(): Promise<number>;
    initKMS(value?: IKMS): Promise<void>;
    get kms(): KMS;
    set privateKey(value: string);
    getAbiEvents(abi: any): {};
    getAbiTopics(abi: any, eventNames: string[]): any[];
    scanEvents(abi: any, address: string, fromBlock: number, toBlock: number, eventNames?: string[]): Promise<IEvent[]>;
    send(to: string, amount: number): Promise<ITransactionReceipt>;
    signMessage(msg: string): Promise<string>;
    token(tokenAddress: string): ERC20;
    get utils(): import("web3-utils").Utils;
    verifyMessage(account: string, msg: string, signature: string): Promise<boolean>;
}
