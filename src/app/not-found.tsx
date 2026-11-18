import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl text-dark">Page not found</h1>
      <p className="mt-3 text-muted">The page you are looking for does not exist.</p>
      <Button asChild variant="accent" className="mt-6">
        <Link href={ROUTES.HOME}>Back home</Link>
      </Button>
    </div>
  );
}
