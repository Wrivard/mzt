import { MainLayout } from "@/components/layout/MainLayout";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { certificationLogos, pageCopy } from "@/data/site";
import { TestimonialsSection, FAQContactSection } from "@/components/SharedSections";
import { ArrowRight, HardHat, CheckCircle, Building2, Layers, ChevronRight, Home as HomeIcon, Snowflake } from "lucide-react";

const SHOW_TESTIMONIALS = false;

const serviceCards = [
  {
    category: "Construction résidentielle",
    title: "Construction résidentielle",
    desc: "Faites construire votre maison, pensée pour votre mode de vie, avec des finitions soignées jusque dans les détails.",
    img: "/photos/mzt/client/construction-residentielle.webp",
    alt: "Maison résidentielle avec garage et toiture foncée",
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    category: "Construction commerciale",
    title: "Construction commerciale",
    desc: "Des projets de construction commerciale adaptés aux besoins de votre entreprise et aux caractéristiques du bâtiment.",
    img: "/photos/mzt/client/construction-commerciale.webp",
    alt: "Bâtiment à deux étages avec façades claires et foncées",
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    category: "Réfection de toiture",
    title: "Réfection de toiture",
    desc: "Réfection de toiture selon l’état de votre toit, les caractéristiques du bâtiment et les travaux à réaliser.",
    img: "/photos/mzt/client/toiture-metallique.webp",
    alt: "Vue aérienne d’une toiture métallique noire",
    icon: <HardHat className="w-5 h-5" />,
  },
  {
    category: "Déneigement de toiture",
    title: "Déneigement de toiture",
    desc: "On retire l’excès de neige sur votre toit pour alléger le poids qui s’accumule après les grosses bordées.",
    img: "/photos/mzt/illustrations/deneigement-toiture.webp",
    alt: "Illustration générée d’un intervenant déneigeant une toiture au râteau depuis le sol",
    icon: <Snowflake className="w-5 h-5" />,
  },
  {
    category: "Revêtement extérieur",
    title: "Revêtement extérieur",
    desc: "Un nouveau revêtement extérieur pour rafraîchir la façade et protéger votre bâtiment contre les intempéries.",
    img: "/photos/mzt/client/revetement-exterieur.webp",
    alt: "Façades d’une maison avec revêtement clair et accents foncés",
    icon: <Layers className="w-5 h-5" />,
  },
  {
    category: "Rénovation résidentielle",
    title: "Rénovation résidentielle",
    desc: "Rénovez les pièces que vous utilisez chaque jour pour gagner en confort et mieux profiter de votre espace.",
    img: "/photos/mzt/client/renovation-interieure.webp",
    alt: "Salon lumineux avec escalier en bois",
    icon: <HomeIcon className="w-5 h-5" />,
  },
];

const projectPhotos = [
  { src: "/photos/mzt/client/realisation-projet-commercial.webp", alt: "Bâtiment commercial aux façades contrastées et aux accents colorés, vu sous un autre angle", layout: "sm:col-span-2 sm:row-span-2" },
  { src: "/photos/mzt/client/realisation-maison.webp", alt: "Maison résidentielle avec garage et éclairage extérieur", layout: "sm:col-span-2 sm:row-span-2" },
  { src: "/photos/mzt/client/realisation-cuisine.webp", alt: "Cuisine ouverte avec îlot blanc et luminaires suspendus", layout: "" },
  { src: "/photos/mzt/client/realisation-salle-de-bain.webp", alt: "Salle de bain avec baignoire autoportante et douche vitrée", layout: "" },
  { src: "/photos/mzt/client/maison-blanche.webp", alt: "Maison à deux étages avec revêtement blanc et toiture foncée, entourée d’arbres", layout: "" },
  { src: "/photos/mzt/client/realisation-contemporaine.webp", alt: "Maison contemporaine à deux étages avec revêtement foncé et maçonnerie", layout: "" },
];

function ProjectImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <ResponsiveImage src={src} alt={alt} sizes="(min-width: 1280px) 640px, (min-width: 640px) 50vw, 100vw" className={`h-full w-full object-cover ${className}`} loading="lazy" decoding="async" />
  );
}

