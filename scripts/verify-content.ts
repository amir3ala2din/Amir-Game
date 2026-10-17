/** Checks that get_content() in Supabase returns exactly what mock/ contains. */
import { isDeepStrictEqual } from "node:util";
import { contentMock } from "../mock";

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  const res = await fetch(`${url}/rest/v1/rpc/get_content`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: "{}",
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const db = await res.json();
  const keys = Object.keys(contentMock) as (keyof typeof contentMock)[];
  const bad = keys.filter((k) => !isDeepStrictEqual(JSON.parse(JSON.stringify(contentMock[k])), db[k]));
  console.log(bad.length ? `MISMATCH in: ${bad.join(", ")}` : `OK: ${keys.length} sections match mock/`);
  process.exit(bad.length ? 1 : 0);
}
main();
