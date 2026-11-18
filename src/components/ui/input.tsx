import * as React from "react";
import { cn } from "@/lib/utils/cn";

export function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-input bg-card px-3.5 py-2 text-sm text-dark shadow-[inset_0_1px_1px_rgba(16,38,27,0.03)] transition-colors placeholder:text-muted/80 hover:border-primary/30 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/12 disabled:cursor-not-allowed disabled:bg-cream disabled:opacity-60 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/10",
        className,
      )}
      {...props}
    />
  );
}
