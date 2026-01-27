"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [siteName, setSiteName] = useState("Finsweet");
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    // Fetch site settings
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.siteName) setSiteName(data.siteName);
        if (data.logo) setLogo(data.logo);
      })
      .catch((err) => console.error("Error loading settings:", err));
  }, []);

  return (
    <header className="bg-dark text-white sticky top-0 z-50">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-heading font-bold flex items-center gap-2">
            {logo ? (
              <Image src={logo} alt={siteName} width={120} height={40} className="h-10 w-auto" />
            ) : (
              <>
                <span className="text-primary">[</span>{siteName}
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-primary transition-colors">
              HOME
            </Link>
            <Link href="/about" className="text-white hover:text-primary transition-colors">
              ABOUT US
            </Link>
            <Link href="/sermons" className="text-white hover:text-primary transition-colors">
              SERMONS
            </Link>
            <Link href="/events" className="text-white hover:text-primary transition-colors">
              EVENTS
            </Link>
            <Link href="/blog" className="text-white hover:text-primary transition-colors">
              BLOG
            </Link>
          </div>

          {/* Contact Button */}
          <Link
            href="/contact"
            className="hidden md:inline-block btn-primary"
          >
            CONTACT US
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              href="/"
              className="block text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="/about"
              className="block text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT US
            </Link>
            <Link
              href="/sermons"
              className="block text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              SERMONS
            </Link>
            <Link
              href="/events"
              className="block text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              EVENTS
            </Link>
            <Link
              href="/blog"
              className="block text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              BLOG
            </Link>
            <Link
              href="/contact"
              className="block btn-primary w-full text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT US
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
