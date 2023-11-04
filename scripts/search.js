if(!process.argv[2])
    process.exit(1);

const inv_index = require('./tok2id.json');
const id2file = require('./id2file.json');
const file2cid = require('./file2cid.json');

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

for(let a in ans) {
    console.log(file2cid[id2file[a]]);
}

