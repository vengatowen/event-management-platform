import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container-wide px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-3">SAMANVAYA 2027</h3>
            <p className="text-sm text-muted-foreground">
              A national-level event platform for students. Connect, learn, and grow together.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About</Link></li>
              <li><Link href="/agenda" className="hover:text-primary">Agenda</Link></li>
              <li><Link href="/register" className="hover:text-primary">Register</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SAMANVAYA 2027. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
