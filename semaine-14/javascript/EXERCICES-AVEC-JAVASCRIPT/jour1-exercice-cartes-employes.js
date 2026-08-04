// Données de départ, ne pas modifier cette liste
    const employes = [
      { id: 1, prenom: "Jean", nom: "Dupont", departement: "Création et Production", statut: "actif", poste: "Graphiste" },
      { id: 2, prenom: "Amélie", nom: "Tremblay", departement: "Produit et Technologie", statut: "conge", poste: "Développeuse" },
      { id: 3, prenom: "Marc", nom: "Bouchard", departement: "Opérations et Support Client", statut: "actif", poste: "Agent support" },
      { id: 4, prenom: "Sophie", nom: "Gagnon", departement: "Création et Production", statut: "absent", poste: "Monteuse vidéo" },
      { id: 5, prenom: "Karim", nom: "Haddad", departement: "Produit et Technologie", statut: "actif", poste: "Chef de produit" },
      { id: 6, prenom: "Julie", nom: "Roy", departement: "Opérations et Support Client", statut: "actif", poste: "Réceptionniste" }
    ];

    const conteneur = document.querySelector("#conteneur-employes");

// TODO 1 : pour chaque employé du tableau "employes", crée un élément (par exemple une <div>)
//          qui affiche son prénom, son nom, son département et son poste.
    employes.forEach(employe => {
        let carte = document.createElement("div");
        let nom = document.createElement("h2");
        let dept = document.createElement("h3");
        let statut = document.createElement("p");
        let poste = document.createElement("p");

        nom.textContent = employe.prenom + " " + employe.nom;
        dept.textContent = employe.departement
        statut.textContent = employe.statut
        poste.textContent = employe.poste

 // TODO 2 : ajoute chaque carte créée à l'intérieur de "conteneur" avec appendChild.
        carte.appendChild(nom);
        carte.appendChild(dept);
        carte.appendChild(statut);
        carte.appendChild(poste);

        conteneur.appendChild(carte);

// TODO 3 : donne à chaque carte une classe CSS différente selon le statut de l'employé
//          (actif, conge, absent), puis stylise ces classes dans le <style> plus haut
//          pour que ce soit visuellement clair.

// Indice : boucle avec employes.forEach(employe => { ... })
        statut.classList.add(employe.statut)
    })
