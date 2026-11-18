import type { Metadata } from "next";
import { Providers } from "@/components/providers/Providers";
import { ASSETS } from "@/constants/assets";
import { SEO_DEFAULTS, SITE_NAME } from "@/constants/seo";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: SEO_DEFAULTS.defaultTitle,
    template: SEO_DEFAULTS.titleTemplate,
  },
  description: SEO_DEFAULTS.description,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  icons: {
    icon: [{ url: ASSETS.LOGO, type: "image/jpeg" }],
    apple: ASSETS.LOGO,
  },
  openGraph: {
    siteName: SITE_NAME,
    locale: SEO_DEFAULTS.locale,
    type: SEO_DEFAULTS.type,
    images: [{ url: ASSETS.LOGO_PNG, alt: `${SITE_NAME} Logo` }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,300..900;1,6..12,300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
