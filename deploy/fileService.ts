import { SERVE_PATH } from "./consts.ts";

export async function getContent(relativePath: string) {
    const filePath = SERVE_PATH + relativePath;
    const file = await Deno.readFile(filePath);
    return {
        len: file.length,
        content: file,
    };
}
