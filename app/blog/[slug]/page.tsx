import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import db from "@/lib/db";

async function getPost(slug: string) {
  try {
    const post = await db.post.findUnique({
      where: { slug, status: "PUBLISHED" },
      include: {
        author: { select: { name: true } },
        categories: { select: { name: true } },
        tags: { select: { name: true } },
      },
    });
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

async function getRelatedPosts(slug: string) {
  try {
    const posts = await db.post.findMany({
      where: {
        status: "PUBLISHED",
        type: "BLOG",
        slug: { not: slug },
      },
      include: {
        author: { select: { name: true } },
      },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });
    return posts;
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, relatedPosts] = await Promise.all([
    getPost(slug),
    getRelatedPosts(slug),
  ]);

  if (!post) {
    notFound();
  }


  return (
    <>
      <Header />

      {/* Page Header */}
      <section className="py-16 bg-cream">
        <div className="container-custom max-w-4xl">
          <p className="text-primary uppercase text-sm mb-4 text-center">
            {post.categories[0]?.name || "Blog"}
          </p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-center mb-6">
            {post.title}
          </h1>
          <div className="flex items-center justify-center text-sm text-dark/60">
            <span>By {post.author.name}</span>
            <span className="mx-2">•</span>
            <span>{post.publishedAt ? formatDate(post.publishedAt) : "Recently"}</span>
            {post.viewCount > 0 && (
              <>
                <span className="mx-2">•</span>
                <span>{post.viewCount} views</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="py-0 bg-white">
          <div className="container-custom max-w-5xl">
            <div
              className="h-96 md:h-[500px] rounded-2xl overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: `url(${post.featuredImage})` }}
            ></div>
          </div>
        </section>
      )}

      {/* Post Content */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-dark/60 mb-4">TAGS</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: any) => (
                  <span
                    key={tag.name}
                    className="px-4 py-2 bg-cream rounded-full text-sm text-dark hover:bg-primary/20 transition-colors"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="mt-12 p-8 bg-cream rounded-2xl">
            <h3 className="text-xl font-heading font-bold mb-2">About the author</h3>
            <p className="text-dark/70 mb-4">
              {post.author.name} is a passionate writer and contributor to our church blog.
            </p>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-cream">
          <div className="container-custom">
            <h2 className="text-4xl font-heading font-bold text-center mb-12">
              Related posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost: any) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {relatedPost.featuredImage ? (
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${relatedPost.featuredImage})` }}
                    ></div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-6xl">📝</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-semibold mb-4">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-dark/70 mb-4 line-clamp-2">
                      {relatedPost.excerpt || relatedPost.content.substring(0, 100) + "..."}
                    </p>
                    <div className="flex items-center text-sm text-dark/60">
                      <span>By {relatedPost.author.name}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
