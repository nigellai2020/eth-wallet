// import { Eth } from 'web3-eth';
// import { Utils } from 'web3-utils';

import {BigNumber} from 'bignumber.js';
const eth = require('web3-eth');
const utils = require('web3-utils');

export type Hex = string | number;
export type Unit =
    | 'noether'
    | 'wei'
    | 'kwei'
    | 'Kwei'
    | 'babbage'
    | 'femtoether'
    | 'mwei'
    | 'Mwei'
    | 'lovelace'
    | 'picoether'
    | 'gwei'
    | 'Gwei'
    | 'shannon'
    | 'nanoether'
    | 'nano'
    | 'szabo'
    | 'microether'
    | 'micro'
    | 'finney'
    | 'milliether'
    | 'milli'
    | 'ether'
    | 'kether'
    | 'grand'
    | 'mether'
    | 'gether'
    | 'tether';
export type Mixed =
| string
| number
| BigNumber
| {
		type: string;
		value: string;
	}
| {
		t: string;
		v: string | BigNumber | number;
	}
| boolean;
export interface Units {
    noether: string;
    wei: string;
    kwei: string;
    Kwei: string;
    babbage: string;
    femtoether: string;
    mwei: string;
    Mwei: string;
    lovelace: string;
    picoether: string;
    gwei: string;
    Gwei: string;
    shannon: string;
    nanoether: string;
    nano: string;
    szabo: string;
    microether: string;
    micro: string;
    finney: string;
    milliether: string;
    milli: string;
    ether: string;
    kether: string;
    grand: string;
    mether: string;
    gether: string;
    tether: string;
};
export interface Utils {
    isBN(value: string | number): boolean;
    isBigNumber(value: BigNumber): boolean;
    toBN(value: number | string): BigNumber;
    toTwosComplement(value: number | string | BigNumber): string;
    isAddress(address: string, chainId?: number): boolean;
    isHex(hex: Hex): boolean;
    isHexStrict(hex: Hex): boolean;
    asciiToHex(string: string, length?: number): string;
    hexToAscii(string: string): string;
    toAscii(string: string): string;
    bytesToHex(bytes: number[]): string;
    numberToHex(value: number | string | BigNumber): string;
    checkAddressChecksum(address: string, chainId?: number): boolean;
    fromAscii(string: string): string;
    fromDecimal(value: string | number): string;
    fromUtf8(string: string): string;
    fromWei(value: string | BigNumber, unit?: Unit): string;
    hexToBytes(hex: Hex): number[];
    hexToNumber(hex: Hex, bigIntOnOverflow?: boolean): number | string;
    hexToNumberString(hex: Hex): string;
    hexToString(hex: Hex): string;
    hexToUtf8(string: string): string;
    keccak256(value: string | BigNumber): string;
    padLeft(value: string | number, characterAmount: number, sign?: string): string;
    leftPad(string: string | number, characterAmount: number, sign?: string): string;
    rightPad(string: string | number, characterAmount: number, sign?: string): string;
    padRight(string: string | number, characterAmount: number, sign?: string): string;
    sha3(value: string | BigNumber): string | null;
    randomHex(bytesSize: number): string;
    utf8ToHex(string: string): string;
    stringToHex(string: string): string;
    toChecksumAddress(address: string, chainId?: number): string;
    toDecimal(hex: Hex): number;
    toHex(value: number | string | BigNumber): string;
    toUtf8(string: string): string;
    toWei(val: BigNumber, unit?: Unit): BigNumber;
    toWei(val: string, unit?: Unit): string;
    isBloom(bloom: string): boolean;
    isInBloom(bloom: string, value: string | Uint8Array): boolean;
    isUserEthereumAddressInBloom(bloom: string, ethereumAddress: string): boolean;
    isContractAddressInBloom(bloom: string, contractAddress: string): boolean;
    isTopicInBloom(bloom: string, topic: string): boolean;
    isTopic(topic: string): boolean;
    _jsonInterfaceMethodToString(abiItem: AbiItem): string;
    soliditySha3(...val: Mixed[]): string | null;
    soliditySha3Raw(...val: Mixed[]): string;
    encodePacked(...val: Mixed[]): string | null;
    getUnitValue(unit: Unit): string;
    unitMap(): Units;
    testAddress(bloom: string, address: string): boolean;
    testTopic(bloom: string, topic: string): boolean;
    getSignatureParameters(signature: string): {r: string; s: string; v: number};
    stripHexPrefix(str: string): string;
    toNumber(value: number | string | BigNumber, bigIntOnOverflow?: boolean): number | string;
};
export interface HttpHeader {
    name: string;
    value: string;
};
export interface HttpProviderOptions {
    keepAlive?: boolean;
    timeout?: number;
    headers?: HttpHeader[];
    withCredentials?: boolean;
    agent?: any;
};
export interface HttpProvider{
    constructor(host: string, options?: HttpProviderOptions);

