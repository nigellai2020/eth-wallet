import { IWallet, TransactionReceipt, Event } from '../wallet';
import { Contract } from '../contract';
import { BigNumber } from 'bignumber.js';
export declare class Erc20 extends Contract {
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
    private methods;
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
export declare module Erc20 {
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
