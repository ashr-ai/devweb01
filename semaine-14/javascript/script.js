// Fonctionnalité 1 - Compteur
let nbre = document.querySelector("#nbre")
let plus = document.querySelector("#plus")
let moins = document.querySelector("#moins")

let compteur = 0

function changerLeNombre() {
    nbre.textContent = compteur;
}

plus.addEventListener('click', () => {
    compteur++
    changerLeNombre()
})

moins.addEventListener('click', () => {
    if (compteur > 0) {
        compteur--
    }
    changerLeNombre()
})

// Fonctionnalité 3 - Validateur de champ
let champ = document.querySelector("#champ")
let valider = document.querySelector("#valider")
let message = document.querySelector("#message")


let texte = champ.value

function changerLeTexte(texte) {
    message.textContent = texte
}

function changerLaCouleur(couleur) {
    message.style.color = couleur
}


valider.addEventListener('click', () => {
    let texte = champ.value
    
    if (texte == "") {
        changerLeTexte("Erreur")
        changerLaCouleur("red")
    } else {
        changerLeTexte("Confirmé")
        changerLaCouleur("green")
    }
})

// Fonctionnalité 4 - Panier (source : ChatGPT)
let plus = document.querySelector("#plus")
let moins = document.querySelector("#moins")
let ajout = document.querySelector("#ajout")

let affQuantite = document.querySelector("#affichageQuantite")
let message = document.querySelector("#message")