    host: string;
    connected: boolean;

    supportsSubscriptions(): boolean;

    send(
        payload: any,
        callback: (error: Error | null, result?: any) => void
    ): void;

    disconnect(): boolean;
};
export interface ReconnectOptions {
    auto?: boolean;
    delay?: number;
    maxAttempts?: number;
    onTimeout?: boolean;
};
export interface WebsocketProviderOptions {
    host?: string;
    timeout?: number;
    reconnectDelay?: number;
    headers?: any;
    protocol?: string;
    clientConfig?: object;
    requestOptions?: any;
    origin?: string;
    reconnect?: ReconnectOptions;
};
export interface JsonRpcPayload {
    jsonrpc: string;
    method: string;
    params?: any[];
    id?: string | number;
};
export interface RequestItem {
    payload: JsonRpcPayload;
    callback: (error: any, result: any) => void;
};
export interface JsonRpcResponse {
    jsonrpc: string;
    id: string | number;
    result?: any;
    error?: {
      readonly code?: number;
      readonly data?: unknown;
      readonly message: string;
    };
};
export interface WebsocketProvider {
    constructor(host: string, options?: WebsocketProviderOptions);

    isConnecting(): boolean;

    requestQueue: Map<string, RequestItem>;
    responseQueue: Map<string, RequestItem>;
    connected: boolean;
    connection: any;

    supportsSubscriptions(): boolean;

    send(
        payload: JsonRpcPayload,
        callback: (error: Error | null, result?: JsonRpcResponse) => void
    ): void;

    on(type: string, callback: () => void): void;

    once(type: string, callback: () => void): void;

    removeListener(type: string, callback: () => void): void;

    removeAllListeners(type: string): void;

    reset(): void;

    disconnect(code?: number, reason?: string): void;

    connect(): void;

    reconnect(): void;
};
export interface RequestArguments {
    method: string;
    params?: any;
    [key: string]: any;
};
export interface AbstractProvider {
    sendAsync(payload: JsonRpcPayload, callback?: (error: Error | null, result?: JsonRpcResponse) => Promise<unknown> | void): void;
    send?(payload: JsonRpcPayload, callback: (error: Error | null, result?: JsonRpcResponse) => unknown): void;
    request?(args: RequestArguments): Promise<any>;
    connected?: boolean;
  }
export type provider =
    | HttpProvider
    | WebsocketProvider
    | AbstractProvider
    | string
    | null;

export interface AbiInput {
	name: string;
	type: string;
	indexed?: boolean;
	components?: AbiInput[];
	internalType?: string;
};
export interface AbiOutput {
	name: string;
	type: string;
	components?: AbiOutput[];
	internalType?: string;
};
export type AbiType = 'function' | 'constructor' | 'event' | 'fallback' | 'receive';
export type StateMutabilityType = 'pure' | 'view' | 'nonpayable' | 'payable';
export interface AbiItem {
	anonymous?: boolean;
	constant?: boolean;
	inputs?: AbiInput[];
	name?: string;
	outputs?: AbiOutput[];
	payable?: boolean;
	stateMutability?: StateMutabilityType;
	type: AbiType;
	gas?: number;
};
export interface ContractOptions {
    // Sender to use for contract calls
    from?: string;
    // Gas price to use for contract calls
    gasPrice?: string;
    // Gas to use for contract calls
    gas?: number;
    // Contract code
    data?: string;
};
export type chain =
    | 'mainnet'
    | 'goerli'
    | 'kovan'
    | 'rinkeby'
    | 'ropsten';
