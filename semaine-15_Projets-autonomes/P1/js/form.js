// Validation JS
const form = document.querySelector("#form-contact");

const nom = document.querySelector("#nom")
const courriel = document.querySelector("#courriel");
const message = document.querySelector("#message");

const erreurNom = document.querySelector("#erreur-nom");
const erreurCourriel = document.querySelector("#erreur-courriel");
const erreurMessage = document.querySelector("#erreur-message");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    erreurNom.classList.remove("message-visible");
    erreurCourriel.classList.remove("message-visible");
    erreurMessage.classList.remove("message-visible");


    erreurNom.textContent = ""
    erreurCourriel.textContent = ""
    erreurMessage.textContent = ""

    let formValide = true

    if (nom.value === "") {
        erreurNom.textContent = "Votre nom est incomplet";
        erreurNom.classList.add("message-visible");
        formulaireValide = false;
    }

    if (courriel.value === "") {
        erreurCourriel.textContent = "Votre courriel est incomplet";
        erreurCourriel.classList.add("message-visible");
        formulaireValide = false;
    }

    if (message.value === "") {
        erreurMessage.textContent = "Votre message est incomplet";
        erreurMessage.classList.add("message-visible");
        formulaireValide = false;
    }

    if (formulaireValide) {
        console.log("Formulaire valide");
    }
});

