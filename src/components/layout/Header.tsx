"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  eventName?: string;
  logoUrl?: string | null;
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/agenda", label: "Agenda" },
  { href: "/sponsors", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

export function Header({ eventName = "SAMANVAYA 2027", logoUrl }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container-wide flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={eventName} className="h-9 w-auto" />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white font-heading font-bold text-sm">
              S
            </div>
          )}
          <span className="font-heading text-lg font-semibold text-foreground hidden sm:inline">
            {eventName}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/register"
            className="ml-3 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
          >
            Register
          </Link>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-white px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 text-sm font-medium text-foreground"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/register"
            className="block mt-2 rounded-full bg-primary px-4 py-2 text-center text-sm font-medium text-white"
            onClick={() => setOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </header>
  );
}
