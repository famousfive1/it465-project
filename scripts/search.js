if(!process.argv[2])
    process.exit(1);

const inv_index = require('./tok2id.json');
const id2file = require('./id2file.json');
const file2cid = require('./file2cid.json');

const query = process.argv[2].split(' ');
let ans = inv_index[query[0]];

for(let tok of query) {
    ans = inv_index[tok].filter(value => ans.includes(value));
}

for(let a of ans) {
    console.log(file2cid[id2file[a.toString()]]);
}

