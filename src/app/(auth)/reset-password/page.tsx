import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/features/auth/ResetPasswordForm";
import { AUTH_COPY } from "@/constants/auth";

export default function ResetPasswordPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-dark">{AUTH_COPY.resetTitle}</h1>
      <p className="mt-2 text-sm text-muted">{AUTH_COPY.resetSubtitle}</p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-muted">Loading…</p>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
