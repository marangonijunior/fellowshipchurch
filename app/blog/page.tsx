import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import db from "@/lib/db";

async function getBlogPosts() {
  try {
    const posts = await db.post.findMany({
      where: {
        status: "PUBLISHED",
        type: "BLOG",
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        categories: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  
  if (blogPosts.length === 0) {
    return (
      <>
        <Header />
        <section className="py-20 bg-cream">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-heading font-bold mb-4">No blog posts yet</h1>
            <p className="text-dark/60">Check back soon for new content!</p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

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
                style={{ backgroundImage: `url(${featuredPost.featuredImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80"})` }}
              ></div>
            </div>
            <div>
              <p className="text-primary uppercase text-sm mb-4">
                {featuredPost.categories[0]?.name || "Blog"}
              </p>
              <h2 className="text-4xl font-heading font-bold mb-4">
                {featuredPost.title}
              </h2>
              <p className="text-dark/70 mb-6">{featuredPost.excerpt || "Read this amazing post..."}</p>
              <div className="flex items-center text-sm text-dark/60 mb-6">
                <span>By {featuredPost.author.name}</span>
                <span className="mx-2">•</span>
                <span>{featuredPost.publishedAt ? formatDate(featuredPost.publishedAt) : "Recently"}</span>
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
            {otherPosts.map((post: any) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {post.featuredImage && (
                  <div
                    className="h-56 bg-cover bg-center"
                    style={{ backgroundImage: `url(${post.featuredImage})` }}
                  ></div>
                )}
                {!post.featuredImage && (
                  <div className="h-56 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-4xl text-primary/30">📝</span>
                  </div>
                )}
                <div className="p-6">
                  <p className="text-primary uppercase text-sm mb-3">
                    {post.categories[0]?.name || "Blog"}
                  </p>
                  <h3 className="text-xl font-heading font-semibold mb-4">
                    {post.title}
                  </h3>
                  <p className="text-sm text-dark/70 mb-4 line-clamp-3">
                    {post.excerpt || post.content.substring(0, 150) + "..."}
                  </p>
                  <div className="flex items-center text-sm text-dark/60">
                    <span>By {post.author.name}</span>
                    <span className="mx-2">•</span>
                    <span>{post.publishedAt ? formatDate(post.publishedAt) : "Recently"}</span>
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
