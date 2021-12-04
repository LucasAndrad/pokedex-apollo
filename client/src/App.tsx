import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
} from '@apollo/client';
import { cache } from 'src/utils/cache';
import { typeDefs } from 'src/utils/typeDefs';
import { Login, PokemonsList } from './pages';
import { User } from 'src/utils/types';
import { useEffect, useState } from 'react';
import { AUTH_TOKEN } from './utils/constants';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
  typeDefs,
});

export const App = () => {
  const [isUser, setIsUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (token) setIsUser({ email: '', name: '' });
  }, []);

  return (
    <ApolloProvider client={client}>
      {isUser ? <PokemonsList /> : <Login setUser={(user: User) => setIsUser(user)} />}
    </ApolloProvider>
  );
};
