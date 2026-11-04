import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { randomBytes } from "crypto";

function generateToken(length = 32) {
  return randomBytes(length).toString("hex");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, organization, city } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Full name and email are required." },
        { status: 400 }
      );
    }

    // Find published event
    const event = await prisma.event.findFirst({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });

    if (!event) {
      return NextResponse.json(
        { error: "No active event found. Please complete setup first." },
        { status: 400 }
      );
    }

    // Prevent duplicate
    const existing = await prisma.registration.findFirst({
      where: {
        eventId: event.id,
        email: email.toLowerCase().trim(),
        status: { not: "CANCELLED" },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You have already registered with this email." },
        { status: 409 }
      );
    }

    const verificationToken = generateToken(20);

    const registration = await prisma.registration.create({
      data: {
        eventId: event.id,
        fullName: fullName.trim(),
        email: email.toLowerCase().trim(),
        phone: phone?.trim() || null,
        organization: organization?.trim() || null,
        verificationToken,
        status: "CONFIRMED",
      },
    });

    // Optional: send email via Resend if configured
    // (omitted for brevity – see original project for full email template)

    return NextResponse.json({
      success: true,
      ticket: {
        id: registration.id,
        verificationToken: registration.verificationToken,
        fullName: registration.fullName,
        email: registration.email,
      },
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "Registration failed" },
      { status: 500 }
    );
  }
}
