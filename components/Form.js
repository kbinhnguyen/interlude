import { useState } from 'react';
import graphQLClient from '../components/ApolloClient';

function Form({ searchClicked, setSearchClicked }) {
  const [querySong, setQuerySong] = useState('');
  const [queryArtists, setQueryArtists] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search was clicked');
    // need to call API here still
    setSearchClicked(!searchClicked);
    setQuerySong('');
    setQueryArtists('');
    // router.reload(); // this line of code is for SSR of Me page
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={querySong}
        onChange={(e) => { setQuerySong(e.target.value); }}
        placeholder="Song"
        required
      />
      <input
        type="text"
        value={queryArtists}
        onChange={(e) => { setQueryArtists(e.target.value); }}
        placeholder="Artist(s)"
        required
      />
      <button type="submit">Search!</button>
    </form>
  );
}

export default Form;
