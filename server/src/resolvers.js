module.exports = {
  Query: {
    pokemon: (_, { id }, { dataSources }) => dataSources.pokemonAPI.getPokemon({ id }),
    pokemons: (_, { items, page }, { dataSources }) =>
      dataSources.pokemonAPI.getPokemons({ items, page }),
  },
  Mutation: {
    createAccount: (_, { email, name, password }, { dataSources }) => dataSources.usersAPI.findOrCreateUser({ email, name }),
  }
}
