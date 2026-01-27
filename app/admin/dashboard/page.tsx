"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { FileText, Users, Image, Eye, PlusCircle } from "lucide-react";

export default function AdminDashboard() {
  const { data: session } = useSession();

  const stats = [
    { label: "Total Posts", value: "24", icon: FileText, color: "bg-blue-500" },
    { label: "Published", value: "18", icon: Eye, color: "bg-green-500" },
    { label: "Users", value: "5", icon: Users, color: "bg-purple-500" },
    { label: "Media Files", value: "142", icon: Image, color: "bg-orange-500" },
  ];

  const recentPosts = [
    { id: 1, title: "How to show compassion", status: "Published", date: "2 days ago" },
    { id: 2, title: "Faith is a process", status: "Draft", date: "3 days ago" },
    { id: 3, title: "Celebrating freedom", status: "Published", date: "1 week ago" },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-dark mb-2">
          Welcome back, {session?.user?.name}!
        </h1>
        <p className="text-dark/60">Here's what's happening with your church website</p>
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
          href="/admin/media"
          className="btn-outline inline-flex items-center gap-2"
        >
          <Image size={20} />
          Upload Media
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
                  <Icon size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-1">{stat.value}</h3>
              <p className="text-dark/60 text-sm">{stat.label}</p>
            </div>
          );
        })}
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
          {recentPosts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-cream transition-colors">
              <div className="flex-1">
                <h3 className="font-semibold text-dark mb-1">{post.title}</h3>
                <p className="text-sm text-dark/60">{post.date}</p>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  post.status === "Published" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {post.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Feed (Optional) */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-heading font-bold text-dark mb-6">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
            <div className="flex-1">
              <p className="text-dark"><span className="font-semibold">John Doe</span> published a new post</p>
              <p className="text-sm text-dark/60">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
            <div className="flex-1">
              <p className="text-dark"><span className="font-semibold">Jane Smith</span> uploaded 5 images</p>
              <p className="text-sm text-dark/60">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
            <div className="flex-1">
              <p className="text-dark"><span className="font-semibold">Admin</span> created a new category</p>
              <p className="text-sm text-dark/60">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
