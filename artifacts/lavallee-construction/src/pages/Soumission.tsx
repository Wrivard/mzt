import { useState } from "react";
import { certificationLogos, pageCopy } from "@/data/site";
import { MainLayout } from "@/components/layout/MainLayout";
import { FAQContactSection } from "@/components/SharedSections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { QuoteAttachments } from "@/components/QuoteAttachments";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Building2,
  HardHat,
  Home,
  Mail,
  Phone,
  Layers,
  Snowflake,
} from "lucide-react";

const formSchema = z.object({
  projectType: z.string().min(1, "Veuillez sélectionner un type de projet"),
  timeline: z.string().min(1, "Veuillez sélectionner un délai"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  city: z.string().min(2, "Veuillez entrer la ville du projet"),
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: z.string().email("Adresse courriel invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
});

type FormValues = z.infer<typeof formSchema>;

function downloadArchive(archive: File) {
  const url = URL.createObjectURL(archive);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = archive.name;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

export default function Soumission() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attachmentArchive, setAttachmentArchive] = useState<File | null>(null);
  const [isPreparingAttachments, setIsPreparingAttachments] = useState(false);

  const { register, control, handleSubmit, trigger, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectType: "",
      timeline: "",
      description: "",
      city: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    mode: "onTouched",
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    if (step === 1) fieldsToValidate = ["projectType", "timeline"];
    if (step === 2) fieldsToValidate = ["description", "city"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = (data: FormValues) => {
    const body = [
      `Nom : ${data.firstName} ${data.lastName}`,
      `Téléphone : ${data.phone}`,
      `Courriel : ${data.email}`,
      `Ville du projet : ${data.city}`,
      `Type de projet : ${data.projectType}`,
      `Échéancier souhaité : ${data.timeline}`,
      "",
      `Description du projet : ${data.description}`,
      "",
      attachmentArchive
        ? "Une archive ZIP a été téléchargée. Ajoutez-la à ce courriel avant de l'envoyer."
        : "Vous pouvez joindre des photos ou des documents directement à ce courriel avant de l'envoyer.",
    ].join("\n");

    if (attachmentArchive) {
      downloadArchive(attachmentArchive);
    }

    window.location.href = `mailto:mztconstruction2018@hotmail.com?subject=${encodeURIComponent(`Demande de soumission — ${data.firstName} ${data.lastName}`)}&body=${encodeURIComponent(body)}`;
    setIsSubmitted(true);
  };

  const steps = [
    { num: 1, title: "Projet" },
    { num: 2, title: "Détails" },
    { num: 3, title: "Coordonnées" },
  ];

  const projectTypes = [
    { id: "construction-residentielle", value: "Construction résidentielle", label: "Construction résidentielle", icon: Home },
    { id: "construction-commerciale", value: "Construction commerciale", label: "Construction commerciale", icon: Building2 },
    { id: "refection-toiture", value: "Réfection de toiture", label: "Réfection de toiture", icon: HardHat },
    { id: "deneigement-toiture", value: "Déneigement de toiture", label: "Déneigement de toiture", icon: Snowflake },
    { id: "revetement-exterieur", value: "Revêtement extérieur", label: "Revêtement extérieur", icon: Layers },
    { id: "renovation-residentielle", value: "Rénovation résidentielle", label: "Rénovation résidentielle", icon: Home },
    { id: "autre", value: "Autre", label: "Autre projet", icon: CircleHelp },
  ];

  const trustItems = [
    { icon: Home, title: "Construction résidentielle", detail: "Projets résidentiels" },
    { icon: Building2, title: "Construction commerciale", detail: "Projets commerciaux" },
    { icon: HardHat, title: "Réfection de toiture", detail: "Travaux selon le bâtiment" },
    { icon: Snowflake, title: "Déneigement de toiture", detail: "Interventions hivernales" },
    { icon: Layers, title: "Revêtement extérieur", detail: "Travaux selon le bâtiment" },
    { icon: Home, title: "Rénovation résidentielle", detail: "Transformation de votre propriété" },
  ];

  return (
    <MainLayout>
      <section id="soumission" className="relative isolate overflow-hidden bg-forest text-white">
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src="/photos/mzt/cuisine.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(17,18,15,0.88)_0%,rgba(17,18,15,0.7)_48%,rgba(17,18,15,0.55)_100%)]" />
        </div>

        <div className="container relative z-10 mx-auto grid w-full items-center gap-10 px-6 pb-14 pt-[132px] sm:px-8 md:gap-12 md:px-12 md:pb-20 md:pt-[150px] xl:min-h-[100dvh] xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:gap-20 xl:pt-[170px] xl:pb-24">
          <div className="max-w-xl">
            <span className="section-eyebrow mb-6 uppercase text-white/75">
              MZT Construction
            </span>
            <h1 id="soumission-title" className="mb-6 max-w-lg text-[clamp(2rem,9vw,2.25rem)] font-bold leading-[1.03] tracking-[-0.03em] text-white sm:text-5xl xl:text-[3.6rem]">
              {pageCopy.quote.heading}
            </h1>
            <p className="max-w-[34rem] text-base leading-relaxed text-white/75 sm:text-lg">
              {pageCopy.quote.intro}
            </p>

            <div className="mt-10 sm:mt-12">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">Nos spécialités</p>
              <div className="grid grid-cols-1 gap-x-8 gap-y-5 min-[420px]:grid-cols-2">
                {trustItems.map(({ icon: Icon, title, detail }) => (
                  <div key={title} className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.08] ring-1 ring-white/10">
                      <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold leading-snug text-white">{title}</p>
                      <p className="mt-0.5 text-xs leading-snug text-white/60">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-6 text-sm text-white/80">
              <a data-testid="link-quote-phone" href="tel:+14188836242" className="inline-flex min-w-0 max-w-full items-start gap-2 transition-colors hover:text-white">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="min-w-0 break-words">Jean-Sébastien Tanguay : (418) 883-6242</span>
              </a>
              <a data-testid="link-quote-phone-secondary" href="tel:+14185706620" className="inline-flex min-w-0 max-w-full items-start gap-2 transition-colors hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span className="min-w-0 break-words">Sébastien Morin : (418) 570-6620</span>
              </a>
              <a data-testid="link-quote-email" href="mailto:mztconstruction2018@hotmail.com" className="inline-flex min-w-0 items-center gap-2 transition-colors hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span className="min-w-0 break-all">mztconstruction2018@hotmail.com</span>
              </a>
            </div>

            <section aria-labelledby="quote-certifications-title" className="mt-8 border-t border-white/15 pt-5">
              <h2 id="quote-certifications-title" className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
                Certifications
              </h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {certificationLogos.map((logo) => (
                  <figure key={logo.src} className="flex h-12 items-center justify-center">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="block max-h-9 w-full max-w-[160px] object-contain brightness-0 invert opacity-90"
                      loading="lazy"
                    />
                  </figure>
                ))}
              </div>
            </section>
          </div>

          <div className="min-w-0 overflow-hidden rounded-xl bg-background text-foreground shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] ring-1 ring-black/5">
              {isSubmitted ? (
                <div className="text-center px-6 py-16 sm:px-10" role="status">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-secondary">Votre courriel est prêt</h2>
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-8 max-w-lg mx-auto">
                    Votre messagerie devrait s’ouvrir avec les détails du projet. {attachmentArchive ? "Ajoutez le fichier ZIP téléchargé au courriel avant de l’envoyer." : "Vous pouvez y joindre des photos ou des documents."} Rien n’a été envoyé automatiquement par le site. Si votre messagerie ne s’ouvre pas, écrivez directement à <a className="break-all underline underline-offset-4" href="mailto:mztconstruction2018@hotmail.com">mztconstruction2018@hotmail.com</a>.
                  </p>
                  {attachmentArchive && (
                    <Button
                      type="button"
                      variant="outline"
                      className="mb-3 h-12 rounded-md px-6 text-[13px] font-bold"
                      onClick={() => downloadArchive(attachmentArchive)}
                    >
                      Télécharger à nouveau l’archive ZIP
                    </Button>
                  )}
                  <Button className="h-12 rounded-md uppercase tracking-[0.12em] text-[13px] font-bold px-8" onClick={() => window.location.href = "/"}>
                    Retour à l'accueil
                  </Button>
                </div>
              ) : (
                <>
                  {/* Business Stepper */}
                  <ol className="grid grid-cols-3 gap-2 border-b border-border bg-muted/70 px-5 py-5 sm:gap-4 sm:px-8" aria-label="Progression">
                    {steps.map(s => (
                      <li key={s.num} aria-current={step === s.num ? "step" : undefined} className={`relative flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center sm:gap-3 ${step === s.num ? 'opacity-100' : step > s.num ? 'opacity-75' : 'opacity-45'}`}>
                         <div className={`flex h-8 w-8 aspect-square shrink-0 items-center justify-center rounded-full text-center font-bold text-sm leading-none ${step >= s.num ? 'bg-primary text-primary-foreground' : 'border border-border bg-white text-muted-foreground'}`}>
                          {step > s.num ? <CheckCircle2 className="w-4 h-4"/> : s.num}
                        </div>
                         <div>
                           <p className="text-[10px] font-bold uppercase leading-none tracking-wide text-secondary sm:text-xs sm:tracking-wider">{s.title}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div className="h-0.5 bg-border" aria-hidden="true">
                    <div className="h-full bg-primary transition-transform duration-500 origin-left" style={{ transform: `scaleX(${step / 3})` }} />
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="p-5 sm:p-8 xl:p-10">
                    
                    {/* STEP 1 */}
                    {step === 1 && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div>
                          <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[hsl(80_91%_25%)]">Étape 1 · Projet</span>
                          <h2 className="text-xl font-bold leading-tight text-secondary sm:text-[1.6rem]">Quel type de projet avez-vous en tête&nbsp;?</h2>
                          <p className="mt-2 text-sm text-muted-foreground">Choisissez la catégorie qui décrit le mieux vos besoins.</p>
                        </div>

                        <div className="space-y-3">
                          <Label id="label-projectType" className="font-semibold text-secondary">Type de projet *</Label>
                          <Controller
                            name="projectType"
                            control={control}
                            render={({ field }) => (
                              <div role="group" aria-labelledby="label-projectType" className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
                                {projectTypes.map(({ id, value, label, icon: Icon }) => {
                                  const selected = field.value === value;
                                  return (
                                    <button
                                      key={id}
                                      type="button"
                                      aria-pressed={selected}
                                      data-testid={`button-project-type-${id}`}
                                      onClick={() => field.onChange(value)}
                                      className={`flex min-h-[86px] flex-col items-center justify-center gap-2 rounded-lg border px-2.5 py-3 text-center text-xs font-semibold leading-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:min-h-[90px] sm:text-sm ${
                                        selected
                                          ? "border-primary bg-primary/[0.07] text-secondary ring-1 ring-primary"
                                          : "border-border bg-background text-secondary hover:border-secondary/30 hover:bg-muted/60"
                                      }`}
                                    >
                                      <Icon className={`h-5 w-5 ${selected ? "text-primary" : "text-muted-foreground"}`} aria-hidden="true" />
                                      <span>{label}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          />
                          {errors.projectType && <p role="alert" className="text-destructive text-sm font-medium">{errors.projectType.message}</p>}
                        </div>

                        <div className="space-y-2.5">
                            <Label htmlFor="field-timeline" className="font-semibold text-secondary">Échéancier souhaité *</Label>
                            <Controller
                              name="timeline"
                              control={control}
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger id="field-timeline" aria-invalid={!!errors.timeline} data-testid="select-project-timeline" className="h-auto min-h-14 gap-2 whitespace-normal rounded-md border-border bg-background text-left focus:ring-2 focus:ring-primary/40 focus:border-primary [&>span]:line-clamp-none [&>span]:whitespace-normal [&>svg]:shrink-0">
                                       <SelectValue placeholder="Quand souhaitez-vous réaliser les travaux?" />
                                  </SelectTrigger>
                                  <SelectContent className="rounded-lg">
                                    <SelectItem value="des-que-possible">Dès que possible</SelectItem>
                                    <SelectItem value="prochaines-semaines">Dans les prochaines semaines</SelectItem>
                                    <SelectItem value="prochains-mois">Dans les prochains mois</SelectItem>
                                    <SelectItem value="a-determiner">À déterminer</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            {errors.timeline && <p role="alert" className="text-destructive text-sm font-medium">{errors.timeline.message}</p>}
                        </div>
                      </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-3">
                          <Label htmlFor="field-description" className="font-semibold text-secondary">Description détaillée du projet *</Label>
                          <Textarea 
                            id="field-description"
                              aria-invalid={!!errors.description}
                              {...register("description")}
                              placeholder="Décrivez les travaux que vous souhaitez réaliser..."
                             className="min-h-[180px] rounded-md border-border bg-background text-base focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary resize-y"
                          />
                          {errors.description && <p role="alert" className="text-destructive text-sm font-medium">{errors.description.message}</p>}
                        </div>
                        
                        <div className="space-y-3">
                            <Label htmlFor="field-city" className="font-semibold text-secondary">Ville du projet *</Label>
                          <Input 
                              id="field-city"
                              aria-invalid={!!errors.city}
                              {...register("city")}
                              placeholder="Ville où se situe le projet"
                            className="h-12 rounded-md border-border bg-background text-base focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary"
                          />
                            {errors.city && <p role="alert" className="text-destructive text-sm font-medium">{errors.city.message}</p>}
                        </div>
                        <QuoteAttachments
                          onArchiveChange={setAttachmentArchive}
                          onBusyChange={setIsPreparingAttachments}
                        />
                      </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="field-firstName" className="font-semibold text-secondary">Prénom *</Label>
                            <Input 
                              id="field-firstName"
                              aria-invalid={!!errors.firstName}
                              {...register("firstName")} 
                            className="h-12 rounded-md border-border bg-background text-base focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary"
                            />
                            {errors.firstName && <p role="alert" className="text-destructive text-sm font-medium">{errors.firstName.message}</p>}
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="field-lastName" className="font-semibold text-secondary">Nom *</Label>
                            <Input 
                              id="field-lastName"
                              aria-invalid={!!errors.lastName}
                              {...register("lastName")} 
                              className="h-12 rounded-md border-border bg-background text-base focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary"
                            />
                            {errors.lastName && <p role="alert" className="text-destructive text-sm font-medium">{errors.lastName.message}</p>}
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="field-email" className="font-semibold text-secondary">Courriel *</Label>
                            <Input 
                              type="email"
                              id="field-email"
                              aria-invalid={!!errors.email}
                              {...register("email")} 
                              className="h-12 rounded-md border-border bg-background text-base focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary"
                            />
                            {errors.email && <p role="alert" className="text-destructive text-sm font-medium">{errors.email.message}</p>}
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="field-phone" className="font-semibold text-secondary">Téléphone *</Label>
                            <Input 
                              type="tel"
                              id="field-phone"
                              aria-invalid={!!errors.phone}
                              {...register("phone")} 
                              className="h-12 rounded-md border-border bg-background text-base focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary"
                            />
                            {errors.phone && <p role="alert" className="text-destructive text-sm font-medium">{errors.phone.message}</p>}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                      {step > 1 ? (
                        <Button data-testid="button-form-back" type="button" variant="outline" onClick={prevStep} className="h-12 w-full rounded-md px-6 text-[13px] font-bold uppercase tracking-[0.12em] sm:w-auto">
                          <ArrowLeft className="mr-2 w-4 h-4" /> Retour
                        </Button>
                      ) : <div className="hidden sm:block"></div>}
                      
                      {step < 3 ? (
                        <Button data-testid="button-form-next" type="button" onClick={nextStep} className="h-12 w-full rounded-md px-8 text-[13px] font-bold uppercase tracking-[0.12em] hover:bg-[hsl(80_91%_40%)] sm:w-auto">
                          Suivant <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                      ) : (
                         <Button data-testid="button-form-submit" type="submit" disabled={isPreparingAttachments} className="h-12 w-full rounded-md bg-forest px-8 text-[13px] font-bold uppercase tracking-[0.12em] text-white hover:bg-forest/90 disabled:cursor-wait disabled:opacity-60 sm:w-auto">
                           {isPreparingAttachments ? "Préparation des fichiers…" : "Envoyer ma demande"}
                        </Button>
                      )}
                    </div>

                  </form>
                </>
              )}
            </div>
        </div>
      </section>

      {/* FAQ & Contact */}
      <FAQContactSection />
      
    </MainLayout>
  );
}
