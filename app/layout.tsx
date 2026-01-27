import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/settings";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: {
      default: settings.seoTitle || settings.siteName || "Fellowship Church",
      template: `%s | ${settings.siteName || "Fellowship Church"}`,
    },
    description: settings.seoDescription || "Welcome to Fellowship Church. Join our community of faith, hope, and love.",
    keywords: settings.seoKeywords || "church, fellowship, faith, community, sermons, worship, events",
    authors: [{ name: settings.siteName || "Fellowship Church" }],
    creator: settings.siteName || "Fellowship Church",
    publisher: settings.siteName || "Fellowship Church",
    robots: "index, follow",
    icons: {
      icon: settings.favicon || "/favicon.ico",
    },
    openGraph: {
      type: "website",
      siteName: settings.siteName || "Fellowship Church",
      title: settings.seoTitle || settings.siteName || "Fellowship Church",
      description: settings.seoDescription || "Welcome to Fellowship Church",
      images: settings.ogImage ? [
        {
          url: settings.ogImage,
          width: 1200,
          height: 630,
          alt: settings.siteName || "Fellowship Church",
        },
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seoTitle || settings.siteName || "Fellowship Church",
      description: settings.seoDescription || "Welcome to Fellowship Church",
      images: settings.ogImage ? [settings.ogImage] : [],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {settings.googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${settings.googleAnalyticsId}');
              `}
            </Script>
          </>
        )}
        {settings.facebookPixelId && (
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${settings.facebookPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
