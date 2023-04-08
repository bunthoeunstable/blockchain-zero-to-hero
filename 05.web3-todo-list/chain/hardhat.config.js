require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    georli: {
      url: "https://eth-goerli.g.alchemy.com/v2/{app_key}",
      accounts: ["0x"], // private accounts
    },
  }
};
