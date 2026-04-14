import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/settings - Get site settings
export async function GET(request: NextRequest) {
  try {
    // Get or create settings
    let settings = await db.siteSettings.findFirst();
    
    if (!settings) {
      settings = await db.siteSettings.create({
        data: {},
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// PUT /api/settings - Update site settings
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized - Super Admin access required" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Get or create settings
    let settings = await db.siteSettings.findFirst();
    
    if (!settings) {
      settings = await db.siteSettings.create({
        data: body,
      });
    } else {
      settings = await db.siteSettings.update({
        where: { id: settings.id },
        data: body,
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
