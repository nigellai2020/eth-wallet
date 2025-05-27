const dependencies = require('./package.json').dependencies || {};
const packageName = require('./package.json').name;
const packName = require('./package.json').name;
const packVersion = require('./package.json').version;
const Fs = require('fs');

async function readFile(fileName) {
  return new Promise((resolve, reject) => {
    Fs.readFile(fileName, 'utf8', function (err, data) {
      if (err)
        reject(err)
      else
        resolve(data)
    })
  })
}

function convertExports(input) {
  return input.replace(/export\s*\{([^}]+)\}/, (match, group) => {
    const items = group.split(',').map(item => item.trim());
    const replacement = items.map(item => {
      if (item.includes(' as ')) {
        const [original, alias] = item.split(' as ').map(part => part.trim());
        return `exports.${alias} = ${original};`;
      } else {
        return `exports.${item} = ${item};`;
      }
    }).join('\n');
    return replacement;
  });
}

async function build() {
  let result = await require('esbuild').build({
    entryPoints: ['src/plugin.ts'],
    outdir: 'dist',
    bundle: true,
    minify: false,
    format: 'cjs',
    external: [
      ...Object.keys(dependencies)
    ],
    plugins: [],
  }).catch(() => process.exit(1));
  let plugin = await readFile('dist/plugin.js');
  let bignumber = await readFile('node_modules/bignumber.js/bignumber.js');
  let sha3 = await readFile('src/sha3.js');
  let nacl = await readFile('src/nacl.js');
  //   define("aws-sdk", ()=>{});
  // define("asn1.js", ()=>{});
  // define("bn.js", ()=>{});
  let content = `
var __defineAmdValue;
if (typeof(define) == 'function'){
  __defineAmdValue = define.amd;
  define.amd = null;
};
${bignumber}
${sha3}
${nacl}
define("ethereumjs-tx", ()=>{});
define("ethereumjs-util", ()=>{});
define("ethereum-cryptography/keccak", ()=>{});
define("bignumber.js", (require,exports)=>{
  exports['BigNumber'] = window["BigNumber"];
});
define("@ijstech/eth-wallet",(require, exports)=>{
${plugin}
});
if (typeof(define) == 'function')
  define.amd = __defineAmdValue;
`;
  Fs.writeFileSync('dist/plugin.js', content);
  Fs.renameSync('dist/plugin.js', 'dist/index.js');

  content = `
var __defineAmdValue;
if (typeof(define) == 'function'){
  __defineAmdValue = define.amd;
  define.amd = null;
};
if (typeof(define) == 'function')
  define.amd = __defineAmdValue;
`;
  Fs.writeFileSync('dist/scconfg.json', JSON.stringify({
    "name": packName,
    "version": packVersion,
    "type": "lib"
  }, null, 4));

  Fs.copyFileSync('node_modules/ethers/dist/ethers.js', 'dist/ethers.js');
  let ethers = await readFile('./dist/ethers.js');

  content = `
  define("ethers", (require,exports)=>{
  ${convertExports(ethers)}
  });
  `;
  Fs.writeFileSync('dist/ethers.js', content);
};
build();