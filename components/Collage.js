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
            justify-self: center;
            width: 70%;
            margin-top: 100px;
            margin-bottom: 80px;
            display: grid;
            justify-content: center;
            grid-template-columns: repeat(auto-fill, 150px);
            grid-auto-rows: 150px;
          }
        `}
      </style>
    </>
  );
}

export default Collage;
