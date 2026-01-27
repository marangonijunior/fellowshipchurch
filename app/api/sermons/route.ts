import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateSlug } from "@/lib/utils";

// GET /api/sermons - List all sermons
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    const where: any = {};
    
    const session = await auth();
    if (!session) {
      where.status = "PUBLISHED";
    } else if (status) {
      where.status = status;
    }

    const [sermons, total] = await Promise.all([
      db.sermon.findMany({
        where,
        orderBy: {
          date: "desc",
        },
        take: limit,
        skip,
      }),
      db.sermon.count({ where }),
    ]);

    return NextResponse.json({
      sermons,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching sermons:", error);
    return NextResponse.json(
      { error: "Failed to fetch sermons" },
      { status: 500 }
    );
  }
}

// POST /api/sermons - Create a new sermon
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !["SUPER_ADMIN", "EDITOR", "AUTHOR"].includes(session.user.role)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, details, date, time, location, preacher, image, status } = body;

    if (!title || !description || !date || !time || !location || !preacher) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const slug = generateSlug(title);

    const sermon = await db.sermon.create({
      data: {
        title,
        slug,
        description,
        details,
        date: new Date(date),
        time,
        location,
        preacher,
        image,
        status: status || "DRAFT",
        authorId: session.user.id,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
    });

    return NextResponse.json(sermon, { status: 201 });
  } catch (error) {
    console.error("Error creating sermon:", error);
    return NextResponse.json(
      { error: "Failed to create sermon" },
      { status: 500 }
    );
  }
}
