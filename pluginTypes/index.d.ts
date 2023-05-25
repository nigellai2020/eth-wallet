declare module "web3" {
    import { BigNumber } from 'bignumber.js';
    export type Hex = string | number;
    export type Unit = 'noether' | 'wei' | 'kwei' | 'Kwei' | 'babbage' | 'femtoether' | 'mwei' | 'Mwei' | 'lovelace' | 'picoether' | 'gwei' | 'Gwei' | 'shannon' | 'nanoether' | 'nano' | 'szabo' | 'microether' | 'micro' | 'finney' | 'milliether' | 'milli' | 'ether' | 'kether' | 'grand' | 'mether' | 'gether' | 'tether';
    export type Mixed = string | number | BigNumber | {
        type: string;
        value: string;
    } | {
        t: string;
        v: string | BigNumber | number;
    } | boolean;
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
    }
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
        getSignatureParameters(signature: string): {
            r: string;
            s: string;
            v: number;
        };
        stripHexPrefix(str: string): string;
        toNumber(value: number | string | BigNumber, bigIntOnOverflow?: boolean): number | string;
    }
    export interface HttpHeader {
        name: string;
        value: string;
    }
    export interface HttpProviderOptions {
        keepAlive?: boolean;
        timeout?: number;
        headers?: HttpHeader[];
        withCredentials?: boolean;
        agent?: any;
    }
    export interface HttpProvider {
        constructor(host: string, options?: HttpProviderOptions): any;
        host: string;
        connected: boolean;
        supportsSubscriptions(): boolean;
        send(payload: any, callback: (error: Error | null, result?: any) => void): void;
        disconnect(): boolean;
    }
    export interface ReconnectOptions {
        auto?: boolean;
        delay?: number;
        maxAttempts?: number;
        onTimeout?: boolean;
    }
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
    }
    export interface JsonRpcPayload {
        jsonrpc: string;
        method: string;
        params?: any[];
        id?: string | number;
    }
    export interface RequestItem {
        payload: JsonRpcPayload;
        callback: (error: any, result: any) => void;
    }
    export interface JsonRpcResponse {
        jsonrpc: string;
        id: string | number;
        result?: any;
        error?: {
            readonly code?: number;
            readonly data?: unknown;
            readonly message: string;
        };
    }
    export interface WebsocketProvider {
        constructor(host: string, options?: WebsocketProviderOptions): any;
        isConnecting(): boolean;
        requestQueue: Map<string, RequestItem>;
        responseQueue: Map<string, RequestItem>;
        connected: boolean;
        connection: any;
        supportsSubscriptions(): boolean;
        send(payload: JsonRpcPayload, callback: (error: Error | null, result?: JsonRpcResponse) => void): void;
        on(type: string, callback: () => void): void;
        once(type: string, callback: () => void): void;
        removeListener(type: string, callback: () => void): void;
        removeAllListeners(type: string): void;
        reset(): void;
        disconnect(code?: number, reason?: string): void;
        connect(): void;
        reconnect(): void;
    }
    export interface RequestArguments {
        method: string;
        params?: any;
        [key: string]: any;
    }
    export interface AbstractProvider {
        sendAsync(payload: JsonRpcPayload, callback?: (error: Error | null, result?: JsonRpcResponse) => Promise<unknown> | void): void;
        send?(payload: JsonRpcPayload, callback: (error: Error | null, result?: JsonRpcResponse) => unknown): void;
        request?(args: RequestArguments): Promise<any>;
        connected?: boolean;
    }
    export type provider = HttpProvider | WebsocketProvider | AbstractProvider | string | null;
    export interface AbiInput {
        name: string;
        type: string;
        indexed?: boolean;
        components?: AbiInput[];
        internalType?: string;
    }
    export interface AbiOutput {
        name: string;
        type: string;
        components?: AbiOutput[];
        internalType?: string;
    }
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
    }
    export interface ContractOptions {
        from?: string;
        gasPrice?: string;
        gas?: number;
        data?: string;
    }
    export type chain = 'mainnet' | 'goerli' | 'kovan' | 'rinkeby' | 'ropsten';
    export type hardfork = 'chainstart' | 'homestead' | 'dao' | 'tangerineWhistle' | 'spuriousDragon' | 'byzantium' | 'constantinople' | 'petersburg' | 'istanbul';
    export interface CustomChainParams {
        name?: string;
        networkId: number;
        chainId: number;
    }
    export interface Common {
        customChain: CustomChainParams;
        baseChain?: chain;
        hardfork?: hardfork;
    }
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
    }
    export interface SignedTransaction {
        messageHash?: string;
        r: string;
        s: string;
        v: string;
        rawTransaction?: string;
        transactionHash?: string;
    }
    export interface Sign extends SignedTransaction {
        message: string;
        signature: string;
    }
    export interface EncryptedKeystoreV3Json {
        version: number;
        id: string;
        address: string;
        crypto: {
            ciphertext: string;
            cipherparams: {
                iv: string;
            };
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
    }
    export interface Account {
        address: string;
        privateKey: string;
        signTransaction: (transactionConfig: TransactionConfig, callback?: (signTransaction: SignedTransaction) => void) => Promise<SignedTransaction>;
        sign: (data: string) => Sign;
        encrypt: (password: string) => EncryptedKeystoreV3Json;
    }
    export interface SignatureObject {
        messageHash: string;
        r: string;
        s: string;
        v: string;
    }
    export interface AddedAccount extends Account {
        index: number;
    }
    export interface AddAccount {
        address: string;
        privateKey: string;
    }
    export interface WalletBase {
        constructor(accounts: Accounts): any;
        length: number;
        defaultKeyName: string;
        [key: number]: Account;
        create(numberOfAccounts: number, entropy?: string): WalletBase;
        add(account: string | AddAccount): AddedAccount;
        remove(account: string | number): boolean;
        clear(): WalletBase;
        encrypt(password: string): EncryptedKeystoreV3Json[];
        decrypt(keystoreArray: EncryptedKeystoreV3Json[], password: string): WalletBase;
        save(password: string, keyName?: string): boolean;
        load(password: string, keyName?: string): WalletBase;
    }
    export interface Accounts {
        constructor(provider?: provider): any;
        readonly givenProvider: any;
        readonly currentProvider: provider;
        setProvider(provider: provider): boolean;
        create(entropy?: string): Account;
        privateKeyToAccount(privateKey: string, ignoreLength?: boolean): Account;
        signTransaction(transactionConfig: TransactionConfig, privateKey: string, callback?: (error: Error, signedTransaction: SignedTransaction) => void): Promise<SignedTransaction>;
        recoverTransaction(signature: string): string;
        hashMessage(message: string): string;
        sign(data: string, privateKey: string): Sign;
        recover(signatureObject: SignatureObject): string;
        recover(message: string, signature: string, preFixed?: boolean): string;
        recover(message: string, v: string, r: string, s: string, preFixed?: boolean): string;
        encrypt(privateKey: string, password: string): EncryptedKeystoreV3Json;
        decrypt(keystoreJsonV3: EncryptedKeystoreV3Json, password: string): Account;
        wallet: WalletBase;
    }
    export type BlockNumber = string | number | BigNumber | 'latest' | 'pending' | 'earliest' | 'genesis' | 'finalized' | 'safe';
    export interface Options extends ContractOptions {
        address: string;
        jsonInterface: AbiItem[];
    }
    export interface DeployOptions {
        data: string;
        arguments?: any[];
    }
    export interface SendOptions {
        from: string;
        gasPrice?: string;
        gas?: number;
        value?: number | string | BigNumber;
        nonce?: number;
    }
    export interface EventLog {
        event: string;
        address: string;
        returnValues: any;
        logIndex: number;
        transactionIndex: number;
        transactionHash: string;
        blockHash: string;
        blockNumber: number;
        raw?: {
            data: string;
            topics: any[];
        };
    }
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
    }
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
    }
    export interface PromiEvent<T> extends Promise<T> {
        once(type: 'sending', handler: (payload: object) => void): PromiEvent<T>;
        once(type: 'sent', handler: (payload: object) => void): PromiEvent<T>;
        once(type: 'transactionHash', handler: (transactionHash: string) => void): PromiEvent<T>;
        once(type: 'receipt', handler: (receipt: TransactionReceipt) => void): PromiEvent<T>;
        once(type: 'confirmation', handler: (confirmationNumber: number, receipt: TransactionReceipt, latestBlockHash?: string) => void): PromiEvent<T>;
        once(type: 'error', handler: (error: Error) => void): PromiEvent<T>;
        once(type: 'error' | 'confirmation' | 'receipt' | 'transactionHash' | 'sent' | 'sending', handler: (error: Error | TransactionReceipt | string | object) => void): PromiEvent<T>;
        on(type: 'sending', handler: (payload: object) => void): PromiEvent<T>;
        on(type: 'sent', handler: (payload: object) => void): PromiEvent<T>;
        on(type: 'transactionHash', handler: (receipt: string) => void): PromiEvent<T>;
        on(type: 'receipt', handler: (receipt: TransactionReceipt) => void): PromiEvent<T>;
        on(type: 'confirmation', handler: (confNumber: number, receipt: TransactionReceipt, latestBlockHash?: string) => void): PromiEvent<T>;
        on(type: 'error', handler: (error: Error) => void): PromiEvent<T>;
        on(type: 'error' | 'confirmation' | 'receipt' | 'transactionHash' | 'sent' | 'sending', handler: (error: Error | TransactionReceipt | string | object) => void): PromiEvent<T>;
    }
    export interface CallOptions {
        from?: string;
        gasPrice?: string;
        gas?: number;
    }
    export interface EstimateGasOptions {
        from?: string;
        gas?: number;
        value?: number | string | BigNumber;
    }
    export interface ContractSendMethod {
        send(options: SendOptions, callback?: (err: Error, transactionHash: string) => void): PromiEvent<Contract>;
        call(options?: CallOptions, callback?: (err: Error, result: any) => void): Promise<any>;
        estimateGas(options: EstimateGasOptions, callback?: (err: Error, gas: number) => void): Promise<number>;
        estimateGas(callback: (err: Error, gas: number) => void): Promise<number>;
        estimateGas(options: EstimateGasOptions, callback: (err: Error, gas: number) => void): Promise<number>;
        estimateGas(options: EstimateGasOptions): Promise<number>;
        estimateGas(): Promise<number>;
        encodeABI(): string;
    }
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
    }
    export interface Filter {
        [key: string]: number | string | string[] | number[];
    }
    export interface LogsOptions {
        fromBlock?: BlockNumber;
        address?: string | string[];
        topics?: Array<string | string[] | null>;
    }
    export interface EventOptions extends LogsOptions {
        filter?: Filter;
    }
    export interface PastLogsOptions extends LogsOptions {
        toBlock?: BlockNumber;
    }
    export interface PastEventOptions extends PastLogsOptions {
        filter?: Filter;
    }
    export interface Contract {
        constructor(jsonInterface: AbiItem[], address?: string, options?: ContractOptions): any;
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
        once(event: string, callback: (error: Error, event: EventData) => void): void;
        once(event: string, options: EventOptions, callback: (error: Error, event: EventData) => void): void;
        events: any;
        getPastEvents(event: string): Promise<EventData[]>;
        getPastEvents(event: string, options: PastEventOptions, callback: (error: Error, events: EventData[]) => void): Promise<EventData[]>;
        getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
        getPastEvents(event: string, callback: (error: Error, events: EventData[]) => void): Promise<EventData[]>;
    }
    export interface IndirectOptions {
        institution: string;
        identifier: string;
    }
    export interface Iban {
        constructor(iban: string): any;
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
    }
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
    }
    export interface BatchRequest {
        constructor(): any;
        add(method: Method): void;
        execute(): void;
    }
    export interface Extension {
        property?: string;
        methods: Method[];
    }
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
    }
    export interface Personal {
        constructor(provider?: provider): any;
        readonly givenProvider: any;
        readonly currentProvider: provider;
        defaultAccount: string | null;
        defaultBlock: string | number;
        BatchRequest: new () => BatchRequest;
        setProvider(provider: provider): boolean;
        extend(extension: Extension): any;
        newAccount(password: string, callback?: (error: Error, address: string) => void): Promise<string>;
        sign(dataToSign: string, address: string, password: string, callback?: (error: Error, signature: string) => void): Promise<string>;
        ecRecover(dataThatWasSigned: string, signature: string, callback?: (error: Error, address: string) => void): Promise<string>;
        signTransaction(transactionConfig: TransactionConfig, password: string, callback?: (error: Error, RLPEncodedTransaction: RLPEncodedTransaction) => void): Promise<RLPEncodedTransaction>;
        sendTransaction(transactionConfig: TransactionConfig, password: string, callback?: (error: Error, transactionHash: string) => void): Promise<string>;
        unlockAccount(address: string, password: string, unlockDuration: number, callback?: (error: Error) => void): Promise<boolean>;
        lockAccount(address: string, callback?: (error: Error, success: boolean) => void): Promise<boolean>;
        getAccounts(callback?: (error: Error, accounts: string[]) => void): Promise<string[]>;
        importRawKey(privateKey: string, password: string, callback?: (error: Error, result: string) => void): Promise<string>;
    }
    export interface AbiCoder {
        encodeFunctionSignature(functionName: string | AbiItem): string;
        encodeEventSignature(functionName: string | AbiItem): string;
        encodeParameter(type: any, parameter: any): string;
        encodeParameters(types: any[], paramaters: any[]): string;
        encodeFunctionCall(abiItem: AbiItem, params: string[]): string;
        decodeParameter(type: any, hex: string): {
            [key: string]: any;
        };
        decodeParameters(types: any[], hex: string): {
            [key: string]: any;
        };
        decodeLog(inputs: AbiInput[], hex: string, topics: string[]): {
            [key: string]: string;
        };
    }
    export interface Providers {
        HttpProvider: new (host: string, options?: HttpProviderOptions) => HttpProvider;
        WebsocketProvider: new (host: string, options?: WebsocketProviderOptions) => WebsocketProvider;
        IpcProvider: new (path: string, net: any) => any;
    }
    export interface Network {
        constructor(provider?: provider): any;
        readonly givenProvider: any;
        readonly currentProvider: provider;
        readonly providers: Providers;
        BatchRequest: new () => BatchRequest;
        setProvider(provider: provider): boolean;
        extend(extension: Extension): any;
        getNetworkType(callback?: (error: Error, returnValue: string) => void): Promise<string>;
        getId(callback?: (error: Error, id: number) => void): Promise<number>;
        isListening(callback?: (error: Error, listening: boolean) => void): Promise<boolean>;
        getPeerCount(callback?: (error: Error, peerCount: number) => void): Promise<number>;
    }
    export interface SubscriptionOptions {
        subscription: string;
        type: string;
        requestManager: any;
    }
    export interface Subscription<T> {
        constructor(options: SubscriptionOptions): any;
        id: string;
        options: SubscriptionOptions;
        callback: () => void;
        arguments: any;
        lastBlock: number;
        subscribe(callback?: (error: Error, result: T) => void): Subscription<T>;
        unsubscribe(callback?: (error: Error, result: boolean) => void): Promise<undefined | boolean>;
        on(type: 'data', handler: (data: T) => void): Subscription<T>;
        on(type: 'changed', handler: (data: T) => void): Subscription<T>;
        on(type: 'connected', handler: (subscriptionId: string) => void): Subscription<T>;
        on(type: 'error', handler: (data: Error) => void): Subscription<T>;
    }
    export interface Syncing {
        StartingBlock: number;
        CurrentBlock: number;
        HighestBlock: number;
        KnownStates: number;
        PulledStates: number;
    }
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
    }
    export interface FeeHistoryResult {
        baseFeePerGas: string[];
        gasUsedRatio: number[];
        oldestBlock: number;
        reward: string[][];
    }
    export interface BlockTransactionBase extends BlockHeader {
        size: number;
        difficulty: number;
        totalDifficulty: number;
        uncles: string[];
    }
    export interface BlockTransactionString extends BlockTransactionBase {
        transactions: string[];
    }
    export interface AccessTuple {
        address: string;
        storageKeys: string[];
    }
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
    }
    export interface BlockTransactionObject extends BlockTransactionBase {
        transactions: Transaction[];
    }
    export interface CreateAccessList {
        accessList: AccessTuple[];
        error?: string;
        gasUsed: string;
    }
    export interface Eth {
        constructor(provider?: provider): any;
        Contract: new (jsonInterface: AbiItem[] | AbiItem, address?: string, options?: ContractOptions) => Contract;
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
        subscribe(type: 'logs', options: LogsOptions, callback?: (error: Error, log: Log) => void): Subscription<Log>;
        subscribe(type: 'syncing', callback?: (error: Error, result: Syncing) => void): Subscription<Syncing>;
        subscribe(type: 'newBlockHeaders', callback?: (error: Error, blockHeader: BlockHeader) => void): Subscription<BlockHeader>;
        subscribe(type: 'pendingTransactions', callback?: (error: Error, transactionHash: string) => void): Subscription<string>;
        getProtocolVersion(callback?: (error: Error, protocolVersion: string) => void): Promise<string>;
        isSyncing(callback?: (error: Error, syncing: Syncing) => void): Promise<Syncing | boolean>;
        getCoinbase(callback?: (error: Error, coinbaseAddress: string) => void): Promise<string>;
        isMining(callback?: (error: Error, mining: boolean) => void): Promise<boolean>;
        getHashrate(callback?: (error: Error, hashes: number) => void): Promise<number>;
        getNodeInfo(callback?: (error: Error, version: string) => void): Promise<string>;
        getChainId(callback?: (error: Error, version: number) => void): Promise<number>;
        getGasPrice(callback?: (error: Error, gasPrice: string) => void): Promise<string>;
        getFeeHistory(blockCount: number | BigNumber | BigNumber | string, lastBlock: number | BigNumber | BigNumber | string, rewardPercentiles: number[], callback?: (error: Error, feeHistory: FeeHistoryResult) => void): Promise<FeeHistoryResult>;
        getAccounts(callback?: (error: Error, accounts: string[]) => void): Promise<string[]>;
        getBlockNumber(callback?: (error: Error, blockNumber: number) => void): Promise<number>;
        getBalance(address: string): Promise<string>;
        getBalance(address: string, defaultBlock: BlockNumber): Promise<string>;
        getBalance(address: string, callback?: (error: Error, balance: string) => void): Promise<string>;
        getBalance(address: string, defaultBlock: BlockNumber, callback?: (error: Error, balance: string) => void): Promise<string>;
        getStorageAt(address: string, position: number | BigNumber | string): Promise<string>;
        getStorageAt(address: string, position: number | BigNumber | string, defaultBlock: BlockNumber): Promise<string>;
        getStorageAt(address: string, position: number | BigNumber | string, callback?: (error: Error, storageAt: string) => void): Promise<string>;
        getStorageAt(address: string, position: number | BigNumber | string, defaultBlock: BlockNumber, callback?: (error: Error, storageAt: string) => void): Promise<string>;
        getCode(address: string): Promise<string>;
        getCode(address: string, defaultBlock: BlockNumber): Promise<string>;
        getCode(address: string, callback?: (error: Error, code: string) => void): Promise<string>;
        getCode(address: string, defaultBlock: BlockNumber, callback?: (error: Error, code: string) => void): Promise<string>;
        getBlock(blockHashOrBlockNumber: BlockNumber | string): Promise<BlockTransactionString>;
        getBlock(blockHashOrBlockNumber: BlockNumber | string, returnTransactionObjects: false): Promise<BlockTransactionString>;
        getBlock(blockHashOrBlockNumber: BlockNumber | string, returnTransactionObjects: true): Promise<BlockTransactionObject>;
        getBlock(blockHashOrBlockNumber: BlockNumber | string, callback?: (error: Error, block: BlockTransactionString) => void): Promise<BlockTransactionString>;
        getBlock(blockHashOrBlockNumber: BlockNumber | string, returnTransactionObjects: false, callback?: (error: Error, block: BlockTransactionString) => void): Promise<BlockTransactionString>;
        getBlock(blockHashOrBlockNumber: BlockNumber | string, returnTransactionObjects: true, callback?: (error: Error, block: BlockTransactionObject) => void): Promise<BlockTransactionObject>;
        getBlockTransactionCount(blockHashOrBlockNumber: BlockNumber | string, callback?: (error: Error, numberOfTransactions: number) => void): Promise<number>;
        getBlockUncleCount(blockHashOrBlockNumber: BlockNumber | string, callback?: (error: Error, numberOfTransactions: number) => void): Promise<number>;
        getUncle(blockHashOrBlockNumber: BlockNumber | string, uncleIndex: number | string | BigNumber): Promise<BlockTransactionString>;
        getUncle(blockHashOrBlockNumber: BlockNumber | string, uncleIndex: number | string | BigNumber, returnTransactionObjects: boolean): Promise<BlockTransactionObject>;
        getUncle(blockHashOrBlockNumber: BlockNumber | string, uncleIndex: number | string | BigNumber, callback?: (error: Error, uncle: any) => void): Promise<BlockTransactionString>;
        getUncle(blockHashOrBlockNumber: BlockNumber | string, uncleIndex: number | string | BigNumber, returnTransactionObjects: boolean, callback?: (error: Error, uncle: any) => void): Promise<BlockTransactionObject>;
        getTransaction(transactionHash: string, callback?: (error: Error, transaction: Transaction) => void): Promise<Transaction>;
        getPendingTransactions(callback?: (error: Error, result: Transaction[]) => void): Promise<Transaction[]>;
        getTransactionFromBlock(blockHashOrBlockNumber: BlockNumber | string, indexNumber: number | string | BigNumber, callback?: (error: Error, transaction: Transaction) => void): Promise<Transaction>;
        getTransactionReceipt(hash: string, callback?: (error: Error, transactionReceipt: TransactionReceipt) => void): Promise<TransactionReceipt>;
        getTransactionCount(address: string): Promise<number>;
        getTransactionCount(address: string, defaultBlock: BlockNumber): Promise<number>;
        getTransactionCount(address: string, callback?: (error: Error, count: number) => void): Promise<number>;
        getTransactionCount(address: string, defaultBlock: BlockNumber, callback?: (error: Error, count: number) => void): Promise<number>;
        sendTransaction(transactionConfig: TransactionConfig, callback?: (error: Error, hash: string) => void): PromiEvent<TransactionReceipt>;
        sendSignedTransaction(signedTransactionData: string, callback?: (error: Error, hash: string) => void): PromiEvent<TransactionReceipt>;
        sign(dataToSign: string, address: string | number, callback?: (error: Error, signature: string) => void): Promise<string>;
        signTransaction(transactionConfig: TransactionConfig, callback?: (error: Error, signedTransaction: RLPEncodedTransaction) => void): Promise<RLPEncodedTransaction>;
        signTransaction(transactionConfig: TransactionConfig, address: string): Promise<RLPEncodedTransaction>;
        signTransaction(transactionConfig: TransactionConfig, address: string, callback: (error: Error, signedTransaction: RLPEncodedTransaction) => void): Promise<RLPEncodedTransaction>;
        call(transactionConfig: TransactionConfig): Promise<string>;
        call(transactionConfig: TransactionConfig, defaultBlock?: BlockNumber): Promise<string>;
        call(transactionConfig: TransactionConfig, callback?: (error: Error, data: string) => void): Promise<string>;
        call(transactionConfig: TransactionConfig, defaultBlock: BlockNumber, callback: (error: Error, data: string) => void): Promise<string>;
        estimateGas(transactionConfig: TransactionConfig, callback?: (error: Error, gas: number) => void): Promise<number>;
        createAccessList(transactionConfig: TransactionConfig, callback?: (error: Error, result: CreateAccessList) => void): Promise<CreateAccessList>;
        createAccessList(transactionConfig: TransactionConfig, defaultBlock: BlockNumber, callback?: (error: Error, result: CreateAccessList) => void): Promise<CreateAccessList>;
        getPastLogs(options: PastLogsOptions, callback?: (error: Error, logs: Log[]) => void): Promise<Log[]>;
    }
    export interface IWeb3 {
        eth: Eth;
        utils: Utils;
        currentProvider(): any;
        setProvider(provider: any): any;
    }
    export class Web3 implements IWeb3 {
        readonly eth: Eth;
        readonly utils: Utils;
        static utils: Utils;
        constructor(provider?: any);
        get currentProvider(): any;
        setProvider(provider: any): boolean;
    }
}
declare module "contracts/ERC1155/ERC1155.json" {
    const _default: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default;
}
declare module "contracts/ERC1155/ERC1155" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IBalanceOfParams {
        account: string;
        id: number | BigNumber;
    }
    export interface IBalanceOfBatchParams {
        accounts: string[];
        ids: (number | BigNumber)[];
    }
    export interface IIsApprovedForAllParams {
        account: string;
        operator: string;
    }
    export interface ISafeBatchTransferFromParams {
        from: string;
        to: string;
        ids: (number | BigNumber)[];
        amounts: (number | BigNumber)[];
        data: string;
    }
    export interface ISafeTransferFromParams {
        from: string;
        to: string;
        id: number | BigNumber;
        amount: number | BigNumber;
        data: string;
    }
    export interface ISetApprovalForAllParams {
        operator: string;
        approved: boolean;
    }
    export class ERC1155 extends _Contract {
        constructor(wallet: IWallet, address?: string);
        deploy(uri: string, options?: TransactionOptions): Promise<string>;
        parseApprovalForAllEvent(receipt: TransactionReceipt): ERC1155.ApprovalForAllEvent[];
        decodeApprovalForAllEvent(event: Event): ERC1155.ApprovalForAllEvent;
        parseTransferBatchEvent(receipt: TransactionReceipt): ERC1155.TransferBatchEvent[];
        decodeTransferBatchEvent(event: Event): ERC1155.TransferBatchEvent;
        parseTransferSingleEvent(receipt: TransactionReceipt): ERC1155.TransferSingleEvent[];
        decodeTransferSingleEvent(event: Event): ERC1155.TransferSingleEvent;
        parseURIEvent(receipt: TransactionReceipt): ERC1155.URIEvent[];
        decodeURIEvent(event: Event): ERC1155.URIEvent;
        balanceOf: {
            (params: IBalanceOfParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        balanceOfBatch: {
            (params: IBalanceOfBatchParams, options?: TransactionOptions): Promise<BigNumber[]>;
        };
        isApprovedForAll: {
            (params: IIsApprovedForAllParams, options?: TransactionOptions): Promise<boolean>;
        };
        safeBatchTransferFrom: {
            (params: ISafeBatchTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISafeBatchTransferFromParams, options?: TransactionOptions) => Promise<void>;
        };
        safeTransferFrom: {
            (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISafeTransferFromParams, options?: TransactionOptions) => Promise<void>;
        };
        setApprovalForAll: {
            (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetApprovalForAllParams, options?: TransactionOptions) => Promise<void>;
        };
        supportsInterface: {
            (interfaceId: string, options?: TransactionOptions): Promise<boolean>;
        };
        uri: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
    export module ERC1155 {
        interface ApprovalForAllEvent {
            account: string;
            operator: string;
            approved: boolean;
            _event: Event;
        }
        interface TransferBatchEvent {
            operator: string;
            from: string;
            to: string;
            ids: BigNumber[];
            values: BigNumber[];
            _event: Event;
        }
        interface TransferSingleEvent {
            operator: string;
            from: string;
            to: string;
            id: BigNumber;
            value: BigNumber;
            _event: Event;
        }
        interface URIEvent {
            value: string;
            id: BigNumber;
            _event: Event;
        }
    }
}
declare module "contracts/ERC20/ERC20.json" {
    const _default_1: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_1;
}
declare module "contracts/ERC20/ERC20" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        name: string;
        symbol: string;
    }
    export interface IAllowanceParams {
        owner: string;
        spender: string;
    }
    export interface IApproveParams {
        spender: string;
        amount: number | BigNumber;
    }
    export interface IDecreaseAllowanceParams {
        spender: string;
        subtractedValue: number | BigNumber;
    }
    export interface IIncreaseAllowanceParams {
        spender: string;
        addedValue: number | BigNumber;
    }
    export interface ITransferParams {
        to: string;
        amount: number | BigNumber;
    }
    export interface ITransferFromParams {
        from: string;
        to: string;
        amount: number | BigNumber;
    }
    export class ERC20 extends _Contract {
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        parseApprovalEvent(receipt: TransactionReceipt): ERC20.ApprovalEvent[];
        decodeApprovalEvent(event: Event): ERC20.ApprovalEvent;
        parseTransferEvent(receipt: TransactionReceipt): ERC20.TransferEvent[];
        decodeTransferEvent(event: Event): ERC20.TransferEvent;
        allowance: {
            (params: IAllowanceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        approve: {
            (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IApproveParams, options?: TransactionOptions) => Promise<boolean>;
        };
        balanceOf: {
            (account: string, options?: TransactionOptions): Promise<BigNumber>;
            txData: (account: string, options?: TransactionOptions) => Promise<string>;
        };
        decimals: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        decreaseAllowance: {
            (params: IDecreaseAllowanceParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IDecreaseAllowanceParams, options?: TransactionOptions) => Promise<boolean>;
        };
        increaseAllowance: {
            (params: IIncreaseAllowanceParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IIncreaseAllowanceParams, options?: TransactionOptions) => Promise<boolean>;
        };
        name: {
            (options?: TransactionOptions): Promise<string>;
        };
        symbol: {
            (options?: TransactionOptions): Promise<string>;
        };
        totalSupply: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        transfer: {
            (params: ITransferParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferParams, options?: TransactionOptions) => Promise<boolean>;
        };
        transferFrom: {
            (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferFromParams, options?: TransactionOptions) => Promise<boolean>;
        };
        private assign;
    }
    export module ERC20 {
        interface ApprovalEvent {
            owner: string;
            spender: string;
            value: BigNumber;
            _event: Event;
        }
        interface TransferEvent {
            from: string;
            to: string;
            value: BigNumber;
            _event: Event;
        }
    }
}
declare module "contracts/ERC721/ERC721.json" {
    const _default_2: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_2;
}
declare module "contracts/ERC721/ERC721" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        name: string;
        symbol: string;
    }
    export interface IApproveParams {
        to: string;
        tokenId: number | BigNumber;
    }
    export interface IIsApprovedForAllParams {
        owner: string;
        operator: string;
    }
    export interface ISafeTransferFromParams {
        from: string;
        to: string;
        tokenId: number | BigNumber;
    }
    export interface ISafeTransferFrom_1Params {
        from: string;
        to: string;
        tokenId: number | BigNumber;
        data: string;
    }
    export interface ISetApprovalForAllParams {
        operator: string;
        approved: boolean;
    }
    export interface ITransferFromParams {
        from: string;
        to: string;
        tokenId: number | BigNumber;
    }
    export class ERC721 extends _Contract {
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        parseApprovalEvent(receipt: TransactionReceipt): ERC721.ApprovalEvent[];
        decodeApprovalEvent(event: Event): ERC721.ApprovalEvent;
        parseApprovalForAllEvent(receipt: TransactionReceipt): ERC721.ApprovalForAllEvent[];
        decodeApprovalForAllEvent(event: Event): ERC721.ApprovalForAllEvent;
        parseTransferEvent(receipt: TransactionReceipt): ERC721.TransferEvent[];
        decodeTransferEvent(event: Event): ERC721.TransferEvent;
        approve: {
            (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IApproveParams, options?: TransactionOptions) => Promise<void>;
        };
        balanceOf: {
            (owner: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        getApproved: {
            (tokenId: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        isApprovedForAll: {
            (params: IIsApprovedForAllParams, options?: TransactionOptions): Promise<boolean>;
        };
        name: {
            (options?: TransactionOptions): Promise<string>;
        };
        ownerOf: {
            (tokenId: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        safeTransferFrom: {
            (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISafeTransferFromParams, options?: TransactionOptions) => Promise<void>;
        };
        safeTransferFrom_1: {
            (params: ISafeTransferFrom_1Params, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISafeTransferFrom_1Params, options?: TransactionOptions) => Promise<void>;
        };
        setApprovalForAll: {
            (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetApprovalForAllParams, options?: TransactionOptions) => Promise<void>;
        };
        supportsInterface: {
            (interfaceId: string, options?: TransactionOptions): Promise<boolean>;
        };
        symbol: {
            (options?: TransactionOptions): Promise<string>;
        };
        tokenURI: {
            (tokenId: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        transferFrom: {
            (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferFromParams, options?: TransactionOptions) => Promise<void>;
        };
        private assign;
    }
    export module ERC721 {
        interface ApprovalEvent {
            owner: string;
            approved: string;
            tokenId: BigNumber;
            _event: Event;
        }
        interface ApprovalForAllEvent {
            owner: string;
            operator: string;
            approved: boolean;
            _event: Event;
        }
        interface TransferEvent {
            from: string;
            to: string;
            tokenId: BigNumber;
            _event: Event;
        }
    }
}
declare module "contracts/MultiCall/MultiCall.json" {
    const _default_3: {
        abi: {
            inputs: ({
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            } | {
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            })[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        }[];
        bytecode: string;
    };
    export default _default_3;
}
declare module "contracts/MultiCall/MultiCall" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export interface IMulticallWithGasLimitationParams {
        calls: {
            to: string;
            data: string;
        }[];
        gasBuffer: number | BigNumber;
    }
    export class MultiCall extends _Contract {
        constructor(wallet: IWallet, address?: string);
        deploy(options?: number | BigNumber | TransactionOptions): Promise<string>;
        gasLeft: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        gaslimit: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        multicall: {
            (calls: {
                to: string;
                data: string;
            }[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (calls: {
                to: string;
                data: string;
            }[], options?: TransactionOptions) => Promise<string[]>;
        };
        multicallWithGas: {
            (calls: {
                to: string;
                data: string;
            }[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (calls: {
                to: string;
                data: string;
            }[], options?: TransactionOptions) => Promise<{
                results: string[];
                gasUsed: BigNumber[];
            }>;
        };
        multicallWithGasLimitation: {
            (params: IMulticallWithGasLimitationParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IMulticallWithGasLimitationParams, options?: TransactionOptions) => Promise<{
                results: string[];
                lastSuccessIndex: BigNumber;
            }>;
        };
        private assign;
    }
}
declare module "contracts/index" {
    export { ERC1155 } from "contracts/ERC1155/ERC1155";
    export { ERC20 } from "contracts/ERC20/ERC20";
    export { ERC721 } from "contracts/ERC721/ERC721";
    export { MultiCall } from "contracts/MultiCall/MultiCall";
}
declare module "contract" {
    /*!-----------------------------------------------------------
    * Copyright (c) IJS Technologies. All rights reserved.
    * Released under dual AGPLv3/commercial license
    * https://ijs.network
    *-----------------------------------------------------------*/
    import { IWallet, TransactionReceipt, Event, IBatchRequestObj } from "wallet";
    module Contract {
        interface EventType {
            name: string;
        }
        class Contract {
            wallet: IWallet;
            _abi: any;
            _bytecode: any;
            _address: string;
            private _events;
            privateKey: string;
            private abiHash;
            constructor(wallet: IWallet, address?: string, abi?: any, bytecode?: any);
            at(address: string): Contract;
            set address(value: string);
            get address(): string;
            protected decodeEvents(receipt: TransactionReceipt): any[];
            protected parseEvents(receipt: TransactionReceipt, eventName: string): Event[];
            get events(): EventType[];
            getAbiEvents(): any;
            getAbiTopics(eventNames?: string[]): any[];
            scanEvents(fromBlock: number, toBlock: number | string, eventNames?: string[]): Promise<Event[]>;
            batchCall(batchObj: IBatchRequestObj, key: string, methodName: string, params?: any[], options?: any): Promise<void>;
            protected call(methodName: string, params?: any[], options?: any): Promise<any>;
            private _send;
            protected __deploy(params?: any[], options?: any): Promise<string>;
            protected send(methodName: string, params?: any[], options?: any): Promise<TransactionReceipt>;
            protected _deploy(...params: any[]): Promise<string>;
            protected methods(methodName: string, ...params: any[]): Promise<any>;
        }
    }
    export = Contract;
}
declare module "types" {
    /*!-----------------------------------------------------------
   * Copyright (c) IJS Technologies. All rights reserved.
   * Released under dual AGPLv3/commercial license
   * https://ijs.network
   *-----------------------------------------------------------*/
    export interface MessageTypeProperty {
        name: string;
        type: string;
    }
    export type EIP712TypeMap = {
        [type: string]: MessageTypeProperty[];
    };
    export interface IEIP712Domain {
        name: string;
        version: string;
        chainId: number;
        verifyingContract: string;
    }
    export enum SignTypedDataVersion {
        V1 = "V1",
        V3 = "V3",
        V4 = "V4"
    }
    export interface MessageTypes {
        EIP712Domain: MessageTypeProperty[];
        [additionalProperties: string]: MessageTypeProperty[];
    }
    export interface TypedMessage<T extends MessageTypes> {
        types: T;
        primaryType: keyof T;
        domain: {
            name?: string;
            version?: string;
            chainId?: number;
            verifyingContract?: string;
            salt?: ArrayBuffer;
        };
        message: Record<string, unknown>;
    }
    export interface IAbiDefinition {
        _abi: any;
    }
}
declare module "constants" {
    export const EIP712DomainAbi: {
        name: string;
        type: string;
    }[];
    export const TYPED_MESSAGE_SCHEMA: {
        type: string;
        properties: {
            types: {
                type: string;
                additionalProperties: {
                    type: string;
                    items: {
                        type: string;
                        properties: {
                            name: {
                                type: string;
                            };
                            type: {
                                type: string;
                            };
                        };
                        required: string[];
                    };
                };
            };
            primaryType: {
                type: string;
            };
            domain: {
                type: string;
            };
            message: {
                type: string;
            };
        };
        required: string[];
    };
}
declare module "utils" {
    /*!-----------------------------------------------------------
    * Copyright (c) IJS Technologies. All rights reserved.
    * Released under dual AGPLv3/commercial license
    * https://ijs.network
    *-----------------------------------------------------------*/
    import { BigNumber } from "bignumber.js";
    import { EIP712TypeMap, IEIP712Domain, MessageTypes, TypedMessage } from "types";
    export function sleep(millisecond: number): Promise<unknown>;
    export function numberToBytes32(value: number | BigNumber, prefix?: boolean): string;
    export function padLeft(string: string, chars: number, sign?: string): string;
    export function padRight(string: string, chars: number, sign?: string): string;
    type stringArray = string | _stringArray;
    interface _stringArray extends Array<stringArray> {
    }
    export function stringToBytes32(value: string | stringArray): string | string[];
    export function stringToBytes(value: string | stringArray, nByte?: number): string | string[];
    export function addressToBytes32(value: string, prefix?: boolean): string;
    export function bytes32ToAddress(value: string): string;
    export function bytes32ToString(value: string): string;
    export function addressToBytes32Right(value: string, prefix?: boolean): string;
    export function toNumber(value: string | number | BigNumber): number;
    export function toDecimals(value: BigNumber | number | string, decimals?: number): BigNumber;
    export function fromDecimals(value: BigNumber | number | string, decimals?: number): BigNumber;
    export function toString(value: any): any;
    export const nullAddress = "0x0000000000000000000000000000000000000000";
    export function constructTypedMessageData(domain: IEIP712Domain, customTypes: EIP712TypeMap, primaryType: string, message: Record<string, unknown>): TypedMessage<MessageTypes>;
}
declare module "contracts/erc20" {
    /*!-----------------------------------------------------------
    * Copyright (c) IJS Technologies. All rights reserved.
    * Released under dual AGPLv3/commercial license
    * https://ijs.network
    *-----------------------------------------------------------*/
    import { IWallet, TransactionReceipt, Event } from "wallet";
    import { Contract } from "contract";
    import { BigNumber } from 'bignumber.js';
    export class Erc20 extends Contract {
        private _decimals;
        constructor(wallet: IWallet, address?: string, decimals?: number);
        deploy(params: {
            name: string;
            symbol: string;
            minter?: string;
            cap?: number | BigNumber;
        }): Promise<string>;
        parseApprovalEvent(receipt: TransactionReceipt): Erc20.ApprovalEvent[];
        decodeApprovalEvent(event: Event): Erc20.ApprovalEvent;
        parseTransferEvent(receipt: TransactionReceipt): Erc20.TransferEvent[];
        decodeTransferEvent(event: Event): Erc20.TransferEvent;
        allowance(params: {
            owner: string;
            spender: string;
        }): Promise<BigNumber>;
        approve(params: {
            spender: string;
            amount: number | BigNumber;
        }): Promise<any>;
        get balance(): Promise<BigNumber>;
        balanceOf(address: string): Promise<BigNumber>;
        get cap(): Promise<BigNumber>;
        get decimals(): Promise<number>;
        mint(params: {
            address: string;
            amount: number | BigNumber;
        }): Promise<any>;
        minter(): Promise<string>;
        get name(): Promise<string>;
        get symbol(): Promise<string>;
        get totalSupply(): Promise<BigNumber>;
        transfer(params: {
            address: string;
            amount: number | BigNumber;
        }): Promise<TransactionReceipt>;
    }
    export module Erc20 {
        interface ApprovalEvent {
            owner: string;
            spender: string;
            value: BigNumber;
            _event: Event;
        }
        interface TransferEvent {
            from: string;
            to: string;
            value: BigNumber;
            _event: Event;
        }
    }
}
declare module "eventBus" {
    export interface IEventBusRegistry {
        unregister: () => void;
    }
    export interface ICallable {
        [key: string]: Function;
    }
    export interface ISubscriber {
        [key: string]: ICallable;
    }
    export interface IEventBus {
        dispatch<T>(event: string, arg?: T): void;
        register(sender: any, event: string, callback: Function): IEventBusRegistry;
    }
    export class EventBus implements IEventBus {
        private subscribers;
        private static nextId;
        private static instance?;
        private constructor();
        static getInstance(): EventBus;
        dispatch<T>(event: string, arg?: T): void;
        register(sender: any, event: string, callback: Function): IEventBusRegistry;
        private getNextId;
    }
}
declare module "wallet" {
    /*!-----------------------------------------------------------
    * Copyright (c) IJS Technologies. All rights reserved.
    * Released under dual AGPLv3/commercial license
    * https://ijs.network
    *-----------------------------------------------------------*/
    const Web3: any;
    import { IWeb3 } from "web3";
    import { BigNumber } from 'bignumber.js';
    import { Erc20 } from "contracts/erc20";
    import { IAbiDefinition, MessageTypes, TypedMessage } from "types";
    import { IEventBusRegistry } from "eventBus";
    export function toString(value: any): any;
    export function stringToBytes32(value: string | stringArray): string | string[];
    export function stringToBytes(value: string | stringArray, nByte?: number): string | string[];
    export type stringArray = string | _stringArray;
    export interface _stringArray extends Array<stringArray> {
    }
    export interface IWalletUtils {
        fromDecimals(value: BigNumber | number | string, decimals?: number): BigNumber;
        fromWei(value: any, unit?: string): string;
        hexToUtf8(value: string): string;
        sha3(value: string): string;
        stringToBytes(value: string | stringArray, nByte?: number): string | string[];
        stringToBytes32(value: string | stringArray): string | string[];
        toDecimals(value: BigNumber | number | string, decimals?: number): BigNumber;
        toString(value: any): string;
        toUtf8(value: any): string;
        toWei(value: string, unit?: string): string;
    }
    export interface IWalletTransaction {
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
    }
    export interface IWalletBlockTransactionObject {
        number: number;
        hash: string;
        parentHash: string;
        nonce: string;
        sha3Uncles: string;
        logsBloom: string;
        transactionRoot: string;
        stateRoot: string;
        receiptsRoot: string;
        miner: string;
        extraData: string;
        gasLimit: number;
        gasUsed: number;
        timestamp: number | string;
        baseFeePerGas?: number;
        size: number;
        difficulty: number;
        totalDifficulty: number;
        uncles: string[];
        transactions: IWalletTransaction[];
    }
    export interface ITokenInfo {
        name: string;
        symbol: string;
        totalSupply: BigNumber;
        decimals: number;
    }
    export interface IBatchRequestResult {
        key: string;
        result: any;
    }
    export interface IBatchRequestObj {
        batch: any;
        promises: Promise<IBatchRequestResult>[];
        execute: (batch: IBatchRequestObj, promises: Promise<IBatchRequestResult>[]) => Promise<IBatchRequestResult[]>;
    }
    export interface IWallet {
        account: IAccount;
        accounts: Promise<string[]>;
        address: string;
        balance: Promise<BigNumber>;
        balanceOf(address: string): Promise<BigNumber>;
        _call(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<any>;
        chainId: number;
        createAccount(): IAccount;
        decode(abi: any, event: Log | EventLog, raw?: {
            data: string;
            topics: string[];
        }): Event;
        decodeErrorMessage(msg: string): any;
        decodeEventData(data: Log, events?: any): Promise<Event>;
        decodeLog(inputs: any, hexString: string, topics: any): any;
        defaultAccount: string;
        getAbiEvents(abi: any[]): any;
        getAbiTopics(abi: any[], eventNames: string[]): any[];
        getBlock(blockHashOrBlockNumber?: number | string, returnTransactionObjects?: boolean): Promise<IWalletBlockTransactionObject>;
        getBlockNumber(): Promise<number>;
        getBlockTimestamp(blockHashOrBlockNumber?: number | string): Promise<number>;
        getChainId(): Promise<number>;
        getContractAbi(address: string): any;
        getContractAbiEvents(address: string): any;
        getTransaction(transactionHash: string): Promise<Transaction>;
        methods(...args: any): Promise<any>;
        privateKey: string;
        recoverSigner(msg: string, signature: string): Promise<string>;
        registerAbi(abi: any[] | string, address?: string | string[], handler?: any): string;
        registerAbiContracts(abiHash: string, address: string | string[], handler?: any): any;
        send(to: string, amount: number): Promise<TransactionReceipt>;
        _send(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<any>;
        scanEvents(fromBlock: number, toBlock?: number | string, topics?: any, events?: any, address?: string | string[]): Promise<Event[]>;
        scanEvents(params: {
            fromBlock: number;
            toBlock?: number | string;
            topics?: any;
            events?: any;
            address?: string | string[];
        }): Promise<Event[]>;
        signMessage(msg: string): Promise<string>;
        signTransaction(tx: any, privateKey?: string): Promise<string>;
        soliditySha3(...val: any[]): string;
        toChecksumAddress(address: string): string;
        tokenInfo(address: string): Promise<ITokenInfo>;
        _txData(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<string>;
        _txObj(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<Transaction>;
        utils: IWalletUtils;
        verifyMessage(account: string, msg: string, signature: string): Promise<boolean>;
        multiCall(calls: {
            to: string;
            data: string;
        }[], gasBuffer?: string): Promise<{
            results: string[];
            lastSuccessIndex: BigNumber;
        }>;
        encodeFunctionCall<T extends IAbiDefinition, F extends Extract<keyof T, {
            [K in keyof T]: T[K] extends Function ? K : never;
        }[keyof T]>>(contract: T, methodName: F, params: string[]): string;
    }
    export interface IClientWallet extends IWallet {
        blockGasLimit(): Promise<number>;
        clientSideProvider: IClientSideProvider;
        initClientWallet(config: IClientWalletConfig): void;
        connect(clientSideProvider: IClientSideProvider): Promise<any>;
        disconnect(): Promise<void>;
        getGasPrice(): Promise<BigNumber>;
        getTransaction(transactionHash: string): Promise<Transaction>;
        getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt>;
        isConnected: boolean;
        newContract(abi: any, address?: string): IContract;
        provider: any;
        registerEvent(abi: any, eventMap: {
            [topics: string]: any;
        }, address: string, handler: any): any;
        registerSendTxEvents(eventsOptions: ISendTxEventsOptions): void;
        sendSignedTransaction(signedTransaction: string): Promise<TransactionReceipt>;
        sendTransaction(transaction: Transaction): Promise<TransactionReceipt>;
        signTypedDataV4(data: TypedMessage<MessageTypes>): Promise<string>;
        switchNetwork(chainId: number, onChainChanged?: (chainId: string) => void): Promise<boolean>;
        transactionCount(): Promise<number>;
        getNetworkInfo(chainId: number): INetwork;
        setNetworkInfo(network: INetwork): void;
        setMultipleNetworksInfo(networks: INetwork[]): void;
        registerClientWalletEvent(sender: any, event: string, callback: Function): IEventBusRegistry;
        registerRpcWalletEvent(sender: any, instanceId: string, event: string, callback: Function): IEventBusRegistry;
        unregisterWalletEvent(event: IEventBusRegistry): void;
        destoryRpcWalletInstance(instanceId: string): void;
        initRpcWallet(config: IRpcWalletConfig): string;
    }
    export interface IRpcWallet extends IWallet {
        switchNetwork(chainId: number, onChainChanged?: (chainId: string) => void): Promise<boolean>;
    }
    export interface IContractMethod {
        call: any;
        estimateGas(...params: any[]): Promise<number>;
        encodeABI(): string;
    }
    export interface IContract {
        deploy(params: {
            data: string;
            arguments?: any[];
        }): IContractMethod;
        methods: {
            [methodName: string]: (...params: any[]) => IContractMethod;
        };
        options: {
            address: string;
        };
    }
    export interface Event {
        name: string;
        address: string;
        blockNumber: number;
        logIndex: number;
        topics: string[];
        transactionHash: string;
        transactionIndex: number;
        data: any;
        rawData: any;
    }
    export interface Log {
        address: string;
        data: string;
        topics: Array<string>;
        logIndex: number;
        transactionHash?: string;
        transactionIndex: number;
        blockHash?: string;
        type?: string;
        blockNumber: number;
    }
    export interface EventLog {
        event: string;
        address: string;
        returnValues: any;
        logIndex: number;
        transactionIndex: number;
        transactionHash: string;
        blockHash: string;
        blockNumber: number;
        raw?: {
            data: string;
            topics: string[];
        };
    }
    export interface TransactionReceipt {
        transactionHash: string;
        transactionIndex: number;
        blockHash: string;
        blockNumber: number;
        from: string;
        to: string;
        contractAddress?: string;
        cumulativeGasUsed: number;
        gasUsed: number;
        logs?: Array<Log>;
        events?: {
            [eventName: string]: EventLog | EventLog[];
        };
        status: boolean;
    }
    export interface Transaction {
        from?: string;
        to?: string;
        nonce?: number;
        gas?: number;
        gasPrice?: BigNumber;
        data?: string;
        value?: BigNumber;
    }
    export interface TransactionOptions {
        from?: string;
        nonce?: number;
        gas?: number;
        gasLimit?: number;
        gasPrice?: BigNumber | number;
        data?: string;
        value?: BigNumber | number;
    }
    export interface IKMS {
    }
    export interface IAccount {
        address: string;
        privateKey?: string;
        kms?: IKMS;
        sign?(): Promise<string>;
        signTransaction?(): Promise<any>;
    }
    export interface ITokenOption {
        address: string;
        symbol: string;
        decimals: number;
        image?: string;
    }
    export interface INetwork {
        image?: string;
        chainId: number;
        chainName: string;
        nativeCurrency: {
            name: string;
            symbol: string;
            decimals: number;
        };
        rpcUrls: string[];
        blockExplorerUrls?: string[];
        iconUrls?: string[];
    }
    export interface IClientSideProviderEvents {
        onAccountChanged?: (account: string) => void;
        onChainChanged?: (chainId: string) => void;
        onConnect?: (connectInfo: any) => void;
        onDisconnect?: (error: any) => void;
    }
    export interface IMulticallInfo {
        chainId: number;
        contractAddress: string;
        gasBuffer: string;
    }
    export type NetworksMapType = {
        [chainId: number]: INetwork;
    };
    export type MulticallInfoMapType = {
        [chainId: number]: IMulticallInfo;
    };
    export interface IRpcWalletConfig {
        networks: INetwork[];
        infuraId: string;
    }
    export interface IClientWalletConfig {
        defaultChainId: number;
        networks: INetwork[];
        infuraId: string;
        multicalls: IMulticallInfo[];
    }
    export interface IClientProviderOptions {
        name?: string;
        image?: string;
        infuraId?: string;
        useDefaultProvider?: boolean;
        [key: string]: any;
    }
    export interface IClientSideProvider {
        name: string;
        displayName: string;
        provider: any;
        image: string;
        homepage?: string;
        events?: IClientSideProviderEvents;
        options?: IClientProviderOptions;
        installed(): boolean;
        isConnected(): boolean;
        connect: () => Promise<void>;
        disconnect: () => Promise<void>;
        switchNetwork?: (chainId: number, onChainChanged?: (chainId: string) => void) => Promise<boolean>;
    }
    export class EthereumProvider implements IClientSideProvider {
        protected wallet: Wallet;
        protected _events?: IClientSideProviderEvents;
        protected _options?: IClientProviderOptions;
        protected _isConnected: boolean;
        protected _name: string;
        protected _image: string;
        onAccountChanged: (account: string) => void;
        onChainChanged: (chainId: string) => void;
        onConnect: (connectInfo: any) => void;
        onDisconnect: (error: any) => void;
        constructor(wallet: Wallet, events?: IClientSideProviderEvents, options?: IClientProviderOptions);
        get name(): string;
        get displayName(): string;
        get provider(): any;
        get image(): string;
        installed(): boolean;
        get events(): IClientSideProviderEvents;
        get options(): IClientProviderOptions;
        initEvents(): void;
        connect(): Promise<any>;
        disconnect(): Promise<void>;
        isConnected(): boolean;
        addToken(option: ITokenOption, type?: string): Promise<boolean>;
        switchNetwork(chainId: number, onChainChanged?: (chainId: string) => void): Promise<boolean>;
    }
    export class MetaMaskProvider extends EthereumProvider {
        get displayName(): string;
        get image(): string;
        get homepage(): string;
        installed(): boolean;
    }
    export class Web3ModalProvider extends EthereumProvider {
        private web3Modal;
        private _provider;
        constructor(wallet: Wallet, events?: IClientSideProviderEvents, options?: IClientProviderOptions);
        get name(): string;
        get displayName(): string;
        get provider(): any;
        get image(): string;
        get homepage(): any;
        installed(): boolean;
        private initializeWeb3Modal;
        connect(): Promise<any>;
        disconnect(): Promise<void>;
    }
    export interface ISendTxEventsOptions {
        transactionHash?: (error: Error, receipt?: string) => void;
        confirmation?: (receipt: any) => void;
    }
    export class Wallet implements IClientWallet {
        protected _web3: IWeb3;
        protected _account: IAccount;
        private _accounts;
        private _provider;
        private _eventTopicAbi;
        private _eventHandler;
        protected _sendTxEventHandler: ISendTxEventsOptions;
        protected _contracts: {};
        protected _blockGasLimit: number;
        private _networksMap;
        private _multicallInfoMap;
        chainId: number;
        clientSideProvider: IClientSideProvider;
        private _infuraId;
        private _utils;
        private static _rpcWalletPoolMap;
        constructor(provider?: any, account?: IAccount | IAccount[]);
        private static readonly instance;
        static getInstance(): IWallet;
        static getClientInstance(): IClientWallet;
        static getRpcWalletInstance(instanceId: string): IRpcWallet;
        get isConnected(): boolean;
        switchNetwork(chainId: number, onChainChanged?: (chainId: string) => void): Promise<any>;
        initClientWallet(config: IClientWalletConfig): void;
        registerClientWalletEvent(sender: any, event: string, callback: Function): IEventBusRegistry;
        registerRpcWalletEvent(sender: any, instanceId: string, event: string, callback: Function): IEventBusRegistry;
        unregisterWalletEvent(event: IEventBusRegistry): void;
        destoryRpcWalletInstance(instanceId: string): void;
        generateUUID(): string;
        initRpcWallet(config: IRpcWalletConfig): string;
        setDefaultProvider(): void;
        connect(clientSideProvider: IClientSideProvider): Promise<void>;
        disconnect(): Promise<void>;
        get accounts(): Promise<string[]>;
        get address(): string;
        get account(): IAccount;
        set account(value: IAccount);
        get infuraId(): string;
        set infuraId(value: string);
        get networksMap(): NetworksMapType;
        getNetworkInfo(chainId: number): INetwork;
        setNetworkInfo(network: INetwork): void;
        setMultipleNetworksInfo(networks: INetwork[]): void;
        createAccount(): IAccount;
        decodeLog(inputs: any, hexString: string, topics: any): any;
        get defaultAccount(): string;
        set defaultAccount(address: string);
        getChainId(): Promise<number>;
        get provider(): any;
        set provider(value: any);
        sendSignedTransaction(tx: string): Promise<TransactionReceipt>;
        signTransaction(tx: any, privateKey?: string): Promise<string>;
        registerSendTxEvents(eventsOptions: ISendTxEventsOptions): void;
        private getContract;
        _call(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<any>;
        private _getMethod;
        _txObj(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<Transaction>;
        _send(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        _txData(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<string>;
        _methods(...args: any[]): Promise<{
            to: any;
            data: any;
        }>;
        methods(...args: any): Promise<any>;
        get balance(): Promise<BigNumber>;
        balanceOf(address: string): Promise<BigNumber>;
        recoverSigner(msg: string, signature: string): Promise<string>;
        getBlock(blockHashOrBlockNumber?: number | string, returnTransactionObjects?: boolean): Promise<IWalletBlockTransactionObject>;
        getBlockNumber(): Promise<number>;
        getBlockTimestamp(blockHashOrBlockNumber?: number | string): Promise<number>;
        set privateKey(value: string);
        registerEvent(abi: any, eventMap: {
            [topics: string]: any;
        }, address: string, handler: any): void;
        private _abiHashDict;
        private _abiContractDict;
        private _abiAddressDict;
        private _abiEventDict;
        getAbiEvents(abi: any[]): any;
        getAbiTopics(abi: any[], eventNames?: string[]): any[];
        getContractAbi(address: string): any;
        getContractAbiEvents(address: string): any;
        registerAbi(abi: any[] | string, address?: string | string[], handler?: any): string;
        registerAbiContracts(abiHash: string, address: string | string[], handler?: any): void;
        decode(abi: any, event: Log | EventLog, raw?: {
            data: string;
            topics: string[];
        }): Event;
        decodeEventData(data: Log, events?: any): Promise<Event>;
        scanEvents(params: {
            fromBlock: number;
            toBlock?: number | string;
            topics?: any;
            events?: any;
            address?: string | string[];
        }): Promise<Event[]>;
        scanEvents(fromBlock: number, toBlock?: number | string, topics?: any, events?: any, address?: string | string[]): Promise<Event[]>;
        send(to: string, amount: number | BigNumber): Promise<TransactionReceipt>;
        setBlockTime(time: number): Promise<any>;
        increaseBlockTime(value: number): Promise<any>;
        signMessage(msg: string): Promise<string>;
        signTypedDataV4(data: TypedMessage<MessageTypes>): Promise<string>;
        token(tokenAddress: string, decimals?: number): Erc20;
        tokenInfo(tokenAddress: string): Promise<ITokenInfo>;
        get utils(): IWalletUtils;
        verifyMessage(account: string, msg: string, signature: string): Promise<boolean>;
        private _gasLimit;
        blockGasLimit(): Promise<number>;
        getGasPrice(): Promise<BigNumber>;
        transactionCount(): Promise<number>;
        sendTransaction(transaction: Transaction): Promise<TransactionReceipt>;
        getTransaction(transactionHash: string): Promise<Transaction>;
        getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt>;
        call(transaction: Transaction): Promise<any>;
        newContract(abi: any, address?: string): IContract;
        decodeErrorMessage(msg: string): any;
        newBatchRequest(): Promise<IBatchRequestObj>;
        soliditySha3(...val: any[]): string;
        toChecksumAddress(address: string): string;
        multiCall(calls: {
            to: string;
            data: string;
        }[], gasBuffer?: string): Promise<{
            results: string[];
            lastSuccessIndex: BigNumber;
        }>;
        encodeFunctionCall<T extends IAbiDefinition, F extends Extract<keyof T, {
            [K in keyof T]: T[K] extends Function ? K : never;
        }[keyof T]>>(contract: T, methodName: F, params: string[]): string;
        get web3(): typeof Web3;
    }
    export class RpcWallet extends Wallet implements IRpcWallet {
        switchNetwork(chainId: number, onChainChanged?: (chainId: string) => void): Promise<any>;
    }
}
/// <amd-module name="@ijstech/eth-wallet" />
declare module "@ijstech/eth-wallet" {
    /*!-----------------------------------------------------------
    * Copyright (c) IJS Technologies. All rights reserved.
    * Released under dual AGPLv3/commercial license
    * https://ijs.network
    *-----------------------------------------------------------*/
    export { IWallet, IWalletUtils, IAccount, Wallet, Transaction, Event, TransactionReceipt, ISendTxEventsOptions, IClientProviderOptions, IBatchRequestObj, INetwork, EthereumProvider, MetaMaskProvider, Web3ModalProvider, IClientSideProviderEvents, IClientSideProvider, IClientWalletConfig, IMulticallInfo, IRpcWalletConfig } from "wallet";
    export { Contract } from "contract";
    export { BigNumber } from "bignumber.js";
    export { Erc20 } from "contracts/erc20";
    export * as Utils from "utils";
    export * as Contracts from "contracts/index";
    export * as Types from "types";
    export * as Constants from "constants";
}
