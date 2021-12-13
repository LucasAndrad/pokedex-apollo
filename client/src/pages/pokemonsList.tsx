import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import './pokemonList.css';
import { starIcon } from 'src/assets';

export const GET_POKEMONS = gql`
  query getPokemons($page: Int, $items: Int) {
    pokemons(page: $page, items: $items) {
      name
      img
    }
  }
`;

export const PokemonsList = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useQuery<any>(GET_POKEMONS,
    { variables: { page, items: 40 } },
  );

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  useEffect(() => {
    if (!loading) refetch();
  }, [page]);

  return (
    <div>
      <h3>Pokemons List</h3>
      {loading && <p>Loading ...</p>}
      {(data && !loading) && (
        <>
          <p>Pokemons available</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="pageBtn" onClick={previousPage}>{`<`}</button>
            <span>{`page: ${page}`}</span>
            <button className="pageBtn" onClick={nextPage}>{`>`}</button>
          </div>
          <div className="allPokemons">
            {data.pokemons.map((pokemon: any) => (
              <div key={pokemon.name} className="pokemonContainer">
                <div style={{ marginRight: '10px' }}>
                  <span className="pokemonName">{pokemon.name}</span>
                </div>
                <img src={pokemon.img} width="50" />
                <img src={starIcon} width="22" className="pokemonStar" />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
