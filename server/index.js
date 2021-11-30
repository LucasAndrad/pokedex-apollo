const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema');
const PokemonAPI = require('./src/datasources/pokemons');
const UserAPI = require('./src/datasources/users');
const resolvers = require('./src/resolvers');
const { createStore } = require('./src/db/create');

const store = createStore();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    pokemonAPI: new PokemonAPI(),
    usersAPI: new UserAPI({ store })
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
