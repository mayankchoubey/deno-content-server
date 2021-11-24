import { ENV_API_KEYS_PATH, API_KEYS_PATH, ENV_NO_AUTH } from "./consts.ts";

let apiKeys:Array<string>=[];
try {
    apiKeys=JSON.parse(Deno.readTextFileSync(Deno.env.get(ENV_API_KEYS_PATH) || API_KEYS_PATH);
} catch(e) {}

export function authorize(headers:Headers) {
    const authorized=true, notAuthorized=false;
    if(Deno.env.get(ENV_NO_AUTH) || !apiKeys.length)
        return authorized;
    const authHeader=headers.get('Authorization');
    if(!authHeader)
        return notAuthorized;
    const apiKey=authHeader.split(" ")[1];
    if(!apiKey)
        return notAuthorized;
    return apiKeys.includes(apiKey);
}
