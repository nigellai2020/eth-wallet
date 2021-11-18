#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const solcWrapper = require("solc/wrapper");
const https = require('https');
const SolcjsPath = path.resolve(__dirname, 'solcjs');
const codeGen = require('./codeGen');
const RootPath = process.env.PWD;
/*
https://solc-bin.ethereum.org/bin/list.json
https://ethereum.github.io/solc-bin/bin/list.json
*/

const request = function(url){
    return new Promise(function(resolve, reject){
        https.get(url,function(res){
            let body = '';
            res.on('data', (chunk) => (body += chunk.toString()));
            res.on('error', reject);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode <= 299) {
                    resolve({ statusCode: res.statusCode, headers: res.headers, body: body });
                } else {
                    reject('Request failed. status: ' + res.statusCode + ', body: ' + body);
                }
            });
        });
    });
};

function recursiveAdd(root, srcPath, sources) {
    let currPath = path.join(root, srcPath);
    // signle file
    if (fs.statSync(currPath).isFile()) {
        sources[currPath.replace(root,'contracts/')] = { content: fs.readFileSync(currPath, "utf8") };
        return sources;
    }
    else if (fs.existsSync(path.join(currPath, '.ignoreAll')))
        return;

    let files = fs.readdirSync(currPath);
    let stats = files.map(e => fs.statSync(path.resolve(currPath, e)))
    for (let i = 0; i < files.length; i++) {
        if (files[i].endsWith(".sol") && stats[i].isFile()) {
            if (sources[files[i]]) {
                console.log(files[i] + " already exists");
            } else {
                let _path = path.join(root, srcPath, files[i]).replace(/\\/g, "/").replace(/^([A-Za-z]):/, "/$1");
                sources[_path.replace(root,'contracts/')] = { content: fs.readFileSync(path.resolve(currPath, files[i]), "utf8") };
            }
        }
    }
    for (let i = 0; i < files.length; i++) {
        if (stats[i].isDirectory()) {
            recursiveAdd(root, path.join(srcPath, files[i]), sources);
        }
    }
    return sources;
}
function buildInput(source) {
    let input = {
        language: "Solidity",
        sources: {},
        settings:
        {
            // remappings: [ ":g=./contracts" ],
            optimizer: {
                enabled: true,
                runs: 999999
            },
            // evmVersion: "istanbul",//"constantinople",//"byzantium",
            outputSelection: {
                "*": {
                    "*": ["abi", "evm", "evm.bytecode", "evm.bytecode.object"]
                }
            }
        },
    };
    recursiveAdd(source, "", input.sources);
    return input;
}
function getCache(version) {
    let files = fs.readdirSync(SolcjsPath);
    files = files.filter(e => new RegExp(`soljson-v${version}\\+commit.[0-9a-f]{8}.js`).test(e));
    return (files && files.length == 1) ? (path.resolve(SolcjsPath, files[0])) : null;
}
async function getSolc(version) {
    try {
        let data = await request("https://solc-bin.ethereum.org/bin/list.json");
        let list = JSON.parse(data.body)
        if (list) {
            let file = list.releases[version];
            if (file) {
                let build = list.builds.filter(e => e.path == file);
                if (build && build.length == 1) {
                    let filename = build[0].path;
                    let solcjs = await request("https://solc-bin.ethereum.org/bin/" + filename);
                    solcjs = solcjs.body;
                    let solcjsPath = path.resolve(SolcjsPath, filename);
                    fs.writeFileSync(solcjsPath, solcjs);
                    return solcjsPath;
                }
            }
        }
    } catch (e) { console.log(e) }
}
function findImports(path) {
    if (fs.existsSync(path)) {
        return {
            contents:
               fs.readFileSync(path, "utf8")
        }
    }

    let target = "node_modules/" + path;
    if (fs.existsSync(target)) {
        return {
            contents:
                fs.readFileSync(target, "utf8")
        }
    }

    for (let i in libMap) {
        if (path.startsWith(i)) {
            let _sourceDir = sourceDir;
            if (_sourceDir.endsWith(".sol")) {
                _sourceDir = _sourceDir.replace(/[a-zA-Z0-9_-]+\.sol$/, "");
            }
            let targetList = libMap[i];
            if (!Array.isArray(targetList)) targetList = [targetList];
            for (let j = 0; j < targetList.length; j++) {
                let target = path.replace(i, _sourceDir + targetList[j]);
                if (fs.existsSync(target)) {
                    return {
                        contents:
                            fs.readFileSync(target, "utf8")
                    }
                }
            }
        }
    }
    console.log("import contract not found: " + path);
}
async function main(version, sourceDir, binOutputDir, libOutputDir) {
    if (!sourceDir.endsWith('/') && !sourceDir.endsWith('.sol'))
        sourceDir = sourceDir + '/';
    if (!binOutputDir)
        binOutputDir = path.join(sourceDir, 'bin');
    if (!libOutputDir)
        libOutputDir = sourceDir;
    fs.mkdirSync(SolcjsPath, { recursive: true });
    fs.mkdirSync(path.join(RootPath, binOutputDir), { recursive: true });
    fs.mkdirSync(path.join(RootPath, libOutputDir), { recursive: true });
    try {
        let solcjsPath = getCache(version);
        if (!solcjsPath) {
            solcjsPath = await getSolc(version);
        }
        if (!solcjsPath) {
            return null;
        }
        let solc = solcWrapper(require(solcjsPath));
        let input = buildInput(sourceDir);
        let output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));
        function prettyPrint1(s) {
            let i = 0;
            return s.split('').map(e => {
                if (e == '[') i++; else if (e == ']') i--;
                return i == 0 ? e == "{" ? "{\n  " : e == "," ? ",\n  " : e == "}" ? "\n}" : e : e;
            }).join('');
        }
        if (output.contracts) {
            let index = '';
            for (let i in output.contracts) {
                let p = path.dirname(i.replace(/^contracts\//,''));
                p = p=='.' ? '' : (p + '/');
                for (let j in output.contracts[i]) {
                    let bytecode = output.contracts[i][j].evm?.bytecode?.object;
                    if (bytecode){
                        if (!fs.existsSync(binOutputDir + '/' + p))
                            fs.mkdirSync(binOutputDir + '/' + p, { recursive: true });
                            fs.writeFileSync(binOutputDir + '/' + p + j +  '.json', JSON.stringify({
                                abi: output.contracts[i][j].abi,
                                bytecode: bytecode
                            }, null, 4)
                        );
                        if (libOutputDir){
                            if (!fs.existsSync(libOutputDir + '/' + p))
                                fs.mkdirSync(libOutputDir + '/' + p, { recursive: true });
                            let relPath = path.relative(`/${libOutputDir}/${p}`,`/${binOutputDir}/${p}`);
                            if (relPath && relPath.indexOf('.') < 0)
                                relPath = './' + relPath;
                            let code = codeGen(j, relPath, output.contracts[i][j].abi);
                            fs.writeFileSync(libOutputDir + '/' + p + j +  '.ts', code);

                            index += `export { ${j} } from \'./${p + j}\';\n`;
                        }
                    }
                }
            }
            fs.writeFileSync(libOutputDir + '/index.ts', index);
        }
        if (output.errors) {
            output.errors/*.filter(e=>e.severity!='warning')*/.forEach(e => console.log(e.formattedMessage));
        }
    } catch (e) { console.log(e) }
}


if (process.argv.length < 4) {
    return console.log("Usage: node compile.js <version> <src_dir> <out_dir> <lib_dir> [<lib_map>]\ne.g.: node tools/compile.js 0.6.11 contracts bin/contracts src/contracts")
}
// node compile <version> <src_dir> <out_dir> <lib_dir>
main(process.argv[2], process.argv[3], process.argv[4], process.argv[5]);
