import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/client/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl), // make sure baseUrl is set to your personal site URL
  title: {
    default: "Home",
    template: "%s",
  },
  description: "Explore my writings on software engineering, philosophy, psychology, and more.",
  verification: {
    google: "pNDfTdL2dVKXA9gG2n-yto_St-_2xe8zLBG9kjbccpk",
  },
  openGraph: {
    title: "Personal Website",
    description: "Explore my writings on software engineering, philosophy, psychology, and more.",
    url: baseUrl,
    siteName: "Personal Website",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cx(
        "text-neutral-800 bg-white dark:text-neutral-200 dark:bg-gray-900",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-[630px] mx-4 mt-8 lg:mx-auto">
        <main className="mt-6 flex flex-col px-2 md:px-0">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="personal-website-theme">
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
