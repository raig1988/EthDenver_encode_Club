const { ethers} = require("hardhat");

async function getBlockHeight() {
    const latestBlock = (await ethers.provider.getBlock("latest")).number
    console.log(latestBlock);
    // result "15970964"
}

getBlockHeight()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })