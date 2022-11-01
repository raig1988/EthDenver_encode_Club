const {ethers, run, network} = require("hardhat")

async function main() {
    const VolcanoNftFactory = await ethers.getContractFactory("VolcanoNFT")
    console.log("Deploying contract...")
    const volcanoNft = await VolcanoNftFactory.deploy()
    await volcanoNft.deployed()
    console.log(`Deployed contract to ${volcanoNft.address}`)
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block txes...")
        await volcanoNft.deployTransaction.wait(6)
        await verify(volcanoNft.address, [])
    }
}

async function verify(contractAddress, args) {
    console.log("Verifying contract")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: argsm
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(error)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });