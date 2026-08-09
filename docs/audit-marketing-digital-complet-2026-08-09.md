# Audit marketing digital complet Sunelys - 9 aout 2026

## Verdict executif

Le zero lead est un signal d'alerte, mais il ne permet pas encore d'accuser une seule cause. Deux problemes se superposent:

1. **La collecte et le reporting sont fragiles** : les executions recentes de `npm run marketing:ads:leads -- --days 14` echouent sur `api.airtable.com` avec une erreur DNS. Le dernier rapport exploitable date du 1er aout et indiquait 0 lead Google Ads reel hors test.
2. **La campagne a depense sans preuve de conversion** : l'instantane Google Ads du 31 juillet affichait 1 573 impressions, 97 clics, 194,32 EUR depenses et 0 conversion sur la periode du 1er au 30 juillet. La campagne active concentrait 125,60 EUR, 45 clics et 0 conversion.

Conclusion: **on ne doit ni augmenter le budget ni relancer plusieurs campagnes tant que la chaine formulaire -> source durable -> conversion Google Ads n'est pas revalidee**. La campagne n'est pas au niveau expert aujourd'hui; le probleme est mesurable et recuperable.

## Notes d'expert

| Domaine | Note | Diagnostic |
| --- | ---: | --- |
| Fiabilite des donnees et CRM | 4,5/10 | Airtable est un point unique de panne; le suivi quotidien s'est interrompu. |
| Tracking onsite et attribution | 7,5/10 | UTM, GCLID, GA4 et evenement de confirmation existent, mais l'absence de conversion reelle n'est pas resolue. |
| SEA - structure | 6/10 | Une campagne stricte existe, mais le compte a depense avant validation de l'intention et du formulaire. |
| SEA - intention des requetes | 5/10 | Plusieurs requetes sont informationnelles ou particulier, pas explicitement installateur/B2B. |
| Landing page conversion | 6,8/10 | Positionnement clair et offre lisible; confiance, preuve et friction mobile restent a valider par des sessions reelles. |
| UX premium | 7/10 | Direction coherente, mais les overlays/outils de debug visibles dans certaines captures degradent la perception. |
| SEO technique | 8/10 | Homepage, contact et pages services sont indexables; le sitemap est lu. |
| SEO contenu | 7/10 | Bon socle services/blog, mais il faut des pages repondant aux intentions installateur precises. |
| Pilotage commercial | 4/10 | Aucun lead reel ne permet encore de comparer qualification, rendez-vous, devis et deal. |
| **Global acquisition** | **5,8/10** | Le site est exploitable; le systeme d'acquisition n'est pas encore prouve. |

## Ce qui est confirme

### Google Ads

- Campagne active: `Search - Delegation admin PV installateurs`.
- Budget vu dans l'interface: 3 EUR/jour, CPC moyen environ 2 EUR.
- 386 impressions, 45 clics et 125,60 EUR sur l'instantane de campagne fourni.
- Actions de conversion `Lead formulaire site Sunelys` et `Appels a partir des annonces`: **actives**, mais sans conversion recente. Le probleme n'est donc plus une action de conversion desactivee; c'est l'absence de conversion effectivement observee.
- Les campagnes historiques restent a ne pas reactiver par reflexe: elles ont genere des clics mais pas de lead exploitable dans le reporting disponible.

### Requetes a risque

Les exemples vus melangent intention professionnelle et recherche grand public/informationnelle:

- `schema electrique raccordement panneau solaire`
- `comment declarer des panneaux solaires a enedis`
- `demande installation panneau solaire mairie`
- `declaration panneau solaire`
- `declaration préalable panneaux solaires toiture`
- `dossier photovoltaïque`

Ces requetes peuvent produire du trafic, mais elles ne prouvent pas que l'utilisateur veut deleguer ses dossiers a Sunelys.

### Site et Search Console

- Sitemap public valide, lu le 31 juillet, 28 URLs decouvertes.
- `/`, `/sunelys`, `/contact` et `/blog`: HTTP 200, `index,follow`, canonical auto-reference.
- `/lp/delegation-admin-pv`: `noindex,follow` volontaire pour une landing payante.
- Les 404 et pages non indexees vus dans Search Console sont en cours de validation; les redirections legacy sont attendues. `/sunelys` est actuellement indexable en live, donc l'alerte noindex semble stale ou en cours de propagation.

## Cause probable du zero lead

Le diagnostic priorise les hypotheses dans cet ordre:

