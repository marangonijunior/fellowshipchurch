"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Clock, Upload } from "lucide-react";
import ImageUpload from "@/components/shared/ImageUpload";

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    date: "",
    time: "",
    location: "",
    description: "",
    content: "",
    status: "DRAFT" as "DRAFT" | "PUBLISHED",
  });
  const [featuredImage, setFeaturedImage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date).toISOString(),
          media: featuredImage ? [{ url: featuredImage, type: "image" }] : [],
        }),
      });

      if (response.ok) {
        router.push("/admin/events");
      } else {
        alert("Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Create New Event</h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <label className="block text-sm font-medium mb-2">Event Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Sunday Worship Service"
              required
            />
          </div>

          {/* Event Details */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold mb-4">Event Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Calendar size={16} className="inline mr-2" />
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <Clock size={16} className="inline mr-2" />
                  Time
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Event Type</label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Weekly, Special, Conference, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <MapPin size={16} className="inline mr-2" />
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Main Sanctuary, 123 Church St, City"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <label className="block text-sm font-medium mb-2">Short Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
              placeholder="A brief description that will appear in event listings"
              required
            />
          </div>

          {/* Content */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <label className="block text-sm font-medium mb-2">Full Content (HTML supported)</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
              rows={10}
              placeholder="<h2>About This Event</h2><p>Detailed information...</p>"
            />
            <p className="text-xs text-gray-500 mt-2">
              You can use HTML tags for formatting. This will be displayed on the event detail page.
            </p>
          </div>

          {/* Featured Image */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <label className="block text-sm font-medium mb-2">
              <Upload size={16} className="inline mr-2" />
              Featured Image
            </label>
            <ImageUpload
              currentImage={featuredImage}
              onUploadComplete={setFeaturedImage}
              onRemove={() => setFeaturedImage("")}
              label="Upload Event Image"
            />
          </div>

          {/* Status */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as "DRAFT" | "PUBLISHED" })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1"
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
