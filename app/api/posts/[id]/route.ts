import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateSlug } from "@/lib/utils";

// GET /api/posts/[id] - Get a single post
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const post = await db.post.findUnique({
      where: { id: id },
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

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // Increment view count
    await db.post.update({
      where: { id: id },
      data: { viewCount: { increment: 1 } },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// PUT /api/posts/[id] - Update a post
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
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

    const existingPost = await db.post.findUnique({
      where: { id: id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // Check if user owns the post or is admin/editor
    if (
      existingPost.authorId !== session.user.id &&
      !["SUPER_ADMIN", "EDITOR"].includes(userRole)
    ) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const slug = title ? generateSlug(title) : existingPost.slug;
    
    const updateData: any = {
      ...(title && { title, slug }),
      ...(content && { content }),
      ...(excerpt !== undefined && { excerpt }),
      ...(type && { type }),
      ...(status && { status }),
      ...(featuredImage !== undefined && { featuredImage }),
      ...(seoTitle !== undefined && { seoTitle }),
      ...(seoDescription !== undefined && { seoDescription }),
    };

    // Handle published date
    if (status === "PUBLISHED" && !existingPost.publishedAt) {
      updateData.publishedAt = new Date();
    }

    // Handle categories and tags
    if (categories !== undefined) {
      updateData.categories = {
        set: [],
        connect: categories.map((id: string) => ({ id })),
      };
    }

    if (tags !== undefined) {
      updateData.tags = {
        set: [],
        connect: tags.map((id: string) => ({ id })),
      };
    }

    const post = await db.post.update({
      where: { id: id },
      data: updateData,
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

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[id] - Delete a post
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await auth();
    const userRole = session?.user?.role;
    if (!userRole || !["SUPER_ADMIN", "EDITOR"].includes(userRole)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const existingPost = await db.post.findUnique({
      where: { id: id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    await db.post.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
