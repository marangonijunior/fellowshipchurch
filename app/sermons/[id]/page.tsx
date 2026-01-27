"use client";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Calendar, MapPin, Clock } from "lucide-react";
import { addToCalendar } from "@/lib/calendar";

// Mock data - will be replaced with database query
const event = {
  id: "1",
  title: "100 Random Acts of Kindness",
  date: new Date("2026-02-20"),
  time: "Friday 23:39 IST / Saturday 11/20 ISO",
  location: "No 233 Main St. New York, United States",
  description: "Join us for a special event focused on spreading kindness throughout our community. This inspiring gathering will equip you with practical ways to make a difference in the lives of those around you.",
  preacher: "Pastor John Doe",
  image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80",
};

export default function SermonDetailPage({ params }: { params: { id: string } }) {
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
          <p className="text-primary uppercase tracking-wide mb-4">Upcoming event</p>
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
              <h2 className="text-3xl font-heading font-bold mb-6">About this event</h2>
              <div className="prose prose-lg max-w-none text-dark/70 space-y-4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                
                <h3 className="text-2xl font-heading font-bold mt-8 mb-4 text-dark">What to expect</h3>
                <ul className="space-y-2">
                  <li>Inspiring message from {event.preacher}</li>
                  <li>Worship and praise session</li>
                  <li>Fellowship and refreshments</li>
                  <li>Q&A and prayer time</li>
                </ul>

                <h3 className="text-2xl font-heading font-bold mt-8 mb-4 text-dark">Who should attend</h3>
                <p>
                  This event is open to everyone! Whether you're a long-time member or visiting for the first time, you're welcome to join us. Bring your family and friends for an evening of inspiration and community.
                </p>
              </div>

              {/* Speaker Info */}
              <div className="mt-12 p-6 bg-cream rounded-lg">
                <h3 className="text-xl font-heading font-bold mb-4">Speaker</h3>
                <div className="flex items-start gap-4">
                  <div
                    className="w-20 h-20 rounded-full bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: "url(https://i.pravatar.cc/150?img=12)" }}
                  ></div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{event.preacher}</h4>
                    <p className="text-sm text-dark/60 mb-2">Lead Pastor</p>
                    <p className="text-sm text-dark/70">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. With over 20 years of ministry experience, Pastor John brings wisdom and passion to every message.
                    </p>
                  </div>
                </div>
              </div>
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

                <div className="mt-6 p-4 bg-primary/10 rounded-md">
                  <p className="text-xs text-dark/70">
                    <strong>Note:</strong> Registration is free but required for planning purposes. Walk-ins are welcome if space permits.
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
