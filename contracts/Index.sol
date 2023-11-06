//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Index {

    mapping(uint => string) id2hash;
    uint[] tokens;

    string invidx;

    function add(uint id, string memory hash) public {
        id2hash[id] = hash;
        tokens.push(id);
    }

    function storeInvIdx(string memory hash) public {
        invidx = hash;
    }

    function getInvIdx() public view returns (string memory) {
        return invidx;
    }

    function getTok() public view returns (uint[] memory) {
        return tokens;
    }

    function get(uint key) public view returns (string memory) {
        return id2hash[key];
    }

}
