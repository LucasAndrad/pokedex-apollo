const { RESTDataSource } = require('apollo-datasource-rest');

const getPokemonId = (pokemon) => {
  const {url} = pokemon;
  // url has this format: "https://pokeapi.co/api/v2/pokemon/21/"
  const id =
  url.split('/pokemon/')[1].split('/')[0]
  return id;
}

const getPokemonImg = (pokemon) => {
  const {url} = pokemon;
  // url has this format: "https://pokeapi.co/api/v2/pokemon/21/"
  const id = url.split('/pokemon/')[1].split('/')[0]
  let pokemonId = `${id}`;
  if (id < 100) pokemonId = `0${id}`;
  if (id < 10) pokemonId = `00${id}`;

  return `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/${pokemonId}.png`;
}

class PokemonAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://pokeapi.co/api/v2'
  }

  async getPokemons({ items, page }) {
    const offset = items * (page - 1);
    const { results = [] } = await this.get('pokemon', { limit: items, offset });
    // Add image link
    const pokemons = results.map((pokemon) => (
      {...pokemon, img: getPokemonImg(pokemon), id: getPokemonId(pokemon)}
    ));

    return pokemons;
  }

  async getPokemon({ id }) {
    const response = await this.get(`pokemon/${id}`, { id });
    const { name, height, weight } = response;
    return { id, name, height, weight };
  }
}

module.exports = PokemonAPI;
