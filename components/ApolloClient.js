import {
  ApolloClient, createHttpLink, InMemoryCache,
} from '@apollo/client';

require('dotenv').config();

const graphQLClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: createHttpLink({
    uri: `http://localhost:${process.env.API_SERVER_PORT || 4320}`,
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
});

export default graphQLClient;
