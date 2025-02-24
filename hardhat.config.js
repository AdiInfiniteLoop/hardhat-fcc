require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");
dotenv.config();

require("@nomicfoundation/hardhat-verify");
require("./tasks/block-number")
const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;



task("accounts", "Prints the list of accounts", async(taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
})



/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337
    }
  },
  etherscan: {
    apiKey:ETHERSCAN_API_KEY
  },
  sourcify: {
    enabled: true
  },
  solidity: "0.8.8",
};
