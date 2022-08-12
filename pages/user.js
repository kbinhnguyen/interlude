import Image from 'next/image';
import { gql } from '@apollo/client';
import graphQLClient from '../components/ApolloClient';
import Collage from '../components/Collage';

function User({ userData }) {
  return (
    <>
      <div className="user-page">
        <div className="user-profile">
          <div className="avatar">
            <Image className="avatar" src={userData.img_url} alt={userData.username} width={200} height={200} objectFit="cover" />
          </div>
          <div className="side-profile">
            <h2 className="text">{`♮ ${userData.username}`}</h2>
            <h4 className="text">
              {'Get to know '}
              <span style={{ textDecoration: 'overline' }}>{userData.username}</span>
              {' through some tunes '}
              <span style={{ fontStyle: 'normal', fontSize: '20px' }}>😆</span>
            </h4>
            <audio className="audio" src={userData.tracks_liked[0].preview} controls />
          </div>
        </div>
        <Collage tracks={userData.tracks_liked} />
      </div>

      <style jsx>
        {`
          .user-page{
            display: grid;
            grid-auto-rows: max-content;
          }
          .user-profile {
            display: grid;
            grid-template-columns: 3fr 6fr;
            height: 300px;
            width: 80%;
            justify-self: center;
            margin-top: 3rem;
            align-items: start;
            background: #FFC857;
            border-radius: 20px;
          }
          .side-profile {
            width: 90%;
            align-self: center;
            display: grid;
            grid-template-rows: max-content max-content max-content;
            gap: 15px;
          }
          .avatar {
            border-radius: 50%;
            overflow: hidden;
            width: 200px;
            height: 200px;
            justify-self: center;
            align-self: center;
            border: 1px solid black;
          }
          .text {
            margin: 0;
          }
          h4 {
            font-style: italic;
          }
          @media (max-width: 700px) {
            .user-profile{
              height: max-content;
              justify-content: center;
              justify-items: center;
              grid-template-rows: 240px 240px;
              grid-template-columns: 100%;
            }
            .side-profile {
              justify-self: center;
              justify-items: center;
            }
            .avatar {
              align-self: end;
            }
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
