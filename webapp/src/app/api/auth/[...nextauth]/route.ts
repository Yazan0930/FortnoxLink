import NextAuth from "next-auth"
interface FortnoxProfile {
    Id: string;
    Name: string;
    Email: string;
}

export const authOptions = {
    providers: [
        ({
            id: "fortnox",
        name: "Fortnox",
        type: "oauth" as const,
        version: "2.0",
        authorization: {
            url: "https://apps.fortnox.se/oauth-v1/auth",
            params: {
                clientId: process.env.FORTNOX_CLIENT_ID!,
                redirect_uri: 'http://localhost:3000/api/auth/callback/fortnox',
                scope: ['article', 'order', 'companyinformation', 'profile'].join(' '),
                state: 'randomState',
                response_type: "code",
            },
        }, 
        token: {
            url: "https://apps.fortnox.se/oauth-v1/token"
        },
        clientId: process.env.FORTNOX_CLIENT_ID!,
        userInfo: "https://api.fortnox.se/3/profile",
        profile(profile: FortnoxProfile) {
            return {
            id: profile.Id,
            name: profile.Name,
            email: profile.Email,
            }
        },
        })
    ],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
