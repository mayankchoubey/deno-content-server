import { route } from "./router.ts";
import { serve } from "https://deno.land/std/http/mod.ts";

console.log("Content server started...");
serve(route);
