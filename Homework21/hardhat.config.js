require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
const ALCHEMY_MAINNET_API_KEY = process.env.ALCHEMY_MAINNET_API_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: ALCHEMY_MAINNET_API_KEY,
      }
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      //accounts: Given by hardhat
      chainId: 31337
    },
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
        1: 0, 
    },
  },
  solidity: { 
    compilers: [
      {
        version: "0.8.17"
      },
      {
        version: "0.8.0"
      },
      {
        version: "0.7.6"
      },
    ],
  },
};
