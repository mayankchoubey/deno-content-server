import { assert, assertExists } from "https://deno.land/std/testing/asserts.ts";

const baseUrl = "http://localhost:8080",
    token = "cba633d4-59f3-42a5-af00-b7430c3a65d8";

Deno.test("No auth header", async () => {
    const resp = await fetch(baseUrl);
    const respData = await resp.arrayBuffer();
    assert(respData.byteLength === 0);
    assertExists(resp.status);
    assert(resp.status === 401);
});

Deno.test("Empty auth header", async () => {
    const resp = await fetch(baseUrl, {
        headers: {
            "Authorization": "Bearer",
        },
    });
    const respData = await resp.arrayBuffer();
    assert(respData.byteLength === 0);
    assertExists(resp.status);
    assert(resp.status === 401);
});

Deno.test("Invalid token", async () => {
    const resp = await fetch(baseUrl, {
        headers: {
            "Authorization": "Bearer fc485dd4-6237-42c3-aad8-a4eeef058239",
        },
    });
    const respData = await resp.arrayBuffer();
    assert(respData.byteLength === 0);
    assertExists(resp.status);
    assert(resp.status === 401);
});

Deno.test("POST", async () => {
    const resp = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    const respData = await resp.arrayBuffer();
    assert(respData.byteLength === 0);
    assertExists(resp.status);
    assert(resp.status === 405);
});

Deno.test("Get directory", async () => {
    const resp = await fetch(baseUrl + "/data", {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    const respData = await resp.arrayBuffer();
    assert(respData.byteLength === 0);
    assertExists(resp.status);
    assert(resp.status === 422);
});

Deno.test("Text file", async () => {
    const resp = await fetch(baseUrl + "/data/textFile.txt", {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    const respData = await resp.text();
    assertExists(resp.status);
    assertExists(resp.headers.get("content-length"));
    assert(Number(resp.headers.get("content-length")) === 22);
    assertExists(resp.headers.get("content-type"));
    assert(resp.headers.get("content-type") === "text/plain");
    assert(respData.length === 22);
    assert(resp.status === 200);
});

Deno.test("PDF file", async () => {
    const resp = await fetch(baseUrl + "/data/pdfFile.pdf", {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    const respData = await resp.arrayBuffer();
    assertExists(resp.status);
    assertExists(resp.headers.get("content-length"));
    assert(Number(resp.headers.get("content-length")) === 69273);
    assertExists(resp.headers.get("content-type"));
    assert(resp.headers.get("content-type") === "application/pdf");
    assert(respData.byteLength === 69273);
    assert(resp.status === 200);
});
