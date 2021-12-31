import { Status } from "./deps.ts";
import { CustomRequest, handleRequest } from "./controller.ts";
import { log } from "./logger.ts";
import { appendId } from "./utils.ts";

/** @module Router */

/**
 * Routes the incoming Request to appropriate controller & sends the Response back to the caller
 */
export async function route(req: Request): Promise<Response> {
    let resp: Response;
    const id = await crypto.randomUUID();
    try {
        if (req.method !== "GET") {
            resp = new Response(null, { status: Status.MethodNotAllowed });
        } else {
            resp = await handleRequest({ id, req } as CustomRequest);
        }
    } catch (err) {
        log.critical(`${id} Router caught error: ${err.message}`);
        resp = new Response(null, { status: Status.InternalServerError });
    }
    appendId(resp, id);
    log.info(
        `${id} ${req.method} ${req.url} ${resp.status} ${
            resp.headers.has("content-length")
                ? resp.headers.get("content-length")
                : 0
        } bytes`,
    );
    return resp;
}
