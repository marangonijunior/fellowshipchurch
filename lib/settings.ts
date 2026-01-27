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
    };
  }
}
