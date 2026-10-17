import { useQuery } from "@tanstack/react-query";
import { getContentHandler } from "@/query/apis/content.api";
import { EQueryKeys, type Content } from "@/types";

export const useContent = () => {
  const { data, isLoading, error } = useQuery<Content, Error>({
    queryKey: [EQueryKeys.CONTENT],
    queryFn: getContentHandler,
    staleTime: Infinity,
  });
  return { content: data, isLoading, error };
};
