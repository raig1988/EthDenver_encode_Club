/* Homework 6 - Team Treasure Hunt
Part 1
To prepare for the treasure hunt you need to deploy a contract on Goerli test net.
. Take the contract and interface from this gist 
https://gist.github.com/letsgitcracking/239306ea9f08d7e270f9d7e5245bdd2b
. Deploy the contract to Goelri test net and note the address it was deployed to.
https://goerli.etherscan.io/tx/0xa3aecf45fe785664038b794574a90aaf843165ba24fa3c8c78802d617de62ac5

Part 2
Register your team name, team number with your team wallet here:
http://team-registration.javascrypt-.repl.co/
Look for clues in the transaction.
https://goerli.etherscan.io/tx/0x3f4634bdf4c6a0b247bb6bff056885dce16efee658923cd51505fe8db7daac57 // Add team transaction
https://goerli.etherscan.io/address/0x2410637d1302a87fca0ca71f6aeea3627a50071b#readContract // "Add team" Contract - read contract
Call the info function to get this code: 68747470733a2f2f6269742e6c792f33655a396f566d that decoded in ASCII is https://bit.ly/3eZ9oVm
On previous URL we find this HEX: 68747470733A2F2F6269742E6C792F334E3674377953 that decode in ASCII is https://bit.ly/3N6t7yS.
On previous URL we find a tweet with this binary code: 1110011101010000000100111000101001011101011011010010110000110111100000101111110101010010000101100001101111101100101111110001110111000100011110101111101111110000100110100011100110001010000001100001111111010010010000100100001100110000101010101010110101011001
The previous binary decoded in HEX gives us: E750138A5D6D2C3782FD52161BECBF1DC47AFBF09A398A061FD2424330AAAD59 (https://www.rapidtables.com/convert/number/binary-converter.html)
The previous HEX is a transaction hash https://goerli.etherscan.io/tx/0xE750138A5D6D2C3782FD52161BECBF1DC47AFBF09A398A061FD2424330AAAD59 where on input data we find this url decoding in UTF-8: https://bit.ly/3W33bIi
The previous URL is this site: https://letsgitcracking.github.io/team-game/. When you inspect it, you find in the <head> tag this url: https://bit.ly/3ze0V7s
The previous URL is a tweet which gives us the treasure contract 0x18acF9DEB7F9535F4848a286b68C729AAc55697a.
This site may help you:
https://www.rapidtables.com/convert/number/

Part 3
The treasure contract looks like this
Once you have found it on the test net, you need to
. Call it from your interface contract with your team wallet
https://goerli.etherscan.io/tx/0x2ab50e3868bcf688644d4f964812e668f26cbe0126b4645925cc01888186d628
. If successful - you should see the event in TreasureChest.sol */
https://goerli.etherscan.io/address/0x18acF9DEB7F9535F4848a286b68C729AAc55697a#events
