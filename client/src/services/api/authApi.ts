import { loginProps } from "../../interfaces/loginForm.interface";

const basServerURL = import.meta.env.VITE_BACKEND_URL!;

export const extractAuthCode = () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  if (code) {
    window.history.replaceState({}, document.title, '/');
    return code;
    
  }
  return null;
};

export const postLoginApi = async (payload: loginProps) => {
  const code = extractAuthCode() || payload.code;
  if (code) {
    try {
      const response = await fetch(`${basServerURL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authorization: `Basic ${import.meta.env.VITE_ENCODED_CREDENTIALS!}`,
          client_id: import.meta.env.VITE_FORTNOX_CLIENT_ID,
          client_secret: import.meta.env.VITE_FORTNOX_CLIENT_SECRET,
          grant_type: 'authorization_code',
          code,
          redirect_uri: import.meta.env.VITE_FORTNOX_REDIRECT_URI,
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        return { access_token: data.access_token }; // Explicitly return access_token
      } else {
        throw new Error('No access token found');
      }
    } catch (error) {
      throw new Error('No access token found');
    }
  }
};

export const getCode = () => {
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_FORTNOX_CLIENT_ID!,
    scope: ['companyinformation', 'order', 'profile'].join(' '),
    state: 'randomState',
    response_type: "code",
    redirect_uri: import.meta.env.VITE_FORTNOX_REDIRECT_URI,
  });
  const targetUrl = `https://apps.fortnox.se/oauth-v1/auth?${params.toString()}`;
  window.location.href = targetUrl;
};