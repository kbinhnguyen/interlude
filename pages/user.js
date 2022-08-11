import Image from 'next/image';
import { gql } from '@apollo/client';
import graphQLClient from '../components/ApolloClient';
import Collage from '../components/Collage';

function User({ userData }) {
  return (
    <>
      <div className="user-profile">
        <Image src={userData.img_url} alt={userData.username} width={200} height={200} objectFit="cover" />
        <h3>{userData.username}</h3>
      </div>
      <Collage tracks={userData.tracks_liked} />
      <style jsx>
        {`
          .user-profile {
            margin-top: 3rem;
          }
        `}
      </style>
    </>
  );
}

User.getInitialProps = async ({ query }) => {
  const client = graphQLClient;
  const { data } = await client.query({
    query: gql`query Query {
      user(username: "${query.username}") {
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
  return { userData: data.user };
};

export default User;
