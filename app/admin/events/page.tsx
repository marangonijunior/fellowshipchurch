"use client";

import Link from "next/link";
import { PlusCircle, Edit, Trash2, Eye, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  status: string;
}

export default function AdminEventsPage() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEvents(events.filter(event => event.id !== id));
      } else {
        alert("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Error deleting event");
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-dark mb-2">Events</h1>
          <p className="text-dark/60">Manage your church events and activities</p>
        </div>
        <Link href="/admin/events/new" className="btn-primary inline-flex items-center gap-2">
          <PlusCircle size={20} />
          New Event
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex flex-wrap gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            <option>All Types</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Special Event</option>
          </select>
          <input
            type="search"
            placeholder="Search events..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-cream-dark">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Status</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-dark">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-dark/60">
                  No events found. Create your first event!
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id} className="hover:bg-cream/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-dark">{event.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
                      {event.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-dark/70">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-dark/70 text-sm">{event.location}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      event.status === "PUBLISHED" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/events/${event.id}`}
                        className="p-2 hover:bg-cream rounded-md transition-colors text-dark/70 hover:text-dark"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        href={`/admin/events/${event.id}/edit`}
                        className="p-2 hover:bg-cream rounded-md transition-colors text-dark/70 hover:text-dark"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="p-2 hover:bg-cream rounded-md transition-colors text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {events.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-dark/60">Showing {events.length} events</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-dark/70 hover:bg-cream transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-primary text-dark rounded-md font-semibold">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-dark/70 hover:bg-cream transition-colors">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
