# Contrôles de livraison du site

Une absence d’alerte automatique ne constitue pas un audit complet. Chaque livraison distingue quatre domaines.

1. **Technique** : Node 22, `npm run build:ci`, tests, crawl des URLs réellement servies, canonical, robots, sitemap, liens, ancres, JSON-LD, versions de ressources et réponses de l’API. Ne pas analyser le backlog comme s’il était public.
2. **Métier** : vérifier les références officielles à la date de modification ; synchroniser texte, FAQ, dates et données structurées. Les honoraires, délais, frais et preuves chiffrées doivent avoir un périmètre explicite. Dépôt, instruction et accord sont distincts.
3. **Visuel et usage** : mobile 320/390, tablette 768 et ordinateur ; images, contraste des surfaces claires et sombres, clavier, focus, formulaires, consentement et retour d’erreur. Lighthouse ne certifie pas WCAG. Une capture doit correspondre au dernier code.
4. **Commercial** : reçus serveur et CRM, notification provider, test/externe/interne, conversion consentie, puis qualification humaine. Utiliser des périodes comparables de N dates inclusives. Aucun score automatique ne devient un prospect qualifié par simple renommage.

Pour une preuve quantitative : conserver date de calcul, population, exclusions, échantillon, numérateur, dénominateur et sens métier. Pour les DP, l’absence de demande de complément ne prouve pas à elle seule l’accord. Sans registre, publier une description vérifiable et les témoignages autorisés.

Le sitemap utilise les dates de modifications substantielles. Le blog prend la plus récente des publications/révisions visibles. Une correction de styles globaux ne justifie pas de dater artificiellement tous les articles du jour.

Les caches immuables sont réservés à des chemins versionnés dont les octets ne changent plus. Une modification d’image ou de police crée un nouveau chemin. Mesurer les transferts et préciser le contexte du laboratoire ; ne pas comparer un serveur local sans compression au CDN public comme si les environnements étaient équivalents.

Publication : vérifier le contenu et les conditions commerciales, puis publier seulement dans le périmètre autorisé. Une preview n’est pas la production. Toute nouvelle publication éditoriale continue de respecter le manifeste `publicBlogSlugs.ts`.
