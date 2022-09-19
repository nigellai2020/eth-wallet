import { MessageTypes, SignTypedDataVersion, TypedMessage } from "./types";
export declare function signTypedDataWithPrivateKey<V extends SignTypedDataVersion, T extends MessageTypes>({ privateKey, data, version, }: {
    privateKey: string;
    data: TypedMessage<T>;
    version: V;
}): string;
