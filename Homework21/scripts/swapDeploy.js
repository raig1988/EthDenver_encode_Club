const {ethers} = require("hardhat");

const swapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

async function main() {
    // const mockOracleFactory = await ethers.getContractFactory("MockOracle")
    // mockOracle = await mockOracleFactory.connect(deployer).deploy(linkToken.address)
    const accounts = await ethers.getSigners()
    const deployer = accounts[0]
    const SwapUniFactory = await ethers.getContractFactory("SwapUni");
    console.log("Deploying contract...")
    const swapUni = await SwapUniFactory.connect(deployer).deploy(swapRouterAddress);
    await swapUni.deployed();
    console.log(`Deployed contract to ${swapUni.address}`);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })