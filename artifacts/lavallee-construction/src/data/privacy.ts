export const privacyContact = {
  title: "Responsable de la protection des renseignements personnels",
  email: "mztconstruction2018@hotmail.com",
  phone: "(418) 883-6242",
  phoneHref: "tel:+14188836242",
  emailHref: "mailto:mztconstruction2018@hotmail.com?subject=Confidentialit%C3%A9",
};

export const privacyUpdated = {
  iso: "2026-11-16",
  label: "16 novembre 2026",
};

export const privacyIntro =
  "MZT Construction (2018) inc. explique ici comment les renseignements personnels sont traités dans le cadre de son site et des demandes qui lui sont adressées. Cette politique tient compte de la Loi sur la protection des renseignements personnels dans le secteur privé du Québec, telle que modifiée par la Loi 25.";

export interface PrivacySection {
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
  links?: { label: string; href: string }[];
}

export const privacySections: PrivacySection[] = [
  {
    id: "responsable",
    title: "1. Joindre la personne responsable",
    paragraphs: [
      "Adressez toute question, demande d’accès ou de rectification, demande de retrait de consentement ou plainte à notre responsable de la protection des renseignements personnels. Utilisez le courriel ou le téléphone ci-dessous en précisant que votre demande concerne la confidentialité.",
      "Cette fonction revient à la personne ayant la plus haute autorité dans l’entreprise, sauf délégation écrite à une autre personne, conformément à la loi.",
    ],
  },
  {
    id: "renseignements",
    title: "2. Les renseignements concernés",
    paragraphs: [
      "Lorsque vous demandez une soumission, le formulaire vous demande les renseignements suivants. N’inscrivez pas de données sensibles ou de renseignements sur des tiers qui ne sont pas nécessaires à votre projet.",
    ],
    items: [
      "Prénom, nom, adresse courriel et numéro de téléphone.",
      "Municipalité du projet, type de travaux, envergure approximative, échéancier et description du projet.",
      "Photos, documents et autres précisions uniquement si vous décidez de les joindre vous-même à un courriel.",
      "Renseignements techniques pouvant être traités par l’hébergeur lors d’une connexion : adresse IP, date et heure, ressource demandée et informations sur le navigateur, notamment pour acheminer les pages et assurer la sécurité du service.",
      "Commentaires, captures d’écran ou fichiers que vous choisissez de transmettre avec l’outil de rétroaction de Replit, lorsque cet outil est affiché.",
    ],
  },
  {
    id: "formulaire",
    title: "3. Ce que fait réellement le formulaire",
    paragraphs: [
      "Les champs sont traités dans votre navigateur. Le bouton final prépare un courriel dans votre application de messagerie avec les détails saisis. Vous devez ensuite envoyer ce courriel vous-même.",
      "Le site n’envoie pas automatiquement votre demande, ne téléverse aucune pièce jointe et ne possède pas de base de données enregistrant les champs du formulaire. Les renseignements parviennent à MZT lorsque vous envoyez effectivement le courriel. Votre fournisseur de messagerie intervient alors aussi dans cet envoi.",
      "Vous pouvez quitter le formulaire sans envoyer de courriel, communiquer par téléphone ou écrire directement à l’entreprise. Ne pas fournir les renseignements nécessaires peut limiter notre capacité à évaluer le projet ou à vous répondre.",
    ],
  },
  {
    id: "utilisation",
    title: "4. Pourquoi utiliser ces renseignements",
    paragraphs: [
      "Les renseignements communiqués servent à comprendre votre besoin, évaluer les travaux, répondre à vos questions, préparer une soumission et assurer le suivi demandé. Si vous nous confiez des travaux, les renseignements nécessaires servent aussi à gérer cette relation et à respecter les obligations légales applicables.",
      "Le formulaire n’entraîne aucun abonnement à une infolettre ni aucune inscription à des messages promotionnels. Le site ne prend pas de décision automatisée à votre sujet et n’effectue pas de profilage publicitaire.",
    ],
  },
  {
    id: "carte-et-temoins",
    title: "5. Carte Google Maps et témoins",
    paragraphs: [
      "Les polices de caractères sont hébergées avec le site. Le code applicatif n’installe pas de témoin publicitaire et n’enregistre pas les champs du formulaire dans le stockage persistant de votre navigateur.",
      "L’hébergement peut ajouter ses propres outils de statistiques et de rétroaction, distincts de la carte. La présente politique ne signifie donc pas qu’aucun renseignement technique n’est traité lors de votre visite.",
      "La carte Google Maps se charge automatiquement sur les pages d’accueil et de soumission. Dès son chargement, une connexion est établie avec Google, qui peut recevoir votre adresse IP et des renseignements sur votre navigateur et utiliser ses propres témoins, selon votre configuration et ses politiques. Le site ne demande pas l’accès à la localisation de votre appareil.",
      "La gestion des témoins de Google se fait dans votre navigateur ou votre compte Google. Les réglages de protection contre les contenus tiers de votre navigateur peuvent limiter le chargement de la carte ou ses fonctionnalités.",
    ],
    links: [
      { label: "Politique de confidentialité de Google", href: "https://policies.google.com/privacy?hl=fr-CA" },
    ],
  },
  {
    id: "fournisseurs",
    title: "6. Fournisseurs et traitement hors du Québec",
    paragraphs: [
      "Le site est hébergé sur Replit. L’hébergement du site publié comprend des outils de statistiques de fréquentation et de rétroaction : pages consultées, provenance des visites, pays approximatif, navigateur et appareil, ainsi que les commentaires ou pièces que vous choisissez de transmettre. Ces outils sont distincts du formulaire de soumission.",
      "Les courriels envoyés à notre adresse Hotmail sont acheminés par les services de messagerie de Microsoft. Google intervient lors du chargement automatique de la carte. Ces fournisseurs peuvent traiter des renseignements techniques ou le contenu qui leur est confié selon leurs services et leurs propres politiques.",
      "Le recours à ces services peut entraîner un traitement ou un hébergement de renseignements à l’extérieur du Québec. Vous pouvez demander à notre responsable des précisions sur les fournisseurs et les communications applicables à votre dossier.",
      "Les courriels destinés à l’entreprise s’adressent aux personnes chargées de répondre aux demandes et de suivre les projets. Toute autre utilisation ou communication doit reposer sur votre consentement ou sur une disposition de la loi.",
    ],
    links: [
      { label: "Politique de confidentialité de Replit", href: "https://replit.com/privacy" },
      { label: "Déclaration de confidentialité de Microsoft", href: "https://privacy.microsoft.com/fr-ca/privacystatement" },
    ],
  },
  {
    id: "conservation",
    title: "7. Conservation et protection",
    paragraphs: [
      "Le site ne constitue pas un registre des demandes de soumission. Les courriels et dossiers reçus par l’entreprise doivent être conservés uniquement pendant la durée nécessaire au traitement de votre demande, au suivi du projet et aux obligations légales applicables, puis être détruits ou anonymisés conformément à la loi.",
      "La durée applicable dépend de la nature du dossier et des obligations qui s’y rattachent. Pour connaître celle de votre dossier, adressez-vous à notre responsable. Les journaux et données techniques des fournisseurs relèvent aussi de leurs propres règles de conservation.",
      "Le site publié utilise une connexion HTTPS. La protection des courriels et des dossiers dépend également de la sécurité de la messagerie et des pratiques de l’entreprise. Aucune transmission électronique n’est sans risque : limitez les renseignements envoyés à ceux qui sont nécessaires.",
    ],
  },
  {
    id: "droits",
    title: "8. Vos droits et vos choix",
    paragraphs: [
      "Sous réserve des conditions et exceptions prévues par la loi, vous pouvez exercer les droits suivants auprès de notre responsable.",
    ],
    items: [
      "Demander confirmation de l’existence de renseignements vous concernant et y avoir accès.",
      "Faire rectifier des renseignements inexacts, incomplets ou équivoques.",
      "Retirer votre consentement pour les utilisations qui reposent sur celui-ci, sous réserve des obligations légales ou contractuelles; ce retrait ne rend pas illégales les utilisations antérieures licites.",
      "Demander la suppression de renseignements qui ne sont plus nécessaires, sous réserve des obligations de conservation.",
      "Demander, lorsque la loi le prévoit, les renseignements informatisés recueillis auprès de vous dans un format technologique structuré et couramment utilisé.",
    ],
  },
  {
    id: "demandes-et-plaintes",
    title: "9. Demandes, plaintes et incidents",
    paragraphs: [
      "Présentez vos demandes d’accès ou de rectification par écrit à notre responsable. Précisez les renseignements ou le dossier concernés. Une vérification raisonnable de votre identité peut être nécessaire. La loi prévoit une réponse à une demande d’accès ou de rectification au plus tard 30 jours après sa réception.",
      "Pour une plainte ou un incident présumé, décrivez la situation et le moyen de vous joindre, sans transmettre plus de renseignements sensibles que nécessaire. En cas d’incident présentant un risque de préjudice sérieux, la loi exige notamment d’aviser la Commission d’accès à l’information et les personnes concernées.",
      "Vous pouvez également vous adresser à la Commission d’accès à l’information du Québec pour obtenir de l’information sur vos droits ou exercer un recours.",
    ],
    links: [
      { label: "Commission d’accès à l’information du Québec", href: "https://www.cai.gouv.qc.ca/" },
    ],
  },
  {
    id: "modifications",
    title: "10. Mise à jour de cette politique",
    paragraphs: [
      "Cette politique entre en vigueur le 16 novembre 2026. Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour. Un avis supplémentaire sera diffusé lorsque la loi l’exige. Consultez cette page lorsque vous utilisez le site ou communiquez de nouveaux renseignements.",
    ],
    links: [
      { label: "Loi sur la protection des renseignements personnels dans le secteur privé", href: "https://www.legisquebec.gouv.qc.ca/fr/document/lc/P-39.1" },
      { label: "Guide de la Commission sur les politiques de confidentialité", href: "https://www.cai.gouv.qc.ca/uploads/pdfs/CAI_GU_POL_Confidentialite.pdf" },
    ],
  },
];