1. **Mesure incomplete pendant les pannes Airtable**: certaines soumissions ont pu ne pas devenir des lignes CRM; aucun zero ne doit etre deduit d'un rapport interrompu.
2. **Intention trop large**: clics sur des problemes solaires generiques au lieu de requetes de delegation administrative B2B.
3. **Preuve et friction de conversion**: le prospect doit comprendre en quelques secondes que Sunelys travaille pour des installateurs, sur des dossiers concrets, avec un prix et un delai nets.
4. **Conversion Ads non observée**: le tag est configure, mais la conversion ne se déclenche qu'apres confirmation du formulaire; sans soumission reelle, Google ne peut rien optimiser.

## Plan de remise a niveau

### P0 - a faire avant tout nouveau budget

- Garder une seule campagne Search active, a 3 EUR/jour maximum.
- Ne pas reactiver PMax, sous-traitance DP, Consuel/Raccordement ou pilotage global tant que la campagne stricte n'a pas produit un premier lead reel.
- **Securite urgente**: un ancien artefact de build local contenait le PAT Airtable. Le code est corrige pour lire les secrets au runtime et le nouveau build n'embarque plus le token; par precaution, regenerer/revoquer le PAT Airtable dans Airtable/Vercel.
- Deployer le filet de securite formulaire puis configurer dans Vercel **au moins un** des deux chemins:
  - Resend: `RESEND_API_KEY`, `LEAD_NOTIFICATION_FROM`, `LEAD_NOTIFICATION_TO`.
  - Webhook durable: `LEAD_FALLBACK_WEBHOOK_URL`, vers Make/n8n/Google Apps Script/CRM.
- Configurer `LEAD_ALERT_WEBHOOK_URL` pour recevoir toute panne Airtable.
- Faire un test en production avec une adresse de test clairement marquee, puis verifier: formulaire, `/merci`, email ou webhook, ligne Airtable, UTM/GCLID et conversion.

### P1 - campagne stricte

Conserver uniquement des mots-cles en expression/exacte autour de:

- `gestion administrative photovoltaïque installateur`
- `déléguer dossiers photovoltaïques`
- `sous-traitance administrative photovoltaïque`
- `prestataire administratif installateur solaire`
- `externaliser déclaration préalable photovoltaïque`
- `secrétariat administratif photovoltaïque`

Ajouter progressivement les variantes avec `installateur`, `professionnel`, `entreprise`, `sous-traiter`, `déléguer` ou `prestataire`. Ne pas acheter `déclaration panneau solaire` seul.

Negatifs prioritaires a tester et valider dans les termes de recherche: `gratuit`, `emploi`, `formation`, `stage`, `salaire`, `particulier`, `chez moi`, `bricolage`, `schema`, `comment brancher`, `kit`, `vente panneau`, `installation maison`, `prime`, `aide`, `autoconsommation`. Les negatifs trop generaux doivent etre confirmes par les termes reels avant ajout.

### P1 - landing et conversion

- Hero: conserver la promesse B2B directe autour de la sous-traitance des dossiers administratifs PV.
- Premier ecran: garder prix, delai de reponse, portail et CTA sans superposition visuelle.
- Formulaire: demander en priorite email professionnel, societe, volume mensuel, besoin et etape bloquante; afficher une preuve sobre de traitement humain.
- Mobile: controler la hauteur du hero, l'ordre CTA/formulaire et l'absence de debug, chat ou overlay qui recouvre le bouton.
- Apres validation: afficher une confirmation claire et proposer un cadrage, sans faire croire que la demande est envoyee si aucun sink n'a accuse reception.

## Regles d'arret financier

- **Avant filet de securite valide**: budget maintenu a 3 EUR/jour, aucune extension.
- **Test propre apres validation**: 5 EUR/jour pendant 7 jours maximum, soit 35 EUR.
- Stop immediat si 30 EUR sont depenses sans lead reel, si les termes restent majoritairement particuliers/informationnels, si le tracking ne remonte pas ou si le formulaire echoue.
- Augmentation uniquement apres au moins 1 lead reel qualifie; reallocation apres comparaison d'au moins 3 leads reels ou d'un premier devis.

## Score de sortie attendu

Le prochain jalon n'est pas un CTR ou un score Google. C'est:

1. une soumission reelle recue par une source durable;
2. une conversion `generate_lead` apres `/merci`;
3. un lead identifie comme installateur ou entreprise;
4. un volume ou un blocage administratif exploitable;
5. un rappel effectue rapidement.

Tant que ces cinq preuves ne sont pas reunies, le bon choix est de proteger le budget, pas de l'augmenter.

## Fichiers et suivi

- Endpoint formulaire: `src/pages/api/leads.ts`
- Reporting paid: `scripts/marketing-google-ads-leads.mjs`
- Audit SEA precedent: `docs/audit-anti-gaspillage-sea-site-2026-07-28.md`
- Audit site/SEA/conversion precedent: `docs/audit-complet-site-sea-conversion-2026-07-24.md`
