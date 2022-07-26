const pokemonImage = document.querySelector('.pokemon-image');
const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async id => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async id => {
  pokemonNumber.innerHTML = '###';
  pokemonName.innerHTML = 'Loading...';

  const data = await fetchPokemon(id);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonImage.src =
      data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '###';
  }
};

form.addEventListener('submit', event => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
