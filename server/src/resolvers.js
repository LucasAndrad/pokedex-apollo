module.exports = {
  Query: {
    pokemon: (_, { id }, { dataSources }) => dataSources.pokemonAPI.getPokemon({ id }),
    pokemons: (_, { items, page }, { dataSources }) =>
      dataSources.pokemonAPI.getPokemons({ items, page }),
    userPokemons: (_, __, { dataSources, user }) => dataSources.usersAPI.getUserPokemons({ user }),
  },
  Mutation: {
    login: (_, { email, password }, { dataSources }) => dataSources.usersAPI.loginUser({ email, password }),
    createAccount: (_, { email, name, password }, { dataSources }) =>
      dataSources.usersAPI.findOrCreateUser({ email, name, password }),
    updateUserPokemons: (_, { pokeId }, { dataSources, user }) =>
      dataSources.usersAPI.updateUserPokemons({ user, pokeId }),
  }
}
