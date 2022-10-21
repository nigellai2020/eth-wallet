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
exports.ERC1155 = void 0;
const Utils = __importStar(require("../../utils"));
const contract_1 = require("../../contract");
const bignumber_js_1 = require("bignumber.js");
const ERC1155_json_1 = __importDefault(require("./ERC1155.json"));
class ERC1155 extends contract_1.Contract {
    constructor(wallet, address) {
        super(wallet, address, ERC1155_json_1.default.abi, ERC1155_json_1.default.bytecode);
        this.assign();
    }
    deploy(uri) {
        return this.__deploy([uri]);
    }
    parseApprovalForAllEvent(receipt) {
        return this.parseEvents(receipt, "ApprovalForAll").map(e => this.decodeApprovalForAllEvent(e));
    }
    decodeApprovalForAllEvent(event) {
        let result = event.data;
        return {
            account: result.account,
            operator: result.operator,
            approved: result.approved,
            _event: event
        };
    }
    parseTransferBatchEvent(receipt) {
        return this.parseEvents(receipt, "TransferBatch").map(e => this.decodeTransferBatchEvent(e));
    }
    decodeTransferBatchEvent(event) {
        let result = event.data;
        return {
            operator: result.operator,
            from: result.from,
            to: result.to,
            ids: result.ids.map(e => new bignumber_js_1.BigNumber(e)),
            values: result.values.map(e => new bignumber_js_1.BigNumber(e)),
            _event: event
        };
    }
    parseTransferSingleEvent(receipt) {
        return this.parseEvents(receipt, "TransferSingle").map(e => this.decodeTransferSingleEvent(e));
    }
    decodeTransferSingleEvent(event) {
        let result = event.data;
        return {
            operator: result.operator,
            from: result.from,
            to: result.to,
            id: new bignumber_js_1.BigNumber(result.id),
            value: new bignumber_js_1.BigNumber(result.value),
            _event: event
        };
    }
    parseURIEvent(receipt) {
        return this.parseEvents(receipt, "URI").map(e => this.decodeURIEvent(e));
    }
    decodeURIEvent(event) {
        let result = event.data;
        return {
            value: result.value,
            id: new bignumber_js_1.BigNumber(result.id),
            _event: event
        };
    }
    assign() {
        let balanceOfParams = (params) => [params.account, Utils.toString(params.id)];
        let balanceOf_call = async (params) => {
            let result = await this.call('balanceOf', balanceOfParams(params));
            return new bignumber_js_1.BigNumber(result);
        };
        this.balanceOf = balanceOf_call;
        let balanceOfBatchParams = (params) => [params.accounts, Utils.toString(params.ids)];
        let balanceOfBatch_call = async (params) => {
            let result = await this.call('balanceOfBatch', balanceOfBatchParams(params));
            return result.map(e => new bignumber_js_1.BigNumber(e));
        };
        this.balanceOfBatch = balanceOfBatch_call;
        let isApprovedForAllParams = (params) => [params.account, params.operator];
        let isApprovedForAll_call = async (params) => {
            let result = await this.call('isApprovedForAll', isApprovedForAllParams(params));
            return result;
        };
        this.isApprovedForAll = isApprovedForAll_call;
        let supportsInterface_call = async (interfaceId) => {
            let result = await this.call('supportsInterface', [interfaceId]);
            return result;
        };
        this.supportsInterface = supportsInterface_call;
        let uri_call = async (param1) => {
            let result = await this.call('uri', [Utils.toString(param1)]);
            return result;
        };
        this.uri = uri_call;
        let safeBatchTransferFromParams = (params) => [params.from, params.to, Utils.toString(params.ids), Utils.toString(params.amounts), Utils.stringToBytes(params.data)];
        let safeBatchTransferFrom_send = async (params) => {
            let result = await this.send('safeBatchTransferFrom', safeBatchTransferFromParams(params));
            return result;
        };
        let safeBatchTransferFrom_call = async (params) => {
            let result = await this.call('safeBatchTransferFrom', safeBatchTransferFromParams(params));
            return;
        };
        this.safeBatchTransferFrom = Object.assign(safeBatchTransferFrom_send, {
            call: safeBatchTransferFrom_call
        });
        let safeTransferFromParams = (params) => [params.from, params.to, Utils.toString(params.id), Utils.toString(params.amount), Utils.stringToBytes(params.data)];
        let safeTransferFrom_send = async (params) => {
            let result = await this.send('safeTransferFrom', safeTransferFromParams(params));
            return result;
        };
        let safeTransferFrom_call = async (params) => {
            let result = await this.call('safeTransferFrom', safeTransferFromParams(params));
            return;
        };
        this.safeTransferFrom = Object.assign(safeTransferFrom_send, {
            call: safeTransferFrom_call
        });
        let setApprovalForAllParams = (params) => [params.operator, params.approved];
        let setApprovalForAll_send = async (params) => {
            let result = await this.send('setApprovalForAll', setApprovalForAllParams(params));
            return result;
        };
        let setApprovalForAll_call = async (params) => {
            let result = await this.call('setApprovalForAll', setApprovalForAllParams(params));
            return;
        };
        this.setApprovalForAll = Object.assign(setApprovalForAll_send, {
            call: setApprovalForAll_call
        });
    }
}
exports.ERC1155 = ERC1155;
