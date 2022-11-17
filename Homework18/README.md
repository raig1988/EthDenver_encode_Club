# Homework 18
## 1. See if you can listen to the mempool using ether.js (or similar web3.py etc)
```solidity
const {ethers} = require("hardhat");
require("dotenv").config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

async function listenMempool() {
    var customWsProvider = new ethers.providers.WebSocketProvider(ALCHEMY_API_KEY);

    customWsProvider.on("pending", (tx) => {
    customWsProvider.getTransaction(tx)
        .then(function (transaction) {
            console.log(transaction);
        });
    });
}

listenMempool()
```
## 2. Can you find a way to filter your mempool listener and get only uniswap transactions?
```solidity
const {ethers} = require("hardhat");
require("dotenv").config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const customWsProvider = new ethers.providers.WebSocketProvider(ALCHEMY_API_KEY);
const uniswapRouterV3Address = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

async function uniswapTxs() {
    customWsProvider.on("pending", async(tx) => {
        const txInfo = await customWsProvider.getTransaction(tx);
        try {
            if(txInfo.to == uniswapRouterV3Address) {
                console.log(txInfo);
            }
        } catch {
            console.log("No data to show");
        }
    })
};

uniswapTxs()
    .catch((error) => {
        console.error(error);
    });
```
## 3. How might you mitigate MEV & front running if you were building your own Dapp?
## Have a look at the example sandwich bot and see how it works Repo.