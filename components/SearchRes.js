import { useState, useEffect, useRef } from 'react';
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from 'react-icons/bs';

function SearchRes({ searchResults, selectingFavTrack, setSelectingFavTrack }) {
  const [currRef, setCurrRef] = useState(null);
  const [selectedTrackToPlay, setSelectedTrackToPlay] = useState(null);
  const [favTrack, setFavTrack] = useState(null);
  const [playing, setPlaying] = useState(false);
  const sound = useRef(null);

  useEffect(() => {
    setCurrRef(sound.current);
  }, [selectedTrackToPlay]);

  useEffect(() => {
    if (currRef) {
      currRef.play();
      setPlaying(true);
    }
  }, [currRef]);

  const handleSelectFav = (track) => {
    setFavTrack(track);
    setSelectingFavTrack(false);
  };

  const pauseMusic = () => {
    currRef.pause();
    setPlaying(false);
  };

  if (searchResults && searchResults.length > 0) {
    return (
      <>
      {console.log(favTrack)}
      {/* {console.log('playing: ', playing, 'currRef: ', currRef)} */}
        <ul className="searchList">
          {/* collapsed view */}
          {!selectingFavTrack && favTrack && (
            <li className="options">
              {favTrack.preview
                && !playing
                && (
                  <BsFillPlayCircleFill
                    size={15}
                    onClick={() => {
                      setSelectedTrackToPlay(favTrack);
                      setPlaying(true);
                      currRef.play();
                    }}
                  />
                )}
                {favTrack.preview
                && playing
                && (
                  <BsFillPauseCircleFill
                    size={15}
                    onClick={pauseMusic}
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
                && (!playing || (playing && selectedTrackToPlay.id !== result.id))
                && (
                  <BsFillPlayCircleFill
                    size={15}
                    onClick={() => {
                      setSelectedTrackToPlay(result);
                      setPlaying(true);
                      if (currRef) {
                        currRef.play();
                      }
                    }}
                  />
                )}
              {result.preview && playing && selectedTrackToPlay.id === result.id
              && (
                <BsFillPauseCircleFill
                  size={15}
                  onClick={pauseMusic}
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
