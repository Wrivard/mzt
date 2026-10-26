# MZT Construction

Site vitrine en français canadien pour MZT Construction (2018) inc., entrepreneur en construction et rénovation résidentielle, réfection et déneigement de toiture et béton estampé.

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
- Use only photos provided for MZT Construction; do not add stock or generated imagery.

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

- Site vitrine en français canadien pour MZT Construction (2018) inc.
- Services confirmés : construction, rénovation, réfection de toiture, déneigement de toiture et béton estampé; les réalisations montrent aussi des patios, terrasses et structures extérieures.
- Contact confirmé : (418) 883-6242 et jstanguay3@hotmail.com
- Demande de soumission en trois étapes qui prépare un courriel dans la messagerie du visiteur; aucune transmission automatique ni téléversement de fichiers

## User preferences

- Garder la structure du site et le noir `#1B1B1B` de la navigation, du pied de page et du texte; utiliser le vert du logo MZT comme accent, assombri d’environ 20 %.
- Ne pas inventer de réalisations, adresse, territoire desservi, années d’expérience ou garanties; afficher uniquement les logos ACQ, GCR et RBQ fournis.
- Conserver les statistiques du gabarit à l’identique.
- Garder la section témoignages comme témoignages et ne publier que des avis vérifiés; conserver les espaces réservés jusqu’à réception d’avis authentiques.
- Utiliser les photos de réalisations fournies par MZT Construction; ne pas réattribuer les photos d’autres clients.
- Ne pas réutiliser la même photo à plusieurs endroits du site; choisir des visuels distincts et adaptés au contenu.
- Conserver inchangés les compteurs et statistiques du gabarit; utiliser uniquement des témoignages vérifiés.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
