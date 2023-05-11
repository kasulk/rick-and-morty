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


async function fetchCharacters() {
  try {
    const response = await fetch ("https://rickandmortyapi.com/api/character");
    if (response.ok) {
      cardContainer.innerHTML = "";
    const data = await response.json();
    return data;
    } else {
      console.error("else Error")
    }

  } catch (error) {
    console.error("catch Error")
  }
  
}

console.log(await fetchCharacters());

const fetchedCharactersObject = await fetchCharacters();
const fetchedCharacters = fetchedCharactersObject.results;

console.log(fetchedCharacters);

const characterHTML = fetchedCharacters.map((character) => {
  const characterCard = createCharacterCard(character.name, character.status, character.type, character.episode.length, character.image)
  return characterCard

});

console.log(characterHTML);
cardContainer.innerHTML = characterHTML


