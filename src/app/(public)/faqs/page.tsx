import { CANCELLATION_POLICY, TARIFF_NOTE } from "@/constants/booking";
import { IDEAL_FOR, WELCOME_COPY } from "@/constants/content";
import { UI } from "@/constants/ui";

const FAQS = [
  {
    q: "What is Cloudora?",
    a: WELCOME_COPY.body,
  },
  {
    q: "What is included in the standard tariff?",
    a: TARIFF_NOTE,
  },
  {
    q: "How much advance is needed to confirm?",
    a: "Reservations are guaranteed with an advance payment of 50%. The balance is due at the property. Google Pay and bank transfer details are on the Contact page.",
  },
  {
    q: "Who is Cloudora ideal for?",
    a: IDEAL_FOR.join("; ") + ".",
  },
  {
    q: "How do I enquire about Sai Travels package?",
    a: `Call Cloudora Kodaikanal on ${UI.phonePrimary} or Sai Travels Theni on ${UI.saiTravelsPhone}. Advance booking required; pricing depends on group size, dates and availability.`,
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
