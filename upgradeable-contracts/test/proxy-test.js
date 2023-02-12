const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC721 Upgradeable", () => {
  it("Should be able to deploy an Upgradeable ERC721 Contract", async () => {
    const LW3NFT = await ethers.getContractFactory("LW3NFT");
    const LW3NFT2 = await ethers.getContractFactory("LW3NFT2");

    let proxyContract = await hre.upgrades.deployProxy(LW3NFT, {
      kind: "uups",
    });
    const [owner] = await ethers.getSigners();
    const ownerOfTokenOne = await proxyContract.ownerOf(1);

    expect(ownerOfTokenOne).to.equal(owner.address);

    proxyContract = await hre.upgrades.upgradeProxy(proxyContract, LW3NFT2);
    console.log(await proxyContract.test());

    expect(await proxyContract.test()).to.equal("upgraded contract");
  });
});
