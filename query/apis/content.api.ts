import type { Content } from "@/types";
import { getSupabase, isMocked } from "@/utils";

/** All learning content (vocabulary, banks, reading texts, programme data). */
export const getContentHandler = async (): Promise<Content> => {
  if (isMocked) return (await import("@/mock")).contentMock;
  const { data, error } = await getSupabase().rpc("get_content");
  if (error) throw error;
  return data as Content;
};
