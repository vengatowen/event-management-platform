export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="section-padding">
      <div className="container-narrow max-w-3xl">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-6">Terms of Service</h1>
        <div className="prose prose-muted space-y-4 text-muted-foreground">
          <p>Last updated: November 2024</p>
          <p>
            By registering for or attending SAMANVAYA 2027, you agree to these Terms of Service.
          </p>
          <h2 className="text-foreground font-semibold text-xl mt-6">Registration</h2>
          <p>Registration is free. You must provide accurate information. We reserve the right to cancel registrations that violate these terms.</p>
          <h2 className="text-foreground font-semibold text-xl mt-6">Event Changes</h2>
          <p>We may modify the event schedule, venue, or content. We will notify registered participants of significant changes.</p>
          <h2 className="text-foreground font-semibold text-xl mt-6">Conduct</h2>
          <p>Participants are expected to behave respectfully. We may remove anyone who disrupts the event or violates community standards.</p>
          <h2 className="text-foreground font-semibold text-xl mt-6">Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, we are not liable for any indirect or consequential damages arising from your participation.</p>
        </div>
      </div>
    </div>
  );
}
