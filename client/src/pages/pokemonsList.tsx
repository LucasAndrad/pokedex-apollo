import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import './pokemonList.css';
import { starFullIcon, starIcon } from 'src/assets';

const GET_POKEMONS = gql`
  query getPokemons($page: Int, $items: Int) {
    pokemons(page: $page, items: $items) {
      id
      name
      img
    }
  }
`;

const GET_USER_POKEMONS = gql`
  query GetUserPokemons {
    userPokemons {
      userEmail
      pokeId
    }
  }
`;

const UPDATE_USER_POKEMONS = gql`
  mutation updateUserPokemons($pokeId: Int!) {
    updateUserPokemons(pokeId: $pokeId) {
      userPokemon {
        userEmail
        pokeId
      }
      action
    }
  }
`;

export const PokemonsList = () => {
  const [page, setPage] = useState(1);
  const [userPokeIds, setUserPokeIds] = useState<number[]>([]);

  const {
    data: userPokemonsData,
    loading: userPokemonsLoading,
    refetch: refetchUserPokeons,
  } = useQuery<any>(GET_USER_POKEMONS);

  const [updateUserPokemon] = useMutation<any>(UPDATE_USER_POKEMONS, {
    refetchQueries: [
      GET_USER_POKEMONS,
      'GetUserPokemons',
    ],
  });

  const { data, loading, error, refetch } = useQuery<any>(GET_POKEMONS,
    { variables: { page, items: 40 } },
  );

  useEffect(() => {
    if (userPokemonsData?.userPokemons?.length) {
      const ids = userPokemonsData?.userPokemons.map((userPokemon: any) => userPokemon.pokeId);
      setUserPokeIds(ids);
    }
  }, [userPokemonsData]);

  useEffect(() => {
    if (!userPokemonsLoading) refetchUserPokeons();
  }, []);

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
                {userPokeIds.includes(parseInt(pokemon.id))
                  ? <img
                    src={starFullIcon}
                    width="22"
                    className="pokemonStar"
                    onClick={() => updateUserPokemon({ variables: { pokeId: pokemon.id } })}
                  />
                  : <img
                    src={starIcon}
                    width="22"
                    className="pokemonStar"
                    onClick={() => updateUserPokemon({ variables: { pokeId: pokemon.id } })}
                  />
                }

              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
