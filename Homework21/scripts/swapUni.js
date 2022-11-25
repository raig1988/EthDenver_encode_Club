
const {ethers } = require("hardhat");

const abi = [
    "function swap(uint256 _approvalAmount, address _tokenIn, address _tokenOut, uint24 _fee, uint256 _amount) public returns (bool)",
];
const address = "0xB9d9e972100a1dD01cd441774b45b5821e136043";
ethers.providers.JsonRpcProvider()

async function main() {
    // get Binance account
    const binanceAccount = await ethers.getImpersonatedSigner("0xDFd5293D8e347dFe59E90eFd55b2956a1343963d");
    // get contract
    console.log("Getting Contract");
    const swapUni = await ethers.Contract(address, );
    // define parameters
    //(uint256 _approvalAmount, address _tokenIn, address _tokenOut, uint24 _fee, uint256 _amount)
    const amount = 100;
    const approvalAmount = amount * 2;
    const tokenIn = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // DAI
    const tokenOut = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // USDC
    const fee = 100;
    console.log("Making transaction...")
    const transaction = await swapUni.connect(binanceAccount).swap(approvalAmount, tokenIn, tokenOut, fee, amount);
    await transaction.wait(2);
    console.log(transaction);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })

