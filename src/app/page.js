"use client";
import dynamic from "next/dynamic";

// Client-only: the app touches document/localStorage/speechSynthesis at module load.
const TutorApp = dynamic(() => import("@/components/TutorApp"), { ssr: false });

export default function Home() {
  return <TutorApp />;
}