export type hardfork =
| 'chainstart'
| 'homestead'
| 'dao'
| 'tangerineWhistle'
| 'spuriousDragon'
| 'byzantium'
| 'constantinople'
| 'petersburg'
| 'istanbul';
export interface CustomChainParams {
    name?: string;
    networkId: number;
    chainId: number;
}
export interface Common {
    customChain: CustomChainParams;
    baseChain?: chain;
    hardfork?: hardfork;
};
export interface TransactionConfig {
    from?: string | number;
    to?: string;
    value?: number | string | BigNumber;
    gas?: number | string;
    gasPrice?: number | string | BigNumber;
    maxPriorityFeePerGas?: number | string | BigNumber;
    maxFeePerGas?: number | string | BigNumber;
    data?: string;
    nonce?: number;
    chainId?: number;
    common?: Common;
    chain?: string;
    hardfork?: string;
};
export interface SignedTransaction {
    messageHash?: string;
    r: string;
    s: string;
    v: string;
    rawTransaction?: string;
    transactionHash?: string;
};
export interface Sign extends SignedTransaction {
    message: string;
    signature: string;
};
export interface EncryptedKeystoreV3Json {
    version: number;
    id: string;
    address: string;
    crypto: {
        ciphertext: string;
        cipherparams: {iv: string};
        cipher: string;
        kdf: string;
        kdfparams: {
            dklen: number;
            salt: string;
            n: number;
            r: number;
            p: number;
        };
        mac: string;
    };
};
export interface Account {
    address: string;
    privateKey: string;
    signTransaction: (
        transactionConfig: TransactionConfig,
        callback?: (signTransaction: SignedTransaction) => void
    ) => Promise<SignedTransaction>;
    sign: (data: string) => Sign;
    encrypt: (password: string) => EncryptedKeystoreV3Json;
};
export interface SignatureObject {
    messageHash: string;
    r: string;
    s: string;
    v: string;
};
export interface AddedAccount extends Account {
    index: number;
};
export interface AddAccount {
    address: string;
    privateKey: string;
};
export interface WalletBase {
    constructor(accounts: Accounts);

    length: number;
    defaultKeyName: string;

    [key: number]: Account;

    create(numberOfAccounts: number, entropy?: string): WalletBase;

    add(account: string | AddAccount): AddedAccount;

    remove(account: string | number): boolean;

    clear(): WalletBase;

    encrypt(password: string): EncryptedKeystoreV3Json[];

    decrypt(
        keystoreArray: EncryptedKeystoreV3Json[],
        password: string
    ): WalletBase;

    save(password: string, keyName?: string): boolean;

    load(password: string, keyName?: string): WalletBase;
}
export interface Accounts {
    constructor(provider?: provider);
    readonly givenProvider: any;
    readonly currentProvider: provider;

    setProvider(provider: provider): boolean;

    create(entropy?: string): Account;

    privateKeyToAccount(privateKey: string, ignoreLength?: boolean): Account;

    signTransaction(
        transactionConfig: TransactionConfig,
        privateKey: string,
        callback?: (error: Error, signedTransaction: SignedTransaction) => void
    ): Promise<SignedTransaction>;

    recoverTransaction(signature: string): string;

    hashMessage(message: string): string;

    sign(data: string, privateKey: string): Sign;

    recover(signatureObject: SignatureObject): string;
    recover(message: string, signature: string, preFixed?: boolean): string;
    recover(
        message: string,
        v: string,
        r: string,
        s: string,
        preFixed?: boolean
    ): string;

    encrypt(privateKey: string, password: string): EncryptedKeystoreV3Json;

    decrypt(keystoreJsonV3: EncryptedKeystoreV3Json, password: string): Account;

    wallet: WalletBase;
};
export type BlockNumber = string | number | BigNumber | 'latest' | 'pending' | 'earliest' | 'genesis' | 'finalized' | 'safe';
export interface Options extends ContractOptions {
    address: string;
    jsonInterface: AbiItem[];
};
export interface DeployOptions {
    data: string;
    arguments?: any[];
};
export interface SendOptions {
    from: string;
    gasPrice?: string;
    gas?: number;
    value?: number | string | BigNumber;
    nonce?: number;
};
export interface EventLog {
    event: string;
    address: string;
    returnValues: any;
    logIndex: number;
    transactionIndex: number;
    transactionHash: string;
    blockHash: string;
    blockNumber: number;
    raw?: {data: string; topics: any[]};
};
export interface Log {
    address: string;
    data: string;
    topics: string[];
    logIndex: number;
    transactionIndex: number;
    transactionHash: string;
    blockHash: string;
    blockNumber: number;
    removed: boolean;
};
export interface TransactionReceipt {
    status: boolean;
    transactionHash: string;
    transactionIndex: number;
    blockHash: string;
    blockNumber: number;
    from: string;
    to: string;
    contractAddress?: string;
    cumulativeGasUsed: number;
    gasUsed: number;
    effectiveGasPrice: number;
    logs: Log[];
    logsBloom: string;
    events?: {
        [eventName: string]: EventLog;
    };
};
export interface PromiEvent<T> extends Promise<T> {
    once(
        type: 'sending',
        handler: (payload: object) => void
    ): PromiEvent<T>;

