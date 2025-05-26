import { IAccount, Wallet } from './wallet';
export declare class NodeWallet extends Wallet {
    set account(value: IAccount);
    get address(): string;
    methods(...args: any): Promise<any>;
    set privateKey(value: string);
}
