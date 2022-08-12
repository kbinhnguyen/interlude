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
          body {
            background-color: #e7e5ec;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='72' viewBox='0 0 36 72'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23bbb8c0' fill-opacity='0.35'%3E%3Cpath d='M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            font-family: 'Libre Baskerville', serif;
          }
          .navbar {
            background-color: #4B3F72;
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 2rem;
            align-items: center;
          }
        `}
      </style>
    </ApolloProvider>
  );
}

export default CustomApp;
