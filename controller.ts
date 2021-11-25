import { authorize } from "./authService.ts";
import { getContent } from "./fileService.ts";
import { Status } from "https://deno.land/std/http/http_status.ts";
import { CONTENT_TYPE_RAW as rawCT, EXTENSION_TO_CONTENT_TYPE as getCT } from "./consts.ts";
import { extname as ext } from "https://deno.land/std/path/mod.ts";

export async function handleRequest(req: Request): Promise<Response> {
    const relativePath = (new URL(req.url)).pathname;
    if (!authorize(req.headers)) {
        return new Response(null, { status: Status.Unauthorized });
    }
    try {
        const { len, content } = await getContent(relativePath);
        return new Response(content, {
            status: 200,
            headers: {
                "content-length": len.toString(),
                "content-type": getCT[ext(relativePath)] || rawCT,
            },
        });
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
            return new Response(null, { status: Status.NotFound });
        }
        if (err instanceof Deno.errors.BadResource) {
            return new Response(null, { status: Status.UnprocessableEntity });
        }
    }
    return new Response(null, { status: Status.InternalServerError });
}
