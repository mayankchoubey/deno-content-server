import { route } from "../../router.ts";
import { assert, assertExists } from "https://deno.land/std/testing/asserts.ts";

const baseUrl = "http://localhost:8000",
    token = "cba633d4-59f3-42a5-af00-b7430c3a65d8";

Deno.test("POST", async () => {
    const req = new Request(baseUrl + "/", {
        method: "POST",
    });
    const resp = await route(req);
    assertExists(resp);
    assertExists(resp.status);
    assert(resp.status === 405);
});

Deno.test("DELETE", async () => {
    const req = new Request(baseUrl + "/", {
        method: "DELETE",
    });
    const resp = await route(req);
    assertExists(resp);
    assertExists(resp.status);
    assert(resp.status === 405);
});

Deno.test("Text file", async () => {
    const req = new Request(baseUrl + "/data/textFile.txt", {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    const resp = await route(req);
    assertExists(resp);
    assertExists(resp.status);
    assertExists(resp.headers.get("content-length"));
    assert(Number(resp.headers.get("content-length")) === 22);
    assertExists(resp.headers.get("content-type"));
    assert(resp.headers.get("content-type") === "text/plain");
    assert(resp.status === 200);
    const respBody = await resp.arrayBuffer();
    assert(respBody.byteLength === 22);
});
