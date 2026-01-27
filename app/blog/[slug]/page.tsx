import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";

// Mock data - would come from database
const post = {
  id: "1",
  title: "How to show compassion",
  slug: "how-to-show-compassion",
  content: `
    <h2>Lorem ipsum dolor sit amet</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    
    <p>Aenean vel elit scelerisque mauris. Imperdiet sed euismod nisi porta lorem mollis aliquam ut. Duis vel eros donec ac odio. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam id.</p>
    
    <h2>Lorem ipsum dolor sit amet</h2>
    <p>Aenean vel elit scelerisque mauris. Imperdiet sed euismod nisi porta lorem mollis aliquam ut. Duis vel eros donec ac odio. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam id.</p>
    
    <blockquote>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </blockquote>
    
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In est ante in nibh mauris cursus mattis. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Morbi tristique senectus et netus et. Morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
    
    <h2>Lorem ipsum dolor sit amet consectetur</h2>
    <p>We both celebrate and challenge the culture around us as we orient our lives around Jesus. We want to serve the world around us. It's why we support mission work all across the globe; regardless of what your next step is in faith, we want to help you take that next step. we can't wait to have you at church this next step in faith next weekend and we believe you'll love it.</p>
    
    <ul>
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing</li>
      <li>Purus amet luctus venenatis lectus magna fringilla urna</li>
      <li>Aenean vel elit scelerisque mauris pellentesque pulvinar</li>
    </ul>
    
    <p>Sagittis orci a scelerisque purus semper eget duis. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Donec adipiscing tristique risus nec feugiat in fermentum. Vitae elementum curabitur vitae nunc sed velit dignissim. Lacus luctus accumsan tortor posuere ac ut consequat semper viverra.</p>
  `,
  category: "Relationship",
  author: {
    name: "Mathew Johnson",
    image: "https://i.pravatar.cc/150?img=12",
  },
  publishedAt: new Date("2018-05-13"),
  featuredImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80",
};

// Related posts - would come from database based on categories/tags
const relatedPosts = [
  {
    id: "2",
    title: "The best way to inspire people",
    slug: "the-best-way-to-inspire-people",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    category: "Relationship",
    author: "Mathew Johnson",
    publishedAt: new Date("2018-05-13"),
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80",
  },
  {
    id: "3",
    title: "What it means to believe",
    slug: "what-it-means-to-believe",
    excerpt: "We both celebrate and challenge the culture around us as we orient our lives around Jesus.",
    category: "Faith",
    author: "Mathew Johnson",
    publishedAt: new Date("2018-05-10"),
    image: "https://images.unsplash.com/photo-1505409859467-3a796fd5798e?q=80",
  },
  {
    id: "4",
    title: "The biblical purpose of money",
    slug: "the-biblical-purpose-of-money",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    category: "Relationship",
    author: "Mathew Johnson",
    publishedAt: new Date("2018-05-08"),
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80",
  },
];

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In production, fetch post by slug from database
  // if (!post) notFound();

  return (
    <>
      <Header />

      {/* Page Header */}
      <section className="py-16 bg-cream">
        <div className="container-custom max-w-4xl">
          <p className="text-primary uppercase text-sm mb-4 text-center">
            {post.category}
          </p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-center mb-6">
            {post.title}
          </h1>
          <div className="flex items-center justify-center text-sm text-dark/60">
            <span>By {post.author.name}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-0 bg-white">
        <div className="container-custom max-w-5xl">
          <div
            className="h-96 md:h-[500px] rounded-2xl overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${post.featuredImage})` }}
          ></div>
        </div>
      </section>

      {/* Post Content */}
      {/* Related Posts - Optional */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">
            Related posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                className="bg-cream rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${relatedPost.image})` }}
                ></div>
                <div className="p-6">
                  <p className="text-primary uppercase text-sm mb-3">
                    {relatedPost.category}
                  </p>
                  <h3 className="text-xl font-heading font-semibold mb-4">
                    {relatedPost.title}
                  </h3>
                  <div className="flex items-center text-sm text-dark/60">
                    <span>By {relatedPost.author}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(relatedPost.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Posts - Optional */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">
            Related posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-cream rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <p className="text-primary uppercase text-sm mb-3">
                    Relationship
                  </p>
                  <h3 className="text-xl font-heading font-semibold mb-4">
                    The best way to inspire people
                  </h3>
                  <div className="flex items-center text-sm text-dark/60">
                    <span>By Mathew Johnson</span>
                    <span className="mx-2">•</span>
                    <span>May 13, 2018</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
