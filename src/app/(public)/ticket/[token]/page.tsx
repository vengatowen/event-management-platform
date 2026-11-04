export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { CheckCircle, Calendar, MapPin, User } from "lucide-react";
import { formatDate } from "@/lib/utils";

async function getTicket(token: string) {
  try {
    return await prisma.registration.findUnique({
      where: { verificationToken: token },
      include: { event: true },
    });
  } catch {
    return null;
  }
}

export default async function TicketPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const ticket = await getTicket(token);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="section-padding">
      <div className="container-narrow max-w-lg">
        <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
          <div className="bg-primary px-6 py-5 text-white text-center">
            <CheckCircle className="mx-auto h-12 w-12 mb-3" />
            <h1 className="font-heading text-2xl font-bold">Registration Confirmed</h1>
            <p className="text-white/80 text-sm mt-1">Your ticket is ready</p>
          </div>

          <div className="p-6 space-y-5">
            <div className="flex items-center gap-3">
              <User className="text-primary shrink-0" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">Attendee</p>
                <p className="font-medium text-foreground">{ticket.fullName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-primary shrink-0" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">Event</p>
                <p className="font-medium text-foreground">
                  {ticket.event?.name ?? "SAMANVAYA 2027"}
                </p>
              </div>
            </div>

            {ticket.event?.startDate && (
              <div className="flex items-center gap-3">
                <Calendar className="text-primary shrink-0" size={20} />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium text-foreground">
                    {formatDate(ticket.event.startDate)}
                    {ticket.event.endDate && ` – ${formatDate(ticket.event.endDate)}`}
                  </p>
                </div>
              </div>
            )}

            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Verification Token</p>
              <p className="font-mono text-sm font-medium break-all">{ticket.verificationToken}</p>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Please present this page or the confirmation email at the venue for check-in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
