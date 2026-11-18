import { ForgotPasswordForm } from "@/components/features/auth/ForgotPasswordForm";
import { AUTH_COPY } from "@/constants/auth";

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-dark">{AUTH_COPY.forgotTitle}</h1>
      <p className="mt-2 text-sm text-muted">{AUTH_COPY.forgotSubtitle}</p>
      <div className="mt-8">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
