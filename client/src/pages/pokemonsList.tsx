import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

export const GET_POKEMONS = gql`
  query getPokemons($page: Int, $items: Int) {
    pokemons(page: $page, items: $items) {
      name
      img
    }
  }
`;

export const PokemonsList = () => {
  const { data, loading, error } = useQuery<any>(GET_POKEMONS);

  return (
    <div>
      <h3>Pokemons List</h3>
      {loading && <p>Loading ...</p>}
      {(data && !loading) && (
        <>
          <p>pokemons available</p>
          {data.pokemons.map((pokemon: any) => (
            <div key={pokemon.name}>
              <div>{pokemon.name}</div>
              <img src={pokemon.img} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};
