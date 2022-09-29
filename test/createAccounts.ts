import { Utils, Wallet } from "../src";
import fs from 'fs';

const abi = [
    {
        type: 'address',
        name: 'account'
    },
    {
        type: 'uint256',
        name: 'amount'
    },
    {
        type: 'uint256',
        name: 'amount2'
    },
    {
        type: 'string',
        name: 'ipfsCid'
    }
]

function randomInt(min: number, max: number) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

async function run() {
    let wallet = new Wallet();
    // let treeData = [];
    let data = fs.readFileSync("sample_accounts.json", "utf8");
    let treeData: any[] = JSON.parse(data);

    let myAccount = '0xb15E094957c31D6b0d08714015fF85Bec7842635';
    // for (let i = 0; i < 2; i++) {
    //     let account = wallet.createAccount();
    //     treeData.push({
    //         account: account.address,
    //         amount: randomInt(1, 99999999999999999).toFixed(),
    //         amount2: randomInt(1, 99999999999999999).toFixed(),
    //         ipfsCid: 'ABC' 
    //     });
    //     console.log('i', i);
    // }
    // treeData.push({
    //     account: myAccount,
    //     amount: randomInt(1, 99999999999999999).toFixed(),
    //     amount2: randomInt(1, 99999999999999999).toFixed(),
    //     ipfsCid: 'ABC' 
    // });
    console.log('treeData', treeData.length);
    let tree = Utils.generateMerkleTree(wallet, treeData, abi, "account");
    let index = 6;
    let proof = Utils.getMerkleProofByKey(tree, treeData[index].account);
    let root = tree.getHexRoot();
    console.log('root', root);
    // console.log('tree', tree.tree);
    console.log('proof', proof);
    let myData = {
        root: root,
        proof: proof
    };
    // fs.writeFileSync("sample_my_data2.json", JSON.stringify(myData, null, 2));
    // fs.writeFileSync("sample_accounts2.json", JSON.stringify(treeData, null, 2));
}

run();