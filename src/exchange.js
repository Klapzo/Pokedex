export async function fetchPokemon(URL) {
	const pokemon = await fetch(URL)
		.then((response) => response.json())
		.catch((error) => {
			throw(error);
		});
	return pokemon;
}

export async function fetchPage() {
	
	const urlPagina = document.querySelector(".pokedex").dataset.pagina;
	
	const respuesta = await fetch(urlPagina)
		.then((response) => response.json())
		.catch((error) => {
			throw error;
		});


	return await respuesta;
}

export async function fetchImage(URL, shiny = false) {
	const pokemonURL = await fetch(URL)
		.then((respuesta) => respuesta.json())
		.catch((error) => {
			throw (error);
		});

	if (shiny) {
		return pokemonURL.sprites.front_shiny;
	}

	return pokemonURL.sprites.front_default;
}


