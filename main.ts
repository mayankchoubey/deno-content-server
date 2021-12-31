import { API_KEYS_PATH, SERVE_PATH } from "./consts.ts";
import { route } from "./router.ts";
import { serve } from "./deps.ts";
import { log } from "./logger.ts";

async function checkAccess() {
    const servePath = Deno.args[0] || SERVE_PATH || "";
    if (!servePath) {
        console.error(
            "Error: Serve path not specified in command line or config file",
        );
        Deno.exit(1);
    }
    if (
        (await Deno.permissions.query({ name: "read", path: servePath }))
            .state !== "granted"
    ) {
        console.error("Error: Missing read permission to", servePath);
        Deno.exit(1);
    }
    if (
        (await Deno.permissions.query({ name: "read", path: API_KEYS_PATH }))
            .state !== "granted"
    ) {
        console.error("Error: Missing read permission to", API_KEYS_PATH);
        Deno.exit(1);
    }
}

await checkAccess();
log.critical("Content server started...");
serve(route, {port: 8080});
