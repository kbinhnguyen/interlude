import { gql } from '@apollo/client';
import graphQLClient from '../components/ApolloClient';
import UserOnFeed from '../components/UserOnFeed';

function Feed({ users }) {
  return (
    <>
      <h1>Welcome to the Project!</h1>
      <div>
        {users.map((user) => (
          <UserOnFeed
            key={user.username}
            username={user.username}
            img_url={user.img_url}
            id={user.id}
          />
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const client = graphQLClient;
  const { data } = await client.query({
    query: gql`query Query {
      allUsers {
        id
        username
        img_url
      }
    }`,
  });
  return { props: { users: data.allUsers } };
}

export default Feed;
