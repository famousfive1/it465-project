const a = require('./deployIdx');
const b = require('./getIdx');
const c = require('./addIdx');

async function main() {
    console.log("--- Deploy ---");
    const add = await a.deployIndex();
    console.log("--- Adding ---");
    await c.addIndex(add);
    console.log("--- Getting ---");
    await b.getIndex(add);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
