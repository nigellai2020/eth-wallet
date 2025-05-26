export interface IEthers {
    keccak256(data: Uint8Array): string;
    toUtf8Bytes(data: string): Uint8Array;
    toUtf8String(data: string): string;
    isHexString(value: string): boolean;
    getAddress(address: string): string;
    isAddress(address: string): boolean;
    hexlify(data: Uint8Array): string;
    verifyMessage(message: string, signature: string): string;
    verifyTypedData(domain: any, types: any, value: any, signature: string): string;
    formatUnits(value: string, unit: string): string;
    formatEther(value: string): string;
    parseUnits(value: string, unit?: string): string;
    solidityPackedKeccak256(types: string[], values: any[]): string;

    JsonRpcProvider: new (url: string) => IEthersProvider;
    BrowserProvider: new (provider: any) => IEthersProvider;
    Wallet: {
        new (privateKey: string, provider?: IEthersProvider): IEthersWallet;
        createRandom(): IEthersWallet;
    };
    Interface: new (abi: any[]) => IEthersInterface;
    Contract: new (address: string, abi: any[], provider: IEthersProvider) => IEthersContract;
    ContractFactory: new (abi: any[], bytecode: string, signer: IEthersWallet) => IEthersContractFactory;
    AbiCoder: {
        defaultAbiCoder(): IEthersAbiCoder;
    };
}

export interface IEthersProvider {
    getBlock(blockHashOrBlockNumber: string | number, includeTransactions?: boolean): Promise<any>;
    getBlockNumber(): Promise<number>;
    getFeeData(): Promise<{ gasPrice: string }>;
    getLogs(filter: any): Promise<any[]>;
    getTransaction(transactionHash: string): Promise<any>;
    getTransactionReceipt(transactionHash: string): Promise<any>;
    estimateGas(transaction: any): Promise<string>;
    call(transaction: any): Promise<any>;
    send(method: string, params: any[]): Promise<any>;
    broadcastTransaction(signedTransaction: string): Promise<any>;
    listAccounts(): Promise<any[]>;
    getBalance(address: string): Promise<string>;
}

export interface IEthersWallet {
    address: string;
    privateKey: string;
    signMessage(message: string): Promise<string>;
    signTransaction(transaction: any): Promise<string>;
    sendTransaction(transaction: any): Promise<any>;
}

export interface IEthersInterface {
    encodeFunctionData(functionName: string, params: any[]): string;
    decodeFunctionData(functionName: string, data: string): any;
    decodeEventLog(eventFragment: any, data: string, topics: string[]): any;
    getEvent(eventName: string): any;
}

export interface IEthersContract {
    [methodName: string]: any;
    staticCall(...params: any[]): Promise<any>;
    populateTransaction(...params: any[]): Promise<any>;
}

export interface IEthersContractFactory {
    deploy(...params: any[]): Promise<any>;
}

export interface IEthersAbiCoder {
    encode(types: string[], values: any[]): string;
    decode(types: string[], data: string): any;
}

export interface IEthersLib {
    ethers: IEthers;
    Wallet: {
        new (privateKey: string, provider?: IEthersProvider): IEthersWallet;
        createRandom(): IEthersWallet;
    };
}