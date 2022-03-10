define("aws-sdk", ()=>{});
define("asn1.js", ()=>{});
define("bn.js", ()=>{});
define("ethereumjs-tx", ()=>{});
define("ethereumjs-util", ()=>{});
define("web3", (require,exports)=>{
    exports['web3'] = window["Web3"];
});
define("bignumber.js", (require,exports)=>{
    exports['BigNumber'] = window["BigNumber"];
});
define("@ijstech/eth-wallet",(require, exports)=>{
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// src/contract.ts
var require_contract = __commonJS({
  "src/contract.ts"(exports, module2) {
    var import_bignumber3 = __toModule(require("bignumber.js"));
    var Contract2;
    (function(_Contract) {
      class Contract3 {
        constructor(wallet, address, abi, bytecode) {
          this.wallet = wallet;
          if (typeof abi == "string")
            this._abi = JSON.parse(abi);
          else
            this._abi = abi;
          this._bytecode = bytecode;
          let self = this;
          if (address)
            this._address = address;
        }
        at(address) {
          this._address = address;
          return this;
        }
        set address(value) {
          this._address = value;
        }
        get address() {
          return this._address || "";
        }
        decodeEvents(receipt) {
          let events = this.getAbiEvents();
          let result = [];
          for (let name in receipt.events) {
            let events2 = Array.isArray(receipt.events[name]) ? receipt.events[name] : [receipt.events[name]];
            events2.forEach((e) => {
              let data = e.raw;
              let event = events2[data.topics[0]];
              result.push(Object.assign({ _name: name, _address: this.address }, this.wallet.decodeLog(event.inputs, data.data, data.topics.slice(1))));
            });
          }
          return result;
        }
        parseEvents(receipt, eventName) {
          let eventAbis = this.getAbiEvents();
          let topic0 = this.getAbiTopics([eventName])[0];
          let result = [];
          if (receipt.events) {
            for (let name in receipt.events) {
              let events = Array.isArray(receipt.events[name]) ? receipt.events[name] : [receipt.events[name]];
              events.forEach((event) => {
                if (topic0 == event.raw.topics[0] && (this.address && this.address == event.address)) {
                  result.push(this.wallet.decode(eventAbis[topic0], event, event.raw));
                }
              });
            }
          } else if (receipt.logs) {
            for (let i = 0; i < receipt.logs.length; i++) {
              let log = receipt.logs[i];
              if (topic0 == log.topics[0] && (this.address && this.address == log.address)) {
                result.push(this.wallet.decode(eventAbis[topic0], log));
              }
            }
          }
          return result;
        }
        get events() {
          let result = [];
          for (let i = 0; i < this._abi.length; i++) {
            if (this._abi[i].type == "event")
              result.push(this._abi[i]);
          }
          return result;
        }
        methodsToUtf8(...args) {
          let self = this;
          return new Promise(async function(resolve, reject) {
            let result = await self.methods.apply(self, args);
            resolve(self.wallet.utils.toUtf8(result));
          });
        }
        methodsToUtf8Array(...args) {
          let self = this;
          return new Promise(async function(resolve, reject) {
            let result = await self.methods.apply(self, args);
            let arr = [];
            for (let i = 0; i < result.length; i++) {
              arr.push(self.wallet.utils.toUtf8(result[i]));
            }
            resolve(arr);
          });
        }
        methodsFromWeiArray(...args) {
          let self = this;
          return new Promise(async function(resolve, reject) {
            let result = await self.methods.apply(self, args);
            let arr = [];
            for (let i = 0; i < result.length; i++) {
              arr.push(new import_bignumber3.BigNumber(self.wallet.utils.fromWei(result[i])));
            }
            resolve(arr);
          });
        }
        methodsFromWei(...args) {
          let self = this;
          return new Promise(async function(resolve, reject) {
            let result = await self.methods.apply(self, args);
            return resolve(new import_bignumber3.BigNumber(self.wallet.utils.fromWei(result)));
          });
        }
        methods(...args) {
          args.unshift(this._address);
          args.unshift(this._abi);
          return this.wallet.methods.apply(this.wallet, args);
        }
        getAbiTopics(eventNames) {
          return this.wallet.getAbiTopics(this._abi, eventNames);
        }
        getAbiEvents() {
          if (!this._events)
            this._events = this.wallet.getAbiEvents(this._abi);
          return this._events;
        }
        scanEvents(fromBlock, toBlock, eventNames) {
          let topics = this.getAbiTopics(eventNames);
          let events = this.getAbiEvents();
          return this.wallet.scanEvents(fromBlock, toBlock, topics, events, this._address);
        }
        async _deploy(...args) {
          if (typeof args[args.length - 1] == "undefined")
            args.pop();
          args.unshift(this._bytecode);
          args.unshift("deploy");
          args.unshift(null);
          args.unshift(this._abi);
          this._address = await this.wallet.methods.apply(this.wallet, args);
          return this._address;
        }
      }
      _Contract.Contract = Contract3;
      class TAuthContract extends Contract3 {
        rely(address) {
          return this.methods("rely", address);
        }
        deny(address) {
          return this.methods("deny", address);
        }
      }
      _Contract.TAuthContract = TAuthContract;
    })(Contract2 || (Contract2 = {}));
    module2.exports = Contract2;
  }
});

// src/utils.ts
var utils_exports = {};
__export(utils_exports, {
  addressToBytes32: () => addressToBytes32,
  addressToBytes32Right: () => addressToBytes32Right,
  bytes32ToAddress: () => bytes32ToAddress,
  bytes32ToString: () => bytes32ToString,
  fromDecimals: () => fromDecimals,
  nullAddress: () => nullAddress,
  numberToBytes32: () => numberToBytes32,
  padLeft: () => padLeft,
  padRight: () => padRight,
  sleep: () => sleep,
  stringToBytes32: () => stringToBytes32,
  toDecimals: () => toDecimals,
  toNumber: () => toNumber,
  toString: () => toString
});
function sleep(millisecond) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(null);
    }, millisecond);
  });
}
function numberToBytes32(value, prefix) {
  let v = new import_bignumber.BigNumber(value).toString(16);
  v = v.replace("0x", "");
  v = padLeft(v, 64);
  if (prefix)
    v = "0x" + v;
  return v;
}
function padLeft(string, chars, sign) {
  return new Array(chars - string.length + 1).join(sign ? sign : "0") + string;
}
function padRight(string, chars, sign) {
  return string + new Array(chars - string.length + 1).join(sign ? sign : "0");
}
function stringToBytes32(value) {
  if (Array.isArray(value)) {
    let result = [];
    for (let i = 0; i < value.length; i++) {
      result.push(stringToBytes32(value[i]));
    }
    return result;
  } else {
    if (value.length == 66 && value.startsWith("0x"))
      return value;
    return Web3.utils.padRight(Web3.utils.asciiToHex(value), 64);
  }
}
function addressToBytes32(value, prefix) {
  let v = value;
  v = v.replace("0x", "");
  v = padLeft(v, 64);
  if (prefix)
    v = "0x" + v;
  return v;
}
function bytes32ToAddress(value) {
  return "0x" + value.replace("0x000000000000000000000000", "");
}
function bytes32ToString(value) {
  return Web3.utils.hexToUtf8(value);
}
function addressToBytes32Right(value, prefix) {
  let v = value;
  v = v.replace("0x", "");
  v = padRight(v, 64);
  if (prefix)
    v = "0x" + v;
  return v;
}
function toNumber(value) {
  if (typeof value == "number")
    return value;
  else if (typeof value == "string")
    return new import_bignumber.BigNumber(value).toNumber();
  else
    return value.toNumber();
}
function toDecimals(value, decimals) {
  decimals = decimals || 18;
  return new import_bignumber.BigNumber(value).shiftedBy(decimals);
}
function fromDecimals(value, decimals) {
  decimals = decimals || 18;
  return new import_bignumber.BigNumber(value).shiftedBy(-decimals);
}
function toString(value) {
  if (Array.isArray(value)) {
    let result = [];
    for (let i = 0; i < value.length; i++) {
      if (typeof value[i] === "number" || import_bignumber.BigNumber.isBigNumber(value[i]))
        result.push(value[i].toString(10));
      else
        result.push(value[i]);
    }
    return result;
  } else if (typeof value === "number" || import_bignumber.BigNumber.isBigNumber(value))
    return value.toString(10);
  else
    return value;
}
var import_bignumber, Web3, nullAddress;
var init_utils = __esm({
  "src/utils.ts"() {
    import_bignumber = __toModule(require("bignumber.js"));
    Web3 = require("web3");
    nullAddress = "0x0000000000000000000000000000000000000000";
  }
});

