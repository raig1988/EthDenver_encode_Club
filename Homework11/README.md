# Homework 11

## Continue developing your Volcano NFT project
**1. Add a function that allows a user to mint an NFT if they pay 0.01 ETH, or an amount of Volcano coin (decide on a price yourself).**
- Check VolcanoNft.sol in ./contracts/.
```
    function safeMint(address recipient, string memory tokenURI) public virtual payable returns (uint256) {
        require(msg.value >= 10000000000000000, "Not enough ETH sent; check price!");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
```
**2. Make sure that when a token is minted we can specify a token URI - a location where we can store metadata / images for the NFT.**
- safeMint() includes an argument passing tokenUri. The image and the "metadata.json" file where uploaded to https://app.pinata.cloud/. The running script was written in ./scripts.mint-nft.js. To mint an nft in the CLI, run: 
``` 
    yarn hardhat run scripts/mint-nft.js
```
**3. What would be the problem with providing a function to allow us to change the tokenURI ?**
- A function that allows any wallet to change the tokenURI would allow the unauthorized minting of any Nft using our contract.

**4. Review the notes about the EVM in Lesson 5 in preparation for tomorrow's lesson about gas optimisation.**
- The EVM is a 'stack machine' that has a maximum size of 1024 slots and stack items have a size of 256 bits.
- Data can be stored in: Stack, Calldata, Memory, Storage, Code and Logs
- Storage data is permanent, forms part of the smart contract's state and can be accessed across all functions. It should only be used if necessary as it is expensive. 
- Memoru dataa is stored in a temp location and its only accessible within a function. It's normally used to store data temp while executing logic within a function. When execution is completed, data is discarted.
- Calldata is the location where external values from outside a function into a function are stored. It is non modifiable and non persistent data location.