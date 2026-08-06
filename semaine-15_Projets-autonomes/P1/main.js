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
const urlMeteo = "https://api.open-meteo.com/v1/forecast?latitude=45.5088&longitude=-73.5878&daily=temperature_2m_max,wind_speed_10m_max,weather_code&forecast_days=7&timezone=America%2FNew_York";

let weatherCodes

function afficherMeteo(data) {
    const jours = data.daily.time
    const temp = data.daily.temperature_2m_max;
    const vent = data.daily.wind_speed_10m_max;
    const codeMeteo = data.daily.weather_code;

    carteMeteo.innerHTML = "";

    jours.forEach((jour, index) => {
        const nomJour = formaterJour(jour, index);
        const description = weatherCodes[codeMeteo[index]] || "Conditions inconnues";
        carteMeteo.innerHTML += `
            <div class="carte-jour">
                <h3>${nomJour}</h3>
                <p>🌡️ Température : ${temp[index]} °C</p>
                <p>💨 Vent : ${vent[index]} km/h</p>
                <p>🏙️ Conditions : ${description}</p>
            </div>
        `;
    });
}

async function initMeteo() {
    await chargerCodesMeteo();
    await chargerMeteo();
}

async function chargerMeteo() {
    carteMeteo.innerHTML = `
        <p>Chargement de la météo...</p>
        `;
    try {
        const response = await fetch(urlMeteo);
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération de la météo");
        }
        const data = await response.json();
        afficherMeteo(data);
    } catch (error) {
        carteMeteo.innerHTML = `
            <p>Impossible de récupérer la météo pour le moment.</p>
        `;
        console.error('Erreur :', error);
    }
}

async function chargerCodesMeteo() {
    if (!weatherCodes) {
        const response = await fetch("weatherCodes.json");
        weatherCodes = await response.json();
    }
}

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

initMeteo();

btnMeteo.addEventListener('click', chargerMeteo);


