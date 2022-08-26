import { IWallet, Contract, TransactionReceipt, BigNumber, Event } from "../../";
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
export declare class ERC721 extends Contract {
    constructor(wallet: IWallet, address?: string);
    deploy(params: IDeployParams): Promise<string>;
    parseApprovalEvent(receipt: TransactionReceipt): ERC721.ApprovalEvent[];
    decodeApprovalEvent(event: Event): ERC721.ApprovalEvent;
    parseApprovalForAllEvent(receipt: TransactionReceipt): ERC721.ApprovalForAllEvent[];
    decodeApprovalForAllEvent(event: Event): ERC721.ApprovalForAllEvent;
    parseTransferEvent(receipt: TransactionReceipt): ERC721.TransferEvent[];
    decodeTransferEvent(event: Event): ERC721.TransferEvent;
    approve: {
        (params: IApproveParams): Promise<TransactionReceipt>;
        call: (params: IApproveParams) => Promise<void>;
    };
    balanceOf: {
        (owner: string): Promise<BigNumber>;
    };
    getApproved: {
        (tokenId: number | BigNumber): Promise<string>;
    };
    isApprovedForAll: {
        (params: IIsApprovedForAllParams): Promise<boolean>;
    };
    name: {
        (): Promise<string>;
    };
    ownerOf: {
        (tokenId: number | BigNumber): Promise<string>;
    };
    safeTransferFrom: {
        (params: ISafeTransferFromParams): Promise<TransactionReceipt>;
        call: (params: ISafeTransferFromParams) => Promise<void>;
    };
    safeTransferFrom_1: {
        (params: ISafeTransferFrom_1Params): Promise<TransactionReceipt>;
        call: (params: ISafeTransferFrom_1Params) => Promise<void>;
    };
    setApprovalForAll: {
        (params: ISetApprovalForAllParams): Promise<TransactionReceipt>;
        call: (params: ISetApprovalForAllParams) => Promise<void>;
    };
    supportsInterface: {
        (interfaceId: string): Promise<boolean>;
    };
    symbol: {
        (): Promise<string>;
    };
    tokenURI: {
        (tokenId: number | BigNumber): Promise<string>;
    };
    transferFrom: {
        (params: ITransferFromParams): Promise<TransactionReceipt>;
        call: (params: ITransferFromParams) => Promise<void>;
    };
    private assign;
}
export declare module ERC721 {
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
