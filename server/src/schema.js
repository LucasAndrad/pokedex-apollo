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
    createdAt: String
    password: String
    token: String
  }

  type LoginRes {
    token: String
    error: String
  }

  type UserPokemon {
    userEmail: String
    pokeId: Int!
    pokeName: String
  }

  type UpdateUserPokemonRes {
    userPokemon: UserPokemon
    action: String
  }

  type Query {
    pokemons(items: Int, page: Int): [PokemonShort]
    pokemon(id: Int!): Pokemon
    userPokemons: [UserPokemon]
  }

  type Mutation {
    createAccount(email: String!, name: String, password: String!): User
    login(email: String!, password: String!): LoginRes
    updateUserPokemons(pokeId: Int!): UpdateUserPokemonRes
  }
`;

module.exports = typeDefs;
