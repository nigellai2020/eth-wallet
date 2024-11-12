import {IWallet, Contract as _Contract, Transaction, TransactionReceipt, BigNumber, Event, IBatchRequestObj, TransactionOptions} from "@ijstech/eth-contract";
import Bin from "./MultiCall.json";
export interface IMulticallWithGasLimitationParams {calls:{to:string,data:string}[];gasBuffer:number|BigNumber}
export class MultiCall extends _Contract{
    static _abi: any = Bin.abi;
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(options?: TransactionOptions): Promise<string>{
        return this.__deploy([], options);
    }
    gasLeft: {
        (options?: TransactionOptions): Promise<BigNumber>;
    }
    gaslimit: {
        (options?: TransactionOptions): Promise<BigNumber>;
    }
    multicall: {
        (calls:{to:string,data:string}[], options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (calls:{to:string,data:string}[], options?: TransactionOptions) => Promise<string[]>;
        txData: (calls:{to:string,data:string}[], options?: TransactionOptions) => Promise<string>;
    }
    multicallWithGas: {
        (calls:{to:string,data:string}[], options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (calls:{to:string,data:string}[], options?: TransactionOptions) => Promise<{results:string[],gasUsed:BigNumber[]}>;
        txData: (calls:{to:string,data:string}[], options?: TransactionOptions) => Promise<string>;
    }
    multicallWithGasLimitation: {
        (params: IMulticallWithGasLimitationParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IMulticallWithGasLimitationParams, options?: TransactionOptions) => Promise<{results:string[],lastSuccessIndex:BigNumber}>;
        txData: (params: IMulticallWithGasLimitationParams, options?: TransactionOptions) => Promise<string>;
    }
    private assign(){
        let gasLeft_call = async (options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('gasLeft',[],options);
            return new BigNumber(result);
        }
        this.gasLeft = gasLeft_call
        let gaslimit_call = async (options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('gaslimit',[],options);
            return new BigNumber(result);
        }
        this.gaslimit = gaslimit_call
        let multicall_send = async (calls:{to:string,data:string}[], options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('multicall',[calls.map(e=>([e.to,this.wallet.utils.stringToBytes(e.data)]))],options);
            return result;
        }
        let multicall_call = async (calls:{to:string,data:string}[], options?: TransactionOptions): Promise<string[]> => {
            let result = await this.call('multicall',[calls.map(e=>([e.to,this.wallet.utils.stringToBytes(e.data)]))],options);
            return result;
        }
        let multicall_txData = async (calls:{to:string,data:string}[], options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('multicall',[calls.map(e=>([e.to,this.wallet.utils.stringToBytes(e.data)]))],options);
            return result;
        }
        this.multicall = Object.assign(multicall_send, {
            call:multicall_call
            , txData:multicall_txData
        });
        let multicallWithGas_send = async (calls:{to:string,data:string}[], options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('multicallWithGas',[calls.map(e=>([e.to,this.wallet.utils.stringToBytes(e.data)]))],options);
            return result;
        }
        let multicallWithGas_call = async (calls:{to:string,data:string}[], options?: TransactionOptions): Promise<{results:string[],gasUsed:BigNumber[]}> => {
            let result = await this.call('multicallWithGas',[calls.map(e=>([e.to,this.wallet.utils.stringToBytes(e.data)]))],options);
            return {
                results: result.results,
                gasUsed: result.gasUsed.map(e=>new BigNumber(e))
            };
        }
        let multicallWithGas_txData = async (calls:{to:string,data:string}[], options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('multicallWithGas',[calls.map(e=>([e.to,this.wallet.utils.stringToBytes(e.data)]))],options);
            return result;
        }
        this.multicallWithGas = Object.assign(multicallWithGas_send, {
            call:multicallWithGas_call
            , txData:multicallWithGas_txData
        });
        let multicallWithGasLimitationParams = (params: IMulticallWithGasLimitationParams) => [params.calls.map(e=>([e.to,this.wallet.utils.stringToBytes(e.data)])),this.wallet.utils.toString(params.gasBuffer)];
        let multicallWithGasLimitation_send = async (params: IMulticallWithGasLimitationParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('multicallWithGasLimitation',multicallWithGasLimitationParams(params),options);
            return result;
        }
        let multicallWithGasLimitation_call = async (params: IMulticallWithGasLimitationParams, options?: TransactionOptions): Promise<{results:string[],lastSuccessIndex:BigNumber}> => {
            let result = await this.call('multicallWithGasLimitation',multicallWithGasLimitationParams(params),options);
            return {
                results: result.results,
                lastSuccessIndex: new BigNumber(result.lastSuccessIndex)
            };
        }
        let multicallWithGasLimitation_txData = async (params: IMulticallWithGasLimitationParams, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('multicallWithGasLimitation',multicallWithGasLimitationParams(params),options);
            return result;
        }
        this.multicallWithGasLimitation = Object.assign(multicallWithGasLimitation_send, {
            call:multicallWithGasLimitation_call
            , txData:multicallWithGasLimitation_txData
        });
    }
}