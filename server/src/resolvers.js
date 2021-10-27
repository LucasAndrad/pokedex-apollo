module.exports = {
  Query: {
    pokemons: (_, __, { dataSources }) =>
      dataSources.pokemonAPI.getPokemons(),
  }
}
