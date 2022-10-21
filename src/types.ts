 /*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/ 
/*---------------------------------------------------------------------------------------------
*  ISC License
*  Copyright (c) 2020 MetaMask
*  https://github.com/MetaMask/eth-sig-util/blob/main/LICENSE
*--------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------
*  MIT License
*  Copyright (c) 2016 Nick Dodson. nickdodson.com
*  https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/util
*--------------------------------------------------------------------------------------------*/

export interface MessageTypeProperty {
    name: string;
    type: string;
}

export type EIP712TypeMap = { [type: string]: MessageTypeProperty[] };

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