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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = exports.Erc20 = exports.BigNumber = exports.Contract = exports.WalletPluginConfig = exports.WalletPlugin = exports.Wallet = void 0;
var wallet_1 = require("./wallet");
Object.defineProperty(exports, "Wallet", { enumerable: true, get: function () { return wallet_1.Wallet; } });
Object.defineProperty(exports, "WalletPlugin", { enumerable: true, get: function () { return wallet_1.WalletPlugin; } });
Object.defineProperty(exports, "WalletPluginConfig", { enumerable: true, get: function () { return wallet_1.WalletPluginConfig; } });
var contract_1 = require("./contract");
Object.defineProperty(exports, "Contract", { enumerable: true, get: function () { return contract_1.Contract; } });
var bignumber_js_1 = require("bignumber.js");
Object.defineProperty(exports, "BigNumber", { enumerable: true, get: function () { return bignumber_js_1.BigNumber; } });
var erc20_1 = require("./contracts/erc20");
Object.defineProperty(exports, "Erc20", { enumerable: true, get: function () { return erc20_1.Erc20; } });
exports.Utils = __importStar(require("./utils"));
