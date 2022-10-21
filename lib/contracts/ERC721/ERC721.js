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
exports.ERC721 = void 0;
const Utils = __importStar(require("../../utils"));
const contract_1 = require("../../contract");
const bignumber_js_1 = require("bignumber.js");
const ERC721_json_1 = __importDefault(require("./ERC721.json"));
class ERC721 extends contract_1.Contract {
    constructor(wallet, address) {
        super(wallet, address, ERC721_json_1.default.abi, ERC721_json_1.default.bytecode);
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
            approved: result.approved,
            tokenId: new bignumber_js_1.BigNumber(result.tokenId),
            _event: event
        };
    }
    parseApprovalForAllEvent(receipt) {
        return this.parseEvents(receipt, "ApprovalForAll").map(e => this.decodeApprovalForAllEvent(e));
    }
    decodeApprovalForAllEvent(event) {
        let result = event.data;
        return {
            owner: result.owner,
            operator: result.operator,
            approved: result.approved,
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
            tokenId: new bignumber_js_1.BigNumber(result.tokenId),
            _event: event
        };
    }
    assign() {
        let balanceOf_call = async (owner) => {
            let result = await this.call('balanceOf', [owner]);
            return new bignumber_js_1.BigNumber(result);
        };
        this.balanceOf = balanceOf_call;
        let getApproved_call = async (tokenId) => {
            let result = await this.call('getApproved', [Utils.toString(tokenId)]);
            return result;
        };
        this.getApproved = getApproved_call;
        let isApprovedForAllParams = (params) => [params.owner, params.operator];
        let isApprovedForAll_call = async (params) => {
            let result = await this.call('isApprovedForAll', isApprovedForAllParams(params));
            return result;
        };
        this.isApprovedForAll = isApprovedForAll_call;
        let name_call = async () => {
            let result = await this.call('name');
            return result;
        };
        this.name = name_call;
        let ownerOf_call = async (tokenId) => {
            let result = await this.call('ownerOf', [Utils.toString(tokenId)]);
            return result;
        };
        this.ownerOf = ownerOf_call;
        let supportsInterface_call = async (interfaceId) => {
            let result = await this.call('supportsInterface', [interfaceId]);
            return result;
        };
        this.supportsInterface = supportsInterface_call;
        let symbol_call = async () => {
            let result = await this.call('symbol');
            return result;
        };
        this.symbol = symbol_call;
        let tokenURI_call = async (tokenId) => {
            let result = await this.call('tokenURI', [Utils.toString(tokenId)]);
            return result;
        };
        this.tokenURI = tokenURI_call;
        let approveParams = (params) => [params.to, Utils.toString(params.tokenId)];
        let approve_send = async (params) => {
            let result = await this.send('approve', approveParams(params));
            return result;
        };
        let approve_call = async (params) => {
            let result = await this.call('approve', approveParams(params));
            return;
        };
        this.approve = Object.assign(approve_send, {
            call: approve_call
        });
        let safeTransferFromParams = (params) => [params.from, params.to, Utils.toString(params.tokenId)];
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
        let safeTransferFrom_1Params = (params) => [params.from, params.to, Utils.toString(params.tokenId), Utils.stringToBytes(params.data)];
        let safeTransferFrom_1_send = async (params) => {
            let result = await this.send('safeTransferFrom', safeTransferFromParams(params));
            return result;
        };
        let safeTransferFrom_1_call = async (params) => {
            let result = await this.call('safeTransferFrom', safeTransferFromParams(params));
            return;
        };
        this.safeTransferFrom_1 = Object.assign(safeTransferFrom_1_send, {
            call: safeTransferFrom_1_call
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
        let transferFromParams = (params) => [params.from, params.to, Utils.toString(params.tokenId)];
        let transferFrom_send = async (params) => {
            let result = await this.send('transferFrom', transferFromParams(params));
            return result;
        };
        let transferFrom_call = async (params) => {
            let result = await this.call('transferFrom', transferFromParams(params));
            return;
        };
        this.transferFrom = Object.assign(transferFrom_send, {
            call: transferFrom_call
        });
    }
}
exports.ERC721 = ERC721;
