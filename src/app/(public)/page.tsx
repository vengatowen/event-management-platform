export const dynamic = "force-dynamic";

import Link from "next/link";
import { Heart, Leaf, Users, Calendar, MapPin, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

async function getEvent() {
  try {
    return await prisma.event.findFirst({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const event = await getEvent();

  const name = event?.name ?? "SAMANVAYA 2027";
  const tagline = event?.tagline ?? "United for Health. Together for a Sustainable Future.";
  const description =
    event?.description ??
    "SAMANVAYA 2027 is a community initiative bringing people together to promote preventive healthcare, physical and mental wellness, and environmental sustainability in Hubballi–Dharwad, Karnataka.";
  const startDate = event?.startDate ? formatDate(event.startDate) : "5 February 2027";
  const endDate = event?.endDate ? formatDate(event.endDate) : "7 February 2027";
  const venue = event?.venueName ?? "Moorsavir Math College Ground, Hubballi";

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="container-wide relative px-4 py-20 md:py-28 text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-white/70 mb-4">
            Community Health & Sustainability Event
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {name}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            {tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={16} /> {startDate} – {endDate}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={16} /> {venue}
            </span>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-900 hover:bg-white/90 transition"
            >
              Register Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/agenda"
              className="inline-flex items-center rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
            >
              View Agenda
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Heart,
                title: "Health First",
                desc: "Preventive healthcare awareness, basic screening, and healthy lifestyle sessions.",
              },
              {
                icon: Users,
                title: "Mind & Body",
                desc: "Yoga, mindfulness, nutrition workshops, and stress management activities.",
              },
              {
                icon: Leaf,
                title: "Go Green",
                desc: "Waste segregation, composting, sustainable living, and community pledge.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <f.icon size={24} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white section-padding">
        <div className="container-narrow text-center">
          <h2 className="font-heading text-3xl font-bold">Ready to join us?</h2>
          <p className="mt-4 text-lg text-white/85 max-w-xl mx-auto">
            Free registration for attendees. Join families, students, and community groups for three days of learning and action.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-900 hover:bg-white/90 transition"
          >
            Register Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
