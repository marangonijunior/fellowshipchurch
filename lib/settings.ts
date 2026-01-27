import { db } from "./db";

export async function getSiteSettings() {
  try {
    let settings = await db.siteSettings.findFirst();
    
    if (!settings) {
      settings = await db.siteSettings.create({
        data: {},
      });
    }

    return settings;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return {
      siteName: "Fellowship Church",
      siteTagline: "Welcome to our community",
      primaryColor: "#FFD7A8",
      darkColor: "#1A1D23",
      seoTitle: null,
      seoDescription: null,
      seoKeywords: null,
      ogImage: null,
      logo: null,
      favicon: null,
      address: null,
      contactPhone: null,
      contactEmail: null,
      socialFacebook: null,
      socialTwitter: null,
      socialInstagram: null,
      socialYoutube: null,
      googleAnalyticsId: null,
      facebookPixelId: null,
    } as const;
  }
}
