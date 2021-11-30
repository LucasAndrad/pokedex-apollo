module.exports = {
  Query: {
    pokemon: (_, { id }, { dataSources }) => dataSources.pokemonAPI.getPokemon({ id }),
    pokemons: (_, { items, page }, { dataSources }) =>
      dataSources.pokemonAPI.getPokemons({ items, page }),
  },
  Mutation: {
    createAccount: (_, { email, name }, { dataSources }) => dataSources.usersAPI.findOrCreateUser({ email, name }),
  }
}
