import Link from 'next/link';

const Login = () => {

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