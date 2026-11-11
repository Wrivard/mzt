import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { TestimonialsSection, FAQContactSection } from "@/components/SharedSections";
import { ArrowRight, HardHat, CheckCircle, Building2, Ruler, ChevronRight, Home as HomeIcon, Snowflake } from "lucide-react";

const serviceCards = [
  {
    category: "Construction et rénovation",
    title: "Construction générale",
    desc: "Des travaux de construction résidentielle et de transformation adaptés aux caractéristiques de votre propriété.",
    img: "/photos/mzt/construction-card.jpg",
    alt: "Chantier résidentiel avec levage d’une structure",
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    category: "Construction et rénovation",
    title: "Rénovation résidentielle",
    desc: "Des projets de rénovation pour faire évoluer vos espaces selon vos besoins et votre propriété.",
    img: "/photos/mzt/interieur-ouvert.jpg",
    alt: "Espace de vie ouvert et lumineux",
    icon: <HomeIcon className="w-5 h-5" />,
  },
  {
    category: "Réfection de toiture",
    title: "Réfection de toiture",
    desc: "Des travaux évalués selon l’état de la toiture, les besoins du bâtiment et les conditions du projet.",
    img: null,
    alt: "",
    icon: <HardHat className="w-5 h-5" />,
  },
  {
    category: "Déneigement de toiture",
    title: "Déneigement de toiture",
    desc: "Une intervention hivernale adaptée à l’accumulation de neige, à l’accès et aux caractéristiques du bâtiment.",
    img: null,
    alt: "",
    icon: <Snowflake className="w-5 h-5" />,
  },
  {
    category: "Béton estampé",
    title: "Béton estampé",
    desc: "Des surfaces décoratives en béton estampé pour différents projets d’aménagement extérieur.",
    img: null,
    alt: "",
    icon: <Ruler className="w-5 h-5" />,
  },
  {
    category: "Construction et rénovation",
    title: "Patios et terrasses",
    desc: "Des structures et aménagements extérieurs résidentiels, selon les besoins de votre projet.",
    img: "/photos/mzt/projet-patio.jpg",
    alt: "Patio et terrasse aménagés autour d’une résidence",
    icon: <Building2 className="w-5 h-5" />,
  },
];

const projectPhotos = [
  { src: "/photos/mzt/projet-cuisine.jpg", alt: "Cuisine rénovée avec armoires en bois clair", layout: "sm:col-span-2 sm:row-span-2" },
  { src: "/photos/mzt/renovation-generale.jpg", alt: "Espace de vie rénové avec cuisine ouverte", layout: "" },
  { src: "/photos/mzt/projet-salle-de-bain.jpg", alt: "Salle de bain rénovée avec douche vitrée", layout: "" },
  { src: "/photos/mzt/salle-de-bain.jpg", alt: "Vanité et douche dans une salle de bain rénovée", layout: "" },
  { src: "/photos/mzt/sous-sol.jpg", alt: "Sous-sol aménagé avec espace de vie", layout: "" },
];

function ProjectImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} loading="lazy" />
  );
}

