async function getAPI() {
    try {
        const response = await fetch('https://www.refugerestrooms.org/api/v1/restrooms/');
        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error('Erreur :', error);
    }
}

function showRestrooms(data) {

    for (let i = 0; i < data.length; i++) {
        let carte = document.createElement("div")

        let name = document.createElement("h2");
        let street = document.createElement("p");
        let city = document.createElement("p");
        let directions = document.createElement("p");
        let comment = document.createElement("p");

        name.textContent = data[i].name;
        street.textContent = 'Street : ' + data[i].street;
        city.textContent = 'City : ' + data[i].city;
        directions.textContent = 'Directions : ' + data[i].directions;
        comment.textContent = 'Comment : ' + data[i].comment;

        document.body.appendChild(carte)
        carte.classList.add("carte")

        carte.append(name, street, city, directions, comment)
    }

}

async function initialiser() {
    const data = await getAPI();
    showRestrooms(data);
}

initialiser()