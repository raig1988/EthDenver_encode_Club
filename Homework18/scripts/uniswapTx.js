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