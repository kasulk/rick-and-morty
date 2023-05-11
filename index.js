import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');

const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

//test
const name = "blub";
const status = "testStatus";
const type = "testType";
const occurences = "5";
const src = "https://rickandmortyapi.com/api/character/avatar/1.jpeg";

cardContainer.innerHTML = createCharacterCard(
  name,
  status,
  type,
  occurences,
  src
);

async function fetchCharacters() {
  try {
    const response = await fetch ("https://rickandmortyapi.com/api");
    if (response.ok) {
    const data = await response.json();
    return data;
    } else {
      console.error("else Error")
    }

  } catch (error) {
    console.error("catch Error")
  }
  
}
//
console.log(await fetchCharacters());