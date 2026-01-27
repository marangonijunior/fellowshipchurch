import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { Calendar, MapPin, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import db from "@/lib/db";

async function getSermons() {
  try {
    const sermons = await db.sermon.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { date: "desc" },
    });
    return sermons;
  } catch (error) {
    console.error("Error fetching sermons:", error);
    return [];
  }
}

export default async function SermonsPage() {
  const sermons = await getSermons();

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-dark/80 to-dark/60">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80')] bg-cover bg-center opacity-30"></div>
        <div className="relative container-custom h-full flex flex-col justify-center text-white">
          <p className="text-primary uppercase tracking-wide mb-4">Sermons</p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold">
            Watch and listen to sermons
          </h1>
        </div>
      </section>

      {/* Sermons List */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-dark/60 uppercase tracking-wide mb-4">Join us</p>
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              Upcoming events
            </h2>
            <p className="text-dark/70 max-w-3xl">
              Join us for inspiring messages that will strengthen your faith and help you grow in your relationship with God.
            </p>
          </div>

          {sermons.length === 0 ? (
            <p className="text-center text-dark/60 py-12">No sermons available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sermons.map((sermon: any) => (
                <div key={sermon.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  {sermon.image ? (
                    <div
                      className="h-64 bg-cover bg-center"
                      style={{ backgroundImage: `url(${sermon.image})` }}
                    ></div>
                  ) : (
                    <div className="h-64 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-8xl">🎤</span>
                    </div>
                  )}
                  <div className="p-8">
                    <div className="flex items-start gap-6 mb-4">
                      <div className="text-center flex-shrink-0">
                        <div className="text-5xl font-bold text-dark">
                          {new Date(sermon.date).getDate()}
                        </div>
                        <div className="text-sm uppercase text-dark/60">
                          {new Date(sermon.date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-primary uppercase text-sm mb-2">Sermon</p>
                        <h3 className="text-2xl font-heading font-bold mb-4">
                          {sermon.title}
                        </h3>
                        <p className="text-dark/70 mb-4 line-clamp-3">{sermon.description}</p>
                        {sermon.speaker && (
                          <p className="text-sm font-semibold text-dark mb-2">
                            By {sermon.speaker}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6">
                      <Link
                        href={`/sermons/${sermon.id}`}
                        className="btn-primary w-full text-center"
                      >
                        Watch sermon
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
