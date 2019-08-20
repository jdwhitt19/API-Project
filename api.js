const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
let pokemonName = document.querySelector(".search");
const searchForm = document.querySelector('form');
let pokemonResults = document.querySelector(".pokemonResults");
let moveList = document.querySelector(".moveList");

searchForm.addEventListener('submit', fetchResults);

function fetchResults(e) {
    let url = baseURL + pokemonName.value;
    e.preventDefault();

    fetch(url)
    .then(function(result) {
    return result.json();
}) .then(function(json) {
    console.log(json);
    displayResults(json);
});
}

function displayResults (json) {
    while (pokemonResults.firstChild) {
        pokemonResults.removeChild(pokemonResults.firstChild);
    }
    let name = document.createElement('h2'); // name
    let image = document.createElement('img'); // picture
    let weight = document.createElement('h4'); // weight
    let type = document.createElement('h4'); // type
    let abilities = document.createElement('h4'); // abilities
    let statTable = document.createElement('table'); // table of stats
    
    name.innerText=json.name;
    image.src=json.sprites.front_default;
    weight.innerText='Weight: ' + json.weight;
    type.innerText='Type: ' + json.types[0].type.name;
    abilities.innerText='Abilities: ' + json.abilities[0].ability.name + ', ' + json.abilities[1].ability.name;
    
    
    pokemonResults.appendChild(name);
    pokemonResults.appendChild(image);
    pokemonResults.appendChild(weight);
    pokemonResults.appendChild(type);
    pokemonResults.appendChild(abilities);

    for (j = 0; j < json.stats.length; j ++) {
        let statRow = document.createElement('tr');
        let statName = document.createElement('td');
        let statBase = document.createElement('td');
        statName.innerText=json.stats[j].stat.name;
        statBase.innerText=json.stats[j].base_stat;

        statTable.appendChild(statRow);
        statRow.appendChild(statName);
        statRow.appendChild(statBase);
    }

    pokemonResults.appendChild(statTable);
    
    for (i = 0; i < json.moves.length; i++) {
        let moves = document.createElement('li');
        moves.innerText=json.moves[i].move.name;
        moveList.appendChild(moves);
    }
    
}