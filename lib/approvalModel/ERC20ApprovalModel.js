"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20ApprovalModel = exports.getERC20Allowance = void 0;
const bignumber_js_1 = require("bignumber.js");
const wallet_1 = require("../wallet");
const Contracts = __importStar(require("../contracts"));
const Utils = __importStar(require("../utils"));
const utils_1 = require("../utils");
const approveERC20Max = async (token, spenderAddress, callback, confirmationCallback) => {
    let wallet = wallet_1.Wallet.getInstance();
    let amount = new bignumber_js_1.BigNumber(2).pow(256).minus(1);
    let erc20 = new Contracts.ERC20(wallet, token.address);
    (0, utils_1.registerSendTxEvents)({
        transactionHash: callback,
        confirmation: confirmationCallback
    });
    let receipt = await erc20.approve({
        spender: spenderAddress,
        amount
    });
    return receipt;
};
const getERC20Allowance = async (wallet, token, spenderAddress) => {
    if (!(token === null || token === void 0 ? void 0 : token.address))
        return null;
    let erc20 = new Contracts.ERC20(wallet, token.address);
    let allowance = await erc20.allowance({
        owner: wallet.account.address,
        spender: spenderAddress
    });
    return Utils.fromDecimals(allowance, token.decimals || 18);
};
exports.getERC20Allowance = getERC20Allowance;
class ERC20ApprovalModel {
    constructor(wallet, options) {
        this.options = {
            sender: null,
            spenderAddress: '',
            payAction: async () => { },
            onToBeApproved: async (token, data) => { },
            onToBePaid: async (token, data) => { },
            onApproving: async (token, receipt, data) => { },
            onApproved: async (token, data) => { },
            onPaying: async (receipt, data) => { },
            onPaid: async (data) => { },
            onApprovingError: async (token, err) => { },
            onPayingError: async (err) => { }
        };
        this.checkAllowance = async (token, inputAmount, data) => {
            let allowance = await (0, exports.getERC20Allowance)(this.wallet, token, this.options.spenderAddress);
            if (!allowance) {
                await this.options.onToBePaid.bind(this.options.sender)(token, data);
            }
            else if (new bignumber_js_1.BigNumber(inputAmount).gt(allowance)) {
                await this.options.onToBeApproved.bind(this.options.sender)(token, data);
            }
            else {
                await this.options.onToBePaid.bind(this.options.sender)(token, data);
            }
        };
        this.doApproveAction = async (token, inputAmount, data) => {
            const txHashCallback = async (err, receipt) => {
                if (err) {
                    await this.options.onApprovingError.bind(this.options.sender)(token, err);
                }
                else {
                    await this.options.onApproving.bind(this.options.sender)(token, receipt, data);
                }
            };
            const confirmationCallback = async (receipt) => {
                await this.options.onApproved.bind(this.options.sender)(token, data);
                await this.checkAllowance(token, inputAmount, data);
            };
            approveERC20Max(token, this.options.spenderAddress, txHashCallback, confirmationCallback);
        };
        this.doPayAction = async (data) => {
            const txHashCallback = async (err, receipt) => {
                if (err) {
                    await this.options.onPayingError.bind(this.options.sender)(err);
                }
                else {
                    await this.options.onPaying.bind(this.options.sender)(receipt, data);
                }
            };
            const confirmationCallback = async (receipt) => {
                await this.options.onPaid.bind(this.options.sender)(data);
            };
            (0, utils_1.registerSendTxEvents)({
                transactionHash: txHashCallback,
                confirmation: confirmationCallback
            });
            await this.options.payAction.bind(this.options.sender)();
        };
        this.getAction = () => {
            return {
                doApproveAction: this.doApproveAction,
                doPayAction: this.doPayAction,
                checkAllowance: this.checkAllowance
            };
        };
        this.wallet = wallet;
        this.options = options;
    }
    set spenderAddress(value) {
        this.options.spenderAddress = value;
    }
}
exports.ERC20ApprovalModel = ERC20ApprovalModel;
