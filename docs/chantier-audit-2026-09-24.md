# Livraison du chantier d'audit du 24 septembre 2026

## Perimetre

Corrections de l'audit du site public, en conservant la direction F1 graphite, blanc, gris et cuivre satine. Aucun changement de prix, aucune nouvelle preuve commerciale inventee et aucune modification de Google Ads.

## Corrections realisees

- Images du blog : composant responsive corrige, dimensions stables, comportement cover/contain explicite. Les photos restent lumineuses sans filtre cuivre ni assombrissement systematique.
- Images de marque : portrait Contact remplace par la variante editoriale approuvee ; visuels generiques et illustration 3D retires de l'accueil.
- Portail : vue client anonymisee au lieu du tableau administratif d'alertes, image agrandissable et non recadree, fonction de chaque vue correctement nommee. Les exemples de juillet sont dates, pas presentes comme des captures actuelles.
- Accueil : action principale avant les preuves chiffrees, temoignages remontes juste apres le hero, plusieurs blocs repetitifs retires ou replies, capture du portail non dupliquee dans le hero mobile.
- Tarifs : suppression du comparateur redondant, detail d'adequation de chaque offre repliable, prix et perimetre toujours visibles.
- Formulaires Contact, diagnostic et pages services : composant partage, trois informations obligatoires (besoin, nom, email), precisions facultatives. Les sept offres tarifaires preremplissent le bon besoin, y compris les packs.
- Envoi : bouton bloque pendant la requete, confirmation uniquement apres reponse positive de l'API, message d'erreur accessible et informations conservees si l'envoi n'est pas confirme. Redirection limitee a /merci sur le meme domaine.
- Notifications : etat pending puis email_accepted, webhook_accepted_email_unconfirmed ou failed dans le commentaire Airtable. Reessai borne des emails sur erreur temporaire avec cle d'idempotence. L'acceptation du prestataire n'est pas une preuve de reception en boite de messagerie.
- Accessibilite : contraste des CTA, prix secondaires, badges, footer et surfaces services ; libelles accessibles des liens ; texte cookies non tronque ; fenetre automatique de sortie retiree.
- SEO : page Services et liens directs vers les offres clarifies ; passerelles B2B dans les deux articles les plus visites ; logo structure F1 et 14 images de partage propres aux articles, generees au build sans cout serveur a chaque visite. Publication des articles S5 non modifiee.
- Regression : tests unitaires et API sans reseau reel executes par le build, avec l'audit HTML statique existant.

## Verification avant publication

- Build sous Node 22.23.3 : reussi.
- 11 tests automatiques : reussis, dont notification refusee apres stockage, reprises reseau et protection contre les redirections externes.
- 36 pages HTML : audit statique reussi.
- 8 parcours aux largeurs 360, 390, 768 et 1440 px : aucun debordement horizontal sur les 32 cas examines.
- Sept liens tarifaires : besoin preselectionne correct et modifiable.
- Test d'erreur local : informations conservees, message d'alerte visible et focus restaure. Aucun faux prospect cree par les tests automatises.
- Lighthouse accessibilite local : Contact 100, Tarifs 100, Blog 100, Declaration prealable 100. Ce score ne constitue pas une certification RGAA ni un test utilisateur.

Mesures comparatives a largeur 390 px, meme navigateur :

| Repere | Avant | Apres |
| --- | ---: | ---: |
| Hauteur accueil | 15 048 px | 13 341 px |
| Hauteur Contact | 6 305 px | 5 617 px |
| Hauteur Tarifs | 10 483 px | 8 491 px |
| Premiere preuve client sur l'accueil | environ 5 240 px | environ 1 881 px |

Captures et resultats bruts : `outputs/chantier-site-2026-09-24` dans le workspace SITE SUNELYS. Les chiffres de hauteur restent des indicateurs de parcours, pas une preuve d'augmentation des conversions.

## Limites explicites

- L'indexation et le classement dependent de Google. Une demande d'indexation n'est pas une indexation confirmee.
- Les images du portail utilisees sont des exemples anonymises existants. Une nouvelle serie de captures autorisees, sans donnees clients, reste une evolution distincte.
- Une nouvelle serie photographique de l'equipe et une validation documentaire des chiffres de preuve demandent des sources reelles ; elles ne sont pas remplacees par des scenes ou chiffres inventes.
- Le webhook d'alerte externe n'est pas configure dans les variables de production verifiees. Sans celui-ci, un echec de notification est trace dans Airtable et les logs, mais ne dispose pas d'un second canal d'alerte autonome.
- La livraison visuelle/technique ne permet pas de promettre un nombre de leads. Le taux de demandes qualifiees doit etre mesure sur du trafic reel apres publication.

## References techniques

- Resend, cles d'idempotence : https://resend.com/docs/dashboard/emails/idempotency-keys
- Google, donnees structurees Organization : https://developers.google.com/search/docs/appearance/structured-data/organization
