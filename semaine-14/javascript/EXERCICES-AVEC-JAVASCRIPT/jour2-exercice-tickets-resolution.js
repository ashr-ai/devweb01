// Données de départ, ne pas modifier cette liste
const tickets = [
    { id: 101, sujet: "Imprimante ne répond plus", departement: "Opérations", priorite: "basse" },
    { id: 102, sujet: "Impossible de se connecter au VPN", departement: "Technologie", priorite: "haute" },
    { id: 103, sujet: "Compte verrouillé après plusieurs tentatives", departement: "Sécurité", priorite: "haute" },
    { id: 104, sujet: "Demande d'accès au dossier partagé Production", departement: "Production", priorite: "moyenne" }
];

const listeTickets = document.querySelector("#liste-tickets");
const compteurResolus = document.querySelector("#compteur-resolus");
let nombreResolus = 0;

// TODO 1 : pour chaque ticket, crée un élément qui affiche le sujet, le département
//          et la priorité.
let sujet = tickets.sujet
let departement = tickets.departement
let priorite = tickets.priorite

// TODO 2 : ajoute à chaque ticket un <button> "Marquer comme résolu".

tickets.forEach(ticket => {
    let button = document.createElement("button")
    button.textContent = "Marquer comme résolu"

    // TODO 3 : au clic sur ce bouton, ajoute la classe "resolu" à l'élément du ticket
    //          (utilise classList.toggle pour permettre d'annuler aussi).
    //          Stylise la classe "resolu" dans le <style> plus haut (par exemple texte
    //          barré et grisé) pour que ce soit visuellement clair.
    button.addEventListener('click', () => {
        button.classList.add("resolu");
    })
});


// TODO 4 : chaque fois qu'un ticket passe résolu ou redevient actif, mets à jour
//          la valeur de nombreResolus et affiche-la dans #compteur-resolus.

// Indice : addEventListener("click", () => { ... }) sur le bouton créé pour CE ticket.
