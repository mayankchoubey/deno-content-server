import { getContent } from "./fileService.ts";
import { Status } from "https://deno.land/std/http/http_status.ts";
import {
    CONTENT_TYPE_RAW as rawCT,
    EXTENSION_TO_CONTENT_TYPE as getCT,
} from "./consts.ts";
import { extname as ext } from "https://deno.land/std/path/mod.ts";

export interface CustomRequest {
    id: string;
    req: Request;
}

export async function handleRequest(request: CustomRequest): Promise<Response> {
    const req: Request = request.req;
    const relativePath = (new URL(req.url)).pathname;
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
        console.warn(`${request.id} Caught exception ${err.message}`);
        if (err instanceof Deno.errors.NotFound) {
            return new Response(null, { status: Status.NotFound });
        }
        if (err instanceof Deno.errors.BadResource) {
            return new Response(null, { status: Status.UnprocessableEntity });
        }
    }
    return new Response(null, { status: Status.InternalServerError });
}
