import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { cache } from 'src/utils/cache';
import { typeDefs } from 'src/utils/typeDefs';
import { Login, PokemonsList } from './pages';
import { User } from 'src/utils/types';
import { useEffect, useState } from 'react';
import { AUTH_TOKEN } from 'src/utils/constants';
import { getUserInfoFromToken, isTokenValid } from 'src/utils/auth';
import { Header } from './components';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  typeDefs,
});

export const App = () => {
  const [isUser, setIsUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (token && isTokenValid(token)) {
      const user = getUserInfoFromToken(token);
      setIsUser(user);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      {isUser
        ? <div>
          <Header user={isUser} />
          <PokemonsList />
        </div>
        : <Login setUser={(user: User) => setIsUser(user)} />}
    </ApolloProvider>
  );
};
