# Audit design, UX et conversion - page d'accueil Sunelys

Date : 29 juillet 2026

## Conclusion

La page dispose maintenant de fondamentaux très solides : proposition de valeur B2B compréhensible, formulaire visible dès le premier écran, prix affichés, preuves concrètes, portail démontré et structure SEO saine. Après la passe du 29 juillet, elle se rapproche davantage d'un rendu **cabinet premium**. Le niveau "luxe / signature" n'est toutefois pas encore totalement atteint, principalement parce qu'il manque encore plus de visuels propriétaires forts et une mise en scène éditoriale encore plus incarnée.

Le défaut du logo SunWatt qui passait devant le titre a été corrigé dans le code, tout comme l'effet trop envahissant du bandeau cookies mobile et le manque de marge de sécurité sous le header fixe.

## Statut de cette passe

- Corrigé : superposition du logo dans la preuve mise en avant.
- Corrigé : bandeau cookies plus compact sur mobile.
- Corrigé : marges d'ancrage sous le header fixe.
- Corrigé : sections basses de la home moins "dashboard", plus aérées et plus premium.
- En progrès : hiérarchie visuelle générale de la home.
- Reste à renforcer : iconographie propriétaire, portraits fondateur, visuels métier exclusifs, cohérence premium sur toutes les pages satellites.

## Notes

| Axe | Note | Lecture |
| --- | ---: | --- |
| Conversion | 8,2 / 10 | L'offre, les prix et le formulaire sont concrets, avec une hiérarchie désormais plus directe. |
| UX desktop | 8 / 10 | Le parcours est plus net, les sections respirent mieux et les CTA restent lisibles. |
| UX mobile | 7,6 / 10 | Le premier écran et la zone services sont plus propres ; il reste à poursuivre l'élagage sur certaines sections profondes. |
| Direction premium | 7,6 / 10 | La home bascule vers un rendu plus éditorial et plus maîtrisé, même s'il manque encore une vraie couche de signature visuelle. |
| Preuve visuelle | 7,8 / 10 | Portail, cas clients et trust section portent mieux la preuve ; il manque encore davantage d'images exclusives. |
| Fondations SEO / technique | 8,5 / 10 | Build validé, 32 pages conformes à l'audit statique, une H1, alt et dimensions d'images présents, aucun débordement horizontal global. |

## Constats critiques

### P0 - Le logo du cas client déborde et recouvre le titre

- **Constat** : dans `FeaturedProof.astro`, le cadre logo mesure environ 192 x 74 px, tandis que l'image SunWatt rendue mesure environ 169 x 134 px. Elle déborde donc d'environ 72 px vers le bas.
- **Impact** : le bloc censé porter la preuve client devient immédiatement peu professionnel. Le défaut est visible sur les trois formats testés.
- **Correction** : créer un cadre logo à recadrage fiable (`position: relative`, `overflow: hidden`) et positionner l'image en absolu dans une zone interne fixe, comme le fait déjà le composant de preuve détaillé. Ne jamais laisser une image de marque décider de la hauteur d'un bloc éditorial.
- **Critère de recette** : aucun pixel du logo ne doit atteindre le kicker ou le titre, de 390 à 1 440 px de large.

### P1 - Le bandeau de consentement masque une part importante du premier écran

- **Constat** : à la première visite mobile, le bandeau recouvre le portail, une partie du formulaire et les CTA. Sur desktop, il empiète sur le visuel du hero.
- **Impact** : c'est une friction avant même le premier choix. Le consentement reste indispensable, mais sa présentation ne doit pas prendre la place de l'offre.
- **Correction** : conserver deux choix équivalents, mais adopter un format mobile plus compact : intitulé court, une ligne d'explication, deux boutons sur la même ligne, lien secondaire. Sur desktop, limiter la largeur et ne pas couvrir le coeur du formulaire.
- **Critère de recette** : sur 390 px, le bandeau ne dépasse pas environ 96 px de haut et les deux boutons restent entièrement visibles.

### P1 - La homepage raconte trop de fois la même promesse

Les 10 sections sont individuellement solides, mais l'enchaînement répète plusieurs fois : visibilité, cadrage, étapes, suivi, portail, preuve. Cela augmente la longueur sans toujours augmenter la conviction.

- **Impact** : un installateur pressé peut avoir l'impression de lire un bon site, mais pas un site qui va droit à la décision.
- **Correction de parcours recommandée** :
  1. Hero + formulaire.
  2. Une seule bande de preuves brève : chiffres, logos, délai de réponse.
  3. Les cinq offres et leurs prix.
  4. Le portail, comme preuve différenciante principale.
  5. Les deux cas clients détaillés.
  6. FAQ et CTA final.
- **À condenser ou déplacer** : le flux en trois temps, le bloc "un périmètre clair" et la carte mise en avant du premier témoignage. Ils restent utiles, mais ne doivent pas tous s'intercaler avant les offres.

