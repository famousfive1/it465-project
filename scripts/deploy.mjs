import hre from 'hardhat';
import fs from 'fs';
import path from 'path';

async function deployIndex() {
    const [deployer] = await hre.ethers.getSigners();
    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Index = await hre.ethers.getContractFactory("Index");
    const index = await Index.deploy();
    await index.deployed();

    console.log("Index address:", index.address);

    saveFrontendFiles(index);

    return index.address;
}

function saveFrontendFiles(contract) {
    const contractsDir = new URL('../temp', import.meta.url).pathname;

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        path.join(contractsDir, "index-contract-address.json"),
        JSON.stringify({ Index: contract.address }, undefined, 2)
    );
}

deployIndex()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

