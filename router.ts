import { Status } from "https://deno.land/std/http/http_status.ts";
import { handleRequest } from "./controller.ts";

export async function route(req:Request):Promise<Response> {
    if(req.method !== 'GET')
        return new Response(null, {status: Status.MethodNotAllowed});
    return await handleRequest(req);
}
