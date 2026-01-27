"use client";

import Link from "next/link";
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react";

export default function AdminPostsPage() {
  // Mock data - will be replaced with real data from database
  const posts = [
    {
      id: "1",
      title: "How to show compassion",
      status: "Published",
      type: "Blog",
      author: "John Doe",
      publishedAt: "2024-01-20",
      views: 245,
    },
    {
      id: "2",
      title: "Faith is a process, not a destination",
      status: "Draft",
      type: "News",
      author: "Jane Smith",
      publishedAt: null,
      views: 0,
    },
    {
      id: "3",
      title: "Celebrating freedom and life",
      status: "Published",
      type: "Blog",
      author: "John Doe",
      publishedAt: "2024-01-15",
      views: 892,
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-dark mb-2">Posts</h1>
          <p className="text-dark/60">Manage your blog posts and news articles</p>
        </div>
        <Link href="/admin/posts/new" className="btn-primary inline-flex items-center gap-2">
          <PlusCircle size={20} />
          New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex flex-wrap gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Pending</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            <option>All Types</option>
            <option>Blog</option>
            <option>News</option>
            <option>Announcement</option>
          </select>
          <input
            type="search"
            placeholder="Search posts..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-cream-dark">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Author</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Published</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Views</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-dark">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-cream/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-semibold text-dark">{post.title}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    post.status === "Published" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-dark/70">{post.type}</td>
                <td className="px-6 py-4 text-dark/70">{post.author}</td>
                <td className="px-6 py-4 text-dark/70">
                  {post.publishedAt || "—"}
                </td>
                <td className="px-6 py-4 text-dark/70">{post.views}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-cream rounded-md transition-colors text-dark/70 hover:text-dark">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 hover:bg-cream rounded-md transition-colors text-dark/70 hover:text-dark">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 hover:bg-cream rounded-md transition-colors text-red-600 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-dark/60">Showing 1 to 3 of 3 posts</p>
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
    </div>
  );
}