const eyebrowDark = "section-eyebrow text-secondary uppercase mb-5";
const h2Cls = "text-3xl sm:text-4xl xl:text-[2.9rem] font-bold leading-[1.08] text-secondary";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-[#1B1B1B]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/photos/mzt/construction-hero.mp4"
          poster="/photos/mzt/construction-hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(17,18,15,0.9)_0%,rgba(17,18,15,0.7)_45%,rgba(17,18,15,0.25)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,rgba(17,18,15,0.75),transparent)]" />

        <div className="container relative z-10 mx-auto px-6 md:px-12 flex-1 flex flex-col justify-end sm:justify-center pt-[140px] xl:pt-[150px] pb-10 sm:pb-14">
          <div className="max-w-3xl 2xl:max-w-4xl">
            <span className="section-eyebrow text-white/80 uppercase mb-7">Construction · Rénovation · Toiture</span>

            <h1 className="text-[clamp(2.4rem,5.2vw,4.9rem)] font-bold text-white leading-[1.03] mb-6 tracking-[-0.03em]">
              Construire, rénover et donner vie à vos projets.
            </h1>

            <p className="text-base sm:text-lg xl:text-[1.2rem] text-white/80 mb-9 sm:mb-10 max-w-[38rem] leading-relaxed">
              Construction, rénovation, réfection et déneigement de toiture, béton estampé. MZT Construction met son savoir-faire au service de vos projets résidentiels.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12 sm:mb-16">
              <Button asChild size="lg" className="h-14 rounded-md px-7 text-[13px] font-bold uppercase tracking-[0.12em] w-full sm:w-auto hover:bg-[hsl(80_91%_40%)]">
                <Link href="/soumission">
                  Demander une soumission <ArrowRight className="ml-1 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 rounded-md px-7 text-[13px] font-bold uppercase tracking-[0.12em] w-full sm:w-auto bg-white/[0.06] text-white border-white/25 backdrop-blur-sm hover:bg-white hover:text-secondary">
                <a href="#services">Découvrir nos services</a>
              </Button>
            </div>

            {/* Preserve the template statistics exactly as supplied. */}
            <dl className="grid grid-cols-3 max-w-xl divide-x divide-white/15 border-t border-white/15 pt-6">
              {[
                ["15", "+", "Années d'expérience"],
                ["250", "+", "Projets livrés"],
                ["100", "%", "Garantie qualité"],
              ].map(([value, suffix, label], i) => (
                <div key={label} className={i === 0 ? "pr-3 sm:pr-6" : "px-3 sm:px-6"}>
                  <dd className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{value}<span className="text-primary">{suffix}</span></dd>
                  <dt className="mt-1 text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-white/65 font-semibold leading-snug">{label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="a-propos" className="py-20 md:py-24 xl:py-32 bg-background relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 xl:gap-24 items-center">
            <figure className="relative w-full max-w-xl lg:max-w-none mx-auto">
              <div className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                <img src="/photos/mzt/aggrandissement.jpg" alt="Agrandissement résidentiel avec façade contemporaine" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-[16rem] rounded-md bg-[#1B1B1B]/90 backdrop-blur-md text-white p-5 flex items-start gap-3">
                <HardHat className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <p className="font-semibold leading-snug">Des travaux adaptés à votre projet.</p>
              </div>
            </figure>

            <div className="max-w-xl">
              <span className={eyebrowDark}>À propos de MZT Construction</span>
              <h2 className={`${h2Cls} mb-7`}>Votre projet mérite un travail bien fait.</h2>
              <p className="text-lg text-muted-foreground mb-5 leading-relaxed">
                Chez MZT Construction, nous accompagnons les propriétaires dans leurs projets de construction, de rénovation et d’amélioration de leur propriété.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-9 leading-relaxed">
                Que vous planifiiez des travaux de rénovation, une réfection de toiture, un aménagement extérieur ou un projet de béton estampé, notre entreprise propose des services adaptés à vos besoins. Chaque projet tient compte des caractéristiques du bâtiment et des attentes du client.
              </p>

              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-10 border-t border-border pt-8">
                {[
                  "Construction et rénovation résidentielle",
                  "Réfection de toiture",
                  "Déneigement de toiture",
                  "Béton estampé et aménagements extérieurs",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-medium text-secondary leading-snug">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button asChild className="h-12 rounded-md px-6 font-bold uppercase tracking-[0.12em] text-[13px] hover:bg-[hsl(80_91%_40%)]">
                <Link href="/soumission">Parler de mon projet</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-24 xl:py-32 bg-muted">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <span className={eyebrowDark}>Nos services</span>
            <h2 className={`${h2Cls} mb-6`}>Quatre domaines pour vos projets.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Construction et rénovation, réfection de toiture, déneigement de toiture et béton estampé : MZT Construction accompagne vos projets résidentiels et extérieurs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
            {serviceCards.map((srv) => (
              <article key={srv.title} className="group flex flex-col overflow-hidden rounded-lg bg-background ring-1 ring-secondary/[0.06] shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]">
                <div className="aspect-[3/2] overflow-hidden relative bg-[#1B1B1B]">
                  {srv.img ? (
                    <ProjectImage src={srv.img} alt={srv.alt} className="img-zoom" />
                  ) : (
                    <div className="grain relative flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,#2c2f27,#1B1B1B_70%)]" aria-hidden="true">
                      <div className="grid h-20 w-20 place-items-center rounded-full ring-1 ring-white/15 text-primary [&_svg]:h-8 [&_svg]:w-8">
                        {srv.icon}
                      </div>
                    </div>
                  )}
                  {srv.img && (
                    <div className="absolute top-4 left-4 grid h-10 w-10 place-items-center rounded-full bg-background/95 text-primary backdrop-blur">
                      {srv.icon}
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 xl:p-7">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[hsl(80_91%_25%)]">{srv.category}</p>
                  <h3 className="text-xl xl:text-[1.35rem] font-bold mb-3 text-secondary">{srv.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-1">{srv.desc}</p>
                  <Link href="/soumission" className="inline-flex items-center self-start font-bold text-secondary hover:text-[hsl(80_91%_25%)] transition-colors uppercase tracking-[0.12em] text-xs">
                    Parler de mon projet <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 md:py-24 bg-forest text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-[0.8fr_1.6fr] gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
            <div className="text-center lg:text-left">
              <span className="section-eyebrow text-white/70 uppercase mb-5">Certifications</span>
              <h2 className="text-3xl sm:text-4xl font-bold leading-[1.1]">Assurance et certifications</h2>
              <p className="text-white/65 mt-4 leading-relaxed">Les organismes et programmes présentés par MZT Construction.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {[
                { src: "/certifications/mzt-acq.png", alt: "Association de la construction du Québec — ACQ" },
                { src: "/certifications/mzt-gcr.png", alt: "Garantie de construction résidentielle — GCR" },
                { src: "/certifications/mzt-rbq.png", alt: "Régie du bâtiment du Québec — RBQ" },
              ].map((logo) => (
                <figure key={logo.src} className="flex h-32 sm:h-36 items-center justify-center px-6 sm:px-8">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="block max-h-[72px] w-full max-w-[200px] object-contain brightness-0 invert opacity-90"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="en-images" className="py-20 md:py-24 xl:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 md:items-end gap-6 mb-10 md:mb-14">
            <div>
              <span className={eyebrowDark}>En images</span>
              <h2 className={h2Cls}>Nos réalisations</h2>
            </div>
            <p className="text-muted-foreground max-w-md md:justify-self-end leading-relaxed">
              Les photos des réalisations de MZT Construction n’ont pas été fournies. Les emplacements ci-dessous seront remplacés par des photos vérifiées.
            </p>
          </div>
          <div className="grid auto-rows-[260px] grid-cols-1 gap-3 sm:auto-rows-[220px] sm:grid-cols-2 md:gap-4 lg:auto-rows-[250px] xl:grid-cols-4 xl:auto-rows-[260px]">
            {projectPhotos.map((photo) => (
              <figure key={photo.src} className={`group relative overflow-hidden rounded-lg bg-muted ${photo.layout}`}>
                <ProjectImage src={photo.src} alt={photo.alt} className="absolute inset-0 img-zoom" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Final CTA */}
      <section id="cta" className="relative py-24 md:py-32 xl:py-36 bg-forest text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/photos/mzt/patio.jpg"
            alt=""
            className="h-full w-full object-cover opacity-50"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(17,18,15,0.6),rgba(17,18,15,0.88))]" />
        </div>

        <div className="container relative z-10 mx-auto px-6 md:px-12 text-center max-w-3xl">
          <span className="section-eyebrow text-white/75 uppercase mb-6">Parlons de votre projet</span>
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold mb-7 leading-[1.05] tracking-[-0.03em]">Un projet en tête? Parlons-en.</h2>
          <p className="text-lg md:text-xl text-white/75 mb-10 leading-relaxed max-w-2xl mx-auto">
            Construction, rénovation, réfection de toiture ou béton estampé : MZT Construction est disponible pour discuter de votre projet. Appelez au <a href="tel:+14188836242" className="text-white underline decoration-primary decoration-2 underline-offset-4 hover:text-primary">(418) 883-6242</a>.
          </p>
          <Button asChild size="lg" className="h-14 md:h-16 rounded-md px-8 md:px-10 text-sm sm:text-[15px] font-bold uppercase tracking-[0.12em] hover:bg-[hsl(80_91%_40%)]">
            <Link href="/soumission">Demander une soumission</Link>
          </Button>
        </div>
      </section>

      {/* FAQ & Contact */}
      <FAQContactSection />
    </MainLayout>
  );
}
