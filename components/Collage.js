import ImgAudio from './ImgAudio';

function Collage({ tracks }) {
  return (
    <>
      <div className="collage">
        {tracks.map((track) => (<ImgAudio key={track.id} track={track} />))}
      </div>
      <style jsx>
        {`
          .collage {
            margin-top: 100px;
            display: grid;
            justify-content: center;
            grid-template-columns: repeat(6, max-content);
            grid-auto-rows: max-content;
          }
        `}
      </style>
    </>
  );
}

export default Collage;
