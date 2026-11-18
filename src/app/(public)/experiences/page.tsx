import { ExperiencesSection } from "@/components/features/home/ExperiencesSection";
import { ContactForm } from "@/components/features/contact/ContactForm";
import { EXPERIENCES_COPY } from "@/constants/home";

export default function ExperiencesPage() {
  return (
    <div className="pt-8">
      <div className="mx-auto max-w-3xl px-4 py-12 text-center md:px-6">
        <h1 className="font-display text-4xl text-dark md:text-5xl">
          {EXPERIENCES_COPY.title}
        </h1>
      </div>
      <ExperiencesSection />
      <div className="mx-auto max-w-xl px-4 pb-20 md:px-6">
        <h2 className="font-display text-2xl text-dark">Enquire about an experience</h2>
        <div className="mt-6">
          <ContactForm defaultSubject="Experience enquiry" />
        </div>
      </div>
    </div>
  );
}
