"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiCall = void 0;
const eth_contract_1 = require("@ijstech/eth-contract");
const MultiCall_json_1 = __importDefault(require("./MultiCall.json"));
class MultiCall extends eth_contract_1.Contract {
    constructor(wallet, address) {
        super(wallet, address, MultiCall_json_1.default.abi, MultiCall_json_1.default.bytecode);
        this.assign();
    }
    deploy(options) {
        return this.__deploy([], options);
    }
    assign() {
        let gasLeft_call = async (options) => {
            let result = await this.call('gasLeft', [], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.gasLeft = gasLeft_call;
        let gaslimit_call = async (options) => {
            let result = await this.call('gaslimit', [], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.gaslimit = gaslimit_call;
        let multicall_send = async (calls, options) => {
            let result = await this.send('multicall', [calls.map(e => ([e.to, this.wallet.utils.stringToBytes(e.data)]))], options);
            return result;
        };
        let multicall_call = async (calls, options) => {
            let result = await this.call('multicall', [calls.map(e => ([e.to, this.wallet.utils.stringToBytes(e.data)]))], options);
            return result;
        };
        this.multicall = Object.assign(multicall_send, {
            call: multicall_call
        });
        let multicallWithGas_send = async (calls, options) => {
            let result = await this.send('multicallWithGas', [calls.map(e => ([e.to, this.wallet.utils.stringToBytes(e.data)]))], options);
            return result;
        };
        let multicallWithGas_call = async (calls, options) => {
            let result = await this.call('multicallWithGas', [calls.map(e => ([e.to, this.wallet.utils.stringToBytes(e.data)]))], options);
            return {
                results: result.results,
                gasUsed: result.gasUsed.map(e => new eth_contract_1.BigNumber(e))
            };
        };
        this.multicallWithGas = Object.assign(multicallWithGas_send, {
            call: multicallWithGas_call
        });
        let multicallWithGasLimitationParams = (params) => [params.calls.map(e => ([e.to, this.wallet.utils.stringToBytes(e.data)])), this.wallet.utils.toString(params.gasBuffer)];
        let multicallWithGasLimitation_send = async (params, options) => {
            let result = await this.send('multicallWithGasLimitation', multicallWithGasLimitationParams(params), options);
            return result;
        };
        let multicallWithGasLimitation_call = async (params, options) => {
            let result = await this.call('multicallWithGasLimitation', multicallWithGasLimitationParams(params), options);
            return {
                results: result.results,
                lastSuccessIndex: new eth_contract_1.BigNumber(result.lastSuccessIndex)
            };
        };
        this.multicallWithGasLimitation = Object.assign(multicallWithGasLimitation_send, {
            call: multicallWithGasLimitation_call
        });
    }
}
exports.MultiCall = MultiCall;
