"use client";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Calendar, MapPin, Clock } from "lucide-react";
import { addToCalendar } from "@/lib/calendar";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

type Event = {
  id: string;
  title: string;
  type: string | null;
  date: Date;
  time: string | null;
  location: string;
  description: string;
  content: string | null;
  media?: { url: string }[];
};

async function getEvent(id: string) {
  try {
    const res = await fetch(`/api/events/${id}`);
    if (!res.ok) return null;
    const data = await res.json();
    return { ...data, date: new Date(data.date) };
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [eventId, setEventId] = useState<string>("");

  useEffect(() => {
    params.then(({ id }) => {
      setEventId(id);
      return getEvent(id);
    }).then((data) => {
      setEvent(data);
      setLoading(false);
    });
  }, [params]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!event) {
    notFound();
  }

  const eventDate = new Date(event.date);
  const eventTime = event.time || "Time TBD";
  const eventImage = event.media?.[0]?.url || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80";

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-dark/80 to-dark/60">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${eventImage})` }}
        ></div>
        <div className="relative container-custom h-full flex flex-col justify-center text-white">
          <span className="inline-block px-4 py-2 bg-primary text-dark text-sm font-semibold rounded-full mb-4 w-fit">
            {event.type || "Event"}
          </span>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            {event.title}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            {event.description}
          </p>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {event.content && (
                <div
                  className="prose prose-lg max-w-none text-dark/70"
                  dangerouslySetInnerHTML={{ __html: event.content }}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-cream rounded-lg p-8 sticky top-8">
                <div className="mb-8">
                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold text-dark">
                      {eventDate.getDate()}
                    </div>
                    <div className="text-lg uppercase text-dark/60">
                      {eventDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-dark/70">
                    <div className="flex items-start gap-3 pb-4 border-b border-gray-300">
                      <Clock size={20} className="flex-shrink-0 mt-0.5 text-primary" />
                      <div>
                        <p className="font-semibold text-dark mb-1">Time</p>
                        <p>{eventTime}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pb-4">
                      <MapPin size={20} className="flex-shrink-0 mt-0.5 text-primary" />
                      <div>
                        <p className="font-semibold text-dark mb-1">Location</p>
                        <p>{event.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => addToCalendar({
                    title: event.title,
                    description: event.description,
                    location: event.location,
                    startDate: eventDate,
                  })}
                  className="btn-primary w-full"
                >
                  Add to calendar
                </button>

                <div className="mt-6 p-4 bg-white rounded-md border border-gray-200">
                  <p className="text-xs text-dark/70 mb-2">
                    <strong>Questions?</strong>
                  </p>
                  <p className="text-xs text-dark/60">
                    Contact us at events@fellowshipchurch.com or call (480) 555-0103
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
