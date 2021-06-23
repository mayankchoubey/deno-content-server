import { Status } from "https://deno.land/std/http/http_status.ts";
import {HTTP_METHOD_GET} from "./constants.ts";
import {getFile} from "./controller.ts";
import {sendResponseCode} from "./utils.ts";

export async function handleRequest(req: Request, resp: any) {
    if(req.method !== HTTP_METHOD_GET)
        return sendResponseCode(resp, Status.MethodNotAllowed);
    const u=new URL(req.url);
    if(u.pathname === '/')
        return sendResponseCode(resp, Status.NotFound);
    await getFile(u.pathname, resp);
}

