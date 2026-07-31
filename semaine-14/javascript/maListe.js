let mesListes = []

afficherMesListes();

function enregistrerTexte() {
    event.preventDefault();
    let texteForm = document.querySelector("input").value;
    // let taches = JSON.parse(localStorage.getItem("taches")) || [];
    // taches.push(texteForm)
    // localStorage.setItem("taches", JSON.stringify(taches));
    ajouterTache(texteForm)
};

function ajouterTache(texteForm) {
    let ul = document.querySelector("ul");
    let li = document.createElement("li");
    li.innerHTML = `<div class="listeElement"><li>${element}</li><div class="btnSupprime" onclick="supprimerItem(this)">£</div></div>`
    ul.appendChild(li);

    mesListes.push(texteForm);
    localStorage.setItem("mesListes", JSON.stringify(mesListes));
};

function supprimerItem(element) {
    element.parentElement.remove();
};

function afficherMesListes() {
    mesListes = JSON.parse(localStorage.getItem("mesListes"));

    mesListes.forEach(element => {
        let ul = document.querySelector("ul");
        let li = document.createElement("li");
        li.innerHTML = `<div class="listeElement"><li>${element}</li><div class="btnSupprime" onclick="supprimerItem(this)">£</div></div>`
        ul.appendChild(li);
    });

}

