// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Helper {
    mapping(address => bool) userEligible;

    function isUserEligible(address _user) public view returns (bool) {
        return userEligible[_user];
    }

    function setUserEligible(address _user) public {
        userEligible[_user] = true;
    }

    fallback() external {}
}
