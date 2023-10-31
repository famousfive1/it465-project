const path = require("path");

async function deployIndex() {
    if (network.name === "hardhat") {
        console.warn(
            "You are trying to deploy a contract to the Hardhat Network, which" +
                "gets automatically created and destroyed every time. Use the Hardhat" +
                " option '--network localhost'"
        );
    }

    const [deployer] = await ethers.getSigners();
    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Index = await ethers.getContractFactory("Index");
    const index = await Index.deploy();
    await index.deployed();

    console.log("Index address:", index.address);

    saveFrontendFiles(index);

    return index.address;
}

function saveFrontendFiles(contract) {
    const fs = require("fs");
    const contractsDir = __dirname;

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        path.join(contractsDir, "index-contract-address.json"),
        JSON.stringify({ Index: contract.address }, undefined, 2)
    );

    const TokenArtifact = artifacts.readArtifactSync("Index");

    fs.writeFileSync(
        path.join(contractsDir, "Index.json"),
        JSON.stringify(TokenArtifact, null, 2)
    );
}

deployIndex()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

module.exports = {
    deployIndex,
};
