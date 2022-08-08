import Link from 'next/link';
import { useRouter } from 'next/router';

function NavBar() {
  const router = useRouter();
  return (
    <div className="navbar">
      <Link href="/">
        <button type="button" className={router.pathname === '/' ? 'active' : ''}>Explore</button>
      </Link>
      <Link href="/me">
        <button type="button" className={router.pathname === '/me' ? 'active' : ''}>Me</button>
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

export default NavBar;
