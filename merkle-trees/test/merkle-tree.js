const { expect }= require("chai");
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs")

function encodeLeaf(address, spots) {
    return ethers.utils.defaultAbiCoder.encode(
      ["address", "uint64"],
      [address, spots]
    )
}

describe("Merkle Trees", function() {
  it("Should be able to verify whether if the address is whitelisted or not", async function() {

    const testAddresses = await ethers.getSigners();

    const list = [
      encodeLeaf(testAddresses[0].address, 2),
      encodeLeaf(testAddresses[1].address, 2),
      encodeLeaf(testAddresses[2].address, 2),
      encodeLeaf(testAddresses[3].address, 2),
      encodeLeaf(testAddresses[4].address, 2),
      encodeLeaf(testAddresses[5].address, 2),
    ]

    const merkleTree = new MerkleTree(list, keccak256, {
      hashLeaves: true,
      sortPairs: true,
      sortLeaves: true
    })


    const root = merkleTree.getHexRoot();
    console.log(root)
    const whitelist = await ethers.getContractFactory("Whitelist");
    const deployedWhitelistContract = await whitelist.deploy(root);
    await deployedWhitelistContract.deployed();

    for(let i = 0; i < 6; i++) {
      const leaf = keccak256(list[i]);
      const proof = merkleTree.getHexProof(leaf);


      const connectedWhitelist = await deployedWhitelistContract.connect(testAddresses[i]);
      const verified = await connectedWhitelist.checkInWhitelist(proof, 2);
      expect(verified).to.equal(true);
    }

    const verifiedInvalid = await deployedWhitelistContract.checkInWhitelist([], 2);
    expect(verifiedInvalid).to.equal(false);

  })
})
