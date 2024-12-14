'use client';
import { signIn } from 'next-auth/react';

const Login = () => {

    // if the user is not logged in redirect to the login page /api/auth/signin/fortnox
    return (
        <div>
            <p>Please login to access this page</p>
            <button onClick={() => signIn('fortnox')}>Login</button>
        </div>
    );

}
    
export default Login;