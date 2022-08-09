import { getAllUsers } from '../server_API/model.js';

function Feed({ users }) {
  return (
    <>
      <h1>Welcome to the Project!</h1>
      <ul>{users.map((user) => (<li key={user.id}>{user.username}</li>))}</ul>
    </>
  );
}

export async function getServerSideProps() {
  const results = await getAllUsers();
  const users = await results.rows;
  return { props: { users } };
  // actually this is not the way to prepopulate the HTML string
  // right now only grabbing info directly from database
  // what we need to do is to make an API call to our server
}

export default Feed;
