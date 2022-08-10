function UserOnFeed({ id, username, img_url }) {
  return (
    <div>
      <img src={img_url} alt={username} />
      <h3>{username}</h3>
      <style jsx>
        {`
          img {
            width: 200px;
            height: 200px;
            object-fit: cover;
          }
        `}
      </style>
    </div>
  );
}

export default UserOnFeed;
