import { useQuery } from "@tanstack/react-query";
import { getBestHandler, getMissesHandler, getMuteHandler } from "@/query/apis/progress.api";
import { EQueryKeys, type BestScores, type Grade, type MissedWord } from "@/types";

export const useBest = () => {
  const { data, isLoading } = useQuery<BestScores, Error>({ queryKey: [EQueryKeys.BEST], queryFn: getBestHandler });
  return { best: data ?? {}, isLoading };
};

export const useMisses = (grades: Grade[]) => {
  const { data, isLoading } = useQuery<MissedWord[], Error>({
    queryKey: [EQueryKeys.MISSES, ...grades],
    queryFn: () => getMissesHandler(grades),
    staleTime: 0,
  });
  return { misses: data ?? [], isLoading };
};

export const useMute = () => {
  const { data, isLoading } = useQuery<boolean, Error>({ queryKey: [EQueryKeys.MUTE], queryFn: getMuteHandler });
  return { muted: data ?? false, isLoading };
};
