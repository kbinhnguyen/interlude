import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: '/api/collection',
  cache: new InMemoryCache(),
});

const CustomApp = ({ Component, pageProps }) => {
  console.log('I got here');
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default CustomApp;
