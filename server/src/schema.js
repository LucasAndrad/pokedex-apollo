const { gql } = require('apollo-server');

const typeDefs = gql`
  type PokemonShort {
    name: String
    url: String
    img: String
  }

  type Query {
    pokemons(items: Int, page: Int): [PokemonShort]
  }
`;

module.exports = typeDefs;
