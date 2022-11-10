#!/usr/bin/env ts-node

/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';

import codeGen, {IUserDefinedOptions} from './codeGen';

const SolcjsPath = path.resolve(__dirname, 'solcjs');
const RootPath = process.env.PWD;

/*
https://solc-bin.ethereum.org/bin/list.json
https://ethereum.github.io/solc-bin/bin/list.json
*/

let _libMap: {[soource:string]:string|string[]};
let _sourceDir: string;

function request(url: string): Promise<{statusCode:number, headers:http.IncomingHttpHeaders, body:string}> {
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

function getCache(version: string): string {
    let files = fs.readdirSync(SolcjsPath).find(e => new RegExp(`soljson-v${version}\\+commit.[0-9a-f]{8}.js`).test(e));
    return files ? (path.resolve(SolcjsPath, files)) : null;
}
async function downloadSolc(version: string): Promise<string> {
    try {
        let data = await request("https://solc-bin.ethereum.org/bin/list.json");
        let list = JSON.parse(data.body);
        if (list) {
            let file = list.releases[version || list.latestRelease];
            if (file) {
                let build = list.builds.find(e => e.path == file);
                if (build) {
                    let filename = build.path;
                    let solcjs = await request("https://solc-bin.ethereum.org/bin/" + filename);
                    if (!fs.existsSync(SolcjsPath))
                        fs.mkdirSync(SolcjsPath, {recursive:true});
                    let solcjsPath = path.resolve(SolcjsPath, filename);
                    fs.writeFileSync(solcjsPath, solcjs.body);
                    return solcjsPath;
                }
            }
        }
    } catch (e) { console.log(e); }
}
async function getSolc(version: string): Promise<any> {
  let solcjsPath: string;
  if (version)
    solcjsPath = getCache(version);
  if (!solcjsPath) {
    solcjsPath = await downloadSolc(version);
  }
  if (!solcjsPath) {
    return null;
  }
  let solc = require("solc/wrapper")(require(solcjsPath));
  return solc;
}

interface Source {[contract:string]:{content:string}}
interface Input {language:string, sources:Source, settings:{optimizer?:{enabled:boolean, runs:number}, outputSelection:{[contract:string]:{[contract:string]:string[]}}}}

function recursiveAdd(root: string, srcPath: string, sources: Source, exclude: string[]): Source {
    let currPath = path.join(root, srcPath);
    // signle file
    if (fs.statSync(currPath).isFile()) {
        sources[currPath.replace(new RegExp(`^${root}`),'contracts/')] = { content: fs.readFileSync(currPath, "utf8") };
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
                    sources[_path.replace(new RegExp(`^${root}`),'contracts/')] = { content: fs.readFileSync(path.resolve(currPath, files[i]), "utf8") };
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
function buildInput(root: string, source: string[], optimizerRuns: number, exclude?: string[]): Input {
    let input = {
        language: "Solidity",
        sources: {},
        settings:
        {
            // remappings: [ ":g=./contracts" ],
            optimizer: optimizerRuns ? {
                enabled: true,
                runs: optimizerRuns || 999999
            } : undefined,
            // evmVersion: "istanbul",//"constantinople",//"byzantium",
            outputSelection: {
                "*": {
                    "*": ["abi", "evm", "evm.bytecode", "evm.bytecode.object"]
                }
            }
        },
    };
    if (source && Array.isArray(source) && source.length){
        source.forEach(e=>recursiveAdd(root, e, input.sources, exclude));
    } else {
        recursiveAdd(root, "", input.sources, exclude);
    }
    return input;
}

function findImports(path: string): {contents:string} {
    if (fs.existsSync(path.replace(/^contracts\//,_sourceDir))) {
        return {
            contents:
               fs.readFileSync(path.replace(/^contracts\//,_sourceDir), "utf8")
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

function prettyPrint(s: string): string {
    let j = 0;
    return s.split('').map(e => {
        if (e == '{') j++; else if (e == '}') j--;
        if (j == 1) {
            if (e == '{') return '{\n';
            else if (e == '[') return '[\n';
            else if (e == ',') return ',\n';
            else if (e == ']') return '\n]';
            else return e;
        } else if (j == 0) {
            if (e == '}') return '\n}';
            else return e;
        } else {
            return e;
        }
    }).join('');
}

interface Type { name: string; type: string; components?: Type[]; internalType?: string; }
interface Item { name: string; type: string; stateMutability: string; inputs?: Type[]; outputs?: Type[];}
interface Output {[sourceFile:string]:{[contract:string]:{evm:{bytecode:{object:string}},abi:Item[]}}}

function processOutput(sourceDir: string, output:Output, outputDir: string, outputObjects: string, exclude?: string[], include?: string[]): string {
    let index = '';
    if (output.contracts) {
        for (let i in output.contracts) {
            if (include && !include.includes(sourceDir+i.replace(/^contracts\//,'')))
                continue;
            if (exclude && exclude.includes(sourceDir+i.replace(/^contracts\//,'')))
                continue;

            let p = path.dirname(i.replace(/^contracts\//,''));
            p = p=='.' ? '' : (p + '/');

            for (let j in output.contracts[i]) {
                let abi = output.contracts[i][j].abi;
                let bytecode = output.contracts[i][j].evm?.bytecode?.object;
                if ((outputObjects && outputObjects.startsWith("force")) || (bytecode && abi && abi.length)) {
                    if (!fs.existsSync(outputDir + '/' + p))
                        fs.mkdirSync(outputDir + '/' + p, { recursive: true });

                    let file = {};
                    if (abi && abi.length) {
                        file["abi"] = abi;
                    }
                    let outputObjectsArr = outputObjects ? outputObjects.split(',') : [];
                    
                    let outputBytecode = bytecode && outputObjectsArr.includes("bytecode");
                    if (outputBytecode) {
                        file["bytecode"] = bytecode;
                    }
                    fs.writeFileSync(outputDir + '/' + p + j +  '.json.ts', "export default " + prettyPrint(JSON.stringify(file)));

                    let relPath = './';         
                    let hasBatchCall = outputObjectsArr.includes("batchcall");       
                    let options: IUserDefinedOptions = {
                        outputBytecode,
                        hasBatchCall
                    }
                    let code = codeGen(j, relPath, abi, options);
                    fs.writeFileSync(outputDir + '/' + p + j +  '.ts', code);

                    index += `export { ${j} } from \'./${p + j}\';\n`;
                }
            }
        }
    }
    return index;
}

interface CompileOptions { version?: string; optimizerRuns?: number; }
interface Override extends CompileOptions { root?:string, sources:string[]; };
interface Config extends CompileOptions {
    sourceDir?: string;
    outputDir?: string;
    output?: string;
    outputObjects?: string;
    overrides?: Override[];
    libMap?: {[soource:string]:string};
}

async function main(configPath: string) {
    let config:Config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    let {version, optimizerRuns, sourceDir, outputDir, outputObjects, overrides, libMap} = config;

    sourceDir = sourceDir || "contracts/";
    if (!sourceDir.endsWith('/') && !sourceDir.endsWith('.sol'))
        sourceDir = sourceDir + '/';
    if (!outputDir)
        outputDir = sourceDir;
    fs.mkdirSync(path.join(RootPath, outputDir), { recursive: true });

    _libMap = libMap;

    try {
        let solc = await getSolc(version);
        let root = sourceDir;
        _sourceDir = sourceDir;
        let customSources = overrides && overrides.map(e=>e.sources.map(f=>(e.root||root)+f)).reduce((a,b)=>a.concat(b),[]);
        let input = buildInput(sourceDir, null, optimizerRuns, customSources);
        let output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));
        let index = processOutput(sourceDir, output, outputDir, outputObjects, customSources);
        if (output.errors) {
            output.errors/*.filter(e=>e.severity!='warning')*/.forEach(e => console.log(e.formattedMessage));
        }

        if (overrides) {
            for (let s in overrides) {
                if (overrides[s].version && overrides[s].version!=version) {
                    solc = await getSolc(overrides[s].version);
                }
                _sourceDir = overrides[s].root || root;
                input = buildInput(_sourceDir, overrides[s].sources, overrides[s].optimizerRuns||optimizerRuns)
                output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));
                index = index + processOutput(sourceDir, output, outputDir, outputObjects, [], overrides[s].sources.map(f=>_sourceDir+f));
                if (output.errors) {
                    output.errors/*.filter(e=>e.severity!='warning')*/.forEach(e=>console.log(e.formattedMessage));
                }
            }
        }
        fs.writeFileSync(outputDir + '/index.ts', index);
    } catch (e) { console.log(e); }
}

main(process.argv[2] || "solidity.config.json");
