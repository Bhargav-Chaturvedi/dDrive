const hre = require("hardhat");

async function main() {
  const Drive = await hre.ethers.getContractFactory("Drive");
  const upload = await Drive.deploy();

  await upload.deployed();

  console.log("Library deployed to:", upload.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});