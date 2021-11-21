const { RESTDataSource } = require('apollo-datasource-rest');

const getPokemonImg = (id) => {
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
    const pokemons = results.map((pokemon, index) => (
      {...pokemon, img: getPokemonImg(index + 1)}
    ));

    return pokemons;
  }

  async getPokemon({ id }) {
    const response = await this.get(`pokemon/${id}`, { id });
    const { name } = response;
    return { name, id };
  }
}

module.exports = PokemonAPI;
