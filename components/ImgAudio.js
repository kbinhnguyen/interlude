import { useRef } from 'react';
import Image from 'next/image';

function ImgAudio({ track }) {
  const sound = useRef(null);
  const onImgHover = () => {
    sound.current.play();
  };
  const onImgUnHover = () => {
    sound.current.pause();
    sound.current.currentTime = 0;
  };

  return (
    <>
      <Image
        key={track.title}
        src={track.img_url}
        alt={track.title}
        width={400}
        height={400}
        onMouseOver={onImgHover}
        onMouseLeave={onImgUnHover}
      />
      <audio ref={sound} src={track.preview} />
    </>
  );
}

export default ImgAudio;
