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
    <>
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
      <style jsx>
        {`
          form {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            align-items: center;
          }
          input {
            width: 85%;
            height: 23px;
            cursor: text;
            border-radius: 8px;
            border: 1px solid grey;
          }
          button {
            background: #1F2041;
            height: 30px;
            color: white;
            border: 1px solid white;
            width: 75%;
            border-radius: 15px;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
}

export default Form;
