import { getAllUsers } from '../server/model.js';

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
}

export default Feed;
