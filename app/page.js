"use client";
import dynamic from "next/dynamic";

// The app uses localStorage, speech and audio, so it renders only in the browser.
const TutorApp = dynamic(() => import("./TutorApp"), { ssr: false });

export default function Page() {
  return <TutorApp />;
}
