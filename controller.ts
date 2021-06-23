import {Status} from "https://deno.land/std/http/http_status.ts"
import {getContentType} from "./utils.ts";
import {sendResponseCode, sendResponseFile} from "./utils.ts";
import {fetch} from "./service.ts";

export async function getFile(path: string, resp: any) {
    const f=await fetch(path);
    if(!f)
        return sendResponseCode(resp, Status.NotFound);
    const ct=getContentType(path);
    await sendResponseFile(resp, f, ct);
}