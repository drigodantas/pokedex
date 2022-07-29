const pokeForm = document.querySelector('.pokeForm');
const pokeInput = document.querySelector('.pokeInput');
const pokeImage = document.querySelector('.pokeImage');
const pokeName = document.querySelector('.pokeName')
const pokeType = document.querySelector('.pokeType')

let pokeValue;
pokeImage.style.display = "none"

const pokemon = async function receberPoke(pokemon) { 

    const pokeAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    

    if (pokeAPI.status >= 400){
        pokeName.innerText = "Pokemon não encontrado"
        pokeImage.style.display = "none"
        pokeType.innerText = ""

    }

    const pokeData = await pokeAPI.json();
    console.log(pokeData);
    return pokeData
}

async function exibirPoke() {
    pokeName.innerText = "Procurando pokemon"

    const pokemonData = await pokemon(pokeValue)
    
    //image
    pokeImage.style.display = "inline"
    if (pokemonData.sprites.versions["generation-v"]["black-white"].animated.front_default === null) {
        pokeImage.src = pokemonData.sprites.versions["generation-v"]["black-white"].front_default
    }else {
        pokeImage.src = pokemonData.sprites.versions["generation-v"]["black-white"].animated.front_default
    }
    
    //name
    pokeName.innerText = `${pokemonData.id} - ${pokemonData.name}`

    //type
    if(pokemonData['types'].length === 2) {
    return pokeType.innerText = `Tipos: ${pokemonData['types'][0]['type']['name']} / ${pokemonData['types'][1]['type']['name']}`
    }

    pokeType.innerText = `Tipo: ${pokemonData['types'][0]['type']['name']}`
    
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

