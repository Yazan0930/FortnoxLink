import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getToken } from "../utils/AuthProvider";

interface authResponse {
  access_token: string;
  refresh_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
}

function Login() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  const handleClick = () => {
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_FORTNOX_CLIENT_ID!,
      scope: ['companyinformation', 'order', 'profile'].join(' '),
      state: 'randomState',
      response_type: "code",
    });
    const targetUrl = `https://apps.fortnox.se/oauth-v1/auth?${params.toString()}`;
    window.location.href = targetUrl;
  }

  useEffect(() => {
    const fetchData = async () => {
      const authCode = new URLSearchParams(window.location.search).get('code');
      if (authCode) {
        const resData: authResponse = await getToken(authCode!);
        Cookies.set('access_token', resData.access_token, { expires: 1/24 });
        setIsLoggedin(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      navigate('/secure');
    }
  }, [isLoggedin, navigate]);

  return (
    <button onClick={handleClick}>Login</button>
  )
}

export default Login