// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Victim {
    address public currentWinner;
    uint256 public currentAuctionPrice;

    constructor() {
        currentWinner = msg.sender;
    }

    function setCurrentAuctionPrice() public payable {
        require(msg.value > currentAuctionPrice, "YOU'RE A BROKE BUM");
        (bool sent, ) = currentWinner.call{value: currentAuctionPrice}("");
        if (sent) {
            currentAuctionPrice = msg.value;
            currentWinner = msg.sender;
        }
    }
}
