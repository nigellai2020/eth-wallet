import * as Wallet from '../wallet';
import * as Contract from '../contract';
import {BigNumber} from 'bignumber.js';

module ERC20{
	export class ERC20 extends Contract.TContract{
        private _decimals: BigNumber;

		constructor(wallet: Wallet.TWallet, address: string){
        	super(wallet, address, abi);
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
        async transfer(address: string, amount: number | BigNumber): Promise<Wallet.ITransactionReceipt>{
            let decimals = await this.decimals;
            let base = new BigNumber(10).pow(decimals);
            amount = new BigNumber(amount).multipliedBy(base);
        	return this.methods('transfer', address, amount);
        }
	};
	export const abi =  [        
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "minter",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
};
export = ERC20;