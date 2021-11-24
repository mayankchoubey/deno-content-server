import { route } from "./router.ts";
import { ENV_SERVE_PATH, ENV_NO_AUTH, ENV_API_KEYS_PATH } from "./consts.ts";
import { listenAndServe } from "https://deno.land/std/http/mod.ts";

function checkInputs(servePath:string) {
    if(!servePath) {
        console.error('Error: Serve path not specified in command line arg or environment variable', ENV_SERVE_PATH);
        Deno.exit(1);
    }
}

async function checkAccess(servePath:string) {
    if((await Deno.permissions.query({name: 'read', path: servePath})).state!=='granted') {
        console.error('Error: Missing read permission to', servePath);
        Deno.exit(1);
    }
    if((await Deno.permissions.query({name: 'env', variable: ENV_SERVE_PATH})).state!=='granted') {
        console.error('Error: Missing permission to env', ENV_SERVE_PATH);
        Deno.exit(1);
    }
    if((await Deno.permissions.query({name: 'env', variable: ENV_NO_AUTH})).state!=='granted') {
        console.error('Error: Missing permission to env', ENV_NO_AUTH);
        Deno.exit(1);
    }
    if((await Deno.permissions.query({name: 'env', variable: ENV_API_KEYS_PATH})).state!=='granted') {
        console.error('Error: Missing permission to env', ENV_API_KEYS_PATH);
        Deno.exit(1);
    }
}

const servePath=Deno.args[0] || Deno.env.get(ENV_SERVE_PATH) || '';
checkInputs(servePath);
await checkAccess(servePath);
console.log('Content server started...');
listenAndServe(':8080', route);
