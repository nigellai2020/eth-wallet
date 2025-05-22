import { IAccount, Wallet, TransactionReceipt, Transaction } from './wallet';
import { MessageTypes, TypedMessage } from './types';
export declare class NodeWallet extends Wallet {
    set account(value: IAccount);
    get address(): string;
    methods(...args: any): Promise<any>;
    set privateKey(value: string);
    sendTransaction(transaction: Transaction): Promise<TransactionReceipt>;
    signMessage(msg: string): Promise<string>;
    signTransaction(tx: any, privateKey?: string): Promise<string>;
    signTypedDataV4(data: TypedMessage<MessageTypes>): Promise<string>;
    recoverTypedSignatureV4(data: TypedMessage<MessageTypes>, signature: string): string;
}
