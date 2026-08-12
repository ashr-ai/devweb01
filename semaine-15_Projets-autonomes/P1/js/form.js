// Validation JS
const form = document.querySelector("#form-contact");

const nom = document.querySelector("#nom")
const courriel = document.querySelector("#courriel");
const message = document.querySelector("#message");

const erreurNom = document.querySelector("#erreur-nom");
const erreurCourriel = document.querySelector("#erreur-courriel");
const erreurMessage = document.querySelector("#erreur-message");

form.addEventListener("submit", function (event) {

    // Empêche le formulaire de se soumettre pour pouvoir valider avec JS
    event.preventDefault();

    // On cache les anciens messages d'erreur
    erreurNom.classList.remove("message-visible");
    erreurCourriel.classList.remove("message-visible");
    erreurMessage.classList.remove("message-visible");

    // Ensuite on efface leur texte
    erreurNom.textContent = ""
    erreurCourriel.textContent = ""
    erreurMessage.textContent = ""

    // On considère le formulaire valide au départ
    let formValide = true

    if (nom.value === "") {
        erreurNom.textContent = "Votre nom est incomplet";
        erreurNom.classList.add("message-visible");
        formValide = false;
    }

    if (courriel.value === "") {
        erreurCourriel.textContent = "Votre courriel est incomplet";
        erreurCourriel.classList.add("message-visible");
        formValide = false;
    }

    if (message.value.length < 20) {
        erreurMessage.textContent = "Votre message doit contenir au moins 20 caractères";
        erreurMessage.classList.add("message-visible");
        formValide = false;
    }

    if (formValide) {
        console.log("Formulaire valide");
    }
});

