const { RESTDataSource } = require('apollo-datasource-rest');

class PokemonAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://pokeapi.co/api/v2'
  }

  async getPokemons({ items, page }) {
    const offset = items * (page - 1);
    const response = await this.get('pokemon', { limit: items, offset });
    return response.results;
  }
}

module.exports = PokemonAPI;
