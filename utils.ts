import {readableStreamFromReader as toStream} from "https://deno.land/std/io/mod.ts";
import { Status } from "https://deno.land/std/http/http_status.ts";
import {HEADER_CONTENT_TYPE, HEADER_CONTENT_LENGTH, CONTENT_TYPE_RAW, EXTENSION_TO_CONTENT_TYPE} from "./constants.ts";
import {extname} from "https://deno.land/std/path/mod.ts";

export function sendResponseCode(resp:any, code:number) {
    resp(new Response(undefined, {status: code}));
}

export async function sendResponseFile(resp:any, f:any, type:string) {
        await resp(new Response(toStream(f.r), {
            status: Status.OK,
            headers: new Headers({[HEADER_CONTENT_TYPE]: type,
                                  [HEADER_CONTENT_LENGTH]: f.size})
    }));
}

export function getPort(name:string, defVal:number): number {
    const v=Deno.env.get(name);
    if(v && Number(v))
        return Number(v);
    return defVal;
}

export function getPath(name:string, defVal:string): string {
    let o=Deno.env.get(name);
    if(!o)
        o=defVal;
    if(!o.endsWith('/'))
        o+='/';
    return o;
}

export function getContentType(path:string) {
    return EXTENSION_TO_CONTENT_TYPE[extname(path)] || CONTENT_TYPE_RAW;
}