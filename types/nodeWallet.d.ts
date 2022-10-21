import { IKMS, IAccount, Wallet, TransactionReceipt, Transaction } from './wallet';
import { MessageTypes, TypedMessage } from './types';
export declare class NodeWallet extends Wallet {
    private _kms;
    set account(value: IAccount);
    get address(): string;
    initKMS(value?: IKMS): Promise<void>;
    private get kms();
    methods(...args: any): Promise<any>;
    set privateKey(value: string);
    send(to: string, amount: number): Promise<TransactionReceipt>;
    sendTransaction(transaction: Transaction): Promise<TransactionReceipt>;
    signMessage(msg: string): Promise<string>;
    signTransaction(tx: any, privateKey?: string): Promise<string>;
    signTypedDataV4(data: TypedMessage<MessageTypes>): Promise<string>;
    recoverTypedSignatureV4(data: TypedMessage<MessageTypes>, signature: string): string;
}
