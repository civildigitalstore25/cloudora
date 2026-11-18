export function resolveSiteUrl(request: Request): string {
  const configured = (process.env.NEXT_PUBLIC_SITE_URL ?? "")
    .trim()
    .replace(/\/$/, "");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host");
  const forwardedProto = request.headers.get("x-forwarded-proto");

  if (host) {
    const proto =
      forwardedProto ??
      (forwardedHost || host.includes("ngrok") ? "https" : "http");
    const fromHeaders = `${proto}://${host}`.replace(/\/$/, "");
    if (process.env.NODE_ENV !== "production" || !configured) {
      return fromHeaders;
    }
    if (sameSiteHost(host, configured)) return fromHeaders;
    return configured;
  }

  return (configured || "http://localhost:3000").replace(/\/$/, "");
}

function sameSiteHost(host: string, siteUrl: string): boolean {
  try {
    const expected = new URL(siteUrl).host.toLowerCase();
    const actual = host.trim().toLowerCase();
    const bare = (value: string) => value.replace(/^www\./, "");
    return bare(actual) === bare(expected);
  } catch {
    return false;
  }
}
