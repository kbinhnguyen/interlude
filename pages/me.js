import { gql, useApolloClient } from '@apollo/client';
import { useState, useEffect } from 'react';
import Form from '../components/Form';

function Me() {
  const client = useApolloClient();
  const [searchClicked, setSearchClicked] = useState(false);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    console.log('Me was rendered');
    client.query({
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
      {console.log(searchClicked)}
      <Form searchClicked={searchClicked} setSearchClicked={setSearchClicked} />
    </>
  );
}

export default Me;
