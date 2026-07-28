import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Home, Sparkles, Dice5, Coins, Check, X, ShoppingBag } from "lucide-react";
import {
  SKINS,
  DEFAULT_SKIN_ID,
  loadPoints,
  savePoints,
  loadActive,
} from "@/lib/skins";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "구구단 챌린지" },
      { name: "description", content: "룰렛으로 랜덤 구구단 문제를 풀고 포인트를 모아 스킨을 사보세요." },
    ],
  }),
  component: Index,
});

type Problem = { a: number; b: number; key: number };
type Verdict = "correct" | "wrong" | null;

function Index() {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [count, setCount] = useState(0);
  const [points, setPoints] = useState(0);
  const [activeSkin, setActiveSkin] = useState(DEFAULT_SKIN_ID);
  const [spinning, setSpinning] = useState(false);
  const [spinA, setSpinA] = useState(2);
  const [spinB, setSpinB] = useState(2);
  const [verdict, setVerdict] = useState<Verdict>(null);

  useEffect(() => {
    setPoints(loadPoints());
    setActiveSkin(loadActive());
  }, []);

  const skin = SKINS.find((s) => s.id === activeSkin) ?? SKINS[0];

  const generate = () => {
    if (spinning) return;
    setVerdict(null);
    setSpinning(true);
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    const start = Date.now();
    const duration = 1400;
    const tick = () => {
      const elapsed = Date.now() - start;
      setSpinA(Math.floor(Math.random() * 8) + 2);
      setSpinB(Math.floor(Math.random() * 8) + 2);
      if (elapsed < duration) {
        const delay = 50 + (elapsed / duration) * 180;
        setTimeout(tick, delay);
      } else {
        setSpinA(a);
        setSpinB(b);
        setProblem({ a, b, key: Date.now() });
        setSpinning(false);
        setCount((c) => c + 1);
      }
    };
    tick();
  };

  const markCorrect = () => {
    if (!problem || spinning || verdict) return;
    setVerdict("correct");
    const newPts = points + 100;
    setPoints(newPts);
    savePoints(newPts);
  };

  const markWrong = () => {
    if (!problem || spinning || verdict) return;
    setVerdict("wrong");
  };

  const goHome = () => {
    setProblem(null);
    setVerdict(null);
    setCount(0);
  };

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden px-6 py-8 transition-colors"
      style={{ background: skin.background }}
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={goHome}
          aria-label="홈으로"
          className="group flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-foreground bg-card text-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
          style={{ boxShadow: "var(--shadow-pop-sm)" }}
        >
          <Home className="h-5 w-5 transition-transform group-hover:rotate-[-8deg]" />
        </button>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-2 rounded-full border-2 border-foreground bg-card px-4 py-2 text-sm font-bold"
            style={{ boxShadow: "var(--shadow-pop-sm)" }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span>문제 {count}</span>
          </div>
          <div
            className="flex items-center gap-2 rounded-full border-2 border-foreground bg-card px-4 py-2 text-sm font-bold"
            style={{ boxShadow: "var(--shadow-pop-sm)" }}
          >
            <Coins className="h-4 w-4 text-primary" />
            <span className="tabular-nums">{points} P</span>
          </div>
          <Link
            to="/shop"
            className="flex h-10 items-center gap-1 rounded-full border-2 border-foreground bg-secondary px-4 text-sm font-bold text-secondary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
            style={{ boxShadow: "var(--shadow-pop-sm)" }}
          >
            <ShoppingBag className="h-4 w-4" />
            숍
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-10">
        <div className="text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Times Tables
          </p>
          <h1 className="text-5xl font-black tracking-tight md:text-6xl">
            구구단 <span className="text-primary">챌린지</span>
          </h1>
        </div>

        <div
          key={problem?.key ?? "empty"}
          className="relative w-full max-w-2xl animate-in fade-in zoom-in-95 duration-300"
        >
          <div
            className={`relative rounded-[2rem] border-2 border-foreground bg-card p-10 text-center md:p-14 transition-transform ${
              spinning ? "animate-pulse" : ""
            } ${verdict === "correct" ? "ring-4 ring-primary" : ""} ${
              verdict === "wrong" ? "ring-4 ring-destructive" : ""
            }`}
            style={{ boxShadow: "var(--shadow-pop)" }}
          >
            {problem || spinning ? (
              <>
                <p className="mb-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {spinning ? "🎰 룰렛 돌리는 중..." : verdict === "correct" ? "정답! +100P" : verdict === "wrong" ? `아쉬워요! 정답은 ${problem!.a * problem!.b}` : "문제"}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-7xl font-black leading-none md:text-8xl">
                  <span
                    className={`inline-block tabular-nums ${spinning ? "animate-bounce" : ""}`}
                    style={spinning ? { animationDuration: "0.25s" } : undefined}
                  >
                    {spinning ? spinA : problem!.a}
                  </span>
                  <span className="text-primary">×</span>
                  <span
                    className={`inline-block tabular-nums ${spinning ? "animate-bounce" : ""}`}
                    style={spinning ? { animationDuration: "0.25s", animationDelay: "0.1s" } : undefined}
                  >
                    {spinning ? spinB : problem!.b}
                  </span>
                  <span className="text-muted-foreground">=</span>
                  {verdict ? (
                    <span className={verdict === "correct" ? "text-primary" : "text-destructive"}>
                      {problem!.a * problem!.b}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">?</span>
                  )}
                </div>

                {!spinning && problem && (
                  <div className="mt-8 flex items-center justify-center gap-3">
                    <button
                      onClick={markCorrect}
                      disabled={verdict !== null}
                      aria-label="정답"
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-foreground bg-primary text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0"
                      style={{ boxShadow: "var(--shadow-pop-sm)" }}
                    >
                      <Check className="h-6 w-6" strokeWidth={3} />
                    </button>
                    <button
                      onClick={markWrong}
                      disabled={verdict !== null}
                      aria-label="틀림"
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-foreground bg-destructive text-destructive-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0"
                      style={{ boxShadow: "var(--shadow-pop-sm)" }}
                    >
                      <X className="h-6 w-6" strokeWidth={3} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 py-4">
                <Dice5 className="h-14 w-14 text-primary" />
                <p className="text-lg font-bold">아래 버튼을 눌러 시작!</p>
                <p className="text-sm text-muted-foreground">맞추면 +100 포인트</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <button
            onClick={generate}
            disabled={spinning}
            className="flex h-14 items-center gap-2 rounded-2xl border-2 border-foreground bg-primary px-8 text-lg font-black text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0"
            style={{ boxShadow: "var(--shadow-pop)" }}
          >
            <Dice5 className={`h-5 w-5 ${spinning ? "animate-spin" : ""}`} />
            {spinning ? "돌리는 중..." : problem ? "다음 문제" : "룰렛 돌리기"}
          </button>
        </div>
      </main>

      <footer className="pt-6 text-center text-xs font-medium text-muted-foreground">
        ⭐ 문제를 풀고 포인트를 모아 스킨을 사보세요 ⭐
      </footer>
    </div>
  );
}
