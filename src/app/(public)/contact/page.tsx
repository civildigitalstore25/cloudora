import { ContactForm } from "@/components/features/contact/ContactForm";
import { UI } from "@/constants/ui";

export default function ContactPage() {
  return (
    <div className="bg-background px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl text-dark md:text-5xl">Contact</h1>
          <p className="mt-4 text-muted">
            Reach {UI.brandFull} for bookings, packages and stay questions.
          </p>
          <div className="mt-8 space-y-3 text-sm text-dark">
            <p>{UI.address}</p>
            <p>
              <a href={`tel:${UI.phonePrimary.replace(/\s/g, "")}`}>
                {UI.phonePrimary}
              </a>
            </p>
            <p>
              <a href={`tel:${UI.phoneSecondary.replace(/\s/g, "")}`}>
                {UI.phoneSecondary}
              </a>
            </p>
            <p>
              <a href={`mailto:${UI.email}`}>{UI.email}</a>
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
