import { Eth } from 'web3-eth';
import { Utils } from 'web3-utils';
import { provider } from 'web3-core';
export interface IWeb3 {
    eth: Eth;
    utils: Utils;
    currentProvider(): provider;
    setProvider(provider: provider): any;
}
export declare class Web3 {
    eth: Eth;
    utils: Utils;
    constructor(provider?: any | provider);
    get currentProvider(): provider;
    setProvider(provider: provider): boolean;
}
