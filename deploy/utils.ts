export function appendId(resp: Response, id: string) {
    if (!resp) {
        return;
    }
    resp.headers.set("x-tracking-id", id);
}
