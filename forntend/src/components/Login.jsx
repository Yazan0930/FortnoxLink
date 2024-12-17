import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function Login() {
    const navigate = useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [authCode, setAuthCode] = useState(null);

    const handleClick = () => {
        const params = new URLSearchParams({
            client_id: import.meta.env.VITE_FORTNOX_CLIENT_ID,
            scope: 'profile',
            state: 'randomState',
            response_type: "code",
        });
        const targetUrl = `https://apps.fortnox.se/oauth-v1/auth?${params.toString()}`;
        window.location.href = targetUrl;
    }

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        const fetchData = async () => {
            console.log(code);
            if (code) {
                try {
                    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/auth', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ 
                            authorization: `Basic ${import.meta.env.VITE_ENCODED_CREDENTIALS}`,
                            client_id: import.meta.env.VITE_FORTNOX_CLIENT_ID,
                            client_secret: import.meta.env.VITE_FORTNOX_CLIENT_SECRET,
                            grant_type: 'authorization_code',
                            code: code,
                            redirect_uri: import.meta.env.VITE_FORTNOX_REDIRECT_URI,
                         }),
                    });
                    const data = await response.json();
                    console.log(data);
                    Cookies.set('token', data.token);
                    setIsLoggedin(true);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (isLoggedin) {
          navigate("/secure");
        }
    }, [isLoggedin, navigate]);


  return (
    <button onClick={handleClick}>Login</button>
  )
}

export default Login