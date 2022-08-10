import ImgAudio from './ImgAudio';

function Collage({ tracks }) {
  return (
    <>
      <div className="collage">
      {tracks.map((track) => (<ImgAudio key={track.img_url} track={track} />))}
      </div>
      <style jsx>
        {`
          .collage {
            margin-top: 50px;
          }
        `}
      </style>
    </>
  );
}

export default Collage;
