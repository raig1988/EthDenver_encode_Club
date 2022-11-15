const {ethers} = require("hardhat");

// Get Vitalik account - address 0x220866B1A2219f40e72f5c628B65D54268cA3A9D
async function runBlockchain() {
    console.log("Before transfer...");
    console.log("-------------------------------------")
    const vitalikAccount = await ethers.getImpersonatedSigner("0x220866B1A2219f40e72f5c628B65D54268cA3A9D");
    const vitalikBalance = await vitalikAccount.getBalance();
    console.log("Vitalik balance :", vitalikBalance);
    // get team 16 account balance
    const team16Account = await ethers.getImpersonatedSigner("0x4f941092be009194CFef956800254A81F83bd71f");
    const team16AccountBalance = await team16Account.getBalance();
    console.log("team16 balance: ", team16AccountBalance);
    // transfer
    const transactionResponse = await vitalikAccount.sendTransaction(
        {to: team16Account.address,
        value: ethers.utils.parseEther("289000"),
        });
    console.log("Transferring...")
    await transactionResponse.wait(1);
    console.log("------------------------------------")
    console.log("New balances after transfer...")
    const newVitalikBalance = await vitalikAccount.getBalance();
    const newTeam16Balance = await team16Account.getBalance();
    console.log("Vitalik new balance: ", newVitalikBalance);
    console.log("team16 new balance: ", newTeam16Balance);

}

runBlockchain()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })