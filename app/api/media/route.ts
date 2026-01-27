import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const media = await db.media.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(media);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const media = await db.media.create({
      data: {
        url: body.url,
        type: body.type,
        fileName: body.fileName,
        fileSize: body.fileSize,
      },
    });
    return NextResponse.json(media);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create media" }, { status: 500 });
  }
}
