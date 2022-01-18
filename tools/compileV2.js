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

let _libMap;
let _sourceDir;

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

function getCache(version) {
    let files = fs.readdirSync(SolcjsPath);
    files = files.filter(e => new RegExp(`soljson-v${version}\\+commit.[0-9a-f]{8}.js`).test(e));
    return (files && files.length == 1) ? (path.resolve(SolcjsPath, files[0])) : null;
}
async function downloadSolc(version) {
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
async function getSolc(version) {
  let solcjsPath = getCache(version);
  if (!solcjsPath) {
    solcjsPath = await downloadSolc(version);
  }
  if (!solcjsPath) {
    return null;
  }
  let solc = solcWrapper(require(solcjsPath));
  return solc;
}

function recursiveAdd(root, srcPath, sources, exclude) {
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
                if ((!exclude || !exclude.includes(_path)))
                    sources[_path.replace(root,'contracts/')] = { content: fs.readFileSync(path.resolve(currPath, files[i]), "utf8") };
            }
        }
    }
    for (let i = 0; i < files.length; i++) {
        if (stats[i].isDirectory()) {
            recursiveAdd(root, path.join(srcPath, files[i]), sources, exclude);
        }
    }
    return sources;
}
function buildInput(root, source, optimizerRuns, exclude) {
    let input = {
        language: "Solidity",
        sources: {},
        settings:
        {
            // remappings: [ ":g=./contracts" ],
            optimizer: {
                enabled: true,
                runs: optimizerRuns || 999999
            },
            // evmVersion: "istanbul",//"constantinople",//"byzantium",
            outputSelection: {
                "*": {
                    "*": ["abi", "evm", "evm.bytecode", "evm.bytecode.object"]
                }
            }
        },
    };
    if (source && Array.isArray(source)){
        source.forEach(e=>recursiveAdd(root, e, input.sources, exclude));
    } else {
        recursiveAdd(root, "", input.sources, exclude);
    }
    return input;
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

    for (let prefix in _libMap) {
        if (path.startsWith(prefix)) {
            let sourceDir = _sourceDir;
            if (sourceDir.endsWith(".sol")) {
                sourceDir = sourceDir.replace(/[a-zA-Z0-9_-]+\.sol$/, "");
            }
            let targetList = _libMap[prefix];
            if (!Array.isArray(targetList)) targetList = [targetList];
            for (let j = 0; j < targetList.length; j++) {
                let target = path.replace(prefix, sourceDir + targetList[j]);
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

function prettyPrint1(s) {
    let i = 0;
    return s.split('').map(e => {
        if (e == '[') i++; else if (e == ']') i--;
        return i == 0 ? e == "{" ? "{\n  " : e == "," ? ",\n  " : e == "}" ? "\n}" : e : e;
    }).join('');
}
function processOutput(sourceDir, output, binOutputDir, libOutputDir, include) {
    let index = '';
    if (output.contracts) {
        for (let i in output.contracts) {
            if (include && !include.includes(i.replace(/^contracts\//,'')))
                continue;

            let p = path.dirname(i.replace(/^contracts\//,''));
            p = p=='.' ? '' : (p + '/');

            for (let j in output.contracts[i]) {
                let bytecode = output.contracts[i][j].evm?.bytecode?.object;
                if (bytecode && output.contracts[i][j].abi && output.contracts[i][j].abi.length){
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
    }
    return index;
}

async function main(version, optimizerRuns, sourceDir, binOutputDir, libOutputDir, customSettings, libMap) {
    if (!sourceDir.endsWith('/') && !sourceDir.endsWith('.sol'))
        sourceDir = sourceDir + '/';
    if (!binOutputDir)
        binOutputDir = path.join(sourceDir, 'bin');
    if (!libOutputDir)
        libOutputDir = sourceDir;
    fs.mkdirSync(SolcjsPath, { recursive: true });
    fs.mkdirSync(path.join(RootPath, binOutputDir), { recursive: true });
    fs.mkdirSync(path.join(RootPath, libOutputDir), { recursive: true });
    customSettings = JSON.parse(customSettings || "[]");
    _libMap = JSON.parse(libMap || "{}");
    try {
        let solc = await getSolc(version);
        let customSources = customSettings && customSettings.map(e=>e.sources.map(f=>e.root+f)).reduce((a,b)=>a.concat(b),[]);
        _sourceDir = sourceDir;
        let input = buildInput(sourceDir, null, optimizerRuns, customSources);
        let output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));
        let index = processOutput(sourceDir, output, binOutputDir, libOutputDir);
        if (output.errors) {
            output.errors/*.filter(e=>e.severity!='warning')*/.forEach(e => console.log(e.formattedMessage));
        }

        if (customSettings) {
            for (let s in customSettings) {
                if (customSettings[s].version && customSettings[s]!=version) {
                    solc = await getSolc(customSettings[s].version);
                }
                _sourceDir = customSettings[s].root;
                input = buildInput(customSettings[s].root, customSettings[s].sources, customSettings[s].optimizerRuns)
                output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));
                index = index + processOutput(sourceDir, output, binOutputDir, libOutputDir, customSources);
                if (output.errors) {
                    output.errors/*.filter(e=>e.severity!='warning')*/.forEach(e=>console.log(e.formattedMessage));
                }
            }
        }
        fs.writeFileSync(libOutputDir + '/index.ts', index);

    } catch (e) { console.log(e) }
}

if (process.argv.length < 6) {
    return console.log("Usage: node compile.js <version> <optimizer_runs> <src_dir> <out_dir> [<custom_settings> [<lib_map>]]\ne.g.: node tools/compile.js 0.6.11 999999 contracts  bin/contracts src/contracts \"[{\\\"sources\\\":[\\\"contracts/HugeContract.sol\\\"], \\\"optimizerRuns\\\":10000}]\"")
}
main(process.argv[2], parseInt(process.argv[3]), process.argv[4], process.argv[5], process.argv[6], process.argv[7], process.argv[8]);
