const hre = require("hardhat");

async function main() {

  const Todo = await hre.ethers.getContractFactory("Todo");
  const contract = await Todo.deploy();
  await contract.deployed();

  console.log(`deployed to ${contract.address}`);
}

// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
