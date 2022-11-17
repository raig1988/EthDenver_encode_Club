// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ShameCoin is ERC20, Ownable {

    // State variables
    uint256 public _totalSupply;
    address public admin;
    mapping(address => uint256) public _balances;
    mapping(address => bool) public approvals;

    constructor() ERC20("ShameCoin", "SHME") {
        admin = msg.sender;
    }

    /** @notice any user can mint tokens and update their balances
    */
    function mint(address _address, uint256 _amount) public {
        _mint(_address, _amount);
        _balances[msg.sender] += _amount;
        _totalSupply += _amount;
    }

    /** @notice user runs this function to authorize admin to transfer their tokens
     */
    function approveExpenditure() public returns (bool) {
        return approvals[msg.sender] = true; 
    }

    /** 
     * @notice function allows admin to transfer tokens to other accounts with pre authorization by users,
     * if transaction is not initiated by admin, user gets their balance increased by 1 token
     * @param "from" address is the account which is debited, "to" address is the receiver and the amount has to be equal to 1
     */
    function adminTransfer(address _from, address _to, uint _amount) public returns(bool) {
        if (msg.sender == admin) {
            require(approvals[_from] == true, "User has not authorized");
            require(_amount == 1, "You need to send 1 unit per tx");
            _balances[_from] -= _amount;
            _balances[_to] += _amount;
            _transfer(_from,_to, _amount);
            return true;
        }
        _balances[msg.sender] = _balances[msg.sender] + 1;
        _totalSupply += 1;
        return false;
    }

    /** @notice overrides inherited function and sets decimals to 0 
    */
    function decimals() public pure override returns (uint8) {
        return 0;
    }
}

