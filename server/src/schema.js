const { gql } = require('apollo-server');

const typeDefs = gql`
  type PokemonShort {
    name: String
    url: String
    img: String
  }

  type AbilityShort {
    name: String
    url: String
  }

  type TypeShort {
    name: String
    url: String
  }

  type Pokemon {
    id: Int
    name: String
    # abilities: [AbilityShort]
    # height: Int
    # width: Int
    # types: [TypeShort]
    # imgs: {
    #   default: String
    #   game: String
    #   gameShiny: String
    # }
  }

  type Query {
    pokemons(items: Int, page: Int): [PokemonShort]
    pokemon(id: Int!): Pokemon
  }
`;

module.exports = typeDefs;
