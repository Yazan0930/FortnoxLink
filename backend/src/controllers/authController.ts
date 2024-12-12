import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';

dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = 'http://localhost:3000/api/callback';
const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

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

interface TokenData {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

let tokenData = {
    accessToken: process.env.ACCESS_TOKEN,
    refreshToken: process.env.REFRESH_TOKEN,
    expiresAt: Number(process.env.EXPIRES_AT) || 0
};

const getAuthCode = (req: AuthRequest, res: AuthResponse): void => {

    const params = qs.stringify({
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: ['article', 'order', 'companyinformation'].join(' '),
        state: 'randomState',
        response_type: 'code'
    });
    const authUrl = `https://apps.fortnox.se/oauth-v1/auth?${params}`;

    res.redirect(authUrl); // Redirect user to Fortnox authentication    
};

const getToken = async (req: AuthRequest, res: AuthResponse): Promise<void> => {
    const authCode = req.query.code; // Get the code from the query parameter
    console.log(`Received Authorization Code: ${authCode}`);
    
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

        UpdateTokenData(tokenResponse.data);        
        res.redirect('http://localhost:3000/api/orders');      // ändra till rätt sida
        console.log('Token received successfully:', tokenData);

    } catch (error) {
        console.error('Error while fetching token:', error);
        res.status(500).send('Error getting token');
    }
};

const isTokenExpired = (): boolean => {
    return Number(tokenData.expiresAt) <= Date.now();
};


const UpdateTokenData = async (data: TokenData) => {
    // write the token data to the .env file
    const fs = require('fs');
    const path = require('path');
    const envPath = path.join(__dirname, '../../.env');
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    const newEnvConfig = {
        ...envConfig,
        ACCESS_TOKEN: data.access_token,
        REFRESH_TOKEN: data.refresh_token,
        EXPIRES_AT: Date.now() + data.expires_in * 1000
    };

    fs.writeFileSync(envPath, qs.stringify(newEnvConfig, { delimiter: '\n' }));

    tokenData = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: Date.now() + data.expires_in * 1000
    };
}

const refreshToken = async () => {
    try {
        const response = await axios.post(
            'https://apps.fortnox.se/oauth-v1/token',
            {
                grant_type: 'refresh_token',
                refresh_token: tokenData.refreshToken
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${encodedCredentials}`
                }
            }
        );

        UpdateTokenData(response.data);

        console.log('Token refreshed successfully:', tokenData);
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw new Error('Unable to refresh token');
    }
};

const validateTokenMiddleware = async (req: any, res: any, next: any) => {
    console.log('Validating token...');
    if (isTokenExpired()) {
        console.log('Token expired. Refreshing...');
        try {
            await refreshToken();
            console.log('Token refreshed successfully');
            
        } catch (error) {
            return res.status(401).json({ error: 'Token refresh failed' });
        }
    }
    console.log('Token is valid');

    next(); // Proceed to the next middleware or API route
};


export { getAuthCode, getToken, validateTokenMiddleware };