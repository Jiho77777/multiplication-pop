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
    id: "x1_5",
    name: "1.5배 포인트",
    price: 2000,
    emoji: "💎",
    description: "정답 시 포인트 1.5배!",
    multiplier: 1.5,
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
