"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcWalletEvent = exports.ClientWalletEvent = exports.TYPED_MESSAGE_SCHEMA = exports.EIP712DomainAbi = void 0;
exports.EIP712DomainAbi = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" }
];
exports.TYPED_MESSAGE_SCHEMA = {
    type: 'object',
    properties: {
        types: {
            type: 'object',
            additionalProperties: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        type: { type: 'string' },
                    },
                    required: ['name', 'type'],
                },
            },
        },
        primaryType: { type: 'string' },
        domain: { type: 'object' },
        message: { type: 'object' },
    },
    required: ['types', 'primaryType', 'domain', 'message'],
};
var ClientWalletEvent;
(function (ClientWalletEvent) {
    ClientWalletEvent["AccountsChanged"] = "accountsChanged";
    ClientWalletEvent["ChainChanged"] = "chainChanged";
    ClientWalletEvent["Connect"] = "connect";
    ClientWalletEvent["Disconnect"] = "disconnect";
})(ClientWalletEvent = exports.ClientWalletEvent || (exports.ClientWalletEvent = {}));
var RpcWalletEvent;
(function (RpcWalletEvent) {
    RpcWalletEvent["Connected"] = "connected";
    RpcWalletEvent["Disconnected"] = "disconnected";
    RpcWalletEvent["ChainChanged"] = "chainChanged";
})(RpcWalletEvent = exports.RpcWalletEvent || (exports.RpcWalletEvent = {}));
