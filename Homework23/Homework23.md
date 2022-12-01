Homework 23
1. Add pause functionlity to your Volcano contract.
- Open Zeppelin library usage: https://docs.openzeppelin.com/contracts/4.x/api/security#Pausable
- Useful explanation of pause modes: https://blog.logrocket.com/pause-functionality-secure-solidity-smart-contracts/
```solidity
// SPDX-License-Identifier: UNLICENSED

pragma solidity  ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract VolcanoCoin is Ownable, Pausable {
    
    uint256 public totalSupply = 10000; 

    constructor() {
        balances[msg.sender] = totalSupply;
    }

    struct Payment {
        uint256 transferAmount;
        address recipient;
    }

    event totalSupplyChanged(uint256);
    event tokenTransferred(uint256 amountTransferred, address recipient);

    mapping(address => uint256) public balances;
    mapping(address => Payment) paymentList;

    function viewPaymentRecords(address _user) public view returns (uint256, address) {
        return (paymentList[_user].transferAmount, paymentList[_user].recipient);
    }

    function recordPayment(address _user, address _receiver, uint256 _amount) internal {
        paymentList[_user] = Payment(_amount, _receiver);
    }

    function changeTotalSupply() public onlyOwner whenNotPaused {
        totalSupply = totalSupply + 1000;
        emit totalSupplyChanged(totalSupply);
    }

    function transferToken(uint256 _amount, address _recipient) public whenNotPaused {
        require(msg.sender.balance >= _amount);
        balances[msg.sender] -= _amount;
        balances[_recipient] += _amount; 
        recordPayment(msg.sender, _recipient, _amount);
        emit tokenTransferred(_amount, _recipient);
    }

    /** @notice allows owner to pause or unpause contract as required
    */


    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}

```
2. Write a simple function that will interact with the String Utils library. This function
should take in a String, and add the literal " from ETH Denver" and return the resulting
String and the length of the resulting String.
String Utils Library : https://github.com/Arachnid/solidity-stringutils/blob/master/src/strings.sol

## Explanation about strings handling in solidity
https://docs.soliditylang.org/en/v0.8.17/types.html?highlight=calldata#bytes-and-string-as-arrays
- Solidity does not have string manipulation functions, but there are third-party string libraries. You can also compare two strings by their keccak256-hash using keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked(s2)) and concatenate two strings using string.concat(s1, s2) - Reference to Solidity Documentation.

- Also the complete explanation for the use of the library can be seen here: https://github.com/Arachnid/solidity-stringutils.

```solidity
// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "https://github.com/Arachnid/solidity-stringutils/blob/master/src/strings.sol";

contract StringsLibrary {
    using strings for *;

    string phrase = " from Eth Denver";

    function concatenateString(string memory a) public view returns(string memory, uint256) {
        string memory concatenatedWord = a.toSlice().concat(phrase.toSlice());
        uint256 LengthOfConcatWord = concatenatedWord.toSlice().len();
        return (concatenatedWord, LengthOfConcatWord);
    }
}
```