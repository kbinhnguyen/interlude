import { useState, useEffect, useRef } from 'react';
import { BsFillPlayCircleFill } from 'react-icons/bs';

function SearchRes({ searchResults }) {
  const [currRef, setCurrRef] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const sound = useRef(null);

  useEffect(() => {
    setCurrRef(sound.current);
  }, [selectedTrack]);

  useEffect(() => {
    if (currRef) {
      currRef.play();
    }
  }, [currRef]);

  if (searchResults && searchResults.length > 0) {
    return (
      <>
        <ul className="searchList">
          {searchResults.map((result) => (
            <li key={result.id}>
              {result.preview
                && (<BsFillPlayCircleFill onClick={() => { setSelectedTrack(result); }} />)}
              <span>{`${result.title} by ${result.artists.join(', ')}`}</span>
              {selectedTrack
                && selectedTrack.id === result.id
                && (
                  <audio src={result.preview} ref={sound} />)}
            </li>
          ))}
        </ul>
        <style jsx>
          {`
            .searchList {
              list-style-type: none;
              margin: 0;
              padding: 0;
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
