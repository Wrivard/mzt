import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setServicesDropdownOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const servicesLinks = [
    { name: "Construction et rénovation", href: "/#services" },
    { name: "Réfection de toiture", href: "/#services" },
    { name: "Déneigement de toiture", href: "/#services" },
    { name: "Béton estampé", href: "/#services" },
  ];

  const linkCls = "nav-link text-[13px] font-semibold tracking-wide text-white/85 hover:text-white transition-colors";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#1B1B1B] transition-[padding,box-shadow] duration-300 ${
        isScrolled ? "py-1.5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)]" : "py-3"
      }`}
    >
      <div className={`container mx-auto px-5 md:px-12 relative flex items-center justify-between transition-[min-height] duration-300 ${isScrolled ? "min-h-[76px] xl:min-h-[88px]" : "min-h-[88px] xl:min-h-[104px]"}`}>
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 z-50 block" aria-label="MZT Construction — accueil" onClick={() => setMobileMenuOpen(false)}>
          <img
            src="/logo-mzt-construction.png"
            alt="MZT Construction"
            className={`w-auto object-contain mix-blend-screen transition-[height] duration-300 ${isScrolled ? "h-[76px] xl:h-[88px]" : "h-[88px] xl:h-[104px]"}`}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8" aria-label="Navigation principale">
          <Link href="/" className={linkCls} aria-current={location === "/" ? "page" : undefined}>
            Accueil
          </Link>
          <a href="/#a-propos" className={linkCls}>
            À propos
          </a>

          <div
            ref={dropdownRef}
            className="relative flex items-center gap-1"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <a href="/#services" className={linkCls} onClick={() => setServicesDropdownOpen(false)}>
              Services
            </a>
            <button
              type="button"
              aria-expanded={servicesDropdownOpen}
              aria-controls="services-menu"
              aria-label="Afficher les services"
              onClick={() => setServicesDropdownOpen((o) => !o)}
              className="grid h-7 w-7 place-items-center rounded text-white/70 hover:text-white"
            >
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <div
              id="services-menu"
              className={`absolute top-full -left-4 pt-3 w-72 transition-[opacity,transform] duration-200 ${
                servicesDropdownOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-1 invisible pointer-events-none"
              }`}
            >
              <div className="rounded-md bg-[#232323] ring-1 ring-white/[0.07] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.7)] flex flex-col p-1.5">
                {servicesLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    tabIndex={servicesDropdownOpen ? 0 : -1}
                    className="rounded px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/[0.06] hover:text-white focus-visible:bg-white/[0.06] transition-colors"
                    onClick={() => setServicesDropdownOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a href="/#contact" className={linkCls}>
            Contact
          </a>
        </nav>

        <div className="hidden xl:flex items-center gap-6">
          <a href="tel:+14188836242" className="inline-flex items-center gap-2 text-[13px] font-semibold text-white/85 whitespace-nowrap hover:text-white">
            <Phone className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            (418) 883-6242
          </a>
          <Link
            href="/soumission"
            className="inline-flex h-11 items-center rounded-md bg-primary px-5 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-[hsl(80_91%_40%)] transition-colors"
          >
            Demander une soumission
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="xl:hidden relative z-50 grid h-11 w-11 place-items-center -mr-2 ml-auto rounded-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="fixed inset-0 bg-[#1B1B1B] z-40 xl:hidden flex flex-col pt-32 px-6 h-[100dvh] overflow-y-auto text-white animate-in fade-in duration-200">
          <nav className="flex flex-col text-2xl font-bold tracking-tight" aria-label="Navigation mobile">
            <Link href="/" className="border-b border-white/[0.08] py-5" onClick={() => setMobileMenuOpen(false)}>
              Accueil
            </Link>
            <a href="/#a-propos" className="border-b border-white/[0.08] py-5" onClick={() => setMobileMenuOpen(false)}>
              À propos
            </a>
            <div className="border-b border-white/[0.08] py-5">
              <span className="text-white/50 mb-3 block text-xs font-bold uppercase tracking-[0.18em]">Nos Services</span>
              <div className="flex flex-col">
                {servicesLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="py-2 text-lg font-medium text-white/85 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            <a href="/#contact" className="border-b border-white/[0.08] py-5" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </a>
          </nav>

          <div className="mt-auto py-8">
            <Link
              href="/soumission"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-14 w-full items-center justify-center rounded-md bg-primary text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground"
            >
              Demander une soumission
            </Link>
            <a href="tel:+14188836242" className="mt-4 block text-center text-sm font-semibold text-white/75 hover:text-white">
              (418) 883-6242
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
