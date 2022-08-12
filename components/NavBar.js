import Link from 'next/link';
import { useRouter } from 'next/router';

function NavBar() {
  const router = useRouter();
  return (
    <div className="navbar">
      <h1>Interlude</h1>
      <div className="navbar-links">
        <Link href="/">
          <button type="button" className={router.pathname === '/' ? 'active' : ''}>Home</button>
        </Link>
        <Link href="/me">
          <button type="button" className={router.pathname === '/me' ? 'active' : ''}>Me</button>
        </Link>
      </div>
      <style jsx>
        {`
          .active {
            text-decoration: overline 3px;
          }
          button {
            border: none;
            color: white;
            background-color: transparent;
            cursor: pointer;
            font-size: 20px;
          }
          h1 {
            margin-top: 0;
            margin-bottom: 0;
            color: white;
            font-family: 'Dancing Script', cursive;
            font-size: 50px;
          }
        `}
      </style>
    </div>
  );
}

export default NavBar;
