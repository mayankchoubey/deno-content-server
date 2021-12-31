import { makeStream } from "./deps.ts";
import { SERVE_PATH } from "./consts.ts";

/** @module FileService */

/**
 * Opens the given path with respect to the base path, and returns:
 * len - The length of the file
 * content - The stream of the file
 */
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
