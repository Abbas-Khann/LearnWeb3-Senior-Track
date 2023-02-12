const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Mailicious External Contract", () => {
  it("Should change the owner of the victim contract", async () => {
    const attacker = await ethers.getContractFactory("Hack");
    const deployedAttackerContract = await attacker.deploy();
    await deployedAttackerContract.deployed();
    console.log("Hacker Contract Address: ", deployedAttackerContract.address);

    const victim = await ethers.getContractFactory("Victim");
    const deployedVictimContract = await victim.deploy(
      deployedAttackerContract.address
    );
    await deployedVictimContract.deployed();
    console.log(
      "Victim Contract Address here: ",
      deployedVictimContract.address
    );

    const [_, addr1] = await ethers.getSigners();

    let tx = await deployedVictimContract.connect(addr1).addUserToList();
    await tx.wait();

    const checkEligibility = await deployedVictimContract
      .connect(addr1)
      .isUserEligible();
    console.log("Address eligibility", checkEligibility);
    expect(checkEligibility).to.equal(false);
  });
});
