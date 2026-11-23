---
name: Hébergement et contrôles de confidentialité
description: Les outils ajoutés par l’hébergement échappent aux contrôles de consentement locaux du site.
---

Ne pas conclure à l’absence de statistiques ou de collecte en lisant seulement le code du site. Auditer également le HTML publié et les options de publication. Un éventuel contrôle local de consentement à une carte ne contrôlerait pas les scripts ajoutés par l’hébergeur.

**Why:** Le site publié comportait des outils de statistiques et de rétroaction ajoutés par la plateforme, absents des sources applicatives. Afficher une bannière locale n’aurait pas bloqué ces outils.

**How to apply:** Pour les travaux de confidentialité, distinguer les services contrôlés par l’application de ceux activés dans la publication. Ne jamais promettre une conformité complète ou l’absence de suivi sans vérifier les deux.

Lors d’une intégration Cookiebot avec blocage automatique, vérifier le HTML final compilé, pas seulement le script module source.

**Why:** Vite recrée la balise du module principal et retire l’attribut personnalisé qui l’exemptait du blocage; il faut conserver le fonctionnement du formulaire indépendamment des choix statistiques et publicitaires.

**How to apply:** Exempter uniquement le démarrage nécessaire de l’application dans le HTML final. Ne pas exempter les cartes ou outils de suivi pour contourner le consentement. Vérifier séparément les domaines autorisés Cookiebot et les règles de consentement des balises GTM sur le site publié.
