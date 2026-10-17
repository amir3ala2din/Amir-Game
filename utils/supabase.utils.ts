import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | undefined;

/** Browser client (publishable key). Created lazily so mock mode needs no env vars. */
export const getSupabase = () =>
  (client ??= createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!));

let pendingUser: Promise<string | null> | undefined;

/**
 * Id of the signed-in user, signing in anonymously on first use (progress is per user, no
 * login screen yet). Shared promise so parallel first requests create one user. Returns
 * null when anonymous sign-ins are disabled, and progress then falls back to localStorage.
 */
export const ensureUser = () =>
  (pendingUser ??= (async () => {
    const supabase = getSupabase();
    const { data } = await supabase.auth.getSession();
    if (data.session) return data.session.user.id;
    const res = await supabase.auth.signInAnonymously();
    return res.error ? null : (res.data.user?.id ?? null);
  })());
