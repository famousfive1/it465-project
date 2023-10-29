const _Index = require("./index-contract-address.json").Index;

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
    console.log("Tokens: ", tokens);
    for(let tok of tokens) {
        const vals = await index.get(tok);
        console.log(tok, ": ", vals);
    }

}

getIndex(_Index)
    // .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

module.exports = {
    getIndex,
};
