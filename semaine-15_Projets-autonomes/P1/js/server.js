// ====================
// RÉCUPÉRATION DES DONNÉES
// ====================
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

// ====================
// DONNÉES ET GRILLE
// ====================
const grilleHoraire = document.querySelector(".grille-horaire");
const imagesHoraire = {
    "2026-08-26": {
        source: "https://i0.wp.com/loungeurbain.com/wp-content/uploads/2024/05/20240427193222_IMG_9308-1.jpg?resize=621%2C1024&ssl=1",
        position: "50% 5%",
        scale: 1.1
    },

    "2026-08-28": {
        source: "https://atljazzfest.com/wp-content/uploads/2022/03/MASEGO6-788x1024.jpg",
        position: "50% 00%",
    },

    "2026-08-30": {
        source: "https://orizon.ca/edit/uploads/images/image/photos-profiles/corneille-photo-web.jpg",
        position: "50% 0%"
    },

    "2026-08-31": {
        source: "https://www.billboard.com/wp-content/uploads/2025/07/cover-daniel-caesar-billboard-2025-bb11-heather-hazzan-7-1240.jpg?w=800",
        position: "50% 15%",
        scale: 2
    }
};


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
    dateTitle.textContent = formaterDate(date);

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

        const show = shows.find(show => show.heure === heure);

        if (show.scene === "Moon Stage") {
            time.classList.add("moon");
        } else {
            time.classList.add("sunset");
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

// Carte des artistes
function creerShow(show) {

    const showCard = document.createElement("div");
    showCard.classList.add("show");

    const artiste = document.createElement("span");
    artiste.classList.add("show-artist");
    artiste.textContent = show.artiste;

    showCard.appendChild(artiste);

    if (show.scene === "Moon Stage") {
        showCard.classList.add("moon");
    } else {
        showCard.classList.add("sunset");
    }

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

function ajouterImages() {
    const dateColumn = document.querySelectorAll(".date-column")
    dateColumn.forEach(dC => {

        const imageInfo = imagesHoraire[dC.dataset.date];

        // S'il n'y a pas d'image prévue pour cette date, on passe directement à la colonne suivante
        if (!imageInfo) {
            return;
        }

        // Récupère tous les slots horaires de la colonne
        const slots = dC.querySelectorAll(".time-slot");

        // Garde seulement les slots qui ne contiennent pas d'artiste, ces espaces seront utilisés pour afficher l'image
        const slotsVides = [...slots].filter(slot => {
            return !slot.querySelector(".show");
        });

        // Si tous les slots contiennent un artiste, il n'y a aucun espace disponible pour une image
        if (slotsVides.length === 0) {
            return;
        }

        // Premier et dernier slot vide de la colonne, ils permettent de déterminer la hauteur de l'image
        const premierSlot = slotsVides[0];
        const dernierSlot = slotsVides[slotsVides.length - 1];

        const premierIndex = [...slots].indexOf(premierSlot);
        const dernierIndex = [...slots].indexOf(dernierSlot);

        // Récupère tous les slots situés entre le premier et le dernier slot vide
        const slotsImage = [...slots].slice(
            premierIndex,
            dernierIndex + 1
        );

        // Retire les bordures entre deux slots vides
        for (let i = 0; i < slotsImage.length - 1; i++) {

            const slotActuel = slotsImage[i];
            const slotSuivant = slotsImage[i + 1];

            if (
                !slotActuel.querySelector(".show") &&
                !slotSuivant.querySelector(".show")
            ) {
                slotActuel.style.borderBottom = "none";
            }
        }

        // Calcule la position de l'image
        const colonneRect = dC.getBoundingClientRect();
        const premierRect = premierSlot.getBoundingClientRect();
        const dernierRect = dernierSlot.getBoundingClientRect();

        const top = premierRect.top - colonneRect.top;
        const bas = dernierRect.bottom - colonneRect.top;

        // Crée le conteneur de l'image
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("schedule-image-container");

        // Crée l'image
        const image = document.createElement("img");

        image.classList.add("schedule-image");
        image.src = imageInfo.source;

        image.style.transform = `scale(${imageInfo.scale})`;
        image.style.objectPosition = imageInfo.position;

        imageContainer.appendChild(image);

        imageContainer.style.top = `${top}px`;
        imageContainer.style.height = `${bas - top}px`;

        dC.appendChild(imageContainer);
    });
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

    ajouterImages();
}

