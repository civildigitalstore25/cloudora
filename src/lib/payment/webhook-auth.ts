import crypto from "crypto";
import { PAYMENT_ERRORS } from "@/constants/payment";
import { getCashfreeCredentials } from "@/lib/payment/cashfree-auth";

/**
 * Cashfree webhook HMAC:
 * signedPayload = x-webhook-timestamp + rawBody
 * expectedSignature = base64(HMAC_SHA256(secretKey, signedPayload))
 */
export function verifyCashfreeWebhookSignature(
  request: Request,
  rawBody: string,
): { ok: true } | { ok: false; error: string } {
  const { secretKey } = getCashfreeCredentials();
  if (!secretKey) {
    return { ok: false, error: PAYMENT_ERRORS.CALLBACK_UNAUTHORIZED };
  }

  const signature = request.headers.get("x-webhook-signature")?.trim() ?? "";
  const timestamp = request.headers.get("x-webhook-timestamp")?.trim() ?? "";
  if (!signature || !timestamp) {
    return { ok: false, error: PAYMENT_ERRORS.CALLBACK_UNAUTHORIZED };
  }

  const expected = crypto
    .createHmac("sha256", secretKey)
    .update(timestamp + rawBody)
    .digest("base64");

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { ok: false, error: PAYMENT_ERRORS.CALLBACK_UNAUTHORIZED };
  }

  return { ok: true };
}
