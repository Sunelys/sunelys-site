# Finitions du parcours public - 15 octobre 2026

## Changements

- Accueil ordinateur : formulaire plus large, offres sur deux colonnes, reassurances alignees avec un titre de section. La photo d'entree et la palette restent celles validees.
- Pages DP et Enedis : retrait des panneaux repetant la decision, le prix et un exemple generique ; methode et cas d'usage depliables. Les prestations, prix, temoignages et conditions restent disponibles.
- Frais : texte propre a la DP, au Consuel et au raccordement au lieu d'une reserve generique dans toutes les offres.
- Portail : apercu mobile centre sur les actions ; agrandissement dans un dialogue natif avec zoom, vue complete, Echap et retour du focus. Le lien image reste utilisable sans JavaScript.
- Lisibilite : contraste corrige sur les libelles des prix de la page Gestion administrative.
- Formulaire : une erreur du traceur apres confirmation serveur ne peut plus annuler la redirection vers Merci ni faire croire a un echec de reception.
- Sitemap : dates de modification actualisees pour les pages reellement retravaillees.

## Verification

- 23 tests existants, build Astro et audit des 40 pages statiques.
- Recette responsive sur 12 modeles, quatre largeurs : 320, 390, 768 et 1366 px.
- Controle Axe sur telephone et ordinateur ; le premier passage a revele le contraste des libelles Gestion, corrige avant livraison.
- Dialogue : image chargee, zoom, vue complete, deux onglets, Echap et retour du focus.
- Formulaire : champs conserves en cas d'erreur reseau ; recu serveur simule suivi d'une erreur Analytics, redirection de succes confirmee. Aucun lead reel cree par ces controles.
- GA4 Admin lu : generate_lead est deja configure comme evenement cle sur la propriete utilisee. Aucun changement de configuration ni de campagne.

## Dependances exterieures

Les tests avec de vrais installateurs, les nouvelles citations/cas clients, les mentions sur les sites partenaires et le rapprochement de la prochaine demande reelle necessitent des participants ou des evenements externes. Le protocole et les brouillons sont prepares dans les livrables internes ; aucun envoi ni resultat externe n'est annonce comme realise.

L'indexation et le trafic ne peuvent pas etre declares ameliores par ce commit avant nouvelle observation Google. La derniere inspection anterieure a cette livraison indiquait 32 URL indexees sur 34.
