/* eslint-disable no-console */

import { readdirSync, readFileSync, writeFileSync} from 'fs';
import { join } from 'path';
import { unixfs } from '@helia/unixfs';
import { createHelia } from 'helia';
import { FsBlockstore } from 'blockstore-fs'

const store = new FsBlockstore(join(import.meta.url, '..', 'ipfs'));
const helia = await createHelia({ blockstore: store });
const uxfs = unixfs(helia)

const filedir = new URL('../files', import.meta.url);
const files = readdirSync(filedir);
const file2cid = {};

for(const f of files) {
    const fn = join(filedir.pathname, f);
    const cid = await uxfs.addFile({
        path: f,
        content: readFileSync(fn)
    })

    console.log(`Added file ${f} : ${cid}`);
    file2cid[f] = cid.toString();
}

writeFileSync(new URL('./file2cid.json', import.meta.url), JSON.stringify(file2cid));

process.exit(0);

