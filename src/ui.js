import { fetchImage, fetchPage, fetchPokemon } from "./exchange.js";

const observador = new IntersectionObserver((entradas) => {
	manejarEntradasObservador(entradas);
}, configuracionObservador);

var scroll;
export async function manejarCartas() {
	crearCartas()
	escucharClicks();
	await popularCartas();
	observarUltimaCarta()
	cambiarASiguientePagina();
}

function observarUltimaCarta() {
	observador.disconnect();
	const $cards = document.querySelectorAll(".card-template");
	const $ultimaCarta = $cards[$cards.length - 1];
	observador.observe($ultimaCarta);
}


async function popularCartas() {
	const lista = await fetchPage();
	const listaPokemones = await lista.results;

	const $cartasVacias = document.querySelectorAll(".card-template:not(.populated)");


	$cartasVacias.forEach(async function ($carta, index) {
		const pokemon = await listaPokemones[index];

		$carta.classList.add("populated");

		const nombrePokemon = pokemon.name;
		const urlImagenPokemon = await fetchImage(pokemon.url);

		$carta.querySelector("h3").innerText = nombrePokemon;
		$carta.querySelector("img").setAttribute("src", urlImagenPokemon);
		$carta.dataset.pokemonurl = listaPokemones[index].url;
	});

}



async function popularDetail(imagenURL, $detail) {
	const shinyCheckbox = $detail.querySelector(".shiny");
	var shiny = false;
	shinyCheckbox.checked = false;
	const pokemon = await fetchPokemon(imagenURL);
	const urlImagenPokemon = await fetchImage(imagenURL, shiny);

	$detail.querySelector("h3").innerText = nombre;
	$detail.querySelector("img").setAttribute("src", urlImagenPokemon);

	shinyCheckbox.onclick = async (e) => {
		e.srcElement.checked ? (shiny = true) : (shiny = false);
		const urlImagenPokemon = await fetchImage(imagenURL, shiny);
		$detail.querySelector("img").setAttribute("src", urlImagenPokemon);
	};
}

function cambiarEscena(e) {
	const $pokedex = document.querySelector(".pokedex");
	const $detail = document.querySelector(".pokemon-detail");
	const cartaClickeada = e.currentTarget;
	if ($pokedex.classList.contains("hidden")) {
		$pokedex.classList.toggle("hidden");
		$detail.classList.toggle("hidden");

		document.documentElement.scrollTop = scroll;
	} else {
		scroll = document.documentElement.scrollTop;
		$pokedex.classList.toggle("hidden");
		$detail.classList.toggle("hidden");
		popularDetail(cartaClickeada.dataset.pokemonurl, $detail);
	}
}

function crearCartas(cantidad = 20) {

	const $pokedex = document.querySelector(".pokedex");

	for (let i = 0; i < cantidad; i++) {
		const $carta = document.createElement("div");
		$carta.className = "card-template";
		$carta.innerHTML = `<h3></h3>
				<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png" class="pokemon-sprite" />
				<span> ... <span/>`;

		$pokedex.appendChild($carta);
	}
}

var configuracionObservador = {
	rootMargin: "0px 0px 10px 0px",
	threshold: 1.0,
};

function manejarEntradasObservador(entradas) {
	entradas.forEach((entrada) => {
		if (entrada.isIntersecting) {
			observador.disconnect();
			if (document.querySelectorAll(".card-template").length < 1278) {
				manejarCartas();
			}
			return;
		}
	});
}
