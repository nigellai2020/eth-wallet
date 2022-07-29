# Installation and Testing
npm i

npm run build

npm test

# Integration with Smart Contract SDK
## Add a config file named `contracts.config.json` to your SDK 
Here's an example:
```
{
    "version": "0.6.12",
    "optimizerRuns": 200,
    "sourceDir": "contracts",
    "outputDir": "src/contracts",
    "outputObjects": "bytecode"
}
```

## Add a file for bundling the contracts
Create a file named `esbuild.bundle.js`

// TO DO: 

## Modify package.json
Add the `eth-wallet` package to `devDependencies`:
```
"@ijstech/eth-wallet": "<eth-wallet_url>"
```
Add the following entries to `scripts`
```
"build": "sol2ts contracts.config.json"
"build:lib": "tsc && node esbuild.bundle"
```
Convert the contracts from Solidity to TypeScript into `src`
```
npm run build
```
Compile the contracts from TypeScript into `lib` and `dist`
```
npm run build:lib
```