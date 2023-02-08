const { ethers } = require("hardhat");
const { expect } = require("chai");
const { BigNumber, utils } = require("ethers");

describe("Attack", () => {
  it("Should be able to Hack the Game contract and Guess the number correctly", async () => {
    const victim = await ethers.getContractFactory("Victim");
    const deployedVictimContract = await victim.deploy({
      value: utils.parseEther("0.1"),
    });
    await deployedVictimContract.deployed();
    const attacker = await ethers.getContractFactory("Hack");
    const deployedAttackerContract = await attacker.deploy(
      deployedVictimContract.address
    );
    await deployedAttackerContract.deployed();
    let tx = await deployedAttackerContract.attack();
    await tx.wait();

    const balanceVictim = await deployedVictimContract.getContractBalance();

    if (balanceVictim.toString() === "0") {
      console.log("GOTCHA BITCH!!!");
    }

    expect(balanceVictim).to.equal(BigNumber.from("0"));
  });
});
