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
export declare class ERC1155 extends _Contract {
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
