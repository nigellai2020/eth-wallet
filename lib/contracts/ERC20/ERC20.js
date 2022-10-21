"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20 = void 0;
const Utils = __importStar(require("../../utils"));
const contract_1 = require("../../contract");
const bignumber_js_1 = require("bignumber.js");
const ERC20_json_1 = __importDefault(require("./ERC20.json"));
class ERC20 extends contract_1.Contract {
    constructor(wallet, address) {
        super(wallet, address, ERC20_json_1.default.abi, ERC20_json_1.default.bytecode);
        this.assign();
    }
    deploy(params) {
        return this.__deploy([params.name, params.symbol]);
    }
    parseApprovalEvent(receipt) {
        return this.parseEvents(receipt, "Approval").map(e => this.decodeApprovalEvent(e));
    }
    decodeApprovalEvent(event) {
        let result = event.data;
        return {
            owner: result.owner,
            spender: result.spender,
            value: new bignumber_js_1.BigNumber(result.value),
            _event: event
        };
    }
    parseTransferEvent(receipt) {
        return this.parseEvents(receipt, "Transfer").map(e => this.decodeTransferEvent(e));
    }
    decodeTransferEvent(event) {
        let result = event.data;
        return {
            from: result.from,
            to: result.to,
            value: new bignumber_js_1.BigNumber(result.value),
            _event: event
        };
    }
    assign() {
        let allowanceParams = (params) => [params.owner, params.spender];
        let allowance_call = async (params) => {
            let result = await this.call('allowance', allowanceParams(params));
            return new bignumber_js_1.BigNumber(result);
        };
        this.allowance = allowance_call;
        let balanceOf_call = async (account) => {
            let result = await this.call('balanceOf', [account]);
            return new bignumber_js_1.BigNumber(result);
        };
        this.balanceOf = balanceOf_call;
        let decimals_call = async () => {
            let result = await this.call('decimals');
            return new bignumber_js_1.BigNumber(result);
        };
        this.decimals = decimals_call;
        let name_call = async () => {
            let result = await this.call('name');
            return result;
        };
        this.name = name_call;
        let symbol_call = async () => {
            let result = await this.call('symbol');
            return result;
        };
        this.symbol = symbol_call;
        let totalSupply_call = async () => {
            let result = await this.call('totalSupply');
            return new bignumber_js_1.BigNumber(result);
        };
        this.totalSupply = totalSupply_call;
        let approveParams = (params) => [params.spender, Utils.toString(params.amount)];
        let approve_send = async (params) => {
            let result = await this.send('approve', approveParams(params));
            return result;
        };
        let approve_call = async (params) => {
            let result = await this.call('approve', approveParams(params));
            return result;
        };
        this.approve = Object.assign(approve_send, {
            call: approve_call
        });
        let decreaseAllowanceParams = (params) => [params.spender, Utils.toString(params.subtractedValue)];
        let decreaseAllowance_send = async (params) => {
            let result = await this.send('decreaseAllowance', decreaseAllowanceParams(params));
            return result;
        };
        let decreaseAllowance_call = async (params) => {
            let result = await this.call('decreaseAllowance', decreaseAllowanceParams(params));
            return result;
        };
        this.decreaseAllowance = Object.assign(decreaseAllowance_send, {
            call: decreaseAllowance_call
        });
        let increaseAllowanceParams = (params) => [params.spender, Utils.toString(params.addedValue)];
        let increaseAllowance_send = async (params) => {
            let result = await this.send('increaseAllowance', increaseAllowanceParams(params));
            return result;
        };
        let increaseAllowance_call = async (params) => {
            let result = await this.call('increaseAllowance', increaseAllowanceParams(params));
            return result;
        };
        this.increaseAllowance = Object.assign(increaseAllowance_send, {
            call: increaseAllowance_call
        });
        let transferParams = (params) => [params.to, Utils.toString(params.amount)];
        let transfer_send = async (params) => {
            let result = await this.send('transfer', transferParams(params));
            return result;
        };
        let transfer_call = async (params) => {
            let result = await this.call('transfer', transferParams(params));
            return result;
        };
        this.transfer = Object.assign(transfer_send, {
            call: transfer_call
        });
        let transferFromParams = (params) => [params.from, params.to, Utils.toString(params.amount)];
        let transferFrom_send = async (params) => {
            let result = await this.send('transferFrom', transferFromParams(params));
            return result;
        };
        let transferFrom_call = async (params) => {
            let result = await this.call('transferFrom', transferFromParams(params));
            return result;
        };
        this.transferFrom = Object.assign(transferFrom_send, {
            call: transferFrom_call
        });
    }
}
exports.ERC20 = ERC20;
