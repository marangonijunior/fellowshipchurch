"use client";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Calendar, MapPin, Clock } from "lucide-react";
import { addToCalendar } from "@/lib/calendar";

// Mock data - will be replaced with database query
const event = {
  id: "1",
  title: "Sunday Worship Service",
  type: "Weekly",
  date: new Date("2026-02-02"),
  time: "10:00 AM - 12:00 PM",
  location: "Main Sanctuary, 4517 Washington Ave., Manchester, Kentucky",
  description: "Join us for our weekly worship service featuring inspiring messages, uplifting music, and fellowship with our church community.",
  image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80",
  details: `
    <h2>About This Event</h2>
    <p>Our Sunday Worship Service is the heart of our church community. Every Sunday, we gather together to worship God, hear His Word preached, and fellowship with one another.</p>
    
    <h3>What to Expect</h3>
    <ul>
      <li>Welcome and announcements (10:00 AM)</li>
      <li>Contemporary worship music (10:15 AM)</li>
      <li>Children's ministry available for ages 0-12</li>
      <li>Inspiring message from our pastoral team (11:00 AM)</li>
      <li>Prayer and response time (11:45 AM)</li>
      <li>Fellowship coffee after service</li>
    </ul>

    <h3>What to Bring</h3>
    <ul>
      <li>Your Bible (or use our church app)</li>
      <li>An open heart ready to worship</li>
      <li>Friends and family who might benefit from community</li>
    </ul>

    <h3>Dress Code</h3>
    <p>Come as you are! We welcome casual to business casual attire. The most important thing is that you're comfortable.</p>

    <h3>Accessibility</h3>
    <p>Our facility is fully wheelchair accessible with designated parking spaces near the entrance. ASL interpretation is available upon request with 48 hours notice.</p>
  `,
};

export default function EventDetailPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-dark/80 to-dark/60">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${event.image})` }}
        ></div>
        <div className="relative container-custom h-full flex flex-col justify-center text-white">
          <span className="inline-block px-4 py-2 bg-primary text-dark text-sm font-semibold rounded-full mb-4 w-fit">
            {event.type}
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
              <div
                className="prose prose-lg max-w-none text-dark/70"
                dangerouslySetInnerHTML={{ __html: event.details }}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-cream rounded-lg p-8 sticky top-8">
                <div className="mb-8">
                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold text-dark">
                      {event.date.getDate()}
                    </div>
                    <div className="text-lg uppercase text-dark/60">
                      {event.date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-dark/70">
                    <div className="flex items-start gap-3 pb-4 border-b border-gray-300">
                      <Clock size={20} className="flex-shrink-0 mt-0.5 text-primary" />
                      <div>
                        <p className="font-semibold text-dark mb-1">Time</p>
                        <p>{event.time}</p>
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
                    startDate: event.date,
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
