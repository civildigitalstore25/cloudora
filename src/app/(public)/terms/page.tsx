import { CANCELLATION_POLICY, TARIFF_NOTE } from "@/constants/booking";
import { UI } from "@/constants/ui";

export default function TermsPage() {
  return (
    <div className="bg-background px-4 py-16 md:px-6 md:py-24">
      <div className="prose prose-neutral mx-auto max-w-3xl">
        <h1>Terms and conditions</h1>
        <p>{TARIFF_NOTE}</p>
        <h2>Refund and cancellation policy</h2>
        <p>
          Reservations are guaranteed with an advance payment of 50%.
        </p>
        <ul>
          {CANCELLATION_POLICY.map((item) => (
            <li key={item.title}>
              <strong>{item.title}:</strong> {item.body}
            </li>
          ))}
        </ul>
        <h2>Property</h2>
        <p>
          {UI.brandFull}, {UI.address}. Proprietor: {UI.proprietor}.
        </p>
      </div>
    </div>
  );
}
