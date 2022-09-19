/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
import { MessageTypes, SignTypedDataVersion, TypedMessage } from "./types";
export declare function signTypedDataWithPrivateKey<V extends SignTypedDataVersion, T extends MessageTypes>({ privateKey, data, version, }: {
    privateKey: string;
    data: TypedMessage<T>;
    version: V;
}): string;
