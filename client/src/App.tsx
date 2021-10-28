import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
} from '@apollo/client';
import { cache } from 'src/utils/cache';
import { typeDefs } from 'src/utils/typeDefs';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
  typeDefs,
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>Pokedex App</div>
    </ApolloProvider>
  );
};
