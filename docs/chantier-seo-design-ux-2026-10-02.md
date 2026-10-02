# Chantier SEO, design et UX — 2 octobre 2026

Base : `origin/main` d238553. Branche isolée : `codex/site-seo-ux-20261002`. Les autres checkouts, dont la prévisualisation du 28 septembre, ont été préservés. Cette livraison modifie les pages existantes ; aucun article du backlog n'est publié.

## Résultat intégré

L’accueil conserve l’identité graphite/cuivre et sa photographie, mais expose sa cible installateurs dès le premier écran mobile. Le formulaire commence vers 696 px, contre 1 120 px dans l’audit. La hauteur à 390 px passe de 10 522 à environ 8 490 px (−19,3 %, mesure de laboratoire avec les sections fermées). Les blocs répétitifs ont été retirés ; les témoignages, la fondatrice, les offres et la démonstration du portail sont conservés.

Le menu mobile donne immédiatement accès au portail et aux destinations. Le parcours contact est raccourci et garde le choix issu du tarif. Trois forfaits principaux sont comparables : DP 119 € HT, Enedis + Consuel 89 € HT, ensemble 199 € HT. Les prestations EDF OA et aides restent distinctes. Les frais des organismes sont distingués des honoraires et doivent être précisés au cadrage ; cette livraison ne crée pas une nouvelle grille commerciale de frais inclus/exclus.

Les deux références Cerfa publiées sont actualisées en 16702*03, avec la fiche officielle accessible avant l’illustration. Les pages de service portent des titres commerciaux. Quatre articles proches ont un rôle éditorial explicite et des liens croisés, sans fusion ni redirection arbitraire. `/services` devient un guide de choix ; `/sunelys` devient une page d’identification et d’accès officiels, reliée depuis le pied de page.

## Mesure et consentement

Chaque réception serveur possède une référence aléatoire dans le commentaire CRM et la réponse JSON. Le consentement est renseigné comme `granted` ou `denied`. Le navigateur attend le callback de mesure avant redirection (avec une limite de 900 ms), déduplique les événements dans la session et ne compte que les réceptions confirmées. Une consultation directe ou un rechargement de `/merci` ne crée pas de conversion. Une réception sans consentement ne conserve pas de conversion à rejouer plus tard. Les tests explicitement identifiés sont exclus du suivi de conversion.

La vérification en lecture seule de GA4 confirme que `generate_lead` existe déjà comme événement clé, avec comptage `ONCE_PER_EVENT`. Il n’a pas été nécessaire de modifier les paramètres du compte. L’écart entre le CRM et GA4 ne prouve pas une unique cause historique : le consentement, les imports et les tests restent distincts.

Le rapport marketing lit désormais le champ `Commentaire`, utilise exactement N dates inclusives et distingue tests explicites, enregistrements à revoir et scores automatiques. Un score calculé ne constitue pas une qualification humaine. La déduplication des événements ne garantit pas une unicité transactionnelle du CRM entre deux requêtes HTTP indépendantes ; le bouton est verrouillé pendant l’envoi et les erreurs demandent de contacter Sunelys avant de renouveler une demande ambiguë.

## Traitement des 24 actions de l’audit

