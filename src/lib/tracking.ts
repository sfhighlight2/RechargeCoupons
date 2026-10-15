// Attribution capture and Meta Pixel helpers.
// Attribution is stored per browser session so it survives in-page navigation
// and reloads, and is sent to GoHighLevel with the lead.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const STORAGE_KEY = 'rc_attribution';
const PARAM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'gclid',
] as const;

export type Attribution = Partial<Record<(typeof PARAM_KEYS)[number], string>> & {
  landing_page?: string;
  referrer?: string;
  fbc_from_click?: string;
};

function readCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function readStored(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

/** Call once on app load. A new ad click (fresh params) replaces the stored touch. */
export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const fresh: Attribution = {};
  for (const key of PARAM_KEYS) {
    const value = params.get(key);
    if (value) fresh[key] = value.slice(0, 200);
  }
  const hasFresh = Object.keys(fresh).length > 0;
  const stored = readStored();
  if (!hasFresh && stored.landing_page) return;

  const next: Attribution = {
    ...fresh,
    landing_page: window.location.pathname + window.location.search,
    referrer: document.referrer || undefined,
  };
  if (fresh.fbclid) next.fbc_from_click = `fb.1.${Date.now()}.${fresh.fbclid}`;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private mode or storage disabled: attribution is best effort.
  }
}

/** Flat key/value fields to merge into the lead payload. */
export function attributionFields(): Record<string, string> {
  const stored = readStored();
  const { fbc_from_click, ...rest } = stored;
  const fields: Record<string, string> = {};
  for (const [k, v] of Object.entries(rest)) if (v) fields[k] = v;
  const fbc = readCookie('_fbc') || fbc_from_click;
  const fbp = readCookie('_fbp');
  if (fbc) fields.fbc = fbc;
  if (fbp) fields.fbp = fbp;
  return fields;
}

export function newEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Fire only after the CRM accepted the lead. The same eventID goes to GHL for CAPI dedup. */
export function trackLead(eventId: string, offerKey: string) {
  window.fbq?.('track', 'Lead', { content_name: offerKey, content_category: 'coupon' }, { eventID: eventId });
}

export function trackPageView() {
  window.fbq?.('track', 'PageView');
}
