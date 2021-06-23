import {exists} from "https://deno.land/std/fs/mod.ts";
import {SERVE_FILE_PATH} from "./constants.ts";

export async function fetch(path:string) {
    const filePath=SERVE_FILE_PATH+path;
    if(!await exists(filePath))
        return;
    const size=(await Deno.stat(filePath)).size;
    return {size, r: await Deno.open(filePath)};
}