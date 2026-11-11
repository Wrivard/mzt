import { Link } from "wouter";

export function Footer() {
  const linkCls = "text-white/65 hover:text-white transition-colors text-sm font-medium";
  return (
    <footer className="bg-[#1B1B1B] text-white pt-16 md:pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_1.1fr] gap-10 xl:gap-12 mb-12 md:mb-16">
          <div className="flex flex-col items-start">
            <img
              src="/logo-mzt-construction.png"
              alt="MZT Construction"
              className="h-[120px] md:h-[136px] w-auto object-contain object-left mb-5 -ml-2 mix-blend-screen"
              loading="lazy"
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              MZT Construction propose des services de construction et de rénovation, de réfection et de déneigement de toiture ainsi que de béton estampé.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold mb-6 uppercase tracking-[0.18em] text-white/60">Navigation</h3>
            <ul className="flex flex-col gap-3.5">
              <li><Link href="/" className={linkCls}>Accueil</Link></li>
              <li><a href="/#a-propos" className={linkCls}>À propos</a></li>
              <li><a href="/#services" className={linkCls}>Services</a></li>
              <li><a href="/#certifications" className={linkCls}>Certifications</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold mb-6 uppercase tracking-[0.18em] text-white/60">Contact</h3>
            <ul className="flex flex-col gap-3.5 text-sm text-white/65">
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary w-4">T.</span>
                <a href="tel:+14188836242" className="hover:text-white">(418) 883-6242</a>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary w-4">C.</span>
                <a href="mailto:jstanguay3@hotmail.com" className="hover:text-white break-all">jstanguay3@hotmail.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold mb-6 uppercase tracking-[0.18em] text-white/60">Votre projet</h3>
            <Link
              href="/soumission"
              className="flex h-12 w-full items-center justify-center rounded-md bg-primary px-6 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-[hsl(80_91%_40%)] transition-colors"
            >
              Demander une soumission
            </Link>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-xs text-white/55">
          <p>© {new Date().getFullYear()} MZT Construction (2018) inc. Tous droits réservés.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:jstanguay3@hotmail.com?subject=Confidentialit%C3%A9" className="hover:text-white transition-colors">Questions sur la confidentialité</a>
            <a href="mailto:jstanguay3@hotmail.com" className="hover:text-white transition-colors">Nous écrire</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
