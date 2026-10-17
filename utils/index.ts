/** `NEXT_PUBLIC_MOCK=true` serves content/progress from `mock/` + localStorage instead of Supabase. */
export const isMocked = process.env.NEXT_PUBLIC_MOCK === "true";
