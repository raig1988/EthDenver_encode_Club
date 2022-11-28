// SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';
import "@openzeppelin/contracts/interfaces/IERC20.sol";

pragma solidity ^0.8.17;
pragma abicoder v2;

contract SwapUniFixed {

    ISwapRouter public immutable swapRouter;
    address public constant TOKEN_IN = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address public constant TOKEN_OUT = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    uint24 public constant FEE = 100;

    constructor(ISwapRouter _swapRouter) {
        swapRouter = _swapRouter;
    }

    function swap(uint256 _amountIn) external returns (uint _amountOut) {
        TransferHelper.safeTransferFrom(TOKEN_IN, msg.sender, address(this), _amountIn);
        TransferHelper.safeApprove(TOKEN_IN, address(swapRouter), _amountIn);
        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: TOKEN_IN,
                tokenOut: TOKEN_OUT,
                fee: FEE,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: _amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });
        _amountOut = swapRouter.exactInputSingle(params);
    }
}

//address uniswapv3Router = 0xE592427A0AEce92De3Edee1F18E0157C05861564;