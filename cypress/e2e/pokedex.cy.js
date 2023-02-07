/// <reference types="Cypress" />

const URL = "http://127.0.0.1:5500/index.html";

describe("carga inicial", () => {
	beforeEach(() => {
		cy.visit(URL);
	});

	it("carga la página", () => {
		cy.visit(URL);
	});

	it("cargan las 20 cartas iniciales", () => {
		cy.get(".pokedex").children().should("have.length", 20);
	});
	it("cargan las imagenes correspondientes a la carta", () => {
		cy.get(".pokedex")
			.children()
			.each(($carta, index) => {
				cy.wrap($carta)
					.children("img")
					.should("have.attr", "src")
					.should(
						"include",
						`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
							index + 1
						}.png`,
					);
			});
	});
});

describe("Funcionamiento de la vista detalle", () => {
	beforeEach(() => {
		cy.visit(URL);
		cy.get('[data-pokemonurl="https://pokeapi.co/api/v2/pokemon/1/"]').click();
	});
	it("carga la vista a detalle al presionar un pokemon", () => {
		cy.get(".pokedex").should("not.be.visible");
		cy.get(".pokemon-info").should("be.visible");
	});

	it("carga los datos correctos al clickear cada carta", () => {
		cy.get(".pokemon-nombre").should("have.text", "bulbasaur");
		cy
			.get("img")
			.should("have.attr", "src")
			.should(
				"include",
				`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`,
			),
			cy.get(".pokemon-peso").should("have.text", "69");
		cy.get(".pokemon-altura").should("have.text", "7");
		cy.get(".pokemon-id").should("have.text", "1");
		cy.get(".pokemon-orden").should("have.text", "1");
		cy.get(".pokemon-xp").should("have.text", "64");
		cy.get(".pokemon-especie").should("have.text", "bulbasaur");
	});

	it("cambia la imagen a shiny al checkear la opción", () => {
		cy
			.get("img")
			.should("have.attr", "src")
			.should(
				"include",
				`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`,
			),
			cy.get(".shiny").click();

		cy.get("img")
			.should("have.attr", "src")
			.should(
				"include",
				`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png`,
			);
	});

	it("vuelve a cargar la pokedex al presionar el botón 'volver'", () => {
		cy.get(".volver").click();
		cy.get(".pokemon-info").should("not.be.visible");
		cy.get(".pokedex").should("be.visible");
	});
});

describe("Funcionamiento del scroll y navegación infinita", () => {
	beforeEach(() => {
		cy.visit(URL);
		cy.intercept({ method: "GET", url: "https://pokeapi.co/api/v2/pokemon/**" }).as("pokemonImages");
		cy.wait("@pokemonImages");
	});

	it("scrollea hasta el final de la página para cargar 20 nuevos pokemones", () => {
		cy.get(".pokedex").children().should("have.length", 20);

		cy.scrollTo("bottom");

		cy.get(".pokedex").children().should("have.length", 40);
	});

	it("verifica que los  nuevos pokemones sean nuevos", () => {
		cy.scrollTo("bottom");

		for (let index = 0; index < 20; index++) {
			const primerPokemon = cy.get(".pokedex").children().eq(index);

			const ultimoPokemon = cy
				.get(".pokedex")
				.children()
				.eq(index + 20);
			primerPokemon.should("not.deep.equal", ultimoPokemon);
		}
	});

	it("mantiene guardado el scroll al entrar y salir de una vista a detalle", () => {
		cy.window().scrollTo("bottom");

		cy.get('[data-pokemonurl="https://pokeapi.co/api/v2/pokemon/25/"]').click();
		cy.get(".volver").click();

		cy.window().its("scrollY").should("be.greaterThan", 0);
	});
});
