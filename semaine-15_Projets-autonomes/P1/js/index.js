// Intro
const logoAnime = document.querySelector(".logo-intro-anime");
const logoStill = document.querySelector(".logo-intro-still");
const logoHeader = document.querySelector(".header-logo");
const conteneurSite = document.querySelector(".conteneur-site");

setTimeout(function () {

    // Récupère la position et la taille du logo du header
    const headerPosition = logoHeader.getBoundingClientRect();

    // Affiche le frame
    logoStill.style.opacity = "1";

    setTimeout(function () {

        // Cache le GIF
        logoAnime.style.opacity = "0";

        // Redimensionne le frame
        logoStill.style.width =
            headerPosition.width + "px";

        // Récupère sa nouvelle position
        const stillPosition =
            logoStill.getBoundingClientRect();

        // Centre du logo du header
        const headerCentreX =
            headerPosition.left + headerPosition.width / 2;

        const headerCentreY =
            headerPosition.top + headerPosition.height / 2;

        // Centre du frame
        const stillCentreX =
            stillPosition.left + stillPosition.width / 2;

        const stillCentreY =
            stillPosition.top + stillPosition.height / 2;

        // Calcule le déplacement
        const deplacementX =
            headerCentreX - stillCentreX;

        const deplacementY =
            headerCentreY - stillCentreY + 5;

        // Commence le fade du fond noir
        document.querySelector(".intro").classList.add("terminee");

        // Commence le déplacement du logo
        logoStill.style.transform =
            `translate(${deplacementX}px, ${deplacementY}px)`;

        // La page commence à apparaître
        conteneurSite.style.opacity = "1";

        // Attend que le logo ait atteint le header
        setTimeout(function () {

            // Le frame est maintenant arrivé au header.
            // La page et le frame disparaissent simultanément.
            conteneurSite.style.opacity = "1";
            logoStill.style.opacity = "0";

            // Le fond noir de l'intro disparaît également.
            document.querySelector(".intro").classList.add("terminee");

        }, 1200);

    }, 50);

}, 1800);

// FAQ
const questionsFAQ = document.querySelectorAll(".questionFAQ")

questionsFAQ.forEach(questionFAQ => {
    const question = questionFAQ.querySelector("h3");

    question.addEventListener('click', () => {
        // Si la quesion est déjà ouverte, on la ferme
        if (questionFAQ.classList.contains("ouvert")) {
            questionFAQ.classList.remove("ouvert");
            return;
        }

        // On ferme toutes les autres
        questionsFAQ.forEach(faq => {
            faq.classList.remove("ouvert");
        });

        // Puis on ouvre celle sélectionnée
        questionFAQ.classList.add("ouvert");
    });

});


// Météo API
const btnMeteo = document.querySelector("#btnMeteo");
const carteMeteo = document.querySelector("#carte-meteo")
const messageMeteo = document.querySelector("#message-meteo")
const texteParDefaut = messageMeteo.textContent;
const urlMeteo = "https://api.open-meteo.com/v1/forecast?latitude=45.5088&longitude=-73.5878&daily=temperature_2m_max,wind_speed_10m_max,weather_code&forecast_days=7&timezone=America%2FNew_York";

let weatherCodes

// initMeteo() lance les deux fonctions nécessaires en ordre pour démarrer la météo
async function initMeteo() {
    await chargerCodesMeteo();
    await chargerMeteo();
}

// On vérifie si les codes météo existent déjà, sinon on les récupère dans le JSON
async function chargerCodesMeteo() {
    if (!weatherCodes) {
        const response = await fetch("js/json/weatherCodes.json");
        weatherCodes = await response.json();
    }
}

async function chargerMeteo() {
    btnMeteo.disabled = true;
    messageMeteo.textContent = "Chargement de la météo...";
    try {
        const response = await fetch(urlMeteo);
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération de la météo");
        }
        const data = await response.json();
        afficherMeteo(data);
        messageMeteo.textContent = texteParDefaut;
    } catch (error) {
        messageMeteo.textContent = "Impossible de récupérer la météo.";
        console.error('Erreur :', error);
    } finally {
        btnMeteo.disabled = false;
        btnMeteo.textContent = "Conditions actuelles";
    }
}

function afficherMeteo(data) {
    const jours = data.daily.time
    const temperature = data.daily.temperature_2m_max;
    const vent = data.daily.wind_speed_10m_max;
    const codeMeteo = data.daily.weather_code;

    carteMeteo.innerHTML = "";

    // Cette boucle parcourt chaque jour reçu par l'API et crée une carte météo
    jours.forEach((jour, index) => {
        const nomJour = formaterJour(jour, index);
        const temp = Math.round(temperature[index]);
        const condition = weatherCodes[codeMeteo[index]] || {
            description: "Conditions inconnues",
            icon: "not-available"
        };
        carteMeteo.innerHTML += `
            <div class="carte-jour ${condition.icon}" style="animation-delay: ${index * 0.12}s">
                <h3>${nomJour}</h3>
                <img class="icone-meteo"
    src="https://cdn.meteocons.com/3.0.0-next.10/svg/fill/${condition.icon}.svg"
    alt="${condition.description}"
>
                <p class="temp">${temp}°C</p>
                <p>Conditions : ${condition.description}</p>
                <p>Vent : ${vent[index]} km/h</p>
            </div>
        `;
    });
}

// Transforme la date reçue par l'API en une date plus facile à lire
function formaterJour(jour, index) {
    let nomJour;

    if (index === 0) {
        nomJour = "Aujourd'hui";
    } else if (index === 1) {
        nomJour = "Demain";
    } else {
        const [annee, mois, jourMois] = jour.split("-");
        const date = new Date(
            annee,
            mois - 1,
            jourMois
        );
        nomJour = date.toLocaleDateString("fr-FR", {
            weekday: "long", day: "numeric", month: "long"
        });
    }
    return nomJour.charAt(0).toUpperCase() + nomJour.slice(1);
}

// Lancement de la météo dès le chargement de la page
initMeteo();

// Actualise la météo
btnMeteo.addEventListener('click', chargerMeteo);