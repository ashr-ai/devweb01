getApiInfo();

async function getApiInfo() {

    try {

        // on fetch horaire.json
        const responseTeams = await fetch("./js/json/horaire.json");

        if (!responseTeams.ok) {
            throw new Error(`Erreur HTTP Teams ! Statut : ${responseTeams.status}`);
        }

        const data = await responseTeams.json();
        const shows = data.shows;

        afficherData(shows)

    } catch (error) {

        console.error("Erreur :", error);
        alert("Erreur : " + error.message);

    }
}


const grilleHoraire = document.querySelector(".grille-horaire");


function formaterDate(date) {
    const [annee, mois, jour] = date.split("-");
    const nouvelleDate = new Date(annee, mois - 1, jour);
    const dateFormatee = nouvelleDate.toLocaleDateString("fr-CA", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });

    return dateFormatee.charAt(0).toUpperCase() + dateFormatee.slice(1);
}

function creerDateColumn(date, heures) {

    const dateColumn = document.createElement("div");
    dateColumn.classList.add("date-column");
    dateColumn.dataset.date = date;

    const dateTitle = document.createElement("h3");
    dateTitle.classList.add("date");
    dateTitle.innerHTML = formaterDate(date);

    dateColumn.appendChild(dateTitle);

    heures.forEach(heure => {

        const timeSlot = creerTimeSlot(heure);

        dateColumn.appendChild(timeSlot);

    });

    grilleHoraire.appendChild(dateColumn);
}

function creerColonneHeures(shows, heures) {

    const colonneHeures = document.createElement("div");
    colonneHeures.classList.add("time-column");

    const espace = document.createElement("div");
    colonneHeures.appendChild(espace);

    heures.forEach(heure => {
        const time = document.createElement("span");
        time.classList.add("time");
        time.textContent = heure;

        for (const show of shows) {
            if (show.heure === heure) {
                if (show.scene === "Moon Stage") {
                    time.classList.add("moon");
                } else {
                    time.classList.add("sunset");
                }

                break;
            }
        }

        colonneHeures.appendChild(time);
    });
    grilleHoraire.appendChild(colonneHeures);
}

function creerTimeSlot(heure) {

    const timeSlot = document.createElement("div");
    timeSlot.classList.add("time-slot");
    timeSlot.dataset.heure = heure;

    return timeSlot;
}

function creerShow(show) {

    const showCard = document.createElement("div");
    showCard.classList.add("show");

    const artiste = document.createElement("span");
    artiste.classList.add("show-artist");
    artiste.textContent = show.artiste;

    showCard.appendChild(artiste);

    // let scene;

    // if (show.scene === "Moon Stage") {
    //     scene = "moon";
    // } else {
    //     scene = "sunset";
    // }

    // showCard.classList.add(scene);

    return showCard
}

function placerShow(show) {

    const dateColumn = document.querySelector(
        `.date-column[data-date="${show.date}"]`
    );
    const timeSlot = dateColumn.querySelector(
        `.time-slot[data-heure="${show.heure}"]`
    );

    const showCard = creerShow(show);
    timeSlot.appendChild(showCard);
}

function afficherData(shows) {
    // Un Set est une collection qui ne peut pas contenir deux fois la même valeur.
    const dates = new Set();
    const heures = new Set();

    shows.forEach(show => {
        dates.add(show.date);
        heures.add(show.heure);
    });

    creerColonneHeures(shows, heures);

    dates.forEach(date => {
        creerDateColumn(date, heures);
    });

    shows.forEach(show => {
        placerShow(show);
    });
}

