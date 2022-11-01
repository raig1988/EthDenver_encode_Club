const {ethers} = require("hardhat");
const {assert, expect} = require("chai");

describe("VolcanoNft", function() {
    let VolcanoNftFactory, volcanoNft
    beforeEach(async function() {
        VolcanoNftFactory = await ethers.getContractFactory("VolcanoNFT");
        volcanoNft = await VolcanoNftFactory.deploy();
    })
    
    it("Mint a new nft", async function() {
        const [owner, addr1] = await ethers.getSigners();
        const tokenId = 0;
        const transactionResponse = await volcanoNft.connect(owner).safeMint(addr1.address);
        await transactionResponse.wait(1);
    })

    it("Transfer an NFT", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const tokenId = 0;
        const transactionResponse = await volcanoNft.connect(owner).safeMint(addr1.address);
        await transactionResponse.wait(1);
        const sendNft = await volcanoNft.connect(addr1).transfer(addr1.address, addr2.address, tokenId)
        await sendNft.wait(1);
    })
})