    once(
        type: 'sent',
        handler: (payload: object) => void
    ): PromiEvent<T>;

    once(
        type: 'transactionHash',
        handler: (transactionHash: string) => void
    ): PromiEvent<T>;

    once(
        type: 'receipt',
        handler: (receipt: TransactionReceipt) => void
    ): PromiEvent<T>;

    once(
        type: 'confirmation',
        handler: (confirmationNumber: number, receipt: TransactionReceipt, latestBlockHash?: string) => void
    ): PromiEvent<T>;

    once(type: 'error', handler: (error: Error) => void): PromiEvent<T>;

    once(
        type: 'error' | 'confirmation' | 'receipt' | 'transactionHash' | 'sent' | 'sending',
        handler: (error: Error | TransactionReceipt | string | object) => void
    ): PromiEvent<T>;

    on(
        type: 'sending',
        handler: (payload: object) => void
    ): PromiEvent<T>;

    on(
        type: 'sent',
        handler: (payload: object) => void
    ): PromiEvent<T>;

    on(
        type: 'transactionHash',
        handler: (receipt: string) => void
    ): PromiEvent<T>;

    on(
        type: 'receipt',
        handler: (receipt: TransactionReceipt) => void
    ): PromiEvent<T>;

    on(
        type: 'confirmation',
        handler: (confNumber: number, receipt: TransactionReceipt, latestBlockHash?: string) => void
    ): PromiEvent<T>;

    on(type: 'error', handler: (error: Error) => void): PromiEvent<T>;

    on(
        type: 'error' | 'confirmation' | 'receipt' | 'transactionHash' | 'sent' | 'sending',
        handler: (error: Error | TransactionReceipt | string | object) => void
    ): PromiEvent<T>;
};
export interface CallOptions {
    from?: string;
    gasPrice?: string;
    gas?: number;
};
export interface EstimateGasOptions {
    from?: string;
    gas?: number;
    value?: number | string | BigNumber;
};
export interface ContractSendMethod {
    send(
        options: SendOptions,
        callback?: (err: Error, transactionHash: string) => void
    ): PromiEvent<Contract>;

    call(
        options?: CallOptions,
        callback?: (err: Error, result: any) => void
    ): Promise<any>;

    estimateGas(
        options: EstimateGasOptions,
        callback?: (err: Error, gas: number) => void
    ): Promise<number>;

    estimateGas(callback: (err: Error, gas: number) => void): Promise<number>;

    estimateGas(
        options: EstimateGasOptions,
        callback: (err: Error, gas: number) => void
    ): Promise<number>;

    estimateGas(options: EstimateGasOptions): Promise<number>;

    estimateGas(): Promise<number>;

    encodeABI(): string;
};
export interface EventData {
    returnValues: {
        [key: string]: any;
    };
    raw: {
        data: string;
        topics: string[];
    };
    event: string;
    signature: string;
    logIndex: number;
    transactionIndex: number;
    transactionHash: string;
    blockHash: string;
    blockNumber: number;
    address: string;
};
export interface Filter {
    [key: string]: number | string | string[] | number[];
};
export interface LogsOptions {
    fromBlock?: BlockNumber;
    address?: string | string[];
    topics?: Array<string | string[] | null>;
}
export interface EventOptions extends LogsOptions {
    filter?: Filter;
};
export interface PastLogsOptions extends LogsOptions {
    toBlock?: BlockNumber;
};
export interface PastEventOptions extends PastLogsOptions {
    filter?: Filter;
};
export interface Contract {
    constructor(
        jsonInterface: AbiItem[],
        address?: string,
        options?: ContractOptions
    );

    setProvider(provider: provider, accounts?: Accounts): void;
    defaultAccount: string | null;
    defaultBlock: BlockNumber;
    defaultCommon: Common;
    defaultHardfork: hardfork;
    defaultChain: chain;
    transactionPollingTimeout: number;
    transactionConfirmationBlocks: number;
    transactionBlockTimeout: number;
    handleRevert: boolean;

    options: Options;

    clone(): Contract;

    deploy(options: DeployOptions): ContractSendMethod;

    methods: any;

    once(
        event: string,
        callback: (error: Error, event: EventData) => void
    ): void;
    once(
        event: string,
        options: EventOptions,
        callback: (error: Error, event: EventData) => void
    ): void;

