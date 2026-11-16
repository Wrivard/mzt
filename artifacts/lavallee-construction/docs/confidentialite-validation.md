# Confidentialité : vérifications de l’entreprise avant publication

La page décrit le fonctionnement du site vérifié le 16 novembre 2026. Elle a été préparée en consultant la loi québécoise et le guide de la Commission d’accès à l’information. Elle ne constitue pas une validation juridique de l’ensemble des pratiques de MZT Construction.

## À confirmer par MZT Construction

- La personne ayant la plus haute autorité est responsable par défaut, sauf délégation écrite. L’utilisateur a confirmé l’utilisation du courriel actuel de MZT pour ces demandes. Confirmer le titre du responsable et le relais téléphonique. Aucun des deux contacts commerciaux n’a été arbitrairement nommé responsable.
- Définir et appliquer les règles de conservation et de destruction des courriels, soumissions et dossiers. Aucune durée chiffrée n’a été inventée sur le site.
- Confirmer les personnes ayant accès aux dossiers, les protections de la messagerie et des fichiers, les fournisseurs effectivement employés et les engagements contractuels nécessaires.
- Évaluer les facteurs relatifs à la vie privée avant de communiquer des renseignements hors du Québec lorsque la loi le requiert. La politique signale les traitements possibles hors Québec; elle ne prétend pas qu’une évaluation a déjà été réalisée.
- Maintenir le processus de demandes, de plaintes et de réponse aux incidents, les avis requis et le registre des incidents. Une politique en ligne ne remplace pas ces obligations.
- Faire valider le texte par la personne responsable ou un professionnel qualifié, puis l’actualiser si la collecte ou les services changent.

## Hébergement publié : outils ajoutés par Replit

La consultation du HTML public et de la documentation officielle a confirmé la présence d’un outil de statistiques (`i.replit.com/script.js`) et du widget de rétroaction de Replit. Ils sont ajoutés par l’hébergement, pas par le formulaire ni par le composant de carte.

Le bouton de la carte ne pilote pas ces outils. La politique ne promet donc ni zéro collecte technique ni l’absence de statistiques. Aucun suivi personnalisé n’a été ajouté dans cette intervention.

Avant de republier, vérifier les options **Enable analytics** et **Enable Feedback** dans la publication. Si ces services ne sont pas nécessaires, les désactiver lors de la prochaine publication. S’ils sont conservés, valider leurs conditions, les données traitées et les exigences de consentement applicables. Ne pas prétendre qu’une bannière locale bloque des scripts injectés indépendamment par l’hébergeur.

## Fonctionnement du site

- Le formulaire prépare un `mailto:`; il ne transmet pas automatiquement la demande. Lire la politique depuis le formulaire ouvre un nouvel onglet afin de ne pas perdre les champs saisis.
- Google Maps ne crée aucun iframe avant un clic explicite. Masquer la carte supprime l’iframe, mais n’efface pas les témoins déjà déposés par Google.
- La police est auto-hébergée; aucun appel à Google Fonts n’est nécessaire.
- Le domaine canonique est centralisé dans `src/data/site.ts`. Il a été obtenu des métadonnées de publication. En cas de changement de domaine, modifier cette valeur et reconstruire le site pour mettre à jour sitemap, robots, fichiers LLM et métadonnées.
- La compilation génère les fichiers publics et les pages HTML à partir des mêmes données que l’interface. Ne pas maintenir une seconde copie indépendante de la politique.

## Références

- https://www.legisquebec.gouv.qc.ca/fr/document/lc/P-39.1
- https://www.cai.gouv.qc.ca/uploads/pdfs/CAI_GU_POL_Confidentialite.pdf
- https://docs.replit.com/features/publishing/project-analytics
- https://docs.replit.com/build/enable-feedback
- https://docs.replit.com/features/deployment-customization/static-deployments-advanced
