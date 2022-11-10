/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
import {IWallet, Transaction, TransactionReceipt, Event} from '../wallet';
import {Contract} from '../contract';
import {BigNumber} from 'bignumber.js';
import * as Utils from '../utils';

const Abi = require('./bin/erc20').abi;
const Bytecode = require('./bin/erc20').bytecode;

	export class Erc20 extends Contract{
        private _decimals: number;

		constructor(wallet: IWallet, address?: string, decimals?: number){            
        	super(wallet, address, Abi, Bytecode);
            this._decimals = decimals;
        }
        async deploy(params:{name: string, symbol: string, minter?: string, cap?: number|BigNumber}): Promise<string>{ 
            return this.__deploy([params.name, params.symbol, params.minter || this.wallet.address, this.wallet.utils.toWei(params.cap?params.cap.toString():'1000000000')]);
        }
        parseApprovalEvent(receipt: TransactionReceipt): Erc20.ApprovalEvent[]{
            return this.parseEvents(receipt, "Approval").map(e=>this.decodeApprovalEvent(e));
        }
        decodeApprovalEvent(event: Event): Erc20.ApprovalEvent{
            let result = event.data;
            return {
                owner: result.owner,
                spender: result.spender,
                value: new BigNumber(result.value),
                _event: event
            };
        }
        parseTransferEvent(receipt: TransactionReceipt): Erc20.TransferEvent[]{
            return this.parseEvents(receipt, "Transfer").map(e=>this.decodeTransferEvent(e));
        }
        decodeTransferEvent(event: Event): Erc20.TransferEvent{
            let result = event.data;
            return {
                from: result.from,
                to: result.to,
                value: new BigNumber(result.value),
                _event: event
            };
        }

        async allowance(params:{owner: string, spender: string}): Promise<BigNumber>{
        	return Utils.fromDecimals(await this.methods('allowance', params.owner, params.spender), await this.decimals)        	
        }
        approve(params:{spender: string, amount: number|BigNumber}): Promise<any>{
            return new Promise(async (resolve, reject)=>{
                try{
                    resolve(this.methods('approve', params.spender, await Utils.toDecimals(params.amount, await this.decimals)));
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
        mint(params:{address: string, amount: number|BigNumber}): Promise<any>{
            return new Promise(async (resolve, reject)=>{
                try{                    
                    resolve(await this.methods('mint', params.address, await Utils.toDecimals(params.amount, await this.decimals)));
                }
                catch(err){
                    reject(err);
                }
            })            
        };
        // async _mint(params:{address: string, amount: number|BigNumber}): Promise<Transaction>{
        //     return this._methods('mint', params.address, await Utils.toDecimals(params.amount, await this.decimals))
        // }
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
        async transfer(params:{address: string, amount: number | BigNumber}): Promise<TransactionReceipt>{            
        	return this.methods('transfer', params.address, await Utils.toDecimals(params.amount, await this.decimals));
        }
        // async _transfer(params:{address: string, amount: number | BigNumber}): Promise<Transaction>{            
        // 	return this._methods('transfer', params.address, await Utils.toDecimals(params.amount, await this.decimals));
        // }
	}
    export module Erc20{
        export interface ApprovalEvent {owner:string,spender:string,value:BigNumber,_event:Event}
        export interface TransferEvent {from:string,to:string,value:BigNumber,_event:Event}
    }