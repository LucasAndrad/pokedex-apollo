const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema');
const PokemonAPI = require('./src/datasources/pokemons');
const resolvers = require('./src/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    pokemonAPI: new PokemonAPI(),
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
