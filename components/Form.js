import { useState } from 'react';

function Form({
  searchClicked, setSearchClicked, handleInitialSearch, setSelectingFavTrack, setFavTrack,
}) {
  const [querySong, setQuerySong] = useState('');
  const [queryArtists, setQueryArtists] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleInitialSearch(querySong, queryArtists);
    setSearchClicked(!searchClicked);
    setQuerySong('');
    setQueryArtists('');
    setFavTrack(null);
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
          onInput={() => {
            setSelectingFavTrack(false);
          }}
        />
        <input
          type="text"
          value={queryArtists}
          onChange={(e) => { setQueryArtists(e.target.value); }}
          placeholder="Artist(s)"
          required
          onInput={() => {
            setSelectingFavTrack(false);
          }}
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
            border: 0;
            border-bottom: 1px solid #222;
            background: transparent;
            color: #222;
          }
          input:focus {
            outline: none;
          }
          input::placeholder{
            color: #222;
            opacity: 1;
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
          button:hover {
            opacity: 85%;
          }
        `}
      </style>
    </>
  );
}

export default Form;
