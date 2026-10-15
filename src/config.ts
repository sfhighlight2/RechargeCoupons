// Single source of truth for business facts and offer copy.
// Everything on the page reads from here, so a fact only ever needs fixing once.

export const BUSINESS = {
  name: 'Recharge Smoothies Cafe',
  street: '2101 N University Dr, Suite B',
  cityLine: 'Sunrise, FL 33322',
  phoneDisplay: '(954) 999-0332',
  phoneHref: 'tel:+19549990332',
  email: 'info@rechargesmoothies.com',
  mapsUrl:
    'https://www.google.com/maps/place/Recharge+Smoothies+Cafe/@26.152151,-80.2583419,17z/data=!4m6!3m5!1s0x88d906391e0767a5:0x9f88449ffabe3c26!8m2!3d26.152151!4d-80.2583419!16s%2Fg%2F11bbrmn861',
  geo: { lat: 26.152151, lng: -80.2583419 },
  hours: [
    { days: 'Mon to Fri', time: '9 AM to 9 PM' },
    { days: 'Saturday', time: '9 AM to 7 PM' },
    { days: 'Sunday', time: '10 AM to 6 PM' },
  ],
  // Verified on the live Google Business Profile, Oct 15 2026. Update when it moves.
  google: { rating: 4.7, count: 577 },
} as const;

// Owner-supplied claim for the hero eyebrow. Google alone shows 4.7 from 577 (see above).
export const HERO_RATING_CLAIM = '5.0 Stars from 1,550+ Reviews';

export const LEAD_WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/4PrBtcQb8wpAnA2gK9AJ/webhook-trigger/e64277fd-d5be-472c-8144-38fc1dd6f7ec';

export const COUPON_VALID_DAYS = 7;

export const OFFER_TERMS =
  'One per person. In store only. Expires 7 days after signup. Not valid with other offers.';

export interface Offer {
  key: string;
  path: string;
  /** Exact string sent to GoHighLevel as `offer`. Workflows may branch on it, so never reword it. */
  crmOffer: string;
  headline: string;
  /** Part of the headline drawn in brand red. Must be a substring of `headline`. */
  highlight?: string;
  subhead: string;
  formTitle: string;
  cta: string;
  stickyCta: string;
  enjoyStep: string;
  couponName: string;
  exitHeadline: string;
  shareText: string;
  cups: Cup[];
  metaTitle: string;
  metaDescription: string;
}

export const OFFERS: Record<'half' | 'bogo', Offer> = {
  half: {
    key: '50-off',
    path: '/',
    crmOffer: 'Claim Your 50% Smoothie Coupon',
    headline: '50% Off Any Smoothie',
    highlight: '50% Off',
    subhead: 'Real fruit, blended when you order. Claim it here in seconds and redeem it at our Sunrise cafe.',
    formTitle: 'Get your 50% off coupon',
    cta: 'Claim My 50% Off',
    stickyCta: 'Get 50% Off',
    enjoyStep: 'Enjoy 50% off any smoothie.',
    couponName: '50% off any smoothie',
    exitHeadline: 'Wait, your 50% off is still here',
    shareText: 'Recharge Smoothies in Sunrise is giving 50% off any smoothie. Grab a coupon:',
    cups: ['berry', 'mango', 'green'],
    metaTitle: '50% Off Any Smoothie | Recharge Smoothies Cafe, Sunrise FL',
    metaDescription:
      'Claim a 50% off coupon for any smoothie at Recharge Smoothies Cafe in Sunrise, FL. Real fruit, blended when you order.',
  },
  bogo: {
    key: 'bogo',
    path: '/bogo',
    crmOffer: 'Claim Your Free BOGO Smoothie',
    headline: 'Buy One Smoothie, Get One Free',
    highlight: 'Get One Free',
    subhead: 'Bring a friend or double up. Real fruit, blended when you order at our Sunrise cafe.',
    formTitle: 'Get your buy one, get one coupon',
    cta: 'Claim My Free Smoothie',
    stickyCta: 'Get My Free Smoothie',
    enjoyStep: 'Enjoy your second smoothie free.',
    couponName: 'Buy one smoothie, get one free',
    exitHeadline: 'Wait, your free smoothie is still here',
    shareText: 'Recharge Smoothies in Sunrise has buy one, get one free smoothies. Grab a coupon:',
    cups: ['mango', 'pink'],
    metaTitle: 'Buy One Smoothie, Get One Free | Recharge Smoothies Cafe, Sunrise FL',
    metaDescription:
      'Claim a buy one, get one free smoothie coupon at Recharge Smoothies Cafe in Sunrise, FL. Real fruit, blended when you order.',
  },
};

/**
 * Ads can still override copy with ?title= and ?offer= (existing campaign links rely on it).
 * Values are length-capped and the CRM offer string falls back to the route's own offer.
 */
