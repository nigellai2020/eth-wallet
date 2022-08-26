import {IWallet, Contract, Transaction, TransactionReceipt, Utils, BigNumber, Event, IBatchRequestObj} from "../../";
import Bin from "./ERC1155.json";

export interface IBalanceOfParams {account:string;id:number|BigNumber}
export interface IBalanceOfBatchParams {accounts:string[];ids:(number|BigNumber)[]}
export interface IIsApprovedForAllParams {account:string;operator:string}
export interface ISafeBatchTransferFromParams {from:string;to:string;ids:(number|BigNumber)[];amounts:(number|BigNumber)[];data:string}
export interface ISafeTransferFromParams {from:string;to:string;id:number|BigNumber;amount:number|BigNumber;data:string}
export interface ISetApprovalForAllParams {operator:string;approved:boolean}
export class ERC1155 extends Contract{
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(uri:string): Promise<string>{
        return this.__deploy([uri]);
    }
    parseApprovalForAllEvent(receipt: TransactionReceipt): ERC1155.ApprovalForAllEvent[]{
        return this.parseEvents(receipt, "ApprovalForAll").map(e=>this.decodeApprovalForAllEvent(e));
    }
    decodeApprovalForAllEvent(event: Event): ERC1155.ApprovalForAllEvent{
        let result = event.data;
        return {
            account: result.account,
            operator: result.operator,
            approved: result.approved,
            _event: event
        };
    }
    parseTransferBatchEvent(receipt: TransactionReceipt): ERC1155.TransferBatchEvent[]{
        return this.parseEvents(receipt, "TransferBatch").map(e=>this.decodeTransferBatchEvent(e));
    }
    decodeTransferBatchEvent(event: Event): ERC1155.TransferBatchEvent{
        let result = event.data;
        return {
            operator: result.operator,
            from: result.from,
            to: result.to,
            ids: result.ids.map(e=>new BigNumber(e)),
            values: result.values.map(e=>new BigNumber(e)),
            _event: event
        };
    }
    parseTransferSingleEvent(receipt: TransactionReceipt): ERC1155.TransferSingleEvent[]{
        return this.parseEvents(receipt, "TransferSingle").map(e=>this.decodeTransferSingleEvent(e));
    }
    decodeTransferSingleEvent(event: Event): ERC1155.TransferSingleEvent{
        let result = event.data;
        return {
            operator: result.operator,
            from: result.from,
            to: result.to,
            id: new BigNumber(result.id),
            value: new BigNumber(result.value),
            _event: event
        };
    }
    parseURIEvent(receipt: TransactionReceipt): ERC1155.URIEvent[]{
        return this.parseEvents(receipt, "URI").map(e=>this.decodeURIEvent(e));
    }
    decodeURIEvent(event: Event): ERC1155.URIEvent{
        let result = event.data;
        return {
            value: result.value,
            id: new BigNumber(result.id),
            _event: event
        };
    }
    balanceOf: {
        (params: IBalanceOfParams): Promise<BigNumber>;
    }
    balanceOfBatch: {
        (params: IBalanceOfBatchParams): Promise<BigNumber[]>;
    }
    isApprovedForAll: {
        (params: IIsApprovedForAllParams): Promise<boolean>;
    }
    safeBatchTransferFrom: {
        (params: ISafeBatchTransferFromParams): Promise<TransactionReceipt>;
        call: (params: ISafeBatchTransferFromParams) => Promise<void>;
    }
    safeTransferFrom: {
        (params: ISafeTransferFromParams): Promise<TransactionReceipt>;
        call: (params: ISafeTransferFromParams) => Promise<void>;
    }
    setApprovalForAll: {
        (params: ISetApprovalForAllParams): Promise<TransactionReceipt>;
        call: (params: ISetApprovalForAllParams) => Promise<void>;
    }
    supportsInterface: {
        (interfaceId:string): Promise<boolean>;
    }
    uri: {
        (param1:number|BigNumber): Promise<string>;
    }
    private assign(){
        let balanceOfParams = (params: IBalanceOfParams) => [params.account,Utils.toString(params.id)];
        let balanceOf_call = async (params: IBalanceOfParams): Promise<BigNumber> => {
            let result = await this.call('balanceOf',balanceOfParams(params));
            return new BigNumber(result);
        }
        this.balanceOf = balanceOf_call
        let balanceOfBatchParams = (params: IBalanceOfBatchParams) => [params.accounts,Utils.toString(params.ids)];
        let balanceOfBatch_call = async (params: IBalanceOfBatchParams): Promise<BigNumber[]> => {
            let result = await this.call('balanceOfBatch',balanceOfBatchParams(params));
            return result.map(e=>new BigNumber(e));
        }
        this.balanceOfBatch = balanceOfBatch_call
        let isApprovedForAllParams = (params: IIsApprovedForAllParams) => [params.account,params.operator];
        let isApprovedForAll_call = async (params: IIsApprovedForAllParams): Promise<boolean> => {
            let result = await this.call('isApprovedForAll',isApprovedForAllParams(params));
            return result;
        }
        this.isApprovedForAll = isApprovedForAll_call
        let supportsInterface_call = async (interfaceId:string): Promise<boolean> => {
            let result = await this.call('supportsInterface',[interfaceId]);
            return result;
        }
        this.supportsInterface = supportsInterface_call
        let uri_call = async (param1:number|BigNumber): Promise<string> => {
            let result = await this.call('uri',[Utils.toString(param1)]);
            return result;
        }
        this.uri = uri_call
        let safeBatchTransferFromParams = (params: ISafeBatchTransferFromParams) => [params.from,params.to,Utils.toString(params.ids),Utils.toString(params.amounts),Utils.stringToBytes(params.data)];
        let safeBatchTransferFrom_send = async (params: ISafeBatchTransferFromParams): Promise<TransactionReceipt> => {
            let result = await this.send('safeBatchTransferFrom',safeBatchTransferFromParams(params));
            return result;
        }
        let safeBatchTransferFrom_call = async (params: ISafeBatchTransferFromParams): Promise<void> => {
            let result = await this.call('safeBatchTransferFrom',safeBatchTransferFromParams(params));
            return;
        }
        this.safeBatchTransferFrom = Object.assign(safeBatchTransferFrom_send, {
            call:safeBatchTransferFrom_call
        });
        let safeTransferFromParams = (params: ISafeTransferFromParams) => [params.from,params.to,Utils.toString(params.id),Utils.toString(params.amount),Utils.stringToBytes(params.data)];
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
    }
}
export module ERC1155{
    export interface ApprovalForAllEvent {account:string,operator:string,approved:boolean,_event:Event}
    export interface TransferBatchEvent {operator:string,from:string,to:string,ids:BigNumber[],values:BigNumber[],_event:Event}
    export interface TransferSingleEvent {operator:string,from:string,to:string,id:BigNumber,value:BigNumber,_event:Event}
    export interface URIEvent {value:string,id:BigNumber,_event:Event}
}