import * as W3 from 'web3';
import { BlockTransactionObject } from 'web3-eth';
import { BigNumber } from 'bignumber.js';
import { Erc20 } from './contracts/erc20';
declare module Wallet {
    interface IEvent {
        name: string;
        address: string;
        blockNumber: number;
        transactionHash: string;
        transactionIndex: number;
        type: string;
        data: any;
    }
    interface ILog {
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
    interface IEventLog {
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
        logs?: Array<ILog>;
        events?: {
            [eventName: string]: IEventLog;
        };
        status: string;
    }
    interface Transaction {
        to: string;
        gas: number;
        data: string;
    }
    const Networks: {
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
    interface IKMS {
    }
    interface IAccount {
        address: string;
        privateKey?: string;
        kms?: IKMS;
        sign?(): Promise<string>;
        signTransaction?(): Promise<any>;
    }
    class Wallet {
        private _web3;
        private _account;
        private _kms;
        private _provider;
        private _abiHashDict;
        private _abiAddressDict;
        private _abiEventDict;
        chainId: number;
        constructor(provider?: any, account?: IAccount);
        get accounts(): Promise<string[]>;
        get address(): string;
        get account(): IAccount;
        set account(value: IAccount);
        createAccount(): IAccount;
        get defaultAccount(): string;
        set defaultAccount(address: string);
        getChainId(): Promise<number>;
        sendSignedTransaction(tx: string): Promise<any>;
        signTransaction(tx: any, privateKey?: string): Promise<string>;
        _methods(...args: any[]): Promise<{
            to: any;
            data: any;
        }>;
        methods(...args: any[]): Promise<any>;
        get balance(): Promise<BigNumber>;
        balanceOf(address: string): Promise<BigNumber>;
        recoverSigner(msg: string, signature: string): Promise<string>;
        getBlock(blockHashOrBlockNumber: number | string, returnTransactionObjects?: boolean): Promise<BlockTransactionObject>;
        getBlockNumber(): Promise<number>;
        getBlockTimestamp(blockHashOrBlockNumber?: number | string): Promise<number>;
        initKMS(value?: IKMS): Promise<void>;
        private get kms();
        set privateKey(value: string);
        getAbiEvents(abi: any[]): any;
        getAbiTopics(abi: any[], eventNames: string[]): any[];
        getContractAbi(address: string): any;
        getContractAbiEvents(address: string): any;
        registerAbi(abi: any[], addresses?: string[]): string;
        registerAbiContracts(abiHash: string, addresses: string[]): void;
        scanEvents(fromBlock: number, toBlock: number | string, topics?: any, events?: any, address?: string): Promise<IEvent[]>;
        send(to: string, amount: number): Promise<TransactionReceipt>;
        setBlockTime(time: number): Promise<any>;
        signMessage(msg: string): Promise<string>;
        token(tokenAddress: string, decimals?: number): Erc20;
        get utils(): import("web3-utils").Utils;
        verifyMessage(account: string, msg: string, signature: string): Promise<boolean>;
        get web3(): W3.default;
    }
}
export = Wallet;
