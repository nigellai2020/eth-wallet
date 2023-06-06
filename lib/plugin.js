"use strict";
/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
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
exports.Constants = exports.Types = exports.Contracts = exports.Utils = exports.Erc20 = exports.BigNumber = exports.Contract = exports.Web3ModalProvider = exports.MetaMaskProvider = exports.EthereumProvider = exports.Wallet = void 0;
var wallet_1 = require("./wallet");
Object.defineProperty(exports, "Wallet", { enumerable: true, get: function () { return wallet_1.Wallet; } });
Object.defineProperty(exports, "EthereumProvider", { enumerable: true, get: function () { return wallet_1.EthereumProvider; } });
Object.defineProperty(exports, "MetaMaskProvider", { enumerable: true, get: function () { return wallet_1.MetaMaskProvider; } });
Object.defineProperty(exports, "Web3ModalProvider", { enumerable: true, get: function () { return wallet_1.Web3ModalProvider; } });
var contract_1 = require("./contract");
Object.defineProperty(exports, "Contract", { enumerable: true, get: function () { return contract_1.Contract; } });
var bignumber_js_1 = require("bignumber.js");
Object.defineProperty(exports, "BigNumber", { enumerable: true, get: function () { return bignumber_js_1.BigNumber; } });
var erc20_1 = require("./contracts/erc20");
Object.defineProperty(exports, "Erc20", { enumerable: true, get: function () { return erc20_1.Erc20; } });
exports.Utils = __importStar(require("./utils"));
exports.Contracts = __importStar(require("./contracts"));
exports.Types = __importStar(require("./types"));
exports.Constants = __importStar(require("./constants"));
