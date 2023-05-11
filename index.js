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

// console.log(await fetchCharacters());

let fetchedCharactersObject = "";

async function renderCharacters(page) {
  fetchedCharactersObject = await fetchCharacters(page);
  let fetchedCharacters = fetchedCharactersObject.results;

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

  // return fetchedCharactersObject;
}
await renderCharacters();

// testPageFetch
const testPageFetchData = async function testPageFetch() {
  return (
    await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
  ).json();
};
// console.log("testFetch:", await testPageFetchData());

let pageIndex = page;
// Add an event listener on each of the next and prev buttons which do the following
nextButton.addEventListener("click", async (event) => {
  // it is prevented that the page index could go higher than the max page index or below 1
  pageIndex++;
  pagination.innerHTML = pageIndex + " / " + fetchedCharactersObject.info.pages;
  console.log("pageIndex:", pageIndex);
  if (pageIndex === fetchedCharactersObject.info.pages) {
    nextButton.disabled = true;
  }
  prevButton.disabled = false;

  // await fetchCharacters(5);
  // console.log("fetchCharacters:", await fetchCharacters(6));
  await renderCharacters(pageIndex);
  // console.log("renderCharacters(5):", await renderCharacters(5));
});

prevButton.addEventListener("click", async (event) => {
  // it is prevented that the page index could go higher than the max page index or below 1
  pageIndex--;
  pagination.innerHTML = pageIndex + " / " + fetchedCharactersObject.info.pages;
  console.log("pageIndex:", pageIndex);
  if (pageIndex === 1) {
    prevButton.disabled = true;
  }
  nextButton.disabled = false;

  await renderCharacters(pageIndex);
});

// the page index is increased / decreased
// the fetchCharacters function is called

pagination.innerHTML = "1 / " + fetchedCharactersObject.info.pages;
