// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./Ownable.sol";

error Gas__Unauthorized();

contract Constants {
    uint256 internal tradeFlag = 1;
    uint256 internal basicFlag = 0;
    uint256 internal dividendFlag = 1;
}

contract GasContract is Ownable, Constants {
    uint256 public totalSupply = 0; // cannot be updated
    uint256 internal paymentCounter = 0;
    mapping(address => uint256) internal balances;
    uint256 internal tradePercent = 12;
    address internal contractOwner;
    uint256 internal tradeMode = 0;
    mapping(address => Payment[]) internal payments;
    mapping(address => uint256) public whitelist;
    address[5] public administrators;
    bool internal isReady = false;
    enum PaymentType {
        Unknown,
        BasicPayment,
        Refund,
        Dividend,
        GroupPayment
    }
    PaymentType constant defaultPayment = PaymentType.Unknown;

    History[] internal paymentHistory; // when a payment was updated

    struct Payment {
        PaymentType paymentType;
        uint256 paymentID;
        bool adminUpdated;
        string recipientName; // max 8 characters
        address recipient;
        address admin; // administrators address
        uint256 amount;
    }

    struct History {
        uint256 lastUpdate;
        address updatedBy;
        uint256 blockNumber;
    }
    uint256 wasLastOdd = 1;
    mapping(address => uint256) internal isOddWhitelistUser;
    struct ImportantStruct {
        uint256 values; // max 3 digits
    }

    mapping(address => ImportantStruct) internal whiteListStruct;

    event AddedToWhitelist(address userAddress, uint256 tier);

    modifier onlyAdminOrOwner() {
        if (checkForAdmin(msg.sender)) {
            _;
        } else if (msg.sender == contractOwner) {
            _;
        } else {
            revert Gas__Unauthorized();
        }
    }

    modifier checkIfWhiteListed(address sender) {
        if(msg.sender != sender) {
            revert Gas__Unauthorized();
        } 
        else {
            uint256 usersTier = whitelist[msg.sender];
            if (usersTier <= 0) {
                revert Gas__Unauthorized();
            } 
            else {
                if(usersTier >= 4) {
                    revert Gas__Unauthorized();
                } 
                _;
            }
        }
    }

    event supplyChanged(address indexed, uint256 indexed);
    event Transfer(address recipient, uint256 amount);
    event PaymentUpdated(
        address admin,
        uint256 ID,
        uint256 amount,
        string recipient
    );
    event WhiteListTransfer(address indexed);

    constructor(address[] memory _admins, uint256 _totalSupply) {
        contractOwner = msg.sender;
        totalSupply = _totalSupply;

        for (uint256 ii = 0; ii < administrators.length; ii++) {
            if (_admins[ii] != address(0)) {
                administrators[ii] = _admins[ii];
                if (_admins[ii] == contractOwner) {
                    balances[contractOwner] = totalSupply;
                } else {
                    balances[_admins[ii]] = 0;
                }
                if (_admins[ii] == contractOwner) {
                    emit supplyChanged(_admins[ii], totalSupply);
                } else if (_admins[ii] != contractOwner) {
                    emit supplyChanged(_admins[ii], 0);
                }
            }
        }
    }

    function getPaymentHistory()
        external
        payable
        returns (History[] memory paymentHistory_)
    {
        return paymentHistory_;
    }

    function checkForAdmin(address _user) internal view returns (bool admin_) {
        bool admin = false;
        for (uint256 ii = 0; ii < administrators.length; ii++) {
            if (administrators[ii] == _user) {
                admin = true;
            }
        }
        return admin;
    }

    function balanceOf(address _user) public view returns (uint256 balance_) {
        return balances[_user];
    }

    function getTradingMode() public view returns (bool mode_) {
        bool mode = false;
        if (tradeFlag == 1 || dividendFlag == 1) {
            mode = true;
        } else {
            mode = false;
        }
        return mode;
    }

    function addHistory(address _updateAddress, bool _tradeMode)
        internal
        returns (bool status_, bool tradeMode_)
    {
        History memory history;
        history.blockNumber = block.number;
        history.lastUpdate = block.timestamp;
        history.updatedBy = _updateAddress;
        paymentHistory.push(history);
        bool[] memory status = new bool[](tradePercent);
        for (uint256 i = 0; i < tradePercent; i++) {
            status[i] = true;
        }
        return ((status[0] == true), _tradeMode);
    }

    function getPayments(address _user)
        public
        view
        returns (Payment[] memory payments_)
    {
        if(_user == address(0)) {
            revert Gas__Unauthorized();
        } 
        else {
            return payments[_user];
        }
    }

    function transfer(
        address _recipient,
        uint256 _amount,
        string calldata _name
    ) public returns (bool status_) {
        if (balances[msg.sender] < _amount) {
            revert Gas__Unauthorized();
        } 
        else {
            if(bytes(_name).length >= 9) {
                revert Gas__Unauthorized();
            } 
            else {
                balances[msg.sender] -= _amount;
                balances[_recipient] += _amount;
                emit Transfer(_recipient, _amount);
                Payment memory payment;
                payment.admin = address(0);
                payment.adminUpdated = false;
                payment.paymentType = PaymentType.BasicPayment;
                payment.recipient = _recipient;
                payment.amount = _amount;
                payment.recipientName = _name;
                payment.paymentID = ++paymentCounter;
                payments[msg.sender].push(payment);
                bool[] memory status = new bool[](tradePercent);
                for (uint256 i = 0; i < tradePercent; i++) {
                    status[i] = true;
                }
                return (status[0] == true);
            }
        }
    }

    function updatePayment(
        address _user,
        uint256 _ID,
        uint256 _amount,
        PaymentType _type
    ) public onlyAdminOrOwner {
        if (_ID <= 0) {
            revert Gas__Unauthorized();
        } 
        else {
            if (_amount <= 0) {
                revert Gas__Unauthorized();
            }
            else {
                if (_user == address(0)) {
                    revert Gas__Unauthorized();
                }
                else {
                    for (uint256 ii = 0; ii < payments[_user].length; ii++) {
                        if (payments[_user][ii].paymentID == _ID) {
                            payments[_user][ii].adminUpdated = true;
                            payments[_user][ii].admin = _user;
                            payments[_user][ii].paymentType = _type;
                            payments[_user][ii].amount = _amount;
                            bool tradingMode = getTradingMode();
                            addHistory(_user, tradingMode);
                            emit PaymentUpdated(
                                msg.sender,
                                _ID,
                                _amount,
                                payments[_user][ii].recipientName
                            );
                        }
                    }
                }
            }
        }
    }

    function addToWhitelist(address _userAddrs, uint256 _tier)
        public
        onlyAdminOrOwner
    {
        if (_tier >= 255) {
            revert Gas__Unauthorized();
        } 
        else {
            whitelist[_userAddrs] = _tier;
            if (_tier > 3) {
                whitelist[_userAddrs] -= _tier;
                whitelist[_userAddrs] = 3;
            } else if (_tier == 1) {
                whitelist[_userAddrs] -= _tier;
                whitelist[_userAddrs] = 1;
            } else if (_tier > 0 && _tier < 3) {
                whitelist[_userAddrs] -= _tier;
                whitelist[_userAddrs] = 2;
            }
            uint256 wasLastAddedOdd = wasLastOdd;
            if (wasLastAddedOdd == 1) {
                wasLastOdd = 0;
                isOddWhitelistUser[_userAddrs] = wasLastAddedOdd;
            } else if (wasLastAddedOdd == 0) {
                wasLastOdd = 1;
                isOddWhitelistUser[_userAddrs] = wasLastAddedOdd;
            } else {
                revert Gas__Unauthorized();
            }
            emit AddedToWhitelist(_userAddrs, _tier);
        }
    }

    function whiteTransfer(
        address _recipient,
        uint256 _amount,
        ImportantStruct memory _struct
    ) public checkIfWhiteListed(msg.sender) {
        if(balances[msg.sender] < _amount) {
            revert Gas__Unauthorized();
        }
        else {
            if (_amount <= 3) {
                revert Gas__Unauthorized();
            }
            else {
                balances[msg.sender] -= _amount;
                balances[_recipient] += _amount;
                balances[msg.sender] += whitelist[msg.sender];
                balances[_recipient] -= whitelist[msg.sender];

                whiteListStruct[msg.sender] = ImportantStruct(0);
                ImportantStruct storage newImportantStruct = whiteListStruct[
                    msg.sender
                ];
                newImportantStruct.values = _struct.values;
                emit WhiteListTransfer(_recipient);
            }
        }
    }
}
