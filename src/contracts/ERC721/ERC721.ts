import {IWallet, Contract, Transaction, TransactionReceipt, Utils, BigNumber, Event, IBatchRequestObj} from "../../";
import Bin from "./ERC721.json";

export interface IDeployParams {name:string;symbol:string}
export interface IApproveParams {to:string;tokenId:number|BigNumber}
export interface IIsApprovedForAllParams {owner:string;operator:string}
export interface ISafeTransferFromParams {from:string;to:string;tokenId:number|BigNumber}
export interface ISafeTransferFrom_1Params {from:string;to:string;tokenId:number|BigNumber;data:string}
export interface ISetApprovalForAllParams {operator:string;approved:boolean}
export interface ITransferFromParams {from:string;to:string;tokenId:number|BigNumber}
export class ERC721 extends Contract{
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(params: IDeployParams): Promise<string>{
        return this.__deploy([params.name,params.symbol]);
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
        (params: IApproveParams): Promise<TransactionReceipt>;
        call: (params: IApproveParams) => Promise<void>;
    }
    balanceOf: {
        (owner:string): Promise<BigNumber>;
    }
    getApproved: {
        (tokenId:number|BigNumber): Promise<string>;
    }
    isApprovedForAll: {
        (params: IIsApprovedForAllParams): Promise<boolean>;
    }
    name: {
        (): Promise<string>;
    }
    ownerOf: {
        (tokenId:number|BigNumber): Promise<string>;
    }
    safeTransferFrom: {
        (params: ISafeTransferFromParams): Promise<TransactionReceipt>;
        call: (params: ISafeTransferFromParams) => Promise<void>;
    }
    safeTransferFrom_1: {
        (params: ISafeTransferFrom_1Params): Promise<TransactionReceipt>;
        call: (params: ISafeTransferFrom_1Params) => Promise<void>;
    }
    setApprovalForAll: {
        (params: ISetApprovalForAllParams): Promise<TransactionReceipt>;
        call: (params: ISetApprovalForAllParams) => Promise<void>;
    }
    supportsInterface: {
        (interfaceId:string): Promise<boolean>;
    }
    symbol: {
        (): Promise<string>;
    }
    tokenURI: {
        (tokenId:number|BigNumber): Promise<string>;
    }
    transferFrom: {
        (params: ITransferFromParams): Promise<TransactionReceipt>;
        call: (params: ITransferFromParams) => Promise<void>;
    }
    private assign(){
        let balanceOf_call = async (owner:string): Promise<BigNumber> => {
            let result = await this.call('balanceOf',[owner]);
            return new BigNumber(result);
        }
        this.balanceOf = balanceOf_call
        let getApproved_call = async (tokenId:number|BigNumber): Promise<string> => {
            let result = await this.call('getApproved',[Utils.toString(tokenId)]);
            return result;
        }
        this.getApproved = getApproved_call
        let isApprovedForAllParams = (params: IIsApprovedForAllParams) => [params.owner,params.operator];
        let isApprovedForAll_call = async (params: IIsApprovedForAllParams): Promise<boolean> => {
            let result = await this.call('isApprovedForAll',isApprovedForAllParams(params));
            return result;
        }
        this.isApprovedForAll = isApprovedForAll_call
        let name_call = async (): Promise<string> => {
            let result = await this.call('name');
            return result;
        }
        this.name = name_call
        let ownerOf_call = async (tokenId:number|BigNumber): Promise<string> => {
            let result = await this.call('ownerOf',[Utils.toString(tokenId)]);
            return result;
        }
        this.ownerOf = ownerOf_call
        let supportsInterface_call = async (interfaceId:string): Promise<boolean> => {
            let result = await this.call('supportsInterface',[interfaceId]);
            return result;
        }
        this.supportsInterface = supportsInterface_call
        let symbol_call = async (): Promise<string> => {
            let result = await this.call('symbol');
            return result;
        }
        this.symbol = symbol_call
        let tokenURI_call = async (tokenId:number|BigNumber): Promise<string> => {
            let result = await this.call('tokenURI',[Utils.toString(tokenId)]);
            return result;
        }
        this.tokenURI = tokenURI_call
        let approveParams = (params: IApproveParams) => [params.to,Utils.toString(params.tokenId)];
        let approve_send = async (params: IApproveParams): Promise<TransactionReceipt> => {
            let result = await this.send('approve',approveParams(params));
            return result;
        }
        let approve_call = async (params: IApproveParams): Promise<void> => {
            let result = await this.call('approve',approveParams(params));
            return;
        }
        this.approve = Object.assign(approve_send, {
            call:approve_call
        });
        let safeTransferFromParams = (params: ISafeTransferFromParams) => [params.from,params.to,Utils.toString(params.tokenId)];
        let safeTransferFrom_send = async (params: ISafeTransferFromParams): Promise<TransactionReceipt> => {
            let result = await this.send('safeTransferFrom',safeTransferFromParams(params));
            return result;
        }
        let safeTransferFrom_call = async (params: ISafeTransferFromParams): Promise<void> => {
            let result = await this.call('safeTransferFrom',safeTransferFromParams(params));
            return;
        }
        this.safeTransferFrom = Object.assign(safeTransferFrom_send, {
            call:safeTransferFrom_call
        });
        let safeTransferFrom_1Params = (params: ISafeTransferFrom_1Params) => [params.from,params.to,Utils.toString(params.tokenId),Utils.stringToBytes(params.data)];
        let safeTransferFrom_1_send = async (params: ISafeTransferFromParams): Promise<TransactionReceipt> => {
            let result = await this.send('safeTransferFrom',safeTransferFromParams(params));
            return result;
        }
        let safeTransferFrom_1_call = async (params: ISafeTransferFromParams): Promise<void> => {
            let result = await this.call('safeTransferFrom',safeTransferFromParams(params));
            return;
        }
        this.safeTransferFrom_1 = Object.assign(safeTransferFrom_1_send, {
            call:safeTransferFrom_1_call
        });
        let setApprovalForAllParams = (params: ISetApprovalForAllParams) => [params.operator,params.approved];
        let setApprovalForAll_send = async (params: ISetApprovalForAllParams): Promise<TransactionReceipt> => {
            let result = await this.send('setApprovalForAll',setApprovalForAllParams(params));
            return result;
        }
        let setApprovalForAll_call = async (params: ISetApprovalForAllParams): Promise<void> => {
            let result = await this.call('setApprovalForAll',setApprovalForAllParams(params));
            return;
        }
        this.setApprovalForAll = Object.assign(setApprovalForAll_send, {
            call:setApprovalForAll_call
        });
        let transferFromParams = (params: ITransferFromParams) => [params.from,params.to,Utils.toString(params.tokenId)];
        let transferFrom_send = async (params: ITransferFromParams): Promise<TransactionReceipt> => {
            let result = await this.send('transferFrom',transferFromParams(params));
            return result;
        }
        let transferFrom_call = async (params: ITransferFromParams): Promise<void> => {
            let result = await this.call('transferFrom',transferFromParams(params));
            return;
        }
        this.transferFrom = Object.assign(transferFrom_send, {
            call:transferFrom_call
        });
    }
}
export module ERC721{
    export interface ApprovalEvent {owner:string,approved:string,tokenId:BigNumber,_event:Event}
    export interface ApprovalForAllEvent {owner:string,operator:string,approved:boolean,_event:Event}
    export interface TransferEvent {from:string,to:string,tokenId:BigNumber,_event:Event}
}