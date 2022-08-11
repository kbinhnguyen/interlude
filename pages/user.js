import Image from 'next/image';
import { gql } from '@apollo/client';
import graphQLClient from '../components/ApolloClient';
import Collage from '../components/Collage';

function User({ id, user }) {
  return (
    <>
      <p>{`My id is ${id}`}</p>
      <Image src={user.img_url} alt={user.username} width={200} height={200} objectFit="cover" />
      <h3>{user.username}</h3>
      <Collage tracks={user.tracks_liked} />
    </>
  );
}

User.getInitialProps = async ({ query }) => {
  const client = graphQLClient;
  const { data } = await client.query({
    query: gql`query Query {
      user(id: ${query.id}) {
        username
        img_url
        tracks_liked {
          id
          img_url
          preview
        }
      }
    }
    `,
  });
  return { ...query, user: data.user };
};

export default User;
