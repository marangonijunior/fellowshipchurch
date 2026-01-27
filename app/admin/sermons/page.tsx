"use client";

import Link from "next/link";
import { PlusCircle, Edit, Trash2, Eye, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: string;
  location: string;
  status: string;
}

export default function AdminSermonsPage() {
  const { data: session } = useSession();
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      const response = await fetch("/api/sermons");
      const data = await response.json();
      setSermons(data.sermons || []);
    } catch (error) {
      console.error("Error fetching sermons:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this sermon?")) return;

    try {
      const response = await fetch(`/api/sermons/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSermons(sermons.filter(sermon => sermon.id !== id));
      } else {
        alert("Failed to delete sermon");
      }
    } catch (error) {
      console.error("Error deleting sermon:", error);
      alert("Error deleting sermon");
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading sermons...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-dark mb-2">Sermons</h1>
          <p className="text-dark/60">Manage your sermons and messages</p>
        </div>
        <Link href="/admin/sermons/new" className="btn-primary inline-flex items-center gap-2">
          <PlusCircle size={20} />
          New Sermon
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
          <input
            type="search"
            placeholder="Search sermons..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Sermons Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-cream-dark">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Preacher</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Status</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-dark">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sermons.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-dark/60">
                  No sermons found. Create your first sermon!
                </td>
              </tr>
            ) : (
              sermons.map((sermon) => (
                <tr key={sermon.id} className="hover:bg-cream/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-dark">{sermon.title}</p>
                  </td>
                  <td className="px-6 py-4 text-dark/70">{sermon.preacher}</td>
                  <td className="px-6 py-4 text-dark/70">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {new Date(sermon.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-dark/70 text-sm">{sermon.location}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      sermon.status === "PUBLISHED" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {sermon.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/sermons/${sermon.id}`}
                        className="p-2 hover:bg-cream rounded-md transition-colors text-dark/70 hover:text-dark"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        href={`/admin/sermons/${sermon.id}/edit`}
                        className="p-2 hover:bg-cream rounded-md transition-colors text-dark/70 hover:text-dark"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(sermon.id)}
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
      {sermons.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-dark/60">Showing {sermons.length} sermons</p>
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
