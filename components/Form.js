import { useState } from 'react';

function Form({ searchClicked, setSearchClicked, handleInitialSearch }) {
  const [querySong, setQuerySong] = useState('');
  const [queryArtists, setQueryArtists] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleInitialSearch(querySong, queryArtists);
    setSearchClicked(!searchClicked);
    setQuerySong('');
    setQueryArtists('');
    // router.reload(); // this line of code is for SSR of Me page, will force a HARD reload of page
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
