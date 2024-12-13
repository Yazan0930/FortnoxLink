import { NextRequest, NextResponse } from 'next/server';
import { login, getDatabase } from '@/actions';
import dotenv from 'dotenv';
import { redirect } from 'next/navigation';

dotenv.config();

interface tokenData {
    access_token: string;
    refresh_token: string;
    scope: string;
    expires_in: number;
    token_type: string;
}
interface user {
    Me: {
        Name: string;
        Email: string;
        SysAdmin: boolean;
    }
}

export const GET = async (req: NextRequest) => {
    const db = await getDatabase();
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
        return NextResponse.json({ error: 'Missing code or state parameter' }, { status: 400 });
    }

    // exchange code for token
    const response = await fetch('https://apps.fortnox.se/oauth-v1/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic YzdoeGZxMllxRnVtOnhUa1NlMGlPZXA=`
        },
        body: new URLSearchParams({
            code,
            client_id: process.env.FORTNOX_CLIENT_ID || '',
            client_secret: process.env.FORTNOX_CLIENT_SECRET || '',
            redirect_uri: process.env.FORTNOX_REDIRECT_URI || '',
            grant_type: 'authorization_code',
        }),
    });

    const data: tokenData = await response.json();

    if (!data.access_token) {
        return NextResponse.json({ error: 'Failed to exchange code for token' }, { status: 400 });
    }

    // make a session request to get user info
    const userResponse = await fetch('https://apps.fortnox.se/3/me', {
        headers: {
            'Authorization': `Bearer ${data.access_token}`
        },
    });
    const user: user = await userResponse.json();

    const formData = new FormData();
    if (!user.Me) {
        return NextResponse.json({ error: 'Failed to retrieve user information' }, { status: 400 });
    }

    formData.set('email', user.Me.Email);
    formData.set('name', user.Me.Name);
    formData.set('sysadmin', user.Me.SysAdmin.toString());
    formData.set('token', data.access_token);
    formData.set('refresh_token', data.refresh_token);
  
    
    // save the data in the database
    await db.run(
        `INSERT INTO data (email, name, sysadmin, token, refresh_token, expires_in) VALUES (?, ?, ?, ?, ?, ?)`,
        [user.Me.Email, user.Me.Name, user.Me.SysAdmin, data.access_token, data.refresh_token, data.expires_in]
    );
    
    // login the user
    await login(formData);
    return redirect('/'); 
};
