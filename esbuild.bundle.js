const dependencies = require('./package.json').dependencies || {};
const packageName = require('./package.json').name;

const Fs = require('fs');
const { promises: fs } = require("fs")

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

async function buildWeb3Modal() {
  let web3modal = await readFile('./node_modules/web3modal/dist/index.js');
  let walletconnect = await readFile('./node_modules/@walletconnect/web3-provider/dist/umd/index.min.js');
  let content = `
${web3modal}
${walletconnect}
`;
  Fs.writeFileSync('./dist/web3modal.js', content);
};

async function build() {
  let result = await require('esbuild').build({
    entryPoints: ['src/index.ts'],
    outdir: 'dist',
    bundle: true,
    minify: false,
    format: 'cjs',
    external: [
      ...Object.keys(dependencies),
      'web3modal',
      '@walletconnect/web3-provider'
    ],
    plugins: [],
  }).catch(() => process.exit(1));
  let content = await readFile('dist/index.js');
  content = `define("aws-sdk", ()=>{});
define("asn1.js", ()=>{});
define("bn.js", ()=>{});
define("ethereumjs-tx", ()=>{});
define("ethereumjs-util", ()=>{});
define("web3", (require,exports)=>{
    exports['web3'] = window["Web3"];
});
define("bignumber.js", (require,exports)=>{
    exports['BigNumber'] = window["BigNumber"];
});
define("@ijstech/eth-wallet",(require, exports)=>{
${content}
});`

  Fs.writeFileSync('dist/index.js', content);
  await buildWeb3Modal();
};
build();