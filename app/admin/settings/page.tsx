"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Save, Upload } from "lucide-react";

interface Settings {
  siteName: string;
  siteTagline: string;
  logo?: string;
  favicon?: string;
  primaryColor: string;
  darkColor: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialFacebook?: string;
  socialInstagram?: string;
  socialTwitter?: string;
  socialYoutube?: string;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const [settings, setSettings] = useState<Settings>({
    siteName: "Fellowship Church",
    siteTagline: "Welcome to our community",
    primaryColor: "#FFD7A8",
    darkColor: "#1A1D23",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings");
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setMessage("Settings saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof Settings, value: string) => {
    setSettings({ ...settings, [field]: value });
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-dark mb-2">Site Settings</h1>
          <p className="text-dark/60">Manage your website configuration and branding</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary inline-flex items-center gap-2"
        >
          <Save size={20} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-heading font-bold mb-6">General Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Site Name *
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleChange("siteName", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Fellowship Church"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={settings.siteTagline || ""}
                onChange={(e) => handleChange("siteTagline", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Welcome to our community"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Logo URL
              </label>
              <input
                type="text"
                value={settings.logo || ""}
                onChange={(e) => handleChange("logo", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://example.com/logo.png"
              />
              <p className="text-xs text-dark/60 mt-1">Upload your logo and paste the URL here</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Favicon URL
              </label>
              <input
                type="text"
                value={settings.favicon || ""}
                onChange={(e) => handleChange("favicon", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://example.com/favicon.ico"
              />
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-heading font-bold mb-6">SEO & Meta Tags</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                SEO Title
              </label>
              <input
                type="text"
                value={settings.seoTitle || ""}
                onChange={(e) => handleChange("seoTitle", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Fellowship Church - Faith, Hope & Community"
              />
              <p className="text-xs text-dark/60 mt-1">Appears in search results (50-60 chars)</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                SEO Description
              </label>
              <textarea
                value={settings.seoDescription || ""}
                onChange={(e) => handleChange("seoDescription", e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Join our welcoming community of faith..."
              />
              <p className="text-xs text-dark/60 mt-1">Meta description (150-160 chars)</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                SEO Keywords
              </label>
              <input
                type="text"
                value={settings.seoKeywords || ""}
                onChange={(e) => handleChange("seoKeywords", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="church, faith, community, worship, sermons"
              />
              <p className="text-xs text-dark/60 mt-1">Comma-separated keywords</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Open Graph Image
              </label>
              <input
                type="text"
                value={settings.ogImage || ""}
                onChange={(e) => handleChange("ogImage", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://example.com/og-image.jpg"
              />
              <p className="text-xs text-dark/60 mt-1">1200x630px for social media sharing</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-heading font-bold mb-6">Contact Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Email
              </label>
              <input
                type="email"
                value={settings.contactEmail || ""}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="contact@fellowshipchurch.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={settings.contactPhone || ""}
                onChange={(e) => handleChange("contactPhone", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="(480) 555-0103"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Address
              </label>
              <textarea
                value={settings.address || ""}
                onChange={(e) => handleChange("address", e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="4517 Washington Ave., Manchester, Kentucky 39495"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-heading font-bold mb-6">Social Media</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Facebook URL
              </label>
              <input
                type="url"
                value={settings.socialFacebook || ""}
                onChange={(e) => handleChange("socialFacebook", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://facebook.com/yourpage"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.socialInstagram || ""}
                onChange={(e) => handleChange("socialInstagram", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://instagram.com/yourprofile"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Twitter URL
              </label>
              <input
                type="url"
                value={settings.socialTwitter || ""}
                onChange={(e) => handleChange("socialTwitter", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://twitter.com/yourhandle"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                YouTube URL
              </label>
              <input
                type="url"
                value={settings.socialYoutube || ""}
                onChange={(e) => handleChange("socialYoutube", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://youtube.com/yourchannel"
              />
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <h2 className="text-xl font-heading font-bold mb-6">Analytics & Tracking</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Google Analytics ID
              </label>
              <input
                type="text"
                value={settings.googleAnalyticsId || ""}
                onChange={(e) => handleChange("googleAnalyticsId", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="G-XXXXXXXXXX"
              />
              <p className="text-xs text-dark/60 mt-1">Your Google Analytics 4 ID</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Facebook Pixel ID
              </label>
              <input
                type="text"
                value={settings.facebookPixelId || ""}
                onChange={(e) => handleChange("facebookPixelId", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="123456789012345"
              />
              <p className="text-xs text-dark/60 mt-1">Your Facebook Pixel ID</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
