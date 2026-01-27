"use client";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Calendar, Clock, User } from "lucide-react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

type Sermon = {
  id: string;
  title: string;
  date: Date;
  preacher: string;
  description: string;
  content: string | null;
  videoUrl: string | null;
  audioUrl: string | null;
  media?: { url: string }[];
};

async function getSermon(id: string) {
  try {
    const res = await fetch(`/api/sermons/${id}`);
    if (!res.ok) return null;
    const data = await res.json();
    return { ...data, date: new Date(data.date) };
  } catch (error) {
    console.error("Error fetching sermon:", error);
    return null;
  }
}

export default function SermonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [sermon, setSermon] = useState<Sermon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(({ id }) => {
      return getSermon(id);
    }).then((data) => {
      setSermon(data);
      setLoading(false);
    });
  }, [params]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!sermon) {
    notFound();
  }

  const sermonDate = new Date(sermon.date);
  const sermonImage = sermon.media?.[0]?.url || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80";

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-dark/80 to-dark/60">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${sermonImage})` }}
        ></div>
        <div className="relative container-custom h-full flex flex-col justify-center text-white">
          <p className="text-primary uppercase tracking-wide mb-4">Sermon</p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            {sermon.title}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            {sermon.description}
          </p>
        </div>
      </section>

      {/* Sermon Details */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Video */}
              {sermon.videoUrl && (
                <div className="mb-8">
                  <div className="aspect-video">
                    <iframe
                      src={sermon.videoUrl}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Audio */}
              {sermon.audioUrl && !sermon.videoUrl && (
                <div className="mb-8">
                  <audio controls className="w-full">
                    <source src={sermon.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              <h2 className="text-3xl font-heading font-bold mb-6">About this sermon</h2>
              {sermon.content ? (
                <div
                  className="prose prose-lg max-w-none text-dark/70"
                  dangerouslySetInnerHTML={{ __html: sermon.content }}
                />
              ) : (
                <p className="text-dark/70">{sermon.description}</p>
              )}

              {/* Speaker Info */}
              <div className="mt-12 p-6 bg-cream rounded-lg">
                <h3 className="text-xl font-heading font-bold mb-4">Preacher</h3>
                <div className="flex items-start gap-4">
                  <div
                    className="w-20 h-20 rounded-full bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: "url(https://i.pravatar.cc/150?img=12)" }}
                  ></div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{sermon.preacher}</h4>
                    <p className="text-sm text-dark/60">Fellowship Church</p>
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
                      {sermonDate.getDate()}
                    </div>
                    <div className="text-lg uppercase text-dark/60">
                      {sermonDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-dark/70">
                    <div className="flex items-start gap-3 pb-4 border-b border-gray-300">
                      <User size={20} className="flex-shrink-0 mt-0.5 text-primary" />
                      <div>
                        <p className="font-semibold text-dark mb-1">Preacher</p>
                        <p>{sermon.preacher}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pb-4">
                      <Calendar size={20} className="flex-shrink-0 mt-0.5 text-primary" />
                      <div>
                        <p className="font-semibold text-dark mb-1">Date</p>
                        <p>{sermonDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {sermon.audioUrl && (
                  <a
                    href={sermon.audioUrl}
                    download
                    className="btn-primary w-full block text-center mb-4"
                  >
                    Download Audio
                  </a>
                )}

                <div className="mt-6 p-4 bg-white rounded-md border border-gray-200">
                  <p className="text-xs text-dark/70 mb-2">
                    <strong>Questions?</strong>
                  </p>
                  <p className="text-xs text-dark/60">
                    Contact us at info@fellowshipchurch.com
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
