import { execSync } from "child_process";

console.log('------ Init ------');
console.log('Deploying Contract');
execSync(`npx hardhat run --network localhost ${new URL('deployIndex.js', import.meta.url).pathname}`, { stdio: 'inherit' });
console.log('Uploading Files to IPFS');
execSync(`node ${new URL('uploadFiles.mjs', import.meta.url).pathname}`, { stdio: 'inherit' });
console.log('Adding Index on Blockchain');
execSync(`npx hardhat run --network localhost ${new URL('addIndex.js', import.meta.url).pathname}`, { stdio: 'inherit' });
console.log('------ Query ------');
console.log('Getting Index');
execSync(`npx hardhat run --network localhost ${new URL('getIndex.js', import.meta.url).pathname}`, { stdio: 'inherit' });
console.log('Searching');
execSync(`node ${new URL('search.js', import.meta.url).pathname} the`, { stdio: 'inherit' });

