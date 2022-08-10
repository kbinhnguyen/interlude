import Image from 'next/image';

function UserOnFeed({ id, username, img_url }) {
  return (
    <div>
      <Image src={img_url} alt={username} width={200} height={200} objectFit="cover" />
      <h3>{username}</h3>
    </div>
  );
}

export default UserOnFeed;
