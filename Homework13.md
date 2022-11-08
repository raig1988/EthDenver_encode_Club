# Homework 13
## In preparation for tomorrows lesson, discuss in your teams secure approaches to random values in contracts

One approach to random values in a decentralized way would be to use a decentralized oracle like Chainlink.
> Chainlink VRF (Verifiable Random Function) is a provably fair and verifiable random number generator (RNG) that enables smart contracts to access random values without compromising security or usability. </br>
Reference: https://docs.chain.link/docs/vrf/v2/introduction/

You can get a random number by using a suscription (funded with LINK token) or a direct funding per transaction.
A random number can be generated directly by deploying a contract (example https://goerli.etherscan.io/address/0xdc4b5b1ff6ade59ef165305fddd6a7122ee0377f) or programatically by using 2 interface contracts like:
```solidity
    import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
    import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
``` 
in your own contract.


