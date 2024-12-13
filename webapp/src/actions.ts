"use server"

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { redirect } from "next/navigation";

let db: Database<sqlite3.Database> | null = null;

const getDatabase = async (): Promise<Database<sqlite3.Database>> => {
    if (!db) {
        db = await open({
            filename: "./collection.db",
            driver: sqlite3.Database,
        });
    }
    return db;
};

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
    await session.save();
};

export const logout = async () => {
    cleanUp();
    redirect("/");
};

export const getToken = async() => {
    const db = await getDatabase();

    const token = await db.get("SELECT DISTINCT token FROM data");
    console.log("Token from getToken: ", token);
    return token;
}

const cleanUp = async () => {
    console.log("Cleaning up...");
    const session = await getSession();
    if (!session.expires || session.expires < new Date() || !session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
        session.destroy();
    }

    const db = await getDatabase();
    if (db) {
        await db.close();
    }

    const fs = require("fs");
    if (fs.existsSync("./collection.db")) {
        fs.unlinkSync("./collection.db");
    }
    console.log("Clean up completed.");
}