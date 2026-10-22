import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { TestimonialsSection, FAQContactSection } from "@/components/SharedSections";
import { ArrowRight, HardHat, CheckCircle, Building2, Ruler, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex flex-col">
        <div className="absolute inset-0 bg-forest">
          <img
            className="w-full h-full object-cover opacity-90"
            src="/photos/arbres-aubois/hero.jpg"
            alt=""
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-forest/65"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center pt-[150px] xl:pt-[169px] pb-8 sm:pb-10">
          <div className="max-w-3xl 2xl:max-w-5xl">
            <div className="section-eyebrow inline-flex items-center gap-2 px-3 py-1 bg-primary/20 text-white border border-primary/30 mb-6 backdrop-blur-sm">
              <span className="text-xs font-bold tracking-widest uppercase">Émondage · Élagage · Abattage</span>
            </div>
            
            <h1 className="text-[clamp(2.5rem,5vw,5.5rem)] font-extrabold text-white leading-[1.08] mb-5 sm:mb-6 tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
              L’expertise au sommet de vos arbres.
            </h1>
            
            <p className="text-base sm:text-lg xl:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl leading-relaxed font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              Émondage, élagage et abattage d’arbres dans les Laurentides. Services d’arbres S.M.R adapte chaque intervention à vos arbres et à votre terrain.
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

            {/* Stats */}
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
              <div className="aspect-square bg-muted relative z-10 clip-diagonal overflow-hidden">
                <img src="/photos/arbres-aubois/about.jpg" alt="Image illustrative d’une intervention arboricole en hauteur" className="w-full h-full object-cover object-bottom" loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 aspect-square bg-primary -z-0 clip-diagonal"></div>
              
              <div className="absolute top-1/2 -right-8 -translate-y-1/2 bg-forest text-white p-6 shadow-xl z-20 hidden xl:block w-48">
                <HardHat className="w-10 h-10 text-primary mb-4" />
                <p className="font-bold text-lg leading-tight">Des interventions adaptées à votre terrain.</p>
              </div>
            </div>
            
            <div>
              <span className="section-eyebrow text-secondary font-bold tracking-widest uppercase text-sm mb-4">À propos de Services d’arbres S.M.R</span>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold mb-6 lg:mb-8 text-secondary">Des professionnels passionnés par les arbres.</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Les arbres jouent un rôle important dans votre environnement, mais leur entretien peut nécessiter des interventions spécialisées.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Services d’arbres S.M.R accompagne les propriétaires dans leurs projets d’émondage, d’élagage, d’abattage et d’entretien arboricole. Chaque projet est évalué selon l’état de l’arbre, son emplacement, l’accessibilité du terrain et les éléments environnants.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Assurance responsabilité de 5 000 000 $",
                  "Certification Certified Arborist — ISA",
                  "Formation en élagage — Centre horticole de Laval",
                  "Techniques de grimpe et équipements arboricoles adaptés au site"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium text-secondary">
                    <CheckCircle className="w-6 h-6 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <Link href="/soumission">
                <Button className="font-bold uppercase tracking-wider">
                  Parler de mon projet
                </Button>
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
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold mb-6 text-secondary">Des services adaptés à vos arbres.</h2>
            <p className="text-lg text-muted-foreground">
                Services d’émondage, d’élagage, d’abattage et d’entretien arboricole dans les Laurentides. Les photos du site sont illustratives et ne documentent pas nécessairement des réalisations de l’entreprise.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Émondage et élagage",
                desc: "Entretien et taille des branches selon les besoins de l’arbre et les particularités de votre propriété.",
                img: "/photos/arbres-aubois/service-elagage.webp",
                alt: "Image illustrative de travaux d’émondage et d’élagage",
                icon: <Building2 className="w-6 h-6" />
              },
              {
                title: "Abattage d’arbres",
                desc: "Abattage adapté aux dimensions de l’arbre, à son emplacement et aux éléments qui l’entourent.",
                img: "/photos/arbres-aubois/service-abattage.jpg",
                alt: "Image illustrative de travaux arboricoles",
                icon: <Ruler className="w-6 h-6" />
              },
              {
                title: "Travaux en hauteur",
                desc: "Interventions arboricoles en hauteur à l’aide de techniques de grimpe et d’équipements adaptés.",
                img: "/photos/arbres-aubois/service-haies.webp",
                alt: "Image illustrative d’une haie entretenue",
                icon: <HardHat className="w-6 h-6" />
              },
              {
                title: "Arboriste-grimpeur",
                desc: "Accès aux différentes parties de l’arbre lorsque sa configuration et les conditions du site le permettent.",
                img: "/photos/arbres-aubois/service-entretien.jpg",
                alt: "Image illustrative de techniques de grimpe arboricole",
                icon: <Building2 className="w-6 h-6" />
              },
              {
                title: "Entretien arboricole",
                desc: "Taille, dégagement des branches et travaux d’entretien déterminés selon les besoins de chaque arbre.",
                img: "/photos/arbres-aubois/service-hauteur.webp",
                alt: "Image illustrative de travaux d’entretien arboricole",
                icon: <Ruler className="w-6 h-6" />
              },
              {
                title: "Travaux spécialisés",
                desc: "Haubanage ou déboisement à discuter et à confirmer selon le mandat et les conditions du terrain.",
                img: "/photos/arbres-aubois/service-evaluation.jpg",
                alt: "Image illustrative d’un terrain boisé",
                icon: <HardHat className="w-6 h-6" />
              }
            ].map((srv, i) => (
              <div key={i} className="bg-white border border-border group hover:-translate-y-2 transition-transform duration-300">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={srv.img} alt={srv.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground p-3 shadow-lg">
                    {srv.icon}
                  </div>
                </div>
                <div className="p-6 xl:p-8">
                  <h3 className="text-2xl font-bold mb-3 text-secondary">{srv.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{srv.desc}</p>
                  <a href="/soumission" className="inline-flex items-center font-bold text-secondary hover:text-primary transition-colors uppercase tracking-wider text-sm">
                    Parler de mon projet <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
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
            <span className="section-eyebrow text-white font-bold tracking-widest uppercase text-sm mb-4">Qualifications</span>
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold">Assurance et certifications</h2>
            <p className="text-white/80 mt-4">Les accréditations et l’assurance présentées ci-dessous sont confirmées pour Services d’arbres S.M.R.</p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-12 items-center max-w-6xl mx-auto">
            {[
              { img: "/certifications/assurance-responsabilite.png", alt: "Attestation d’assurance responsabilité de 5 000 000 $" },
              { img: "/certifications/isa-certified-arborist.png", alt: "Certification Certified Arborist de l’ISA" },
              { img: "/certifications/elagage-centre-horticole-laval.png", alt: "Formation en élagage du Centre horticole de Laval" },
            ].map((credential) => (
              <figure key={credential.img} className="flex min-h-[330px] items-center justify-center overflow-visible py-3">
                <img src={credential.img} alt={credential.alt} className="block h-auto max-h-[300px] w-full max-w-[320px] object-contain mix-blend-screen" loading="lazy" />
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
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-secondary">Des travaux arboricoles en images.</h2>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
               Ces photos illustrent des contextes et des travaux arboricoles; elles ne documentent pas nécessairement des réalisations de Services d’arbres S.M.R.
            </p>
          </div>
          <div className="grid auto-rows-[240px] grid-cols-1 gap-4 sm:auto-rows-[220px] sm:grid-cols-2 md:gap-5 xl:auto-rows-[220px] xl:grid-cols-3">
            {[
              { src: "/photos/arbres-aubois/gallery-1.jpg", alt: "Photo illustrative d’un arbre mature sur un terrain résidentiel", width: 1536, height: 2048, layout: "sm:col-span-2 sm:row-span-2" },
              { src: "/photos/arbres-aubois/gallery-6.jpg", alt: "Photo illustrative d’une intervention arboricole en hauteur", width: 1536, height: 2048, layout: "" },
              { src: "/photos/arbres-aubois/gallery-10.jpg", alt: "Photo illustrative d’un arboriste équipé près d’un arbre", width: 1440, height: 1920, layout: "xl:row-span-2" },
              { src: "/photos/arbres-aubois/gallery-3.jpg", alt: "Photo illustrative d’un arbre après des travaux arboricoles", width: 1462, height: 1950, layout: "" },
              { src: "/photos/arbres-aubois/gallery-9.jpg", alt: "Photo illustrative de travaux d’entretien d’arbres", width: 1440, height: 1920, layout: "" },
            ].map((photo) => (
              <figure key={photo.src} className={`group relative overflow-hidden bg-muted ${photo.layout}`}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Background */}
      <section className="relative py-20 md:py-28 xl:py-32 bg-forest text-white overflow-hidden">
        <div className="absolute inset-0">
           <img src="/photos/arbres-aubois/cta.jpg" alt="" className="w-full h-full object-cover opacity-45" loading="lazy" />
          <div className="absolute inset-0 bg-forest/65"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6 md:px-12 text-center max-w-4xl">
             <span className="section-eyebrow text-white font-bold tracking-widest uppercase text-sm mb-4">Parlons de votre projet</span>
              <h2 className="text-3xl sm:text-4xl xl:text-6xl font-extrabold mb-6 leading-tight">Vos arbres ont besoin d’attention?</h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
                Émondage, élagage ou abattage : Services d’arbres S.M.R est disponible pour discuter de votre projet. Appelez au <a href="tel:+15142993765" className="underline underline-offset-4">(514) 299-3765</a>.
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
