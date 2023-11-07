import { execSync } from "child_process";

console.log('------ Init ------');
console.log('Deploying Contract');
execSync(`node ${new URL('deploy.mjs', import.meta.url).pathname}`, { stdio: 'inherit' });
console.log('Uploading Files to IPFS');
execSync(`node ${new URL('uploadFiles.mjs', import.meta.url).pathname}`, { stdio: 'inherit' });
console.log('Adding Index on Blockchain');
execSync(`node ${new URL('uploadInvIndex.mjs', import.meta.url).pathname}`, { stdio: 'inherit' });
console.log('------ Query ------');
console.log('Getting Index');
execSync(`node ${new URL('getInvIndex.mjs', import.meta.url).pathname}`, { stdio: 'inherit' });
