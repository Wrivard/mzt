import { Link } from "wouter";
import { ArrowUpRight, Mail, Phone, ShieldCheck } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { privacyContact, privacyIntro, privacySections, privacyUpdated } from "@/data/privacy";
import { CookieDeclaration } from "@/components/CookieDeclaration";

function ContactCard({ id }: { id: string }) {
  return (
    <div className="rounded-lg bg-[#1B1B1B] text-white p-6 sm:p-7" data-testid={`card-privacy-contact-${id}`}>
      <div className="flex items-start gap-3 mb-5">
        <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" aria-hidden="true" />
        <p className="font-semibold leading-snug" data-testid="text-privacy-role">{privacyContact.title}</p>
      </div>
      <ul className="space-y-3 border-t border-white/15 pt-5">
        <li>
          <a href={privacyContact.emailHref} data-testid={`link-privacy-email-${id}`} className="flex items-center gap-3 break-all text-white/85 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
            <Mail className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />{privacyContact.email}
          </a>
        </li>
        <li>
          <a href={privacyContact.phoneHref} data-testid={`link-privacy-phone-${id}`} className="flex items-center gap-3 text-white/85 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
            <Phone className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />{privacyContact.phone}
          </a>
        </li>
      </ul>
    </div>
  );
}

export default function Privacy() {
  return (
    <MainLayout>
      <header className="bg-[#1B1B1B] text-white pt-[150px] xl:pt-[170px] pb-14 md:pb-20">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <span className="section-eyebrow text-white/75 uppercase mb-6">Confidentialité · Loi 25</span>
          <h1 className="text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.04] tracking-[-0.03em] max-w-4xl">Politique de confidentialité</h1>
          <p className="mt-7 text-base sm:text-lg text-white/75 leading-relaxed max-w-3xl">{privacyIntro}</p>
          <p className="mt-8 inline-flex items-center gap-3 border-t border-white/15 pt-5 text-[11px] sm:text-xs uppercase tracking-[0.14em] font-semibold text-white/65">
            En vigueur et mise à jour le
            <time dateTime={privacyUpdated.iso} className="text-primary" data-testid="text-privacy-updated">{privacyUpdated.label}</time>
          </p>
        </div>
      </header>

      <div className="bg-background py-14 md:py-20 xl:py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl grid lg:grid-cols-[17rem_1fr] gap-12 xl:gap-20">
          <aside className="lg:sticky lg:top-32 self-start space-y-8">
            <nav aria-label="Sections de la politique" className="hidden lg:block">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[hsl(80_91%_25%)] mb-4">Sommaire</p>
              <ol className="space-y-1 border-l border-border">
                {privacySections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} data-testid={`link-toc-${s.id}`} className="block -ml-px border-l-2 border-transparent pl-4 py-1.5 text-sm text-muted-foreground hover:text-secondary hover:border-primary transition-colors">{s.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="hidden lg:block"><ContactCard id="aside" /></div>
          </aside>

          <article className="min-w-0 max-w-[46rem]">
            {privacySections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className={`scroll-mt-32 ${i ? "border-t border-border pt-10 mt-10 md:pt-12 md:mt-12" : ""}`}>
                <h2 id={`${s.id}-title`} className="text-2xl sm:text-[1.75rem] font-bold leading-tight text-secondary mb-5">{s.title}</h2>
                <div className="space-y-4 text-base sm:text-[1.05rem] text-muted-foreground leading-[1.75]">
                  {s.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                </div>
                {s.items && (
                  <ul className="mt-6 space-y-3">
                    {s.items.map((it, j) => (
                      <li key={j} className="flex gap-4 rounded-md bg-muted px-5 py-4 text-secondary leading-relaxed">
                        <span className="mt-2.5 h-1.5 w-3 shrink-0 bg-primary" aria-hidden="true" />{it}
                      </li>
                    ))}
                  </ul>
                )}
                {s.id === "responsable" && <div className="mt-7 lg:hidden"><ContactCard id="inline" /></div>}
                {s.links && (
                  <ul className="mt-6 flex flex-col gap-2.5">
                    {s.links.map((l) => (
                      <li key={l.href}>
                        <a href={l.href} target="_blank" rel="noopener noreferrer" data-testid={`link-source-${s.id}`} className="group inline-flex items-start gap-2 font-semibold text-secondary underline decoration-primary decoration-2 underline-offset-4 hover:text-[hsl(80_91%_25%)]">
                          {l.label}<ArrowUpRight className="w-4 h-4 mt-1 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                          <span className="sr-only">(s’ouvre dans un nouvel onglet)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <CookieDeclaration />
            <div className="mt-14 border-t border-border pt-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">Mise à jour : <time dateTime={privacyUpdated.iso} className="font-semibold text-secondary">{privacyUpdated.label}</time></p>
              <Link href="/" data-testid="link-privacy-home" className="text-xs font-bold uppercase tracking-[0.12em] text-secondary hover:text-[hsl(80_91%_25%)]">Retour à l’accueil</Link>
            </div>
          </article>
        </div>
      </div>
    </MainLayout>
  );
}
