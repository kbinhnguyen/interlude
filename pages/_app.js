import { ApolloProvider } from '@apollo/client';
import NavBar from '../components/NavBar';
import graphQLClient from '../components/ApolloClient';

function CustomApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={graphQLClient}>
      <NavBar />
      <Component {...pageProps} />
      <style jsx global>
        {`
          .navbar {
            background-color: #4B3F72;
            display: flex;
            justify-content: space-between;
            padding: 0.5rem;
            align-items: center;
          }
        `}
      </style>
    </ApolloProvider>
  );
}

export default CustomApp;
