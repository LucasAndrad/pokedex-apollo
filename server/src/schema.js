const { gql } = require('apollo-server');

const typeDefs = gql`
  type PokemonShort {
    name: String
    url: String
  }

  type Query {
    pokemons: [PokemonShort]
  }
`;

module.exports = typeDefs;
