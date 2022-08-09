import { ApolloProvider } from '@apollo/client';
import NavBar from '../components/NavBar';
import graphQLClient from '../components/ApolloClient';

function CustomApp({ Component, pageProps }) {
  console.log('I am inside CustomApp');
  return (
    <ApolloProvider client={graphQLClient}>
      <NavBar />
      <Component {...pageProps} />
      <style jsx global>
        {`
          .navbar {
            background-color: grey;
            display: flex;
            justify-content: space-between;
            padding: 1rem;
          }
        `}
      </style>
    </ApolloProvider>
  );
}

export default CustomApp;
