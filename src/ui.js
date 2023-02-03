import { fetchImage, fetchPage, fetchPokemon } from "./exchange.js";
var shiny = false;
var scroll;

export function obtenerUltimaCarta() {
	const $cartas = document.querySelectorAll(".card-template");
	const $ultimaCarta = $cartas[$cartas.length - 1];

	return $ultimaCarta;
}

export async function manejarCartas() {
	crearCartas();
	escucharClicks();

	const pokemones = await fetchPage();

	const $cartas = document.querySelectorAll(".card-template:not(.populated)");
	$cartas.forEach(async (carta, index) => {
		popularCarta(carta, index);
	});

	document.querySelector(".pokedex").dataset.pagina = pokemones.next;
}

function escucharClicks() {
	document
		.querySelectorAll("div[class=card-template]")
		.forEach((carta) => carta.addEventListener("click", cambiarEscena));

	const $botonVolver = document.querySelector(".pokemon-detail").querySelector(".volver");
	$botonVolver.onclick = cambiarEscena;
}

function esShiny(e) {
	return;
}

async function popularCarta($carta, index) {
	const pokemones = await fetchPage();
	const urlImagenPokemon = await fetchImage(pokemones.results[index].url);

	const nombrePokemon = pokemones.results[index].name;
	$carta.querySelector("h3").innerText = nombrePokemon;
	$carta.querySelector("img").setAttribute("src", urlImagenPokemon);

	$carta.dataset.pokemonurl = pokemones.results[index].url;
	$carta.classList.add("populated");
}

async function popularDetail(pokemonURL, $pokemonDetail) {
	var shiny = false;
	const shinyCheckbox = $pokemonDetail.querySelector(".shiny");
    
    shinyCheckbox.checked = false
	const pokemon = await fetchPokemon(pokemonURL);
	const urlImagenPokemon = await fetchImage(pokemonURL, shiny);

	const nombre = pokemon.name;

	const peso = pokemon.weight;
	const altura = pokemon.height;
	const id = pokemon.id;
	const orden = pokemon.order;
	const xp = pokemon.base_experience;
	const especie = pokemon.species.name;

	$pokemonDetail.querySelector("h3").innerText = nombre;
	$pokemonDetail.querySelector("img").setAttribute("src", urlImagenPokemon);
	$pokemonDetail.querySelector(".pokemon-peso").innerText = peso;
	$pokemonDetail.querySelector(".pokemon-altura").innerText = altura;
	$pokemonDetail.querySelector(".pokemon-id").innerText = id;
	$pokemonDetail.querySelector(".pokemon-orden").innerText = orden;
	$pokemonDetail.querySelector(".pokemon-xp").innerText = xp;
	$pokemonDetail.querySelector(".pokemon-especie").innerText = especie;

	shinyCheckbox.onclick = async (e) => {
		e.srcElement.checked ? (shiny = true) : (shiny = false);
		const urlImagenPokemon = await fetchImage(pokemonURL, shiny);
		$pokemonDetail.querySelector("img").setAttribute("src", urlImagenPokemon);
	};
}

function cambiarEscena(e) {
	const $pokedex = document.querySelector(".pokedex");
	const $pokemonDetail = document.querySelector(".pokemon-detail");
	const cartaClickeada = e.currentTarget;
	if ($pokedex.classList.contains("hidden")) {
		$pokedex.classList.toggle("hidden");
		$pokemonDetail.classList.toggle("hidden");

		document.documentElement.scrollTop = scroll;
	} else {
		scroll = document.documentElement.scrollTop;
		$pokedex.classList.toggle("hidden");
		$pokemonDetail.classList.toggle("hidden");
		popularDetail(cartaClickeada.dataset.pokemonurl, $pokemonDetail);
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
