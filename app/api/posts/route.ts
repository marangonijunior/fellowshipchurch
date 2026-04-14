import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateSlug } from "@/lib/utils";

// GET /api/posts - List all posts with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    const where: any = {};
    
    // Only show published posts to public, all to authenticated users
    const session = await auth();
    if (!session) {
      where.status = "PUBLISHED";
    } else if (status) {
      where.status = status;
    }
    
    if (type) {
      where.type = type;
    }

    const [posts, total] = await Promise.all([
      db.post.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          categories: true,
          tags: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit,
        skip,
      }),
      db.post.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const userRole = session?.user?.role;
    if (!userRole || !["SUPER_ADMIN", "EDITOR", "AUTHOR"].includes(userRole)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, content, excerpt, type, status, featuredImage, categories, tags, seoTitle, seoDescription } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const slug = generateSlug(title);

    const post = await db.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        type: type || "BLOG",
        status: status || "DRAFT",
        featuredImage,
        seoTitle,
        seoDescription,
        authorId: session.user.id,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
        categories: categories ? {
          connect: categories.map((id: string) => ({ id })),
        } : undefined,
        tags: tags ? {
          connect: tags.map((id: string) => ({ id })),
        } : undefined,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        categories: true,
        tags: true,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
