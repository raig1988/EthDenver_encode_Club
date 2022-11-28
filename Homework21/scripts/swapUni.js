const { ethers } = require("hardhat");
const ERC20ABI = require("../abi.json");


const ALCHEMY_MAINNET_API_KEY = process.env.ALCHEMY_MAINNET_API_KEY;
const PROVIDER = new ethers.providers.JsonRpcProvider(ALCHEMY_MAINNET_API_KEY);
const swapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

const TOKEN_IN = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const AMOUNT_IN = ethers.utils.parseUnits("100");
const AMOUNT_TO_APPROVE = ethers.utils.parseUnits("1000");

async function main() {
    // get Binance account
    const binanceAccount = await ethers.getImpersonatedSigner("0xDFd5293D8e347dFe59E90eFd55b2956a1343963d");
    // check binance ETH balance
    const ethBalance = await binanceAccount.getBalance();
    console.log(`Binance has ${ethers.utils.formatEther(ethBalance)} ETH`);
    // check binance DAI balance
    console.log("Getting DAI balance...");
    const daiContract = new ethers.Contract(TOKEN_IN, ERC20ABI, binanceAccount);
    const daiBalance = await daiContract.balanceOf(binanceAccount.address);
    console.log(`Balance ${ethers.utils.formatEther(daiBalance.toString())} DAI`);
    // get swap contract 
    const SwapUniFactory = await ethers.getContractFactory("SwapExamples");
    console.log("Deploying contract...");
    const swapUni = await SwapUniFactory.connect(binanceAccount).deploy(swapRouterAddress);
    await swapUni.deployed();
    console.log("Contract deployed...");
    // Approving swap Router to spend tokens
    console.log("Approving swap router to spend tokens...");
    const swapApproval = await daiContract.connect(binanceAccount).approve(swapRouterAddress, AMOUNT_TO_APPROVE);
    await swapApproval.wait(1);
    console.log(`Amount ${ethers.utils.formatEther(AMOUNT_TO_APPROVE)} DAI approved!`)
    console.log(`Making swap of ${ethers.utils.formatEther(AMOUNT_IN)}...`);
    const swapTx = await swapUni.connect(binanceAccount).swapExactInputSingle(AMOUNT_IN);
    await swapTx.wait(1);
    console.log("Swap done!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
/*
raig1988@LAPTOP-ON870AO6:~/EthDenver_encodeClub/Homework21$ yarn hardhat run scripts/swapUni.js
yarn run v1.22.19
warning package.json: No license field
$ /home/raig1988/EthDenver_encodeClub/Homework21/node_modules/.bin/hardhat run scripts/swapUni.js
Binance has 79256.431796656037321827 ETH
Getting DAI balance...
Balance 2800876.98306417 DAI
Deploying contract...
Contract deployed...
Approving swap router to spend tokens...
Amount 1000.0 DAI approved!
Making swap of 100.0...
Error: VM Exception while processing transaction: reverted with reason string 'STF'
    at SwapExamples.safeTransferFrom (@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol:21)
    at SwapExamples.swapExactInputSingle (contracts/SwapExamples.sol:40)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at HardhatNode._mineBlockWithPendingTxs (/home/raig1988/EthDenver_encodeClub/Homework21/node_modules/hardhat/src/internal/hardhat-network/provider/node.ts:1802:23)
    at HardhatNode.mineBlock (/home/raig1988/EthDenver_encodeClub/Homework21/node_modules/hardhat/src/internal/hardhat-network/provider/node.ts:491:16)
    at EthModule._sendTransactionAndReturnHash (/home/raig1988/EthDenver_encodeClub/Homework21/node_modules/hardhat/src/internal/hardhat-network/provider/modules/eth.ts:1522:18)
    at HardhatNetworkProvider.request (/home/raig1988/EthDenver_encodeClub/Homework21/node_modules/hardhat/src/internal/hardhat-network/provider/provider.ts:118:18)
    at EthersProviderWrapper.send (/home/raig1988/EthDenver_encodeClub/Homework21/node_modules/@nomiclabs/hardhat-ethers/src/internal/ethers-provider-wrapper.ts:13:20)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
*/
