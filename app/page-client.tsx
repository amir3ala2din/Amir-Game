"use client";
import { ContentGate } from "@/components/content-gate";
import { MuteButton } from "@/components/mute-button";
import { content } from "@/lib/content";
import { setMuted, sfx } from "@/lib/audio";
import { session } from "@/lib/session";
import { gradesOf, mistakesTopic, topicsFor } from "@/lib/topics";
import { useProgressMutations } from "@/query/queries/progress/useProgress.mutation";
import { useBest, useMisses, useMute } from "@/query/queries/progress/useProgress.query";
import { HomeSection } from "@/sections/home.section";
import { HubSection } from "@/sections/hub.section";
import { KindSection } from "@/sections/kind.section";
import { LevelSection } from "@/sections/level.section";
import { PathSection, type LearningPath } from "@/sections/path.section";
import { PlaySection } from "@/sections/play.section";
import { PosSection, type PosTab } from "@/sections/pos.section";
import { ResultSection } from "@/sections/result.section";
import { TopicSection } from "@/sections/topic.section";
import type { Game, GameResult, LevelDef, LogEntry, Topic, TopicKind } from "@/types";
import { useEffect, useState } from "react";

type Screen = "home" | "path" | "level" | "kind" | "pos" | "topic" | "hub" | "play" | "result";

export default function PageClient() {
  return (
    <ContentGate>
      <GameApp />
    </ContentGate>
  );
}

function GameApp() {
  const [scr, setScr] = useState<Screen>("home");
  const [path, setPath] = useState<LearningPath | null>(null);
  const [lvl, setLvl] = useState<LevelDef | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [res, setRes] = useState<GameResult | null>(null);
  const [kind, setKind] = useState<TopicKind>("v");
  const [pos, setPos] = useState<PosTab>("n");
  const [noMistakes, setNoMistakes] = useState(false);
  const [playKey, setPlayKey] = useState(0);

  const { best } = useBest();
  const { muted } = useMute();
  const { saveBest, saveMiss, dropMiss, setMute } = useProgressMutations();

  const levels = path === "general" ? content.generalLevels : content.schoolLevels;
  const grades = lvl ? gradesOf(lvl) : [];
  const { misses } = useMisses(grades);
  const topics = lvl ? topicsFor(lvl) : [];

  useEffect(() => setMuted(muted), [muted]);
  useEffect(() => {
    const tick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.("button,a")) sfx.tick();
    };
    document.addEventListener("click", tick);
    return () => document.removeEventListener("click", tick);
  }, []);

  const play = (g: Game) => {
    setGame(g);
    setPlayKey((k) => k + 1);
    setScr("play");
  };
  const openTopic = (t: Topic) => {
    setTopic(t);
    session.grade = t.c;
    setScr("hub");
  };
  const finish = (s: number, t: number, log: LogEntry[]) => {
    if (game) saveBest({ gameId: game.id, pct: Math.round((s / t) * 100) });
    setRes({ s, t, log });
    setScr("result");
  };
  const openMistakes = () => {
    if (!misses.length) return setNoMistakes(true);
    setNoMistakes(false);
    openTopic(mistakesTopic(grades[0], misses));
  };

  let body: React.ReactNode;
  if (scr === "home") body = <HomeSection levels={content.schoolLevels} onStart={() => setScr("path")} />;
  else if (scr === "path")
    body = (
      <PathSection
        onBack={() => setScr("home")}
        onPick={(p) => {
          setPath(p);
          setScr("level");
        }}
      />
    );
  else if (scr === "level" && path)
    body = (
      <LevelSection
        path={path}
        levels={levels}
        onBack={() => setScr("path")}
        onPick={(l) => {
          setLvl(l);
          setScr("kind");
        }}
      />
    );
  else if (scr === "kind" && lvl)
    body = (
      <KindSection
        topics={topics}
        grades={grades}
        best={best}
        noMistakes={noMistakes}
        onBack={() => setScr("level")}
        onVocabulary={() => {
          setKind("v");
          setScr("pos");
        }}
        onKind={(k) => {
          setKind(k);
          setScr("topic");
        }}
        onMistakes={openMistakes}
      />
    );
  else if (scr === "pos")
    body = (
      <PosSection
        onBack={() => setScr("kind")}
        onPick={(p) => {
          setPos(p);
          setScr("topic");
        }}
      />
    );
  else if (scr === "topic" && lvl)
    body = (
      <TopicSection
        topics={topics}
        kind={kind}
        pos={pos}
        general={path === "general"}
        levelKey={lvl[2]}
        onBack={() => setScr(kind === "v" ? "pos" : "kind")}
        onPick={openTopic}
      />
    );
  else if (scr === "hub" && topic) body = <HubSection topic={topic} best={best} onBack={() => setScr(topic.id === "miss" ? "kind" : "topic")} onPlay={play} />;
  else if (scr === "play" && game) body = <PlaySection key={playKey} game={game} onDone={finish} onQuit={() => setScr("hub")} saveMiss={saveMiss} dropMiss={dropMiss} />;
  else if (scr === "result" && res && game && topic)
    body = (
      <ResultSection
        result={res}
        game={game}
        topic={topic}
        related={topics.filter((t) => t.id !== topic.id && t.c === topic.c && t.k === topic.k && t.pos === topic.pos)}
        onReplay={() => play(game)}
        onHub={() => setScr("hub")}
        onHome={() => setScr("home")}
        onPlay={play}
        onTopic={openTopic}
      />
    );

  return (
    <div className="min-h-screen overflow-x-hidden">
      <MuteButton
        muted={muted}
        onToggle={() => setMute(!muted)}
      />
      <div className={(scr === "home" ? "max-w-5xl" : "max-w-2xl") + " mx-auto p-4"}>{body}</div>
    </div>
  );
}
