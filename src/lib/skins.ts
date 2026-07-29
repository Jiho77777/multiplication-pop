export type Rarity = "common" | "rare" | "epic" | "legendary";

export type Skin = {
  id: string;
  name: string;
  price: number;
  background: string;
  preview: string;
  rarity: Rarity;
  emoji: string;
};

export const RARITY_LABEL: Record<Rarity, string> = {
  common: "커먼",
  rare: "레어",
  epic: "에픽",
  legendary: "레전더리",
};

export const RARITY_COLOR: Record<Rarity, string> = {
  common: "bg-zinc-200 text-zinc-700",
  rare: "bg-blue-100 text-blue-700",
  epic: "bg-purple-100 text-purple-700",
  legendary: "bg-amber-100 text-amber-700",
};

export const SKINS: Skin[] = [
  {
    id: "plain",
    name: "기본",
    price: 0,
    rarity: "common",
    emoji: "⬜",
    background: "var(--color-background)",
    preview: "oklch(0.97 0.02 90)",
  },
  {
    id: "sunset",
    name: "선셋",
    price: 300,
    rarity: "common",
    emoji: "🌅",
    background:
      "radial-gradient(circle at 15% 15%, oklch(0.85 0.18 85 / 0.5), transparent 40%), radial-gradient(circle at 85% 85%, oklch(0.75 0.18 200 / 0.45), transparent 45%), radial-gradient(circle at 80% 10%, oklch(0.65 0.22 25 / 0.25), transparent 40%), var(--color-background)",
    preview: "linear-gradient(135deg, oklch(0.85 0.18 85), oklch(0.65 0.22 25))",
  },
  {
    id: "mint",
    name: "민트",
    price: 400,
    rarity: "common",
    emoji: "🌿",
    background:
      "radial-gradient(circle at 30% 20%, oklch(0.88 0.12 175 / 0.6), transparent 45%), radial-gradient(circle at 70% 80%, oklch(0.78 0.15 165 / 0.5), transparent 50%), oklch(0.95 0.04 170)",
    preview: "linear-gradient(135deg, oklch(0.88 0.12 175), oklch(0.65 0.18 165))",
  },
  {
    id: "ocean",
    name: "오션",
    price: 500,
    rarity: "rare",
    emoji: "🌊",
    background:
      "radial-gradient(circle at 20% 20%, oklch(0.8 0.15 220 / 0.7), transparent 45%), radial-gradient(circle at 80% 80%, oklch(0.7 0.18 200 / 0.6), transparent 50%), oklch(0.92 0.05 220)",
    preview: "linear-gradient(135deg, oklch(0.8 0.15 220), oklch(0.5 0.2 250))",
  },
  {
    id: "cherry",
    name: "체리",
    price: 600,
    rarity: "rare",
    emoji: "🍒",
    background:
      "radial-gradient(circle at 25% 30%, oklch(0.82 0.18 15 / 0.6), transparent 45%), radial-gradient(circle at 75% 70%, oklch(0.72 0.2 5 / 0.55), transparent 50%), oklch(0.95 0.04 10)",
    preview: "linear-gradient(135deg, oklch(0.82 0.18 15), oklch(0.6 0.22 5))",
  },
  {
    id: "lavender",
    name: "라벤더",
    price: 700,
    rarity: "rare",
    emoji: "💜",
    background:
      "radial-gradient(circle at 30% 25%, oklch(0.82 0.14 295 / 0.6), transparent 45%), radial-gradient(circle at 70% 75%, oklch(0.74 0.16 310 / 0.55), transparent 50%), oklch(0.94 0.04 300)",
    preview: "linear-gradient(135deg, oklch(0.82 0.14 295), oklch(0.65 0.18 310))",
  },
  {
    id: "candy",
    name: "캔디",
    price: 800,
    rarity: "epic",
    emoji: "🍬",
    background:
      "radial-gradient(circle at 25% 25%, oklch(0.85 0.18 350 / 0.7), transparent 45%), radial-gradient(circle at 75% 75%, oklch(0.85 0.18 300 / 0.6), transparent 50%), oklch(0.95 0.05 340)",
    preview: "linear-gradient(135deg, oklch(0.85 0.18 350), oklch(0.75 0.2 300))",
  },
  {
    id: "forest",
    name: "포레스트",
    price: 1000,
    rarity: "epic",
    emoji: "🌲",
    background:
      "radial-gradient(circle at 20% 80%, oklch(0.75 0.18 145 / 0.6), transparent 45%), radial-gradient(circle at 80% 20%, oklch(0.85 0.15 120 / 0.55), transparent 50%), oklch(0.94 0.05 130)",
    preview: "linear-gradient(135deg, oklch(0.75 0.18 145), oklch(0.5 0.15 160))",
  },
  {
    id: "fire",
    name: "불꽃",
    price: 1500,
    rarity: "epic",
    emoji: "🔥",
    background:
      "radial-gradient(circle at 20% 80%, oklch(0.65 0.25 30 / 0.75), transparent 45%), radial-gradient(circle at 80% 20%, oklch(0.75 0.22 60 / 0.65), transparent 50%), radial-gradient(circle at 50% 50%, oklch(0.6 0.28 20 / 0.4), transparent 60%), oklch(0.95 0.04 50)",
    preview: "linear-gradient(135deg, oklch(0.75 0.22 60), oklch(0.6 0.28 20))",
  },
  {
    id: "galaxy",
    name: "갤럭시",
    price: 2000,
    rarity: "legendary",
    emoji: "🌌",
    background:
      "radial-gradient(circle at 20% 30%, oklch(0.5 0.25 300 / 0.8), transparent 40%), radial-gradient(circle at 80% 70%, oklch(0.4 0.25 260 / 0.85), transparent 45%), radial-gradient(circle at 60% 20%, oklch(0.7 0.2 340 / 0.5), transparent 40%), oklch(0.2 0.1 280)",
    preview: "linear-gradient(135deg, oklch(0.5 0.25 300), oklch(0.3 0.2 260))",
  },
  {
    id: "icecream",
    name: "아이스크림",
    price: 1200,
    rarity: "epic",
    emoji: "🍦",
    background:
      "radial-gradient(circle at 20% 30%, oklch(0.9 0.12 340 / 0.55), transparent 45%), radial-gradient(circle at 75% 70%, oklch(0.88 0.1 200 / 0.5), transparent 50%), radial-gradient(circle at 55% 20%, oklch(0.92 0.1 80 / 0.45), transparent 40%), oklch(0.97 0.03 60)",
    preview: "linear-gradient(135deg, oklch(0.9 0.12 340), oklch(0.88 0.1 200), oklch(0.92 0.1 80))",
  },
  {
    id: "moonlight",
    name: "문라이트",
    price: 1500,
    rarity: "epic",
    emoji: "🌙",
    background:
      "radial-gradient(circle at 70% 20%, oklch(0.75 0.1 260 / 0.6), transparent 45%), radial-gradient(circle at 20% 80%, oklch(0.55 0.15 280 / 0.7), transparent 50%), oklch(0.18 0.06 265)",
    preview: "linear-gradient(135deg, oklch(0.55 0.15 280), oklch(0.25 0.08 265))",
  },
  {
    id: "halloween",
    name: "할로윈",
    price: 1800,
    rarity: "epic",
    emoji: "🎃",
    background:
      "radial-gradient(circle at 25% 25%, oklch(0.7 0.22 55 / 0.65), transparent 45%), radial-gradient(circle at 75% 75%, oklch(0.45 0.2 310 / 0.7), transparent 50%), oklch(0.15 0.05 30)",
    preview: "linear-gradient(135deg, oklch(0.7 0.22 55), oklch(0.35 0.2 310))",
  },
  {
    id: "rainbow",
    name: "레인보우",
    price: 2500,
    rarity: "legendary",
    emoji: "🌈",
    background:
      "linear-gradient(160deg, oklch(0.85 0.18 25 / 0.55) 0%, oklch(0.85 0.2 70 / 0.5) 18%, oklch(0.87 0.17 130 / 0.5) 36%, oklch(0.8 0.18 220 / 0.5) 55%, oklch(0.75 0.22 280 / 0.5) 73%, oklch(0.72 0.24 310 / 0.55) 100%), var(--color-background)",
    preview: "linear-gradient(135deg, oklch(0.85 0.18 25), oklch(0.85 0.2 70), oklch(0.8 0.18 220), oklch(0.72 0.24 310))",
  },
  {
    id: "aurora",
    name: "오로라",
    price: 3000,
    rarity: "legendary",
    emoji: "🌠",
    background:
      "radial-gradient(circle at 10% 50%, oklch(0.55 0.25 175 / 0.8), transparent 40%), radial-gradient(circle at 90% 50%, oklch(0.5 0.28 310 / 0.75), transparent 45%), radial-gradient(circle at 50% 10%, oklch(0.6 0.22 240 / 0.6), transparent 50%), oklch(0.15 0.08 260)",
    preview: "linear-gradient(135deg, oklch(0.55 0.25 175), oklch(0.5 0.28 310))",
  },
];

export const DEFAULT_SKIN_ID = "plain";

const POINTS_KEY = "gugu:points";
const OWNED_KEY = "gugu:owned";
const ACTIVE_KEY = "gugu:active";

export function loadPoints(): number {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem(POINTS_KEY) ?? "0");
}
export function savePoints(p: number) {
  localStorage.setItem(POINTS_KEY, String(p));
}
export function loadOwned(): string[] {
  if (typeof window === "undefined") return [DEFAULT_SKIN_ID];
  try {
    const raw = localStorage.getItem(OWNED_KEY);
    if (!raw) return [DEFAULT_SKIN_ID];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) && arr.includes(DEFAULT_SKIN_ID)
      ? arr
      : [DEFAULT_SKIN_ID, ...(arr ?? [])];
  } catch {
    return [DEFAULT_SKIN_ID];
  }
}
export function saveOwned(o: string[]) {
  localStorage.setItem(OWNED_KEY, JSON.stringify(o));
}
export function loadActive(): string {
  if (typeof window === "undefined") return DEFAULT_SKIN_ID;
  return localStorage.getItem(ACTIVE_KEY) ?? DEFAULT_SKIN_ID;
}
export function saveActive(id: string) {
  localStorage.setItem(ACTIVE_KEY, id);
}
