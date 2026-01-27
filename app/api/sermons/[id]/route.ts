import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateSlug } from "@/lib/utils";

// GET /api/sermons/[id]
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const sermon = await db.sermon.findUnique({
      where: { id: id },
    });

    if (!sermon) {
      return NextResponse.json(
        { error: "Sermon not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(sermon);
  } catch (error) {
    console.error("Error fetching sermon:", error);
    return NextResponse.json(
      { error: "Failed to fetch sermon" },
      { status: 500 }
    );
  }
}

// PUT /api/sermons/[id]
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await auth();
    if (!session || !["SUPER_ADMIN", "EDITOR", "AUTHOR"].includes(session.user.role)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, details, date, time, location, preacher, image, status } = body;

    const existingSermon = await db.sermon.findUnique({
      where: { id: id },
    });

    if (!existingSermon) {
      return NextResponse.json(
        { error: "Sermon not found" },
        { status: 404 }
      );
    }

    const updateData: any = {
      ...(title && { title, slug: generateSlug(title) }),
      ...(description && { description }),
      ...(details !== undefined && { details }),
      ...(date && { date: new Date(date) }),
      ...(time && { time }),
      ...(location && { location }),
      ...(preacher && { preacher }),
      ...(image !== undefined && { image }),
      ...(status && { status }),
    };

    if (status === "PUBLISHED" && !existingSermon.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const sermon = await db.sermon.update({
      where: { id: id },
      data: updateData,
    });

    return NextResponse.json(sermon);
  } catch (error) {
    console.error("Error updating sermon:", error);
    return NextResponse.json(
      { error: "Failed to update sermon" },
      { status: 500 }
    );
  }
}

// DELETE /api/sermons/[id]
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await auth();
    if (!session || !["SUPER_ADMIN", "EDITOR"].includes(session.user.role)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await db.sermon.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Sermon deleted successfully" });
  } catch (error) {
    console.error("Error deleting sermon:", error);
    return NextResponse.json(
      { error: "Failed to delete sermon" },
      { status: 500 }
    );
  }
}
