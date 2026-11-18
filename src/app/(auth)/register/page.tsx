import { RegisterForm } from "@/components/features/auth/RegisterForm";
import { AUTH_COPY } from "@/constants/auth";

export default function RegisterPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-dark">{AUTH_COPY.registerTitle}</h1>
      <p className="mt-2 text-sm text-muted">{AUTH_COPY.registerSubtitle}</p>
      <div className="mt-8">
        <RegisterForm />
      </div>
    </div>
  );
}
