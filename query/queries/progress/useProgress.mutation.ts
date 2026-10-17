import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dropMissHandler, saveBestHandler, saveMissHandler, setMuteHandler } from "@/query/apis/progress.api";
import { EQueryKeys } from "@/types";

export const useProgressMutations = () => {
  const qc = useQueryClient();
  const misses = () => qc.invalidateQueries({ queryKey: [EQueryKeys.MISSES] });

  const saveBest = useMutation({
    mutationFn: saveBestHandler,
    onSuccess: (best) => qc.setQueryData([EQueryKeys.BEST], best),
  });
  const saveMiss = useMutation({ mutationFn: saveMissHandler, onSuccess: misses });
  const dropMiss = useMutation({ mutationFn: dropMissHandler, onSuccess: misses });
  const setMute = useMutation({
    mutationFn: setMuteHandler,
    onSuccess: (muted) => qc.setQueryData([EQueryKeys.MUTE], muted),
  });

  return {
    saveBest: saveBest.mutate,
    saveMiss: saveMiss.mutate,
    dropMiss: dropMiss.mutate,
    setMute: setMute.mutate,
  };
};
