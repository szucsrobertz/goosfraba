import { ApolloClient, InMemoryCache } from '@apollo/client';

import { GRAPHQL_URL } from './configs/constants';

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});
