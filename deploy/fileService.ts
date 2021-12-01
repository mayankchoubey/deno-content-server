import { readableStreamFromReader as makeStream } from "https://deno.land/std/streams/mod.ts";
import { SERVE_PATH } from "./consts.ts";

export async function getContent(relativePath: string) {
    const filePath = SERVE_PATH + relativePath;
    const fileData = await Deno.stat(filePath);
    if (!fileData.isFile) {
        throw new Deno.errors.BadResource("Directories cannot be served");
    }
    const r = await Deno.open(filePath);
    return {
        len: fileData.size,
        content: makeStream(r),
    };
}
