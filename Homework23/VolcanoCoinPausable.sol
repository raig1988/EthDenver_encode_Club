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
