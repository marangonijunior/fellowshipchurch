import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fellowshipchurch.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/blog", "/blog/*", "/about", "/contact", "/sermons", "/sermons/*", "/events", "/events/*"],
        disallow: ["/admin", "/admin/*", "/api/*", "/login"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
