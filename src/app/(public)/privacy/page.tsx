import { UI } from "@/constants/ui";

export default function PrivacyPage() {
  return (
    <div className="bg-background px-4 py-16 md:px-6 md:py-24">
      <div className="prose prose-neutral mx-auto max-w-3xl">
        <h1>Privacy policy</h1>
        <p>
          {UI.brandFull} collects your name, email, phone and booking details to
          manage stays, payments and guest communication. We do not sell personal
          data. Contact {UI.email} for privacy requests.
        </p>
      </div>
    </div>
  );
}
