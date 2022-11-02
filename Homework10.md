# Homework 10
Review the security notes from Lesson 7, make sure you understand the re entrancy
exploit.

## **Reentrancy exploits**

### ***When the contracts are vulnerable?***

When you have the possibility of making an external function call and loop over it all over again without making the change of state first.

### ***How can this be solved?***

First, its important to set the changes in the state first and then executing any external function call. For example, if we have a withdraw() function, we need to first remove the amount from the sender's balance before executing the withdraw call. That way, if the attacker re-runs the function, the state would already be deducted by the withdrawn amount.

### ***Examples:***

Insecure
```solidity
mapping (address => uint) private userBalances;

function withdrawBalance() public {
    uint amountToWithdraw = userBalances[msg.sender];
    (bool success, ) = msg.sender.call.value(amountToWithdraw)(""); // At this point, the caller's code is executed, and can call withdrawBalance again
    require(success);
    userBalances[msg.sender] = 0;
}
```
Secure
```solidity
mapping (address => uint) private userBalances;

function withdrawBalance() public {
    uint amountToWithdraw = userBalances[msg.sender];
    userBalances[msg.sender] = 0;
    (bool success, ) = msg.sender.call.value(amountToWithdraw)(""); // The user's balance is already 0, so future invocations won't withdraw anything
    require(success);
}
```

### ***Reference***
https://consensys.github.io/smart-contract-best-practices/attacks/reentrancy/