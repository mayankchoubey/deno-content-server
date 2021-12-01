import { Status } from "https://deno.land/std/http/http_status.ts";
import { CustomRequest, handleRequest } from "./controller.ts";
import { appendId } from "./utils.ts";

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
        console.warn(`${id} Router caught error: ${err.message}`);
        resp = new Response(null, { status: Status.InternalServerError });
    }
    appendId(resp, id);
    console.log(
        `${id} ${req.method} ${req.url} ${resp.status} ${
            resp.headers.has("content-length")
                ? resp.headers.get("content-length")
                : 0
        } bytes`,
    );
    return resp;
}
