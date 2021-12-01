import { assert, assertExists } from "https://deno.land/std/testing/asserts.ts";

const baseUrl = "http://localhost:8080/data/pdfFile.pdf",
    token = "cba633d4-59f3-42a5-af00-b7430c3a65d8";

async function runTest(concurrency: number) {
    const p = new Array(concurrency).fill(
        new Promise(async (resolve) => {
            const res = await fetch(baseUrl, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            const resData = await res.arrayBuffer();
            resolve({ status: res.status, len: resData.byteLength });
        }),
    );
    const responses = await Promise.all(p);
    for (const resp of responses) {
        assert(resp.status === 200);
        assert(resp.len === 69273);
    }
}

Deno.test("concurrency=100, repeat=100", async () => {
    for (let i = 0; i < 10; i++) {
        await runTest(10);
    }
});

Deno.test("concurrency=1000, repeat=1000", async () => {
    for (let i = 0; i < 1000; i++) {
        await runTest(1000);
    }
});

Deno.test("concurrency=10000, repeat=10000", async () => {
    for (let i = 0; i < 10000; i++) {
        await runTest(10000);
    }
});
