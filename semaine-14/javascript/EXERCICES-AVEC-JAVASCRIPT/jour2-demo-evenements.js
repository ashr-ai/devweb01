
const employes = [
    { id: 1, prenom: "Jean", nom: "Dupont", departement: "Création et Production", poste: "Graphiste", courriel: "jdupont@boreal.arpa" },
    { id: 2, prenom: "Amélie", nom: "Tremblay", departement: "Produit et Technologie", poste: "Développeuse", courriel: "atremblay@boreal.arpa" },
    { id: 3, prenom: "Marc", nom: "Bouchard", departement: "Opérations et Support Client", poste: "Agent support", courriel: "mbouchard@boreal.arpa" },
]

const listeEmployes = document.querySelector("#liste-employes");
const panneauDetails = document.querySelector("#panneau-details");

employes.push(
    { id: 4, prenom: "Sophie", nom: "Gagnon", departement: "Création et Production", poste: "Monteuse vidéo", courriel: "sgagnon@boreal.arpa" },
    { id: 5, prenom: "Karim", nom: "Haddad", departement: "Produit et Technologie", poste: "Chef de produit", courriel: "khaddad@boreal.arpa" },
    { id: 6, prenom: "Julie", nom: "Roy", departement: "Opérations et Support Client", poste: "Réceptionniste", courriel: "jroy@boreal.arpa" }
)

employes.forEach(employe => {
    const carte = document.createElement("div");
    carte.classList.add("carte");
    carte.textContent = `${employe.prenom} ${employe.nom}`;

    // Le coeur de la démo : écouter l'événement "click" sur CHAQUE carte
    carte.addEventListener("click", () => {
        // Retirer la sélection visuelle des autres cartes
        document.querySelectorAll(".carte").forEach(c => c.classList.remove("selectionnee"));
        carte.classList.add("selectionnee");

        // Remplir le panneau de détails avec les infos de CET employé précis
        panneauDetails.innerHTML = `
        <h2>${employe.prenom} ${employe.nom}</h2>
        <p><strong>Poste :</strong> ${employe.poste}</p>
        <p><strong>Département :</strong> ${employe.departement}</p>
        <p><strong>Courriel :</strong> ${employe.courriel}</p>
      `;
    });

    listeEmployes.appendChild(carte);
});

