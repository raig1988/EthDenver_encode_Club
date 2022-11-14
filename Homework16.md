# Homework 16
## Setup an account on NFT Storage.
## Upload an image and then associate this image with one of your Volcano NFTs. Think about a way of automating image generation.
- NFT https://testnets.opensea.io/assets/goerli/0xc2bd02f7f5f5d6e9cc0ea5a0d783fc8d433c8447/2 </br>
In order to automate image generation, we need to do so programatically. 
Nft's are made of:
1. Images:
    - You can generate a big collection of NFT's by manually designing some patterns which combined can generate multiply different images.
    - Drawing by using calculated vectors that will randomly generate an image.
2. IPFS upload:
    - This images need to be uploaded to a server, better a decentralized one like IPFS.
3. Metadata:
    - The data related to your NFT needs to be set on a json file. The structure needs to be like this:
    ```
    {
        "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.", 
        "external_url": "https://openseacreatures.io/3", 
        "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png", 
        "name": "Dave Starbelly",
        "attributes": [ ... ]
    }
    ```
## In the NFT Metadata - set some attributes/traits which can be viewed on OpenSea. </br>
## Example: </br>
### See if you can figure out how to store the NFT Metadata on chain within your NFT Contract. Hint look into the [Base64]
[https://github.com/Brechtpd/base64/blob/main/base64.sol] library 

As seen on the example presented on the homework, we can see how the developer is registering the Metadata on chain within the smart contract with the minting function.

```solidity
function makeAnEpicNFT() public {
    uint256 newItemId = _tokenIds.current();
    // First, set the word which is going to define the individuality of this NFT
    string memory first = pickRandomFirstWord(newItemId);
    string memory second = pickRandomSecondWord(newItemId);
    string memory third = pickRandomThirdWord(newItemId);
    string memory combinedWord = string(abi.encodePacked(first, second, third));

    // After having defined that individual identification of the NFT, generate a string that combines the baseSvg (which is a constant) with the individual id and close tags
    string memory finalSvg = string(abi.encodePacked(baseSvg, combinedWord, "</text></svg>"));

    // Get all the JSON metadata in place and base64 encode it (transform from 32 bytes to 64 bytes)
    string memory json = Base64.encode(
        bytes(
            string(
                abi.encodePacked(
                    '{"name": "',
                    // We set the title of our NFT as the generated word.
                    combinedWord,
                    '", "description": "A highly acclaimed collection of squares.", "image": "data:image/svg+xml;base64,',
                    // We add data:image/svg+xml;base64 and then append our base64 encode our svg.
                    Base64.encode(bytes(finalSvg)),
                    '"}'
                )
            )
        )
    );

    // structure:
    //  '{
            "name": "' combinedWord '",
            "description: "A highly acclaimed collection of squares.",
            "image": "data:image/svg+xml;base64,'Base64.encode(bytes(finalSvg))'"
        }'

    // Just like before, we prepend data:application/json;base64, to our previous structure.
    string memory finalTokenUri = string(
        abi.encodePacked("data:application/json;base64,", json)
    );

    // structure:
    data:application/json;base64,
    '{
        "name": ... ,
        "description: ...,
    }

    console.log("\n--------------------");
    console.log(finalTokenUri);
    console.log("--------------------\n");

    _safeMint(msg.sender, newItemId);
    
    // Update your URI!!!
    _setTokenURI(newItemId, finalTokenUri);
  
    _tokenIds.increment();
    console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
  }
  ```
