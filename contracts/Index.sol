//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Index {

    mapping(string => int32[]) idx;
    string[] tokens;

    function add(string[] memory key, int32[][] memory hash) public {
        for (uint32 i = 0; i < key.length; i++) {
            idx[key[i]] = hash[i];
            tokens.push(key[i]);
        }
    }

    function getTok() public view returns (string[] memory) {
        return tokens;
    }

    function get(string memory key) public view returns (int32[] memory) {
        return idx[key];
    }

}
