import { API_KEYS_PATH } from "./consts.ts";

let apiKeys: Array<string> = [];
try {
    apiKeys = JSON.parse(Deno.readTextFileSync(API_KEYS_PATH));
} catch (_e) {
    console.info("No API keys found, authentication is disabled");
}

/** @module AuthService */

/** Authorizes the request by performing checks on the Authorization header's bearer token:
 * 1) If API keys are not provisioned or includes token, it's authorized (true)
 * 2) Unauthorized, otherwise (false)
 */
export function authorize(headers: Headers): boolean {
    const authorized = true, notAuthorized = false;
    if (!apiKeys.length) {
        return authorized;
    }
    const authHeader = headers.get("Authorization");
    if (!authHeader) {
        return notAuthorized;
    }
    const apiKey = authHeader.split(" ")[1];
    if (!apiKey) {
        return notAuthorized;
    }
    return apiKeys.includes(apiKey);
}
