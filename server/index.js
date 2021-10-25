const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema');

const data = [
  {
    name:"bulbasaur", url:"https://pokeapi.co/api/v2/pokemon/1/"
  },
  {
    name:"ivysaur", url:"https://pokeapi.co/api/v2/pokemon/2/"
  },
  {
    name:"venusaur", url:"https://pokeapi.co/api/v2/pokemon/3/"
  }
];

const resolvers = {
  Query: {
    pokemons: () => data,
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
