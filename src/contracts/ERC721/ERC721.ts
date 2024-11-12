import {IWallet, Contract as _Contract, Transaction, TransactionReceipt, BigNumber, Event, IBatchRequestObj, TransactionOptions} from "@ijstech/eth-contract";
import Bin from "./ERC721.json";
export interface IDeployParams {name:string;symbol:string}
export interface IApproveParams {to:string;tokenId:number|BigNumber}
export interface IIsApprovedForAllParams {owner:string;operator:string}
export interface ISafeTransferFromParams {from:string;to:string;tokenId:number|BigNumber}
export interface ISafeTransferFrom_1Params {from:string;to:string;tokenId:number|BigNumber;data:string}
export interface ISetApprovalForAllParams {operator:string;approved:boolean}
export interface ITransferFromParams {from:string;to:string;tokenId:number|BigNumber}
export class ERC721 extends _Contract{
    static _abi: any = Bin.abi;
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>{
        return this.__deploy([params.name,params.symbol], options);
    }
    parseApprovalEvent(receipt: TransactionReceipt): ERC721.ApprovalEvent[]{
        return this.parseEvents(receipt, "Approval").map(e=>this.decodeApprovalEvent(e));
    }
    decodeApprovalEvent(event: Event): ERC721.ApprovalEvent{
        let result = event.data;
        return {
            owner: result.owner,
            approved: result.approved,
            tokenId: new BigNumber(result.tokenId),
            _event: event
        };
    }
    parseApprovalForAllEvent(receipt: TransactionReceipt): ERC721.ApprovalForAllEvent[]{
        return this.parseEvents(receipt, "ApprovalForAll").map(e=>this.decodeApprovalForAllEvent(e));
    }
    decodeApprovalForAllEvent(event: Event): ERC721.ApprovalForAllEvent{
        let result = event.data;
        return {
            owner: result.owner,
            operator: result.operator,
            approved: result.approved,
            _event: event
        };
    }
    parseTransferEvent(receipt: TransactionReceipt): ERC721.TransferEvent[]{
        return this.parseEvents(receipt, "Transfer").map(e=>this.decodeTransferEvent(e));
    }
    decodeTransferEvent(event: Event): ERC721.TransferEvent{
        let result = event.data;
        return {
            from: result.from,
            to: result.to,
            tokenId: new BigNumber(result.tokenId),
            _event: event
        };
    }
    approve: {
        (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IApproveParams, options?: TransactionOptions) => Promise<void>;
        txData: (params: IApproveParams, options?: TransactionOptions) => Promise<string>;
    }
    balanceOf: {
        (owner:string, options?: TransactionOptions): Promise<BigNumber>;
    }
    getApproved: {
        (tokenId:number|BigNumber, options?: TransactionOptions): Promise<string>;
    }
    isApprovedForAll: {
        (params: IIsApprovedForAllParams, options?: TransactionOptions): Promise<boolean>;
    }
    name: {
        (options?: TransactionOptions): Promise<string>;
    }
    ownerOf: {
        (tokenId:number|BigNumber, options?: TransactionOptions): Promise<string>;
    }
    safeTransferFrom: {
        (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISafeTransferFromParams, options?: TransactionOptions) => Promise<void>;
        txData: (params: ISafeTransferFromParams, options?: TransactionOptions) => Promise<string>;
    }
    safeTransferFrom_1: {
        (params: ISafeTransferFrom_1Params, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISafeTransferFrom_1Params, options?: TransactionOptions) => Promise<void>;
        txData: (params: ISafeTransferFrom_1Params, options?: TransactionOptions) => Promise<string>;
    }
    setApprovalForAll: {
        (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISetApprovalForAllParams, options?: TransactionOptions) => Promise<void>;
        txData: (params: ISetApprovalForAllParams, options?: TransactionOptions) => Promise<string>;
    }
    supportsInterface: {
        (interfaceId:string, options?: TransactionOptions): Promise<boolean>;
    }
    symbol: {
        (options?: TransactionOptions): Promise<string>;
    }
    tokenURI: {
        (tokenId:number|BigNumber, options?: TransactionOptions): Promise<string>;
    }
    transferFrom: {
        (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ITransferFromParams, options?: TransactionOptions) => Promise<void>;
        txData: (params: ITransferFromParams, options?: TransactionOptions) => Promise<string>;
    }
    private assign(){
        let balanceOf_call = async (owner:string, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('balanceOf',[owner],options);
            return new BigNumber(result);
        }
        this.balanceOf = balanceOf_call
        let getApproved_call = async (tokenId:number|BigNumber, options?: TransactionOptions): Promise<string> => {
            let result = await this.call('getApproved',[this.wallet.utils.toString(tokenId)],options);
            return result;
        }
        this.getApproved = getApproved_call
        let isApprovedForAllParams = (params: IIsApprovedForAllParams) => [params.owner,params.operator];
        let isApprovedForAll_call = async (params: IIsApprovedForAllParams, options?: TransactionOptions): Promise<boolean> => {
            let result = await this.call('isApprovedForAll',isApprovedForAllParams(params),options);
            return result;
        }
        this.isApprovedForAll = isApprovedForAll_call
        let name_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('name',[],options);
            return result;
        }
        this.name = name_call
        let ownerOf_call = async (tokenId:number|BigNumber, options?: TransactionOptions): Promise<string> => {
            let result = await this.call('ownerOf',[this.wallet.utils.toString(tokenId)],options);
            return result;
        }
        this.ownerOf = ownerOf_call
        let supportsInterface_call = async (interfaceId:string, options?: TransactionOptions): Promise<boolean> => {
            let result = await this.call('supportsInterface',[interfaceId],options);
            return result;
        }
        this.supportsInterface = supportsInterface_call
        let symbol_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('symbol',[],options);
            return result;
        }
        this.symbol = symbol_call
        let tokenURI_call = async (tokenId:number|BigNumber, options?: TransactionOptions): Promise<string> => {
            let result = await this.call('tokenURI',[this.wallet.utils.toString(tokenId)],options);
            return result;
        }
        this.tokenURI = tokenURI_call
        let approveParams = (params: IApproveParams) => [params.to,this.wallet.utils.toString(params.tokenId)];
        let approve_send = async (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('approve',approveParams(params),options);
            return result;
        }
        let approve_call = async (params: IApproveParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('approve',approveParams(params),options);
            return;
        }
        let approve_txData = async (params: IApproveParams, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('approve',approveParams(params),options);
            return result;
        }
        this.approve = Object.assign(approve_send, {
            call:approve_call
            , txData:approve_txData
        });
        let safeTransferFromParams = (params: ISafeTransferFromParams) => [params.from,params.to,this.wallet.utils.toString(params.tokenId)];
        let safeTransferFrom_send = async (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('safeTransferFrom',safeTransferFromParams(params),options);
            return result;
        }
        let safeTransferFrom_call = async (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('safeTransferFrom',safeTransferFromParams(params),options);
            return;
        }
        let safeTransferFrom_txData = async (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('safeTransferFrom',safeTransferFromParams(params),options);
            return result;
        }
        this.safeTransferFrom = Object.assign(safeTransferFrom_send, {
            call:safeTransferFrom_call
            , txData:safeTransferFrom_txData
        });
        let safeTransferFrom_1Params = (params: ISafeTransferFrom_1Params) => [params.from,params.to,this.wallet.utils.toString(params.tokenId),this.wallet.utils.stringToBytes(params.data)];
        let safeTransferFrom_1_send = async (params: ISafeTransferFrom_1Params, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('safeTransferFrom',safeTransferFrom_1Params(params),options);
            return result;
        }
        let safeTransferFrom_1_call = async (params: ISafeTransferFrom_1Params, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('safeTransferFrom',safeTransferFrom_1Params(params),options);
            return;
        }
        let safeTransferFrom_1_txData = async (params: ISafeTransferFrom_1Params, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('safeTransferFrom',safeTransferFrom_1Params(params),options);
            return result;
        }
        this.safeTransferFrom_1 = Object.assign(safeTransferFrom_1_send, {
            call:safeTransferFrom_1_call
            , txData:safeTransferFrom_1_txData
        });
        let setApprovalForAllParams = (params: ISetApprovalForAllParams) => [params.operator,params.approved];
        let setApprovalForAll_send = async (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('setApprovalForAll',setApprovalForAllParams(params),options);
            return result;
        }
        let setApprovalForAll_call = async (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('setApprovalForAll',setApprovalForAllParams(params),options);
            return;
        }
        let setApprovalForAll_txData = async (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('setApprovalForAll',setApprovalForAllParams(params),options);
            return result;
        }
        this.setApprovalForAll = Object.assign(setApprovalForAll_send, {
            call:setApprovalForAll_call
            , txData:setApprovalForAll_txData
        });
        let transferFromParams = (params: ITransferFromParams) => [params.from,params.to,this.wallet.utils.toString(params.tokenId)];
        let transferFrom_send = async (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('transferFrom',transferFromParams(params),options);
            return result;
        }
        let transferFrom_call = async (params: ITransferFromParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('transferFrom',transferFromParams(params),options);
            return;
        }
        let transferFrom_txData = async (params: ITransferFromParams, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('transferFrom',transferFromParams(params),options);
            return result;
        }
        this.transferFrom = Object.assign(transferFrom_send, {
            call:transferFrom_call
            , txData:transferFrom_txData
        });
    }
}
export module ERC721{
    export interface ApprovalEvent {owner:string,approved:string,tokenId:BigNumber,_event:Event}
    export interface ApprovalForAllEvent {owner:string,operator:string,approved:boolean,_event:Event}
    export interface TransferEvent {from:string,to:string,tokenId:BigNumber,_event:Event}
}