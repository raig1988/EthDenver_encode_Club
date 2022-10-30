/* Homework 7
Adding more functionality to the Volcano Coin contract
. We made a payment mapping, but we havenʼt added all the functionality for it yet.
Write a function to view the payment records, specifying the user as an input.
What is the difference between doing this and making the mapping public ? */

// Its the same. Both are getter functions that return a public view.

/*
. For the payments record mapping, create a function called recordPayment that
takes
. the senderʼs address,
. the receiverʼs address and
. the amount
as an input, then creates a new payment record and adds the new record to the
userʼs payment record.
. Each time we make a transfer of tokens, we should call the this recordPayment
function to record the transfer.  */

// Updated contract

// SPDX-License-Identifier: UNLICENSED

pragma solidity  ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract VolcanoCoin is Ownable {
    
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

    function changeTotalSupply() public onlyOwner {
        totalSupply = totalSupply + 1000;
        emit totalSupplyChanged(totalSupply);
    }

    function transferToken(uint256 _amount, address _recipient) public {
        require(msg.sender.balance >= _amount);
        balances[msg.sender] -= _amount;
        balances[_recipient] += _amount; 
        recordPayment(msg.sender, _recipient, _amount);
        emit tokenTransferred(_amount, _recipient);
    }
}
