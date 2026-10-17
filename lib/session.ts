import type { Grade } from "@/types";

/** Grade the learner is currently playing; generators that need grade words read it. */
export const session: { grade: Grade } = { grade: "3AP" };
