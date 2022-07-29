import 'mocha';
import {Wallet} from "../src";
import {Utils} from "../src";
import * as Ganache from "ganache";
import * as assert from 'assert';

suite('##Wallet Ganache', async function() {
    this.timeout(20000);
    let rawData = [];
    let tree;
    let provider = Ganache.provider()
    let accounts: string[];
    const wallet = new Wallet(provider); 
    const abi = [
        {
            type: 'uint256',
            name: 'amount'
        }
    ]

    function randomInt(min: number, max: number) { 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    suiteSetup(async function(){
        accounts = await wallet.accounts; 
        console.log('accounts', accounts)
        for (let account of accounts) {
            rawData.push({
                account: account,
                amount: randomInt(1, 99999)       
            })
        }    
    })
    test('Create Tree', async function(){
        tree = Utils.generateWhitelistTree(wallet, rawData, abi);
        console.log('tree', tree);
    })

    test('Get Tree Proof', async function(){
        wallet.defaultAccount = accounts[0];
        console.log('wallet.address', wallet.address)
        let proof = Utils.getWhitelistTreeProof(wallet, tree.root, rawData, abi);
        console.log('proof', proof);
    })
});