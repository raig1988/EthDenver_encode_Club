# Homework 20
Make sure you have completed homework 17 and know how to create a fork of mainnet.
Interacting with Uniswap
## We will do this in 2 stages
1. Write some unit tests that will interact with Uniswap
2. Use those tests to create a contract to interact with Uniswap.
## Today we will just do the first stage.
1. Make a fork of main net in the IDE that you prefer.
2. Impersonate an account such as the Binance account that has a lot of DAI.
3. Write a unit test to call the swapExactInputSingle function in the Uniswap router.
1. Swap DAI for USDC
```solidity
const {ethers} = require("hardhat");
const {expect, assert} = require("chai")
const { abi: SwapRouterABI } = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json");
const { abi: IUniswapV3PoolAbi } = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
const ERC20ABI = [
    "function name() view returns (string)",
    "function symbol() view returns(string)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address) view returns (uint)",
    "function approve(address, uint) external returns (bool)"
]

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const customWsProvider = new ethers.providers.JsonRpcProvider(ALCHEMY_API_KEY);
const poolAddress = "0x5777d92f208679DB4b9778590Fa3CAB3aC9e2168"  // DAI - USDC
const swapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
// tokens
const name0 = "Dai Stablecoin";
const symbol0 = "DAI";
const decimals0 = 18;
const address0 = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const name1 = "USD Coin";
const symbol1 = "USDC";
const decimals1 = 6;
const address1 = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const binanceAccountAddress = "0xDFd5293D8e347dFe59E90eFd55b2956a1343963d";

describe("Uniswap", async function() {
    let binanceAccount, tokenContract0, tokenContract1, poolContract, token0, token1, fee, swapRouterContract, amountIn, approvalAmount, params;
    beforeEach(async function() {
        // get binance account
        binanceAccount = await ethers.getImpersonatedSigner(binanceAccountAddress);
        // get Dai Balance for binance
        tokenContract0 = new ethers.Contract(address0, ERC20ABI, customWsProvider);
        tokenContract1 = new ethers.Contract(address1, ERC20ABI, customWsProvider);
        // Connect to uniswap contracts
        poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolAbi, customWsProvider);
        token0 = await poolContract.token0();
        token1 = await poolContract.token1();
        fee = await poolContract.fee();
        swapRouterContract = new ethers.Contract(swapRouterAddress, SwapRouterABI, customWsProvider);
        amountIn = ethers.utils.parseEther("100");
        approvalAmount = (amountIn + 1).toString();
        let approvalTx = await tokenContract0.connect(binanceAccount).approve(swapRouterAddress, approvalAmount);
        params = {
            tokenIn: token0,
            tokenOut: token1,
            fee: fee,
            recipient: binanceAccountAddress,
            deadline: Math.floor(Date.now() / 1000) + (60 * 10),
            amountIn: amountIn,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0,
        }
    })

    describe("Initial balances", async function() {
        it("DAI and USDC balances", async function() {
            await expect(tokenContract0.connect(binanceAccount).balanceOf(binanceAccountAddress)).to.not.be.reverted;
            await expect(tokenContract1.connect(binanceAccount).balanceOf(binanceAccountAddress)).to.not.be.reverted;
        })
    })

    describe("Make swap", async function() {
        it("Swap between DAI and USDC", async function() {
            await expect(swapRouterContract.connect(binanceAccount).exactInputSingle(
                params, {gasLimit: ethers.utils.hexlify(1000000)}
            )).to.not.be.reverted;
        })
    })
    describe("After swap", async function() {
        it("Check that USDC final balance is more than initial balance", async function() {
            const usdcInitialBalance = await tokenContract1.connect(binanceAccount).balanceOf(binanceAccountAddress);
            const transaction = swapRouterContract.connect(binanceAccount).exactInputSingle(
                params, {gasLimit: ethers.utils.hexlify(1000000)}
            )
            const usdcFinalBalance = await tokenContract1.connect(binanceAccount).balanceOf(binanceAccountAddress);
            assert.isAbove(usdcFinalBalance, usdcInitialBalance);
        })
    })
})
```
</br>

2. Swap DAI for BUSD </br>
DAI for BUSD is a similar process. ABI for contract functions are the same. The only changes would be related to contract addreses and Uniswap pool address.

</br>

#### Main net details
- Uniswap V3 router address : 0xE592427A0AEce92De3Edee1F18E0157C05861564
- DAI stablecoin address : 0xE592427A0AEce92De3Edee1F18E0157C05861564
- Binance Account : 0xDFd5293D8e347dFe59E90eFd55b2956a1343963d
