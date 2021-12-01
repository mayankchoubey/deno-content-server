import { getContent } from "../../fileService.ts";
import {
    assert,
    assertExists,
    assertThrowsAsync,
} from "https://deno.land/std/testing/asserts.ts";

async function readStream(r: ReadableStream) {
    const rd = r.getReader();
    assertExists(rd);
    let bytesRead = 0;
    while (1) {
        const d = await rd.read();
        if (d.done) {
            break;
        }
        assertExists(d);
        assertExists(d.value);
        bytesRead += d.value.length;
    }
    return bytesRead;
}

Deno.test("Inexistent file", async () => {
    assertThrowsAsync(async () => {
        await getContent("someRandomFile.abc");
    }, Deno.errors.NotFound);
});

Deno.test("Directory", async () => {
    assertThrowsAsync(async () => {
        await getContent("data");
    }, Deno.errors.BadResource);
});

Deno.test("Text file textFile.txt", async () => {
    const ret = await getContent("data/textFile.txt");
    assertExists(ret);
    assertExists(ret.len);
    assertExists(ret.content);
    assert(ret.len === 22);
    assert(await readStream(ret.content) === 22);
});

Deno.test("PDF file pdfFile.txt", async () => {
    const ret = await getContent("data/pdfFile.pdf");
    assertExists(ret);
    assertExists(ret.len);
    assertExists(ret.content);
    assert(ret.len === 69273);
    assert(await readStream(ret.content) === 69273);
});
