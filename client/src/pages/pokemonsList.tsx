import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import './pokemonList.css';

export const GET_POKEMONS = gql`
  query getPokemons($page: Int, $items: Int) {
    pokemons(page: $page, items: $items) {
      name
      img
    }
  }
`;

export const PokemonsList = () => {
  const [page, setpage] = useState(0);
  const { data, loading, error } = useQuery<any>(GET_POKEMONS,
    { variables: { page: 1, items: 40 } },
  );

  return (
    <div>
      <h3>Pokemons List</h3>
      {loading && <p>Loading ...</p>}
      {(data && !loading) && (
        <>
          <p>Pokemons available</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="pageBtn">{`<`}</button>
            <span>{`page: ${page}`}</span>
            <button className="pageBtn">{`>`}</button>
          </div>
          <div className="allPokemons">
            {data.pokemons.map((pokemon: any) => (
              <div key={pokemon.name} className="pokemonContainer">
                <div style={{ marginRight: '10px' }}>
                  <span className="pokemonName">{pokemon.name}</span>
                </div>
                <img src={pokemon.img} width="50" />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
