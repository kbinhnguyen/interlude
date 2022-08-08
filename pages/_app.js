import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import NavBar from '../components/NavBar';

const client = new ApolloClient({
  uri: '/api/collection',
  cache: new InMemoryCache(),
});

function CustomApp({ Component, pageProps }) {
  console.log('I am inside CustomApp');
  return (
    <>
      <ApolloProvider client={client}>
        <NavBar />
        <Component {...pageProps} />
      </ApolloProvider>
      <style jsx global>
        {`
          // a {
          //   background-color: grey;
          // }
          .navbar {
            background-color: grey;
            display: flex;
            justify-content: space-between;
            padding: 1rem;
          }
        `}
      </style>
    </>
  );
}

export default CustomApp;
