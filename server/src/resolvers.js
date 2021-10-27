module.exports = {
  Query: {
    pokemons: (_, { items, page }, { dataSources }) =>
      dataSources.pokemonAPI.getPokemons({ items, page }),
  }
}
