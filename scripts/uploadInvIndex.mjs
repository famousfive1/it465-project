import { join } from 'path';
import { json } from '@helia/json';
import { createHelia } from 'helia';
import { FsBlockstore } from 'blockstore-fs'
import invidx from './invindex.json' assert { type: 'json' };
import _Index from '../temp/index-contract-address.json' assert { type: 'json' };
import hre from 'hardhat';

async function uploadInvIdx(add) {
    const store = new FsBlockstore(join(import.meta.url, '..', 'ipfs'));
    const helia = await createHelia({ blockstore: store });
    const jsonfs = json(helia)

    const adres = await jsonfs.add(invidx);
    console.log(adres.toString());

    const Index = await hre.ethers.getContractFactory("Index");
    const index = await Index.attach(add);
    await index.deployed();

    console.log("Index address:", index.address);

    await index.storeInvIdx(adres.toString());
}

uploadInvIdx(_Index.Index)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
