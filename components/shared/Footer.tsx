import Link from "next/link";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Info */}
          <div>
            <Link href="/" className="text-2xl font-heading font-bold inline-block mb-6">
              <span className="text-primary">[</span>Finsweet
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              © Copyright Finsweet 2022
            </p>
            <p className="text-gray-400 text-sm mb-2">(480) 555-0103</p>
            <p className="text-gray-400 text-sm mb-2">4517 Washington Ave.</p>
            <p className="text-gray-400 text-sm">Manchester, Kentucky 39495</p>
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
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-light flex items-center justify-center hover:bg-primary hover:text-dark transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-light flex items-center justify-center hover:bg-primary hover:text-dark transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-light flex items-center justify-center hover:bg-primary hover:text-dark transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6">
              Subscribe to get Latest Updates and News
            </h3>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Youremail@gmail.com"
                className="flex-1 px-4 py-3 rounded-md bg-dark-light text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
