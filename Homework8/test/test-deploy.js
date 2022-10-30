const {ethers} = require("hardhat")
const {assert, expect} = require("chai")

describe("VolcanoCoin", function() {
    let VolcanoCoinFactory, volcanoCoin
    beforeEach(async function() {
        VolcanoCoinFactory = await ethers.getContractFactory("VolcanoCoin")
        volcanoCoin = await VolcanoCoinFactory.deploy()
    })

    it("The total supply is initially 10000", async function() {
        const totalSupply = await volcanoCoin.totalSupply()
        const expectedValue = "10000"
        assert.equal(totalSupply.toString(), expectedValue)
    })

    it("That the total supply can be increased in 1000 token steps", async function() {
        const transactionResponse = await volcanoCoin.changeTotalSupply()
        await transactionResponse.wait(1)
        const newTotalSupply = await volcanoCoin.totalSupply()
        const expectedValue = "11000"
        assert.equal(newTotalSupply.toString(), expectedValue)
    })

    it("Only the owner of the contract can increase the supply", async function() {
        // get addresses from the node we are connected
        const [owner, addr1] = await ethers.getSigners();
        await expect(volcanoCoin.connect(addr1).changeTotalSupply()).to.be.revertedWith("Ownable: caller is not the owner")
        await expect(volcanoCoin.connect(owner).changeTotalSupply()).to.not.be.reverted
    })

})