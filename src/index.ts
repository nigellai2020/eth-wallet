if (typeof window !== 'undefined' && window['BigNumber'])
    window["bignumber.js"] = window['BigNumber'];
    
export {Wallet, Transaction, Event, TransactionReceipt} from './wallet';
export {Contract} from './contract';
export {BigNumber} from "bignumber.js";
export {Erc20} from './contracts/erc20';
export * as Utils from './utils';