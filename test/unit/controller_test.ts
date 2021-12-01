import { handleRequest } from "../../controller.ts";
import { assert, assertExists } from "https://deno.land/std/testing/asserts.ts";

const baseUrl = "http://localhost:8000",
    token = "cba633d4-59f3-42a5-af00-b7430c3a65d8";

Deno.test("No Authorization header", async () => {
    const req = new Request(baseUrl + "/");
    const resp = await handleRequest(req);
    assertExists(resp);
    assertExists(resp.status);
    assert(resp.status === 401);
});

Deno.test("Incomplete Authorization header", async () => {
    const req = new Request(baseUrl + "/", {
        headers: {
            "Authorization": "Bearer",
        },
    });
    const resp = await handleRequest(req);
    assertExists(resp);
    assertExists(resp.status);
    assert(resp.status === 401);
});

Deno.test("Invalid key in Authorization header", async () => {
    const req = new Request(baseUrl + "/", {
        headers: {
            "Authorization": "Bearer fc485dd4-6237-42c3-aad8-a4eeef058239",
        },
    });
    const resp = await handleRequest(req);
    assertExists(resp);
    assertExists(resp.status);
    assert(resp.status === 401);
});

Deno.test("No file path", async () => {
    const req = new Request(baseUrl + "/", {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    const resp = await handleRequest(req);
    assertExists(resp);
    assertExists(resp.status);
    assert(resp.status === 422);
});

Deno.test("Directory path", async () => {
    const req = new Request(baseUrl + "/data", {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    const resp = await handleRequest(req);
    assertExists(resp);
    assertExists(resp.status);
    assert(resp.status === 422);
});

Deno.test("Text file", async () => {
    const req = new Request(baseUrl + "/data/textFile.txt", {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    const resp = await handleRequest(req);
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

Deno.test("PDF file", async () => {
    const req = new Request(baseUrl + "/data/pdfFile.pdf", {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    const resp = await handleRequest(req);
    assertExists(resp);
    assertExists(resp.status);
    assertExists(resp.headers.get("content-length"));
    assert(Number(resp.headers.get("content-length")) === 69273);
    assertExists(resp.headers.get("content-type"));
    assert(resp.headers.get("content-type") === "application/pdf");
    assert(resp.status === 200);
    const respBody = await resp.arrayBuffer();
    assert(respBody.byteLength === 69273);
});
