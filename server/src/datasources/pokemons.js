const { RESTDataSource } = require('apollo-datasource-rest');

class PokemonAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://pokeapi.co/api/v2'
  }

  async getPokemons() {
    const response = await this.get('pokemon');
    return response.results;
  }
}

module.exports = PokemonAPI;
