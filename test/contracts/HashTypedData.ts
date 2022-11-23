import {IWallet, Contract, Transaction, TransactionReceipt, BigNumber, Event, IBatchRequestObj, TransactionOptions} from "@ijstech/eth-contract";
import Bin from "./HashTypedData.json";

export interface IGetSignerParams {signature:string;paramsHash:string}
export interface IHashUnstakeParamsParams {requestId:number|BigNumber;player:string;amount:number|BigNumber}
export class HashTypedData extends Contract{
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(options?: TransactionOptions): Promise<string>{
        return this.__deploy([], options);
    }
    getChainId: {
        (options?: TransactionOptions): Promise<BigNumber>;
    }
    getSigner: {
        (params: IGetSignerParams, options?: TransactionOptions): Promise<string>;
    }
    hashUnstakeParams: {
        (params: IHashUnstakeParamsParams, options?: TransactionOptions): Promise<string>;
    }
    private assign(){
        let getChainId_call = async (options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('getChainId',[],options);
            return new BigNumber(result);
        }
        this.getChainId = getChainId_call
        let getSignerParams = (params: IGetSignerParams) => [this.wallet.utils.stringToBytes(params.signature),this.wallet.utils.stringToBytes32(params.paramsHash)];
        let getSigner_call = async (params: IGetSignerParams, options?: TransactionOptions): Promise<string> => {
            let result = await this.call('getSigner',getSignerParams(params),options);
            return result;
        }
        this.getSigner = getSigner_call
        let hashUnstakeParamsParams = (params: IHashUnstakeParamsParams) => [this.wallet.utils.toString(params.requestId),params.player,this.wallet.utils.toString(params.amount)];
        let hashUnstakeParams_call = async (params: IHashUnstakeParamsParams, options?: TransactionOptions): Promise<string> => {
            let result = await this.call('hashUnstakeParams',hashUnstakeParamsParams(params),options);
            return result;
        }
        this.hashUnstakeParams = hashUnstakeParams_call
    }
}