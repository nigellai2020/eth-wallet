import 'mocha';
import {Wallet} from "../src";
import {Utils} from "../src";
import * as Ganache from "ganache";
import * as assert from 'assert';
import { TestWhitelistTree } from './contracts';

suite('##Wallet Ganache', async function() {
    this.timeout(20000);
    let rawData = [];
    let tree;
    let provider = Ganache.provider()
    let accounts: string[];
    const wallet = new Wallet(provider); 
    let whitelistTree: TestWhitelistTree;
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
    test('Create tree and set tree root', async function(){
        wallet.defaultAccount = accounts[0];
        tree = Utils.generateWhitelistTree(wallet, rawData, abi);
        whitelistTree = new TestWhitelistTree(wallet);
        let address = await whitelistTree.deploy();
        await whitelistTree.setMerkleRoot(tree.root);
    })

    test('Account 0: Verify tree Proof', async function(){
        wallet.defaultAccount = accounts[0];
        let proof = Utils.getWhitelistTreeProof(wallet, tree.root, rawData, abi);
        let valid = await whitelistTree.verifyMerkleProof({
            allocation: rawData[0].amount,
            proof: proof
        })
        assert.strictEqual(valid, true);
    })

    test('Account 1: Verify tree Proof', async function(){
        wallet.defaultAccount = accounts[1];
        let proof = Utils.getWhitelistTreeProof(wallet, tree.root, rawData, abi);
        let valid = await whitelistTree.verifyMerkleProof({
            allocation: rawData[1].amount,
            proof: proof
        })
        assert.strictEqual(valid, true);
    })
});