import { Link } from "wouter";
import { ArrowRight, Phone } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <MainLayout>
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#1B1B1B] text-white">
        <span aria-hidden="true" className="pointer-events-none select-none absolute -right-6 bottom-0 translate-y-[18%] font-bold leading-none tracking-[-0.06em] text-[clamp(10rem,34vw,30rem)] text-white/[0.04]">404</span>
        <div className="container relative z-10 mx-auto px-6 md:px-12 pt-[150px] xl:pt-[170px] pb-16">
          <div className="max-w-2xl">
            <span className="section-eyebrow text-white/75 uppercase mb-6">Erreur 404</span>
            <h1 className="text-[clamp(2.3rem,5vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.03em] mb-6">Cette page n’existe pas.</h1>
            <p className="text-base sm:text-lg text-white/75 leading-relaxed mb-10 max-w-xl">
              L’adresse est peut-être erronée ou la page a été déplacée. Retournez à l’accueil ou parlez-nous de votre projet.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="h-14 rounded-md px-7 text-[13px] font-bold uppercase tracking-[0.12em] hover:bg-[hsl(80_91%_40%)]">
                <Link href="/" data-testid="link-404-home">Retour à l’accueil</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 rounded-md px-7 text-[13px] font-bold uppercase tracking-[0.12em] bg-white/[0.06] text-white border-white/25 hover:bg-white hover:text-secondary">
                <Link href="/soumission" data-testid="link-404-soumission">Demander une soumission <ArrowRight className="ml-1 w-5 h-5" /></Link>
              </Button>
            </div>
            <a href="tel:+14188836242" data-testid="link-404-phone" className="mt-10 inline-flex items-center gap-3 border-t border-white/15 pt-6 text-white/80 hover:text-primary transition-colors">
              <Phone className="w-4 h-4 text-primary" aria-hidden="true" /> (418) 883-6242
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
