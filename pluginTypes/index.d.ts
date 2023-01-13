declare module "web3"{
    export default class {}
}
declare module "contracts/ERC1155/ERC1155.json" {
    const _default: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default;
}
declare module "contracts/ERC1155/ERC1155" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IBalanceOfParams {
        account: string;
        id: number | BigNumber;
    }
    export interface IBalanceOfBatchParams {
        accounts: string[];
        ids: (number | BigNumber)[];
    }
    export interface IIsApprovedForAllParams {
        account: string;
        operator: string;
    }
    export interface ISafeBatchTransferFromParams {
        from: string;
        to: string;
        ids: (number | BigNumber)[];
        amounts: (number | BigNumber)[];
        data: string;
    }
    export interface ISafeTransferFromParams {
        from: string;
        to: string;
        id: number | BigNumber;
        amount: number | BigNumber;
        data: string;
    }
    export interface ISetApprovalForAllParams {
        operator: string;
        approved: boolean;
    }
    export class ERC1155 extends _Contract {
        constructor(wallet: IWallet, address?: string);
        deploy(uri: string, options?: TransactionOptions): Promise<string>;
        parseApprovalForAllEvent(receipt: TransactionReceipt): ERC1155.ApprovalForAllEvent[];
        decodeApprovalForAllEvent(event: Event): ERC1155.ApprovalForAllEvent;
        parseTransferBatchEvent(receipt: TransactionReceipt): ERC1155.TransferBatchEvent[];
        decodeTransferBatchEvent(event: Event): ERC1155.TransferBatchEvent;
        parseTransferSingleEvent(receipt: TransactionReceipt): ERC1155.TransferSingleEvent[];
        decodeTransferSingleEvent(event: Event): ERC1155.TransferSingleEvent;
        parseURIEvent(receipt: TransactionReceipt): ERC1155.URIEvent[];
        decodeURIEvent(event: Event): ERC1155.URIEvent;
        balanceOf: {
            (params: IBalanceOfParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        balanceOfBatch: {
            (params: IBalanceOfBatchParams, options?: TransactionOptions): Promise<BigNumber[]>;
        };
        isApprovedForAll: {
            (params: IIsApprovedForAllParams, options?: TransactionOptions): Promise<boolean>;
        };
        safeBatchTransferFrom: {
            (params: ISafeBatchTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISafeBatchTransferFromParams, options?: TransactionOptions) => Promise<void>;
        };
        safeTransferFrom: {
            (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISafeTransferFromParams, options?: TransactionOptions) => Promise<void>;
        };
        setApprovalForAll: {
            (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetApprovalForAllParams, options?: TransactionOptions) => Promise<void>;
        };
        supportsInterface: {
            (interfaceId: string, options?: TransactionOptions): Promise<boolean>;
        };
        uri: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
    export module ERC1155 {
        interface ApprovalForAllEvent {
            account: string;
            operator: string;
            approved: boolean;
            _event: Event;
        }
        interface TransferBatchEvent {
            operator: string;
            from: string;
            to: string;
            ids: BigNumber[];
            values: BigNumber[];
            _event: Event;
        }
        interface TransferSingleEvent {
            operator: string;
            from: string;
            to: string;
            id: BigNumber;
            value: BigNumber;
            _event: Event;
        }
        interface URIEvent {
            value: string;
            id: BigNumber;
            _event: Event;
        }
    }
}
declare module "contracts/ERC20/ERC20.json" {
    const _default_1: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_1;
}
declare module "contracts/ERC20/ERC20" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        name: string;
        symbol: string;
    }
    export interface IAllowanceParams {
        owner: string;
        spender: string;
    }
    export interface IApproveParams {
        spender: string;
        amount: number | BigNumber;
    }
    export interface IDecreaseAllowanceParams {
        spender: string;
        subtractedValue: number | BigNumber;
    }
    export interface IIncreaseAllowanceParams {
        spender: string;
        addedValue: number | BigNumber;
    }
    export interface ITransferParams {
        to: string;
        amount: number | BigNumber;
    }
    export interface ITransferFromParams {
        from: string;
        to: string;
        amount: number | BigNumber;
    }
    export class ERC20 extends _Contract {
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        parseApprovalEvent(receipt: TransactionReceipt): ERC20.ApprovalEvent[];
        decodeApprovalEvent(event: Event): ERC20.ApprovalEvent;
        parseTransferEvent(receipt: TransactionReceipt): ERC20.TransferEvent[];
        decodeTransferEvent(event: Event): ERC20.TransferEvent;
        allowance: {
            (params: IAllowanceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        approve: {
            (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IApproveParams, options?: TransactionOptions) => Promise<boolean>;
        };
        balanceOf: {
            (account: string, options?: TransactionOptions): Promise<BigNumber>;
            txData: (account: string, options?: TransactionOptions) => Promise<string>;
        };
        decimals: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        decreaseAllowance: {
            (params: IDecreaseAllowanceParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IDecreaseAllowanceParams, options?: TransactionOptions) => Promise<boolean>;
        };
        increaseAllowance: {
            (params: IIncreaseAllowanceParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IIncreaseAllowanceParams, options?: TransactionOptions) => Promise<boolean>;
        };
        name: {
            (options?: TransactionOptions): Promise<string>;
        };
        symbol: {
            (options?: TransactionOptions): Promise<string>;
        };
        totalSupply: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        transfer: {
            (params: ITransferParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferParams, options?: TransactionOptions) => Promise<boolean>;
        };
        transferFrom: {
            (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferFromParams, options?: TransactionOptions) => Promise<boolean>;
        };
        private assign;
    }
    export module ERC20 {
        interface ApprovalEvent {
            owner: string;
            spender: string;
            value: BigNumber;
            _event: Event;
        }
        interface TransferEvent {
            from: string;
            to: string;
            value: BigNumber;
            _event: Event;
        }
    }
}
declare module "contracts/ERC721/ERC721.json" {
    const _default_2: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_2;
}
declare module "contracts/ERC721/ERC721" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        name: string;
        symbol: string;
    }
    export interface IApproveParams {
        to: string;
        tokenId: number | BigNumber;
    }
    export interface IIsApprovedForAllParams {
        owner: string;
        operator: string;
    }
    export interface ISafeTransferFromParams {
        from: string;
        to: string;
        tokenId: number | BigNumber;
    }
    export interface ISafeTransferFrom_1Params {
        from: string;
        to: string;
        tokenId: number | BigNumber;
        data: string;
    }
    export interface ISetApprovalForAllParams {
        operator: string;
        approved: boolean;
    }
    export interface ITransferFromParams {
        from: string;
        to: string;
        tokenId: number | BigNumber;
    }
    export class ERC721 extends _Contract {
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        parseApprovalEvent(receipt: TransactionReceipt): ERC721.ApprovalEvent[];
        decodeApprovalEvent(event: Event): ERC721.ApprovalEvent;
        parseApprovalForAllEvent(receipt: TransactionReceipt): ERC721.ApprovalForAllEvent[];
        decodeApprovalForAllEvent(event: Event): ERC721.ApprovalForAllEvent;
        parseTransferEvent(receipt: TransactionReceipt): ERC721.TransferEvent[];
        decodeTransferEvent(event: Event): ERC721.TransferEvent;
        approve: {
            (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IApproveParams, options?: TransactionOptions) => Promise<void>;
        };
        balanceOf: {
            (owner: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        getApproved: {
            (tokenId: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        isApprovedForAll: {
            (params: IIsApprovedForAllParams, options?: TransactionOptions): Promise<boolean>;
        };
        name: {
            (options?: TransactionOptions): Promise<string>;
        };
        ownerOf: {
            (tokenId: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        safeTransferFrom: {
            (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISafeTransferFromParams, options?: TransactionOptions) => Promise<void>;
        };
        safeTransferFrom_1: {
            (params: ISafeTransferFrom_1Params, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISafeTransferFrom_1Params, options?: TransactionOptions) => Promise<void>;
        };
        setApprovalForAll: {
            (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetApprovalForAllParams, options?: TransactionOptions) => Promise<void>;
        };
        supportsInterface: {
            (interfaceId: string, options?: TransactionOptions): Promise<boolean>;
        };
        symbol: {
            (options?: TransactionOptions): Promise<string>;
        };
        tokenURI: {
            (tokenId: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        transferFrom: {
            (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferFromParams, options?: TransactionOptions) => Promise<void>;
        };
        private assign;
    }
    export module ERC721 {
        interface ApprovalEvent {
            owner: string;
            approved: string;
            tokenId: BigNumber;
            _event: Event;
        }
        interface ApprovalForAllEvent {
            owner: string;
            operator: string;
            approved: boolean;
            _event: Event;
        }
        interface TransferEvent {
            from: string;
            to: string;
            tokenId: BigNumber;
            _event: Event;
        }
    }
}
declare module "contracts/MultiCall/MultiCall.json" {
    const _default_3: {
        abi: {
            inputs: ({
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            } | {
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            })[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        }[];
        bytecode: string;
    };
    export default _default_3;
}
declare module "contracts/MultiCall/MultiCall" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export interface IMulticallWithGasLimitationParams {
        calls: {
            to: string;
            data: string;
        }[];
        gasBuffer: number | BigNumber;
    }
    export class MultiCall extends _Contract {
        constructor(wallet: IWallet, address?: string);
        deploy(options?: number | BigNumber | TransactionOptions): Promise<string>;
        gasLeft: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        gaslimit: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        multicall: {
            (calls: {
                to: string;
                data: string;
            }[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (calls: {
                to: string;
                data: string;
            }[], options?: TransactionOptions) => Promise<string[]>;
        };
        multicallWithGas: {
            (calls: {
                to: string;
                data: string;
            }[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (calls: {
                to: string;
                data: string;
            }[], options?: TransactionOptions) => Promise<{
                results: string[];
                gasUsed: BigNumber[];
            }>;
        };
        multicallWithGasLimitation: {
            (params: IMulticallWithGasLimitationParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IMulticallWithGasLimitationParams, options?: TransactionOptions) => Promise<{
                results: string[];
                lastSuccessIndex: BigNumber;
            }>;
        };
        private assign;
    }
}
declare module "contracts/index" {
    export { ERC1155 } from "contracts/ERC1155/ERC1155";
    export { ERC20 } from "contracts/ERC20/ERC20";
    export { ERC721 } from "contracts/ERC721/ERC721";
    export { MultiCall } from "contracts/MultiCall/MultiCall";
}
declare module "contract" {
    /*!-----------------------------------------------------------
    * Copyright (c) IJS Technologies. All rights reserved.
    * Released under dual AGPLv3/commercial license
    * https://ijs.network
    *-----------------------------------------------------------*/
    import { IWallet, TransactionReceipt, Event, IBatchRequestObj } from "wallet";
    module Contract {
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
            protected getAbiEvents(): any;
            protected getAbiTopics(eventNames?: string[]): any[];
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
}
declare module "types" {
    /*!-----------------------------------------------------------
   * Copyright (c) IJS Technologies. All rights reserved.
   * Released under dual AGPLv3/commercial license
   * https://ijs.network
   *-----------------------------------------------------------*/
    export interface MessageTypeProperty {
        name: string;
        type: string;
    }
    export type EIP712TypeMap = {
        [type: string]: MessageTypeProperty[];
    };
    export interface IEIP712Domain {
        name: string;
        version: string;
        chainId: number;
        verifyingContract: string;
    }
    export enum SignTypedDataVersion {
        V1 = "V1",
        V3 = "V3",
        V4 = "V4"
    }
    export interface MessageTypes {
        EIP712Domain: MessageTypeProperty[];
        [additionalProperties: string]: MessageTypeProperty[];
    }
    export interface TypedMessage<T extends MessageTypes> {
        types: T;
        primaryType: keyof T;
        domain: {
            name?: string;
            version?: string;
            chainId?: number;
            verifyingContract?: string;
            salt?: ArrayBuffer;
        };
        message: Record<string, unknown>;
    }
}
declare module "constants" {
    export const EIP712DomainAbi: {
        name: string;
        type: string;
    }[];
    export const TYPED_MESSAGE_SCHEMA: {
        type: string;
        properties: {
            types: {
                type: string;
                additionalProperties: {
                    type: string;
                    items: {
                        type: string;
                        properties: {
                            name: {
                                type: string;
                            };
                            type: {
                                type: string;
                            };
                        };
                        required: string[];
                    };
                };
            };
            primaryType: {
                type: string;
            };
            domain: {
                type: string;
            };
            message: {
                type: string;
            };
        };
        required: string[];
    };
}
declare module "utils" {
    /*!-----------------------------------------------------------
    * Copyright (c) IJS Technologies. All rights reserved.
    * Released under dual AGPLv3/commercial license
    * https://ijs.network
    *-----------------------------------------------------------*/
    import { BigNumber } from "bignumber.js";
    import { EIP712TypeMap, IEIP712Domain, MessageTypes, TypedMessage } from "types";
    export function sleep(millisecond: number): Promise<unknown>;
    export function numberToBytes32(value: number | BigNumber, prefix?: boolean): string;
    export function padLeft(string: string, chars: number, sign?: string): string;
    export function padRight(string: string, chars: number, sign?: string): string;
    type stringArray = string | _stringArray;
    interface _stringArray extends Array<stringArray> {
    }
    export function stringToBytes32(value: string | stringArray): string | string[];
    export function stringToBytes(value: string | stringArray, nByte?: number): string | string[];
    export function addressToBytes32(value: string, prefix?: boolean): string;
    export function bytes32ToAddress(value: string): string;
    export function bytes32ToString(value: string): string;
    export function addressToBytes32Right(value: string, prefix?: boolean): string;
    export function toNumber(value: string | number | BigNumber): number;
    export function toDecimals(value: BigNumber | number | string, decimals?: number): BigNumber;
    export function fromDecimals(value: BigNumber | number | string, decimals?: number): BigNumber;
    export function toString(value: any): any;
    export const nullAddress = "0x0000000000000000000000000000000000000000";
    export function constructTypedMessageData(domain: IEIP712Domain, customTypes: EIP712TypeMap, primaryType: string, message: Record<string, unknown>): TypedMessage<MessageTypes>;
    export function getMultiCallAddress(chainId: number): any;
}
declare module "contracts/erc20" {
    /*!-----------------------------------------------------------
    * Copyright (c) IJS Technologies. All rights reserved.
    * Released under dual AGPLv3/commercial license
    * https://ijs.network
    *-----------------------------------------------------------*/
    import { IWallet, TransactionReceipt, Event } from "wallet";
    import { Contract } from "contract";
    import { BigNumber } from 'bignumber.js';
    export class Erc20 extends Contract {
        private _decimals;
        constructor(wallet: IWallet, address?: string, decimals?: number);
        deploy(params: {
            name: string;
            symbol: string;
            minter?: string;
            cap?: number | BigNumber;
        }): Promise<string>;
        parseApprovalEvent(receipt: TransactionReceipt): Erc20.ApprovalEvent[];
        decodeApprovalEvent(event: Event): Erc20.ApprovalEvent;
        parseTransferEvent(receipt: TransactionReceipt): Erc20.TransferEvent[];
        decodeTransferEvent(event: Event): Erc20.TransferEvent;
        allowance(params: {
            owner: string;
            spender: string;
        }): Promise<BigNumber>;
        approve(params: {
            spender: string;
            amount: number | BigNumber;
        }): Promise<any>;
        get balance(): Promise<BigNumber>;
        balanceOf(address: string): Promise<BigNumber>;
        get cap(): Promise<BigNumber>;
        get decimals(): Promise<number>;
        mint(params: {
            address: string;
            amount: number | BigNumber;
        }): Promise<any>;
        minter(): Promise<string>;
        get name(): Promise<string>;
        get symbol(): Promise<string>;
        get totalSupply(): Promise<BigNumber>;
        transfer(params: {
            address: string;
            amount: number | BigNumber;
        }): Promise<TransactionReceipt>;
    }
    export module Erc20 {
        interface ApprovalEvent {
            owner: string;
            spender: string;
            value: BigNumber;
            _event: Event;
        }
        interface TransferEvent {
            from: string;
            to: string;
            value: BigNumber;
            _event: Event;
        }
    }
}
declare module "wallet" {
    /*!-----------------------------------------------------------
    * Copyright (c) IJS Technologies. All rights reserved.
    * Released under dual AGPLv3/commercial license
    * https://ijs.network
    *-----------------------------------------------------------*/
    import * as W3 from 'web3';
    import { BigNumber } from 'bignumber.js';
    import { Erc20 } from "contracts/erc20";
    import { MessageTypes, TypedMessage } from "types";
    export function toString(value: any): any;
    export function stringToBytes32(value: string | stringArray): string | string[];
    export function stringToBytes(value: string | stringArray, nByte?: number): string | string[];
    export type stringArray = string | _stringArray;
    export interface _stringArray extends Array<stringArray> {
    }
    export interface IWalletUtils {
        fromDecimals(value: BigNumber | number | string, decimals?: number): BigNumber;
        fromWei(value: any, unit?: string): string;
        hexToUtf8(value: string): string;
        sha3(value: string): string;
        stringToBytes(value: string | stringArray, nByte?: number): string | string[];
        stringToBytes32(value: string | stringArray): string | string[];
        toDecimals(value: BigNumber | number | string, decimals?: number): BigNumber;
        toString(value: any): string;
        toUtf8(value: any): string;
        toWei(value: string, unit?: string): string;
    }
    export interface IWalletTransaction {
        hash: string;
        nonce: number;
        blockHash: string | null;
        blockNumber: number | null;
        transactionIndex: number | null;
        from: string;
        to: string | null;
        value: string;
        gasPrice: string;
        maxPriorityFeePerGas?: number | string | BigNumber;
        maxFeePerGas?: number | string | BigNumber;
        gas: number;
        input: string;
    }
    export interface IWalletBlockTransactionObject {
        number: number;
        hash: string;
        parentHash: string;
        nonce: string;
        sha3Uncles: string;
        logsBloom: string;
        transactionRoot: string;
        stateRoot: string;
        receiptsRoot: string;
        miner: string;
        extraData: string;
        gasLimit: number;
        gasUsed: number;
        timestamp: number | string;
        baseFeePerGas?: number;
        size: number;
        difficulty: number;
        totalDifficulty: number;
        uncles: string[];
        transactions: IWalletTransaction[];
    }
    export interface ITokenInfo {
        name: string;
        symbol: string;
        totalSupply: BigNumber;
        decimals: number;
    }
    export interface IBatchRequestResult {
        key: string;
        result: any;
    }
    export interface IBatchRequestObj {
        batch: any;
        promises: Promise<IBatchRequestResult>[];
        execute: (batch: IBatchRequestObj, promises: Promise<IBatchRequestResult>[]) => Promise<IBatchRequestResult[]>;
    }
    export interface IWallet {
        account: IAccount;
        accounts: Promise<string[]>;
        address: string;
        balance: Promise<BigNumber>;
        balanceOf(address: string): Promise<BigNumber>;
        _call(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<any>;
        chainId: number;
        createAccount(): IAccount;
        decode(abi: any, event: Log | EventLog, raw?: {
            data: string;
            topics: string[];
        }): Event;
        decodeErrorMessage(msg: string): any;
        decodeEventData(data: Log, events?: any): Promise<Event>;
        decodeLog(inputs: any, hexString: string, topics: any): any;
        defaultAccount: string;
        getAbiEvents(abi: any[]): any;
        getAbiTopics(abi: any[], eventNames: string[]): any[];
        getBlock(blockHashOrBlockNumber?: number | string, returnTransactionObjects?: boolean): Promise<IWalletBlockTransactionObject>;
        getBlockNumber(): Promise<number>;
        getBlockTimestamp(blockHashOrBlockNumber?: number | string): Promise<number>;
        getChainId(): Promise<number>;
        getContractAbi(address: string): any;
        getContractAbiEvents(address: string): any;
        getTransaction(transactionHash: string): Promise<Transaction>;
        methods(...args: any): Promise<any>;
        privateKey: string;
        recoverSigner(msg: string, signature: string): Promise<string>;
        registerAbi(abi: any[] | string, address?: string | string[], handler?: any): string;
        registerAbiContracts(abiHash: string, address: string | string[], handler?: any): any;
        send(to: string, amount: number): Promise<TransactionReceipt>;
        _send(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<any>;
        scanEvents(fromBlock: number, toBlock: number | string, topics?: any, events?: any, address?: string | string[]): Promise<Event[]>;
        signMessage(msg: string): Promise<string>;
        signTransaction(tx: any, privateKey?: string): Promise<string>;
        soliditySha3(...val: any[]): string;
        toChecksumAddress(address: string): string;
        tokenInfo(address: string): Promise<ITokenInfo>;
        _txData(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<string>;
        _txObj(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<Transaction>;
        utils: IWalletUtils;
        verifyMessage(account: string, msg: string, signature: string): Promise<boolean>;
        multiCall(calls: {
            to: string;
            data: string;
        }[], gasBuffer?: string): Promise<{
            results: string[];
            lastSuccessIndex: BigNumber;
        }>;
    }
    export interface IClientWallet extends IWallet {
        blockGasLimit(): Promise<number>;
        clientSideProvider: ClientSideProvider;
        connect(walletPlugin: WalletPlugin, events?: IClientSideProviderEvents, providerOptions?: IClientProviderOptions): Promise<any>;
        disconnect(): Promise<void>;
        getGasPrice(): Promise<BigNumber>;
        getTransaction(transactionHash: string): Promise<Transaction>;
        getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt>;
        isConnected: boolean;
        newContract(abi: any, address?: string): IContract;
        provider: any;
        registerEvent(abi: any, eventMap: {
            [topics: string]: any;
        }, address: string, handler: any): any;
        registerSendTxEvents(eventsOptions: ISendTxEventsOptions): void;
        sendSignedTransaction(signedTransaction: string): Promise<TransactionReceipt>;
        sendTransaction(transaction: Transaction): Promise<TransactionReceipt>;
        signTypedDataV4(data: TypedMessage<MessageTypes>): Promise<string>;
        switchNetwork(chainId: number, onChainChanged?: (chainId: string) => void): Promise<boolean>;
        transactionCount(): Promise<number>;
    }
    export interface IContractMethod {
        call: any;
        estimateGas(...params: any[]): Promise<number>;
        encodeABI(): string;
    }
    export interface IContract {
        deploy(params: {
            data: string;
            arguments?: any[];
        }): IContractMethod;
        methods: {
            [methodName: string]: (...params: any[]) => IContractMethod;
        };
    }
    export interface Event {
        name: string;
        address: string;
        blockNumber: number;
        logIndex: number;
        topics: string[];
        transactionHash: string;
        transactionIndex: number;
        data: any;
        rawData: any;
    }
    export interface Log {
        address: string;
        data: string;
        topics: Array<string>;
        logIndex: number;
        transactionHash?: string;
        transactionIndex: number;
        blockHash?: string;
        type?: string;
        blockNumber: number;
    }
    export interface EventLog {
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
    export interface TransactionReceipt {
        transactionHash: string;
        transactionIndex: number;
        blockHash: string;
        blockNumber: number;
        from: string;
        to: string;
        contractAddress?: string;
        cumulativeGasUsed: number;
        gasUsed: number;
        logs?: Array<Log>;
        events?: {
            [eventName: string]: EventLog | EventLog[];
        };
        status: boolean;
    }
    export interface Transaction {
        from?: string;
        to?: string;
        nonce?: number;
        gas?: number;
        gasPrice?: BigNumber;
        data?: string;
        value?: BigNumber;
    }
    export interface TransactionOptions {
        from?: string;
        nonce?: number;
        gas?: number;
        gasLimit?: number;
        gasPrice?: BigNumber | number;
        data?: string;
        value?: BigNumber | number;
    }
    export interface IKMS {
    }
    export interface IAccount {
        address: string;
        privateKey?: string;
        kms?: IKMS;
        sign?(): Promise<string>;
        signTransaction?(): Promise<any>;
    }
    export interface ITokenOption {
        address: string;
        symbol: string;
        decimals: number;
        image?: string;
    }
    export interface INetwork {
        chainId: number;
        chainName: string;
        nativeCurrency: {
            name: string;
            symbol: string;
            decimals: number;
        };
        rpcUrls: string[];
        blockExplorerUrls?: string[];
        iconUrls?: string[];
    }
    export interface IClientSideProviderEvents {
        onAccountChanged?: (account: string) => void;
        onChainChanged?: (chainId: string) => void;
        onConnect?: (connectInfo: any) => void;
        onDisconnect?: (error: any) => void;
    }
    export type NetworksMapType = {
        [chainId: number]: INetwork;
    };
    export const DefaultNetworksMap: NetworksMapType;
    export enum WalletPlugin {
        MetaMask = "metamask",
        Coin98 = "coin98",
        TrustWallet = "trustwallet",
        BinanceChainWallet = "binancechainwallet",
        ONTOWallet = "onto",
        WalletConnect = "walletconnect",
        BitKeepWallet = "bitkeepwallet"
    }
    export type WalletPluginConfigType = {
        [key in WalletPlugin]?: {
            provider: () => any;
            installed: () => boolean;
            homepage?: () => string;
        };
    };
    export const WalletPluginConfig: WalletPluginConfigType;
    export interface IClientProviderOptions {
        infuraId?: string;
        callWithDefaultProvider?: boolean;
        [key: string]: any;
    }
    export class ClientSideProvider {
        protected wallet: Wallet;
        protected _events?: IClientSideProviderEvents;
        protected _options?: IClientProviderOptions;
        protected _isConnected: boolean;
        provider: any;
        readonly walletPlugin: WalletPlugin;
        onAccountChanged: (account: string) => void;
        onChainChanged: (chainId: string) => void;
        onConnect: (connectInfo: any) => void;
        onDisconnect: (error: any) => void;
        constructor(wallet: Wallet, walletPlugin: WalletPlugin, events?: IClientSideProviderEvents, options?: IClientProviderOptions);
        get installed(): boolean;
        initEvents(): void;
        connect(): Promise<any>;
        disconnect(): Promise<void>;
        get isConnected(): boolean;
        addToken(option: ITokenOption, type?: string): Promise<boolean>;
        switchNetwork(chainId: number, onChainChanged?: (chainId: string) => void): Promise<boolean>;
        addNetwork(options: INetwork): Promise<boolean>;
    }
    export class BinanceChainWalletProvider extends ClientSideProvider {
        switchNetwork(chainId: number, onChainChanged?: (chainId: string) => void): Promise<boolean>;
    }
    export class Web3ModalProvider extends ClientSideProvider {
        private web3Modal;
        constructor(wallet: Wallet, walletPlugin: WalletPlugin, events?: IClientSideProviderEvents, options?: IClientProviderOptions);
        get installed(): boolean;
        private initializeWeb3Modal;
        connect(): Promise<any>;
        disconnect(): Promise<void>;
    }
    export function createClientSideProvider(wallet: Wallet, walletPlugin: WalletPlugin, events?: IClientSideProviderEvents, providerOptions?: IClientProviderOptions): ClientSideProvider;
    export interface ISendTxEventsOptions {
        transactionHash?: (error: Error, receipt?: string) => void;
        confirmation?: (receipt: any) => void;
    }
    export class Wallet implements IClientWallet {
        protected _web3: W3.default;
        protected _account: IAccount;
        private _accounts;
        private _provider;
        private _eventTopicAbi;
        private _eventHandler;
        protected _sendTxEventHandler: ISendTxEventsOptions;
        protected _contracts: {};
        protected _blockGasLimit: number;
        private _networksMap;
        chainId: number;
        clientSideProvider: ClientSideProvider;
        private _infuraId;
        private _utils;
        constructor(provider?: any, account?: IAccount | IAccount[]);
        private static readonly instance;
        static getInstance(): IWallet;
        static getClientInstance(): IClientWallet;
        static isInstalled(walletPlugin: WalletPlugin): boolean;
        get isConnected(): boolean;
        switchNetwork(chainId: number, onChainChanged?: (chainId: string) => void): Promise<any>;
        setDefaultProvider(): void;
        connect(walletPlugin: WalletPlugin, events?: IClientSideProviderEvents, providerOptions?: IClientProviderOptions): Promise<ClientSideProvider>;
        disconnect(): Promise<void>;
        get accounts(): Promise<string[]>;
        get address(): string;
        get account(): IAccount;
        set account(value: IAccount);
        get infuraId(): string;
        set infuraId(value: string);
        get networksMap(): NetworksMapType;
        getNetworkInfo(chainId: number): INetwork;
        setNetworkInfo(network: INetwork): void;
        setMultipleNetworksInfo(networks: INetwork[]): void;
        createAccount(): IAccount;
        decodeLog(inputs: any, hexString: string, topics: any): any;
        get defaultAccount(): string;
        set defaultAccount(address: string);
        getChainId(): Promise<number>;
        get provider(): any;
        set provider(value: any);
        sendSignedTransaction(tx: string): Promise<TransactionReceipt>;
        signTransaction(tx: any, privateKey?: string): Promise<string>;
        registerSendTxEvents(eventsOptions: ISendTxEventsOptions): void;
        private getContract;
        _call(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<any>;
        private _getMethod;
        _txObj(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<Transaction>;
        _send(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        _txData(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<string>;
        _methods(...args: any[]): Promise<{
            to: any;
            data: any;
        }>;
        methods(...args: any): Promise<any>;
        get balance(): Promise<BigNumber>;
        balanceOf(address: string): Promise<BigNumber>;
        recoverSigner(msg: string, signature: string): Promise<string>;
        getBlock(blockHashOrBlockNumber?: number | string, returnTransactionObjects?: boolean): Promise<IWalletBlockTransactionObject>;
        getBlockNumber(): Promise<number>;
        getBlockTimestamp(blockHashOrBlockNumber?: number | string): Promise<number>;
        set privateKey(value: string);
        registerEvent(abi: any, eventMap: {
            [topics: string]: any;
        }, address: string, handler: any): void;
        private _abiHashDict;
        private _abiContractDict;
        private _abiAddressDict;
        private _abiEventDict;
        getAbiEvents(abi: any[]): any;
        getAbiTopics(abi: any[], eventNames?: string[]): any[];
        getContractAbi(address: string): any;
        getContractAbiEvents(address: string): any;
        registerAbi(abi: any[] | string, address?: string | string[], handler?: any): string;
        registerAbiContracts(abiHash: string, address: string | string[], handler?: any): void;
        decode(abi: any, event: Log | EventLog, raw?: {
            data: string;
            topics: string[];
        }): Event;
        decodeEventData(data: Log, events?: any): Promise<Event>;
        scanEvents(fromBlock: number, toBlock: number | string, topics?: any, events?: any, address?: string | string[]): Promise<Event[]>;
        send(to: string, amount: number | BigNumber): Promise<TransactionReceipt>;
        setBlockTime(time: number): Promise<any>;
        increaseBlockTime(value: number): Promise<any>;
        signMessage(msg: string): Promise<string>;
        signTypedDataV4(data: TypedMessage<MessageTypes>): Promise<string>;
        token(tokenAddress: string, decimals?: number): Erc20;
        tokenInfo(tokenAddress: string): Promise<ITokenInfo>;
        get utils(): IWalletUtils;
        verifyMessage(account: string, msg: string, signature: string): Promise<boolean>;
        private _gasLimit;
        blockGasLimit(): Promise<number>;
        getGasPrice(): Promise<BigNumber>;
        transactionCount(): Promise<number>;
        sendTransaction(transaction: Transaction): Promise<TransactionReceipt>;
        getTransaction(transactionHash: string): Promise<Transaction>;
        getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt>;
        call(transaction: Transaction): Promise<any>;
        newContract(abi: any, address?: string): IContract;
        decodeErrorMessage(msg: string): any;
        newBatchRequest(): Promise<IBatchRequestObj>;
        soliditySha3(...val: any[]): string;
        toChecksumAddress(address: string): string;
        multiCall(calls: {
            to: string;
            data: string;
        }[], gasBuffer?: string): Promise<{
            results: string[];
            lastSuccessIndex: BigNumber;
        }>;
        get web3(): W3.default;
    }
}
/// <amd-module name="@ijstech/eth-wallet" />
declare module "@ijstech/eth-wallet" {
    /*!-----------------------------------------------------------
    * Copyright (c) IJS Technologies. All rights reserved.
    * Released under dual AGPLv3/commercial license
    * https://ijs.network
    *-----------------------------------------------------------*/
    export { IWallet, IWalletUtils, IAccount, Wallet, Transaction, Event, TransactionReceipt, ISendTxEventsOptions, IClientProviderOptions, WalletPlugin, WalletPluginConfig, IBatchRequestObj, INetwork } from "wallet";
    export { Contract } from "contract";
    export { BigNumber } from "bignumber.js";
    export { Erc20 } from "contracts/erc20";
    export * as Utils from "utils";
    export * as Contracts from "contracts/index";
    export * as Types from "types";
    export * as Constants from "constants";
}
