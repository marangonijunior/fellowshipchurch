import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

// This would fetch from database in production
const blogPosts = [
  {
    id: "1",
    title: "The best way to inspire people",
    slug: "the-best-way-to-inspire-people",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Relationship",
    author: "Mathew Johnson",
    publishedAt: new Date("2018-05-13"),
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80",
  },
  {
    id: "2",
    title: "How to show compassion",
    slug: "how-to-show-compassion",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Relationship",
    author: "Mathew Johnson",
    publishedAt: new Date("2018-05-13"),
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80",
  },
  {
    id: "3",
    title: "The biblical purpose of money",
    slug: "the-biblical-purpose-of-money",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Relationship",
    author: "Mathew Johnson",
    publishedAt: new Date("2018-05-13"),
    image: "https://images.unsplash.com/photo-1505409859467-3a796fd5798e?q=80",
  },
  {
    id: "4",
    title: "The best way to inspire people",
    slug: "the-best-way-to-inspire-people-2",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Relationship",
    author: "Mathew Johnson",
    publishedAt: new Date("2018-05-13"),
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80",
  },
  {
    id: "5",
    title: "What it means to be a disciple",
    slug: "what-it-means-to-be-a-disciple",
    excerpt: "We both celebrate and challenge the culture around us as we orient our lives around Jesus. We want to serve the world around. We want",
    category: "Relationship",
    author: "Mathew Johnson",
    publishedAt: new Date("2018-05-13"),
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80",
  },
  {
    id: "6",
    title: "What it means to believe",
    slug: "what-it-means-to-believe",
    excerpt: "We both celebrate and challenge the culture around us as we orient our lives around Jesus. We want to serve the world around. We want",
    category: "Relationship",
    author: "Mathew Johnson",
    publishedAt: new Date("2018-05-13"),
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80",
  },
  {
    id: "7",
    title: "The modern church in 2022",
    slug: "the-modern-church-in-2022",
    excerpt: "We both celebrate and challenge the culture around us as we orient our lives around Jesus. We want to serve the world around. We want",
    category: "Relationship",
    author: "Mathew Johnson",
    publishedAt: new Date("2018-05-13"),
    image: "https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?q=80",
  },
];

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <>
      <Header />

      {/* Page Header */}
      <section className="py-16 bg-cream">
        <div className="container-custom text-center">
          <p className="text-dark/60 uppercase tracking-wide mb-4">Our blog</p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold">
            Most recent post
          </h1>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${featuredPost.image})` }}
              ></div>
            </div>
            <div>
              <p className="text-primary uppercase text-sm mb-4">
                {featuredPost.category}
              </p>
              <h2 className="text-4xl font-heading font-bold mb-4">
                {featuredPost.title}
              </h2>
              <p className="text-dark/70 mb-6">{featuredPost.excerpt}</p>
              <div className="flex items-center text-sm text-dark/60 mb-6">
                <span>By {featuredPost.author}</span>
                <span className="mx-2">•</span>
                <span>{formatDate(featuredPost.publishedAt)}</span>
              </div>
              <Link href={`/blog/${featuredPost.slug}`} className="btn-primary">
                Read more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All Blog Posts */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">
            All blog posts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div
                  className="h-56 bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.image})` }}
                ></div>
                <div className="p-6">
                  <p className="text-primary uppercase text-sm mb-3">
                    {post.category}
                  </p>
                  <h3 className="text-xl font-heading font-semibold mb-4">
                    {post.title}
                  </h3>
                  <p className="text-sm text-dark/70 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-dark/60">
                    <span>By {post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
