import { useState, useEffect, useRef } from 'react';
import { gql, useApolloClient } from '@apollo/client';
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from 'react-icons/bs';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';

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
        likeATrack(username: "binh", trackId: "${favTrack.id}", title: "${favTrack.title}", artists: "${favTrack.artists}", imgUrl: "${favTrack.img_url}", uri: "${favTrack.uri}", preview: "${favTrack.preview}") {
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
        setSearchResults([]);
      });
  };

  if (searchResults && searchResults.length > 0) {
    return (
      <div className="search-results">
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
              <div className="options-text collapsed" onClick={() => { setSelectingFavTrack(true); }}>
                {favTrack.title}
                <br />
                {`by ${favTrack.artists.join(', ')}`}
              </div>
              <RiArrowDownSFill onClick={() => { setSelectingFavTrack(true); }} />
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
              <div className="options-text expanded" onClick={() => { handleSelectFav(result); }}>
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
        {!favTrack && (<button type="button">Add to collection!</button>)}
        {favTrack && (<button type="button" onClick={handleAddFav}>Add to collection!</button>)}
        <style jsx>
          {`
            .search-results {
              position: relative;
              display: grid;
              grid-template-columns: 2fr 1fr;
            }
            ul {
              position: absolute;
              z-index: 500;
              list-style-type: none;
              margin: 0;
              padding: 0;
              height: max-content;
              width: 100%;
              grid-column: 1 / 2;
            }
            li {
              width: 95%;
              display: grid;
              grid-template-columns: 1fr 15fr 1fr;
              grid-auto-rows: max-content;
              align-items: center;
              justify-items: center;
            }
            .options {
              cursor: pointer;
            }
            .options-text {
              margin-left: 10px;
              justify-self: start;
              width: 100%;
            }
            .collapsed {
              grid-column: 2 / 3;
            }
            .expanded {
              grid-column: 2 / 4;
            }
            button {
              grid-column: 2 / 3;
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
      </div>
    );
  } else if (searchResults === null) {
    return (<h4>Sorry! Couldn't find anything for ya... 😖</h4>)
  }
  return null;
}

export default SearchRes;
