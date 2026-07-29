import { useEffect, useState } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  speed: number;
  spin: number;
  emoji?: string;
};

const CONFETTI_COLORS = ["#ff6b6b","#feca57","#48dbfb","#ff9ff3","#54a0ff","#5f27cd","#00d2d3","#01aaa4"];
const STAR_COLORS    = ["#ffd700","#fff176","#fffde7","#ffeb3b","#ff9800"];
const HEART_COLORS   = ["#ff6b9d","#ff4081","#f06292","#ec407a","#ff80ab"];
const FIREWORK_COLORS= ["#ff6b6b","#ffd700","#48dbfb","#ff9ff3","#a29bfe","#55efc4"];
const RAINBOW_COLORS = ["#ff0000","#ff7700","#ffff00","#00cc00","#0000ff","#8b00ff","#ff69b4"];
const SAKURA_COLORS  = ["#ffb7c5","#ff90a8","#ffc0cb","#ffaec9","#ff85a1"];
const SNOW_COLORS    = ["#e0f7fa","#b2ebf2","#ffffff","#e3f2fd","#bbdefb"];
const LIGHTNING_COLORS=["#ffd700","#fff176","#ffeb3b","#ffe57f","#ffffff"];
const COIN_COLORS    = ["#ffd700","#ffb300","#ffc107","#ff8f00","#ffe082"];

function makeParticles(count: number, emojis?: string[], colors?: string[]): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 40 + 5,
    color: colors ? colors[i % colors.length] : CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: Math.random() * 12 + 8,
    angle: Math.random() * 360,
    speed: Math.random() * 2.5 + 1,
    spin: (Math.random() - 0.5) * 720,
    emoji: emojis ? emojis[i % emojis.length] : undefined,
  }));
}

function ParticleEl({ p, duration }: { p: Particle; duration: number }) {
  const style: React.CSSProperties = {
    position: "absolute",
    left: `${p.x}%`,
    top: `${p.y}%`,
    width: p.emoji ? undefined : p.size,
    height: p.emoji ? undefined : p.size,
    fontSize: p.emoji ? p.size + 8 : undefined,
    backgroundColor: p.emoji ? undefined : p.color,
    borderRadius: "2px",
    transform: `rotate(${p.angle}deg)`,
    animation: `particle-fall ${duration}ms ease-in forwards`,
    ["--fall-dist" as string]: `${p.speed * 80 + 60}px`,
    ["--spin" as string]: `${p.spin}deg`,
    pointerEvents: "none",
    lineHeight: 1,
  };
  return <div style={style}>{p.emoji ?? ""}</div>;
}

type EffectProps = { effectId: string; triggerKey: number };

export function CorrectEffect({ effectId, triggerKey }: EffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (triggerKey === 0 || effectId === "none") return;
    setVisible(true);

    let ps: Particle[] = [];
    switch (effectId) {
      case "confetti":   ps = makeParticles(45, undefined, CONFETTI_COLORS); break;
      case "coins":      ps = makeParticles(30, ["💰","🪙","✨"], COIN_COLORS); break;
      case "stars":      ps = makeParticles(35, ["⭐","🌟","✨"], STAR_COLORS); break;
      case "hearts":     ps = makeParticles(30, ["💖","💗","💕","❤️"], HEART_COLORS); break;
      case "lightning":  ps = makeParticles(20, ["⚡","✨","💥"], LIGHTNING_COLORS); break;
      case "sakura":     ps = makeParticles(40, ["🌸","🌺","🌷"], SAKURA_COLORS); break;
      case "fireworks":  ps = makeParticles(55, ["🎆","✨","💥","🌟"], FIREWORK_COLORS); break;
      case "snow":       ps = makeParticles(45, ["❄️","🌨️","⛄"], SNOW_COLORS); break;
      case "rainbow":    ps = makeParticles(50, ["🌈","⭐","✨","💫","🎉"], RAINBOW_COLORS); break;
    }

    setParticles(ps);
    const duration = effectId === "snow" ? 1600 : effectId === "rainbow" || effectId === "fireworks" ? 1400 : 1100;
    const t = setTimeout(() => { setVisible(false); setParticles([]); }, duration + 200);
    return () => clearTimeout(t);
  }, [triggerKey, effectId]);

  if (!visible || particles.length === 0) return null;

  const duration = effectId === "snow" ? 1600 : effectId === "rainbow" || effectId === "fireworks" ? 1400 : 1100;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      <style>{`
        @keyframes particle-fall {
          0%   { transform: rotate(0deg) translateY(0) scale(1); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: rotate(var(--spin, 360deg)) translateY(var(--fall-dist, 80px)) scale(0.4); opacity: 0; }
        }
      `}</style>
      {particles.map((p) => (
        <ParticleEl key={p.id} p={p} duration={duration} />
      ))}
    </div>
  );
}
