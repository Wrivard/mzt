# Cookiebot et Google Tag Manager

- Groupe Cookiebot : `4631a8e3-a162-4134-8659-a678be5f061f`.
- Conteneur GTM : `GTM-MLGVF778`.
- Les scripts sont insérés uniquement lors du build de production, dans chaque page HTML pré-rendue, y compris la 404. Le serveur de développement Replit ne les charge pas.
- L’état de consentement Google est initialisé à `denied` avant Cookiebot et GTM. Cookiebot est synchrone, en mode de blocage automatique et en français. Il communique ensuite les choix à Google Consent Mode.
- Les scripts nécessaires au démarrage de React et au fonctionnement du formulaire sont exclus du blocage. La carte n’est pas exemptée du consentement : Cookiebot peut la bloquer selon sa classification.
- La déclaration Cookiebot est chargée dans la politique de confidentialité, après hydratation React, et supprimée du conteneur au changement de page. Elle n’est pas insérée dans le head, où son contenu n’aurait pas sa place.
- Aucun iframe GTM `noscript` n’est ajouté : sans JavaScript, il contournerait les choix de consentement. Le contenu du site reste accessible sans JavaScript.

## À vérifier avant et après publication

1. Autoriser `mztconstruction.ca` et `www.mztconstruction.ca` dans le groupe de domaines Cookiebot. Autoriser les domaines Vercel de prévisualisation uniquement si désiré; un build de production sur un domaine non enregistré peut afficher une erreur Cookiebot.
2. Lancer le scan Cookiebot, vérifier la classification des services et la configuration de la bannière, du refus et du retrait.
3. Vérifier dans GTM les contrôles de consentement de **chaque** balise, y compris les balises HTML personnalisées. Ne pas installer une deuxième instance Cookiebot ou GTM dans le conteneur.
4. Redéployer Vercel, puis vérifier dans un navigateur vierge les scénarios refus, acceptation partielle, acceptation totale, retour sur le site et retrait du consentement. Vérifier la carte et le formulaire.
5. Le chargement du conteneur ne prouve pas qu’une balise Analytics ou Ads est configurée ou publiée. Consent Mode peut transmettre des signaux sans témoins selon les balises Google; le refus de stockage n’est pas une garantie d’absence de requêtes réseau.

L’intégration ne constitue pas une validation juridique de conformité à la Loi 25 et ne contrôle pas les outils ajoutés séparément par un hébergeur.

Références : https://www.cookiebot.com/en/developer/ et https://developers.google.com/tag-platform/security/guides/consent
