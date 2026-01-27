import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { Calendar, MapPin, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

// This will be replaced with real database queries
const upcomingSermons = [
  {
    id: "1",
    title: "100 Random Acts of Kindness",
    date: new Date("2026-02-20"),
    time: "Friday 23:39 IST / Saturday 11/20 ISO",
    location: "No 233 Main St. New York, United States",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    preacher: "Pastor John Doe",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80",
  },
  {
    id: "2",
    title: "Faith is a Process, Not a Destination",
    date: new Date("2026-02-27"),
    time: "Friday 23:39 IST / Saturday 11/20 ISO",
    location: "No 233 Main St. New York, United States",
    description: "We both celebrate and challenge the culture around us as we orient our lives around Jesus. We want to serve the world around us.",
    preacher: "Pastor Jane Smith",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80",
  },
  {
    id: "3",
    title: "There is Nothing Impossible",
    date: new Date("2026-03-06"),
    time: "Friday 23:39 IST / Saturday 11/20 ISO",
    location: "No 233 Main St. New York, United States",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    preacher: "Pastor Mike Johnson",
    image: "https://images.unsplash.com/photo-1505409859467-3a796fd5798e?q=80",
  },
  {
    id: "4",
    title: "Celebrating Freedom and Life",
    date: new Date("2026-03-13"),
    time: "Friday 23:39 IST / Saturday 11/20 ISO",
    location: "No 233 Main St. New York, United States",
    description: "We both celebrate and challenge the culture around us as we orient our lives around Jesus.",
    preacher: "Pastor Sarah Williams",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80",
  },
];

export default function SermonsPage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-dark/80 to-dark/60">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80')] bg-cover bg-center opacity-30"></div>
        <div className="relative container-custom h-full flex flex-col justify-center text-white">
          <p className="text-primary uppercase tracking-wide mb-4">Sermons</p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold">
            Upcoming sermons
          </h1>
        </div>
      </section>

      {/* Upcoming Sermons */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-dark/60 uppercase tracking-wide mb-4">Join us</p>
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              Upcoming events
            </h2>
            <p className="text-dark/70 max-w-3xl">
              Join us for inspiring messages that will strengthen your faith and help you grow in your relationship with God.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingSermons.map((sermon) => (
              <div key={sermon.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div
                  className="h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${sermon.image})` }}
                ></div>
                <div className="p-8">
                  <div className="flex items-start gap-6 mb-4">
                    <div className="text-center flex-shrink-0">
                      <div className="text-5xl font-bold text-dark">
                        {sermon.date.getDate()}
                      </div>
                      <div className="text-sm uppercase text-dark/60">
                        {sermon.date.toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-primary uppercase text-sm mb-2">Upcoming event</p>
                      <h3 className="text-2xl font-heading font-bold mb-4">
                        {sermon.title}
                      </h3>
                      <p className="text-dark/70 mb-4">{sermon.description}</p>
                      <p className="text-sm font-semibold text-dark mb-2">
                        By {sermon.preacher}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-3 text-sm text-dark/70">
                    <div className="flex items-start gap-3">
                      <Clock size={18} className="flex-shrink-0 mt-0.5" />
                      <span>{sermon.time}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                      <span>{sermon.location}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={`/sermons/${sermon.id}`}
                      className="btn-primary w-full text-center"
                    >
                      See details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
