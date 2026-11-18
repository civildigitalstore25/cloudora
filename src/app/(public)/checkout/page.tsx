import { CheckoutClient } from "@/components/features/booking/CheckoutClient";

export default function CheckoutPage() {
  return (
    <div className="bg-background px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl text-dark">Checkout</h1>
        <p className="mt-2 text-muted">
          Guest checkout is available — sign in optional. Pay 50% advance to confirm.
        </p>
        <div className="mt-8">
          <CheckoutClient />
        </div>
      </div>
    </div>
  );
}
