import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { Calendar, MapPin, Clock } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-dark/80 to-dark/60">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80')] bg-cover bg-center opacity-30"></div>
        <div className="relative container-custom h-full flex flex-col justify-center text-white">
          <p className="text-primary uppercase tracking-wide mb-4">Welcome to our church</p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 max-w-2xl">
            Become a part of our community
          </h1>
          <Link href="/contact" className="btn-primary w-fit">
            Learn more
          </Link>
          <p className="mt-8 text-gray-300 max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>

      {/* A Church That's Relevant Section */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <p className="text-dark/60 uppercase tracking-wide mb-4 text-center">Sub-headline</p>
          <h2 className="text-4xl md:text-5xl font-heading text-center mb-16">
            A church that's relevant
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Us Card */}
            <div className="bg-cream-dark p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading mb-4">About us</h3>
              <p className="text-dark/70 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Link href="/about" className="text-dark font-semibold hover:text-primary transition-colors">
                Learn more →
              </Link>
            </div>

            {/* Get Involved Card */}
            <div className="bg-cream-dark p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading mb-4">Get involved</h3>
              <p className="text-dark/70 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Link href="/about" className="text-dark font-semibold hover:text-primary transition-colors">
                Learn more →
              </Link>
            </div>

            {/* Giving Back Card */}
            <div className="bg-cream-dark p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading mb-4">Giving back</h3>
              <p className="text-dark/70 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Link href="/about" className="text-dark font-semibold hover:text-primary transition-colors">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Love and Compassion Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <p className="text-dark/60 uppercase tracking-wide mb-4 text-center">Sub-headline</p>
          <h2 className="text-4xl md:text-5xl font-heading text-center mb-4">
            Love and compassion
          </h2>
          <p className="text-center text-dark/70 max-w-3xl mx-auto mb-16">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          
          <div className="flex justify-center mb-12">
            <Link href="/about" className="btn-primary">
              Read more
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl overflow-hidden h-80 bg-gray-200">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80')] bg-cover bg-center"></div>
            </div>
            <div className="rounded-2xl overflow-hidden h-80 bg-gray-200 md:-mt-12">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80')] bg-cover bg-center"></div>
            </div>
            <div className="rounded-2xl overflow-hidden h-80 bg-gray-200">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1505409859467-3a796fd5798e?q=80')] bg-cover bg-center"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <p className="text-dark/60 uppercase tracking-wide mb-4 text-center">Benefits</p>
          <h2 className="text-4xl md:text-5xl font-heading text-center mb-16">
            The benefits of joining our church
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Benefit Card 1 */}
            <div className="relative h-96 rounded-lg overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"></div>
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-2xl font-heading mb-2">Find fulfillment and joy</h3>
                <p className="text-sm text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>

            {/* Benefit Card 2 */}
            <div className="relative h-96 rounded-lg overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"></div>
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-2xl font-heading mb-2">Shared values</h3>
                <p className="text-sm text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>

            {/* Benefit Card 3 */}
            <div className="relative h-96 rounded-lg overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"></div>
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-2xl font-heading mb-2">Charity events</h3>
                <p className="text-sm text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>

            {/* Benefit Card 4 */}
            <div className="relative h-96 rounded-lg overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?q=80')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"></div>
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-2xl font-heading mb-2">All are welcome</h3>
                <p className="text-sm text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Sermons Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-heading text-center mb-16">
            Upcoming sermons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: "1", date: "20", month: "July", title: "100 random acts of kindness" },
              { id: "2", date: "20", month: "July", title: "Faith is a process, not a destination" },
              { id: "3", date: "20", month: "July", title: "There is nothing impossible" },
              { id: "4", date: "20", month: "July", title: "Celebrating freedom and life" },
            ].map((sermon, index) => (
              <div key={index} className="bg-cream-dark p-6 rounded-lg">
                <p className="text-primary uppercase text-sm mb-4">Upcoming event</p>
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{sermon.date}</div>
                    <div className="text-sm uppercase">{sermon.month}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-semibold mb-4">
                      {sermon.title}
                    </h3>
                    <p className="text-sm text-dark/70 mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-dark/70">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>Friday 23:39 IST<br/>Saturday 11/20 ISO</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>No 233 Main St. New York,<br/>United States</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href={`/sermons/${sermon.id}`} className="text-dark font-semibold hover:text-primary transition-colors text-sm">
                    View details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/sermons" className="btn-primary">
              View all sermons
            </Link>
          </div>
        </div>
      </section>

      {/* Join and Become Part Section */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-dark/60 uppercase tracking-wide mb-4">Sub-headline</p>
              <h2 className="text-4xl md:text-5xl font-heading mb-8">
                We want to serve the world around us
              </h2>
              <p className="text-dark/70 mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <Link href="/about" className="btn-primary">
                Visit
              </Link>
            </div>
            <div className="relative h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?q=80')] bg-cover bg-center"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <p className="text-dark/60 uppercase tracking-wide mb-4 text-center">Read our blog</p>
          <h2 className="text-4xl md:text-5xl font-heading text-center mb-16">
            Share, inspire, innovate
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { slug: "the-best-way-to-inspire-people", title: "The best way to inspire people", category: "Relationship" },
              { slug: "how-to-show-compassion", title: "How to show compassion", category: "Relationship" },
              { slug: "what-it-means-to-believe", title: "What it means to believe", category: "Faith" },
              { slug: "the-biblical-purpose-of-money", title: "The biblical purpose of money", category: "Relationship" },
            ].map((post, i) => (
              <Link
                key={i}
                href={`/blog/${post.slug}`}
                className="bg-cream-dark rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <p className="text-primary uppercase text-sm mb-3">{post.category}</p>
                  <h3 className="text-xl font-heading font-semibold mb-4">
                    {post.title}
                  </h3>
                  <p className="text-sm text-dark/70 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                  </p>
                  <div className="flex items-center text-sm text-dark/60">
                    <span>By Mathew Johnson</span>
                    <span className="mx-2">•</span>
                    <span>Tuesday 13 May, 2018</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog" className="btn-primary">
              View all posts
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
