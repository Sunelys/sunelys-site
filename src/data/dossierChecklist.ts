export const dossierChecklist = [
  { id: "projet", label: "Projet", items: [
    { id: "identite", title: "Interlocuteur et propriétaire", detail: "Coordonnées utiles, identité du demandeur et accord sur les personnes qui peuvent agir." },
    { id: "adresse", title: "Adresse et parcelle", detail: "Adresse du chantier et références cadastrales concordantes." },
    { id: "configuration", title: "Configuration prévue", detail: "Toiture ou implantation, puissance, panneaux, onduleurs et stockage éventuel." },
    { id: "existant", title: "Démarches déjà engagées", detail: "Références des demandes, récépissés, courriers et décisions existants, avec leurs dates." },
  ] },
  { id: "dp", label: "Déclaration préalable", items: [
    { id: "plans", title: "Plans et implantation", detail: "Repères du terrain, bâtiment, toiture et implantation envisagée, adaptés au projet." },
    { id: "photos", title: "Photographies du site", detail: "Vues de la toiture et de son environnement utiles à la préparation du dossier." },
    { id: "insertion", title: "Représentation du projet", detail: "Pièces graphiques et insertion à préparer selon le projet et les demandes applicables." },
    { id: "courrier", title: "Dépôt ou demande de complément", detail: "Si le dossier existe déjà : récépissé, liste exacte des pièces demandées et date de notification." },
  ] },
  { id: "reseau", label: "Enedis et Consuel", items: [
    { id: "materiel", title: "Matériel réellement installé", detail: "Références exactes, puissances et fiches techniques, en distinguant ce qui est prévu de ce qui est posé." },
    { id: "schema", title: "Schéma et pièces techniques", detail: "Documents établis ou validés par les intervenants compétents, cohérents avec la configuration réelle." },
    { id: "raccordement", title: "Référence de raccordement", detail: "Demande Enedis, mode d’injection, échanges et documents déjà reçus lorsqu’ils existent." },
    { id: "retours", title: "Retours Consuel et mise en service", detail: "Demande, complément ou visite : conserver la notification originale et la prochaine action attendue." },
  ] },
];
