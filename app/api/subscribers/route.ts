import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@/lib/auth";

const ADMIN_ROLES = ["SUPER_ADMIN", "EDITOR", "AUTHOR"];

export async function GET() {
  try {
    const session = await auth();
    const userRole = session?.user?.role;

    if (!userRole || !ADMIN_ROLES.includes(userRole)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const subscribers = await db.subscriber.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(subscribers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const source = body.source ? String(body.source).trim() : null;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    const subscriber = await db.subscriber.create({
      data: {
        email,
        source,
      },
    });

    return NextResponse.json(subscriber, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "This email is already subscribed" }, { status: 409 });
    }

    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
