import {Wallet, Transaction, TransactionReceipt} from '../wallet';
import {Contract} from '../contract';
import {BigNumber} from 'bignumber.js';
import * as Utils from '../utils';

const Abi = require('./bin/erc20').abi;
const Bytecode = require('./bin/erc20').bytecode;

module ERC20{
	export class Erc20 extends Contract{
        private _decimals: number;

		constructor(wallet: Wallet, address?: string, decimals?: number){            
        	super(wallet, address, Abi, Bytecode);
            this._decimals = decimals;
        }
        async deploy(name: string, symbol: string, minter?: string, cap?: number): Promise<string>{ 
            return this._deploy(name, symbol, minter || this.wallet.address, this.wallet.utils.toWei(cap?cap.toString():'1000000000'));
        }
        async allowance(owner: string, spender: string): Promise<BigNumber>{
        	return Utils.fromDecimals(await this.methods('allowance', owner, spender), await this.decimals)        	
        }
        approve(spender: string, amount: number): Promise<any>{
            return new Promise(async (resolve, reject)=>{
                try{
                    resolve(this.methods('approve', spender, await Utils.toDecimals(amount, await this.decimals)));
                }   
                catch(err){
                    reject(err)
                }
            })
        }
        get balance(): Promise<BigNumber>{
            return this.balanceOf(this.wallet.address);
        }
        async balanceOf(address: string): Promise<BigNumber>{
            return new Promise(async (resolve, reject)=>{
                try{
                    resolve(await Utils.fromDecimals(await this.methods('balanceOf', address), await this.decimals));
                }
                catch(err){
                    reject(err)
                }
            })
        }
        get cap(): Promise<BigNumber>{
            return new Promise(async (resolve, reject)=>{
                try{
                    resolve(await Utils.fromDecimals(await this.methods('cap'), await this.decimals))
                }
                catch(err){
                    reject(err);
                }
            })
        }
        get decimals(): Promise<number>{
            return new Promise<number>(async (resolve, reject) =>{
                try{
                    if (!this._decimals)
                        this._decimals = new BigNumber(await this.methods('decimals')).toNumber();
                    resolve(this._decimals);
                }
                catch(err){
                    reject(err)
                }
            })
        }        
        mint(address: string, amount: number|BigNumber): Promise<any>{
            return new Promise(async (resolve, reject)=>{
                try{                    
                    resolve(await this.methods('mint', address, await Utils.toDecimals(amount, await this.decimals)));
                }
                catch(err){
                    reject(err);
                }
            })            
        }
        async _mint(address: string, amount: number|BigNumber): Promise<Transaction>{
            return this._methods('mint', address, await Utils.toDecimals(amount, await this.decimals))
        }
        minter(): Promise<string>{
            return this.methods('minter');
        }
        get name(): Promise<string>{
        	return this.methods('name');
        }
        get symbol(): Promise<string>{            
        	return this.methods('symbol');
        }
        get totalSupply(): Promise<BigNumber>{
            return new Promise(async (resolve, reject)=>{
                try{
                    resolve(await Utils.fromDecimals(await this.methods('totalSupply'), await this.decimals))
                }
                catch(err){
                    reject(err)
                }
            })
        }
        async transfer(address: string, amount: number | BigNumber): Promise<TransactionReceipt>{            
        	return this.methods('transfer', address, await Utils.toDecimals(amount, await this.decimals));
        }
        async _transfer(address: string, amount: number | BigNumber): Promise<Transaction>{            
        	return this._methods('transfer', address, await Utils.toDecimals(amount, await this.decimals));
        }
	};
};
export = ERC20;