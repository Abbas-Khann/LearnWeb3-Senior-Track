const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Denial of Service, DOS", () => {
  it("Should be able to make the victim contract useless and not allow anyone else to become the winner", async () => {
    const victimContractFactory = await ethers.getContractFactory("Victim");
    const deployedVictimContract = await victimContractFactory.deploy();
    await deployedVictimContract.deployed();
    console.log("Victim Contract Address: ", deployedVictimContract.address);

    const hackerContractFactory = await ethers.getContractFactory("Hack");
    const deployedHackerContract = await hackerContractFactory.deploy(
      deployedVictimContract.address
    );
    await deployedHackerContract.deployed();
    console.log("Hacker Contract Address: ", deployedHackerContract.address);

    // Now lets attack the victim contract
    // Take two addresses
    const [, firstAddress, secondAddress] = await ethers.getSigners();
    console.log("First Address: ", firstAddress);
    console.log("Second Address: ", secondAddress);

    // Calling the setCurrentAuctionPrice function and setting the price to 1 ether
    let tx = await deployedVictimContract
      .connect(firstAddress)
      .setCurrentAuctionPrice({
        value: ethers.utils.parseEther("1"),
      });
    await tx.wait();

    // Calling the attack function on the Hack contract and passing in 3 ether
    tx = await deployedHackerContract.attackThisWeakAssContract({
      value: ethers.utils.parseEther("3"),
    });
    await tx.wait();
    // Calling the currentAuctionPrice function on the victim contract with another address with 4 ether
    tx = await deployedVictimContract
      .connect(secondAddress)
      .setCurrentAuctionPrice({
        value: ethers.value.parseEther("4"),
      });
    await tx.wait();

    expect(await deployedVictimContract.currentWinner()).to.equal(
      deployedHackerContract.address
    );
  });
});
