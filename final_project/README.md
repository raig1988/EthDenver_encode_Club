# Video trivia web app

## GOAL.

To mint NFT user has to watch 30 second stream then input correct value into mintNft() function. We want to launch several triviaStream Smartcontracts for streamers on Livepeer to interact with viewer via quiz that MintsNft.

Goal is to let streamers create personalized quizzes based off of their content . Then have content user solve quiz by inputting right value or "answer" into smartcontract mintNft Function.

livePeer Streamer uploads snippet stream, user watches stream. Streamer creates quiz on the front end. user inputs correct value into smart contract then mints Nft.

## Smart contract logic

Contract with a “mintNft” function, user has to input correct value into mintNft() function to earn Nft.
Nft gives user personal id. With this personal ID user can gain access to StreamDao.

triviaStream.sol line10 how to gain access

## Project division

### Front end

Usage of front end built in react according to this git https://github.com/JdejesusIsaac/TriviaStreamNftFrontEnd and adapt it to work with blockchain info. This front end needs to have the ability to call functions of the smart contract.

### Back end

Usage of blockchain smart contract https://goerli.etherscan.io/address/0x76589FD469028326cF9E165916d174035c4Cd60f#code that has all information related to:
- Create a video
- Map users that are close friends
- Map likes of users to a video.