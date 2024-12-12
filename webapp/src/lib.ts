import { SessionOptions } from "iron-session";

export interface SessionData {
    user?: {
        name: string;
        email: string;
        sysadmin: boolean;
    }
    isLoggedIn: boolean;
    expires?: Date;
}

export const defaultSession: SessionData = {
  isLoggedIn: false
};

export const sessionOptions: SessionOptions = {
    password: process.env.NEXTAUTH_SECRET!,
    cookieName: "session",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60
    },
};
