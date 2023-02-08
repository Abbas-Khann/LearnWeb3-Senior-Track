// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Victim {
    constructor() payable {}

    function pickACard() private view returns (uint256) {
        uint256 pickedCard = uint256(
            keccak256(
                abi.encodePacked(blockhash(block.number), block.timestamp)
            )
        );

        return pickedCard;
    }

    function guess(uint _guess) public {
        uint256 pickedCard = pickACard();
        if (_guess == pickedCard) {
            (bool sent, ) = msg.sender.call{value: 0.1 ether}("");
            require(sent, "FAILED TO SEND ETH");
        }
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
