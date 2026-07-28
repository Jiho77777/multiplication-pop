export type Effect = {
  id: string;
  name: string;
  price: number;
  emoji: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
};

import { RARITY_COLOR, RARITY_LABEL } from "./skins";
export { RARITY_COLOR, RARITY_LABEL };

export const EFFECTS: Effect[] = [
  {
    id: "none",
    name: "기본",
    price: 0,
    emoji: "✨",
    description: "효과 없음",
    rarity: "common",
  },
  {
    id: "confetti",
    name: "색종이",
    price: 300,
    emoji: "🎉",
    description: "색종이가 팡!",
    rarity: "common",
  },
  {
    id: "stars",
    name: "별똥별",
    price: 600,
    emoji: "⭐",
    description: "별이 쏟아져요",
    rarity: "rare",
  },
  {
    id: "hearts",
    name: "하트비",
    price: 800,
    emoji: "💖",
    description: "하트가 둥둥",
    rarity: "rare",
  },
  {
    id: "fireworks",
    name: "불꽃놀이",
    price: 1200,
    emoji: "🎆",
    description: "화려한 불꽃!",
    rarity: "epic",
  },
  {
    id: "rainbow",
    name: "레인보우",
    price: 2000,
    emoji: "🌈",
    description: "무지개가 펼쳐져요",
    rarity: "legendary",
  },
];

export const DEFAULT_EFFECT_ID = "none";

const OWNED_EFFECTS_KEY = "gugu:owned_effects";
const ACTIVE_EFFECT_KEY = "gugu:active_effect";

export function loadOwnedEffects(): string[] {
  if (typeof window === "undefined") return [DEFAULT_EFFECT_ID];
  try {
    const raw = localStorage.getItem(OWNED_EFFECTS_KEY);
    if (!raw) return [DEFAULT_EFFECT_ID];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) && arr.includes(DEFAULT_EFFECT_ID)
      ? arr
      : [DEFAULT_EFFECT_ID, ...(arr ?? [])];
  } catch {
    return [DEFAULT_EFFECT_ID];
  }
}
export function saveOwnedEffects(o: string[]) {
  localStorage.setItem(OWNED_EFFECTS_KEY, JSON.stringify(o));
}
export function loadActiveEffect(): string {
  if (typeof window === "undefined") return DEFAULT_EFFECT_ID;
  return localStorage.getItem(ACTIVE_EFFECT_KEY) ?? DEFAULT_EFFECT_ID;
}
export function saveActiveEffect(id: string) {
  localStorage.setItem(ACTIVE_EFFECT_KEY, id);
}
