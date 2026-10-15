// Small per-visitor flags. Storage can be unavailable (private mode), so every access is guarded.

const CONVERTED = 'rc_converted'; // sessionStorage: claimed a coupon this session
const EXIT_SHOWN = 'rc_exit_shown'; // sessionStorage: exit popup already shown this session
const EXIT_DISMISSED = 'rc_exit_dismissed_at'; // localStorage: last dismissal time
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

function get(store: () => Storage, key: string) {
  try {
    return store().getItem(key);
  } catch {
    return null;
  }
}
function set(store: () => Storage, key: string, value: string) {
  try {
    store().setItem(key, value);
  } catch {
    // ignore
  }
}

const session = () => window.sessionStorage;
const local = () => window.localStorage;

export const markConverted = () => {
  set(session, CONVERTED, '1');
  set(local, CONVERTED, String(Date.now()));
};
export const hasConverted = () => get(session, CONVERTED) === '1' || Boolean(get(local, CONVERTED));

export const markExitShown = () => set(session, EXIT_SHOWN, '1');
export const exitShownThisSession = () => get(session, EXIT_SHOWN) === '1';

export const markExitDismissed = () => set(local, EXIT_DISMISSED, String(Date.now()));
export const exitRecentlyDismissed = () => {
  const at = Number(get(local, EXIT_DISMISSED));
  return Boolean(at) && Date.now() - at < DISMISS_COOLDOWN_MS;
};
