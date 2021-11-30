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
    height: Int
    weight: Int
    # abilities: [AbilityShort]
    # types: [TypeShort]
    # imgs: {
    #   default: String
    #   game: String
    #   gameShiny: String
    # }
  }

  type User {
    email: String!
    name: String
  }

  type Query {
    pokemons(items: Int, page: Int): [PokemonShort]
    pokemon(id: Int!): Pokemon
  }

  type Mutation {
    createAccount(email: String!, name: String): User
  }
`;

module.exports = typeDefs;
