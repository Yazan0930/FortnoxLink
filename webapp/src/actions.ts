"use server"

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

export const getDatabase = async (): Promise<Database<sqlite3.Database>> => {
    const sqlite3 = require("sqlite3").verbose();
    const db = new sqlite3.Database(
        "collection.db",
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err: Error) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Connected to the SQlite database.");
      }
    );
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
        (err: Error) => {
          if (err) {
            console.error("Failed to create table:", err);
            return;
          }
          console.log("Table created data successfully.");
        }
    );

    return db;
};

export const getSession = async () => {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
     
    return session
};


export const getPlainSession = async () => {
    const session = await getSession();
    return JSON.stringify(session);
}

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
    const session = await getSession();
    session.isLoggedIn = defaultSession.isLoggedIn;
    console.log("Form logout action: ", session);
    await cleanUp();
    console.log("Session after logout: ", session);
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
        session.destroy();

        const fs = await require("fs");
        if (fs.existsSync("collection.db")) {
            await fs.unlinkSync("collection.db");
        }
    }
    console.log("Clean up completed.");
}