import { IWallet, TransactionReceipt, Event } from "../../wallet";
import { Contract } from '../../contract';
import { BigNumber } from "bignumber.js";
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
export declare class ERC1155 extends Contract {
    constructor(wallet: IWallet, address?: string);
    deploy(uri: string): Promise<string>;
    parseApprovalForAllEvent(receipt: TransactionReceipt): ERC1155.ApprovalForAllEvent[];
    decodeApprovalForAllEvent(event: Event): ERC1155.ApprovalForAllEvent;
    parseTransferBatchEvent(receipt: TransactionReceipt): ERC1155.TransferBatchEvent[];
    decodeTransferBatchEvent(event: Event): ERC1155.TransferBatchEvent;
    parseTransferSingleEvent(receipt: TransactionReceipt): ERC1155.TransferSingleEvent[];
    decodeTransferSingleEvent(event: Event): ERC1155.TransferSingleEvent;
    parseURIEvent(receipt: TransactionReceipt): ERC1155.URIEvent[];
    decodeURIEvent(event: Event): ERC1155.URIEvent;
    balanceOf: {
        (params: IBalanceOfParams): Promise<BigNumber>;
    };
    balanceOfBatch: {
        (params: IBalanceOfBatchParams): Promise<BigNumber[]>;
    };
    isApprovedForAll: {
        (params: IIsApprovedForAllParams): Promise<boolean>;
    };
    safeBatchTransferFrom: {
        (params: ISafeBatchTransferFromParams): Promise<TransactionReceipt>;
        call: (params: ISafeBatchTransferFromParams) => Promise<void>;
    };
    safeTransferFrom: {
        (params: ISafeTransferFromParams): Promise<TransactionReceipt>;
        call: (params: ISafeTransferFromParams) => Promise<void>;
    };
    setApprovalForAll: {
        (params: ISetApprovalForAllParams): Promise<TransactionReceipt>;
        call: (params: ISetApprovalForAllParams) => Promise<void>;
    };
    supportsInterface: {
        (interfaceId: string): Promise<boolean>;
    };
    uri: {
        (param1: number | BigNumber): Promise<string>;
    };
    private assign;
}
export declare module ERC1155 {
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
