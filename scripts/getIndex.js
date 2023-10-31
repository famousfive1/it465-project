const _Index = require("./index-contract-address.json").Index;
const fs = require('fs');
const path = require('path');

async function getIndex(add) {
    if (network.name === "hardhat") {
        console.warn(
            "You are trying to deploy a contract to the Hardhat Network, which" +
                "gets automatically created and destroyed every time. Use the Hardhat" +
                " option '--network localhost'"
        );
    }

    const Index = await ethers.getContractFactory("Index");
    const index = await Index.attach(add);
    await index.deployed();

    console.log("Index address:", index.address);
    const tokens = await index.getTok();
    const inv_idx = {};
    for(let tok of tokens) {
        const vals = await index.get(tok);
        inv_idx[tok] = vals;
    }

    fs.writeFileSync(path.join(__dirname, 'tok2id.json'), JSON.stringify(inv_idx));
}

getIndex(_Index)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

module.exports = {
    getIndex,
};
