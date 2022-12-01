// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract stringTest {

    string word1 = "Hello";
    string completedWord;

    function viewWord1() public view returns(string memory) {
        return  word1;
    }

    function addWords(string calldata _addedWord) public pure returns(string calldata) {
        return _addedWord;
    }

    function returnLength() public view returns(uint256) {
        return bytes(word1).length;
    }

    function concatenateString(string calldata _newWord) public returns(string memory) {
        string memory newContactWord = string.concat(word1, _newWord);
        completedWord = newContactWord;
        return newContactWord;
    }

    function returnLenghtOfConcatWord() public view returns(uint256) {
        return bytes(completedWord).length;
    }

}