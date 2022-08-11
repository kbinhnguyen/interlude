import { useState, useEffect, useRef } from 'react';
import { gql, useApolloClient } from '@apollo/client';
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from 'react-icons/bs';

function SearchRes({
  searchResults, selectingFavTrack, setSelectingFavTrack, favTracks, setFavTracks, setSearchResults
}) {
  const [currRef, setCurrRef] = useState(null);
  const [selectedTrackToPlay, setSelectedTrackToPlay] = useState(null);
  const [favTrack, setFavTrack] = useState(null);
  const [playing, setPlaying] = useState(false);
  const sound = useRef(null);
  const client = useApolloClient();

  useEffect(() => {
    setCurrRef(null);
    setPlaying(false);
  }, [searchResults, selectingFavTrack]);

  useEffect(() => {
    setCurrRef(sound.current);
  }, [selectedTrackToPlay]);

  useEffect(() => {
    if (currRef && playing) {
      currRef.play();
      setPlaying(true);
    }
  }, [currRef, playing]);

  const handleSelectFav = (track) => {
    setFavTrack(track);
    setSelectingFavTrack(false);
  };

  const pauseMusic = () => {
    if (currRef) {
      currRef.pause();
      setPlaying(false);
    }
  };

  const handleAddFav = () => {
    client.mutate({
      mutation: gql`mutation Mutation {
        likeATrack(userId: 3, trackId: "${favTrack.id}", title: "${favTrack.title}", artists: "${favTrack.artists}", imgUrl: "${favTrack.img_url}", uri: "${favTrack.uri}", preview: "${favTrack.preview}") {
          id
          title
          artists
          img_url
          preview
          uri
        }
      }
      `,
    })
      .then((results) => {
        setFavTracks([results.data.likeATrack].concat(favTracks));
        setFavTrack(null);
        // setSelectedTrackToPlay(null);
        setSearchResults([]);
      });
  };

  if (searchResults && searchResults.length > 0) {
    return (
      <>
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
                      setCurrRef(sound.current);
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
                  <audio
                    src={favTrack.preview}
                    ref={sound}
                    onEnded={() => { setPlaying(false); }}
                  />
                )}
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
                      setCurrRef(sound.current);
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
                <audio
                  src={result.preview}
                  ref={sound}
                  onEnded={() => { setPlaying(false); }}
                />
                )}
            </li>
          )))}
        </ul>
        {!favTrack && (<button type="button">Add to your collection!</button>)}
        {favTrack && (<button type="button" onClick={handleAddFav}>Add to your collection!</button>)}
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
