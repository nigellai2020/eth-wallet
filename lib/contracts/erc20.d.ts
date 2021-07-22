import { Wallet, ITransactionReceipt } from '../wallet';
import { Contract } from '../contract';
import { BigNumber } from 'bignumber.js';
declare module ERC20 {
    class ERC20 extends Contract {
        private _decimals;
        constructor(wallet: Wallet, address: string);
        get balance(): Promise<BigNumber>;
        balanceOf(address: string): Promise<BigNumber>;
        get decimals(): Promise<number>;
        get name(): Promise<string>;
        get symbol(): Promise<string>;
        get totalSupply(): Promise<BigNumber>;
        transfer(address: string, amount: number | BigNumber): Promise<ITransactionReceipt>;
    }
}
export = ERC20;
