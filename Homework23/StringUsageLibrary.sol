// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "https://github.com/Arachnid/solidity-stringutils/blob/master/src/strings.sol";

contract StringsLibrary {
    using strings for *;

    string phrase = " from Eth Denver";

    function concatenateString(string memory a) public view returns(string memory, uint256) {
        string memory concatenatedWord = a.toSlice().concat(phrase.toSlice());
        uint256 LengthOfConcatWord = concatenatedWord.toSlice().len();
        return (concatenatedWord, LengthOfConcatWord);
    }
}