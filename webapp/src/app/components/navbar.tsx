import Link from 'next/link';

const Navbar = async () => {
  return (
    <nav>
      <button>  <Link href="/"> Home </Link> </button>
      <button>  <Link href="/profile"> Profile </Link> </button>
    </nav>
  );
}

export default Navbar;