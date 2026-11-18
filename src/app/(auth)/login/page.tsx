import { LoginForm } from "@/components/features/auth/LoginForm";
import { AUTH_COPY } from "@/constants/auth";

export default function LoginPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-dark">{AUTH_COPY.loginTitle}</h1>
      <p className="mt-2 text-sm text-muted">{AUTH_COPY.loginSubtitle}</p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  );
}