    events: any;

    getPastEvents(event: string): Promise<EventData[]>;
    getPastEvents(
        event: string,
        options: PastEventOptions,
        callback: (error: Error, events: EventData[]) => void
    ): Promise<EventData[]>;
    getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
    getPastEvents(
        event: string,
        callback: (error: Error, events: EventData[]) => void
    ): Promise<EventData[]>;
};
export interface IndirectOptions {
    institution: string;
    identifier: string;
};
export interface Iban {
    constructor(
        iban: string
    );
    toAddress(iban: string): string;
    toIban(address: string): string;
    fromAddress(address: string): Iban;
    fromBban(bban: string): Iban;
    createIndirect(options: IndirectOptions): Iban;
    isValid(iban: string): boolean;
    isValid(): boolean;
    isDirect(): boolean;
    isIndirect(): boolean;
    checksum(): string;
    institution(): string;
    client(): string;
    toAddress(): string;
    toString(): string;
};
export interface Method {
    name: string;
    call: string;
    params?: number;
    inputFormatter?: Array<(() => void) | null>;
    outputFormatter?: () => void;
    transformPayload?: () => void;
    extraFormatters?: any;
    defaultBlock?: string;
    defaultAccount?: string | null;
    abiCoder?: any;
    handleRevert?: boolean;
};
export interface BatchRequest {
    constructor();
    add(method: Method): void;
    execute(): void;
};
export interface Extension {
    property?: string,
    methods: Method[]
};
export interface RLPEncodedTransaction {
    raw: string;
    tx: {
        nonce: string;
        gasPrice: string;
        gas: string;
        to: string;
        value: string;
        input: string;
        r: string;
        s: string;
        v: string;
        hash: string;
    };
};
export interface Personal {
    constructor(provider?: provider);

    readonly givenProvider: any;
    readonly currentProvider: provider;
    defaultAccount: string | null;
    defaultBlock: string | number;
    BatchRequest: new () => BatchRequest;

    setProvider(provider: provider): boolean;

    extend(extension: Extension): any;

    newAccount(
        password: string,
        callback?: (error: Error, address: string) => void
    ): Promise<string>;

    sign(
        dataToSign: string,
        address: string,
        password: string,
        callback?: (error: Error, signature: string) => void
    ): Promise<string>;

    ecRecover(
        dataThatWasSigned: string,
        signature: string,
        callback?: (error: Error, address: string) => void
    ): Promise<string>;

    signTransaction(
        transactionConfig: TransactionConfig,
        password: string,
        callback?: (
            error: Error,
            RLPEncodedTransaction: RLPEncodedTransaction
        ) => void
    ): Promise<RLPEncodedTransaction>;

    sendTransaction(
        transactionConfig: TransactionConfig,
        password: string,
        callback?: (error: Error, transactionHash: string) => void
    ): Promise<string>;

    unlockAccount(
        address: string,
        password: string,
        unlockDuration: number,
        callback?: (error: Error) => void
    ): Promise<boolean>;

    lockAccount(
        address: string,
        callback?: (error: Error, success: boolean) => void
    ): Promise<boolean>;

    getAccounts(
        callback?: (error: Error, accounts: string[]) => void
    ): Promise<string[]>;

    importRawKey(
        privateKey: string,
        password: string,
        callback?: (error: Error, result: string) => void
    ): Promise<string>;
};
export interface AbiCoder {
    encodeFunctionSignature(functionName: string | AbiItem): string;

    encodeEventSignature(functionName: string | AbiItem): string;

    encodeParameter(type: any, parameter: any): string;

    encodeParameters(types: any[], paramaters: any[]): string;

    encodeFunctionCall(abiItem: AbiItem, params: string[]): string;

    decodeParameter(type: any, hex: string): { [key: string]: any };

    decodeParameters(types: any[], hex: string): { [key: string]: any };

    decodeLog(
        inputs: AbiInput[],
        hex: string,
        topics: string[]
    ): { [key: string]: string };
};
export interface Providers {
    HttpProvider: new (
        host: string,
        options?: HttpProviderOptions
    ) => HttpProvider;
    WebsocketProvider: new (
        host: string,
        options?: WebsocketProviderOptions
    ) => WebsocketProvider;
    IpcProvider: new (path: string, net: any) => any;
};
export interface Network {
    constructor(provider?: provider);

    readonly givenProvider: any;
    readonly currentProvider: provider;
    readonly providers: Providers;
    BatchRequest: new () => BatchRequest;

