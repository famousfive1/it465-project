
async function addIndex(add) {
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
  const ii = {
        "a": ["1", "3"],
        "r": ["3", "4"],
        "l": ["3", "5"],
    };
  for(let tok in ii) {
        await index.add(tok, ii[tok]);
  }

}
module.exports = {
    addIndex,
};
