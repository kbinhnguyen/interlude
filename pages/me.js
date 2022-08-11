import { gql, useApolloClient } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import graphQLClient from '../components/ApolloClient';
import Collage from '../components/Collage';
import Form from '../components/Form';
import SearchRes from '../components/SearchRes';

// CSR-only APPROACH

function Me() {
  const client = useApolloClient();
  const [searchClicked, setSearchClicked] = useState(false);
  const [favTracks, setFavTracks] = useState([]);
  const [user, setUser] = useState({
    avatar: '',
    username: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [nextAPILink, setNextAPILink] = useState('');
  const [prevAPILink, setPrevAPILink] = useState('');
  const [selectingFavTrack, setSelectingFavTrack] = useState(false);

  useEffect(() => {
    client.query({
      query: gql`query Query {
        user(id: 3) {
          username
          img_url
          tracks_liked {
            img_url
            preview
          }
        }
      }
      `,
    })
      .then((results) => {
        setFavTracks(results.data.user.tracks_liked);
        setUser({
          avatar: results.data.user.img_url,
          username: results.data.user.username,
        });
      });
  }, [client]);

  const handleInitialSearch = (querySong, queryArtists) => {
    client.query({
      query: gql`query Query {
        externalTracks(queryString: "artist:${queryArtists} track:${querySong}") {
          tracks {
            id
            title
            img_url
            artists
            preview
            uri
          }
          previous
          next
        }
      }
      `,
    })
      .then((results) => {
        setSearchResults(results.data.externalTracks.tracks);
        setPrevAPILink(results.data.externalTracks.previous);
        setNextAPILink(results.data.externalTracks.next);
        setSelectingFavTrack(true);
      });
  };

  return (
    <>
      <h1>This is my personal space!</h1>
      {user.avatar
        && (<Image src={user.avatar} alt={user.username} width={200} height={200} objectFit="cover" />)}
      {user.username && <h3>{user.username}</h3>}
      <Form
        searchClicked={searchClicked}
        setSearchClicked={setSearchClicked}
        handleInitialSearch={handleInitialSearch}
      />
      <SearchRes
        searchResults={searchResults}
        selectingFavTrack={selectingFavTrack}
        setSelectingFavTrack={setSelectingFavTrack}
      />
      {favTracks && (<Collage tracks={favTracks} />)}
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