    setProvider(provider: provider): boolean;

    extend(extension: Extension): any;

    getNetworkType(
        callback?: (error: Error, returnValue: string) => void
    ): Promise<string>;

    getId(callback?: (error: Error, id: number) => void): Promise<number>;

    isListening(
        callback?: (error: Error, listening: boolean) => void
    ): Promise<boolean>;

    getPeerCount(
        callback?: (error: Error, peerCount: number) => void
    ): Promise<number>;
};
export interface SubscriptionOptions {
    subscription: string;
    type: string;
    requestManager: any;
};
export interface Subscription<T> {
    constructor(options: SubscriptionOptions);
    id: string;
    options: SubscriptionOptions;
    callback: () => void;
    arguments: any;
    lastBlock: number;
    subscribe(callback?: (error: Error, result: T) => void): Subscription<T>;
    unsubscribe(
        callback?: (error: Error, result: boolean) => void
    ): Promise<undefined | boolean>;
    on(type: 'data', handler: (data: T) => void): Subscription<T>;
    on(type: 'changed', handler: (data: T) => void): Subscription<T>;
    on(type: 'connected', handler: (subscriptionId: string) => void): Subscription<T>;
    on(type: 'error', handler: (data: Error) => void): Subscription<T>;
};
export interface Syncing {
    StartingBlock: number;
    CurrentBlock: number;
    HighestBlock: number;
    KnownStates: number;
    PulledStates: number;
};
export interface BlockHeader {
    number: number;
    hash: string;
    parentHash: string;
    nonce: string;
    sha3Uncles: string;
    logsBloom: string;
    transactionsRoot: string;
    stateRoot: string;
    receiptsRoot: string;
    miner: string;
    extraData: string;
    gasLimit: number;
    gasUsed: number;
    timestamp: number | string;
    baseFeePerGas?: number;
};
export interface FeeHistoryResult {
    baseFeePerGas: string[];
    gasUsedRatio: number[];
    oldestBlock: number;
    reward: string[][];
};
export interface BlockTransactionBase extends BlockHeader {
    size: number;
    difficulty: number;
    totalDifficulty: number;
    uncles: string[];
};
export interface BlockTransactionString extends BlockTransactionBase {
    transactions: string[];
};
export interface AccessTuple {
    address: string;
    storageKeys: string[];
};
export type AccessList = AccessTuple[];
export interface Transaction {
    hash: string;
    nonce: number;
    blockHash: string | null;
    blockNumber: number | null;
    transactionIndex: number | null;
    from: string;
    to: string | null;
    value: string;
    gasPrice: string;
    maxPriorityFeePerGas?: number | string | BigNumber;
    maxFeePerGas?: number | string | BigNumber;
    gas: number;
    input: string;
    chainId?: string;
    accessList?: AccessList;
    v?: string;
    r?: string;
    s?: string;
};
export interface BlockTransactionObject extends BlockTransactionBase {
    transactions: Transaction[];
};
export interface CreateAccessList {
    accessList: AccessTuple[];
    error?: string;
    gasUsed: string;
};
export interface Eth {
    constructor(provider?: provider);
    Contract: new (
        jsonInterface: AbiItem[] | AbiItem,
        address?: string,
        options?: ContractOptions
    ) => Contract;
    Iban: new (iban: string) => Iban;
    personal: Personal;
    accounts: Accounts;
    ens: any;
    abi: AbiCoder;
    net: Network;

    readonly givenProvider: any;
    defaultAccount: string | null;
    defaultBlock: BlockNumber;
    defaultCommon: Common;
    defaultHardfork: hardfork;
    defaultChain: chain;
    transactionPollingTimeout: number;
    transactionConfirmationBlocks: number;
    transactionBlockTimeout: number;
    handleRevert: boolean;
    readonly currentProvider: provider;

    setProvider(provider: provider): boolean;

    BatchRequest: new () => BatchRequest;
    readonly providers: Providers;

    extend(extension: Extension): any;

    clearSubscriptions(callback: (error: Error, result: boolean) => void): void;

    subscribe(
        type: 'logs',
        options: LogsOptions,
        callback?: (error: Error, log: Log) => void
    ): Subscription<Log>;
    subscribe(
        type: 'syncing',
        callback?: (error: Error, result: Syncing) => void
    ): Subscription<Syncing>;
    subscribe(
        type: 'newBlockHeaders',
        callback?: (error: Error, blockHeader: BlockHeader) => void
    ): Subscription<BlockHeader>;
    subscribe(
        type: 'pendingTransactions',
        callback?: (error: Error, transactionHash: string) => void
    ): Subscription<string>;

