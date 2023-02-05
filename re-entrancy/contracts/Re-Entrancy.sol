// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract GoodContract {
    mapping(address => uint) public balances;

    function addBalance() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Nothing to withdraw");

        (bool sent, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(sent, "Failed to send Eth");
        balances[msg.sender] = 0;
    }
}
