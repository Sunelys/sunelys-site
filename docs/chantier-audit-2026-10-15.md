# Livraison du chantier SEO, design et UX du 15 octobre 2026

## Périmètre réalisé

- Cartes expertise d'À propos : surface claire opaque, texte graphite, secondaire et accent adaptés ; états normal et survol cohérents.
- Tarifs : prix placés juste après le nom de l'offre, suppression d'un bandeau redondant, prestations EDF OA/aides accessibles dans un volet explicite, espacements mobiles réduits. Aucun prix changé.
- Consuel : suppression des répétitions de choix/prix et de l'exemple générique redondant, méthode accessible dans un volet, maintien du périmètre, du formulaire, de la preuve et des questions fréquentes.
- Parcours : trois étapes, passation et résultats regroupés, détails du suivi dépliables, espacements mobiles réduits.
- Services : page de choix par dossier, avec les informations à transmettre et les livrables retrouvés dans le suivi.
- Blog : titre visible du guide Cerfa raccourci, métadonnées regroupées ; lien Enedis vers un article non publié remplacé par une ressource publiée pertinente.
- Anciens articles non indexés : grille de préparation et exemple pédagogique Consuel ; calcul de comparaison interne/externe avec hypothèses explicites et scénario où déléguer coûte davantage. Aucune économie client inventée.
- Sitemap : dates actualisées uniquement pour les pages dont le contenu change substantiellement. Aucun article du backlog ajouté.
- Build : échec si une page contient un lien vers un article non publié, y compris dans le corps du Markdown.
- API : valeurs de besoin reconnues, longueurs bornées, rejet d'origine étrangère quand présente, statut initial fixé côté serveur. Un formulaire ne peut plus se déclarer « Client ».
- Reporting : distinction entre formulaires, tests, sollicitations, candidatures, qualification humaine documentée et signaux automatiques. Suppression des recommandations d'activation/budget déduites d'un simple score.

## Mesure commerciale

Le registre `scripts/data/lead-review-register.json` conserve les décisions de relecture du 15 octobre, sans nom ni coordonnées. Il n'effectue aucun envoi et ne modifie pas Airtable. Un statut humain plus récent dans le CRM peut faire évoluer une candidature.

Sur les 8 formulaires créés du 15 septembre au 12 octobre : 1 test, 5 messages non commerciaux, 2 candidatures, 0 qualification humaine documentée. Le score automatique de la candidature paid reste 62 ; il ne devient pas une qualification.

Les deux candidatures restent à qualifier dans un échange humain : aucune conversation commerciale ni vente n'a été inventée. Le script utilisé par le suivi quotidien du checkout principal a également été actualisé en conservant son ajout local préexistant. Une copie du fichier antérieur est archivée dans `outputs/chantier-audit-2026-10-15/backups/` à la racine du workspace.

## Vérifications avant publication

- Node 22.23 ; 23 tests réussis, dont fournisseurs simulés, refus de consentement, idempotence, conservation des informations et interdiction de qualification par le visiteur.
- Build CI Astro et audit statique : 40 pages validées.
- 10 modèles aux largeurs 320, 390, 768 et 1366 : 40 contrôles ; pas de débordement du document, pas d'image visible cassée, pas d'erreur JavaScript détectée.
- 20 passages Axe sur les règles WCAG retenues : aucune violation remontée après correction des tableaux défilables. Ceci n'est pas une certification d'accessibilité.
- Tarifs secondaires dépliables, présélection DP et conservation des champs après erreur réseau vérifiées, sans transmission réelle.
- Hauteurs mobiles à 390 px, même protocole : Tarifs 9264 → 7386 px (-20,3 %), Consuel 13870 → 11005 px (-20,7 %), Parcours 9777 → 8833 px (-9,7 %). L'accueil reste à 8752 px ; son entrée et son rythme lumineux sont conservés.

Captures et résultats : `outputs/chantier-audit-2026-10-15/` à la racine du workspace. Les vérifications après publication et les demandes Search Console y sont journalisées séparément.

## Indexation : décisions prises

- `/services` : contenu de choix renforcé, maillage existant conservé.
- `/blog/consuel-photovoltaique-delais-dossier` : rôle centré sur pièces, versions et cohérence documentaire ; délais et attestation renvoient vers leurs guides respectifs.
- `/blog/externalisation-administrative-solaire-volume` : rôle centré sur le calcul économique ; le guide d'externalisation conserve le rôle de méthode de passation.
- Deux articles du 12 octobre : récents, conservés, sans soumissions répétées.
- Redirections, ancienne connexion et noindex intentionnels : conservés. Pas de demande globale visant toutes les exclusions.

Une demande d'exploration, une lecture de sitemap et une indexation ne sont pas équivalentes. L'indexation et les positions restent à observer dans Google après la livraison.

## Autorité et preuves clients : éléments prêts pour la suite

Le site conserve les témoignages déjà publiés et les démonstrations explicitement étiquetées. Une nouvelle étude de cas réelle nécessite un résultat et une autorisation vérifiables ; aucun cas fictif ne doit devenir un « résultat client ».

Pour chaque futur cas : périmètre confié, point de départ, pièce ou action produite, preuve de l'étape obtenue, limites, citation approuvée. Les délais ou économies ne sont publiés qu'avec dates, échantillon et méthode de calcul.

Proposition de demande à un partenaire, préparée mais non envoyée :

> Nous aimerions documenter simplement notre collaboration sur le suivi administratif photovoltaïque : ce que votre équipe nous confie, ce qu'elle retrouve dans le portail et ce que cela change dans votre organisation. Nous vous soumettrons le texte avant publication, sans données de vos clients. Si cela correspond à votre politique, une mention de Sunelys sur votre page partenaires pourrait également expliquer ce rôle.

Les liens de partenaires dépendent de leur accord et de leur publication. Aucun achat de liens, message externe ou budget publicitaire n'a été déclenché.

## Critères de suivi

À J+7/J+14 : états des trois URL prioritaires et des deux articles récents, derniers crawls, sitemap, nouveaux motifs d'exclusion. À 28 jours : clics des pages de prestations, parcours guide → prestation → demande, candidatures réellement qualifiées, devis et clients documentés. Les nouvelles notes d'acquisition ne doivent pas être artificiellement relevées à la date du déploiement.

Les tests avec cinq installateurs et les résultats commerciaux restent des observations à recueillir auprès de personnes réelles ; ils ne sont pas remplacés par les tests automatisés.
