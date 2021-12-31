import { authorize } from "./authService.ts";
import { getContent } from "./fileService.ts";
import { Status } from "./deps.ts";
import {
    CONTENT_TYPE_RAW as rawCT,
    EXTENSION_TO_CONTENT_TYPE as getCT,
} from "./consts.ts";
import {  ext } from "./deps.ts";
import { log } from "./logger.ts";

/** @module Controller */

/** The CustomRequest interface */
export interface CustomRequest {
    /** Tracking ID */
    id: string;
    /** Original Request object */
    req: Request;
}

/**
 * Processes the incoming Request in two steps:
 * 1) Checks if authorized to access the resource
 * 2) Gets the resource
 * A Response object is sent back to the caller.
 */
export async function handleRequest(request: CustomRequest): Promise<Response> {
    const req: Request = request.req;
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
        log.critical(`${request.id} Caught exception ${err.message}`);
        if (err instanceof Deno.errors.NotFound) {
            return new Response(null, { status: Status.NotFound });
        }
        if (err instanceof Deno.errors.BadResource) {
            return new Response(null, { status: Status.UnprocessableEntity });
        }
    }
    return new Response(null, { status: Status.InternalServerError });
}