export function resolveOffer(base: Offer, params: URLSearchParams): Offer {
  const clean = (v: string | null) => (v ?? '').replace(/\s+/g, ' ').trim().slice(0, 80);
  const title = clean(params.get('title'));
  const offer = clean(params.get('offer'));
  if (!title && !offer) return base;
  return {
    ...base,
    key: `${base.key}-custom`,
    headline: title || base.headline,
    highlight: title ? undefined : base.highlight,
    crmOffer: offer || base.crmOffer,
    formTitle: offer || base.formTitle,
    cta: 'Claim My Coupon',
    stickyCta: 'Claim My Coupon',
    enjoyStep: 'Enjoy your deal.',
    exitHeadline: 'Wait, your deal is still here',
    couponName: offer || title || base.couponName,
  };
}

export const CUP_IMAGES = {
  mango: { src: '/img/cup-mango.webp', alt: 'Yellow mango smoothie in a Recharge cup', w: 428, h: 900 },
  berry: { src: '/img/cup-berry.webp', alt: 'Dark berry smoothie in a Recharge cup', w: 429, h: 900 },
  green: { src: '/img/cup-green.webp', alt: 'Green smoothie in a Recharge cup', w: 428, h: 900 },
  pink: { src: '/img/cup-pink.webp', alt: 'Pink berry smoothie in a Recharge cup', w: 428, h: 900 },
  tropical: { src: '/img/cup-tropical.webp', alt: 'Orange and red tropical smoothie in a Recharge cup', w: 428, h: 900 },
  chocolate: { src: '/img/cup-chocolate.webp', alt: 'Chocolate smoothie in a Recharge cup', w: 429, h: 900 },
  pb: { src: '/img/cup-pb.webp', alt: 'Creamy peanut butter smoothie in a Recharge cup', w: 429, h: 900 },
} as const;

export type Cup = keyof typeof CUP_IMAGES;

// Full smoothie menu from Recharge OS / 02_Product_Menu_Library / Smoothie_Public_Menu.md.
// `cup` picks the closest-colored approved photo; several flavors share a photo.
export const MENU: Array<{ category: string; items: Array<{ name: string; ingredients: string; cup: Cup }> }> = [
  {
    category: 'Slim Down',
    items: [
      { name: 'Lean Green', ingredients: 'Mango, pineapple, kale, spinach', cup: 'green' },
      { name: 'Tropical Sunset', ingredients: 'Strawberry, mango, pineapple, pina colada', cup: 'tropical' },
      { name: 'Mango Blast', ingredients: 'Mango, pineapple, peach', cup: 'mango' },
      { name: 'Berry Green', ingredients: 'Mixed berries, kale, spinach', cup: 'green' },
      { name: 'Pineapple Junkie', ingredients: 'Pineapple, coconut', cup: 'mango' },
      { name: 'Strawberry Coconut', ingredients: 'Strawberries, coconut', cup: 'pink' },
    ],
  },
  {
    category: 'Build Up',
    items: [
      { name: 'Oreo Madness', ingredients: 'Vanilla, Oreo crumbs', cup: 'pb' },
      { name: 'Chocolate Thunder', ingredients: 'Chocolate, banana', cup: 'chocolate' },
      { name: 'Mega Mass', ingredients: 'Strawberry, raspberry, blueberry, blackberry', cup: 'berry' },
      { name: 'Amazing Oat', ingredients: 'Oatmeal, peanut butter, chocolate', cup: 'chocolate' },
      { name: 'Berry Banana', ingredients: 'Mixed berries, banana', cup: 'pink' },
      { name: 'Peanut Butter Passion', ingredients: 'Peanut butter, vanilla', cup: 'pb' },
    ],
  },
  {
    category: 'Maintain',
    items: [
      { name: 'Island Breeze', ingredients: 'Banana, peach, mango', cup: 'mango' },
      { name: 'Strawberry Banana Twist', ingredients: 'Strawberry, banana', cup: 'pink' },
      { name: 'Green Ale', ingredients: 'Peach, banana, mango, spirulina', cup: 'green' },
      { name: 'Crazy Banana', ingredients: 'Banana, vanilla', cup: 'pb' },
      { name: 'PB Banana Berry', ingredients: 'Peanut butter, banana, mixed berries', cup: 'berry' },
      { name: 'Cupid Berry', ingredients: 'Mixed berries, vanilla, strawberries', cup: 'pink' },
    ],
  },
  {
    category: 'Charge Up',
    items: [
      { name: 'Incredible Hulk', ingredients: 'Pineapple, strawberries, banana', cup: 'tropical' },
      { name: 'Acai Paradise', ingredients: 'Acai berry, banana, mixed berries', cup: 'berry' },
      { name: 'Acai Mango', ingredients: 'Mango, acai berry', cup: 'berry' },
      { name: 'Coffee Frap', ingredients: 'Coffee, peanut butter, chocolate or vanilla', cup: 'chocolate' },
      { name: 'Caribbean Remix', ingredients: 'Strawberry, orange, pineapple, peaches', cup: 'tropical' },
      { name: 'Blue Mango', ingredients: 'Blueberries, mangoes, raspberry', cup: 'berry' },
    ],
  },
];
