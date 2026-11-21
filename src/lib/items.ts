export type ShopItem = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  price: number;
  kind: "multiplier" | "mistake_guard";
  durationMs?: number;
  multiplier?: number;
};

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "double_points_potion",
    name: "행운의 물약",
    emoji: "🧪",
    description: "1분 동안 정답 포인트 1.5배",
    price: 1200,
    kind: "multiplier",
    durationMs: 60_000,
    multiplier: 1.5,
  },
  {
    id: "mistake_guard_potion",
    name: "실수 방지 물약",
    emoji: "🛡️",
    description: "다음 오답 1회 포인트 차감을 막아요",
    price: 800,
    kind: "mistake_guard",
  },
];

const INVENTORY_KEY = "gugu:item_inventory";
const MULTIPLIER_UNTIL_KEY = "gugu:item_multiplier_until";
const MISTAKE_GUARD_KEY = "gugu:item_mistake_guard";

export type ItemInventory = Record<string, number>;

export function loadItemInventory(): ItemInventory {
  if (typeof window === "undefined") return {};
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(INVENTORY_KEY) ?? "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, number] =>
          typeof entry[1] === "number" && Number.isInteger(entry[1]) && entry[1] >= 0,
      ),
    );
  } catch {
    return {};
  }
}

export function saveItemInventory(inventory: ItemInventory) {
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
}

export function loadMultiplierUntil(): number {
  if (typeof window === "undefined") return 0;
  const value = Number(localStorage.getItem(MULTIPLIER_UNTIL_KEY));
  return Number.isFinite(value) && value > Date.now() ? value : 0;
}

export function saveMultiplierUntil(timestamp: number) {
  if (timestamp > Date.now()) localStorage.setItem(MULTIPLIER_UNTIL_KEY, String(timestamp));
  else localStorage.removeItem(MULTIPLIER_UNTIL_KEY);
}

export function loadMistakeGuard(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(MISTAKE_GUARD_KEY) === "true";
}

export function saveMistakeGuard(active: boolean) {
  if (active) localStorage.setItem(MISTAKE_GUARD_KEY, "true");
  else localStorage.removeItem(MISTAKE_GUARD_KEY);
}