### P1 - Le portail est la preuve la plus forte, mais il est montré deux fois

- **Constat** : la même capture de portail apparaît dans le hero puis dans la section portail.
- **Impact** : la répétition réduit l'impression de richesse visuelle au lieu de la renforcer.
- **Correction** : conserver la démonstration complète dans la section portail. Dans le hero, remplacer la grande capture par une preuve plus légère : trois états réels, une micro-vue différente ou, lorsque disponible, un portrait fondateur professionnel. La démonstration complète garde alors son effet de révélation plus bas.

### P1 - Le header fixe manque d'espace de sécurité au scroll et aux ancres

- **Constat** : sur mobile, le header recouvre le haut des sections lorsqu'elles arrivent au sommet de l'écran. Les ancres n'ont pas de marge globale de défilement.
- **Correction** : appliquer une `scroll-margin-top` cohérente à chaque section ciblable et garder les premières lignes hors de la zone couverte par le header.
- **Critère de recette** : un clic sur une ancre ne doit jamais placer un titre sous la navigation fixe.

## Direction artistique : rendre le site plus premium sans perdre la conversion

### À conserver

- Le contraste bleu nuit / blanc / orange : il donne du sérieux, de la précision et un repère de décision clair.
- Les prix visibles dans le hero : ils filtrent les demandes imprécises et évitent la surprise.
- Le formulaire court : il est bon pour la prise de contact et ne doit pas devenir un questionnaire.
- Le portail et les preuves nominatives : ce sont les deux actifs les plus différenciants de Sunelys.

### À faire évoluer

- **Réduire le nombre de cadres** : presque chaque message vit dans sa propre carte. Préférer des sections plus aérées et réserver les cadres aux preuves, au formulaire, aux offres et au portail.
- **Ralentir la typographie display** : la graisse très forte fonctionne dans le hero, mais elle est trop présente dans les sections suivantes. Utiliser des titres plus calmes hors hero, avec davantage d'espace et des paragraphes plus généreux.
- **Stabiliser la police** : la police actuelle dépend de polices système. Pour une marque premium identique sur Windows, macOS et mobile, charger une police variable auto-hébergée, avec un seul usage display maîtrisé.
- **Créer une hiérarchie de fond** : un seul grand moment sombre au hero et un seul autre moment sombre pour le portail. Les autres sections doivent respirer sur un fond clair, sans grille décorative systématique.
- **Ajouter du réel, pas du décoratif** : captures de portail propres, marqueurs de dossiers anonymisés, puis portrait de la fondatrice et, plus tard, une à deux photos de contexte de travail. Aucun visuel stock générique.

## Conversion : améliorations à fort rendement

1. **Formulaire en deux temps sur mobile** : sélectionner le besoin, puis révéler l'email et le CTA. Les mêmes champs sont conservés, mais la page paraît plus légère.
2. **CTA unique par section** : éviter de répéter "cadrage" sous plusieurs formules. Le hero porte l'action principale ; les sections suivantes ramènent au même formulaire avec un libellé adapté au contexte.
3. **Preuve immédiatement lisible** : sous le hero, afficher seulement trois éléments : `1 357 dossiers`, `96 % de DP sans complément`, `réponse sous 24 h`. Les logos et témoignages viennent ensuite.
4. **Services avant explication détaillée** : un visiteur issu de Google Ads doit voir les offres et les prix avant de parcourir la méthode complète.
5. **Cas clients plus éditoriaux** : garder la citation intégrale dans la preuve détaillée. La carte mise en avant ne doit montrer que le logo, l'effet constaté et un lien, jamais une citation concurrente.

## Plan de mise en oeuvre recommandé

### Lot 1 - Finition non négociable

- Corriger le logo débordant.
- Revoir le bandeau cookies desktop et mobile.
- Ajouter les marges de défilement sous le header fixe.
- Vérifier visuellement la homepage aux largeurs 390, 768, 1 024 et 1 440 px.

### Lot 2 - Recomposition premium de la homepage

- Réordonner et condenser les sections sans modifier l'offre ni le tracking.
- Réserver le grand visuel de portail à une seule séquence.
- Passer les offres plus tôt dans la lecture.
- Alléger les fonds quadrillés et les cadres répétitifs.

### Lot 3 - Preuve de marque

- Intégrer le portrait fondateur quand les photos seront prêtes.
- Ajouter une preuve visuelle de traitement de dossier anonymisée.
- Préparer une version de cas client avec photo ou signature validée, uniquement avec accord explicite.

## Garde-fous de validation

- Aucune régression du formulaire, du tracking, des prix ni des liens CTA.
- Aucun texte coupé ou superposé sur les largeurs 390, 768, 1 024 et 1 440 px.
- Une seule H1, titres dans l'ordre, images dimensionnées et alternatives conservées.
- Le CTA principal reste visible sans défilement excessif sur mobile.
- Les contenus qui servent la décision restent avant les contenus d'explication secondaire.
