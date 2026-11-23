# Publication Vercel et Resend

## Projet Vercel

- Importer ce dépôt avec **Root Directory = racine du dépôt**, pas le dossier de l’artefact.
- Le fichier `vercel.json` configure le build pnpm, le dossier statique et les réécritures des pages publiques. `api/quotes.ts` devient une fonction Node côté serveur.
- Node 22 ou plus récent et pnpm sont requis. Ne pas utiliser de runtime Edge.
- `api/tsconfig.json` active explicitement les types Node pour la compilation des fonctions par Vercel. La vérification locale `tsconfig.vercel.json` hérite de cette même configuration pour éviter une divergence entre les deux environnements.
- Le mode `ESNext` / `Bundler` est également déclaré directement dans les configurations de l’API et des bibliothèques serveur. Le compilateur Vercel choisit sinon `NodeNext` avant de résoudre les configurations héritées, ce qui casse les imports sans extension du workspace.
- `pnpm run check:vercel` reproduit cet ordre de configuration et vérifie les sources partagées sans dépendre de déclarations compilées localement. Cette vérification fait partie du build Vercel.
- Le site reste testable dans l’aperçu Replit par la route Express équivalente.
- Le domaine canonique et les fichiers SEO restent centralisés dans `artifacts/lavallee-construction/src/data/site.ts`. Lorsque le domaine final Vercel/personnalisé est connu, remplacer la valeur de `SITE_URL` et reconstruire; ne pas inventer de domaine.

## Variables Vercel

À définir côté serveur pour Production (et Preview si vous voulez y tester les envois) :

| Nom | Valeur |
| --- | --- |
| `RESEND_API_KEY` | Clé secrète créée sur https://resend.com/api-keys |
| `RESEND_FROM_EMAIL` | **bonjour@kua.quebec** |
| `RECIPIENT_EMAIL` | Adresse réelle qui doit recevoir les soumissions |

Ne pas préfixer ces noms par `VITE_`. Ne pas placer la clé dans Git ni dans le navigateur. Aucun destinataire d’exemple n’est utilisé comme valeur de repli. Sans configuration valide, le serveur retourne une erreur explicite, jamais un faux succès.

Dans Resend, vérifier le domaine **kua.quebec**, ses enregistrements DNS d’envoi et les permissions de la clé. Redéployer Vercel après modification des variables.

## Deux courriels

1. **Propriétaire** : coordonnées complètes, municipalité, service, échéancier lisible, description, référence et archive ZIP facultative. `Reply-To` = adresse du client.
2. **Client** : confirmation de réception, même récapitulatif et prochaines étapes. Pas de promesse de délai de réponse ni de disponibilité. `Reply-To` = `RECIPIENT_EMAIL`. Les pièces ne sont pas renvoyées au client.

Les modèles HTML responsive, compatibles avec les clients courriel grâce aux tableaux et styles intégrés, ont également une version texte. Ils sont définis dans `lib/quote-mail/src/templates.ts`.

Les deux messages sont envoyés séparément : l’API batch de Resend ne prend pas en charge les pièces jointes. L’envoi propriétaire est tenté en premier. Si seul l’accusé client échoue, l’interface indique que la demande a été transmise et évite d’inciter à la renvoyer. Un succès signifie **accepté par Resend**, pas une preuve de remise en boîte de réception; consulter les événements de remise/rebond dans Resend.

## Pièces jointes et limites

- Maximum 12 fichiers sélectionnés; 20 Mo par fichier source; 100 Mo de sources cumulées.
- Photos : compression locale, cible de 0,2 Mo par image et 1 600 pixels sur le plus grand côté.
- PDF : contenu conservé, pas de rasterisation qui rendrait les plans illisibles.
- ZIP final : **2 800 000 octets maximum**, transmis en base64 au serveur puis à Resend.
- La limite de requête standard Vercel est de 4,5 Mo. Le serveur utilise un budget JSON inférieur à 4,2 Mo; l’encodage base64 augmente la taille d’environ un tiers.
- Pas de stockage de fichiers, de base de données ni de service de compression payant ajouté. Les quotas et coûts Vercel/Resend dépendent des comptes; il ne s’agit pas d’une garantie de gratuité illimitée.

## Fiabilité et abus

- Validation serveur des champs et des formats; contenu HTML utilisateur échappé.
- `RECIPIENT_EMAIL` n’est jamais choisi par le navigateur.
- Clés d’idempotence Resend distinctes pour les deux messages, stables pour les tentatives identiques, conservées 24 h par Resend.
- Champ-piège, contrôle d’origine et limite de 5 tentatives par empreinte IP par tranche de 15 minutes **par instance**. Cette limite mémoire n’est pas distribuée sur toutes les instances Vercel. Configurer les règles Vercel Firewall/rate limiting adaptées au trafic avant une exposition importante; un champ-piège ne remplace pas une protection antibot.
- Aucun contenu du formulaire, pièce jointe ou clé n’est écrit dans les journaux applicatifs.
- Les fichiers restent temporaires dans le navigateur/serveur avant leur transmission; les copies courriel et l’historique du fournisseur restent soumis à leurs politiques. Faire valider la politique de confidentialité actualisée avant publication.

## Vérification

Les tests utilisent un transport simulé et n’envoient pas de courriels réels :

```sh
pnpm --filter @workspace/quote-mail test
pnpm --filter @workspace/lavallee-construction test
pnpm run typecheck
```

Après configuration Vercel et vérification DNS, effectuer une soumission avec une adresse de test maîtrisée et un petit PDF/photo non sensible. Confirmer les deux messages, l’archive propriétaire et le routage des réponses. Cette vérification réelle n’a pas été effectuée sans les variables.

Documentation consultée :
- https://resend.com/docs/api-reference/emails/send-email
- https://resend.com/docs/dashboard/emails/attachments
- https://resend.com/docs/dashboard/emails/idempotency-keys
- https://vercel.com/docs/functions/limitations
- https://vercel.com/docs/functions/runtimes/node-js
