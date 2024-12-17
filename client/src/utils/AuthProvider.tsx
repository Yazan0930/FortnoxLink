const basServerURL = import.meta.env.VITE_BACKEND_URL!;

export async function getToken(authCode: string) {
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
                code: authCode,
                redirect_uri: import.meta.env.VITE_FORTNOX_REDIRECT_URI,
             }),
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getProfile(endpoint: string, accessToken: string) {
    try {
        const response = await fetch(`${basServerURL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                access_token: accessToken,
             }),
        });
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}
