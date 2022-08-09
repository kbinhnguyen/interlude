import { gql } from '@apollo/client';
import graphQLClient from '../components/ApolloClient';

function Feed({ users }) {
  return (
    <>
      <h1>Welcome to the Project!</h1>
      <ul>{users.map((user) => (<li key={user.username}>{user.username}</li>))}</ul>
    </>
  );
}

export async function getServerSideProps() {
  const client = graphQLClient;
  const { data } = await client.query({
    query: gql`query Query {
      allUsers {
        username
        img_url
      }
    }`,
  });
  return { props: { users: data.allUsers } };
}

export default Feed;
