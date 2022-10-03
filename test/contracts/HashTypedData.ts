import {IWallet, Contract, Transaction, TransactionReceipt, Utils, BigNumber, Event, IBatchRequestObj} from "../../src";
import Bin from "./HashTypedData.json";

export interface IGetSignerParams {signature:string;paramsHash:string}
export interface IHashUnstakeParamsParams {requestId:number|BigNumber;player:string;amount:number|BigNumber}
export class HashTypedData extends Contract{
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(): Promise<string>{
        return this.__deploy();
    }
    getChainId: {
        (): Promise<BigNumber>;
    }
    getSigner: {
        (params: IGetSignerParams): Promise<string>;
    }
    hashUnstakeParams: {
        (params: IHashUnstakeParamsParams): Promise<string>;
    }
    private assign(){
        let getChainId_call = async (): Promise<BigNumber> => {
            let result = await this.call('getChainId');
            return new BigNumber(result);
        }
        this.getChainId = getChainId_call
        let getSignerParams = (params: IGetSignerParams) => [Utils.stringToBytes(params.signature),Utils.stringToBytes32(params.paramsHash)];
        let getSigner_call = async (params: IGetSignerParams): Promise<string> => {
            let result = await this.call('getSigner',getSignerParams(params));
            return result;
        }
        this.getSigner = getSigner_call
        let hashUnstakeParamsParams = (params: IHashUnstakeParamsParams) => [Utils.toString(params.requestId),params.player,Utils.toString(params.amount)];
        let hashUnstakeParams_call = async (params: IHashUnstakeParamsParams): Promise<string> => {
            let result = await this.call('hashUnstakeParams',hashUnstakeParamsParams(params));
            return result;
        }
        this.hashUnstakeParams = hashUnstakeParams_call
    }
}