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

  if (track) {
    return (
      <div>
        <Image
          src={track.img_url}
          alt={track.title}
          width={150}
          height={150}
          onMouseOver={onImgHover}
          onMouseLeave={onImgUnHover}
        />
        <audio ref={sound} src={track.preview} />
      </div>
    );
  }
  return null;
}

export default ImgAudio;
