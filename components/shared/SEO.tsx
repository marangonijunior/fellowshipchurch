import { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

export function generateSEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = "website",
  canonicalUrl,
  noindex = false,
}: SEOProps): Metadata {
  const siteName = "Fellowship Church";
  const defaultDescription = "Join Fellowship Church - a welcoming community of faith, hope, and love. Explore our sermons, events, and connect with our community.";
  const defaultImage = "/og-image.jpg";

  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const metaDescription = description || defaultDescription;
  const metaImage = ogImage || defaultImage;

  return {
    title: fullTitle,
    description: metaDescription,
    keywords: keywords || "church, fellowship, faith, community, sermons, worship, events",
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    robots: noindex ? "noindex, nofollow" : "index, follow",
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      type: ogType as any,
      siteName,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(canonicalUrl && { url: canonicalUrl }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [metaImage],
    },
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
  };
}
