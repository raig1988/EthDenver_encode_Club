const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("VolcanoNft", function () {
    let VolcanoNftFactory, volcanoNft;
    beforeEach(async function() {
        VolcanoNftFactory = await ethers.getContractFactory("VolcanoNft");
        volcanoNft = await VolcanoNftFactory.deploy();
    })

    it("Mint a new nft", async function() {
        const accounts = await ethers.getSigners();
        await expect(volcanoNft.connect(accounts[1]).safeMint(accounts[1].address, {value: ethers.utils.parseEther("0.01") })).to.not.be.reverted;
    })

    it("Transfer an NFT", async function() {
        const accounts = await ethers.getSigners();
        // get balance of nft
        const tokenId = await volcanoNft.connect(accounts[1]).balanceOf(accounts[1].address);
        const transactionResponse = await volcanoNft.connect(accounts[1]).safeMint(accounts[1].address, {value: ethers.utils.parseEther("0.01") });
        await transactionResponse.wait(1);
        await expect(volcanoNft.connect(accounts[1]).transferFrom(accounts[1].address, accounts[2].address, tokenId)).to.not.be.reverted;
    })
})