export const CASHFREE_ENVS = {
  SANDBOX: "SANDBOX",
  PRODUCTION: "PRODUCTION",
} as const;

export const PAYMENT_ERRORS = {
  CREDENTIALS_MISSING:
    "Cashfree credentials are not configured. Set CASHFREE_APP_ID and CASHFREE_SECRET_KEY.",
  CALLBACK_UNAUTHORIZED: "Invalid payment webhook signature",
  STATUS_UNAUTHORIZED: "Unauthorized",
  STATUS_FORBIDDEN: "Forbidden",
  INIT_FAILED: "Payment initiation failed",
  ALREADY_PAID: "This booking is already paid",
  ORDER_CANCELLED: "This booking was cancelled and can't be paid",
} as const;

export const CASHFREE_API = {
  VERSION: "2023-08-01",
  SANDBOX_HOST: "https://sandbox.cashfree.com",
  PRODUCTION_HOST: "https://api.cashfree.com",
  SDK_URL: "https://sdk.cashfree.com/js/v3/cashfree.js",
} as const;

export const CASHFREE_ORDER_STATUS = {
  PAID: "PAID",
  ACTIVE: "ACTIVE",
  EXPIRED: "EXPIRED",
  TERMINATED: "TERMINATED",
} as const;

export const CASHFREE_WEBHOOK_TYPES = {
  PAYMENT_SUCCESS: "PAYMENT_SUCCESS_WEBHOOK",
  PAYMENT_FAILED: "PAYMENT_FAILED_WEBHOOK",
  PAYMENT_USER_DROPPED: "PAYMENT_USER_DROPPED_WEBHOOK",
} as const;
