/// <amd-module name="@ijstech/eth-wallet/approvalModel/ERC20ApprovalModel.ts" />
import { BigNumber } from 'bignumber.js';
import { IRpcWallet } from "../wallet";
import { ITokenObject } from '../types';
export declare const getERC20Allowance: (wallet: IRpcWallet, token: ITokenObject, spenderAddress: string) => Promise<BigNumber>;
export interface IERC20ApprovalEventOptions {
    sender: any;
    payAction: () => Promise<void>;
    onToBeApproved: (token: ITokenObject) => Promise<void>;
    onToBePaid: (token: ITokenObject) => Promise<void>;
    onApproving: (token: ITokenObject, receipt?: string, data?: any) => Promise<void>;
    onApproved: (token: ITokenObject, data?: any) => Promise<void>;
    onPaying: (receipt?: string, data?: any) => Promise<void>;
    onPaid: (data?: any) => Promise<void>;
    onApprovingError: (token: ITokenObject, err: Error) => Promise<void>;
    onPayingError: (err: Error) => Promise<void>;
}
export interface IERC20ApprovalOptions extends IERC20ApprovalEventOptions {
    spenderAddress: string;
}
export interface IERC20ApprovalAction {
    doApproveAction: (token: ITokenObject, inputAmount: string, data?: any) => Promise<void>;
    doPayAction: (data?: any) => Promise<void>;
    checkAllowance: (token: ITokenObject, inputAmount: string, data?: any) => Promise<void>;
}
export declare class ERC20ApprovalModel {
    private wallet;
    private options;
    constructor(wallet: IRpcWallet, options: IERC20ApprovalOptions);
    set spenderAddress(value: string);
    private checkAllowance;
    private doApproveAction;
    private doPayAction;
    getAction: () => IERC20ApprovalAction;
}
