const path = require('path');

const server = Bun.serve({
    fetch(request) {
        const url = new URL(request.url);
        if(url.pathname === '/') return serveHTML();
        if(url.pathname === '/search') return search(request);
        if(url.pathname === '/getfile') return getFile(request);
        return new Response("Not a valid route");
    },
})

function serveHTML() {
    return new Response(Bun.file(path.join(__dirname, "page.html")));
}

async function search(req) {
    const formData = await req.formData();
    const term = formData.get('search');
    const filepath = path.join(__dirname, '..', 'scripts', 'search.js');

    const proc = Bun.spawn(['node', filepath, term]);
    const text = await new Response(proc.stdout).text();
    console.log(`Got search results for ${term}`);

    return new Response('<p>' + text.replace('\n', '<br />') + '</p>');
}

async function getFile(req) {
    const formData = await req.formData();
    const term = formData.get('file');
    const filepath = path.join(__dirname, '..', 'scripts', 'getFiles.mjs');

    const proc = Bun.spawn(['node', filepath, term]);
    const text = await new Response(proc.stdout).text();
    console.log(`Got content from ${term}`);
    // console.log(text);

    return new Response('<p>' + text + '</p>');
}

console.log(`Listening on localhost:${server.port}`);