const eyebrowDark = "section-eyebrow text-secondary uppercase mb-5";
const h2Cls = "text-3xl sm:text-4xl xl:text-[2.9rem] font-bold leading-[1.08] text-secondary";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-[#1B1B1B]">
        <ResponsiveImage
          className="absolute inset-0 h-full w-full object-cover object-[65%_center]"
          src="/photos/mzt/client/hero-construction.webp"
          sizes="(max-aspect-ratio: 4/3) 134vh, 100vw"
          alt=""
          width={2200}
          height={1650}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(17,18,15,0.9)_0%,rgba(17,18,15,0.7)_45%,rgba(17,18,15,0.25)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,rgba(17,18,15,0.75),transparent)]" />

        <div className="container relative z-10 mx-auto px-6 md:px-12 flex-1 flex flex-col justify-end sm:justify-center pt-[140px] xl:pt-[150px] pb-10 sm:pb-14">
          <div className="max-w-3xl 2xl:max-w-4xl">
            <span className="section-eyebrow text-white/80 uppercase mb-7">Construction · Rénovation · Toiture</span>

            <h1 className="text-[clamp(2.4rem,5.2vw,4.9rem)] font-bold text-white leading-[1.03] mb-6 tracking-[-0.03em]">
              {pageCopy.home.heading}
            </h1>

            <p className="text-base sm:text-lg xl:text-[1.2rem] text-white/80 mb-9 sm:mb-10 max-w-[38rem] leading-relaxed">
              {pageCopy.home.intro}
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

            {/* Business figures confirmed in the client onboarding questionnaire. */}
            <dl className="grid grid-cols-3 max-w-xl divide-x divide-white/15 border-t border-white/15 pt-6">
              {[
                ["15", "+", "Années d'expérience"],
                ["400", "+", "Projets réalisés"],
                ["5753-3283-01", "", "Licence RBQ"],
              ].map(([value, suffix, label], i) => (
                <div key={label} className={i === 0 ? "pr-3 sm:pr-6" : "px-3 sm:px-6"}>
                  <dd className={`${label === "Licence RBQ" ? "text-[clamp(0.625rem,3vw,1.25rem)] sm:text-xl whitespace-nowrap" : "text-2xl sm:text-3xl"} font-bold text-white tracking-tight`}>
                    {value}<span className="text-primary">{suffix}</span>
                  </dd>
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
                <ResponsiveImage src="/photos/mzt/client/maison-blanche.webp" sizes="(min-width: 768px) 50vw, 100vw" alt="Maison à deux étages avec revêtement blanc et fenêtres noires" className="h-full w-full object-cover object-[45%_center]" loading="lazy" decoding="async" />
              </div>
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-[16rem] rounded-md bg-[#1B1B1B]/90 backdrop-blur-md text-white p-5 flex items-start gap-3">
                <HardHat className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <p className="font-semibold leading-snug">Des travaux adaptés à votre projet.</p>
              </div>
            </figure>

            <div className="max-w-xl">
              <span className={eyebrowDark}>À propos de MZT Construction</span>
              <h2 className={`${h2Cls} mb-7`}>Des travaux faits avec soin.</h2>
              <p className="text-lg text-muted-foreground mb-5 leading-relaxed">
                Fondée en 2018, MZT Construction inc. cumule plus de 15 ans d’expérience dans le domaine de la construction. Nous réalisons des projets résidentiels et commerciaux, ainsi que des travaux de rénovation et des travaux spécialisés.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-9 leading-relaxed">
                Notre approche repose sur la rigueur, la qualité d’exécution et le souci du détail. Nous privilégions une communication honnête, le respect des échéanciers et des engagements, ainsi qu’une relation de confiance fondée sur la transparence, la fiabilité et le professionnalisme.
              </p>

              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-10 border-t border-border pt-8">
                {[
                  "Construction résidentielle",
                  "Construction commerciale",
                  "Réfection de toiture",
                  "Déneigement de toiture",
                  "Revêtement extérieur",
                  "Rénovation résidentielle",
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
            <h2 className={`${h2Cls} mb-6`}>{pageCopy.home.servicesHeading}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Construction résidentielle et commerciale, réfection et déneigement de toiture, revêtement extérieur et rénovation résidentielle : MZT Construction accompagne vos projets.
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
              <h2 className="text-3xl sm:text-4xl font-bold leading-[1.1]">Certifications</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {certificationLogos.map((logo) => (
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
              Découvrez une sélection de projets de construction, de rénovation et de travaux spécialisés de MZT Construction.
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
      {SHOW_TESTIMONIALS && <TestimonialsSection />}

      {/* Final CTA */}
      <section id="cta" className="relative py-24 md:py-32 xl:py-36 bg-forest text-white overflow-hidden">
        <div className="absolute inset-0">
          <ResponsiveImage
            src="/photos/mzt/client/terrasse-couverte.webp"
            alt=""
            className="h-full w-full object-cover opacity-50"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(17,18,15,0.6),rgba(17,18,15,0.88))]" />
        </div>

        <div className="container relative z-10 mx-auto px-6 md:px-12 text-center max-w-6xl">
          <span className="section-eyebrow text-white/75 uppercase mb-6">Parlons de votre projet</span>
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold mb-7 leading-[1.05] tracking-[-0.03em]">Un projet en tête? Parlons-en.</h2>
          <p className="text-lg md:text-xl text-white/75 mb-10 leading-relaxed max-w-2xl mx-auto">
            Construction résidentielle ou commerciale, rénovation, toiture ou revêtement extérieur : MZT Construction est disponible pour discuter de votre projet.
          </p>
          <Button asChild size="lg" className="h-14 md:h-16 rounded-md px-8 md:px-10 text-sm sm:text-[15px] font-bold uppercase tracking-[0.12em] hover:bg-[hsl(80_91%_40%)]">
            <Link href="/soumission">Demander une soumission</Link>
          </Button>
          <a
            href="tel:+14188836242"
            className="mx-auto mt-5 block w-fit text-base font-semibold text-white/85 underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-primary"
          >
            Appelez au (418) 883-6242
          </a>
        </div>
      </section>

      {/* FAQ & Contact */}
      <FAQContactSection />
    </MainLayout>
  );
}
