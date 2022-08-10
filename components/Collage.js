import ImgAudio from './ImgAudio';

function Collage({ tracks }) {
  return (
    <div>
      {tracks.map((track) => (<ImgAudio key={track.title} track={track} />))}
    </div>
  );
}

export default Collage;
