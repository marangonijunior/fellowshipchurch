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
    console.log("Received media data:", body);
    
    const media = await db.media.create({
      data: {
        url: body.url,
        filename: body.filename,
        mimetype: body.mimetype,
        size: body.size,
        uploadedBy: "system", // TODO: Get from session
      },
    });
    
    console.log("Created media:", media);
    return NextResponse.json(media);
  } catch (error) {
    console.error("Error creating media:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return NextResponse.json({ 
      error: "Failed to create media",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
