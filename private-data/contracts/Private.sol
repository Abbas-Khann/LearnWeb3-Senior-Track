// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract Login {
    bytes32 private userName;
    bytes32 private password;

    constructor(bytes32 _userName, bytes32 _password) {
        userName = _userName;
        password = _password;
    }
}
