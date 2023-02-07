const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Attack", () => {
  it("Should be able to read the private variables password and username", async () => {
    const loginFactory = await ethers.getContractFactory("Login");

    const usernameBytes = ethers.utils.formatBytes32String("test");
    const passwordBytes = ethers.utils.formatBytes32String("strong Password");
    const deployedLoginContract = await loginFactory.deploy(
      usernameBytes,
      passwordBytes
    );
    await deployedLoginContract.deployed();
    // considering its deployed now we will try to read the variables
    const slotZeroBytes = await ethers.provider.getStorageAt(
      deployedLoginContract.address,
      0
    );

    const slotOneBytes = await ethers.provider.getStorageAt(
      deployedLoginContract.address,
      1
    );

    expect(ethers.utils.parseBytes32String(slotZeroBytes)).to.equal("test");
    expect(ethers.utils.parseBytes32String(slotOneBytes)).to.equal(
      "strong Password"
    );
  });
});