    getProtocolVersion(
        callback?: (error: Error, protocolVersion: string) => void
    ): Promise<string>;

    isSyncing(
        callback?: (error: Error, syncing: Syncing) => void
    ): Promise<Syncing | boolean>;

    getCoinbase(
        callback?: (error: Error, coinbaseAddress: string) => void
    ): Promise<string>;

    isMining(
        callback?: (error: Error, mining: boolean) => void
    ): Promise<boolean>;

    getHashrate(
        callback?: (error: Error, hashes: number) => void
    ): Promise<number>;

    getNodeInfo(
        callback?: (error: Error, version: string) => void
    ): Promise<string>;

    getChainId(
        callback?: (error: Error, version: number) => void
    ): Promise<number>;

    getGasPrice(
        callback?: (error: Error, gasPrice: string) => void
    ): Promise<string>;

    getFeeHistory(
        blockCount: number | BigNumber | BigNumber | string,
        lastBlock: number | BigNumber | BigNumber | string,
        rewardPercentiles: number[],
        callback?: (error: Error, feeHistory: FeeHistoryResult) => void
    ): Promise<FeeHistoryResult>;

    getAccounts(
        callback?: (error: Error, accounts: string[]) => void
    ): Promise<string[]>;

    getBlockNumber(
        callback?: (error: Error, blockNumber: number) => void
    ): Promise<number>;

    getBalance(
        address: string
    ): Promise<string>;
    getBalance(
        address: string,
        defaultBlock: BlockNumber): Promise<string>;
    getBalance(
        address: string,
        callback?: (error: Error, balance: string) => void
    ): Promise<string>;
    getBalance(
        address: string,
        defaultBlock: BlockNumber,
        callback?: (error: Error, balance: string) => void
    ): Promise<string>;

    getStorageAt(address: string, position: number | BigNumber | string): Promise<string>;
    getStorageAt(
        address: string,
        position: number | BigNumber | string,
        defaultBlock: BlockNumber
    ): Promise<string>;
    getStorageAt(
        address: string,
        position: number | BigNumber | string,
        callback?: (error: Error, storageAt: string) => void
    ): Promise<string>;
    getStorageAt(
        address: string,
        position: number | BigNumber | string,
        defaultBlock: BlockNumber,
        callback?: (error: Error, storageAt: string) => void
    ): Promise<string>;

    getCode(
        address: string
    ): Promise<string>;
    getCode(
        address: string,
        defaultBlock: BlockNumber
    ): Promise<string>;
    getCode(
        address: string,
        callback?: (error: Error, code: string) => void
    ): Promise<string>;
    getCode(
        address: string,
        defaultBlock: BlockNumber,
        callback?: (error: Error, code: string) => void
    ): Promise<string>;

    getBlock(blockHashOrBlockNumber: BlockNumber | string): Promise<BlockTransactionString>;
    getBlock(
        blockHashOrBlockNumber: BlockNumber | string,
        returnTransactionObjects: false
    ): Promise<BlockTransactionString>;
    getBlock(
        blockHashOrBlockNumber: BlockNumber | string,
        returnTransactionObjects: true
    ): Promise<BlockTransactionObject>;
    getBlock(
        blockHashOrBlockNumber: BlockNumber | string,
        callback?: (error: Error, block: BlockTransactionString) => void
    ): Promise<BlockTransactionString>;
    getBlock(
        blockHashOrBlockNumber: BlockNumber | string,
        returnTransactionObjects: false,
        callback?: (error: Error, block: BlockTransactionString) => void
    ): Promise<BlockTransactionString>;
    getBlock(
        blockHashOrBlockNumber: BlockNumber | string,
        returnTransactionObjects: true,
        callback?: (error: Error, block: BlockTransactionObject) => void
    ): Promise<BlockTransactionObject>;

    getBlockTransactionCount(
        blockHashOrBlockNumber: BlockNumber | string,
        callback?: (error: Error, numberOfTransactions: number) => void
    ): Promise<number>;

    getBlockUncleCount(
        blockHashOrBlockNumber: BlockNumber | string,
        callback?: (error: Error, numberOfTransactions: number) => void
    ): Promise<number>;

