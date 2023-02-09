const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("tx.origin hacked", () => {
  it("Should be able to hack the victim contract and claim ownership", async () => {
    // fetching an address here from hardhat
    const [_, addressOne] = ethers.getSigners();

    // Time to deploy the contracts and attack it.
    const victimFactory = await ethers.getContractFactory("Victim");
    const deployedVictimContract = await victimFactory
      .connect(addressOne)
      .deploy();
    await deployedVictimContract.deployed();

    // Let's deploy the attacker contract
    const attackerFactory = await ethers.getContractFactory("Hack");
    const deployedAttackerContract = await attackerFactory.deploy(
      deployedVictimContract.address
    );
    await deployedAttackerContract.deployed();

    const tx = await deployedAttackerContract
      .connect(addressOne)
      .attackThisWeakAssContract();
    await tx.wait();

    expect(await deployedVictimContract.owner()).to.equal(
      deployedAttackerContract.address
    );
  });
});
