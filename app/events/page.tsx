import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { Calendar, MapPin, Clock } from "lucide-react";
import db from "@/lib/db";

async function getEvents() {
  try {
    const events = await db.event.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { date: "asc" },
    });
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  const upcomingEvents = events.filter((event: any) => new Date(event.date) >= new Date());
  const pastEvents = events.filter((event: any) => new Date(event.date) < new Date());
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
              <h2 className="text-3xl font-heading font-bold">Don&apos;t miss this</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {featuredEvent.image ? (
                <div
                  className="h-96 rounded-2xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${featuredEvent.image})` }}
                ></div>
              ) : (
                <div className="h-96 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-8xl">📅</span>
                </div>
              )}
              <div>
                <span className="inline-block px-3 py-1 bg-primary text-dark text-sm font-semibold rounded-full mb-4">
                  {featuredEvent.type || "Event"}
                </span>
                <h3 className="text-4xl font-heading font-bold mb-4">
                  {featuredEvent.title}
                </h3>
                <p className="text-dark/70 mb-6">{featuredEvent.description}</p>
                
                <div className="space-y-3 text-sm text-dark/70 mb-8">
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-primary" />
                    <span className="font-semibold">
                      {new Date(featuredEvent.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  {featuredEvent.time && (
                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-primary" />
                      <span>{featuredEvent.time}</span>
                    </div>
                  )}
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

          {otherEvents.length === 0 ? (
            <p className="text-center text-dark/60 py-12">No upcoming events at the moment. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherEvents.map((event: any) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {event.image ? (
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${event.image})` }}
                    ></div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-6xl">📅</span>
                    </div>
                  )}
                  <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-primary/20 text-dark text-xs font-semibold rounded-full mb-3">
                    {event.type || "Event"}
                  </span>
                  <h3 className="text-xl font-heading font-bold mb-3">
                    {event.title}
                  </h3>
                  <p className="text-sm text-dark/70 mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2 text-xs text-dark/60 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>{event.time}</span>
                      </div>
                    )}
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
          )}
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
