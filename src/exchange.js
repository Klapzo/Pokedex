
export async function fetchPokemon(URL) {
	const pokemon = await fetch(URL).then((response) => response.json());
	return pokemon;
}

export async function fetchPage() {
	const $URL = document.querySelector(".pokedex").dataset.pagina;
	const respuesta = await fetch($URL).then((response) => response.json());

	return respuesta;
}

export async function fetchImage(URL, shiny=false) {
	const pokemonURL = await fetch(URL)
		.then((respuesta) => respuesta.json())
		
		if (shiny){		
			return pokemonURL.sprites.front_shiny
		}
	
	return pokemonURL.sprites.front_default;
}
