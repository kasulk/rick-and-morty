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
let searchQuery = "";

//fetch data
async function fetchCharacters(page, searchQuery) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
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

// function to render the characters
async function renderCharacters(page, searchQuery) {
  fetchedCharactersObject = await fetchCharacters(page, searchQuery);
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
//initial render cards
await renderCharacters(page, searchQuery);

let pageIndex = page;
//next Button
nextButton.addEventListener("click", async () => {
  // console.log("pageIndex:", pageIndex);
  if (pageIndex === maxPage) {
    return;
  }
  pageIndex++;
  pagination.innerHTML = pageIndex + " / " + maxPage;

  await renderCharacters(pageIndex, searchQuery);
});

//prev Button
prevButton.addEventListener("click", async () => {
  // console.log("pageIndex:", pageIndex);
  if (pageIndex === 1) {
    return;
  }
  pageIndex--;
  pagination.innerHTML = pageIndex + " / " + maxPage;

  await renderCharacters(pageIndex, searchQuery);
});

//initial render page numbers
pagination.innerHTML = page + " / " + maxPage;

//search bar
searchBar.addEventListener("submit", async (event) => {
  event.preventDefault();

  searchQuery = event.target.query.value;
  console.log("searchQuery:", searchQuery);

  await renderCharacters(page, searchQuery);

  console.log("maxPage:", maxPage);
  pagination.innerHTML = page + " / " + maxPage;

  pageIndex = 1;
});
