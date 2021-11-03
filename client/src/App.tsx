import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  gql,
} from '@apollo/client';
import { cache } from 'src/utils/cache';
import { typeDefs } from 'src/utils/typeDefs';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
  typeDefs,
});

client
  .query({
    query: gql`
      query TestQuery {
        pokemons(page: 1, items: 6) {
          name
          img
        }
      }
    `,
  })
  .then(result => console.log(result));

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>Pokedex App</div>
    </ApolloProvider>
  );
};