// src/contracts/bin/erc20.json
var require_erc20 = __commonJS({
  "src/contracts/bin/erc20.json"(exports, module2) {
    module2.exports = {
      abi: [{ inputs: [{ internalType: "string", name: "name", type: "string" }, { internalType: "string", name: "symbol", type: "string" }, { internalType: "address", name: "_minter", type: "address" }, { internalType: "uint256", name: "totalSupply", type: "uint256" }], stateMutability: "nonpayable", type: "constructor" }, { anonymous: false, inputs: [{ indexed: true, internalType: "address", name: "owner", type: "address" }, { indexed: true, internalType: "address", name: "spender", type: "address" }, { indexed: false, internalType: "uint256", name: "value", type: "uint256" }], name: "Approval", type: "event" }, { anonymous: false, inputs: [{ indexed: true, internalType: "address", name: "from", type: "address" }, { indexed: true, internalType: "address", name: "to", type: "address" }, { indexed: false, internalType: "uint256", name: "value", type: "uint256" }], name: "Transfer", type: "event" }, { inputs: [{ internalType: "address", name: "owner", type: "address" }, { internalType: "address", name: "spender", type: "address" }], name: "allowance", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" }, { inputs: [{ internalType: "address", name: "spender", type: "address" }, { internalType: "uint256", name: "amount", type: "uint256" }], name: "approve", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "nonpayable", type: "function" }, { inputs: [{ internalType: "address", name: "account", type: "address" }], name: "balanceOf", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" }, { inputs: [], name: "cap", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" }, { inputs: [], name: "decimals", outputs: [{ internalType: "uint8", name: "", type: "uint8" }], stateMutability: "view", type: "function" }, { inputs: [{ internalType: "address", name: "spender", type: "address" }, { internalType: "uint256", name: "subtractedValue", type: "uint256" }], name: "decreaseAllowance", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "nonpayable", type: "function" }, { inputs: [{ internalType: "address", name: "spender", type: "address" }, { internalType: "uint256", name: "addedValue", type: "uint256" }], name: "increaseAllowance", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "nonpayable", type: "function" }, { inputs: [{ internalType: "address", name: "account", type: "address" }, { internalType: "uint256", name: "amount", type: "uint256" }], name: "mint", outputs: [], stateMutability: "nonpayable", type: "function" }, { inputs: [], name: "minter", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" }, { inputs: [], name: "name", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" }, { inputs: [], name: "symbol", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" }, { inputs: [], name: "totalSupply", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" }, { inputs: [{ internalType: "address", name: "recipient", type: "address" }, { internalType: "uint256", name: "amount", type: "uint256" }], name: "transfer", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "nonpayable", type: "function" }, { inputs: [{ internalType: "address", name: "sender", type: "address" }, { internalType: "address", name: "recipient", type: "address" }, { internalType: "uint256", name: "amount", type: "uint256" }], name: "transferFrom", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "nonpayable", type: "function" }],
      bytecode: "60a06040523480156200001157600080fd5b50604051620012a0380380620012a0833981810160405260808110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200010a57600080fd5b9083019060208201858111156200012057600080fd5b82516401000000008111828201881017156200013b57600080fd5b82525081516020918201929091019080838360005b838110156200016a57818101518382015260200162000150565b50505050905090810190601f168015620001985780820380516001836020036101000a031916815260200191505b506040908152602082810151929091015186519294509250829186918691620001c891600391908501906200025e565b508051620001de9060049060208401906200025e565b50506005805460ff19166012179055508062000241576040805162461bcd60e51b815260206004820152601560248201527f45524332304361707065643a2063617020697320300000000000000000000000604482015290519081900360640190fd5b6006555060601b6001600160601b03191660805250620003039050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620002a157805160ff1916838001178555620002d1565b82800160010185558215620002d1579182015b82811115620002d1578251825591602001919060010190620002b4565b50620002df929150620002e3565b5090565b6200030091905b80821115620002df5760008155600101620002ea565b90565b60805160601c610f7a620003266000398061047f52806105f35250610f7a6000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c8063395093511161008c57806395d89b411161006657806395d89b4114610314578063a457c2d71461031c578063a9059cbb14610355578063dd62ed3e1461038e576100ea565b8063395093511461026d57806340c10f19146102a657806370a08231146102e1576100ea565b806318160ddd116100c857806318160ddd146101ea57806323b872dd14610204578063313ce56714610247578063355274ea14610265576100ea565b806306fdde03146100ef578063075461721461016c578063095ea7b31461019d575b600080fd5b6100f76103c9565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610131578181015183820152602001610119565b50505050905090810190601f16801561015e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61017461047d565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6101d6600480360360408110156101b357600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356104a1565b604080519115158252519081900360200190f35b6101f26104be565b60408051918252519081900360200190f35b6101d66004803603606081101561021a57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135811691602081013590911690604001356104c4565b61024f61056b565b6040805160ff9092168252519081900360200190f35b6101f2610574565b6101d66004803603604081101561028357600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813516906020013561057a565b6102df600480360360408110156102bc57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356105db565b005b6101f2600480360360208110156102f757600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661068d565b6100f76106b5565b6101d66004803603604081101561033257600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135610734565b6101d66004803603604081101561036b57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356107af565b6101f2600480360360408110156103a457600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160200135166107c3565b60038054604080516020601f60027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104735780601f1061044857610100808354040283529160200191610473565b820191906000526020600020905b81548152906001019060200180831161045657829003601f168201915b5050505050905090565b7f000000000000000000000000000000000000000000000000000000000000000081565b60006104b56104ae6107fb565b84846107ff565b50600192915050565b60025490565b60006104d1848484610946565b610561846104dd6107fb565b61055c85604051806060016040528060288152602001610eaf6028913973ffffffffffffffffffffffffffffffffffffffff8a166000908152600160205260408120906105286107fb565b73ffffffffffffffffffffffffffffffffffffffff168152602081019190915260400160002054919063ffffffff610b2216565b6107ff565b5060019392505050565b60055460ff1690565b60065490565b60006104b56105876107fb565b8461055c85600160006105986107fb565b73ffffffffffffffffffffffffffffffffffffffff908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff610bd316565b3373ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000161461067f57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4e6f742066726f6d206d696e7465720000000000000000000000000000000000604482015290519081900360640190fd5b6106898282610c4e565b5050565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b60048054604080516020601f60027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104735780601f1061044857610100808354040283529160200191610473565b60006104b56107416107fb565b8461055c85604051806060016040528060258152602001610f20602591396001600061076b6107fb565b73ffffffffffffffffffffffffffffffffffffffff908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff610b2216565b60006104b56107bc6107fb565b8484610946565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260016020908152604080832093909416825291909152205490565b3390565b73ffffffffffffffffffffffffffffffffffffffff831661086b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526024815260200180610efc6024913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff82166108d7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180610e676022913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b73ffffffffffffffffffffffffffffffffffffffff83166109b2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180610ed76025913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8216610a1e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526023815260200180610e446023913960400191505060405180910390fd5b610a29838383610d8b565b610a7981604051806060016040528060268152602001610e896026913973ffffffffffffffffffffffffffffffffffffffff8616600090815260208190526040902054919063ffffffff610b2216565b73ffffffffffffffffffffffffffffffffffffffff8085166000908152602081905260408082209390935590841681522054610abb908263ffffffff610bd316565b73ffffffffffffffffffffffffffffffffffffffff8084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b60008184841115610bcb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610b90578181015183820152602001610b78565b50505050905090810190601f168015610bbd5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082820183811015610c4757604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b73ffffffffffffffffffffffffffffffffffffffff8216610cd057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b610cdc60008383610d8b565b600254610cef908263ffffffff610bd316565b60025573ffffffffffffffffffffffffffffffffffffffff8216600090815260208190526040902054610d28908263ffffffff610bd316565b73ffffffffffffffffffffffffffffffffffffffff83166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b610d96838383610e3e565b73ffffffffffffffffffffffffffffffffffffffff8316610e3e57610db9610574565b610dd182610dc56104be565b9063ffffffff610bd316565b1115610e3e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f45524332304361707065643a2063617020657863656564656400000000000000604482015290519081900360640190fd5b50505056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa26469706673582212207fc226d6e4710807cc45df55579a0cf7761d5ad01ffb12d78b630a3ab9858ef364736f6c634300060b0033"
    };
  }
});

// src/contracts/erc20.ts
var require_erc202 = __commonJS({
  "src/contracts/erc20.ts"(exports, module2) {
    var import_contract2 = __toModule(require_contract());
    var import_bignumber3 = __toModule(require("bignumber.js"));
    init_utils();
    var Abi = require_erc20().abi;
    var Bytecode = require_erc20().bytecode;
    var ERC20;
    (function(ERC202) {
      class Erc202 extends import_contract2.Contract {
        constructor(wallet, address, decimals) {
          super(wallet, address, Abi, Bytecode);
          this._decimals = decimals;
        }
        async deploy(params) {
          return this._deploy(params.name, params.symbol, params.minter || this.wallet.address, this.wallet.utils.toWei(params.cap ? params.cap.toString() : "1000000000"));
        }
        async allowance(params) {
          return fromDecimals(await this.methods("allowance", params.owner, params.spender), await this.decimals);
        }
        approve(params) {
          return new Promise(async (resolve, reject) => {
            try {
              resolve(this.methods("approve", params.spender, await toDecimals(params.amount, await this.decimals)));
            } catch (err) {
              reject(err);
            }
          });
        }
        get balance() {
          return this.balanceOf(this.wallet.address);
        }
        async balanceOf(address) {
          return new Promise(async (resolve, reject) => {
            try {
              resolve(await fromDecimals(await this.methods("balanceOf", address), await this.decimals));
            } catch (err) {
              reject(err);
            }
          });
        }
        get cap() {
          return new Promise(async (resolve, reject) => {
            try {
              resolve(await fromDecimals(await this.methods("cap"), await this.decimals));
            } catch (err) {
              reject(err);
            }
          });
        }
        get decimals() {
          return new Promise(async (resolve, reject) => {
            try {
              if (!this._decimals)
                this._decimals = new import_bignumber3.BigNumber(await this.methods("decimals")).toNumber();
              resolve(this._decimals);
            } catch (err) {
              reject(err);
            }
          });
        }
        mint(params) {
          return new Promise(async (resolve, reject) => {
            try {
              resolve(await this.methods("mint", params.address, await toDecimals(params.amount, await this.decimals)));
            } catch (err) {
              reject(err);
            }
          });
        }
        minter() {
          return this.methods("minter");
        }
        get name() {
          return this.methods("name");
        }
        get symbol() {
          return this.methods("symbol");
        }
        get totalSupply() {
          return new Promise(async (resolve, reject) => {
            try {
              resolve(await fromDecimals(await this.methods("totalSupply"), await this.decimals));
            } catch (err) {
              reject(err);
            }
          });
        }
        async transfer(params) {
          return this.methods("transfer", params.address, await toDecimals(params.amount, await this.decimals));
        }
      }
      ERC202.Erc20 = Erc202;
      ;
    })(ERC20 || (ERC20 = {}));
    module2.exports = ERC20;
  }
});

// src/kms.ts
var require_kms = __commonJS({
  "src/kms.ts"(exports, module2) {
    var AwsSDK = __toModule(require("aws-sdk"));
    var asn1 = __toModule(require("asn1.js"));
    var import_bn = __toModule(require("bn.js"));
    var ethutil = __toModule(require("ethereumjs-util"));
    var import_ethereumjs_tx = __toModule(require("ethereumjs-tx"));
    var KMS;
    (function(_KMS) {
      const EcdsaSigAsnParse = asn1 && asn1.define ? asn1.define("EcdsaSig", function() {
        this.seq().obj(this.key("r").int(), this.key("s").int());
      }) : void 0;
      const EcdsaPubKey = asn1 && asn1.define ? asn1.define("EcdsaPubKey", function() {
        this.seq().obj(this.key("algo").seq().obj(this.key("a").objid(), this.key("b").objid()), this.key("pubKey").bitstr());
      }) : void 0;
      function recoverPubKeyFromSig(msg, r, s, v) {
        let rBuffer = r.toBuffer();
        let sBuffer = s.toBuffer();
        let pubKey = ethutil.ecrecover(msg, v, rBuffer, sBuffer);
        let addrBuf = ethutil.pubToAddress(pubKey);
        let recoveredEthAddr = ethutil.bufferToHex(addrBuf);
        return recoveredEthAddr;
      }
      class KMS3 {
        constructor(options) {
          this._options = options;
          this._sdk = new AwsSDK.KMS(options);
        }
        getEthereumAddress(publicKey) {
          let res = EcdsaPubKey.decode(publicKey, "der");
          let pubKeyBuffer = res.pubKey.data;
          pubKeyBuffer = pubKeyBuffer.slice(1, pubKeyBuffer.length);
          let buf = ethutil.keccak256(pubKeyBuffer);
          return "0x" + buf.slice(-20).toString("hex");
        }
        async sign(msgHash) {
          const params = {
            KeyId: this._options.keyId,
            Message: msgHash,
            SigningAlgorithm: "ECDSA_SHA_256",
            MessageType: "DIGEST"
          };
          return await this._sdk.sign(params).promise();
        }
        async signMessage(chainId, message) {
          let hash = ethutil.hashPersonalMessage(ethutil.toBuffer(message));
          let sig = await this.findEthereumSig(hash);
          let address = await this.getAddress();
          let recoveredPubAddr = this.findRightKey(hash, sig.r, sig.s, address);
          let r = sig.r.toBuffer();
          let s = sig.s.toBuffer();
          let v = new import_bn.default(recoveredPubAddr.v + (chainId > 1 ? 8 + chainId * 2 : 0)).toBuffer();
          return "0x" + Buffer.concat([r, s, v]).toString("hex");
        }
        async findEthereumSig(plaintext) {
          let signature = await this.sign(plaintext);
          if (signature.Signature == void 0) {
            throw new Error("Signature is undefined.");
          }
          let decoded = EcdsaSigAsnParse.decode(signature.Signature, "der");
          let r = decoded.r;
          let s = decoded.s;
          let secp256k1N = new import_bn.default("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", 16);
          let secp256k1halfN = secp256k1N.div(new import_bn.default(2));
          if (s.gt(secp256k1halfN)) {
            s = secp256k1N.sub(s);
          }
          return { r, s };
        }
        findRightKey(msg, r, s, expectedEthAddr) {
          let v = 27;
          let pubKey = recoverPubKeyFromSig(msg, r, s, v);
          if (pubKey != expectedEthAddr) {
            v = 28;
            pubKey = recoverPubKeyFromSig(msg, r, s, v);
          }
          return { pubKey, v };
        }
        async getPublicKey() {
          return this._sdk.getPublicKey({
            KeyId: this._options.keyId
          }).promise();
        }
        async getAddress() {
          if (!this._address) {
            let pubKey = await this.getPublicKey();
            this._address = this.getEthereumAddress(pubKey.PublicKey);
          }
          return this._address;
        }
        async signTransaction(chainId, txData) {
          const tx = new import_ethereumjs_tx.Transaction(txData, {
            chain: chainId
          });
          let txHash = tx.hash(false);
          let sig = await this.findEthereumSig(txHash);
          let address = await this.getAddress();
          let recoveredPubAddr = this.findRightKey(txHash, sig.r, sig.s, address);
          tx.r = sig.r.toBuffer();
          tx.s = sig.s.toBuffer();
          tx.v = new import_bn.default(recoveredPubAddr.v + (chainId > 1 ? 8 + chainId * 2 : 0)).toBuffer();
          const serializedTx = tx.serialize().toString("hex");
          return "0x" + serializedTx;
        }
      }
      _KMS.KMS = KMS3;
    })(KMS || (KMS = {}));
    module2.exports = KMS;
  }
});

// src/wallet.ts
var require_wallet = __commonJS({
  "src/wallet.ts"(exports, module2) {
    var W3 = __toModule(require("web3"));
    var import_bignumber3 = __toModule(require("bignumber.js"));
    var import_erc202 = __toModule(require_erc202());
    var import_kms = __toModule(require_kms());
    var Web32 = Web3Lib();
    function Web3Lib() {
      if (typeof window !== "undefined" && window["Web3"])
        return window["Web3"];
      else
        return require("web3");
    }
    var Wallet2;
    (function(_Wallet) {
      ;
      ;
      _Wallet.Networks = {
        1: {
          chainId: 1,
          chainName: "Mainnet"
        },
        3: {
          chainId: 3,
          chainName: "Ropsten"
        },
        4: {
          chainId: 4,
          chainName: "Rinkeby"
        },
        42: {
          chainId: 42,
          chainName: "Kovan"
        },
        56: {
          chainId: "56",
          chainName: "Binance Mainnet",
          rpcUrls: ["https://bsc-dataseed.binance.org"],
          blockExplorerUrls: ["https://bscscan.com"],
          nativeCurrency: {
            decimals: 18,
            name: "BNB",
            symbol: "BNB"
          }
        },
        97: {
          chainId: "97",
          chainName: "Binance Testnet",
          rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
          blockExplorerUrls: ["https://testnet.bscscan.com"],
          nativeCurrency: {
            decimals: 18,
            name: "BNB",
            symbol: "BNB"
          }
        },
        1287: {
          chainId: "1287",
          chainName: "Moonbeam Testnet",
          rpcUrls: ["https://rpc.testnet.moonbeam.network"],
          blockExplorerUrls: ["https://moonbase-blockscout.testnet.moonbeam.network"],
          nativeCurrency: {
            decimals: 18,
            name: "MOON",
            symbol: "MOON"
          }
        }
      };
      const WalletUtils = {
        fromWei(value) {
          return new import_bignumber3.BigNumber(W3.default.utils.fromWei(value));
        }
      };
      class MetaMask {
        constructor(wallet) {
          this.wallet = wallet;
          let self = this;
          let ethereum = window["ethereum"];
          if (this.installed) {
            ethereum.on("accountsChanged", (accounts) => {
              let account;
              if (accounts && accounts.length > 0)
                account = accounts[0](self.wallet.web3).selectedAddress = account;
              if (self.wallet.onAccountChanged)
                self.wallet.onAccountChanged(account);
            });
            ethereum.on("chainChanged", (chainId) => {
              self.wallet.chainId = parseInt(chainId);
              if (self.wallet.onChainChanged)
                self.wallet.onChainChanged(chainId);
            });
            ethereum.on("connect", (connectInfo) => {
              if (self.wallet.onConnect)
                self.wallet.onConnect(connectInfo);
            });
            ethereum.on("disconnect", (error) => {
              if (self.wallet.onDisconnect)
                self.wallet.onDisconnect(error);
            });
          }
          ;
        }
        async connect() {
          let self = this;
          try {
            if (this.installed) {
              let ethereum = window["ethereum"];
              await ethereum.request({ method: "eth_requestAccounts" });
            }
          } catch (error) {
            console.error(error);
          }
        }
        get installed() {
          let ethereum = window["ethereum"];
          if (typeof ethereum != "undefined" && ethereum.isMetaMask)
            return true;
        }
        get provider() {
          let ethereum = window["ethereum"];
          return ethereum;
        }
        addToken(option, type) {
          return new Promise(async function(resolve, reject) {
            try {
              let ethereum = window["network"];
              let result = await ethereum.request({
                method: "wallet_watchAsset",
                params: {
                  type: type || "ERC20",
                  options: option
                }
              });
              resolve(result);
            } catch (err) {
              reject(err);
            }
          });
        }
        switchNetwork(chainId) {
          return new Promise(async function(resolve, reject) {
            try {
              let ethereum = window["ethereum"];
              let result = await ethereum.request({
                method: "wallet_switchEthereumChain",
                params: {
                  chainId: "0x4"
                }
              });
              resolve(!result);
            } catch (err) {
              reject(err);
            }
          });
        }
        addNetwork(options) {
          return new Promise(async function(resolve, reject) {
            try {
              options = JSON.parse(JSON.stringify(options));
              options.chainId = "0x" + parseInt(options.chainId).toString(16);
              let ethereum = window["ethereum"];
              try {
                await ethereum.request({
                  method: "wallet_switchEthereumChain",
                  params: [{ chainId: options.chainId }]
                });
                resolve(true);
              } catch (err) {
                let result = await ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    options
                  ]
                });
                resolve(!result);
              }
            } catch (err) {
              reject(err);
            }
          });
        }
      }
      _Wallet.MetaMask = MetaMask;
      class Wallet3 {
        constructor(provider, account) {
          this._abiHashDict = {};
          this._abiAddressDict = {};
          this._abiEventDict = {};
          this._eventHandler = {};
          this._contracts = {};
          this.isMetaMask = false;
          if (!provider && typeof window !== "undefined" && window["ethereum"] && window["ethereum"].isMetaMask) {
            this.isMetaMask = true;
            provider = window["ethereum"];
          }
          this._provider = provider;
          this._web3 = new Web32(provider);
          if (this.isMetaMask) {
            this._web3.eth.getAccounts((err, accounts) => {
              if (accounts) {
                this._web3.selectedAddress = accounts[0];
              }
            });
            this._web3.eth.net.getId((err, chainId) => {
              this.chainId = chainId;
            });
          }
          if (Array.isArray(account)) {
            this._accounts = account;
            this._account = account[0];
          } else
            this._account = account;
          if (this._account && this._account.privateKey && !this._account.address)
            this._account.address = this._web3.eth.accounts.privateKeyToAccount(this._account.privateKey).address;
          if (this.isMetaMask)
            this._metaMask = new MetaMask(this);
        }
        get accounts() {
          return new Promise((resolve) => {
            if (this._accounts) {
              let result = [];
              for (let i = 0; i < this._accounts.length; i++) {
                if (!this._accounts[i].address && this._accounts[i].privateKey)
                  this._accounts[i].address = this._web3.eth.accounts.privateKeyToAccount(this._accounts[i].privateKey).address;
                result.push(this._accounts[i].address);
              }
              return resolve(result);
            } else if (this._account)
              return resolve([this._account.address]);
            resolve(this._web3.eth.getAccounts());
          });
        }
        get address() {
          if (this._account && this._account.privateKey) {
            if (!this._account.address)
              this._account.address = this._web3.eth.accounts.privateKeyToAccount(this._account.privateKey).address;
            return this._account.address;
          } else if (this._kms && this._account) {
            return this._account.address;
          } else if (this._web3.selectedAddress) {
            return this._web3.selectedAddress;
          } else if (this._web3.eth.defaultAccount) {
            return this._web3.eth.defaultAccount;
          }
          if (!this._account) {
            this._account = this.createAccount();
            return this._account.address;
          } else
            return this._account.address;
        }
        get account() {
          return {
            address: this.address
          };
        }
        set account(value) {
          this._kms = null;
          this._web3.eth.defaultAccount = "";
          this._account = value;
        }
        createAccount() {
          let acc = this._web3.eth.accounts.create();
          return {
            address: acc.address,
            privateKey: acc.privateKey
          };
        }
        decodeLog(inputs, hexString, topics) {
          return this.web3.eth.abi.decodeLog(inputs, hexString, topics);
        }
        get defaultAccount() {
          if (this._account)
            return this._account.address;
          return this._web3.eth.defaultAccount;
        }
        set defaultAccount(address) {
          if (this._accounts) {
            for (let i = 0; i < this._accounts.length; i++) {
              if (!this._accounts[i].address && this._accounts[i].privateKey)
                this._accounts[i].address = this._web3.eth.accounts.privateKeyToAccount(this._accounts[i].privateKey).address;
              if (this._accounts[i].address && this._accounts[i].address.toLowerCase() == address.toLowerCase()) {
                this._account = this._accounts[i];
                return;
              }
            }
          } else if (this._account && this._account.address && this._account.address.toLowerCase() == address.toLowerCase()) {
            return;
          } else
            this._web3.eth.defaultAccount = address;
        }
        async getChainId() {
          if (!this.chainId)
            this.chainId = await this._web3.eth.getChainId();
          return this.chainId;
        }
        get metaMask() {
          if (!this._metaMask)
            this._metaMask = new MetaMask(this);
          return this._metaMask;
        }
        get provider() {
          return this._provider;
        }
        sendSignedTransaction(tx) {
          let _web3 = this._web3;
          return _web3.eth.sendSignedTransaction(tx);
        }
        async signTransaction(tx, privateKey) {
          let _web3 = this._web3;
          let gas = tx.gas || await _web3.eth.estimateGas({
            from: this.address,
            to: tx.to,
            data: tx.data
          });
          let gasLimit = tx.gasLimit || gas;
          let nonce = tx.nonce || await _web3.eth.getTransactionCount(this.address);
          if (privateKey || this._account && this._account.privateKey) {
            let signedTx = await _web3.eth.accounts.signTransaction({
              nonce,
              gas,
              gasLimit,
              data: tx.data,
              from: this.address,
              to: tx.to
            }, privateKey ? privateKey : this._account.privateKey);
            return signedTx.rawTransaction;
          } else if (this._account && this._account.kms) {
            let chainId = await this.getChainId();
            let txHash = await this.kms.signTransaction(chainId, {
              from: this.address,
              nonce,
              gasLimit: gas,
              gas,
              to: tx.to,
              data: tx.data
            });
            return txHash;
          } else {
            let t = await _web3.eth.signTransaction({
              from: this.address,
              nonce,
              gasLimit,
              gas,
              to: tx.to,
              data: tx.data
            }, this.address);
            return t.raw;
          }
        }
        async _methods(...args) {
          let _web3 = this._web3;
          let result;
          let value;
          let method;
          let methodAbi;
          let byteCode;
          let abi = args.shift();
          let address = args.shift();
          let methodName = args.shift();
          if (methodName == "deploy")
            byteCode = args.shift();
          let contract;
          let hash;
          if (this._contracts[address])
            contract = this._contracts[address];
          else {
            hash = this._web3.utils.sha3(JSON.stringify(abi));
            if (this._contracts[hash]) {
              contract = this._contracts[hash];
            }
          }
          if (!contract) {
            contract = new this._web3.eth.Contract(abi);
            this._contracts[address] = contract;
            this._contracts[hash] = contract;
          }
          if (methodName == "deploy") {
            method = contract[methodName]({
              data: byteCode,
              arguments: args
            });
          } else {
            for (let i = 0; i < abi.length; i++) {
              if (abi[i].name == methodName) {
                methodAbi = abi[i];
                break;
              }
            }
            if (methodAbi.payable)
              value = args.pop();
            for (let i = 0; i < methodAbi.inputs.length; i++) {
              if (methodAbi.inputs[i].type.indexOf("bytes") == 0) {
                args[i] = args[i] || "";
                if (methodAbi.inputs[i].type.indexOf("[]") > 0) {
                  let a = [];
                  for (let k = 0; k < args[i].length; k++) {
                    let s = args[i][k] || "";
                    if (s.indexOf("0x") != 0)
                      a.push(_web3.utils.fromAscii(s));
                    else
                      a.push(s);
                  }
                  args[i] = a;
                } else if (args[i].indexOf("0x") != 0)
                  args[i] = _web3.utils.fromAscii(args[i]);
              } else if (methodAbi.inputs[i].type == "address") {
                if (!args[i])
                  args[i] = _web3.eth.abi.encodeParameter("address", 0);
              }
            }
            method = contract.methods[methodName].apply(contract, args);
          }
          let tx = {
            to: address,
            data: method.encodeABI()
          };
          return tx;
        }
        async methods(...args) {
          let _web3 = this._web3;
          if (_web3.methods) {
            return _web3.methods.apply(_web3, args);
          } else {
            let result;
            let value;
            let method;
            let methodAbi;
            let byteCode;
            let abi = args.shift();
            let address = args.shift();
            let methodName = args.shift();
            if (methodName == "deploy")
              byteCode = args.shift();
            let contract;
            let hash;
            if (address && this._contracts[address])
              contract = this._contracts[address];
            else {
              hash = this._web3.utils.sha3(JSON.stringify(abi));
              if (this._contracts[hash]) {
                contract = this._contracts[hash];
              }
            }
            ;
            if (!contract) {
              contract = new this._web3.eth.Contract(abi);
              if (address)
                this._contracts[address] = contract;
              this._contracts[hash] = contract;
            }
            ;
            if (methodName == "deploy") {
              method = contract[methodName]({
                data: byteCode,
                arguments: args
              });
            } else {
              for (let i = 0; i < abi.length; i++) {
                if (abi[i].name == methodName) {
                  methodAbi = abi[i];
                  break;
                }
              }
              if (methodAbi.payable)
                value = args.pop();
              for (let i = 0; i < methodAbi.inputs.length; i++) {
                if (methodAbi.inputs[i].type.indexOf("bytes") == 0) {
                  args[i] = args[i] || "";
                  if (methodAbi.inputs[i].type.indexOf("[]") > 0) {
                    let a = [];
                    for (let k = 0; k < args[i].length; k++) {
                      let s = args[i][k] || "";
                      if (s.indexOf("0x") != 0)
                        a.push(_web3.utils.fromAscii(s));
                      else
                        a.push(s);
                    }
                    args[i] = a;
                  } else if (args[i].indexOf("0x") != 0)
                    args[i] = _web3.utils.fromAscii(args[i]);
                } else if (methodAbi.inputs[i].type == "address") {
                  if (!args[i])
                    args[i] = _web3.eth.abi.encodeParameter("address", 0);
                }
              }
              method = contract.methods[methodName].apply(contract, args);
            }
            ;
            contract.options.address = address;
            if (methodAbi && (methodAbi.constant || methodAbi.stateMutability == "view")) {
              return method.call({ from: this.address });
            }
            if (!this._blockGasLimit) {
              this._blockGasLimit = (await _web3.eth.getBlock("latest")).gasLimit;
            }
            let gas;
            try {
              gas = await method.estimateGas({ from: this.address, to: address, value });
              gas = Math.min(this._blockGasLimit, Math.round(gas * 1.5));
            } catch (e) {
              if (e.message == "Returned error: out of gas") {
                console.log(e.message);
                gas = Math.round(this._blockGasLimit * 0.5);
              } else {
                try {
                  await method.call({ from: this.address, value });
                } catch (e2) {
                  if (e2.message.includes("VM execution error.")) {
                    var msg = (e2.data || e2.message).match(/0x[0-9a-fA-F]+/);
                    if (msg && msg.length) {
                      msg = msg[0];
                      if (msg.startsWith("0x08c379a")) {
                        msg = _web3.eth.abi.decodeParameter("string", "0x" + msg.substring(10));
                        throw new Error(msg);
                      }
                    }
                  }
                }
                throw e;
              }
            }
            let gasPrice = await _web3.eth.getGasPrice();
            if (this._account && this._account.privateKey) {
              let tx = {
                gas,
                gasPrice,
                data: method.encodeABI(),
                from: this.address,
                to: address,
                value
              };
              let signedTx = await _web3.eth.accounts.signTransaction(tx, this._account.privateKey);
              result = await _web3.eth.sendSignedTransaction(signedTx.rawTransaction);
              if (methodName == "deploy")
                return result.contractAddress;
              return result;
            } else if (this._account && this._account.kms) {
              let nonce = await _web3.eth.getTransactionCount(this.address);
              let price = _web3.utils.numberToHex(await _web3.eth.getGasPrice());
              let tx = {
                from: this.address,
                nonce,
                gasPrice: price,
                gasLimit: gas,
                gas,
                to: address,
                data: method.encodeABI()
              };
              let chainId = await this.getChainId();
              let txHash = await this.kms.signTransaction(chainId, tx);
              result = await _web3.eth.sendSignedTransaction(txHash);
              if (methodName == "deploy")
                return result.contractAddress;
              return result;
            } else {
              contract.options.address = address;
              result = await method.send({
                from: this.address,
                to: address,
                gas,
                value
              });
              if (methodName == "deploy")
                return result.options.address;
              return result;
            }
          }
        }
        get balance() {
          let self = this;
          let _web3 = this._web3;
          return new Promise(async function(resolve) {
            try {
              let network = _Wallet.Networks[self.chainId];
              let decimals = 18;
              if (network && network.nativeCurrency && network.nativeCurrency.decimals)
                decimals = network.nativeCurrency.decimals;
              let result = await _web3.eth.getBalance(self.address);
              resolve(new import_bignumber3.BigNumber(result).div(10 ** decimals));
            } catch (err) {
              resolve(new import_bignumber3.BigNumber(0));
            }
          });
        }
        balanceOf(address) {
          let self = this;
          let _web3 = this._web3;
          return new Promise(async function(resolve) {
            try {
              let network = _Wallet.Networks[self.chainId];
              let decimals = 18;
              if (network && network.nativeCurrency && network.nativeCurrency.decimals)
                decimals = network.nativeCurrency.decimals;
              let result = await _web3.eth.getBalance(address);
              resolve(new import_bignumber3.BigNumber(result).div(10 ** decimals));
            } catch (err) {
              resolve(new import_bignumber3.BigNumber(0));
            }
          });
        }
        recoverSigner(msg, signature) {
          let _web3 = this._web3;
          return new Promise(async function(resolve, reject) {
            try {
              let signing_address = await _web3.eth.accounts.recover(msg, signature);
              resolve(signing_address);
            } catch (err) {
              reject(err);
            }
            ;
          });
        }
        getBlock(blockHashOrBlockNumber, returnTransactionObjects) {
          return this._web3.eth.getBlock(blockHashOrBlockNumber || "latest", returnTransactionObjects);
        }
        getBlockNumber() {
          return this._web3.eth.getBlockNumber();
        }
        async getBlockTimestamp(blockHashOrBlockNumber) {
          let block = await this._web3.eth.getBlock(blockHashOrBlockNumber || "latest", false);
          if (typeof block.timestamp == "string")
            return parseInt(block.timestamp);
          else
            return block.timestamp;
        }
        async initKMS(value) {
          value = value || this._account.kms;
          if (value) {
            this._kms = new import_kms.KMS(value);
            this._account = {
              address: await this._kms.getAddress(),
              kms: value
            };
          }
        }
        get kms() {
          if (this._account && !this._kms && this._account.kms)
            this._kms = new import_kms.KMS(this._account.kms);
          return this._kms;
        }
        set privateKey(value) {
          if (value) {
            this._kms = null;
            this._web3.eth.defaultAccount = "";
          }
          this._account = {
            address: "",
            privateKey: value
          };
        }
        getAbiEvents(abi) {
          let _web3 = this._web3;
          let events = abi.filter((e) => e.type == "event");
          let eventMap = {};
          for (let i = 0; i < events.length; i++) {
            let topic = _web3.utils.soliditySha3(events[i].name + "(" + events[i].inputs.map((e) => e.type == "tuple" ? "(" + e.components.map((f) => f.type) + ")" : e.type).join(",") + ")");
            eventMap[topic] = events[i];
          }
          return eventMap;
        }
        getAbiTopics(abi, eventNames) {
          if (!eventNames)
            return;
          let _web3 = this._web3;
          let result = [];
          let events = abi.filter((e) => e.type == "event");
          for (let i = 0; i < events.length; i++) {
            if (eventNames.indexOf(events[i].name) >= 0) {
              let topic = _web3.utils.soliditySha3(events[i].name + "(" + events[i].inputs.map((e) => e.type == "tuple" ? "(" + e.components.map((f) => f.type) + ")" : e.type).join(",") + ")");
              result.push(topic);
            }
          }
          return result;
        }
        getContractAbi(address) {
          return this._abiAddressDict[address];
        }
        getContractAbiEvents(address) {
          let events = this._abiEventDict[address];
          if (events)
            return events;
          let abi = this._abiHashDict[this._abiAddressDict[address]];
          if (abi) {
            events = this.getAbiEvents(abi);
            this._abiEventDict[address] = events;
            return events;
          }
        }
        registerAbi(abi, address, handler) {
          let hash = "";
          if (typeof abi == "string")
            hash = abi;
          else
            hash = this._web3.utils.sha3(JSON.stringify(abi));
          this._abiHashDict[hash] = abi;
          if (address)
            this.registerAbiContracts(hash, address, handler);
          return hash;
        }
        registerAbiContracts(abiHash, address, handler) {
          if (address) {
            if (!Array.isArray(address))
              address = [address];
            for (let i = 0; i < address.length; i++) {
              this._abiAddressDict[address[i]] = abiHash;
              if (handler)
                this._eventHandler[address[i]] = handler;
            }
          }
        }
        decode(abi, event, raw) {
          if (!raw)
            raw = event;
          let d;
          if (abi) {
            d = this.web3.eth.abi.decodeLog(abi.inputs, raw.data, raw.topics.slice(1));
            if (d.__length__) {
              for (let k = 0; k < d.__length__; k++)
                delete d[k];
              delete d["__length__"];
            }
          }
          let log = {
            address: event.address,
            blockNumber: event.blockNumber,
            topics: raw.topics,
            data: d ? d : raw.data,
            rawData: d ? raw.data : void 0,
            logIndex: event.logIndex,
            name: abi ? abi.name : void 0,
            transactionHash: event.transactionHash,
            transactionIndex: event.transactionIndex
          };
          return log;
        }
        async decodeEventData(data, events) {
          let _web3 = this._web3;
          let event;
          if (events)
            event = events[data.topics[0]];
          else {
            let _events = this.getContractAbiEvents(data.address);
            if (_events)
              event = _events[data.topics[0]];
            else
              event = null;
          }
          ;
          let log = this.decode(event, data);
          let handler = this._eventHandler[data.address];
          if (handler)
            await handler(this, log);
          return log;
        }
        scanEvents(fromBlock, toBlock, topics, events, address) {
          let _web3 = this._web3;
          return new Promise(async (resolve, reject) => {
            try {
              let logs = await _web3.eth.getPastLogs({
                fromBlock,
                toBlock,
                address,
                topics: topics ? topics : null
              });
              let result = [];
              for (let i = 0; i < logs.length; i++) {
                let e = logs[i];
                result.push(await this.decodeEventData(e, events));
              }
              resolve(result);
            } catch (err) {
              reject(err);
            }
          });
        }
        send(to, amount) {
          let _web3 = this._web3;
          let address = this.address;
          let self = this;
          return new Promise(async function(resolve, reject) {
            try {
              let value = _web3.utils.numberToHex(_web3.utils.toWei(amount.toString()));
              let result;
              if (self._account && self._account.privateKey || self.kms) {
                let nonce = await _web3.eth.getTransactionCount(address);
                let gas = await _web3.eth.estimateGas({
                  from: address,
                  nonce,
                  to,
                  value
                });
                let price = _web3.utils.numberToHex(await _web3.eth.getGasPrice());
                let tx = {
                  from: address,
                  nonce,
                  gasPrice: price,
                  gasLimit: gas,
                  gas,
                  to,
                  value
                };
                if (self.kms) {
                  let chainId = await self.getChainId();
                  let txHash = await self.kms.signTransaction(chainId, tx);
                  result = await _web3.eth.sendSignedTransaction(txHash);
                } else {
                  let signedTx = await _web3.eth.accounts.signTransaction(tx, self._account.privateKey);
                  result = await _web3.eth.sendSignedTransaction(signedTx.rawTransaction);
                }
                resolve(result);
              } else {
                result = await _web3.eth.sendTransaction({ from: address, to, value: _web3.utils.toWei(amount.toString()).toString() });
                resolve(result);
              }
            } catch (err) {
              reject(err);
            }
          });
        }
        setBlockTime(time) {
          return new Promise((resolve, reject) => {
            this._web3.currentProvider.send({
              jsonrpc: "2.0",
              method: time > 1e9 ? "evm_mine" : "evm_increaseTime",
              params: [time],
              id: new Date().getTime()
            }, (err, result) => {
              if (err)
                return reject(err);
              resolve(result);
            });
          });
        }
        signMessage(msg) {
          let _web3 = this._web3;
          let address = this.address;
          let self = this;
          return new Promise(async function(resolve, reject) {
            try {
              let result;
              if (self._account && self._account.privateKey || self.kms) {
                if (self.kms) {
                  result = await self.kms.signMessage(self.chainId, _web3.utils.stringToHex(msg));
                  resolve(result);
                } else {
                  result = await _web3.eth.accounts.sign(msg, self._account.privateKey);
                  resolve(result.signature);
                }
              } else {
                result = await _web3.eth.sign(msg, address, null);
                resolve(result);
              }
            } catch (err) {
              reject(err);
            }
          });
        }
        token(tokenAddress, decimals) {
          return new import_erc202.Erc20(this, tokenAddress, decimals);
        }
        get utils() {
          return this._web3.utils;
        }
        verifyMessage(account, msg, signature) {
          let _web3 = this._web3;
          return new Promise(async function(resolve, reject) {
            try {
              let signing_address = await _web3.eth.accounts.recover(msg, signature);
              resolve(signing_address && account.toLowerCase() == signing_address.toLowerCase());
            } catch (err) {
              reject(err);
            }
            ;
          });
        }
        get web3() {
          return this._web3;
        }
      }
      _Wallet.Wallet = Wallet3;
    })(Wallet2 || (Wallet2 = {}));
    module2.exports = Wallet2;
  }
});

// src/index.ts
__export(exports, {
  BigNumber: () => import_bignumber2.BigNumber,
  Contract: () => import_contract.Contract,
  Erc20: () => import_erc20.Erc20,
  Event: () => import_wallet.Event,
  IWallet: () => import_wallet.IWallet,
  IWalletUtils: () => import_wallet.IWalletUtils,
  Transaction: () => import_wallet.Transaction,
  TransactionReceipt: () => import_wallet.TransactionReceipt,
  Utils: () => utils_exports,
  Wallet: () => import_wallet.Wallet
});
var import_wallet = __toModule(require_wallet());
var import_contract = __toModule(require_contract());
var import_bignumber2 = __toModule(require("bignumber.js"));
var import_erc20 = __toModule(require_erc202());
init_utils();

});