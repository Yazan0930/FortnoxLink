import { NextRequest, NextResponse } from 'next/server';
import { login, getToken } from '@/actions';
import dotenv from 'dotenv';
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { redirect } from 'next/navigation';

let db: Database<sqlite3.Database> | null = null;

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

    // Check if the database instance has been initialized
    if (!db) {
        db = await open({
        filename: "./collection.db", // Specify the database file path
        driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
        });
        interface RunResult {
            lastID: number;
            changes: number;
        }

        interface RunCallback {
            (err: Error | null, result: RunResult): void;
        }

        db.run(
            `CREATE TABLE IF NOT EXISTS data (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  email TEXT,
                  name TEXT,
                  sysadmin BOOLEAN,
                  token TEXT,
                  refresh_token TEXT,
                  expires_in INTEGER
              )`,
            [],
            (err: Error | null) => {
                if (err) {
                    console.error("Failed to create table:", err);
                    return;
                }
                console.log("Table created data successfully.");
            }
        );

        // print all the rows in the data table
        const rows = await db.all(`SELECT name 
FROM sqlite_master 
WHERE type = 'table';
`);
        console.log(rows);
    }


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
    try {
        await db.run(
            `INSERT INTO data (email, name, sysadmin, token, refresh_token, expires_in) VALUES (?, ?, ?, ?, ?, ?)`,
            [user.Me.Email, user.Me.Name, user.Me.SysAdmin, data.access_token, data.refresh_token, data.expires_in]
        );
    }
    catch (error) {
        return NextResponse.json({ error: 'DB Failed to save user information' }, { status: 400 });
    }

    // login the user
    await login(formData);
    return redirect('/'); 
};
