import Link from "next/link";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ADMIN_ACTIONS } from "@/constants/admin";
import { cn } from "@/lib/utils/cn";

export function AdminCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AdminStatusPill({
  active,
  activeLabel = ADMIN_ACTIONS.active,
  inactiveLabel = ADMIN_ACTIONS.hidden,
}: {
  active: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
}) {
  return (
    <Badge tone={active ? "success" : "neutral"}>
      {active ? activeLabel : inactiveLabel}
    </Badge>
  );
}

export function AdminAddButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Button asChild variant="accent" size="sm">
      <Link href={href}>
        <Plus className="h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
}

export function AdminEmptyState({ message = ADMIN_ACTIONS.empty }: { message?: string }) {
  return (
    <AdminCard className="border-dashed px-6 py-12 text-center text-sm text-muted">
      {message}
    </AdminCard>
  );
}

export function AdminTable({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <AdminCard>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-cream/80 text-muted">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-4 py-3 font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </AdminCard>
  );
}

export function AdminTableRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <tr className={cn("border-t border-border/70 transition hover:bg-cream/50", className)}>
      {children}
    </tr>
  );
}