| ID | Traitement | État et limite |
|---|---|---|
| 01 | Cerfa 16702*03, FAQ, dates, source officielle | Intégré ; référence vérifiée le 2 octobre |
| 02 | Référence serveur, consentement, attente avant redirection, déduplication, filtrage tests et rapports | Recette locale intégrale avec fournisseurs simulés ; GA4 événement clé vérifié. Rapprochement réel après publication restant à faire |
| 03 | Note commune honoraires / frais tiers près des prix et délais séparés | Intégré sans inventer des inclusions commerciales ; cas particuliers à confirmer au cadrage |
| 04 | Titles et descriptions Consuel / Enedis orientés prestation | Intégré ; effets Search Console à mesurer après publication |
| 05 | Réponse Cerfa et lien officiel avant le visuel | Intégré et vérifié sur mobile |
| 06 | Accueil allégé, sections différenciées, zone de méthode claire | Intégré ; environ −19 % de hauteur mobile, à confronter aux usages réels |
| 07 | Portail visible en haut du menu compact | Intégré et testé au clavier |
| 08 | Action principale « Faire le point sur mon dossier » ; version courte en navigation | Intégré sur les parcours principaux |
| 09 | Premier retour, préparation et décision des organismes séparés | Intégré ; jours ouvrés et point de départ précisés |
| 10 | Retrait de 96 %, 1 357 et 28 comme preuves quantitatives sans registre source | Alternative sûre intégrée ; ne pas réintroduire sans calcul daté et documenté |
| 11 | Deux checklists de contrôle contextualisées et portail réel de démonstration | Intégré et explicitement pédagogique ; nouveaux extraits de dossiers clients et chronologie réelle non publiés sans pièces et autorisation |
| 12 | Rôle distinct pour les articles Consuel et Enedis, maillage contextuel | Intégré ; aucune cannibalisation prétendue et aucune URL supprimée |
| 13 | Blog lastmod dérivé des contenus publics ; dates significatives des pages révisées | Intégré ; dates stables entre deux builds |
| 14 | Consuel et sous-traitance DP enrichis : pièces, rôles, reprise de complément | Intégré ; acquisition B2B à suivre, pas de trafic promis |
| 15 | Photovoltaïque et aides à la rénovation présentés sans « 100 % PV » | Intégré |
| 16 | Trois forfaits principaux ; un seul pack réseau à 89 € ; différence de 9 € explicitée | Intégré |
| 17 | Démarrage, périmètre, pièces, organisation de l’accès et facturation mensuelle | Intégré dans Parcours |
| 18 | Mesures Lighthouse réelles : accueil, tarifs, contact et guide Cerfa, trois passages | Rapports de laboratoire disponibles ; ne valent pas des Core Web Vitals de terrain ni une mesure INP |
| 19 | Police latine versionnée, cache long sur ce fichier, logos WebP, source mobile du hero | Intégré ; police −49,4 %, logos environ −86,9 %, sans cache immuable global |
| 20 | Piège de focus menu, Échap, restitution du focus, responsive et accessibilité automatisée | Recette clavier et arbre accessible effectués ; pas de certification WCAG ni de recette VoiceOver exhaustive |
| 21 | Deux fiches de cas et demandes de validation préparées | Brouillons seulement ; accord des partenaires, publication externe et profil Google à traiter séparément |
| 22 | `/sunelys` conservée avec rôle d’identification et liens utiles | Intégré, sans perte arbitraire d’une URL indexée |
| 23 | Quatre validations séparées ; règles statiques contre les anciennes références et chiffres non sourcés | Intégré dans le build et la documentation |
| 24 | Hub Services différencié ; liens et exploration vérifiés | Intégré ; demande d’indexation seulement après mise à jour publique, décision de Google indépendante |

## Preuves de recette

- Build Astro et 20 tests Node 22 réussis ; audit statique des 36 pages générées.
- Lighthouse 13.5.0, mobile simulé, trois passages par gabarit, build local avec compression HTTP gzip : performance 99/100 sur accueil, tarifs, contact et guide Cerfa ; accessibilité et SEO automatisés 100/100. LCP médian environ 2,0–2,1 s, CLS 0, TBT 0 ms. Ces résultats ne sont pas des données de terrain. Les premiers passages sur un serveur local sans compression sont archivés séparément et ne servent pas de comparaison au CDN.
- Crawl des 34 pages examinées : 30 URLs dans le sitemap, réponses HTTP 200, un H1, JSON-LD analysable, aucune ancre cassée ni title dupliqué.
- Six gabarits à 320, 390, 768 et 1 366 px : aucun débordement horizontal du document.
- Recette navigateur locale avec une copie du vrai endpoint et des fournisseurs simulés : trois envois, trois fiches simulées ; consentement refusé/accepté/refusé, une seule conversion pour l’envoi accepté, aucun doublon après rechargement. Les références correspondent entre reçu et événement. Aucun client ni prestataire réel n’a reçu ces tests.
- L’adresse de prévisualisation, les rapports et les captures sont consignés dans le bilan livré. Un statut Vercel READY ne vaut pas une publication sur sunelys.fr.

Les captures, résultats bruts du crawl, rapports Lighthouse et reçus de recette sont conservés localement dans `../outputs/chantier-site-2026-10-02`. Les tests de providers et les données sensibles ne sont pas publiés dans le dépôt.

## Après publication

Contrôler l’alias public, les redirections, les formulaires, le cache et les métadonnées. Effectuer un test de réception identifié et autorisé avec les véritables fournisseurs ; ne pas confondre acceptation d’un email par le provider et réception dans la boîte. Inspecter `/services` dans Search Console après la modification publique. Comparer les mêmes 28 jours puis 56 jours pour les pages commerciales et les guides, en séparant trafic, consentement, réceptions réelles et prospects qualifiés. Aucun résultat de positionnement n’est garanti par le code.

Sources : [Cerfa officiel](https://www.service-public.gouv.fr/particuliers/vosdroits/R2028), [événement GA4 generate_lead](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead).
