const _Index = require("./index-contract-address.json").Index;
const inverted = require("./invindex.json");

function splitToNChunks(array, n) {
    let result = [];
    while(array.length) {
        result.push(array.splice(0, n));
    }
    return result;
}

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
    const keys = Object.keys(inverted);
    const chunks = splitToNChunks(keys, 100);
    for(let ch of chunks) {
        let inv = [];
        for(let tok of ch) {
            inv.push(inverted[tok]);
        }
        await index.add(ch, inv);
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
