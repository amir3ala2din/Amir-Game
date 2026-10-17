let muted = false;
let ctx: AudioContext | undefined;

export const isMuted = () => muted;
export const setMuted = (m: boolean) => {
  muted = m;
};

const tone = (f: number, d = 0.12, t: OscillatorType = "sine", v = 0.12, w = 0) => {
  if (muted) return;
  try {
    ctx = ctx || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const s = ctx.currentTime + w;
    o.type = t;
    o.frequency.value = f;
    g.gain.setValueAtTime(v, s);
    g.gain.exponentialRampToValueAtTime(0.001, s + d);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(s);
    o.stop(s + d);
  } catch {}
};

export const sfx = {
  tick: () => tone(660, 0.05, "square", 0.05),
  ok: () => {
    tone(523, 0.12, "triangle", 0.16);
    tone(784, 0.22, "triangle", 0.16, 0.1);
  },
  bad: () => {
    tone(220, 0.25, "sawtooth", 0.12);
    tone(165, 0.3, "sawtooth", 0.12, 0.15);
  },
  win: () => [523, 659, 784, 1047].forEach((f, k) => tone(f, 0.22, "triangle", 0.16, k * 0.12)),
};

export const speak = (t: string) => {
  if (muted) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(
      String(t)
        .replace(/a\/an/g, "a")
        .replace(/_+/g, ", ")
        .replace(/[=\/↔→←+|]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    );
    u.lang = "en-US";
    u.rate = 0.85;
    speechSynthesis.speak(u);
  } catch {}
};
