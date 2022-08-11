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
  const [APILinks, setAPILinks] = useState({
    next: '',
    prev: '',
  });
  const [selectingFavTrack, setSelectingFavTrack] = useState(false);

  useEffect(() => {
    client.query({
      query: gql`query Query {
        user(username: "binh") {
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
        setAPILinks({
          prev: results.data.externalTracks.previous,
          next: results.data.externalTracks,
        });
        setSelectingFavTrack(true);
      });
  };

  return (
    <>
      <div className="me-page">
        <div className="user-profile">
          <div className="avatar">
            {user.avatar
            && (<Image className="avatar" src={user.avatar} alt={user.username} width={200} height={200} objectFit="cover" />)}
          </div>
          <div className="side-profile">
            {user.username && <h2 className="text">{`♯ ${user.username}`}</h2>}
            <h4 className="text">Howdy! Which tune best describes your mood now? 💭</h4>
            <Form
              searchClicked={searchClicked}
              setSearchClicked={setSearchClicked}
              handleInitialSearch={handleInitialSearch}
            />
            <SearchRes
              searchResults={searchResults}
              selectingFavTrack={selectingFavTrack}
              setSelectingFavTrack={setSelectingFavTrack}
              favTracks={favTracks}
              setFavTracks={setFavTracks}
              setSearchResults={setSearchResults}
            />
          </div>
        </div>
        {favTracks && (<Collage tracks={favTracks} />)}
      </div>
      <style jsx>
        {`
          .me-page {
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
          }
          .side-profile {
            width: 90%;
            align-self: center;
            display: grid;
            grid-template-rows: max-content max-content max-content 100px;
            gap: 15px;
          }
          .avatar {
            border-radius: 50%;
            overflow: hidden;
            width: 200px;
            height: 200px;
            justify-self: center;
            align-self: center;
          }
          .text {
            margin: 0;
          }
        `}
      </style>
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
