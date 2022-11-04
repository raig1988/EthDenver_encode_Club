const { ethers } = require("hardhat")

async function main() {
  const VolcanoNftFactory = await ethers.getContractFactory("VolcanoNft");
  console.log("Deploying contract...");
  const volcanoNft = await VolcanoNftFactory.deploy();
  await volcanoNft.deployed();
  console.log(`Deployed contract to ${volcanoNft.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })