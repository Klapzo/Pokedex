import { fetchPage } from "./exchange.js";
import { manejarCartas, obtenerUltimaCarta } from "./ui.js";




async function init() {
	let observador = new IntersectionObserver(
	(entradas) => {
		entradas.forEach((entrada) => {
			if (entrada.isIntersecting) {
				observador.unobserve(obtenerUltimaCarta());
				manejarCartas();
				observador.observe(obtenerUltimaCarta());

			}
		});
	},
	{
		rootMargin: "0px 0px 10px 0px",
		threshold: 1.0,
	},)
	const resultados = await fetchPage();
	manejarCartas(resultados);

	observador.observe(obtenerUltimaCarta());

}
init();

