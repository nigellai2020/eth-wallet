import Eth from "web3-eth";
import * as WEB3_UTILS from "web3-utils";
export class Web3 {
	eth: Eth;
	utils = WEB3_UTILS;
	constructor(provider: any){
		this.eth = new Eth(provider);
	}
	get currentProvider(){
		return this.eth.currentProvider;
	}
	setProvider(provider){
		return this.eth.setProvider(provider)
	}
}
export module Web3 {
	export const utils = WEB3_UTILS;
}