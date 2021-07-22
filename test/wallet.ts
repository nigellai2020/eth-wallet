import 'mocha';
import {Wallet} from "../src/wallet";
import * as assert from 'assert';

import {sleep} from '../src/utils';
const Config = require('./config').wallet;

suite('##Wallet', function() {    
    this.timeout(20000);
    const wallet = new Wallet(Config.provider, {address: '0x80E2fE38D90608b4Bc253C940dB372F44f290816', privateKey: 'd447c9ae6e1e19910a4035c8acfd0a7facdad2c86c7f42050a694bc25a8e66b1'});
    const kmsWallet = new Wallet(Config.provider, Config.account);
    const token = wallet.token('0xbe62ba98f5d671445ac19e22b7b99cd6c969fdc4');

    // test ('KMS address', async function(){
    //     await kmsWallet.initKMS();
    //     assert.strictEqual(kmsWallet.address, '0xf4a4e7add5bda8acc049fae3edd97ff90095c3d1');
    // });    
    // test ('KMS send ETH', async function(){
    //     let kmsBalance = await kmsWallet.balance;

    //     const wallet = new Wallet(Config.provider);
    //     wallet.privateKey = 'd447c9ae6e1e19910a4035c8acfd0a7facdad2c86c7f42050a694bc25a8e66b2'// address: 0x3E38C203a196b1bB1bb90016A984AD9578910896        
    //     let walletBalance = await wallet.balance;

    //     console.dir(`KSM Balance ${kmsWallet.address}: ${kmsBalance}`);
    //     console.dir(`Wallet Balance ${wallet.address}: ${walletBalance}`);
    //     let tx = await kmsWallet.send(wallet.address, 0.0001);        
    //     console.dir(tx);
    //     walletBalance = await wallet.balance;
    //     console.dir(`Wallet Balance ${wallet.address}: ${walletBalance}`);
    // })
    // return;
    test ('wallet.signMessage', async function(){
        let sig = await wallet.signMessage('hello');
        let verified = await wallet.verifyMessage(wallet.address, 'hello', sig);
        assert.strictEqual(verified, true);
    })    
    test('set private key, check address', async function() {
        const wallet = new Wallet(Config.provider);
        wallet.privateKey = 'd447c9ae6e1e19910a4035c8acfd0a7facdad2c86c7f42050a694bc25a8e66b1'
        assert.strictEqual(wallet.address, '0x80E2fE38D90608b4Bc253C940dB372F44f290816');
    });
    test('wallet.balance', async function() {
        const wallet = new Wallet(Config.provider);
        wallet.privateKey = 'd447c9ae6e1e19910a4035c8acfd0a7facdad2c86c7f42050a694bc25a8e66b1'
        let balance = await wallet.balance;
        assert.strictEqual(balance.eq(0.11), true);
    });
    test('wallet.send 0xefffE5b341471ff7002f2a38f8eC31cBfE11b9FD => 0x3E38C203a196b1bB1bb90016A984AD9578910896', async function() {        
        const wallet1 = new Wallet(Config.provider);
        wallet1.privateKey = 'd447c9ae6e1e19910a4035c8acfd0a7facdad2c86c7f42050a694bc25a8e66b2'// address: 0x3E38C203a196b1bB1bb90016A984AD9578910896
        const wallet2 = new Wallet(Config.provider);
        wallet2.privateKey = 'd447c9ae6e1e19910a4035c8acfd0a7facdad2c86c7f42050a694bc25a8e66b3' //address: 0xefffE5b341471ff7002f2a38f8eC31cBfE11b9FD
        let balance1 = await wallet1.balance;
        let balance2 = await wallet2.balance;
        let balance = balance1.plus(0.00001);
        await wallet2.send(wallet1.address, 0.00001);
        balance1 = await wallet1.balance;
        balance2 = await wallet2.balance;
        assert.strictEqual(balance1.eq(balance), true);        
    });    
    test("token.name = OpenSwap", async function(){ 
        assert.strictEqual(await token.name, 'OpenSwap');
    })
    test("token.decimals = 18", async function(){ 
        assert.strictEqual(await token.decimals, 18);
    })
    test("token.totalSupply = 10000", async function(){ 
        let totalSupply = await token.totalSupply;        
        assert.strictEqual(totalSupply.eq(10000), true);
    })
    test("token.balance = 0.11", async function(){
        let balance = await token.balance;
        assert.strictEqual(balance.eq(0.11), true);
    })
    test("token.balanceOf('0x80E2fE38D90608b4Bc253C940dB372F44f290816')", async function(){ 
        //https://kovan.etherscan.io/token/0xbe62ba98f5d671445ac19e22b7b99cd6c969fdc4?a=0x80E2fE38D90608b4Bc253C940dB372F44f290816
        let balance = await token.balanceOf('0x80E2fE38D90608b4Bc253C940dB372F44f290816');
        assert.strictEqual(balance.eq(0.11), true);
    })
    let txHash = '';
    test("token.transfer", async function(){ 
        const wallet1 = new Wallet(Config.provider);
        wallet1.privateKey = 'd447c9ae6e1e19910a4035c8acfd0a7facdad2c86c7f42050a694bc25a8e66b2'// address: 0x3E38C203a196b1bB1bb90016A984AD9578910896
        const wallet2 = new Wallet(Config.provider);
        wallet2.privateKey = 'd447c9ae6e1e19910a4035c8acfd0a7facdad2c86c7f42050a694bc25a8e66b3' //address: 0xefffE5b341471ff7002f2a38f8eC31cBfE11b9FD

        let token1 = wallet1.token('0xbe62ba98f5d671445ac19e22b7b99cd6c969fdc4');
        let token2 = wallet2.token('0xbe62ba98f5d671445ac19e22b7b99cd6c969fdc4');
        let balance1 = await token1.balance;
        let balance2 = await token2.balance;
        let balance = balance1.plus(0.0001);
        let tx = await token2.transfer(wallet1.address, 0.0001);
        txHash = tx.transactionHash;
        assert.strictEqual(balance.eq(await token1.balance), true);
    })
    test("token.events", async function(){
        let block = await wallet.getBlockNumber();        
        let events = await token.scanEvents(block - 10, block, ['Transfer']);
        let event = events.find(event => event.transactionHash == txHash);
        assert.strictEqual(event.data.from, '0xefffE5b341471ff7002f2a38f8eC31cBfE11b9FD');
        assert.strictEqual(event.data.to, '0x3E38C203a196b1bB1bb90016A984AD9578910896');
    })
})