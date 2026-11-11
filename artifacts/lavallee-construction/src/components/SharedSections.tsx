import { Building2, Phone, Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function TestimonialsSection() {
  const reviews = [
    {
      name: "Témoignage client",
      initials: "MZT",
      quote: "Les témoignages vérifiés de la clientèle de MZT Construction seront ajoutés ici.",
    },
    {
      name: "Témoignage client",
      initials: "MZT",
      quote: "Les témoignages vérifiés de la clientèle de MZT Construction seront ajoutés ici.",
    },
  ];

  return (
    <section id="temoignages" className="py-20 md:py-24 xl:py-28 bg-[#1B1B1B] text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <span className="section-eyebrow text-white/70 uppercase mb-5">Témoignages</span>
          <h2 className="text-3xl sm:text-4xl xl:text-[2.75rem] font-bold leading-[1.1] text-white">Ce que nos clients disent de nous.</h2>
          <p className="mt-5 text-sm text-white/55">Les avis vérifiés seront publiés avec l’autorisation de leurs auteurs.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <article
              key={`${review.name}-${index}`}
              className="flex h-full flex-col rounded-lg bg-white/[0.04] ring-1 ring-white/[0.08] p-7 sm:p-9 transition-colors duration-300 hover:bg-white/[0.06]"
            >
              <blockquote className="flex-1 text-lg font-medium leading-relaxed text-white/90 sm:text-xl">
                « {review.quote} »
              </blockquote>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-white/[0.08] pt-6">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold tracking-wide text-primary-foreground">
                    {review.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold leading-snug text-white">{review.name}</p>
                    <p className="mt-0.5 text-xs text-white/50">MZT Construction</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold text-white/60 ring-1 ring-white/15">Avis à venir</span>
              </div>
              <p className="mt-4 text-xs text-white/60">Espace réservé à un témoignage vérifié.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQContactSection() {
  const contactRows = [
    { icon: Building2, label: "Entreprise", content: <p className="text-secondary font-medium">MZT Construction (2018) inc.</p> },
    { icon: Phone, label: "Téléphone", content: <a className="text-secondary font-medium hover:text-primary" href="tel:+14188836242">(418) 883-6242</a> },
    { icon: Mail, label: "Courriel", content: <a className="text-secondary font-medium hover:text-primary break-all" href="mailto:jstanguay3@hotmail.com">jstanguay3@hotmail.com</a> },
  ];

  return (
    <section id="contact" className="bg-muted">
      <div className="container mx-auto px-6 md:px-12 pt-20 md:pt-24 xl:pt-28 pb-20 md:pb-24 xl:pb-28 grid lg:grid-cols-[1.25fr_1fr] gap-14 xl:gap-24">
        <div>
          <span className="section-eyebrow text-secondary uppercase mb-5">Questions fréquentes</span>
          <h2 className="text-3xl sm:text-4xl font-bold leading-[1.1] mb-8 lg:mb-10 text-secondary">Ce qu’il faut savoir</h2>

          <Accordion type="single" collapsible className="w-full border-t border-secondary/15">
            {[
              ["Quels services offrez-vous?", "MZT Construction offre des services de construction, de rénovation, de réfection de toiture, de déneigement de toiture et de béton estampé."],
              ["Réalisez-vous des rénovations résidentielles?", "Oui. Nous réalisons différents projets de rénovation selon les besoins de votre propriété."],
              ["Faites-vous du déneigement de toiture?", "Oui. Chaque situation est évaluée selon l’accumulation de neige, l’accès et les caractéristiques du bâtiment."],
              ["Faites-vous du béton estampé?", "Oui. Le béton estampé fait partie des spécialités de MZT Construction."],
              ["Faites-vous des travaux d’aménagement extérieur?", "Les réalisations présentées par l’entreprise comprennent notamment des patios et des terrasses. Communiquez avec nous pour discuter de votre projet."],
              ["Comment obtenir une soumission?", "Appelez au (418) 883-6242 ou écrivez à jstanguay3@hotmail.com en décrivant les travaux souhaités."],
              ["Quels secteurs desservez-vous?", "Communiquez avec nous afin de confirmer notre disponibilité dans votre municipalité."],
            ].map(([question, answer], i) => (
              <AccordionItem key={question} value={`item-${i + 1}`} className="border-b border-secondary/15">
                <AccordionTrigger className="text-left font-semibold text-base sm:text-[17px] py-5 sm:py-6 text-secondary hover:no-underline hover:text-[hsl(80_91%_25%)] [&[data-state=open]]:text-[hsl(80_91%_25%)] rounded-sm">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 pr-8 max-w-[60ch]">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="lg:pt-0">
          <span className="section-eyebrow text-secondary uppercase mb-5">Coordonnées</span>
          <h2 className="text-3xl sm:text-4xl font-bold leading-[1.1] mb-5 text-secondary">Parlons de votre projet.</h2>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-[48ch]">Vous planifiez des travaux de construction, de rénovation, de toiture ou un projet de béton estampé? Communiquez avec MZT Construction pour en discuter.</p>

          <div className="rounded-lg bg-background p-2 shadow-[var(--shadow-md)] ring-1 ring-secondary/[0.06]">
            <ul className="divide-y divide-border">
              {contactRows.map(({ icon: Icon, label, content }) => (
                <li key={label} className="flex items-center gap-4 p-4 sm:p-5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground mb-1">{label}</h4>
                    {content}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div id="zone-desservie" className="w-full">
        <iframe
          title="Carte centrée sur Sainte-Claire, Québec"
          src="https://maps.google.com/maps?q=Sainte-Claire%2C%20Qu%C3%A9bec&output=embed"
          className="block h-[320px] w-full border-0 grayscale-[0.35] sm:h-[400px] lg:h-[460px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
