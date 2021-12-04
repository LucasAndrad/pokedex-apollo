import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
} from '@apollo/client';
import { cache } from 'src/utils/cache';
import { typeDefs } from 'src/utils/typeDefs';
import { Login, PokemonsList } from './pages';
import { User } from 'src/utils/types';
import { useState } from 'react';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
  typeDefs,
});

export const App = () => {
  const [isUser, setIsUser] = useState<User | null>(null);

  return (
    <ApolloProvider client={client}>
      {isUser ? <PokemonsList /> : <Login />}
    </ApolloProvider>
  );
};
