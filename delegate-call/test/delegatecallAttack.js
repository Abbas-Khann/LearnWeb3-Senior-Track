const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("delegatecall Attack", () => {
  it("Should be able to claim Ownership of the Victim Contract", async () => {
    // Deploy the helper contract here

    const helperContract = await ethers.getContractFactory("Helper");
    const deployedHelperContract = await helperContract.deploy();
    await deployedHelperContract.deployed();
    const helperContractAddress = await deployedHelperContract.address;

    // Deploy the Victim contract

    const victimContract = await ethers.getContractFactory("Victim");
    const deployedVictimContract = await victimContract.deploy(
      helperContractAddress
    );

    await deployedVictimContract.deployed();
    const victimContractAddress = await deployedVictimContract.address;
    console.log(
      "Deployed Victim contract owner address here: ",
      await deployedVictimContract.owner()
    );
    // Deploy the Attacker contract and call the attack function
    const attackerContract = await ethers.getContractFactory("Hacker");
    const deployedAttackerContract = await attackerContract.deploy(
      victimContractAddress
    );
    await deployedAttackerContract.deployed();

    const txn = await deployedAttackerContract.attack();
    await txn.wait();
    console.log(
      "Checking the address of the attacker contract here :",
      await deployedAttackerContract.address
    );
    console.log(
      "Deployed Victim contract owner address after being hacked: ",
      await deployedVictimContract.owner()
    );
    if (
      (await deployedAttackerContract.address) ===
      (await deployedVictimContract.owner())
    ) {
      console.log("GOTCHA BITCH!!!");
    }
    expect(await deployedVictimContract.owner()).to.equal(
      deployedAttackerContract.address
    );
  });
});
