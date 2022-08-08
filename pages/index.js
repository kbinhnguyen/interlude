function Feed({ users }) {
  return (<h1>Welcome to the Project!</h1>);
}

Feed.getInitialProps = async () => {
  const users = [1, 2, 3];
  return { users };
};

export default Feed;
