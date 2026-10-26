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
    img: "/photos/mzt/aggrandissement.jpg",
    alt: "Agrandissement résidentiel et façade contemporaine",
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    category: "Construction et rénovation",
    title: "Rénovation résidentielle",
    desc: "Des projets de rénovation pour faire évoluer vos espaces selon vos besoins et votre propriété.",
    img: "/photos/mzt/renovation-generale.jpg",
    alt: "Espace de vie rénové avec cuisine ouverte",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    category: "Réfection de toiture",
    title: "Réfection de toiture",
    desc: "Des travaux évalués selon l’état de la toiture, les besoins du bâtiment et les conditions du projet.",
    img: "/photos/mzt/projet-agrandissement.jpg",
    alt: "Vue extérieure d’un agrandissement résidentiel",
    icon: <HardHat className="w-6 h-6" />,
  },
  {
    category: "Déneigement de toiture",
    title: "Déneigement de toiture",
    desc: "Une intervention hivernale adaptée à l’accumulation de neige, à l’accès et aux caractéristiques du bâtiment.",
    img: "/photos/mzt/interieur-ouvert.jpg",
    alt: "Espace résidentiel lumineux",
    icon: <Snowflake className="w-6 h-6" />,
  },
  {
    category: "Béton estampé",
    title: "Béton estampé",
    desc: "Des surfaces décoratives en béton estampé pour différents projets d’aménagement extérieur.",
    img: "/photos/mzt/patio.jpg",
    alt: "Patio aménagé dans un espace extérieur résidentiel",
    icon: <Ruler className="w-6 h-6" />,
  },
  {
    category: "Construction et rénovation",
    title: "Patios et terrasses",
    desc: "Des structures et aménagements extérieurs résidentiels, selon les besoins de votre projet.",
    img: "/photos/mzt/projet-patio.jpg",
    alt: "Patio et terrasse aménagés autour d’une résidence",
    icon: <Building2 className="w-6 h-6" />,
  },
];

const projectPhotos = [
  { src: "/photos/mzt/projet-cuisine.jpg", alt: "Cuisine rénovée avec armoires en bois clair", layout: "sm:col-span-2 sm:row-span-2" },
  { src: "/photos/mzt/cuisine.jpg", alt: "Cuisine contemporaine avec grand îlot central", layout: "" },
  { src: "/photos/mzt/projet-salle-de-bain.jpg", alt: "Salle de bain rénovée avec douche vitrée", layout: "xl:row-span-2" },
  { src: "/photos/mzt/salle-de-bain.jpg", alt: "Vanité et douche dans une salle de bain rénovée", layout: "" },
  { src: "/photos/mzt/sous-sol.jpg", alt: "Sous-sol aménagé avec espace de vie", layout: "" },
];

function ProjectImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} loading="lazy" />
  );
}

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex flex-col">
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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,15,11,0.88)_0%,rgba(12,15,11,0.72)_48%,rgba(12,15,11,0.42)_100%)]" />

        <div className="container relative z-10 mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center pt-[150px] xl:pt-[169px] pb-8 sm:pb-10">
          <div className="max-w-3xl 2xl:max-w-5xl">
            <div className="section-eyebrow inline-flex items-center gap-2 px-3 py-1 bg-primary/20 text-white border border-primary/30 mb-6 backdrop-blur-sm">
              <span className="text-xs font-bold tracking-widest uppercase">Construction · Rénovation · Toiture</span>
            </div>

            <h1 className="text-[clamp(2.5rem,5vw,5.5rem)] font-extrabold text-white leading-[1.08] mb-5 sm:mb-6 tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
              Construire, rénover et donner vie à vos projets.
            </h1>

            <p className="text-base sm:text-lg xl:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl leading-relaxed font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              Construction, rénovation, réfection et déneigement de toiture, béton estampé. MZT Construction met son savoir-faire au service de vos projets résidentiels.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-12 xl:mb-16">
              <Link href="/soumission">
                <Button size="lg" className="h-14 px-5 sm:px-8 text-sm sm:text-base font-bold uppercase tracking-wider w-full sm:w-auto">
                  Demander une soumission <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="#services">
                <Button size="lg" variant="outline" className="h-14 px-5 sm:px-8 text-sm sm:text-base font-bold uppercase tracking-wider w-full sm:w-auto bg-white/5 text-white border-white/20 hover:bg-white hover:text-secondary">
                  Découvrir nos services
                </Button>
              </a>
            </div>

            {/* Preserve the template statistics exactly as supplied. */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 border-t border-white/10">
              <div>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-1">15<span className="text-primary">+</span></p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wide sm:tracking-widest text-white/75 font-bold">Années d'expérience</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-1">250<span className="text-primary">+</span></p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wide sm:tracking-widest text-white/75 font-bold">Projets livrés</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-1">100<span className="text-primary">%</span></p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wide sm:tracking-widest text-white/75 font-bold">Garantie qualité</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="a-propos" className="py-16 md:py-20 xl:py-24 bg-white relative scroll-mt-32 xl:scroll-mt-36">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-center">
            <div className="relative w-full max-w-xl lg:max-w-none mx-auto">
              <div className="aspect-square bg-[linear-gradient(145deg,#28331b,#111)] relative z-10 clip-diagonal overflow-hidden flex items-center justify-center p-12">
                <img src="/logo-mzt-construction.png" alt="MZT Construction" className="h-full w-full object-contain" loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 aspect-square bg-primary -z-0 clip-diagonal"></div>

              <div className="absolute top-1/2 -right-8 -translate-y-1/2 bg-forest text-white p-6 shadow-xl z-20 hidden xl:block w-48">
                <HardHat className="w-10 h-10 text-primary mb-4" />
                <p className="font-bold text-lg leading-tight">Des travaux adaptés à votre projet.</p>
              </div>
            </div>

            <div>
              <span className="section-eyebrow text-secondary font-bold tracking-widest uppercase text-sm mb-4">À propos de MZT Construction</span>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold mb-6 lg:mb-8 text-secondary">Votre projet mérite un travail bien fait.</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Chez MZT Construction, nous accompagnons les propriétaires dans leurs projets de construction, de rénovation et d’amélioration de leur propriété.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Que vous planifiiez des travaux de rénovation, une réfection de toiture, un aménagement extérieur ou un projet de béton estampé, notre entreprise propose des services adaptés à vos besoins. Chaque projet tient compte des caractéristiques du bâtiment et des attentes du client.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Construction et rénovation résidentielle",
                  "Réfection de toiture",
                  "Déneigement de toiture",
                  "Béton estampé et aménagements extérieurs",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-medium text-secondary">
                    <CheckCircle className="w-6 h-6 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/soumission">
                <Button className="font-bold uppercase tracking-wider">Parler de mon projet</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-20 xl:py-24 bg-muted border-y border-border scroll-mt-32 xl:scroll-mt-36">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <span className="section-eyebrow text-secondary font-bold tracking-widest uppercase text-sm mb-4">Nos services</span>
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold mb-6 text-secondary">Quatre domaines pour vos projets.</h2>
            <p className="text-lg text-muted-foreground">
              Construction et rénovation, réfection de toiture, déneigement de toiture et béton estampé : MZT Construction accompagne vos projets résidentiels et extérieurs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {serviceCards.map((srv) => (
              <div key={srv.title} className="bg-white border border-border group hover:-translate-y-2 transition-transform duration-300">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <ProjectImage src={srv.img} alt={srv.alt} className="transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground p-3 shadow-lg">
                    {srv.icon}
                  </div>
                </div>
                <div className="p-6 xl:p-8">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">{srv.category}</p>
                  <h3 className="text-2xl font-bold mb-3 text-secondary">{srv.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{srv.desc}</p>
                  <Link href="/soumission" className="inline-flex items-center font-bold text-secondary hover:text-primary transition-colors uppercase tracking-wider text-sm">
                    Parler de mon projet <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-16 md:py-20 xl:py-24 bg-forest text-white scroll-mt-32 xl:scroll-mt-36">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
            <span className="section-eyebrow text-white font-bold tracking-widest uppercase text-sm mb-4">Certifications</span>
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold">Assurance et certifications</h2>
            <p className="text-white/80 mt-4">Les organismes et programmes présentés par MZT Construction.</p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-12 items-stretch max-w-6xl mx-auto">
            {[
              { src: "/certifications/mzt-acq.png", alt: "Association de la construction du Québec — ACQ" },
              { src: "/certifications/mzt-gcr.png", alt: "Garantie de construction résidentielle — GCR" },
              { src: "/certifications/mzt-rbq.png", alt: "Régie du bâtiment du Québec — RBQ" },
            ].map((logo) => (
              <figure key={logo.src} className="flex min-h-[180px] items-center justify-center border border-white/15 bg-white/5 p-7 sm:p-9">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="block max-h-[110px] w-full max-w-[320px] object-contain brightness-0 invert"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="en-images" className="py-16 md:py-20 xl:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="section-eyebrow text-secondary font-bold tracking-widest uppercase text-sm mb-4">En images</span>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-secondary">Nos réalisations</h2>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Les photos des réalisations de MZT Construction n’ont pas été fournies. Les emplacements ci-dessous seront remplacés par des photos vérifiées.
            </p>
          </div>
          <div className="grid auto-rows-[240px] grid-cols-1 gap-4 sm:auto-rows-[220px] sm:grid-cols-2 md:gap-5 xl:auto-rows-[220px] xl:grid-cols-3">
            {projectPhotos.map((photo) => (
              <figure key={photo.src} className={`group relative overflow-hidden bg-muted ${photo.layout}`}>
                <ProjectImage src={photo.src} alt={photo.alt} className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Final CTA */}
      <section className="relative py-20 md:py-28 xl:py-32 bg-forest text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(116,173,8,0.2),transparent_55%),linear-gradient(135deg,#252a20,#10110f)]" />

        <div className="container relative z-10 mx-auto px-6 md:px-12 text-center max-w-4xl">
          <span className="section-eyebrow text-white font-bold tracking-widest uppercase text-sm mb-4">Parlons de votre projet</span>
          <h2 className="text-3xl sm:text-4xl xl:text-6xl font-extrabold mb-6 leading-tight">Un projet en tête? Parlons-en.</h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
            Construction, rénovation, réfection de toiture ou béton estampé : MZT Construction est disponible pour discuter de votre projet. Appelez au <a href="tel:+14188836242" className="underline underline-offset-4">(418) 883-6242</a>.
          </p>
          <Link href="/soumission">
            <Button size="lg" className="min-h-14 md:h-16 px-6 md:px-10 text-sm sm:text-lg font-bold uppercase tracking-wider">
              Demander une soumission
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ & Contact */}
      <FAQContactSection />
    </MainLayout>
  );
}
