import inv_index from '../temp/tok2id.json' assert { type: 'json' };
import hre from 'hardhat';
import _Index from '../temp/index-contract-address.json' assert { type: 'json' };

async function search(add) {
    if(!process.argv[2])
        process.exit(1);

    if (hre.network.name === "hardhat") {
        console.warn(
            "You are trying to deploy a contract to the Hardhat Network, which" +
                "gets automatically created and destroyed every time. Use the Hardhat" +
                " option '--network localhost'"
        );
    }

    const ands = process.argv[2].split(' | ');
    let ans = {};

    for(let and of ands) {
        const query = and.split(' ');
        let tmp = inv_index[query[0]] || [];

        for(let tok of query) {
            if(!tmp) break;
            tmp = (inv_index[tok] || []).filter(value => tmp.includes(value));
        }
        
        for(let a of tmp)
            ans[a.toString()] = true;
    }

    const Index = await hre.ethers.getContractFactory("Index");
    const index = await Index.attach(add);
    await index.deployed();

    console.log("Index address:", index.address);

    for(let a in ans) {
        console.log(a, await index.get(Number(a)));
    }
}

search(_Index.Index)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
