export type Booster = {
  id: string;
  name: string;
  price: number;
  emoji: string;
  description: string;
  multiplier: number;
};

export const BOOSTERS: Booster[] = [
  {
    id: "x1",
    name: "기본",
    price: 0,
    emoji: "🪙",
    description: "기본 포인트 (×1)",
    multiplier: 1,
  },
  {
    id: "x1_25",
    name: "1.25배 포인트",
    price: 400,
    emoji: "🌟",
    description: "정답 시 포인트 1.25배!",
    multiplier: 1.25,
  },
  {
    id: "x1_5",
    name: "1.5배 포인트",
    price: 900,
    emoji: "💎",
    description: "정답 시 포인트 1.5배!",
    multiplier: 1.5,
  },
  {
    id: "x1_75",
    name: "1.75배 포인트",
    price: 1600,
    emoji: "⚡",
    description: "정답 시 포인트 1.75배!",
    multiplier: 1.75,
  },
  {
    id: "x2",
    name: "2배 포인트",
    price: 2500,
    emoji: "🚀",
    description: "정답 시 포인트 2배!",
    multiplier: 2,
  },
  {
    id: "x2_5",
    name: "2.5배 포인트",
    price: 4000,
    emoji: "🔥",
    description: "정답 시 포인트 2.5배!",
    multiplier: 2.5,
  },
  {
    id: "x3",
    name: "3배 포인트",
    price: 6000,
    emoji: "👑",
    description: "정답 시 포인트 3배!",
    multiplier: 3,
  },
  {
    id: "x4",
    name: "4배 포인트",
    price: 10000,
    emoji: "🏆",
    description: "정답 시 포인트 4배!",
    multiplier: 4,
  },
  {
    id: "x5",
    name: "5배 포인트",
    price: 15000,
    emoji: "🐉",
    description: "정답 시 포인트 5배!",
    multiplier: 5,
  },
];

export const DEFAULT_BOOSTER_ID = "x1";

const ACTIVE_BOOSTER_KEY = "gugu:active_booster";
const OWNED_BOOSTERS_KEY = "gugu:owned_boosters";

export function loadActiveBooster(): string {
  if (typeof window === "undefined") return DEFAULT_BOOSTER_ID;
  return localStorage.getItem(ACTIVE_BOOSTER_KEY) ?? DEFAULT_BOOSTER_ID;
}
export function saveActiveBooster(id: string) {
  localStorage.setItem(ACTIVE_BOOSTER_KEY, id);
}
export function loadOwnedBoosters(): string[] {
  if (typeof window === "undefined") return [DEFAULT_BOOSTER_ID];
  try {
    const raw = localStorage.getItem(OWNED_BOOSTERS_KEY);
    if (!raw) return [DEFAULT_BOOSTER_ID];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) && arr.includes(DEFAULT_BOOSTER_ID)
      ? arr
      : [DEFAULT_BOOSTER_ID, ...(arr ?? [])];
  } catch {
    return [DEFAULT_BOOSTER_ID];
  }
}
export function saveOwnedBoosters(o: string[]) {
  localStorage.setItem(OWNED_BOOSTERS_KEY, JSON.stringify(o));
}
