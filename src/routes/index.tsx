import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Home, Sparkles, Eye, EyeOff, Dice5 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "구구단 챌린지" },
      { name: "description", content: "버튼을 누르면 랜덤 구구단 문제가 나옵니다." },
    ],
  }),
  component: Index,
});

type Problem = { a: number; b: number; key: number };

function Index() {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [count, setCount] = useState(0);

  const generate = () => {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    setProblem({ a, b, key: Date.now() });
    setShowAnswer(false);
    setCount((c) => c + 1);
  };

  const goHome = () => {
    setProblem(null);
    setShowAnswer(false);
    setCount(0);
  };

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden px-6 py-8"
      style={{
        backgroundColor: "var(--color-background)",
        backgroundImage:
          "radial-gradient(circle at 15% 15%, oklch(0.85 0.18 85 / 0.5), transparent 40%), radial-gradient(circle at 85% 85%, oklch(0.75 0.18 200 / 0.45), transparent 45%), radial-gradient(circle at 80% 10%, oklch(0.65 0.22 25 / 0.25), transparent 40%)",
      }}
    >
      {/* Top bar */}
      <header className="flex items-center justify-between">
        <button
          onClick={goHome}
          aria-label="홈으로"
          className="group flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-foreground bg-card text-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
          style={{ boxShadow: "var(--shadow-pop-sm)" }}
        >
          <Home className="h-5 w-5 transition-transform group-hover:rotate-[-8deg]" />
        </button>

        <div
          className="flex items-center gap-2 rounded-full border-2 border-foreground bg-card px-4 py-2 text-sm font-bold"
          style={{ boxShadow: "var(--shadow-pop-sm)" }}
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span>풀어본 문제 {count}</span>
        </div>
      </header>

      {/* Main */}
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
            className="relative rounded-[2rem] border-2 border-foreground bg-card p-12 text-center md:p-16"
            style={{ boxShadow: "var(--shadow-pop)" }}
          >
            {problem ? (
              <>
                <p className="mb-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  문제
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-8xl font-black leading-none md:text-9xl">
                  <span>{problem.a}</span>
                  <span className="text-primary">×</span>
                  <span>{problem.b}</span>
                  <span className="text-muted-foreground">=</span>
                  <span
                    className={
                      showAnswer ? "text-primary transition-opacity" : "text-muted-foreground"
                    }
                  >
                    {showAnswer ? problem.a * problem.b : "?"}
                  </span>
                </div>
              </>

            ) : (
              <div className="flex flex-col items-center gap-3 py-4">
                <Dice5 className="h-14 w-14 text-primary" />
                <p className="text-lg font-bold">아래 버튼을 눌러 시작!</p>
                <p className="text-sm text-muted-foreground">2단부터 9단까지 랜덤</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <button
            onClick={generate}
            className="flex h-14 items-center gap-2 rounded-2xl border-2 border-foreground bg-primary px-8 text-lg font-black text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
            style={{ boxShadow: "var(--shadow-pop)" }}
          >
            <Dice5 className="h-5 w-5" />
            {problem ? "다음 문제" : "문제 내기"}
          </button>

          {problem && (
            <button
              onClick={() => setShowAnswer((s) => !s)}
              className="flex h-14 items-center gap-2 rounded-2xl border-2 border-foreground bg-secondary px-6 text-base font-bold text-secondary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
              style={{ boxShadow: "var(--shadow-pop-sm)" }}
            >
              {showAnswer ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showAnswer ? "정답 숨기기" : "정답 보기"}
            </button>
          )}
        </div>
      </main>

      <footer className="pt-6 text-center text-xs font-medium text-muted-foreground">
        ⭐ 매일 한 문제씩 풀어보자 ⭐
      </footer>
    </div>
  );
}
