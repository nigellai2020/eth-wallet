import {IWallet, Contract, Transaction, TransactionReceipt, BigNumber, Event, IBatchRequestObj} from "@ijstech/eth-contract";
import Bin from "./TestWhitelistTree.json";

export interface IVerifyMerkleProofParams {allocation:number|BigNumber;proof:string[]}
export interface IVerifyMerkleProof2Params {amount1:number|BigNumber;amount2:number|BigNumber;ipfsCid:string;proof:string[]}
export class TestWhitelistTree extends Contract{
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(): Promise<string>{
        return this.__deploy();
    }
    setMerkleRoot: {
        (merkleRoot:string): Promise<TransactionReceipt>;
        call: (merkleRoot:string) => Promise<void>;
    }
    verifyMerkleProof: {
        (params: IVerifyMerkleProofParams): Promise<boolean>;
    }
    verifyMerkleProof2: {
        (params: IVerifyMerkleProof2Params): Promise<boolean>;
    }
    whitelistTreeRoot: {
        (): Promise<string>;
    }
    private assign(){
        let verifyMerkleProofParams = (params: IVerifyMerkleProofParams) => [this.wallet.utils.toString(params.allocation),this.wallet.utils.stringToBytes32(params.proof)];
        let verifyMerkleProof_call = async (params: IVerifyMerkleProofParams): Promise<boolean> => {
            let result = await this.call('verifyMerkleProof',verifyMerkleProofParams(params));
            return result;
        }
        this.verifyMerkleProof = verifyMerkleProof_call
        let verifyMerkleProof2Params = (params: IVerifyMerkleProof2Params) => [this.wallet.utils.toString(params.amount1),this.wallet.utils.toString(params.amount2),params.ipfsCid,this.wallet.utils.stringToBytes32(params.proof)];
        let verifyMerkleProof2_call = async (params: IVerifyMerkleProof2Params): Promise<boolean> => {
            let result = await this.call('verifyMerkleProof2',verifyMerkleProof2Params(params));
            return result;
        }
        this.verifyMerkleProof2 = verifyMerkleProof2_call
        let whitelistTreeRoot_call = async (): Promise<string> => {
            let result = await this.call('whitelistTreeRoot');
            return result;
        }
        this.whitelistTreeRoot = whitelistTreeRoot_call
        let setMerkleRoot_send = async (merkleRoot:string): Promise<TransactionReceipt> => {
            let result = await this.send('setMerkleRoot',[this.wallet.utils.stringToBytes32(merkleRoot)]);
            return result;
        }
        let setMerkleRoot_call = async (merkleRoot:string): Promise<void> => {
            let result = await this.call('setMerkleRoot',[this.wallet.utils.stringToBytes32(merkleRoot)]);
            return;
        }
        this.setMerkleRoot = Object.assign(setMerkleRoot_send, {
            call:setMerkleRoot_call
        });
    }
}