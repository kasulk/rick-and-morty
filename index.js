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
    const response = await fetch("https://rickandmortyapi.com/api/character");
    if (response.ok) {
      cardContainer.innerHTML = "";
      const data = await response.json();
      return data;
    } else {
      console.error("else Error");
    }
  } catch (error) {
    console.error("catch Error");
  }
}

// console.log(await fetchCharacters());

const fetchedCharactersObject = await fetchCharacters();
const fetchedCharacters = fetchedCharactersObject.results;

// console.log(fetchedCharacters);

const characterHTML = fetchedCharacters.map((character) => {
  const characterCard = createCharacterCard(
    character.name,
    character.status,
    character.type,
    character.episode.length,
    character.image
  );
  return characterCard;
});

// console.log(characterHTML);
cardContainer.innerHTML = characterHTML;

// testPageFetch
const testPageFetchData = async function testPageFetch() {
  return (
    await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
  ).json();
};
console.log("testFetch:", await testPageFetchData());

let pageIndex = page;
// Add an event listener on each of the next and prev buttons which do the following
nextButton.addEventListener("click", (event) => {
  // it is prevented that the page index could go higher than the max page index or below 1
  pageIndex++;
  pagination.innerHTML = pageIndex + " / " + fetchedCharactersObject.info.pages;
  console.log("pageIndex:", pageIndex);
  if (pageIndex === fetchedCharactersObject.info.pages) {
    nextButton.disabled = true;
  }
  prevButton.disabled = false;
});
prevButton.addEventListener("click", (event) => {
  // it is prevented that the page index could go higher than the max page index or below 1
  pageIndex--;
  pagination.innerHTML = pageIndex + " / " + fetchedCharactersObject.info.pages;
  console.log("pageIndex:", pageIndex);
  if (pageIndex === 1) {
    prevButton.disabled = true;
  }
  nextButton.disabled = false;
});

// the page index is increased / decreased
// the fetchCharacters function is called

pagination.innerHTML = "1 / " + fetchedCharactersObject.info.pages;
