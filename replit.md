# MZT Construction

Site vitrine en français canadien pour MZT Construction (2018) inc., entrepreneur en construction résidentielle et commerciale, rénovation résidentielle, réfection et déneigement de toiture et revêtement extérieur.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/lavallee-construction run dev` — run the website through its managed workflow
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/lavallee-construction/src/` — pages, reusable sections, and site interactions
- `artifacts/lavallee-construction/src/index.css` — global palette and visual tokens
- `artifacts/lavallee-construction/public/` — client-supplied logo and media assets
- Utiliser les photos fournies pour les réalisations et le fond d’accueil. Seule exception autorisée : une image générée pour illustrer le déneigement de toiture, clairement identifiée et jamais présentée comme une réalisation photographiée de MZT.

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

- Site vitrine en français canadien pour MZT Construction (2018) inc.
- Services confirmés, dans l’ordre demandé : construction résidentielle, construction commerciale, réfection de toiture, déneigement de toiture, revêtement extérieur, rénovation résidentielle.
- Le questionnaire d’onboarding fourni fait foi pour les renseignements métier : appliquer ses corrections de coordonnées plutôt que le numéro prérempli.
- Fondation en 2018; plus de 15 ans d’expérience dans le domaine (pas 15 ans d’existence de l’entreprise); plus de 400 projets réalisés.
- Demande de soumission en trois étapes qui prépare un courriel dans la messagerie du visiteur; aucune transmission automatique ni téléversement de fichiers

## User preferences

- Garder la structure du site et le noir `#1B1B1B` de la navigation, du pied de page et du texte; utiliser le vert du logo MZT comme accent, assombri d’environ 20 %.
- Ne pas inventer de réalisations, adresse, territoire desservi, années d’expérience ou garanties.
- Le questionnaire indique APCHQ, GCR et RBQ. Le logo fourni est celui de l’ACQ, pas de l’APCHQ : conserver temporairement ce logo comme annoncé à l’utilisateur, jusqu’à réception du bon visuel.
- Utiliser les chiffres confirmés par le questionnaire plutôt que les statistiques du gabarit; ne pas réintroduire une garantie non confirmée.
- Garder la section témoignages comme témoignages et ne publier que des avis vérifiés; conserver les espaces réservés jusqu’à réception d’avis authentiques.
- Utiliser les photos de réalisations fournies par MZT Construction; ne pas réattribuer les photos d’autres clients.
- Ne pas réutiliser la même photo à plusieurs endroits du site; choisir des visuels distincts et adaptés au contenu.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- Questionnaire métier validé : `attached_assets/Pasted-Questionnaire-d-onboarding-Cr-ation-de-site-web-Confirm_1794852449802.txt`
- Archive de photos fournie par le client : `attached_assets/Photos-20261116T180636Z-1-001_1794852962371.zip`. Ne publier ni les noms de clients ni les adresses présents dans les noms de dossiers.

## Confidentialité et pages publiques

- Les points que MZT doit valider avant publication sont consignés dans `artifacts/lavallee-construction/docs/confidentialite-validation.md`. Une politique en ligne ne vaut pas validation juridique de toutes les pratiques de l’entreprise.
- L’utilisateur a confirmé le courriel actuel de MZT (`mztconstruction2018@hotmail.com`) pour les demandes de confidentialité. Ne pas nommer arbitrairement l’un des contacts commerciaux responsable; le titre fonctionnel est affiché sans lui attribuer une identité non confirmée.
- Toute modification des services tiers, de l’envoi du formulaire ou de la conservation des données exige de revoir la politique de confidentialité.
- L’utilisateur demande que la carte s’affiche automatiquement sur les deux pages, sans écran d’activation, et que l’avis « Ce formulaire prépare un courriel… » et son lien de confidentialité soient retirés du formulaire.
