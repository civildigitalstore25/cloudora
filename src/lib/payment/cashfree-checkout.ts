import { CASHFREE_API } from "@/constants/payment";
import type { CashfreeMode } from "@/lib/payment/cashfree-auth";

type CashfreeCheckout = {
  checkout: (opts: {
    paymentSessionId: string;
    redirectTarget?: "_self" | "_blank" | "_top" | "_modal";
  }) => Promise<{ error?: { message?: string } } | undefined>;
};

declare global {
  interface Window {
    Cashfree?: (opts: { mode: CashfreeMode }) => CashfreeCheckout;
  }
}

function loadCashfreeSdk(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Cashfree checkout requires a browser"));
  }
  if (window.Cashfree) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CASHFREE_API.SDK_URL}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Cashfree SDK")),
      );
      return;
    }

    const script = document.createElement("script");
    script.src = CASHFREE_API.SDK_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Cashfree SDK"));
    document.body.appendChild(script);
  });
}

export async function openCashfreeCheckout(
  paymentSessionId: string,
  mode: CashfreeMode,
): Promise<void> {
  await loadCashfreeSdk();
  if (!window.Cashfree) {
    throw new Error("Cashfree SDK unavailable");
  }

  const cashfree = window.Cashfree({ mode });
  const result = await cashfree.checkout({
    paymentSessionId,
    redirectTarget: "_self",
  });

  if (result?.error?.message) {
    throw new Error(result.error.message);
  }
}
