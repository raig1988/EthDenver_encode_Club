## Using a blockchain explorer, have a look at the following transactions, what do they do ?

### 0x0ec3f2488a93839524add10ea229e773f6bc891b4eb4794c3337d4495263790b
#### Its a transaction from an external address to a contract where Ether was extracted from the contract and sent to a specific address. The total value transferred was 137 Ether and it happened on June 17, 2016.

### 0x4fc1580e7f66c58b7c26881cce0aab9c3509afe6e507527f30566fbf8039bcd0
#### This contract happend on the 5th June, 2020. Here the Uniswap deployer created the Uniswap V2 router 2 contract.

### 0x552bc0322d78c5648c5efa21d2daa2d0f14901ad4b15531f1ab5bbe5674de34f
#### This happened on August 10th, 2021 and its related to the Polynetwork exploit. Its a transaction of no Ether value send where only gas fee was expended but reviewing the state of the network the hacker had at the moment a balance of 28,954 Ether.

### 0x7a026bf79b36580bf7ef174711a3de823ff3c93c65304c3acc0323c77d62d0ed
#### This is a transaction from August 12th, 2021 and its also related to the Polynetwork exploit. Here the hacker interacted with the DAI stablecoin contract for a value of almost 97 million USD. Investigation deeper on the internet, this transaction relates to the hacker returning the funds to the Polynetwork multisig.

### 0x814e6a21c8eb34b62a05c1d0b14ee932873c62ef3c8575dc49bcf12004714eda
#### This transaction is from August 19th 2021 also related to the Polynewtork hack. This one has a value of 160 Ether. The state of the network changed on the hacker balance going from 5 Eth to 165 Eth.

### What is the largest account balance you can find ?
#### The largest state balance change is related to this transaction 0x552bc0322d78c5648c5efa21d2daa2d0f14901ad4b15531f1ab5bbe5674de34f where the PolyNetwork hacker has almost 29,000 Eth.
#### // Correct answer: Uniswap V2 deploy contract

## What is special about these accounts :

### 0x1db3439a222c519ab44bb1144fc28167b4fa6ee6
#### This account holds 831 Eth (more than 1M usd in value). Almost half of it is MKR token. It belongs to Vitalik Buterin. Data from transactions go back to sep 19th, 2015.

### 0x000000000000000000000000000000000000dEaD
#### Description in block explorer is "This address is commonly used by projects to burn tokens (reducing total supply).". It has more than 302 token contracts with an estimated value of 186M Usd.

Using remix add this contract as a source file

Compile the contract
Deploy the contract to the Remix VM environment
