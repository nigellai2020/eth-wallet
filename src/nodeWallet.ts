import {IKMS, IAccount, Wallet, TransactionReceipt, Transaction} from './wallet';
import {MessageTypes, SignTypedDataVersion, TypedMessage} from './types';
import {BigNumber} from 'bignumber.js';
import { recoverTypedSignature, signTypedDataWithPrivateKey } from './signTypedData';
import {KMS} from './kms';

export class NodeWallet extends Wallet{
    private _kms: KMS;
    set account(value: IAccount){
        this._kms = null;
        super.account = value;
    };
    get address(): string{			
        if (this._kms && this._account)
        	return this._account.address
        else
            return super.address;
    };
    async initKMS(value?: IKMS){			
        value = value || this._account.kms;			
        if (value){
            this._kms = new KMS(value);
            this._account = {
                address: await this._kms.getAddress(),
                kms: value
            };
        };
    };
    private get kms(): KMS{
        if (this._account && !this._kms && this._account.kms)
            this._kms = new KMS(this._account.kms);
        return this._kms;
    };
    async methods(...args: any): Promise<any>{
        let _web3 = this._web3;
        if ((<any>_web3).methods){
            return (<any>_web3).methods.apply(_web3, args);
        }
        else{
            let result: any;
            let value: any;
            let method: any;
            let methodAbi: any;
            let byteCode: any;
            
            let abi = args.shift();
            let address = args.shift();
            let methodName = args.shift();
            if (methodName == 'deploy')
                byteCode = args.shift();

            let contract;				
            let hash;
            if (address && this._contracts[address])
                contract = this._contracts[address]
            else{
                hash = this._web3.utils.sha3(JSON.stringify(abi));
                if (this._contracts[hash]){
                    contract = this._contracts[hash];
                }
            };
            if (!contract){
                contract = new this._web3.eth.Contract(abi);			
                if (address)
                    this._contracts[address] = contract;
                this._contracts[hash] = contract;
            };
            if (methodName == 'deploy'){
                method = contract[methodName]({
                    data: byteCode,
                    arguments: args
                });
            }
            else {
                for (let i = 0; i < abi.length; i ++)	{
                    if (abi[i].name == methodName){
                        methodAbi = abi[i];
                        break;
                    }
                }						
                if (methodAbi.payable)
                    value = args.pop();
                for (let i = 0; i < methodAbi.inputs.length; i ++){
                    if (methodAbi.inputs[i].type.indexOf('bytes') == 0){
                        args[i] = args[i] || '';
                        if (methodAbi.inputs[i].type.indexOf('[]') > 0){
                            let a = [];
                            for (let k = 0; k < args[i].length; k ++){
                                let s = args[i][k] || '';
                                if (s.indexOf('0x') != 0)
                                    a.push(_web3.utils.fromAscii(s))
                                else
                                    a.push(s);
                            }
                            args[i] = a;
                        }
                        else if (args[i].indexOf('0x') != 0)
                            args[i] = _web3.utils.fromAscii(args[i]);
                    }
                    else if (methodAbi.inputs[i].type == 'address'){
                        if (!args[i])
                            args[i] = _web3.eth.abi.encodeParameter('address', 0);
                    }
                }					
                method = contract.methods[methodName].apply(contract, args);
            };

            contract.options.address = address;				
            if (methodAbi && (methodAbi.constant || methodAbi.stateMutability == 'view')) {
                return method.call({from: this.address});
            }				

            if (!this._blockGasLimit) {
                this._blockGasLimit = (await _web3.eth.getBlock('latest')).gasLimit;
            }
            let gas;
            try {
                gas = await method.estimateGas({ from: this.address, to: address, value: value });
                gas = Math.min(this._blockGasLimit, Math.round(gas * 1.5));
            } catch (e) {
                if (e.message == "Returned error: out of gas"){ // amino
                    console.log(e.message);
                    gas = Math.round(this._blockGasLimit * 0.5);
                } else {
                    try{
                        await method.call({from:this.address, value: value});
                    } catch(e) {
                        if (e.message.includes("VM execution error.")) {
                            var msg = (e.data || e.message).match(/0x[0-9a-fA-F]+/);
                            if (msg && msg.length) {
                                msg = msg[0];
                                if (msg.startsWith("0x08c379a")) {
                                    msg = _web3.eth.abi.decodeParameter('string', "0x"+msg.substring(10));
                                    throw new Error(msg);
                                }
                            }
                        }
                    }
                    throw e;
                }
            }

            let gasPrice = await _web3.eth.getGasPrice();

            if (this._account && this._account.privateKey){
                let tx = {
                    gas: gas,
                    gasPrice: gasPrice,
                    data: method.encodeABI(),
                    from: this.address,
                    to: address,
                    value: value
                };
                let signedTx = await _web3.eth.accounts.signTransaction(tx, this._account.privateKey);
                result = await _web3.eth.sendSignedTransaction(signedTx.rawTransaction);
                if (methodName == 'deploy')
                    return result.contractAddress;
                return result;
            }
            else if (this._account && this._account.kms){
            	let nonce = await _web3.eth.getTransactionCount(this.address);
            	let price = _web3.utils.numberToHex(await _web3.eth.getGasPrice());
            	let tx = {
            		from: this.address,
            		nonce: nonce,
            		gasPrice: price,
            		gasLimit: gas,
            		gas: gas,
            		to: address,
            		data: method.encodeABI(),
            	};
            	let chainId = await this.getChainId();
            	let txHash = await this.kms.signTransaction(chainId, tx);
            	result = await _web3.eth.sendSignedTransaction(txHash)
            	if (methodName == 'deploy')
            		return result.contractAddress;
            	return result;
            }
            else{					
                contract.options.address = address;
                let nonce = await _web3.eth.getTransactionCount(this.address);
                let tx = {
                    from: this.address, 
                    nonce,
                    gasPrice,
                    gas,
                    to: address,
                    value,
                    data: method.encodeABI(),
                }

                let promiEvent = _web3.eth.sendTransaction(tx);
                promiEvent.on('error', (error: Error) =>{
                    if (error.message.startsWith("Transaction was not mined within 50 blocks")) {
                        return;
                    }
                    if (this._sendTxEventHandler.transactionHash)
                        this._sendTxEventHandler.transactionHash(error);
                });
                promiEvent.on('transactionHash', (receipt: string) => {
                    if (this._sendTxEventHandler.transactionHash)
                        this._sendTxEventHandler.transactionHash(null, receipt);
                });
                promiEvent.on('confirmation', (confNumber: number, receipt: any) => {           
                    if (this._sendTxEventHandler.confirmation && confNumber == 1)
                        this._sendTxEventHandler.confirmation(receipt);                
                });
                result = await promiEvent;
                if (methodName == 'deploy')
                    return result.contractAddress;
                return result;
            }	
        }
    };
    set privateKey(value: string){
        if (value){
            this._kms = null;
        };
        super.privateKey = value;
    };
    send(to: string, amount: number): Promise<TransactionReceipt>{
        let _web3 = this._web3;
        let address = this.address;
        let self = this;
        return new Promise(async function(resolve, reject){
            try{
                let value = _web3.utils.numberToHex(_web3.utils.toWei(amount.toString()));
                let result;
                if ((self._account && self._account.privateKey) || self.kms){
                    let nonce = await _web3.eth.getTransactionCount(address);        				
                    let gas = await _web3.eth.estimateGas({
                         from: address,       
                         nonce: nonce, 
                         to: to,     
                         value: value
                    });
                    let price = _web3.utils.numberToHex(await _web3.eth.getGasPrice());
                    let tx = {
                        from: address,
                        nonce: nonce,
                        gasPrice: price,
                        gasLimit: gas,
                        gas: gas,
                        to: to,     
                        value: value
                    };
                    if (self.kms){
                    	let chainId = await self.getChainId();
                    	let txHash = await self.kms.signTransaction(chainId, tx);
                    	result = await _web3.eth.sendSignedTransaction(txHash);
                    }
                    else{
                        let signedTx = await _web3.eth.accounts.signTransaction(tx, self._account.privateKey);
                        result = await _web3.eth.sendSignedTransaction(signedTx.rawTransaction);			
                    }						
                    resolve(result);	
                }
                else{
                    result = await _web3.eth.sendTransaction({from: address, to: to, value: _web3.utils.toWei(amount.toString()).toString()});	
                    resolve(result);	
                }
            }
            catch(err){					
                reject(err);
            }
        })
    };
    async sendTransaction(transaction: Transaction): Promise<TransactionReceipt> {
        transaction.value = new BigNumber(transaction.value).toFixed();
        transaction.gasPrice = new BigNumber(transaction.gasPrice).toFixed();
        let currentProvider = this.provider;
        try {
            if (typeof window !== "undefined" && this.clientSideProvider) {
                this.provider = this.clientSideProvider.provider;
            }
            if (this._account && this._account.privateKey){
                let signedTx = await this._web3.eth.accounts.signTransaction(transaction, this._account.privateKey);
                return await this._web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            }
            else if (this._account && this._account.kms){
            	let chainId = await this.getChainId();
            	let signedTx = await this.kms.signTransaction(chainId, transaction);
            	return await this._web3.eth.sendSignedTransaction(signedTx);
            }
            else {
                let promiEvent = this._web3.eth.sendTransaction(transaction);
                promiEvent.on('error', (error: Error) =>{
                    if (error.message.startsWith("Transaction was not mined within 50 blocks")) {
                        return;
                    }
                    if (this._sendTxEventHandler.transactionHash)
                        this._sendTxEventHandler.transactionHash(error);
                });
                promiEvent.on('transactionHash', (receipt: string) => {
                    if (this._sendTxEventHandler.transactionHash)
                        this._sendTxEventHandler.transactionHash(null, receipt);
                });
                promiEvent.on('confirmation', (confNumber: number, receipt: any) => {           
                    if (this._sendTxEventHandler.confirmation && confNumber == 1)
                        this._sendTxEventHandler.confirmation(receipt);                
                });
                return await promiEvent;
            }
        }
        catch(err) {

        }
        this.provider = currentProvider;
        return null;
    }
    signMessage(msg: string): Promise<string> {
        let _web3 = this._web3;
        let address = this.address;
        let self = this;
        let currentProvider = this.provider;
        if (typeof window !== "undefined" && this.clientSideProvider) {
            this.provider = this.clientSideProvider.provider;
        }
        let promise = new Promise<string>(async function(resolve, reject){
            try{
                let result;
                if (self.kms){
                	result = await self.kms.signMessage(self.chainId, _web3.utils.stringToHex(msg))
                	resolve(result);
                }
                else 
                if (self._account && self._account.privateKey){
                    result = await _web3.eth.accounts.sign(msg, self._account.privateKey);
                    resolve(result.signature);
                }
                else if (typeof window !== "undefined" && self.clientSideProvider){
                    result = await _web3.eth.personal.sign(msg, address, null);
                    resolve(result);
                }
                else {
                    result = await _web3.eth.sign(msg, address, null);
                    resolve(result);	
                }
            }	
            catch(err){
                reject(err);
            }
        })
        promise.finally(() => {
            this.provider = currentProvider;
        })
        return promise;
    };
    async signTransaction(tx: any, privateKey?: string): Promise<string>{
        let _web3 = this._web3;  
        // let gasPrice = tx.gasPrice ||  _web3.utils.numberToHex(await _web3.eth.getGasPrice());     	
        let gas = tx.gas || await _web3.eth.estimateGas({
            from: this.address,				
            to: tx.to,
            data: tx.data,
        })		
        let gasLimit = tx.gasLimit || gas;				
        let nonce = tx.nonce || await _web3.eth.getTransactionCount(this.address);
        if (privateKey || (this._account && this._account.privateKey)){
            let signedTx = await _web3.eth.accounts.signTransaction(<any>{
                nonce: nonce,
                // gasPrice: gasPrice,
                gas: gas,
                gasLimit: gasLimit,
                data: tx.data,
                from: this.address,
                to: tx.to
            }, privateKey?privateKey:this._account.privateKey);
            return signedTx.rawTransaction;
        }
        else if (this._account && this._account.kms){	
        	let chainId = await this.getChainId();
        	let txHash = await this.kms.signTransaction(chainId, tx);
        	return txHash;
        }
        else{
            let t = await _web3.eth.signTransaction(<any>{
                from: this.address,
                nonce: nonce,
                // gasPrice: gasPrice,
                gasLimit: gasLimit,
                gas: gas,
                to: tx.to,
                data: tx.data
            }, this.address);
            return t.raw;
        }
    }
    signTypedDataV4(data: TypedMessage<MessageTypes>): Promise<string> {
        let self = this;
        let currentProvider = this.provider;
        let promise;
        if (typeof window !== "undefined" && this.clientSideProvider) {
            this.provider = this.clientSideProvider.provider;
            promise = new Promise<string>(async (resolve, reject) => {
                try {
                    ((<any>self._web3.currentProvider)).send({
                        jsonrpc: "2.0",
                        method: 'eth_signTypedData_v4',
                        params: [
                            self.defaultAccount,
                            JSON.stringify(data)
                        ],
                        id: Date.now()
                    }, function (err: Error, result: any) {
                        if (err)
                            return reject(err);
                        if (result.error)
                            return reject(result.error);
                        let signature = result.result;
                        resolve(signature);
                    });		
                } catch (e) {
                    reject(e);
                }
            });
            promise.finally(() => {
                this.provider = currentProvider;
            })
        }
        else {
            promise = new Promise<string>(async (resolve, reject) => {
                try {
                    let signature = signTypedDataWithPrivateKey({
                        privateKey: this._account.privateKey,
                        data: data,
                        version: SignTypedDataVersion.V4
                    });
                    resolve(signature);
                } catch (e) {
                    reject(e);
                }
            });
        }
        return promise;
    }	
    recoverTypedSignatureV4(data: TypedMessage<MessageTypes>, signature: string): string {
        let signer = recoverTypedSignature({
            signature: signature,
            data: data,
            version: SignTypedDataVersion.V4
        })
        signer = this._web3.utils.toChecksumAddress(signer);
        return signer;
    }	
}