import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';

dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = 'http://localhost:3000/api/callback';

interface AuthRequest extends Express.Request {
    query: {
        code: string;
    };
}

interface AuthResponse extends Express.Response {
    json(data: any): unknown;
    redirect(url: string): void;
    status(code: number): this;
    send(body?: any): this;
}

export const getAuthCode = (req: AuthRequest, res: AuthResponse): void => {
    const authUrl = `https://apps.fortnox.se/oauth-v1/auth?client_id=${clientId}&redirect_uri=http://localhost:3000/api/callback&scope=article&state=randomState&response_type=code`;
    //
    res.redirect(authUrl); // Redirect user to Fortnox authentication
    
};

export const getToken = async (req: AuthRequest, res: AuthResponse): Promise<void> => {
    const authCode = req.query.code; // Get the code from the query parameter
    
    // Print the received authorization code in the console
    console.log(`Received Authorization Code: ${authCode}`);

    // Encode client credentials
    const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    try {
        const tokenResponse = await axios.post(
            'https://apps.fortnox.se/oauth-v1/token',
            qs.stringify({
                grant_type: 'authorization_code',
                client_id: clientId,
                client_secret: clientSecret,
                code: authCode, // The authorization code from Fortnox
                redirect_uri: redirectUri
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${encodedCredentials}`
                }
            }
        );

        res.json(tokenResponse.data); // Return the token response to the client
    } catch (error) {
        console.error('Error while fetching token:', error);
        res.status(500).send('Error getting token');
    }
};