import {Wallet, ITransactionReceipt} from '../wallet';
import {Contract} from '../contract';
import {BigNumber} from 'bignumber.js';
const ABI = require('./erc20_abi').abi;

module ERC20{
	export class ERC20 extends Contract{
        private _decimals: BigNumber;

		constructor(wallet: Wallet, address: string){
        	super(wallet, address, ABI);
        }
        get balance(): Promise<BigNumber>{
            return this.balanceOf(this.wallet.address);
        }
        async balanceOf(address: string): Promise<BigNumber>{
            let self = this;
            return new Promise(async function(resolve, reject){
                try{
                    let decimals = await self.decimals;
                    let balance = new BigNumber(await self.methods('balanceOf', address));
                    let base = new BigNumber(10).pow(decimals);
                    resolve(balance.div(base));
                }
                catch(err){
                    reject(err)
                }
            })
        }
        get decimals(): Promise<number>{
            let self = this;
            return new Promise(async function(resolve, reject){
                try{
                    if (!self._decimals)
                        self._decimals = new BigNumber(await self.methods('decimals'));
                    resolve(self._decimals.toNumber());
                }
                catch(err){
                    reject(err)
                }
            })
        }
        get name(): Promise<string>{
        	return this.methods('name');
        }
        get symbol(): Promise<string>{
        	return this.methods('symbol');
        }
        get totalSupply(): Promise<BigNumber>{
            let self = this;        	
            return new Promise(async function(resolve, reject){
                try{
                    let decimals = await self.decimals;
                    let balance = new BigNumber(await self.methods('totalSupply'));
                    let base = new BigNumber(10).pow(decimals);
                    resolve(balance.div(base));
                }
                catch(err){
                    reject(err)
                }
            })
        }
        async transfer(address: string, amount: number | BigNumber): Promise<ITransactionReceipt>{
            let decimals = await this.decimals;
            let base = new BigNumber(10).pow(decimals);
            amount = new BigNumber(amount).multipliedBy(base);
        	return this.methods('transfer', address, amount);
        }
	};
};
export = ERC20;