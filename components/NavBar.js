import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();
  return (
    <div className="navbar">
      <Link href="/">
        <a className={router.pathname === '/' ? 'active' : ''}>Explore</a>
      </Link>
      <Link href="/me">
        <a className={router.pathname === '/me' ? 'active' : ''}>Me</a>
      </Link>
      <style jsx>
        {`
          a {
            text-decoration: none;
            font-size: 20px;
          }
          .active {
            color: blue;
          }
        `}
      </style>
    </div>
  );
}
