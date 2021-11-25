import { readableStreamFromReader as makeStream } from "https://deno.land/std/streams/mod.ts";
import { ENV_SERVE_PATH } from "./consts.ts";

const basePath = Deno.args[0] || Deno.env.get(ENV_SERVE_PATH);

export async function getContent(relativePath: string) {
    const filePath = basePath + relativePath;
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
