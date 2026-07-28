export type Skin = {
  id: string;
  name: string;
  price: number;
  background: string;
  preview: string;
};

export const SKINS: Skin[] = [
  {
    id: "plain",
    name: "기본",
    price: 0,
    background: "var(--color-background)",
    preview: "oklch(0.97 0.02 90)",
  },
  {
    id: "sunset",
    name: "선셋",
    price: 300,
    background:
      "radial-gradient(circle at 15% 15%, oklch(0.85 0.18 85 / 0.5), transparent 40%), radial-gradient(circle at 85% 85%, oklch(0.75 0.18 200 / 0.45), transparent 45%), radial-gradient(circle at 80% 10%, oklch(0.65 0.22 25 / 0.25), transparent 40%), var(--color-background)",
    preview: "linear-gradient(135deg, oklch(0.85 0.18 85), oklch(0.65 0.22 25))",
  },
  {
    id: "ocean",
    name: "오션",
    price: 500,
    background:
      "radial-gradient(circle at 20% 20%, oklch(0.8 0.15 220 / 0.7), transparent 45%), radial-gradient(circle at 80% 80%, oklch(0.7 0.18 200 / 0.6), transparent 50%), oklch(0.92 0.05 220)",
    preview: "linear-gradient(135deg, oklch(0.8 0.15 220), oklch(0.5 0.2 250))",
  },
  {
    id: "candy",
    name: "캔디",
    price: 800,
    background:
      "radial-gradient(circle at 25% 25%, oklch(0.85 0.18 350 / 0.7), transparent 45%), radial-gradient(circle at 75% 75%, oklch(0.85 0.18 300 / 0.6), transparent 50%), oklch(0.95 0.05 340)",
    preview: "linear-gradient(135deg, oklch(0.85 0.18 350), oklch(0.75 0.2 300))",
  },
  {
    id: "forest",
    name: "포레스트",
    price: 1000,
    background:
      "radial-gradient(circle at 20% 80%, oklch(0.75 0.18 145 / 0.6), transparent 45%), radial-gradient(circle at 80% 20%, oklch(0.85 0.15 120 / 0.55), transparent 50%), oklch(0.94 0.05 130)",
    preview: "linear-gradient(135deg, oklch(0.75 0.18 145), oklch(0.5 0.15 160))",
  },
  {
    id: "galaxy",
    name: "갤럭시",
    price: 2000,
    background:
      "radial-gradient(circle at 20% 30%, oklch(0.5 0.25 300 / 0.8), transparent 40%), radial-gradient(circle at 80% 70%, oklch(0.4 0.25 260 / 0.85), transparent 45%), radial-gradient(circle at 60% 20%, oklch(0.7 0.2 340 / 0.5), transparent 40%), oklch(0.2 0.1 280)",
    preview: "linear-gradient(135deg, oklch(0.5 0.25 300), oklch(0.3 0.2 260))",
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
