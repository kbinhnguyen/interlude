import { gql, useApolloClient } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import graphQLClient from '../components/ApolloClient';
import Collage from '../components/Collage';
import Form from '../components/Form';

// CSR-only APPROACH

function Me() {
  const client = useApolloClient();
  const [searchClicked, setSearchClicked] = useState(false);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    client.query({
      query: gql`query Query {
        user(id: 3) {
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
      })
      .catch((err) => {console.log(err); });
  }, [client, searchClicked]);

  return (
    <>
      <h1>This is my personal space!</h1>
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
