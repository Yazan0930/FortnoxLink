"use server"

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { redirect } from "next/navigation";

let db: Database<sqlite3.Database> | null = null;

export const getSession = async () => {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    };
    
    return session;
};

export const login = async (formData:FormData) => {
    const session = await getSession();
    session.isLoggedIn = true;
    session.user = { 
        email: formData.get("email") as string ?? "", 
        name: formData.get("name") as string ?? "",
        sysadmin: formData.get("sysadmin") === "true"
    };

    // add expires in 30s   
    session.expires = new Date(Date.now() + 30 * 1000);

    await session.save();
    console.log("Session is created successfully: ", session);
};

export const logout = async () => {
    const session = await getSession();
    session.destroy();
    redirect("/");
};

export const getToken = async() => {
    const db = await open({
        filename: "./collection.db",
        driver: sqlite3.Database,
    });

    const token = await db.get("SELECT DISTINCT token FROM data");
    console.log("Token from getToken: ", token);
    return token;
}