    getUncle(
        blockHashOrBlockNumber: BlockNumber | string,
        uncleIndex: number | string | BigNumber
    ): Promise<BlockTransactionString>;
    getUncle(
        blockHashOrBlockNumber: BlockNumber | string,
        uncleIndex: number | string | BigNumber,
        returnTransactionObjects: boolean
    ): Promise<BlockTransactionObject>;
    getUncle(
        blockHashOrBlockNumber: BlockNumber | string,
        uncleIndex: number | string | BigNumber,
        callback?: (error: Error, uncle: any) => void
    ): Promise<BlockTransactionString>;
    getUncle(
        blockHashOrBlockNumber: BlockNumber | string,
        uncleIndex: number | string | BigNumber,
        returnTransactionObjects: boolean,
        callback?: (error: Error, uncle: any) => void
    ): Promise<BlockTransactionObject>;

    getTransaction(
        transactionHash: string,
        callback?: (error: Error, transaction: Transaction) => void
    ): Promise<Transaction>;

    getPendingTransactions(
        callback?: (error: Error, result: Transaction[]) => void
    ): Promise<Transaction[]>;

    getTransactionFromBlock(
        blockHashOrBlockNumber: BlockNumber | string,
        indexNumber: number | string | BigNumber,
        callback?: (error: Error, transaction: Transaction) => void
    ): Promise<Transaction>;

    getTransactionReceipt(
        hash: string,
        callback?: (
            error: Error,
            transactionReceipt: TransactionReceipt
        ) => void
    ): Promise<TransactionReceipt>;

    getTransactionCount(address: string): Promise<number>;
    getTransactionCount(
        address: string,
        defaultBlock: BlockNumber
    ): Promise<number>;
    getTransactionCount(
        address: string,
        callback?: (error: Error, count: number) => void
    ): Promise<number>;
    getTransactionCount(
        address: string,
        defaultBlock: BlockNumber,
        callback?: (error: Error, count: number) => void
    ): Promise<number>;

    sendTransaction(
        transactionConfig: TransactionConfig,
        callback?: (error: Error, hash: string) => void
    ): PromiEvent<TransactionReceipt>;

    sendSignedTransaction(
        signedTransactionData: string,
        callback?: (error: Error, hash: string) => void
    ): PromiEvent<TransactionReceipt>;

    sign(
        dataToSign: string,
        address: string | number,
        callback?: (error: Error, signature: string) => void
    ): Promise<string>;

    signTransaction(
        transactionConfig: TransactionConfig,
        callback?: (
            error: Error,
            signedTransaction: RLPEncodedTransaction
        ) => void
    ): Promise<RLPEncodedTransaction>;
    signTransaction(
        transactionConfig: TransactionConfig,
        address: string
    ): Promise<RLPEncodedTransaction>;
    signTransaction(
        transactionConfig: TransactionConfig,
        address: string,
        callback: (
            error: Error,
            signedTransaction: RLPEncodedTransaction
        ) => void
    ): Promise<RLPEncodedTransaction>;

    call(transactionConfig: TransactionConfig): Promise<string>;
    call(
        transactionConfig: TransactionConfig,
        defaultBlock?: BlockNumber
    ): Promise<string>;
    call(
        transactionConfig: TransactionConfig,
        callback?: (error: Error, data: string) => void
    ): Promise<string>;
    call(
        transactionConfig: TransactionConfig,
        defaultBlock: BlockNumber,
        callback: (error: Error, data: string) => void
    ): Promise<string>;

    estimateGas(
        transactionConfig: TransactionConfig,
        callback?: (error: Error, gas: number) => void
    ): Promise<number>;

    createAccessList(
        transactionConfig: TransactionConfig,
        callback?: (error: Error, result: CreateAccessList) => void
    ): Promise<CreateAccessList>;

    createAccessList(
        transactionConfig: TransactionConfig,
        defaultBlock: BlockNumber,
        callback?: (error: Error, result: CreateAccessList) => void
    ): Promise<CreateAccessList>;

    getPastLogs(
        options: PastLogsOptions,
        callback?: (error: Error, logs: Log[]) => void
    ): Promise<Log[]>;
};
export interface IWeb3{
	eth: Eth;
	utils: Utils;
	currentProvider(): any;
	setProvider(provider: any): any;
};
export class Web3 implements IWeb3{
	eth: Eth;
	utils: Utils = utils;
	constructor(provider?: any){
		this.eth = new eth(provider);
	}
	get currentProvider(): any{
		return this.eth.currentProvider;
	}
	setProvider(provider: any): boolean{
		return this.eth.setProvider(provider)
	}
};
module.exports = Web3;