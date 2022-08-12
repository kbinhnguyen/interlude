import { gql } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';
import graphQLClient from '../components/ApolloClient';

function Feed({ users }) {
  return (
    <div className="wrapper">
      <h3>
        <span style={{ fontSize: '30px' }}>🎧 </span>
        Check out what the community is listening to! &nbsp;
        <span style={{ fontSize: '30px' }}>🎧 </span>
      </h3>
      <div>
        {users.map((user) => (
          <div key={user.username} className="user-container">
            <Link href={`/user/?username=${user.username}`} as={`/user/${user.username}`}>
              <a>
                <Image className="img" src={user.img_url} alt={user.username} width={350} height={350} objectFit="cover" />
              </a>
            </Link>
            <h4>{user.username}</h4>
          </div>
        ))}
      </div>
      <style jsx>
        {`
          h3 {
            background: #FFC857;
            width: max-content;
            padding: 1rem 2rem;
            border-radius: 20px;
          }
          .wrapper {
            display: grid;
            grid-template-columns: 1fr;
            justify-content: center;
            justify-items: center;
          }
          .user-container {
            margin: 2rem;
            display: grid;
            grid-template-rows: repeat(2, max-content);
            justify-items: center;
          }
          .img {
            cursor: pointer;
            border: 1px solid black;
          }
        `}
      </style>
    </div>
  );
}

export async function getServerSideProps() {
  const client = graphQLClient;
  const { data } = await client.query({
    query: gql`query Query {
      allUsers {
        username
        img_url
      }
    }`,
  });
  return { props: { users: data.allUsers } };
}

export default Feed;
