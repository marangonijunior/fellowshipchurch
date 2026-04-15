"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import NewsletterForm from "@/components/shared/NewsletterForm";

type Settings = {
  siteName?: string;
  logo?: string;
  phone?: string;
  email?: string;
  address?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
};

export default function Footer() {
  const [settings, setSettings] = useState<Settings>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Error loading settings:", err));
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Info */}
          <div>
            <Link href="/" className="text-2xl font-heading font-bold inline-block mb-6">
              {settings.logo ? (
                <Image src={settings.logo} alt={settings.siteName || "Logo"} width={120} height={40} className="h-10 w-auto" />
              ) : (
                <>
                  <span className="text-primary">[</span>{settings.siteName || "Finsweet"}
                </>
              )}
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              © Copyright {settings.siteName || "Finsweet"} {currentYear}
            </p>
            {settings.phone && (
              <p className="text-gray-400 text-sm mb-2">{settings.phone}</p>
            )}
            {settings.address && (
              <p className="text-gray-400 text-sm">{settings.address}</p>
            )}
          </div>

          {/* Quicklinks */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quicklinks</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/sermons" className="text-gray-400 hover:text-primary transition-colors">
                  Sermons
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-semibold mb-6">Connect</h3>
            <div className="flex space-x-4">
              {settings.facebookUrl && (
                <Link
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-light flex items-center justify-center hover:bg-primary hover:text-dark transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </Link>
              )}
              {settings.twitterUrl && (
                <Link
                  href={settings.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-light flex items-center justify-center hover:bg-primary hover:text-dark transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </Link>
              )}
              {settings.linkedinUrl && (
                <Link
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-light flex items-center justify-center hover:bg-primary hover:text-dark transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </Link>
              )}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6">
              Subscribe to get Latest Updates and News
            </h3>
            <NewsletterForm
              source="footer"
              placeholder="Youremail@gmail.com"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
