"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Eye, PlusCircle, Loader2, Mail } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Stats {
  totalPosts: number;
  publishedPosts: number;
  totalEvents: number;
  totalSermons: number;
  totalSubscribers: number;
}

interface RecentPost {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    publishedPosts: 0,
    totalEvents: 0,
    totalSermons: 0,
    totalSubscribers: 0,
  });
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch all posts
        const postsRes = await fetch("/api/posts");
        const postsData = await postsRes.json();
        const posts = postsData.posts || [];

        // Fetch events
        const eventsRes = await fetch("/api/events");
        const eventsData = await eventsRes.json();
        const events = eventsData.events || [];

        // Fetch sermons
        const sermonsRes = await fetch("/api/sermons");
        const sermonsData = await sermonsRes.json();
        const sermons = sermonsData.sermons || [];

        const subscribersRes = await fetch("/api/subscribers");
        const subscribersData = await subscribersRes.json();
        const subscribers = Array.isArray(subscribersData) ? subscribersData : [];

        // Calculate stats
        setStats({
          totalPosts: posts.length,
          publishedPosts: posts.filter((p: any) => p.status === "PUBLISHED").length,
          totalEvents: events.length,
          totalSermons: sermons.length,
          totalSubscribers: subscribers.length,
        });

        // Get recent posts (last 5)
        setRecentPosts(
          posts
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5)
        );
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-dark mb-2">
          Welcome back, {session?.user?.name}!
        </h1>
        <p className="text-dark/60">Here&apos;s what&apos;s happening with your church website</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 flex gap-4">
        <Link
          href="/admin/posts/new"
          className="btn-primary inline-flex items-center gap-2"
        >
          <PlusCircle size={20} />
          Create New Post
        </Link>
        <Link
          href="/admin/events"
          className="btn-outline inline-flex items-center gap-2"
        >
          <FileText size={20} />
          Manage Events
        </Link>
        <Link
          href="/admin/subscribers"
          className="btn-outline inline-flex items-center gap-2"
        >
          <Mail size={20} />
          View Subscribers
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center text-white">
                  <FileText size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-1">{stats.totalPosts}</h3>
              <p className="text-dark/60 text-sm">Total Posts</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center text-white">
                  <Eye size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-1">{stats.publishedPosts}</h3>
              <p className="text-dark/60 text-sm">Published Posts</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center text-white">
                  <FileText size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-1">{stats.totalEvents}</h3>
              <p className="text-dark/60 text-sm">Total Events</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-500 w-12 h-12 rounded-lg flex items-center justify-center text-white">
                  <FileText size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-1">{stats.totalSermons}</h3>
              <p className="text-dark/60 text-sm">Total Sermons</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-rose-500 w-12 h-12 rounded-lg flex items-center justify-center text-white">
                  <Mail size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-1">{stats.totalSubscribers}</h3>
              <p className="text-dark/60 text-sm">Subscribers</p>
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-dark">Recent Posts</h2>
              <Link href="/admin/posts" className="text-primary hover:text-primary-dark text-sm font-semibold">
                View all →
              </Link>
            </div>
            <div className="space-y-4">
              {recentPosts.length === 0 ? (
                <p className="text-dark/60 text-center py-8">No posts yet. Create your first post!</p>
              ) : (
                recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-cream transition-colors">
                    <div className="flex-1">
                      <h3 className="font-semibold text-dark mb-1">{post.title}</h3>
                      <p className="text-sm text-dark/60">
                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        post.status === "PUBLISHED" 
                          ? "bg-green-100 text-green-700" 
                          : post.status === "DRAFT"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {post.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
