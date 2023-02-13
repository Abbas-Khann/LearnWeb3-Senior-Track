// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Gas {
    error NOT_OWNER();

    uint8 firstNum;
    uint8 secondNum;
    uint256 thirdNum;
    address owner;

    constructor() {
        owner = msg.sender;
    }

    function loop() external view returns (uint256) {
        uint256 _thirdNum;
        for (uint256 i = 0; i < 10; i++) {
            _thirdNum++;
        }
        _thirdNum = thirdNum;
        return thirdNum;
    }

    function checkIfOwner() external view returns (bool) {
        if (msg.sender != owner) {
            revert NOT_OWNER();
        } else {
            return true;
        }
    }
}
