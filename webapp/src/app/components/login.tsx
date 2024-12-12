import { getSession } from '@/actions';
import Link from 'next/link';

const Login = async () => {
    const session = await getSession();
    // check if the user is logged in
    if (session && session.user) {
        return (
            <div>
                <h1>Welcome {session.user.name}</h1>
                <p>Email: {session.user.email}</p>
                <p>Sysadmin: {session.user.sysadmin}</p>
            </div>
        );
    }
    // if the user is not logged in redirect to the login page /api/auth/signin/fortnox
    return (
        <div>
            <h1>Login</h1>
            <p>Please login to access this page</p>
            <button>  <Link href="/api/auth/signin/fortnox"> <a>Login</a> </Link> </button>
        </div>
    );

}
    
export default Login;