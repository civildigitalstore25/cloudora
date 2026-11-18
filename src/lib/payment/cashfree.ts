import {
  CASHFREE_ORDER_STATUS,
  PAYMENT_ERRORS,
} from "@/constants/payment";
import {
  assertCashfreeCredentialsConfigured,
  cashfreeHeaders,
  getCashfreeHost,
  getCashfreeMode,
  type CashfreeMode,
} from "@/lib/payment/cashfree-auth";

type CreatePaymentResult =
  | {
      paymentSessionId: string;
      cashfreeOrderId: string;
      mode: CashfreeMode;
      raw: unknown;
    }
  | { error: string; raw?: unknown };

type StatusResult = {
  success: boolean;
  state?: string;
  paymentId?: string;
  /** Present while the Cashfree order is ACTIVE, so checkout can be resumed. */
  paymentSessionId?: string;
  raw: unknown;
};

export async function createCashfreePayment(input: {
  orderId: string;
  amountInr: number;
  customerId: string;
  customerPhone: string;
  customerEmail?: string;
  customerName?: string;
  returnUrl: string;
  notifyUrl: string;
}): Promise<CreatePaymentResult> {
  const configured = assertCashfreeCredentialsConfigured();
  if (!configured.ok) {
    return { error: configured.error };
  }

  try {
    const payload = {
      order_id: input.orderId,
      order_amount: Number(input.amountInr.toFixed(2)),
      order_currency: "INR",
      customer_details: {
        customer_id: input.customerId.slice(0, 50),
        customer_phone: input.customerPhone.replace(/\D/g, "").slice(-10),
        ...(input.customerEmail
          ? { customer_email: input.customerEmail }
          : {}),
        ...(input.customerName ? { customer_name: input.customerName } : {}),
      },
      order_meta: {
        return_url: input.returnUrl,
        notify_url: input.notifyUrl,
      },
    };

    const response = await fetch(`${getCashfreeHost()}/pg/orders`, {
      method: "POST",
      headers: cashfreeHeaders(),
      body: JSON.stringify(payload),
    });

    const raw = (await response.json()) as {
      order_id?: string;
      payment_session_id?: string;
      message?: string;
      code?: string;
      error?: { message?: string };
    };

    if (!response.ok || !raw.payment_session_id || !raw.order_id) {
      return {
        error:
          raw.error?.message ??
          raw.message ??
          raw.code ??
          PAYMENT_ERRORS.INIT_FAILED,
        raw,
      };
    }

    return {
      paymentSessionId: raw.payment_session_id,
      cashfreeOrderId: raw.order_id,
      mode: getCashfreeMode(),
      raw,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : PAYMENT_ERRORS.INIT_FAILED,
    };
  }
}

export async function getCashfreeOrderStatus(
  cashfreeOrderId: string,
): Promise<StatusResult> {
  try {
    const response = await fetch(
      `${getCashfreeHost()}/pg/orders/${encodeURIComponent(cashfreeOrderId)}`,
      {
        method: "GET",
        headers: cashfreeHeaders(),
      },
    );

    const raw = (await response.json()) as {
      order_status?: string;
      order_id?: string;
      cf_order_id?: string | number;
      payment_session_id?: string;
      message?: string;
    };

    if (!response.ok) {
      return { success: false, state: "ERROR", raw };
    }

    const state = raw.order_status;
    const success = state === CASHFREE_ORDER_STATUS.PAID;
    return {
      success,
      state,
      paymentId:
        raw.cf_order_id != null ? String(raw.cf_order_id) : undefined,
      paymentSessionId: raw.payment_session_id || undefined,
      raw,
    };
  } catch (error) {
    return {
      success: false,
      state: "ERROR",
      raw: {
        message: error instanceof Error ? error.message : "Status check failed",
      },
    };
  }
}
