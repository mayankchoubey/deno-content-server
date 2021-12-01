import { authorize } from "../../authService.ts";
import { assert, assertExists } from "https://deno.land/std/testing/asserts.ts";

Deno.test("No headers", async () => {
    const headers = new Headers();
    const ret = authorize(headers);
    assertExists(ret);
    assert(ret === false);
});

Deno.test("Empty authorization header", async () => {
    const headers = new Headers({
        "Authorization": "",
    });
    const ret = authorize(headers);
    assertExists(ret);
    assert(ret === false);
});

Deno.test("Authorization header without key", async () => {
    const headers = new Headers({
        "Authorization": "Bearer",
    });
    const ret = authorize(headers);
    assertExists(ret);
    assert(ret === false);
});

Deno.test("wrong api key = fc485dd4-6237-42c3-aad8-a4eeef058239", async () => {
    const headers = new Headers({
        "Authorization": "Bearer fc485dd4-6237-42c3-aad8-a4eeef058239",
    });
    const ret = authorize(headers);
    assertExists(ret);
    assert(ret === false);
});

Deno.test("Correct api key = cba633d4-59f3-42a5-af00-b7430c3a65d8", async () => {
    const headers = new Headers({
        "Authorization": "Bearer cba633d4-59f3-42a5-af00-b7430c3a65d8",
    });
    const ret = authorize(headers);
    assertExists(ret);
    assert(ret === true);
});
