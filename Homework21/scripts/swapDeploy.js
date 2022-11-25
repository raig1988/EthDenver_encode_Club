const {ethers} = require("hardhat");

async function main() {
    const SwapUniFactory = await ethers.getContractFactory("SwapUni");
    console.log("Deploying contract...")
    const swapUni = await SwapUniFactory.deploy();
    await swapUni.deployed();
    console.log(`Deployed contract to ${swapUni.address}`);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })