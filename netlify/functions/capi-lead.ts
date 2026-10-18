// Netlify Function: Send Meta CAPI Lead event for dedup with browser pixel.
// Reads META_CAPI_ACCESS_TOKEN (required), META_PIXEL_ID (defaults to 313302342389939),
// and optional META_CAPI_TEST_CODE. Never logs raw PII.
import type { Context, Config } from '@netlify/functions';

// Minimal typing for Netlify.env to satisfy TS without adding extra deps.
// Netlify provides this at runtime.
declare const Netlify: { env: { get(name: string): string | undefined } } | undefined;

type LeadPayload = {
  event_id?: string;
  page_url?: string;
  offer_key?: string;
  email?: string;
  phone_e164?: string;
  firstName?: string;
  lastName?: string;
  fbp?: string;
  fbc?: string;
  user_agent?: string;
  possible_bot?: 'yes' | 'no';
};

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function normalizeEmail(email?: string): string | undefined {
  const v = (email ?? '').trim().toLowerCase();
  return v || undefined;
}

function normalizePhoneDigits(phoneE164?: string): string | undefined {
  // Expect input like +1XXXXXXXXXX; keep digits only and ensure country code present.
  const digits = (phoneE164 ?? '').replace(/\D/g, '');
  if (!digits) return undefined;
  // If 10-digit US, prefix 1. Otherwise assume already includes country code.
  if (digits.length === 10) return `1${digits}`;
  return digits;
}

function normalizeName(name?: string): string | undefined {
  const v = (name ?? '').trim().toLowerCase();
  return v || undefined;
}

function getEnv(name: string): string | undefined {
  try {
    // Prefer Netlify.env in functions
    if (typeof Netlify !== 'undefined' && Netlify?.env?.get) {
      return Netlify.env.get(name);
    }
  } catch {
    // ignore
  }
  // Fallback for local dev
  // eslint-disable-next-line no-process-env
  return process.env?.[name];
}

export default async (req: Request, context: Context) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    // Silently ignore malformed bodies
    return new Response(null, { status: 204 });
  }

  // Skip suspected bots completely
  if (body.possible_bot === 'yes') {
    return new Response(null, { status: 204 });
  }

  const eventId = (body.event_id || '').toString().slice(0, 128);
  if (!eventId) {
    // Require event_id for dedup
    return new Response(null, { status: 204 });
  }

  const pixelId = getEnv('META_PIXEL_ID') || '313302342389939';
  const token = getEnv('META_CAPI_ACCESS_TOKEN');
  if (!token) {
    // Not configured: do nothing
    return new Response(null, { status: 204 });
  }
  const testCode = getEnv('META_CAPI_TEST_CODE');

  const ua = body.user_agent || req.headers.get('user-agent') || undefined;
  const ip = context.ip || undefined;

  const normEmail = normalizeEmail(body.email);
  const normPhone = normalizePhoneDigits(body.phone_e164);
  const normFirst = normalizeName(body.firstName);
  const normLast = normalizeName(body.lastName);

  // Build the user_data with required hashing
  const userData: Record<string, unknown> = {
    client_ip_address: ip,
    client_user_agent: ua,
  };
  if (body.fbp) userData.fbp = body.fbp;
  if (body.fbc) userData.fbc = body.fbc;
  if (normEmail) userData.em = await sha256Hex(normEmail);
  if (normPhone) userData.ph = await sha256Hex(normPhone);
  if (normFirst) userData.fn = await sha256Hex(normFirst);
  if (normLast) userData.ln = await sha256Hex(normLast);

  const event = {
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    event_source_url: body.page_url || undefined,
    action_source: 'website',
    user_data: userData,
    custom_data: {
      content_name: body.offer_key || undefined,
      content_category: 'coupon',
    },
  };

  const url = new URL(`https://graph.facebook.com/v21.0/${encodeURIComponent(pixelId)}/events`);
  url.searchParams.set('access_token', token);

  const payload: Record<string, unknown> = { data: [event] };
  if (testCode) payload.test_event_code = testCode;

  // Send in the background; never block the response
  context.waitUntil(
    (async () => {
      try {
        await fetch(url.toString(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        });
      } catch {
        // Swallow errors to avoid noise; never log PII or tokens.
      }
    })(),
  );

  return new Response(null, { status: 204 });
};

export const config: Config = {
  path: '/api/capi/lead',
  method: ['POST', 'OPTIONS'],
};

