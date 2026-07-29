import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Home, Coins, Check, Lock, ShoppingBag, Sparkles, Zap, Rocket } from "lucide-react";
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
import {
  EFFECTS,
  loadOwnedEffects,
  saveOwnedEffects,
  loadActiveEffect,
  saveActiveEffect,
} from "@/lib/effects";
import {
  BOOSTERS,
  loadOwnedBoosters,
  saveOwnedBoosters,
  loadActiveBooster,
  saveActiveBooster,
} from "@/lib/boosters";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "스킨 숍 - 구구단 챌린지" },
      { name: "description", content: "포인트로 배경 스킨과 이펙트를 구매하세요." },
    ],
  }),
  component: Shop,
});

type ItemFilter = "all" | "owned" | "locked";
type ShopTab = "skins" | "effects" | "boosters";

const FILTER_LABELS: Record<ItemFilter, string> = {
  all: "전체",
  owned: "보유중",
  locked: "미보유",
};

function Shop() {
  const [points, setPoints] = useState(0);
  // skins
  const [owned, setOwned] = useState<string[]>([]);
  const [active, setActive] = useState("plain");
  // effects
  const [ownedEffects, setOwnedEffects] = useState<string[]>([]);
  const [activeEffect, setActiveEffect] = useState("none");
  // boosters
  const [ownedBoosters, setOwnedBoosters] = useState<string[]>([]);
  const [activeBooster, setActiveBooster] = useState("x1");
  // ui
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [filter, setFilter] = useState<ItemFilter>("all");
  const [tab, setTab] = useState<ShopTab>("skins");
  const [justBought, setJustBought] = useState<string | null>(null);

  useEffect(() => {
    setPoints(loadPoints());
    setOwned(loadOwned());
    setActive(loadActive());
    setOwnedEffects(loadOwnedEffects());
    setActiveEffect(loadActiveEffect());
    setOwnedBoosters(loadOwnedBoosters());
    setActiveBooster(loadActiveBooster());
  }, []);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 1800);
  };

  const buySkin = (id: string, price: number) => {
    if (owned.includes(id)) {
      setActive(id);
      saveActive(id);
      showToast("✅ 스킨 적용!", true);
      return;
    }
    if (points < price) { showToast("❌ 포인트가 부족해요", false); return; }
    const newPts = points - price;
    const newOwned = [...owned, id];
    setPoints(newPts); setOwned(newOwned); setActive(id);
    savePoints(newPts); saveOwned(newOwned); saveActive(id);
    setJustBought(id);
    setTimeout(() => setJustBought(null), 800);
    showToast("🎉 구매 완료!", true);
  };

  const buyEffect = (id: string, price: number) => {
    if (ownedEffects.includes(id)) {
      setActiveEffect(id);
      saveActiveEffect(id);
      showToast("✅ 이펙트 적용!", true);
      return;
    }
    if (points < price) { showToast("❌ 포인트가 부족해요", false); return; }
    const newPts = points - price;
    const newOwned = [...ownedEffects, id];
    setPoints(newPts); setOwnedEffects(newOwned); setActiveEffect(id);
    savePoints(newPts); saveOwnedEffects(newOwned); saveActiveEffect(id);
    setJustBought(id);
    setTimeout(() => setJustBought(null), 800);
    showToast("🎉 구매 완료!", true);
  };

  const buyBooster = (id: string, price: number) => {
    if (ownedBoosters.includes(id)) {
      setActiveBooster(id);
      saveActiveBooster(id);
      showToast("✅ 부스터 적용!", true);
      return;
    }
    if (points < price) { showToast("❌ 포인트가 부족해요", false); return; }
    const newPts = points - price;
    const newOwned = [...ownedBoosters, id];
    setPoints(newPts); setOwnedBoosters(newOwned); setActiveBooster(id);
    savePoints(newPts); saveOwnedBoosters(newOwned); saveActiveBooster(id);
    setJustBought(id);
    setTimeout(() => setJustBought(null), 800);
    showToast("🎉 구매 완료!", true);
  };

  const filteredSkins = SKINS.filter((s) => {
    if (filter === "owned") return owned.includes(s.id);
    if (filter === "locked") return !owned.includes(s.id);
    return true;
  });

  const filteredEffects = EFFECTS.filter((e) => {
    if (filter === "owned") return ownedEffects.includes(e.id);
    if (filter === "locked") return !ownedEffects.includes(e.id);
    return true;
  });

  const ownedSkinCount = owned.length;
  const ownedEffectCount = ownedEffects.length;

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
            <ShoppingBag className="h-4 w-4" /> Shop
          </div>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            스킨 <span className="text-primary">숍</span>
          </h1>
        </div>

        {/* Shop tabs */}
        <div className="mb-5 flex justify-center gap-3">
          <button
            onClick={() => setTab("skins")}
            className={`flex items-center gap-2 rounded-2xl border-2 border-foreground px-6 py-2.5 text-sm font-black transition-transform hover:-translate-y-0.5 active:translate-y-0 ${
              tab === "skins" ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
            }`}
            style={{ boxShadow: "var(--shadow-pop-sm)" }}
          >
            <ShoppingBag className="h-4 w-4" /> 스킨
            <span className="rounded-full bg-foreground/10 px-1.5 py-0.5 text-xs">
              {ownedSkinCount}/{SKINS.length}
            </span>
          </button>
          <button
            onClick={() => setTab("effects")}
            className={`flex items-center gap-2 rounded-2xl border-2 border-foreground px-6 py-2.5 text-sm font-black transition-transform hover:-translate-y-0.5 active:translate-y-0 ${
              tab === "effects" ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
            }`}
            style={{ boxShadow: "var(--shadow-pop-sm)" }}
          >
            <Zap className="h-4 w-4" /> 이펙트
            <span className="rounded-full bg-foreground/10 px-1.5 py-0.5 text-xs">
              {ownedEffectCount}/{EFFECTS.length}
            </span>
          </button>
          <button
            onClick={() => setTab("boosters")}
            className={`flex items-center gap-2 rounded-2xl border-2 border-foreground px-6 py-2.5 text-sm font-black transition-transform hover:-translate-y-0.5 active:translate-y-0 ${
              tab === "boosters" ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
            }`}
            style={{ boxShadow: "var(--shadow-pop-sm)" }}
          >
            <Rocket className="h-4 w-4" /> 부스터
            <span className="rounded-full bg-foreground/10 px-1.5 py-0.5 text-xs">
              {ownedBoosters.length}/{BOOSTERS.length}
            </span>
          </button>
        </div>

        {/* Filter tabs — boosters 탭에서는 숨김 */}
        <div className={`mb-6 flex justify-center gap-2 ${tab === "boosters" ? "hidden" : ""}`}>
          {(["all", "owned", "locked"] as ItemFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border-2 border-foreground px-5 py-2 text-sm font-black transition-transform hover:-translate-y-0.5 active:translate-y-0 ${
                filter === f ? "bg-foreground text-background" : "bg-card text-foreground"
              }`}
              style={{ boxShadow: "var(--shadow-pop-sm)" }}
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
        </div>

        {/* ── SKINS ── */}
        {tab === "skins" && (
          filteredSkins.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSkins.map((s) => {
                const isOwned = owned.includes(s.id);
                const isActive = active === s.id;
                const canAfford = points >= s.price;
                const isBought = justBought === s.id;
                return (
                  <div
                    key={s.id}
                    className={`flex flex-col overflow-hidden rounded-3xl border-2 border-foreground bg-card transition-transform duration-200 ${isBought ? "scale-95" : ""} ${isActive ? "ring-4 ring-primary ring-offset-2" : ""}`}
                    style={{ boxShadow: "var(--shadow-pop-sm)" }}
                  >
                    <div className="relative h-36 w-full border-b-2 border-foreground" style={{ background: s.preview }}>
                      <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-black ${RARITY_COLOR[s.rarity as Rarity]}`}>
                        {RARITY_LABEL[s.rarity as Rarity]}
                      </span>
                      {isActive && (
                        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                          <Check className="h-4 w-4" strokeWidth={3} />
                        </div>
                      )}
                      {!isOwned && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                          <div className="flex flex-col items-center gap-1">
                            <Lock className="h-6 w-6 text-white drop-shadow" />
                            <span className="text-xs font-black text-white drop-shadow">{s.price.toLocaleString()} P</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-2 right-3 text-2xl drop-shadow">{s.emoji}</div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black">{s.name}</h3>
                        {isOwned ? (
                          <span className={`rounded-full px-2.5 py-1 text-xs font-black ${isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                            {isActive ? "사용중" : "보유중"}
                          </span>
                        ) : (
                          <span className={`flex items-center gap-1 text-sm font-black ${canAfford ? "text-primary" : "text-muted-foreground"}`}>
                            <Coins className="h-3.5 w-3.5" />{s.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => buySkin(s.id, s.price)}
                        disabled={!isOwned && !canAfford}
                        className={`mt-auto flex h-11 items-center justify-center gap-2 rounded-xl border-2 border-foreground text-sm font-black transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:hover:translate-y-0 ${isActive ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"}`}
                        style={{ boxShadow: "var(--shadow-pop-sm)" }}
                      >
                        {isActive ? <><Check className="h-4 w-4" strokeWidth={3} /> 적용됨</> : isOwned ? "사용하기" : canAfford ? <><Coins className="h-4 w-4" /> 구매하기</> : <><Lock className="h-4 w-4" /> 포인트 부족</>}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* ── EFFECTS ── */}
        {tab === "effects" && (
          filteredEffects.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEffects.map((e) => {
                const isOwned = ownedEffects.includes(e.id);
                const isActive = activeEffect === e.id;
                const canAfford = points >= e.price;
                const isBought = justBought === e.id;
                return (
                  <div
                    key={e.id}
                    className={`flex flex-col overflow-hidden rounded-3xl border-2 border-foreground bg-card transition-transform duration-200 ${isBought ? "scale-95" : ""} ${isActive ? "ring-4 ring-primary ring-offset-2" : ""}`}
                    style={{ boxShadow: "var(--shadow-pop-sm)" }}
                  >
                    {/* Preview area */}
                    <div className={`relative flex h-36 w-full items-center justify-center border-b-2 border-foreground ${EFFECT_BG[e.id] ?? "bg-muted"}`}>
                      <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-black ${RARITY_COLOR[e.rarity as Rarity]}`}>
                        {RARITY_LABEL[e.rarity as Rarity]}
                      </span>
                      {isActive && (
                        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                          <Check className="h-4 w-4" strokeWidth={3} />
                        </div>
                      )}
                      {!isOwned && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                          <div className="flex flex-col items-center gap-1">
                            <Lock className="h-6 w-6 text-white drop-shadow" />
                            <span className="text-xs font-black text-white drop-shadow">{e.price.toLocaleString()} P</span>
                          </div>
                        </div>
                      )}
                      <span className="text-5xl drop-shadow-lg">{e.emoji}</span>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-black">{e.name}</h3>
                          <p className="text-xs text-muted-foreground">{e.description}</p>
                        </div>
                        {isOwned ? (
                          <span className={`rounded-full px-2.5 py-1 text-xs font-black ${isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                            {isActive ? "사용중" : "보유중"}
                          </span>
                        ) : (
                          <span className={`flex items-center gap-1 text-sm font-black ${canAfford ? "text-primary" : "text-muted-foreground"}`}>
                            <Coins className="h-3.5 w-3.5" />{e.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => buyEffect(e.id, e.price)}
                        disabled={!isOwned && !canAfford}
                        className={`mt-auto flex h-11 items-center justify-center gap-2 rounded-xl border-2 border-foreground text-sm font-black transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:hover:translate-y-0 ${isActive ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"}`}
                        style={{ boxShadow: "var(--shadow-pop-sm)" }}
                      >
                        {isActive ? <><Check className="h-4 w-4" strokeWidth={3} /> 적용됨</> : isOwned ? "사용하기" : canAfford ? <><Zap className="h-4 w-4" /> 구매하기</> : <><Lock className="h-4 w-4" /> 포인트 부족</>}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* ── BOOSTERS ── */}
        {tab === "boosters" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BOOSTERS.map((b) => {
              const isOwned = ownedBoosters.includes(b.id);
              const isActive = activeBooster === b.id;
              const canAfford = points >= b.price;
              const isBought = justBought === b.id;
              return (
                <div
                  key={b.id}
                  className={`flex flex-col overflow-hidden rounded-3xl border-2 border-foreground bg-card transition-transform duration-200 ${isBought ? "scale-95" : ""} ${isActive ? "ring-4 ring-primary ring-offset-2" : ""}`}
                  style={{ boxShadow: "var(--shadow-pop-sm)" }}
                >
                  <div className={`relative flex h-36 w-full flex-col items-center justify-center gap-2 border-b-2 border-foreground ${BOOSTER_BG[b.id] ?? "bg-muted"}`}>
                    {isActive && (
                      <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                        <Check className="h-4 w-4" strokeWidth={3} />
                      </div>
                    )}
                    {!isOwned && b.price > 0 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                        <div className="flex flex-col items-center gap-1">
                          <Lock className="h-6 w-6 text-white drop-shadow" />
                          <span className="text-xs font-black text-white drop-shadow">{b.price.toLocaleString()} P</span>
                        </div>
                      </div>
                    )}
                    <span className="text-5xl drop-shadow-lg">{b.emoji}</span>
                    <span className="text-lg font-black text-foreground drop-shadow">×{b.multiplier}</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-black">{b.name}</h3>
                        <p className="text-xs text-muted-foreground">{b.description}</p>
                      </div>
                      {isOwned ? (
                        <span className={`rounded-full px-2.5 py-1 text-xs font-black ${isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                          {isActive ? "사용중" : "보유중"}
                        </span>
                      ) : (
                        <span className={`flex items-center gap-1 text-sm font-black ${canAfford ? "text-primary" : "text-muted-foreground"}`}>
                          <Coins className="h-3.5 w-3.5" />{b.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => buyBooster(b.id, b.price)}
                      disabled={!isOwned && !canAfford}
                      className={`mt-auto flex h-11 items-center justify-center gap-2 rounded-xl border-2 border-foreground text-sm font-black transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:hover:translate-y-0 ${isActive ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"}`}
                      style={{ boxShadow: "var(--shadow-pop-sm)" }}
                    >
                      {isActive ? <><Check className="h-4 w-4" strokeWidth={3} /> 적용됨</> : isOwned ? "사용하기" : canAfford ? <><Rocket className="h-4 w-4" /> 구매하기</> : <><Lock className="h-4 w-4" /> 포인트 부족</>}
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

const EFFECT_BG: Record<string, string> = {
  none:      "bg-muted",
  confetti:  "bg-gradient-to-br from-pink-100 to-yellow-100",
  coins:     "bg-gradient-to-br from-yellow-100 to-amber-100",
  stars:     "bg-gradient-to-br from-yellow-50 to-amber-100",
  hearts:    "bg-gradient-to-br from-pink-100 to-rose-100",
  lightning: "bg-gradient-to-br from-yellow-100 to-orange-100",
  sakura:    "bg-gradient-to-br from-pink-50 to-pink-200",
  fireworks: "bg-gradient-to-br from-indigo-100 to-purple-100",
  snow:      "bg-gradient-to-br from-blue-50 to-cyan-100",
  rainbow:   "bg-gradient-to-br from-red-100 via-yellow-100 to-blue-100",
};

const BOOSTER_BG: Record<string, string> = {
  x1:    "bg-gradient-to-br from-zinc-100 to-zinc-200",
  x1_5:  "bg-gradient-to-br from-amber-100 to-yellow-200",
};

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-muted-foreground">
      <Sparkles className="h-10 w-10 opacity-30" />
      <p className="font-bold">아이템이 없어요</p>
    </div>
  );
}
