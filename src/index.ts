/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/

export {
    IWallet, 
    IWalletUtils, 
    IAccount, 
    Transaction, 
    Event, 
    TransactionReceipt, 
    ISendTxEventsOptions, 
    IClientProviderOptions,
    IBatchRequestObj,
    INetwork,
    EthereumProvider,
    MetaMaskProvider,
    Web3ModalProvider,
    IClientSideProviderEvents,
    IClientSideProvider,
    IClientWalletConfig,
    IClientWallet,
    IMulticallInfo,
    IRpcWalletConfig,
    IRpcWallet
} from './wallet';
export {NodeWallet as Wallet} from './nodeWallet';
export {Contract} from './contract';
export {BigNumber} from "bignumber.js";
export {Erc20} from './contracts/erc20';
export {IWeb3, Web3} from './web3';
export {
    MerkleTree, 
    IMerkleTreeOptions, 
    IGetMerkleProofOptions,
    IGetMerkleLeafDataOptions
} from './merkleTree';
export * as Utils from './nodeUtils';
export * as Contracts from './contracts';
export * as Types from './nodeTypes';
export * as Constants from './constants';
export {IEventBusRegistry} from './eventBus';
export {
    getERC20Allowance,
    IERC20ApprovalEventOptions,
    IERC20ApprovalOptions,
    IERC20ApprovalAction,
    ERC20ApprovalModel
} from './approvalModel';