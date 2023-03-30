// @ts-ignore
import { Eth } from 'web3-eth';
import { Utils } from 'web3-utils';
import {  provider} from 'web3-core';

const eth = require('web3-eth');
const utils = require('web3-utils');

export interface IWeb3{
	eth: Eth;
	utils: Utils;
	currentProvider(): provider;
	setProvider(provider: provider): any;
};
export class Web3 {
	eth: Eth;
	utils: Utils = utils;
	constructor(provider?: any | provider){
		this.eth = new eth(provider);
	}
	get currentProvider(): provider{
		return this.eth.currentProvider;
	}
	setProvider(provider: provider): boolean{
		return this.eth.setProvider(provider)
	}
};
module.exports = Web3;