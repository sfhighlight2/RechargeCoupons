// Transparent fruit cutouts (generated with Higgsfield, Oct 2026) used by the motion layer.
export const FRUIT = {
  strawberry: { src: '/img/fruit/strawberry.webp', w: 260, h: 360 },
  mango: { src: '/img/fruit/mango.webp', w: 360, h: 324 },
  blueberry: { src: '/img/fruit/blueberry.webp', w: 360, h: 284 },
  pineapple: { src: '/img/fruit/pineapple.webp', w: 360, h: 300 },
  kiwi: { src: '/img/fruit/kiwi.webp', w: 348, h: 360 },
  banana: { src: '/img/fruit/banana.webp', w: 360, h: 242 },
  raspberry: { src: '/img/fruit/raspberry.webp', w: 326, h: 360 },
  mint: { src: '/img/fruit/mint.webp', w: 360, h: 334 },
} as const;

export type FruitName = keyof typeof FRUIT;

export const FRUIT_NAMES = Object.keys(FRUIT) as FruitName[];

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
