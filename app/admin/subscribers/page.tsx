"use client";

import { useEffect, useState } from "react";
import { Trash2, Mail } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type Subscriber = {
  id: string;
  email: string;
  source: string | null;
  createdAt: string;
};

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch("/api/subscribers");
      const data = await response.json();

      if (response.ok) {
        setSubscribers(data);
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this subscriber?")) return;

    try {
      const response = await fetch(`/api/subscribers/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSubscribers((current) => current.filter((subscriber) => subscriber.id !== id));
      }
    } catch (error) {
      console.error("Error deleting subscriber:", error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark">Subscribers</h1>
          <p className="text-dark/60 mt-2">People who subscribed to updates and news.</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm px-5 py-4 text-right">
          <p className="text-sm text-dark/60">Total subscribers</p>
          <p className="text-2xl font-bold text-dark">{subscribers.length}</p>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscribed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-dark/60">
                    No subscribers yet.
                  </td>
                </tr>
              ) : (
                subscribers.map((subscriber) => (
                  <tr key={subscriber.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                          <Mail size={18} />
                        </div>
                        <span className="font-medium text-dark">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{subscriber.source || "website"}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {formatDistanceToNow(new Date(subscriber.createdAt), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(subscriber.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
