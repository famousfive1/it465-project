import _Index from "../temp/index-contract-address.json" assert { type: 'json' };
import { writeFileSync } from 'fs';
import { join } from 'path';
import { json } from '@helia/json';
import { CID } from 'multiformats/cid'
import { createHelia } from 'helia';
import { FsBlockstore } from 'blockstore-fs'
import hre from 'hardhat';

async function getIndex(add) {
    const Index = await hre.ethers.getContractFactory("Index");
    const index = await Index.attach(add);
    await index.deployed();

    console.log("Index address:", index.address);
    const adres = await index.getInvIdx();
    console.log(adres.toString());

    const store = new FsBlockstore(join(import.meta.url, '..', 'ipfs'));
    const helia = await createHelia({ blockstore: store });
    const jsonfs = json(helia)

    const cid = CID.parse(adres.toString());

    const inv_idx = await jsonfs.get(cid);

    writeFileSync(join(new URL('../temp/tok2id.json', import.meta.url).pathname), JSON.stringify(inv_idx));
}

getIndex(_Index.Index)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
