import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Home, Coins, Check, Lock } from "lucide-react";
import {
  SKINS,
  loadPoints,
  savePoints,
  loadOwned,
  saveOwned,
  loadActive,
  saveActive,
} from "@/lib/skins";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "스킨 숍 - 구구단 챌린지" },
      { name: "description", content: "포인트로 배경 스킨을 구매하세요." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [points, setPoints] = useState(0);
  const [owned, setOwned] = useState<string[]>([]);
  const [active, setActive] = useState("plain");
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    setPoints(loadPoints());
    setOwned(loadOwned());
    setActive(loadActive());
  }, []);

  const buy = (id: string, price: number) => {
    if (owned.includes(id)) {
      setActive(id);
      saveActive(id);
      setFlash(`${id} 적용!`);
      setTimeout(() => setFlash(null), 1200);
      return;
    }
    if (points < price) {
      setFlash("포인트 부족!");
      setTimeout(() => setFlash(null), 1200);
      return;
    }
    const newPts = points - price;
    const newOwned = [...owned, id];
    setPoints(newPts);
    setOwned(newOwned);
    setActive(id);
    savePoints(newPts);
    saveOwned(newOwned);
    saveActive(id);
    setFlash("구매 완료!");
    setTimeout(() => setFlash(null), 1200);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden px-6 py-8">
      <header className="flex items-center justify-between">
        <Link
          to="/"
          aria-label="홈으로"
          className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-foreground bg-card text-foreground"
          style={{ boxShadow: "var(--shadow-pop-sm)" }}
        >
          <Home className="h-5 w-5" />
        </Link>
        <div
          className="flex items-center gap-2 rounded-full border-2 border-foreground bg-card px-4 py-2 text-sm font-bold"
          style={{ boxShadow: "var(--shadow-pop-sm)" }}
        >
          <Coins className="h-4 w-4 text-primary" />
          <span className="tabular-nums">{points} P</span>
        </div>
      </header>

      <main className="mx-auto mt-8 w-full max-w-4xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Skin Shop
          </p>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            스킨 <span className="text-primary">숍</span>
          </h1>
          {flash && (
            <p className="mt-3 text-sm font-bold text-primary">{flash}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKINS.map((s) => {
            const isOwned = owned.includes(s.id);
            const isActive = active === s.id;
            const canAfford = points >= s.price;
            return (
              <div
                key={s.id}
                className="flex flex-col overflow-hidden rounded-3xl border-2 border-foreground bg-card"
                style={{ boxShadow: "var(--shadow-pop-sm)" }}
              >
                <div
                  className="h-32 w-full border-b-2 border-foreground"
                  style={{ background: s.preview }}
                />
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black">{s.name}</h3>
                    {isActive ? (
                      <span className="flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">
                        <Check className="h-3 w-3" /> 사용중
                      </span>
                    ) : isOwned ? (
                      <span className="rounded-full bg-secondary px-2 py-1 text-xs font-bold text-secondary-foreground">
                        보유중
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-sm font-bold text-muted-foreground">
                        <Coins className="h-3 w-3" /> {s.price}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => buy(s.id, s.price)}
                    disabled={!isOwned && !canAfford}
                    className="mt-auto flex h-11 items-center justify-center gap-2 rounded-xl border-2 border-foreground bg-primary text-sm font-black text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0"
                    style={{ boxShadow: "var(--shadow-pop-sm)" }}
                  >
                    {isActive ? (
                      "적용됨"
                    ) : isOwned ? (
                      "사용하기"
                    ) : canAfford ? (
                      <>구매하기</>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" /> 포인트 부족
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
