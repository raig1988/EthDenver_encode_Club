// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

error Gas__Unauthorized();

contract GasContract {

    /* State variables */
    uint256 public totalSupply; // cannot be updated
    address[5] public administrators;
    address internal contractOwner;

    mapping(address => uint256) public whitelist;
    mapping(address => uint256) internal balances;
    mapping(address => Payment[]) internal payments;

    enum PaymentType {
        Unknown,
        BasicPayment,
        Refund,
        Dividend
    }

    struct Payment {
        PaymentType paymentType;
        address admin; // administrators address
        uint256 amount;
    }

    struct ImportantStruct {
        uint256 values; // max 3 digits
    }

    /* Events */
    event Transfer(address recipient, uint256 amount);

    /* Modifiers */

    modifier onlyAdminOrOwner() {
        if (msg.sender == contractOwner) {
            _;
        } else {
            revert Gas__Unauthorized();
        }
    }

    /* Functions  */

    constructor(address[] memory _admins, uint256 _totalSupply) {
        contractOwner = msg.sender;
        totalSupply = _totalSupply;
        balances[contractOwner] = _totalSupply;
        for (uint256 i = 0; i < administrators.length; i++) {
            administrators[i] = _admins[i];
            if (_admins[i] != contractOwner) {
                balances[_admins[i]] = 0;
            }
        }
    }

    function transfer(
        address _recipient,
        uint256 _amount,
        string memory/* _name*/
    ) public returns (bool) {
        balances[_recipient] += _amount;
        emit Transfer(_recipient, _amount);
        Payment memory payment;
        payments[msg.sender].push(payment);
        return true;
    }

    function updatePayment(
        address _user, // owner.address
        uint256 /*_ID*/, // 1
        uint256 _amount, // 302
        PaymentType _type // 3
    ) public onlyAdminOrOwner {
        for (uint256 i = 0; i < payments[_user].length; i++) {
            payments[_user][i].paymentType = _type;
            payments[_user][i].amount = _amount;
        }
    }

    function addToWhitelist(address _userAddrs, uint256 _tier) public {
        whitelist[_userAddrs] = _tier;
    }

    function whiteTransfer(
        address _recipient,
        uint256 _amount,
        ImportantStruct memory  /*_struct*/
    ) public {
        balances[msg.sender] = balances[msg.sender] - _amount + whitelist[msg.sender];
        balances[_recipient] = balances[_recipient] + _amount - whitelist[msg.sender];
    }

    function balanceOf(address _user) public view returns (uint256 balance_) {
        return balances[_user];
    }

    function getPayments(address _user) public view returns (Payment[] memory payments_) {
        return payments[_user];
    }

    function getTradingMode() public pure returns (bool) {
        return true;
    }
}
