# Homework 22
## Audit
### Imagine you have been given the following code to audit </br>
[Contract](https://github.com/ExtropyIO/SolidityBootcamp/blob/main/audit/DogCoinGame.sol) 
with the following note from the team :
</br>
"DogCoinGame is a game where players are added to the contract via the addPlayer
function, they need to send 1 ETH to play.
Once 200 players have entered, the UI will be notified by the startPayout event, and will
pick 100 winners which will be added to the winners array, the UI will then call the payout
function to pay each of the winners.
The remaining balance will be kept as profit for the developers."

### Write out the main points that you would include in an audit report.
The points to be considered on an audit are:

- Identification of the client
- Date
- Scope (list all files)
- Commit hash and repository address
- Bugs
- Audit Methodology
- Conclusion

The bugs that i have found on the code are related to the function visiblity and internal checks.
For example:
```solidity
    address payable[] public winners;

    function addWinner(address payable _winner) public {
        winners.push(_winner);
    }
```
Anyone can add their address into this function and be considered on the winners array.
This also happens with the payWinners function:
```solidity
    function payWinners(uint256 _amount) public {
        for (uint256 i = 0; i <= winners.length; i++) {
            winners[i].send(_amount);
        }
```
Here anyone can run this function putting any amount (when its less than the contracts balance) and get paid.
A solution for both functions would be to change visibility to internal. This way, any EOA or smart contract cannot run this function from outside the contract.
```solidity
    function addWinner(address payable _winner) internal {
        winners.push(_winner);
    }

    function payWinners(uint256 _amount) internal {
    for (uint256 i = 0; i <= winners.length; i++) {
        winners[i].transfer(_amount);
    }
```
Also, the compiler was telling us that the .send function was being ignored and it was required to change to transfer.
