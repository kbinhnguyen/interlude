import { gql } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';
import graphQLClient from '../components/ApolloClient';

function Feed({ users }) {
  return (
    <>
      <h1>Welcome to the Project!</h1>
      <div>
        {users.map((user) => (
          <div key={user.username}>
            <Link href={`/user/?username=${user.username}`} as={`/user/${user.username}`}>
              <a>
                <Image src={user.img_url} alt={user.username} width={200} height={200} objectFit="cover" />
              </a>
            </Link>
            <h3>{user.username}</h3>
          </div>
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
        username
        img_url
      }
    }`,
  });
  return { props: { users: data.allUsers } };
}

export default Feed;
