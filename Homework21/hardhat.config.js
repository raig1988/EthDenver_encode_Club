require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

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
    }
  },
  solidity: "0.8.17",
};
