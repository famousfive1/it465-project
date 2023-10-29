// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

// const path = require("path");

async function getIndex(add) {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const Index = await ethers.getContractFactory("Index");
  const index = await Index.attach(add);
  await index.deployed();

  console.log("Index address:", index.address);
  const tokens = await index.getTok();
  console.log("Tokens: ", tokens);
  for(let tok of tokens) {
    const vals = await index.get(tok);
    console.log(tok, ": ", vals);
  }

  // We also save the contract's artifacts and address in the frontend directory
  // saveFrontendFiles(index);
}

// function saveFrontendFiles(token) {
//   const fs = require("fs");
//   const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");
//
//   if (!fs.existsSync(contractsDir)) {
//     fs.mkdirSync(contractsDir);
//   }
//
//   fs.writeFileSync(
//     path.join(contractsDir, "contract-address.json"),
//     JSON.stringify({ Token: token.address }, undefined, 2)
//   );
//
//   const TokenArtifact = artifacts.readArtifactSync("Token");
//
//   fs.writeFileSync(
//     path.join(contractsDir, "Token.json"),
//     JSON.stringify(TokenArtifact, null, 2)
//   );
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

module.exports = {
    getIndex,
};
