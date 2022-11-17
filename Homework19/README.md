# Homework 19
## Write a 'shame coin' contract
This will be similar to the ERC20 contract you have already written.
1. The shame coin needs to have an administrator address that is set in the constructor.
```solidity
    constructor() ERC20("ShameCoin", "SHME") {
        admin = msg.sender;
    }
```
2. The decimal places should be set to 0.
```solidity
    /** @notice overrides inherited function and sets decimals to 0 
    */
    function decimals() public pure override returns (uint8) {
        return 0;
    }
```
3. The administrator can send 1 shame coin at a time to other addresses (but keep the transfer function signature the same)
4. If non administrators try to transfer their shame coin, the transfer function will instead increase their balance by one.
5. Non administrators can approve the administrator (and only the administrator) to
spend one token on their behalf
6. The transfer from function should just reduce the balance of the holder.
```solidity
    /** 
     * @notice function allows admin to transfer tokens to other accounts with pre authorization by users,
     * if transaction is not initiated by admin, user gets their balance increased by 1 token
     * @param "from" address is the account which is debited, "to" address is the receiver and the amount has to be equal to 1
     */
    function adminTransfer(address _from, address _to, uint _amount) public returns(bool) {
        if (msg.sender == admin) {
            require(approvals[_from] == true, "User has not authorized");
            require(_amount == 1, "You need to send 1 unit per tx");
            _balances[_from] -= _amount;
            _balances[_to] += _amount;
            _transfer(_from,_to, _amount);
            return true;
        }
        _balances[msg.sender] = _balances[msg.sender] + 1;
        _totalSupply += 1;
        return false;
    }
```
7. Write unit tests to show that the functionality is correct.
```solidity
const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("ShameCoin", function() {
    let ShameCoinFactory, shameCoin, accounts;
    beforeEach(async function() {
        ShameCoinFactory = await ethers.getContractFactory("ShameCoin");
        shameCoin = await ShameCoinFactory.deploy();
        accounts = await ethers.getSigners();
        // mint tokens
        await shameCoin.connect(accounts[0]).mint(accounts[0].address, "100");
        // set approval to true for admin
        await shameCoin.connect(accounts[0]).approveExpenditure();
    })

    it("Check if admin is deployer", async function() {
        const admin = await shameCoin.admin();
        assert.equal(accounts[0].address.toString(), admin.toString());
    })

    it("Check if decimals are set to zero", async function() {
        const decimals = await shameCoin.decimals();
        assert.equal(decimals.toString(), "0");
    })

    it("Check if admin can sent 1 coin at a time", async function() {
        // get total supply
        const totalSupply = await shameCoin.totalSupply(); 
        assert.equal(totalSupply.toString(), "100");
        // send 1 token to account 1
        await expect(shameCoin.connect(accounts[0]).adminTransfer(accounts[0].address, accounts[1].address, "1")).to.not.be.reverted;
    })
    it("increase balance by 1 when no admin transfers", async function() {
        // transfer balance to account 1
        await shameCoin.connect(accounts[0]).adminTransfer(accounts[0].address, accounts[1].address, "1");
        // check balance for account 1 equal to 1
        const balanceAccount1 = await shameCoin._balances(accounts[1].address);
        assert.equal(balanceAccount1.toString(), "1");
        // try to transfer to account 2
        await shameCoin.connect(accounts[1]).adminTransfer(accounts[1].address, accounts[2].address, "1");
        // check balance of account 1 as 2
        const secondBalanceAccount1 = await shameCoin._balances(accounts[1].address);
        assert.equal(secondBalanceAccount1.toString(), "2");
    })

    it("check approvals of transfer to admin", async function() {
        // check first if state is set to false
        const statusApproval = await shameCoin.approvals(accounts[1].address);
        assert.equal(statusApproval.toString(), "false");
        // set approval to true
        await shameCoin.connect(accounts[1]).approveExpenditure();
        // check if approval is set to true
        const statusApprovalTrue = await shameCoin.approvals(accounts[1].address);
        assert.equal(statusApprovalTrue.toString(), "true");
    })

    it("transfer of admin and balance of holder reduced", async function() {
        // transfer from admin to account 1
        await shameCoin.connect(accounts[0]).adminTransfer(accounts[0].address, accounts[1].address, "1");
        // check balance of account 1 and should be equal to 1
        const balanceAcc1Moment0 = await shameCoin._balances(accounts[1].address);
        assert.equal(balanceAcc1Moment0.toString(), "1")
        // set approval to true
        await shameCoin.connect(accounts[1]).approveExpenditure();
        // transfer from account 1 to account 2 by admin
        await shameCoin.connect(accounts[0]).adminTransfer(accounts[1].address, accounts[2].address, "1");
        // check balance of account 2 and should be equal to 1
        const balanceAcc2 = await shameCoin._balances(accounts[2].address);
        assert.equal(balanceAcc2.toString(), "1");
        // check balance of account 1 and should be equal to 0
        const balanceAcc1Moment1 = await shameCoin._balances(accounts[1].address);
        assert.equal(balanceAcc1Moment1.toString(), "0");
    })
})
```
8. Document the contract with Natspec, and produce docs from this