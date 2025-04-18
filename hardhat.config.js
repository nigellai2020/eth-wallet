/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
        port: 8545, // Default port (same as Ganache)
        chainId: 1337, // Default is 31337; use 1337 to match Ganache
        loggingEnabled: false, // Silent logging
        gas: "auto", // Gas settings
        gasPrice: "auto",
    },
  }
};