import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    // Safety: only allow if no events exist yet
    const existingEvents = await prisma.event.count();
    if (existingEvents > 0) {
      return NextResponse.json(
        { error: "Setup already completed." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const {
      eventName = "SAMANVAYA 2027",
      adminEmail,
      adminPassword,
      adminName = "Admin",
    } = body;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: "Admin email and password are required." },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(adminPassword, 12);

    // Create admin user
    const user = await prisma.user.create({
      data: {
        email: adminEmail.toLowerCase().trim(),
        name: adminName,
        passwordHash,
        role: "SUPER_ADMIN",
      },
    });

    // Create default event
    const event = await prisma.event.create({
      data: {
        name: eventName,
        slug: "samanvaya-2027",
        description:
          "A community initiative promoting health, wellness and environmental sustainability.",
        startDate: new Date("2027-02-05"),
        endDate: new Date("2027-02-07"),
        venue: "Moorsavir Math College Ground, Hubballi",
        city: "Hubballi",
        isPublished: true,
      },
    });

    // Create default ticket type
    await prisma.ticketType.create({
      data: {
        eventId: event.id,
        name: "Attendee",
        description: "Free registration for attendees",
        price: 0,
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Setup completed successfully",
      eventId: event.id,
      adminId: user.id,
    });
  } catch (error: any) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: error.message || "Setup failed" },
      { status: 500 }
    );
  }
}
