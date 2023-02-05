require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

/** @type import('hardhat/config').HardhatUserConfig */

const RPC_URL = process.env.RPC_URL;

if (!RPC_URL) {
  console.log("RPC URL NOT FETCHED!!!");
}

module.exports = {
  solidity: "0.8.10",
  networks: {
    hardhat: {
      forking: {
        url: RPC_URL,
      },
    },
  },
};
