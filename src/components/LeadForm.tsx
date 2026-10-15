import { useRef, useState, type ChangeEvent, type FormEvent, type FocusEvent, type InputHTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CircleAlert, LoaderCircle, Lock } from 'lucide-react';
import { BUSINESS, LEAD_WEBHOOK_URL, OFFER_TERMS, type Offer } from '../config';
import { attributionFields, newEventId, trackLead } from '../lib/tracking';
import { exitShownThisSession, markConverted } from '../lib/visitor';

type Field = 'firstName' | 'lastName' | 'phone' | 'email';
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const CONSENT_TEXT =
  'By tapping the button, you agree to receive marketing text messages from Recharge Smoothies at the number provided, including messages sent by autodialer. Consent is not a condition of any purchase. Msg and data rates may apply. Msg frequency varies. Reply HELP for help or STOP to cancel.';

function digitsOnly(value: string) {
  let digits = value.replace(/\D/g, '');
  // iOS/Android autofill often supplies +1 or 1 in front of a US number.
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1);
  return digits.slice(0, 10);
}

function formatPhone(digits: string) {
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function validate(field: Field, values: Values): string | undefined {
  const v = values[field].trim();
  switch (field) {
    case 'firstName':
      return v ? undefined : 'Enter your first name.';
    case 'lastName':
      return v ? undefined : 'Enter your last name.';
    case 'phone':
      return digitsOnly(v).length === 10 ? undefined : 'Enter a 10-digit mobile number so we can send your coupon.';
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? undefined : 'Enter an email like name@example.com.';
  }
}

async function postLead(body: Record<string, unknown>) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(LEAD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true,
      signal: controller.signal,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

const FIELD_ORDER: Field[] = ['firstName', 'lastName', 'phone', 'email'];

export default function LeadForm({ offer }: { offer: Offer }) {
  const navigate = useNavigate();
  const [values, setValues] = useState<Values>({ firstName: '', lastName: '', phone: '', email: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'failed'>('idle');
  const inFlight = useRef(false);
  const refs = {
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
  };

  const update = (field: Field) => (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const value = field === 'phone' ? formatPhone(digitsOnly(raw)) : raw;
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validate(field, next) }));
  };

  const blur = (field: Field) => (_e: FocusEvent<HTMLInputElement>) => {
    if (!values[field]) return; // don't scold an empty field the visitor just tabbed past
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate(field, values) }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inFlight.current) return;

    const nextErrors: Errors = {};
    for (const f of FIELD_ORDER) nextErrors[f] = validate(f, values);
    setErrors(nextErrors);
    setTouched({ firstName: true, lastName: true, phone: true, email: true });
    const firstInvalid = FIELD_ORDER.find((f) => nextErrors[f]);
    if (firstInvalid) {
      refs[firstInvalid].current?.focus();
      return;
    }

    // Honeypot: real visitors never see or fill this field.
    const trap = (e.currentTarget.elements.namedItem('company') as HTMLInputElement | null)?.value;

    inFlight.current = true;
    setStatus('sending');

    const eventId = newEventId();
    const digits = digitsOnly(values.phone);
    const payload = {
      // Original fields, unchanged so existing GHL mappings keep working.
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim().toLowerCase(),
      phone: formatPhone(digits),
      offer: offer.crmOffer,
      // New fields.
      phone_e164: `+1${digits}`,
      offer_key: offer.key,
      event_id: eventId,
      sms_consent: 'yes',
      sms_consent_text: CONSENT_TEXT,
      sms_consent_at: new Date().toISOString(),
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      exit_popup_seen: exitShownThisSession() ? 'yes' : 'no',
      ...attributionFields(),
    };

    let ok = true;
    if (!trap) {
      ok = await postLead(payload);
      if (!ok) {
        await new Promise((r) => setTimeout(r, 900));
        ok = await postLead(payload);
      }
    }

    inFlight.current = false;
    if (!ok) {
      setStatus('failed');
      return;
    }
    markConverted();
    if (!trap) trackLead(eventId, offer.key);
    navigate('/thank-you', {
      state: { firstName: payload.firstName, offerKey: offer.key, couponName: offer.couponName, from: window.location.pathname + window.location.search },
    });
  };

  const sending = status === 'sending';

  const input = (
    field: Field,
    label: string,
    props: InputHTMLAttributes<HTMLInputElement>,
  ) => {
    const err = touched[field] ? errors[field] : undefined;
    const errId = `${field}-error`;
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={field} className="text-sm font-semibold text-ink-900">
          {label}
        </label>
        <input
          ref={refs[field]}
          id={field}
          name={field}
          value={values[field]}
          onChange={update(field)}
          onBlur={blur(field)}
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? errId : undefined}
          className={`h-12 w-full rounded-[var(--radius-field)] border bg-cream-50 px-4 text-base text-ink-900 transition-[border-color,box-shadow,background-color] duration-200 focus:bg-white focus:outline-none focus:ring-4 ${
            err
              ? 'border-red-600 focus:ring-red-600/15'
              : 'border-[#e6d9c6] hover:border-[#d8c6ad] focus:border-orange-500 focus:ring-orange-500/20'
          }`}
          {...props}
        />
        {err && (
          <p id={errId} className="flex items-start gap-1.5 text-[13px] font-medium leading-snug text-red-700">
            <CircleAlert aria-hidden className="mt-px size-4 shrink-0" />
            {err}
          </p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4" aria-describedby="offer-terms">
      <div className="grid grid-cols-2 gap-3">
        {input('firstName', 'First name', { autoComplete: 'given-name', autoCapitalize: 'words', enterKeyHint: 'next' })}
        {input('lastName', 'Last name', { autoComplete: 'family-name', autoCapitalize: 'words', enterKeyHint: 'next' })}
      </div>
      {input('phone', 'Mobile number', {
        type: 'tel',
        inputMode: 'tel',
        autoComplete: 'tel',
        placeholder: '(954) 555-0123',
        enterKeyHint: 'next',
      })}
      {input('email', 'Email', {
        type: 'email',
        inputMode: 'email',
        autoComplete: 'email',
        autoCapitalize: 'off',
        spellCheck: false,
        placeholder: 'you@example.com',
        enterKeyHint: 'send',
      })}

      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-xs leading-relaxed text-ink-500">
        {CONSENT_TEXT}{' '}
        See our{' '}
        <a href="/privacy" target="_blank" className="font-medium text-ink-700 underline underline-offset-2">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="/terms" target="_blank" className="font-medium text-ink-700 underline underline-offset-2">
          SMS Terms
        </a>
        .
      </p>

      <button
        type="submit"
        disabled={sending}
        className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 text-[17px] font-semibold text-white shadow-[var(--shadow-cta)] transition-[background-color,transform,box-shadow] duration-200 ease-[var(--ease-out-expo)] hover:bg-red-700 hover:shadow-[var(--shadow-lift)] active:scale-[0.98] disabled:cursor-wait disabled:bg-red-700"
      >
        {sending ? (
          <>
            <LoaderCircle aria-hidden className="size-5 animate-spin" />
            Sending your coupon
          </>
        ) : (
          <>
            {offer.cta}
            <ArrowRight aria-hidden className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      <div aria-live="polite">
        {status === 'failed' && (
          <p role="alert" className="rounded-[var(--radius-field)] bg-red-600/8 px-4 py-3 text-sm font-medium leading-snug text-red-800">
            We couldn't send your coupon just now. Check your connection and tap the button again, or call us at{' '}
            <a href={BUSINESS.phoneHref} className="underline underline-offset-2">
              {BUSINESS.phoneDisplay}
            </a>
            .
          </p>
        )}
      </div>

      <p id="offer-terms" className="flex items-start justify-center gap-1.5 text-center text-[13px] leading-snug text-ink-500">
        <Lock aria-hidden className="mt-0.5 size-3.5 shrink-0" />
        <span>{OFFER_TERMS}</span>
      </p>
    </form>
  );
}
