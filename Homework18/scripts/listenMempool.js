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

