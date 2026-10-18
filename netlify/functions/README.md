Meta CAPI Lead function

- Path: `/api/capi/lead` (via `netlify/functions/capi-lead.ts`)
- Purpose: Sends a server-side Meta Conversions API "Lead" event using the same `event_id` as the browser pixel for deduplication.
- Called from: `src/components/LeadForm.tsx` after the GoHighLevel webhook accepts the lead.

Environment variables (set in Netlify site settings)

- `META_CAPI_ACCESS_TOKEN` (required): Meta access token with permissions for the pixel.
- `META_PIXEL_ID` (optional): Pixel ID; defaults to `313302342389939` if not set.
- `META_CAPI_TEST_CODE` (optional): Test code from Meta Events Manager → Test Events, to verify events without impacting reporting.

Behavior and privacy

- Hashes PII with SHA-256 (lowercased/trimmed `email`, digits-only phone including country code, `firstName`, `lastName`).
- Includes `event_source_url`, `action_source: "website"`, client IP and user agent, and `fbp`/`fbc` cookies when present.
- Skips sending entirely when the client flags `possible_bot: "yes"`.
- Never logs tokens or raw PII.

How to verify with Meta Events Manager

1) In Events Manager, open your Pixel → Test Events and copy the Test Code.
2) Set the Netlify env var `META_CAPI_TEST_CODE` to that code (alongside `META_CAPI_ACCESS_TOKEN` and optional `META_PIXEL_ID`) and deploy.
3) Submit the lead form on either offer route (`/` or `/bogo`). You should see a server event (Lead) appear in Test Events, deduplicated with the browser event by `event_id`.

