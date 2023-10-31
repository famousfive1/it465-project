const _Index = require("./index-contract-address.json").Index;
const inverted = require("./invindex.json");

async function addIndex(add) {
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
    for(let tok in inverted) {
        await index.add(tok, inverted[tok]);
    }
}

addIndex(_Index)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

module.exports = {
    addIndex,
};
