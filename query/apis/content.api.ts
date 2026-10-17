import type { Content } from "@/types";
import { isMocked } from "@/utils";

/** All learning content (vocabulary, banks, reading texts, programme data). */
export const getContentHandler = async (): Promise<Content> => {
  if (isMocked) return (await import("@/mock")).contentMock;
  throw new Error("Supabase content is not wired yet. Set NEXT_PUBLIC_MOCK=true.");
};
