import { CANCELLATION_POLICY, TARIFF_NOTE } from "@/constants/booking";
import { UI } from "@/constants/ui";

const FAQS = [
  {
    q: "What is included in the standard tariff?",
    a: TARIFF_NOTE,
  },
  {
    q: "How much advance is needed to confirm?",
    a: "Reservations are guaranteed with an advance payment of 50%. The balance is due at the property.",
  },
  {
    q: "Is Cloudora suitable for families?",
    a: `Yes. Cloudora is a private 5 BHK villa for families, friends and corporate groups, accommodating up to ${UI.maxGuests} guests.`,
  },
  {
    q: "What is your cancellation policy?",
    a: CANCELLATION_POLICY.map((p) => `${p.title}: ${p.body}`).join(" "),
  },
] as const;

export default function FaqsPage() {
  return (
    <div className="bg-background px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl text-dark">Frequently asked questions</h1>
        <div className="mt-10 space-y-6">
          {FAQS.map((item) => (
            <div key={item.q} className="border-b border-border pb-6">
              <h2 className="font-display text-xl text-dark">{item.q}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
