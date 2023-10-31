/* eslint-disable no-console */

import { join } from 'path';
import { unixfs } from '@helia/unixfs';
import { createHelia } from 'helia';
import { FsBlockstore } from 'blockstore-fs'

if(!process.argv[2])
    process.exit(1);

const store = new FsBlockstore(join(import.meta.url, '..', 'ipfs'));
const helia = await createHelia({ blockstore: store });
const uxfs = unixfs(helia)

// this decoder will turn Uint8Arrays into strings
const decoder = new TextDecoder()
let text = ''

for await (const chunk of uxfs.cat(process.argv[2])) {
    text += decoder.decode(chunk, {
        stream: true
    })
}

console.log(text);

process.exit(0);

