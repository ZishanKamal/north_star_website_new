import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Developing Leaders, Empowering Institutions",
    template: "%s | North Star",
  },
  description:
    "We partner with schools and colleges to deliver transformative training programs that develop leaders, build career-ready graduates, and empower institutions to achieve excellence.",
  keywords: [
    "institutional training",
    "school programs",
    "college training partner",
    "leadership development",
    "career readiness",
    "soft skills training",
    "Ranchi",
    "India",
  ],
  metadataBase: new URL("https://northstaronline.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "North Star",
    title: "North Star — Developing Leaders, Empowering Institutions",
    description:
      "We partner with schools and colleges to deliver transformative training programs that develop leaders, build career-ready graduates, and empower institutions to achieve excellence.",
  },
  twitter: {
    card: "summary_large_image",
    title: "North Star — Developing Leaders, Empowering Institutions",
    description:
      "We partner with schools and colleges to deliver transformative training programs that develop leaders, build career-ready graduates, and empower institutions to achieve excellence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          {/* Organization JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                name: "North Star",
                url: "https://northstaronline.in",
                logo: "https://northstaronline.in/north-star-logo.png",
                description:
                  "We partner with schools and colleges to deliver transformative training programs that develop leaders, build career-ready graduates, and empower institutions to achieve excellence.",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "01 4th Floor, Rali Grand Mall, Main Road",
                  addressLocality: "Ranchi",
                  addressRegion: "Jharkhand",
                  postalCode: "834001",
                  addressCountry: "IN",
                },
                telephone: "+91 9241959311",
                email: "connect@northstaronline.in",
                sameAs: [],
              }),
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
