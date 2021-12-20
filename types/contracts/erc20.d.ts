import { Wallet, Transaction, TransactionReceipt } from '../wallet';
import { Contract } from '../contract';
import { BigNumber } from 'bignumber.js';
declare module ERC20 {
    class Erc20 extends Contract {
        private _decimals;
        constructor(wallet: Wallet, address?: string, decimals?: number);
        deploy(name: string, symbol: string, minter?: string, cap?: number | BigNumber): Promise<string>;
        allowance(owner: string, spender: string): Promise<BigNumber>;
        approve(spender: string, amount: number | BigNumber): Promise<any>;
        get balance(): Promise<BigNumber>;
        balanceOf(address: string): Promise<BigNumber>;
        get cap(): Promise<BigNumber>;
        get decimals(): Promise<number>;
        mint(address: string, amount: number | BigNumber): Promise<any>;
        _mint(address: string, amount: number | BigNumber): Promise<Transaction>;
        minter(): Promise<string>;
        get name(): Promise<string>;
        get symbol(): Promise<string>;
        get totalSupply(): Promise<BigNumber>;
        transfer(address: string, amount: number | BigNumber): Promise<TransactionReceipt>;
        _transfer(address: string, amount: number | BigNumber): Promise<Transaction>;
    }
}
export = ERC20;
