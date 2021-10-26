const { RESTDataSource } = require('apollo-datasource-rest');

class PokemonsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://pokeapi.co/api/v2'
  }

  async getPokemons() {
    const response = this.get('pokemon');
    return response.data.results;
  }
}
