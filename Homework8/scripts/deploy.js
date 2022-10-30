// imports
const { ethers } = require("hardhat")

// async main
async function main() {
  const VolcanoCoinFactory = await ethers.getContractFactory("VolcanoCoin")
  console.log("Deploying contract...")
  const volcanoCoin = await VolcanoCoinFactory.deploy()
  await volcanoCoin.deployed()
  console.log(`Deployed contract to ${volcanoCoin.address}`)
}

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
