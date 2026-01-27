"use client";

import { useState, useEffect } from "react";
import { Trash2, Upload, Image as ImageIcon } from "lucide-react";
import { upload } from "@vercel/blob/client";

type Media = {
  id: string;
  url: string;
  mimetype: string;
  filename: string;
  size: number;
  createdAt: string;
};

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      setMedia(data);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const newBlob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });

      // Save to database
      await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: newBlob.url,
          type: file.type,
          fileName: file.name,
          fileSize: file.size,
        }),
      });

      fetchMedia();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media?")) return;

    try {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
      if (res.ok) fetchMedia();
    } catch (error) {
      console.error("Error deleting media:", error);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Media Library</h1>
        <label className="btn-primary flex items-center gap-2 cursor-pointer">
          <Upload size={20} />
          Upload File
          <input
            type="file"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
            accept="image/*,video/*,audio/*"
          />
        </label>
      </div>

      {uploading && (
        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <p className="text-blue-800">Uploading file...</p>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : media.length === 0 ? (
        <div className="text-center py-12">
          <ImageIcon size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No media files yet. Upload your first file!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {media.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {item.mimetype.startsWith("image/") ? (
                <div
                  className="h-48 bg-cover bg-center cursor-pointer"
                  style={{ backgroundImage: `url(${item.url})` }}
                  onClick={() => copyToClipboard(item.url)}
                />
              ) : (
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <ImageIcon size={48} className="text-gray-400" />
                </div>
              )}
              <div className="p-4">
                <p className="text-sm font-medium truncate mb-1">{item.filename}</p>
                <p className="text-xs text-gray-500 mb-3">{formatFileSize(item.size)}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(item.url)}
                    className="flex-1 text-xs bg-blue-50 text-blue-600 px-3 py-2 rounded hover:bg-blue-100"
                  >
                    Copy URL
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800 px-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
