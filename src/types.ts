export interface IWhitelistTreeData {
    account: string;
    [key: string]: any;
}

export interface IWhitelistTreeABIItem {
    name: string;
    type: string;
}

export interface IEIP712Type {
    name: string;
    type: string;
}	

export type EIP712TypeMap = { [type: string]: IEIP712Type[] };

export interface IEIP712Domain {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
}	

export interface IEIP712Data {
    types: EIP712TypeMap,
    primaryType: string,
    domain: IEIP712Domain,
    message: any
}