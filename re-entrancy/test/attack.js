const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { parseEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

describe("Attackkkk this weakkkkkkk contract", async () => {
  // Deploying the good contract here first
  const goodContractFactory = await ethers.getContractFactory("GoodContract");
  const deployedGoodContract = await goodContractFactory.deploy();
  await deployedGoodContract.deployed();

  // Let's deploy the bad contract now
  const badContract = await ethers.getContractFactory("BadContract");
  const deployedBadContract = await badContract.deploy(
    deployedGoodContract.address
  );
  await deployedBadContract.deployed();

  const [, victimAddress, attackerAddress] = await ethers.getSigners();

  let tx = await deployedGoodContract.connect(victimAddress).addBalance({
    value: parseEther("10"),
  });
  await tx.wait();

  let balanceEth = await ethers.provider.getBalance(
    deployedGoodContract.address
  );
  expect(balanceEth).to.equal(parseEther("10"));

  tx = await badContract.connect(attackerAddress).attack({
    value: parseEther("1"),
  });
  await tx.wait();

  balanceEth = await ethers.provider.getBalance(deployedGoodContract.address);
  expect(balanceEth).to.equal(parseEther("0"));

  balanceEth = await ethers.provider.getBalance(deployedBadContract.address);
  expect(balanceEth).to, equal(parseEther("11"));
});
