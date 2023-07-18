This is a Pokedex built with JavaScript and the PokeAPI.

To run the project, clone the repository and open it in your code editor. Then, run the following commands in your terminal:

```
npm install
npm start
```

The project will be served on port 3000. You can open it in your browser by going to http://localhost:3000.

The Pokedex is divided into two parts: the main page and the Pokemon detail page.

The main page displays a list of Pokemon cards. Each card has a name, an image, and a button that opens the Pokemon detail page.

The Pokemon detail page displays information about the Pokemon, such as its name, weight, height, ID, order, XP, and species. It also has a checkbox that allows you to toggle between the Pokemon's normal and shiny sprites.

The project uses the following technologies:

* JavaScript
* HTML
* CSS
* IntersectionObserver API
* PokeAPI

The IntersectionObserver API is used to load more Pokemon cards as the user scrolls down the page. The API listens for when a card enters the viewport and then loads the card's data.

The PokeAPI is used to fetch data about Pokemon. The API provides a RESTful interface that allows you to fetch data about Pokemon, such as their names, images, and stats.

The project is structured as follows:

* The `index.html` file contains the main page.
* The `src/exchange.js` file contains the functions that fetch data from the PokeAPI.
* The `src/main.css` file contains the styles for the project.
* The `src/ui.js` file contains the functions that handle user interactions.

I hope this helps!