//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Index {

    mapping(string => string[]) idx;
    string[] tokens;

    function add(string memory key, string[] memory hash) public {
        idx[key] = hash;
        tokens.push(key);
    }

    function getTok() public view returns (string[] memory) {
        return tokens;
    }

    function get(string memory key) public view returns (string[] memory) {
        return idx[key];
    }

}
