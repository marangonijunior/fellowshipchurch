"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  status: string;
  type: string;
  author: {
    name: string;
  };
  publishedAt: string | null;
  viewCount: number;
  createdAt: string;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: "", type: "", search: "" });

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  }

  const filteredPosts = posts.filter((post) => {
    if (filter.status && post.status !== filter.status) return false;
    if (filter.type && post.type !== filter.type) return false;
    if (filter.search && !post.title.toLowerCase().includes(filter.search.toLowerCase())) return false;
    return true;
  });

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
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="PENDING">Pending</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="BLOG">Blog</option>
            <option value="NEWS">News</option>
            <option value="ANNOUNCEMENT">Announcement</option>
          </select>
          <input
            type="search"
            placeholder="Search posts..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
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
                {filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-dark/60">
                      No posts found. Create your first post!
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-cream/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-dark">{post.title}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            post.status === "PUBLISHED"
                              ? "bg-green-100 text-green-700"
                              : post.status === "DRAFT"
                              ? "bg-yellow-100 text-yellow-700"
                              : post.status === "PENDING"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-dark/70">{post.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-dark/70">{post.author.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-dark/70">
                          {post.publishedAt ? formatDate(post.publishedAt) : "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-dark/70">
                          <Eye size={16} />
                          <span>{post.viewCount}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/posts/${post.id}/edit`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
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

          {/* Summary */}
          <div className="mt-4 text-sm text-dark/60">
            Showing {filteredPosts.length} of {posts.length} posts
          </div>
        </>
      )}
    </div>
  );
}
