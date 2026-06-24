import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "구구단 문제" },
      { name: "description", content: "버튼을 누르면 랜덤 구구단 문제가 나옵니다." },
    ],
  }),
  component: Index,
});

function Index() {
  const [problem, setProblem] = useState<string | null>(null);
  const [answer, setAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const generate = () => {
    const a = Math.floor(Math.random() * 8) + 2; // 2~9
    const b = Math.floor(Math.random() * 8) + 2;
    setProblem(`${a} × ${b} = ?`);
    setAnswer(a * b);
    setShowAnswer(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background px-4">
      <h1 className="text-3xl font-bold text-foreground">구구단 문제</h1>

      <div className="flex min-h-32 min-w-72 items-center justify-center rounded-xl border bg-card p-8 text-4xl font-semibold text-card-foreground shadow-sm">
        {problem ?? "버튼을 눌러주세요"}
      </div>

      {problem && (
        <div className="text-2xl text-muted-foreground">
          {showAnswer ? `정답: ${answer}` : "\u00A0"}
        </div>
      )}

      <div className="flex gap-3">
        <Button size="lg" onClick={generate}>
          {problem ? "다음 문제" : "문제 내기"}
        </Button>
        {problem && (
          <Button size="lg" variant="secondary" onClick={() => setShowAnswer((s) => !s)}>
            {showAnswer ? "정답 숨기기" : "정답 보기"}
          </Button>
        )}
      </div>
    </div>
  );
}
