// Main net details
// Uniswap V3 router address : 0xE592427A0AEce92De3Edee1F18E0157C05861564
// DAI stablecoin address : 0xE592427A0AEce92De3Edee1F18E0157C05861564
// Binance Account : 0xDFd5293D8e347dFe59E90eFd55b2956a1343963d

const {ethers} = require("hardhat");

const { abi: SwapRouterABI } = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json");
const { abi: IUniswapV3PoolAbi } = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
const ERC20ABI = require("../abi.json");
const {getPoolImmutables, getPoolState} = require("../helpers.js");

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const customWsProvider = new ethers.providers.JsonRpcProvider(ALCHEMY_API_KEY);

const poolAddress = "0x5777d92f208679DB4b9778590Fa3CAB3aC9e2168"  // DAI - USDC
const swapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

const name0 = "Dai Stablecoin";
const symbol0 = "DAI";
const decimals0 = 18;
const address0 = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

const name1 = "USD Coin";
const symbol1 = "USDC";
const decimals1 = 6;
const address1 = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

const binanceAccountAddress = "0xDFd5293D8e347dFe59E90eFd55b2956a1343963d";

async function transactUniswap() {
    // get binance account
    const binanceAccount = await ethers.getImpersonatedSigner(binanceAccountAddress);
    // get Dai Balance for binance
    const tokenContract0 = new ethers.Contract(address0, ERC20ABI, customWsProvider);
    const daiBalance = await tokenContract0.connect(binanceAccount).balanceOf(binanceAccountAddress);
    // get USDC balance for binance
    const tokenContract1 = new ethers.Contract(address1, ERC20ABI, customWsProvider);
    const usdcBalance = await tokenContract1.connect(binanceAccount).balanceOf(binanceAccountAddress)
    console.log("Before transaction:")
    console.log("------------------------")
    console.log("DAI balance: ", ethers.utils.formatEther(daiBalance), "USDC balance: ", ethers.utils.formatUnits(usdcBalance, decimals1));

    // make a swap to UniswapV3 to call the swapExactInputSingle to swap DAI for BUSD
    const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolAbi, customWsProvider);
    const immutables = await getPoolImmutables(poolContract);
    const state = await getPoolState(poolContract);

    const swapRouterContract = new ethers.Contract(swapRouterAddress, SwapRouterABI, customWsProvider);

    const inputAmount = "100"
    const amountIn = ethers.utils.parseEther(inputAmount);

    const approvalAmount = (amountIn + 1).toString();
    await tokenContract0.connect(binanceAccount).approve(swapRouterAddress, approvalAmount);

    const params = {
        tokenIn: immutables.token0,
        tokenOut: immutables.token1,
        fee: immutables.fee,
        recipient: binanceAccountAddress,
        deadline: Math.floor(Date.now() / 1000) + (60 * 10),
        amountIn: amountIn,
        amountOutMinimum: 0,
        sqrtPriceLimitX96: 0,
    }

    const transaction = await swapRouterContract.connect(binanceAccount).exactInputSingle(
        params, {gasLimit: ethers.utils.hexlify(1000000)}
    ).then(transaction => {
        console.log(transaction);
    })

    const newDaiBalance = await tokenContract0.connect(binanceAccount).balanceOf(binanceAccountAddress);
    const newUsdcBalance = await tokenContract1.connect(binanceAccount).balanceOf(binanceAccountAddress);
    console.log("After transaction:");
    console.log("------------------------");
    console.log("DAI new balance: ", ethers.utils.formatEther(newDaiBalance), "USDC new balance: ", ethers.utils.formatUnits(newUsdcBalance, decimals1));

}

transactUniswap()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })

