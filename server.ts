import {PORT as port, SERVE_FILE_PATH} from "./constants.ts";
import {handleRequest} from "./router.ts";

if(!await checkSandbox(SERVE_FILE_PATH)) {
    console.error('Required read/net access is denied, exiting');
    Deno.exit(1);
}

const listener = Deno.listen({port});

for await(const conn of listener)
    handleNewConnection(conn);
    
async function handleNewConnection(conn: Deno.Conn) {
    for await(const req of Deno.serveHttp(conn))
        await handleRequest(req.request, req.respondWith);
}

async function checkSandbox(path:string):Promise<boolean> {
    if((await Deno.permissions.query({name: 'read', path})).state !== 'granted')
        return false;
    if((await Deno.permissions.query({name: 'net', host: '0.0.0.0:'+port})).state !== 'granted')
        return false;
    return true;
}

