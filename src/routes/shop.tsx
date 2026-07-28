import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Home, Coins, Check, Lock, ShoppingBag, Sparkles } from "lucide-react";
import {
  SKINS,
  RARITY_LABEL,
  RARITY_COLOR,
  type Rarity,
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

type Filter = "all" | "owned" | "locked";

const FILTER_LABELS: Record<Filter, string> = {
  all: "전체",
  owned: "보유중",
  locked: "미보유",
};

function Shop() {
  const [points, setPoints] = useState(0);
  const [owned, setOwned] = useState<string[]>([]);
  const [active, setActive] = useState("plain");
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [justBought, setJustBought] = useState<string | null>(null);

  useEffect(() => {
    setPoints(loadPoints());
    setOwned(loadOwned());
    setActive(loadActive());
  }, []);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 1800);
  };

  const buy = (id: string, price: number) => {
    if (owned.includes(id)) {
      setActive(id);
      saveActive(id);
      showToast("✅ 스킨 적용!", true);
      return;
    }
    if (points < price) {
      showToast("❌ 포인트가 부족해요", false);
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
    setJustBought(id);
    setTimeout(() => setJustBought(null), 800);
    showToast("🎉 구매 완료!", true);
  };

  const filtered = SKINS.filter((s) => {
    if (filter === "owned") return owned.includes(s.id);
    if (filter === "locked") return !owned.includes(s.id);
    return true;
  });

  const ownedCount = owned.length;

  return (
    <div className="relative flex min-h-screen flex-col bg-background px-6 py-8">
      {/* Toast */}
      <div
        className={`pointer-events-none fixed left-1/2 top-6 z-50 -translate-x-1/2 transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
      >
        <div
          className={`rounded-2xl border-2 border-foreground px-6 py-3 text-sm font-black shadow-lg ${
            toast?.ok ? "bg-primary text-primary-foreground" : "bg-destructive text-destructive-foreground"
          }`}
        >
          {toast?.msg}
        </div>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between">
        <Link
          to="/"
          aria-label="홈으로"
          className="group flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-foreground bg-card text-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
          style={{ boxShadow: "var(--shadow-pop-sm)" }}
        >
          <Home className="h-5 w-5 transition-transform group-hover:rotate-[-8deg]" />
        </Link>
        <div
          className="flex items-center gap-2 rounded-full border-2 border-foreground bg-card px-5 py-2.5 text-sm font-black"
          style={{ boxShadow: "var(--shadow-pop-sm)" }}
        >
          <Coins className="h-4 w-4 text-primary" />
          <span className="tabular-nums">{points.toLocaleString()} P</span>
        </div>
      </header>

      <main className="mx-auto mt-8 w-full max-w-4xl">
        {/* Title */}
        <div className="mb-6 flex flex-col items-center gap-1 text-center">
          <div className="mb-1 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground">
            <ShoppingBag className="h-4 w-4" /> Skin Shop
          </div>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            스킨 <span className="text-primary">숍</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{ownedCount}</span> / {SKINS.length} 보유
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mb-6 flex justify-center gap-2">
          {(["all", "owned", "locked"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border-2 border-foreground px-5 py-2 text-sm font-black transition-transform hover:-translate-y-0.5 active:translate-y-0 ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground"
              }`}
              style={{ boxShadow: "var(--shadow-pop-sm)" }}
            >
              {FILTER_LABELS[f]}
              {f === "owned" && (
                <span className="ml-1.5 rounded-full bg-foreground/10 px-1.5 py-0.5 text-xs">
                  {ownedCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-muted-foreground">
            <Sparkles className="h-10 w-10 opacity-30" />
            <p className="font-bold">스킨이 없어요</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => {
              const isOwned = owned.includes(s.id);
              const isActive = active === s.id;
              const canAfford = points >= s.price;
              const isBought = justBought === s.id;

              return (
                <div
                  key={s.id}
                  className={`flex flex-col overflow-hidden rounded-3xl border-2 border-foreground bg-card transition-transform duration-200 ${
                    isBought ? "scale-95" : ""
                  } ${isActive ? "ring-4 ring-primary ring-offset-2" : ""}`}
                  style={{ boxShadow: "var(--shadow-pop-sm)" }}
                >
                  {/* Preview */}
                  <div
                    className="relative h-36 w-full border-b-2 border-foreground"
                    style={{ background: s.preview }}
                  >
                    {/* Rarity badge */}
                    <span
                      className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-black ${RARITY_COLOR[s.rarity as Rarity]}`}
                    >
                      {RARITY_LABEL[s.rarity as Rarity]}
                    </span>

                    {/* Active checkmark */}
                    {isActive && (
                      <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                        <Check className="h-4 w-4" strokeWidth={3} />
                      </div>
                    )}

                    {/* Locked overlay */}
                    {!isOwned && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                        <div className="flex flex-col items-center gap-1">
                          <Lock className="h-6 w-6 text-white drop-shadow" />
                          <span className="text-xs font-black text-white drop-shadow">
                            {s.price.toLocaleString()} P
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Emoji */}
                    <div className="absolute bottom-2 right-3 text-2xl drop-shadow">
                      {s.emoji}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-black">{s.name}</h3>
                      {isOwned ? (
                        <span className={`rounded-full px-2.5 py-1 text-xs font-black ${isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                          {isActive ? "사용중" : "보유중"}
                        </span>
                      ) : (
                        <span className={`flex items-center gap-1 text-sm font-black ${canAfford ? "text-primary" : "text-muted-foreground"}`}>
                          <Coins className="h-3.5 w-3.5" />
                          {s.price.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => buy(s.id, s.price)}
                      disabled={!isOwned && !canAfford}
                      className={`mt-auto flex h-11 items-center justify-center gap-2 rounded-xl border-2 border-foreground text-sm font-black transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:hover:translate-y-0 ${
                        isActive
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                      style={{ boxShadow: "var(--shadow-pop-sm)" }}
                    >
                      {isActive ? (
                        <><Check className="h-4 w-4" strokeWidth={3} /> 적용됨</>
                      ) : isOwned ? (
                        "사용하기"
                      ) : canAfford ? (
                        <><Coins className="h-4 w-4" /> 구매하기</>
                      ) : (
                        <><Lock className="h-4 w-4" /> 포인트 부족</>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
