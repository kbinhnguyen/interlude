import { useState, useEffect, useRef } from 'react';
import { BsFillPlayCircleFill } from 'react-icons/bs';

function SearchRes({ searchResults, selectingFavTrack, setSelectingFavTrack }) {
  const [currRef, setCurrRef] = useState(null);
  const [selectedTrackToPlay, setSelectedTrackToPlay] = useState(null);
  const [favTrack, setFavTrack] = useState(null);
  const sound = useRef(null);

  useEffect(() => {
    setCurrRef(sound.current);
  }, [selectedTrackToPlay]);

  useEffect(() => {
    if (currRef) {
      currRef.play();
    }
  }, [currRef]);

  const handleSelectFav = (track) => {
    setFavTrack(track);
    setSelectingFavTrack(false);
  };

  if (searchResults && searchResults.length > 0) {
    return (
      <>
      {console.log(favTrack)}
        <ul className="searchList">
          {/* collapsed view */}
          {!selectingFavTrack && favTrack && (
            <li className="options">
              {favTrack.preview
                && (
                  <BsFillPlayCircleFill
                    size={15}
                    onClick={() => { setSelectedTrackToPlay(favTrack); }}
                  />
                )}
              <div className="options-text" onClick={() => { setSelectingFavTrack(true); }}>
                {favTrack.title}
                <br />
                {`by ${favTrack.artists.join(', ')}`}
              </div>
              {selectedTrackToPlay
                && selectedTrackToPlay.id === favTrack.id
                && (
                  <audio src={favTrack.preview} ref={sound} />)}
            </li>
          )}

          {/* expanded view */}
          {selectingFavTrack && (searchResults.map((result) => (
            <li className="options" key={result.id}>
              {result.preview
                && (
                  <BsFillPlayCircleFill
                    size={15}
                    onClick={() => { setSelectedTrackToPlay(result); }}
                  />
                )}
              <div className="options-text" onClick={() => { handleSelectFav(result); }}>
                {result.title}
                <br />
                {`by ${result.artists.join(', ')}`}
              </div>
              {selectedTrackToPlay
                && selectedTrackToPlay.id === result.id
                && (
                  <audio src={result.preview} ref={sound} />)}
            </li>
          )))}
        </ul>
        <button type="button">Add to your collection!</button>
        <style jsx>
          {`
            li {
              display: grid;
              grid-template-columns: 20px 400px;
              grid-auto-rows: max-content;
              align-items: center;
              gap: 5px;
            }
            .searchList {
              list-style-type: none;
              margin: 0;
              padding: 0;
            }
            .options {
              cursor: pointer;
            }
            .options-text {
              justify-items: start;
              grid-column: 2 / 3;
            }

          `}
        </style>
      </>
    );
  } else if (searchResults === null) {
    return (<h4>Sorry! Couldn't find anything for ya... 😖</h4>)
  }
  return null;
}

export default SearchRes;
