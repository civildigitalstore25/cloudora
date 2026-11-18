import { cn } from "@/lib/utils/cn";

const BADGE_TONES = {
  default: "border-accent/30 bg-accent-soft text-accent-strong",
  primary: "border-primary/15 bg-primary-soft text-primary",
  success: "border-success/20 bg-success-soft text-success",
  warning: "border-warning/20 bg-warning-soft text-warning",
  destructive: "border-destructive/20 bg-destructive-soft text-destructive",
  neutral: "border-border bg-cream text-muted",
} as const;

export function Badge({
  className,
  tone = "default",
  ...props
}: React.ComponentProps<"span"> & { tone?: keyof typeof BADGE_TONES }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        BADGE_TONES[tone],
        className,
      )}
      {...props}
    />
  );
}
