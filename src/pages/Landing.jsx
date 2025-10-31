import { useUser } from "../context/UserContext";
import SEO from "../components/SEO.jsx";

function Landing() {
  const { user } = useUser();

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JeviQR",
    url: "https://jeviqr.com/",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    description:
      "JeviQR is the all-in-one platform to create and manage custom QR codes with real-time analytics.",
    potentialAction: {
      "@type": "CreateAction",
      target: "https://jeviqr.com/dashboard",
      name: "Create a QR code",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="bg-slate-950 text-slate-100">
      <SEO
        title="JeviQR | Create custom QR codes with advanced analytics"
        description="Design branded QR codes, automate follow-up flows, and monitor real-time metrics with JeviQR, the complete platform for QR-led campaigns."
        keywords="Custom QR code generator, JeviQR, QR platform, QR analytics, dynamic QR codes"
        url="https://jeviqr.com/"
        jsonLd={schema}
      />
      <header className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-24 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-1 text-sm font-medium tracking-wide text-slate-200">
            Professional QR codes in minutes <h2>Welcome, {user.email}</h2>
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Create custom QR codes and measure their impact in real time
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            JeviQR combines design, automation, and analytics so you can launch
            dynamic QR campaigns, track conversions, and scale your omnichannel
            presence without friction.
          </p>
          <div className="flex flex-col items-start gap-4 sm:flex-row">
            <a
              className="inline-flex items-center justify-center rounded-lg bg-teal-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-teal-400"
              href="/dashboard"
            >
              Start for free
            </a>
            <a
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-6 py-3 text-base font-semibold text-white transition hover:border-slate-500"
              href="#features"
            >
              See features
            </a>
          </div>
        </div>
        <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-sm leading-relaxed text-slate-300 shadow-2xl shadow-slate-900/30">
          <h2 className="text-xl font-semibold text-white">
            Unify your QR strategy
          </h2>
          <p className="mt-4">
            Design one-of-a-kind QR codes with custom colors, logos, and
            templates. Instantly connect welcome flows, offers, and surveys to
            every scan and trigger alerts when campaigns outperform goals.
          </p>
          <ul className="mt-6 space-y-3 text-slate-200">
            <li>• Visual editor with live preview.</li>
            <li>• Dynamic QR codes with updatable URLs.</li>
            <li>• Analytics dashboard for engagement and conversions.</li>
          </ul>
        </div>
      </header>
      <section
        id="features"
        className="mx-auto max-w-5xl space-y-10 px-6 pb-20 text-slate-200"
      >
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold text-white">
            Key features built for JeviQR
          </h2>
          <p className="text-slate-300">
            Everything you need to launch, optimize, and scale campaigns with QR
            codes from a single workspace.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <article className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <h3 className="text-xl font-semibold text-white">
              QR code builder
            </h3>
            <p className="mt-3 text-sm text-slate-300">
              Customize colors, shapes, and logos, apply templates, and export
              in formats ready for print or digital displays.
            </p>
          </article>
          <article className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <h3 className="text-xl font-semibold text-white">
              Smart automations
            </h3>
            <p className="mt-3 text-sm text-slate-300">
              Redirect scans to tailored campaigns, trigger notifications, and
              connect to your stack through no-code integrations.
            </p>
          </article>
          <article className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <h3 className="text-xl font-semibold text-white">
              Real-time analytics
            </h3>
            <p className="mt-3 text-sm text-slate-300">
              Monitor scans by channel, device, and location to make better
              decisions and improve conversions.
            </p>
          </article>
          <article className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <h3 className="text-xl font-semibold text-white">
              Team management
            </h3>
            <p className="mt-3 text-sm text-slate-300">
              Collaborate with your team, assign permissions, and share
              dashboards with clients or partners securely.
            </p>
          </article>
        </div>
      </section>
      <section className="bg-slate-900 py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 text-center text-slate-100">
          <h2 className="text-3xl font-semibold text-white">
            Use cases that convert
          </h2>
          <p className="mx-auto max-w-3xl text-slate-300">
            Retail, restaurants, events, education, or experiential marketing.
            JeviQR helps you transform every touchpoint into measurable,
            updatable experiences in seconds.
          </p>
        </div>
      </section>
      <footer className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-16 text-center text-slate-200">
        <h2 className="text-2xl font-semibold text-white">
          Ready to design your first premium QR code?
        </h2>
        <p className="max-w-3xl text-slate-300">
          Get started for free in minutes and scale into automated flows with
          advanced analytics as your campaign grows.
        </p>
        <a
          className="inline-flex items-center justify-center rounded-lg bg-teal-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-teal-400"
          href="/login"
        >
          Create your JeviQR account
        </a>
      </footer>
    </main>
  );
}

export default Landing;
