require("dotenv").config();
const ethers  = require("ethers");

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

// Define an Alchemy provider
const provider = new ethers.providers.AlchemyProvider('goerli', ALCHEMY_API_KEY);

// Get contract ABI file
const contract = require("../artifacts/contracts/VolcanoNft.sol/VolcanoNft.json");
//console.log(JSON.stringify(contract.abi));

// create a signer
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);

// Get contract ABI and address
const abi = contract.abi;
const contractAddress = "0xC2BD02f7F5f5d6e9cC0Ea5a0d783Fc8D433c8447";

// create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer);

// get nft metadata ipfs url
const tokenUri = "https://gateway.pinata.cloud/ipfs/QmcSpQXN1MGm8geR4fW4Lr9DBVQntjX4NrCYN9NKYDa9WB"

// call safeMint function
const safeMint = async function () {
    let nftTxn = await myNftContract.safeMint(signer.address, tokenUri, {value: ethers.utils.parseEther("0.01")});
    await nftTxn.wait()
    console.log(`NFT minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`);
}

safeMint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 
