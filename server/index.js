const { ApolloServer, AuthenticationError } = require('apollo-server');
const typeDefs = require('./src/schema');
const PokemonAPI = require('./src/datasources/pokemons');
const UserAPI = require('./src/datasources/users');
const resolvers = require('./src/resolvers');
const { createStore } = require('./src/db/create');
const { parseJwt } = require('./src/utils/auth');

(async () => {
  const store = await createStore();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      pokemonAPI: new PokemonAPI(),
      usersAPI: new UserAPI({ store })
    }),
    context: ({ req }) => {
      const authorizationHeader = req.headers.authorization || '';
      const token = authorizationHeader.split('Bearer ')[1];
      const user = parseJwt(token);
      if (!user) throw new AuthenticationError('Invalid token. Please login again.');

      return user;
    }
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})();
