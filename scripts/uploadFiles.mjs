import { readFileSync } from 'fs';
import { join } from 'path';
import { unixfs } from '@helia/unixfs';
import { createHelia } from 'helia';
import { FsBlockstore } from 'blockstore-fs';
import id2file from './id2file.json' assert { type: 'json' };
import _Index from '../temp/index-contract-address.json' assert { type: 'json' };
import hre from 'hardhat';

async function uploadFiles(add) {
    const store = new FsBlockstore(join(import.meta.url, '..', 'ipfs'));
    const helia = await createHelia({ blockstore: store });
    const uxfs = unixfs(helia)

    const Index = await hre.ethers.getContractFactory("Index");
    const index = await Index.attach(add);
    await index.deployed();

    console.log("Index address:", index.address);

    const filedir = new URL('../files', import.meta.url);

    let promises = [];

    for(const id in id2file) {
        const f = id2file[id];
        const fn = join(filedir.pathname, `${f}.txt`);
        const cid = await uxfs.addFile({
            path: f,
            content: readFileSync(fn)
        })

        console.log(`Added file ${id} - ${f} : ${cid}`);
        promises.push(index.add(id, cid.toString()));
    }

    await Promise.all(promises);
}

uploadFiles(_Index.Index)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

