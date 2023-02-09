// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Victim {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function setOwner(address _owner) public {
        require(tx.origin == owner, "NOT_OWNER");
        owner = _owner;
    }
}
