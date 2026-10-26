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
    <section id="temoignages" className="py-16 md:py-20 xl:py-24 bg-[#1B1B1B] text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
          <span className="section-eyebrow text-white font-bold tracking-widest uppercase text-sm mb-4">Témoignages</span>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold mb-6 text-white">Ce que nos clients disent de nous.</h2>
          <p className="mt-3 text-sm text-white/60">Les avis vérifiés seront publiés avec l’autorisation de leurs auteurs.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <article
              key={`${review.name}-${index}`}
              className="group relative flex h-full flex-col overflow-hidden border border-white/10 bg-white p-7 text-secondary shadow-xl transition-transform duration-300 hover:-translate-y-1 sm:p-9"
            >
              <div className="absolute inset-y-0 left-0 w-1.5 bg-primary" />
              <div className="mb-7 flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary text-sm font-bold text-primary-foreground">
                    {review.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-extrabold text-secondary">{review.name}</p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">MZT Construction</p>
                  </div>
                </div>
                <span className="shrink-0 text-sm font-semibold text-muted-foreground">Avis à venir</span>
              </div>
              <blockquote className="flex-1 text-lg font-medium leading-relaxed sm:text-xl">
                « {review.quote} »
              </blockquote>
              <div className="mt-7 border-t border-border pt-4">
                <p className="text-xs font-medium text-muted-foreground">Espace réservé à un témoignage vérifié.</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQContactSection() {
  return (
    <section id="contact" className="bg-muted scroll-mt-32 xl:scroll-mt-36">
      <div className="container mx-auto px-6 md:px-12 pt-16 md:pt-20 xl:pt-24 pb-20 xl:pb-32 grid lg:grid-cols-2 gap-10 xl:gap-16">
        <div>
          <span className="section-eyebrow text-secondary font-bold tracking-widest uppercase text-sm mb-4">Questions fréquentes</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 lg:mb-10 text-secondary">Ce qu’il faut savoir</h2>

          <Accordion type="single" collapsible className="w-full bg-white border border-border">
            {[
              ["Quels services offrez-vous?", "MZT Construction offre des services de construction, de rénovation, de réfection de toiture, de déneigement de toiture et de béton estampé."],
              ["Réalisez-vous des rénovations résidentielles?", "Oui. Nous réalisons différents projets de rénovation selon les besoins de votre propriété."],
              ["Faites-vous du déneigement de toiture?", "Oui. Chaque situation est évaluée selon l’accumulation de neige, l’accès et les caractéristiques du bâtiment."],
              ["Faites-vous du béton estampé?", "Oui. Le béton estampé fait partie des spécialités de MZT Construction."],
              ["Faites-vous des travaux d’aménagement extérieur?", "Les réalisations présentées par l’entreprise comprennent notamment des patios et des terrasses. Communiquez avec nous pour discuter de votre projet."],
              ["Comment obtenir une soumission?", "Appelez au (418) 883-6242 ou écrivez à jstanguay3@hotmail.com en décrivant les travaux souhaités."],
              ["Quels secteurs desservez-vous?", "Communiquez avec nous afin de confirmer notre disponibilité dans votre municipalité."],
            ].map(([question, answer], i, items) => (
              <AccordionItem key={question} value={`item-${i + 1}`} className={`px-6 ${i < items.length - 1 ? "border-b border-border" : "border-b-0"}`}>
                <AccordionTrigger className="text-left font-bold text-lg py-6 hover:no-underline hover:text-secondary">{question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div>
          <span className="section-eyebrow text-secondary font-bold tracking-widest uppercase text-sm mb-4">Coordonnées</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-secondary">Parlons de votre projet.</h2>
          <p className="text-muted-foreground mb-10">Vous planifiez des travaux de construction, de rénovation, de toiture ou un projet de béton estampé? Communiquez avec MZT Construction pour en discuter.</p>

          <div className="bg-white border border-border p-5 sm:p-8 h-auto mb-10">
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-muted p-3">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-secondary mb-1">Entreprise</h4>
                  <p className="text-muted-foreground">MZT Construction (2018) inc.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-muted p-3">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-secondary mb-1">Téléphone</h4>
                  <a className="text-muted-foreground hover:text-secondary" href="tel:+14188836242">(418) 883-6242</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-muted p-3">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-secondary mb-1">Courriel</h4>
                  <a className="text-muted-foreground hover:text-secondary break-all" href="mailto:jstanguay3@hotmail.com">jstanguay3@hotmail.com</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex min-h-[220px] w-full items-center justify-center bg-[#1B1B1B] px-6 py-12 text-center text-white">
        <div className="max-w-2xl">
          <p className="section-eyebrow justify-center text-white font-bold tracking-widest uppercase text-sm mb-4">Votre projet</p>
          <p className="text-lg leading-relaxed text-white/75">Le territoire desservi n’étant pas précisé, communiquez avec MZT Construction pour confirmer la disponibilité dans votre municipalité.</p>
        </div>
      </div>
    </section>
  );
}
