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
let maxPage;
let page = 1;
const searchQuery = "";

async function fetchCharacters(page) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
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

let fetchedCharactersObject = "";

async function renderCharacters(page) {
  fetchedCharactersObject = await fetchCharacters(page);
  maxPage = fetchedCharactersObject.info.pages;

  let fetchedCharacters = fetchedCharactersObject.results;

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

  cardContainer.innerHTML = characterHTML;
}
await renderCharacters();

let pageIndex = page;
nextButton.addEventListener("click", async (event) => {
  pageIndex++;
  pagination.innerHTML = pageIndex + " / " + maxPage;
  console.log("pageIndex:", pageIndex);
  if (pageIndex === maxPage) {
    nextButton.disabled = true;
  }
  prevButton.disabled = false;
  await renderCharacters(pageIndex);
});

prevButton.disabled = true;
prevButton.addEventListener("click", async (event) => {
  pageIndex--;
  pagination.innerHTML = pageIndex + " / " + maxPage;
  nextButton.disabled = false;
  console.log("pageIndex:", pageIndex);
  if (pageIndex === 1) {
    prevButton.disabled = true;
  }
  await renderCharacters(pageIndex);
});

pagination.innerHTML = "1 / " + maxPage;
