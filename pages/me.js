import { gql, useApolloClient } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import graphQLClient from '../components/ApolloClient';
import Collage from '../components/Collage';
import Form from '../components/Form';

// CSR-only APPROACH

function Me() {
  const client = useApolloClient();
  const [searchClicked, setSearchClicked] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [user, setUser] = useState({
    avatar: '',
    username: '',
  })

  useEffect(() => {
    client.query({
      query: gql`query Query {
        user(id: 3) {
          username
          img_url
          tracks_liked {
            title
            img_url
            preview
          }
        }
      }
      `,
    })
      .then((results) => {
        console.log(results);
        console.log(results.data.user.tracks_liked);
        setTracks(results.data.user.tracks_liked);
        setUser({
          avatar: results.data.user.img_url,
          username: results.data.user.username,
        });
      })
      .catch((err) => {console.log(err); });
  }, [client, searchClicked]);

  return (
    <>
      <h1>This is my personal space!</h1>
      {user.avatar
        && (<Image src={user.avatar} alt={user.username} width={200} height={200} objectFit="cover" />)}
      {user.username && <h3>{user.username}</h3>}
      <Form searchClicked={searchClicked} setSearchClicked={setSearchClicked} />
      {tracks && (<Collage tracks={tracks} />)}
    </>
  );
}

// (Can also use getInitialProps to trigger SSR on first load & CSR
// on subsequent loads - however, unsure how to force page reload after
// form submission with this approach)

// SSR-only approach, remember to use router in Form
/*
function Me({ tracks }) {
  const [searchClicked, setSearchClicked] = useState(false);
  const router = useRouter();
  console.log(tracks);

  return (
    <>
      <h1>This is my personal space!</h1>
      {console.log(searchClicked)}
      <Form
        searchClicked={searchClicked}
        setSearchClicked={setSearchClicked}
        router={router}
      />
    </>
  );
}

export async function getServerSideProps() {
  const client = graphQLClient;
  const { data } = await client.query({
    query: gql`query Query {
      user(id: 1) {
        tracks_liked {
          id
          title
          artists
          img_url
          preview
          uri
        }
      }
    }`,
  });
  return { props: { tracks: data.user.tracks_liked } };
}
*/

export default Me;
