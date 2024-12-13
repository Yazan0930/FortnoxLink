import Link from 'next/link';
import LogoutForm from './logoutForm';
import Login from './login';
import { getSession } from '@/actions';


const Navbar = async () => {
  const session = await getSession();
  console.log("Session from Navbar: ", session);

  return (
    <nav>
      <button>  <Link href="/"> <a>Home</a> </Link> </button>
      <button>  <Link href="/profile"> <a>Profile</a> </Link> </button>
      {session?.isLoggedIn ? <LogoutForm /> : <Login />}
    </nav>
  );
}

export default Navbar;