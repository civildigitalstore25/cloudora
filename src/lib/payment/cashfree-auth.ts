import { CASHFREE_API, CASHFREE_ENVS, PAYMENT_ERRORS } from "@/constants/payment";

export type CashfreeEnv = (typeof CASHFREE_ENVS)[keyof typeof CASHFREE_ENVS];
export type CashfreeMode = "sandbox" | "production";

export function getCashfreeEnv(): CashfreeEnv {
  const env = (process.env.CASHFREE_ENV ?? CASHFREE_ENVS.SANDBOX).toUpperCase();
  return env === CASHFREE_ENVS.PRODUCTION
    ? CASHFREE_ENVS.PRODUCTION
    : CASHFREE_ENVS.SANDBOX;
}

export function getCashfreeMode(): CashfreeMode {
  return getCashfreeEnv() === CASHFREE_ENVS.PRODUCTION
    ? "production"
    : "sandbox";
}

export function getCashfreeHost(): string {
  // CASHFREE_BASE_URL is a test-only override (a local fake). It is ignored
  // when CASHFREE_ENV=PRODUCTION so live payments can never be redirected.
  const override = process.env.CASHFREE_BASE_URL?.trim();
  if (override && getCashfreeEnv() !== CASHFREE_ENVS.PRODUCTION) {
    return override.replace(/\/+$/, "");
  }
  return getCashfreeEnv() === CASHFREE_ENVS.PRODUCTION
    ? CASHFREE_API.PRODUCTION_HOST
    : CASHFREE_API.SANDBOX_HOST;
}

export function getCashfreeCredentials() {
  return {
    appId: (process.env.CASHFREE_APP_ID ?? "").trim(),
    secretKey: (process.env.CASHFREE_SECRET_KEY ?? "").trim(),
    apiVersion:
      (process.env.CASHFREE_API_VERSION ?? "").trim() || CASHFREE_API.VERSION,
  };
}

export function assertCashfreeCredentialsConfigured():
  | { ok: true }
  | { ok: false; error: string } {
  const { appId, secretKey } = getCashfreeCredentials();
  if (!appId || !secretKey) {
    return { ok: false, error: PAYMENT_ERRORS.CREDENTIALS_MISSING };
  }
  return { ok: true };
}

export function cashfreeHeaders(): Record<string, string> {
  const { appId, secretKey, apiVersion } = getCashfreeCredentials();
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-version": apiVersion,
    "x-client-id": appId,
    "x-client-secret": secretKey,
  };
}
