const pokeDiv = document.querySelector('.pokeDIV');
const pokeForm = document.querySelector('.pokeForm');
const pokeInput = document.querySelector('.pokeInput');
const pokeImage = document.querySelector('.pokeImage');
const pokeName = document.querySelector('.pokeName');
const pokeType = document.querySelector('.pokeType');

let pokeValue;
pokeImage.style.display = "none"
pokeDiv.style.display =  "none"

const pokemon = async function receberPoke(pokemon) { 

    const pokeAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);

    removeClassType()

    if (pokeAPI.status >= 400){
        pokeName.innerText = "Pokemon não encontrado!"
        removePokeImg ()
    }

    const pokeData = await pokeAPI.json();
    return pokeData
}

async function exibirPoke() {
    removeClassType()
    removePokeImg ()
    pokeName.innerText = "Procurando pokemon"
    pokeDiv.style.display = "block"
    const pokemonData = await pokemon(pokeValue)
    
    //image
    pokeImage.style.display = "inline"
    if (pokemonData.sprites.versions["generation-v"]["black-white"].animated.front_default === null) {
        pokeImage.src = pokemonData.sprites.versions["generation-v"]["black-white"].front_default
    } else {
        pokeImage.src = pokemonData.sprites.versions["generation-v"]["black-white"].animated.front_default
    }
    
    //name
    pokeName.innerText = `${pokemonData.id} - ${pokemonData.name}`

    //type
    if (pokemonData['types'].length === 2) {
        pokeType.innerText = `Tipos: ${pokemonData['types'][0]['type']['name']} / ${pokemonData['types'][1]['type']['name']}`
    } else {
        pokeType.innerText = `Tipo: ${pokemonData['types'][0]['type']['name']}`
    }

    
    removeClassType()

    const type = pokemonData.types[0].type.name
    pokeDiv.classList.add(type)
    
}

pokeForm.addEventListener('submit', e => {

    e.preventDefault();

    pokeValue = pokeInput.value;

    if(pokeValue === "") {
        return
    }

    exibirPoke();
    pokeInput.value = ""

})

function removeClassType () {
    pokeDiv.classList.remove("grass", "fire", "bug", "normal", "poison", "ground", "fairy", "water", "fighting", "psychic", "electric", "ghost", "rock", "ice", "dragon", "flying", "dark", "steel")
}

function removePokeImg () {
    pokeImage.style.display = "none"
    pokeType.innerText = ""
}