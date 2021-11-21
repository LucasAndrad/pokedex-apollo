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
    abilities: [AbilityShort]
    name: String
    height: Int
    width: Int
    types: [TypeShort]
    imgs: {
      default: String
      game: String
      gameShiny: String
    }
  }

  type Query {
    pokemons(items: Int, page: Int): [PokemonShort]
  }
`;

module.exports = typeDefs;
