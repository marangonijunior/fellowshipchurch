import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { Calendar, MapPin, Clock } from "lucide-react";

// Mock data - will be replaced with database queries
const events = [
  {
    id: "1",
    title: "Sunday Worship Service",
    type: "Weekly",
    date: new Date("2026-02-02"),
    time: "10:00 AM - 12:00 PM",
    location: "Main Sanctuary",
    description: "Join us for our weekly worship service featuring inspiring messages, uplifting music, and fellowship.",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80",
    capacity: 500,
    registered: 324,
  },
  {
    id: "2",
    title: "Youth Night",
    type: "Monthly",
    date: new Date("2026-02-15"),
    time: "7:00 PM - 9:00 PM",
    location: "Youth Center",
    description: "A special evening for teenagers featuring games, worship, and relevant messages about faith.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80",
    capacity: 150,
    registered: 89,
  },
  {
    id: "3",
    title: "Community Outreach",
    type: "Special Event",
    date: new Date("2026-02-20"),
    time: "9:00 AM - 3:00 PM",
    location: "City Center",
    description: "Join us as we serve our community through various outreach activities and service projects.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80",
    capacity: 100,
    registered: 67,
  },
  {
    id: "4",
    title: "Prayer Meeting",
    type: "Weekly",
    date: new Date("2026-02-05"),
    time: "6:00 PM - 7:30 PM",
    location: "Prayer Room",
    description: "Come together for a time of corporate prayer, intercession, and seeking God's presence.",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80",
    capacity: 80,
    registered: 52,
  },
  {
    id: "5",
    title: "Women's Conference",
    type: "Special Event",
    date: new Date("2026-03-08"),
    time: "9:00 AM - 4:00 PM",
    location: "Conference Hall",
    description: "A day dedicated to empowering, encouraging, and equipping women in their faith journey.",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80",
    capacity: 200,
    registered: 178,
  },
  {
    id: "6",
    title: "Men's Breakfast",
    type: "Monthly",
    date: new Date("2026-02-10"),
    time: "8:00 AM - 10:00 AM",
    location: "Fellowship Hall",
    description: "Men of all ages gather for breakfast, fellowship, and discussion on relevant topics.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80",
    capacity: 120,
    registered: 95,
  },
];

export default function EventsPage() {
  const upcomingEvents = events.filter(event => event.date >= new Date());
  const featuredEvent = upcomingEvents[0];
  const otherEvents = upcomingEvents.slice(1);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-dark/80 to-dark/60">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80')] bg-cover bg-center opacity-30"></div>
        <div className="relative container-custom h-full flex flex-col justify-center text-white">
          <p className="text-primary uppercase tracking-wide mb-4">Events</p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold">
            Join us for upcoming events
          </h1>
        </div>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="mb-8">
              <p className="text-primary uppercase text-sm mb-2">Featured event</p>
              <h2 className="text-3xl font-heading font-bold">Don't miss this</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div
                className="h-96 rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url(${featuredEvent.image})` }}
              ></div>
              <div>
                <span className="inline-block px-3 py-1 bg-primary text-dark text-sm font-semibold rounded-full mb-4">
                  {featuredEvent.type}
                </span>
                <h3 className="text-4xl font-heading font-bold mb-4">
                  {featuredEvent.title}
                </h3>
                <p className="text-dark/70 mb-6">{featuredEvent.description}</p>
                
                <div className="space-y-3 text-sm text-dark/70 mb-8">
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-primary" />
                    <span className="font-semibold">
                      {featuredEvent.date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-primary" />
                    <span>{featuredEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-primary" />
                    <span>{featuredEvent.location}</span>
                  </div>
                </div>

                <Link href={`/events/${featuredEvent.id}`} className="btn-primary">
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Events */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">All upcoming events</h2>
            <p className="text-dark/70">
              Browse all our upcoming events and mark your calendar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.image})` }}
                ></div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-primary/20 text-dark text-xs font-semibold rounded-full mb-3">
                    {event.type}
                  </span>
                  <h3 className="text-xl font-heading font-bold mb-3">
                    {event.title}
                  </h3>
                  <p className="text-sm text-dark/70 mb-4">{event.description}</p>
                  
                  <div className="space-y-2 text-xs text-dark/60 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <span className="text-primary font-semibold text-xs">View details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-heading font-bold mb-4">
            Want to stay updated?
          </h2>
          <p className="text-dark/70 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive updates about upcoming events, sermons, and church news.
          </p>
          <form className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
