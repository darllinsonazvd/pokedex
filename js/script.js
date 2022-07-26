const pokemonImage = document.querySelector('.pokemon-image');
const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');

const fetchPokemon = async id => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await APIResponse.json();

  return data;
};

const renderPokemon = async id => {
  const data = await fetchPokemon(id);

  pokemonImage.src =
    data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
  pokemonName.innerHTML = data.name;
  pokemonNumber.innerHTML = data.id;
};

form.addEventListener('submit', event => {
  event.preventDefault();

  renderPokemon(input.value);
});
