import { BUSINESS } from '../config';

// Plain-language starter policies so the consent links resolve.
// Have the owner (and counsel, if available) review before relying on them.
const UPDATED = 'October 15, 2026';

function Privacy() {
  return (
    <>
      <h1 className="text-5xl uppercase">Privacy Policy</h1>
      <p className="text-ink-500">Last updated {UPDATED}</p>
      <h2>What we collect</h2>
      <p>
        When you claim a coupon we collect your name, mobile number and email address, the offer you claimed, and
        basic information about how you reached this page (for example the ad or link you clicked).
      </p>
      <h2>How we use it</h2>
      <p>
        We use it to send your coupon, to send offers and updates by text and email if you agreed to receive them, and
        to understand which of our ads work. We use Meta (Facebook) advertising tools that may record that you visited
        this page or claimed an offer.
      </p>
      <h2>Sharing</h2>
      <p>
        We do not sell your information. Mobile numbers and text messaging opt-in data are not shared with third parties
        or affiliates for their marketing purposes. We share data only with the service providers that help us run our
        business, such as our messaging and customer management platforms, and only for that purpose.
      </p>
      <h2>Your choices</h2>
      <p>
        Reply STOP to any text to stop messages. Use the unsubscribe link in any email. To ask us to update or delete
        your information, email {BUSINESS.email} or call {BUSINESS.phoneDisplay}.
      </p>
    </>
  );
}

function Terms() {
  return (
    <>
      <h1 className="text-5xl uppercase">SMS Terms</h1>
      <p className="text-ink-500">Last updated {UPDATED}</p>
      <h2>Recharge Smoothies text messages</h2>
      <p>
        By opting in, you agree to receive recurring marketing and coupon text messages from {BUSINESS.name} at the
        number you provided, which may be sent by an autodialer. Consent is not a condition of any purchase.
      </p>
      <ul>
        <li>Message frequency varies.</li>
        <li>Message and data rates may apply.</li>
        <li>Reply HELP for help, or contact {BUSINESS.phoneDisplay}.</li>
        <li>Reply STOP to cancel at any time. You will receive one message confirming you have opted out.</li>
        <li>Carriers are not liable for delayed or undelivered messages.</li>
      </ul>
      <h2>Coupon terms</h2>
      <p>
        One coupon per person. Valid in store only at {BUSINESS.street}, {BUSINESS.cityLine}. Expires 7 days after
        signup. Not valid with other offers or on delivery apps. No cash value.
      </p>
    </>
  );
}

export default function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  return (
    <article className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-12 text-[16px] leading-relaxed text-ink-700 sm:px-6 [&_h2]:mt-6 [&_h2]:font-sans [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink-900 [&_li]:ml-5 [&_li]:list-disc [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1">
      {kind === 'privacy' ? <Privacy /> : <Terms />}
    </article>
  );
}
