/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
import { BigNumber } from "bignumber.js";
import { EIP712TypeMap, IEIP712Domain, MessageTypes, TypedMessage } from "./types";
export declare function sleep(millisecond: number): Promise<unknown>;
export declare function numberToBytes32(value: number | BigNumber, prefix?: boolean): string;
export declare function padLeft(string: string, chars: number, sign?: string): string;
export declare function padRight(string: string, chars: number, sign?: string): string;
type stringArray = string | _stringArray;
interface _stringArray extends Array<stringArray> {
}
export declare function stringToBytes32(value: string | stringArray): string | string[];
export declare function stringToBytes(value: string | stringArray, nByte?: number): string | string[];
export declare function addressToBytes32(value: string, prefix?: boolean): string;
export declare function bytes32ToAddress(value: string): string;
export declare function bytes32ToString(value: string): string;
export declare function addressToBytes32Right(value: string, prefix?: boolean): string;
export declare function toNumber(value: string | number | BigNumber): number;
export declare function toDecimals(value: BigNumber | number | string, decimals?: number): BigNumber;
export declare function fromDecimals(value: BigNumber | number | string, decimals?: number): BigNumber;
export declare function toString(value: any): any;
export declare const nullAddress = "0x0000000000000000000000000000000000000000";
export declare function constructTypedMessageData(domain: IEIP712Domain, customTypes: EIP712TypeMap, primaryType: string, message: Record<string, unknown>): TypedMessage<MessageTypes>;
export {};
