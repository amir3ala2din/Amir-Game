"use client";
import { setContent } from "@/lib/content";
import { useContent } from "@/query/queries/content/useContent.query";
import { useMemo } from "react";
import { Loading } from "./loading";

/** Loads the learning content and hands it to the game engine before children render. */
export function ContentGate({ children }: { children: React.ReactNode }) {
  const { content, error } = useContent();
  const ready = useMemo(() => {
    if (!content) return false;
    setContent(content);
    return true;
  }, [content]);
  return ready ? <>{children}</> : <Loading error={error} />;
}
