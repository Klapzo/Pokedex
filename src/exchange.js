export async function fetchPokemon(URL) {
	const pokemon = await fetch(URL).then((response) => response.json())
		.catch((error) => {
			throw error;
		});
	return pokemon;
}


