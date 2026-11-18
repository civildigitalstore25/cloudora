"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { AUTH_COPY, AUTH_PROVIDERS } from "@/constants/auth";
import { ROUTES } from "@/constants/routes";

export function GoogleSignInButton() {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() =>
        signIn(AUTH_PROVIDERS.GOOGLE, { callbackUrl: ROUTES.HOME })
      }
    >
      {AUTH_COPY.googleContinue}
    </Button>
  );
}
