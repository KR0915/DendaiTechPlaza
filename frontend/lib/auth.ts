import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            name?: string | null;
            email?: string | null;
        };
        accessToken: string;
        error?: string;
    }

    interface User {
        id: string;
        username: string;
        accessToken: string;
        name?: string;
        email?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        username: string;
        accessToken: string;
    }
}






export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }
                try {
                    const res = await fetch(`${process.env.SPRING_REST_API_URL}/auth/login`, {
                        method: 'POST',
                        body: JSON.stringify({
                            username: credentials.username,
                            password: credentials.password
                        }),
                        headers: { "Content-Type": "application/json" }
                    });
                    const data = await res.json();
                    if (res.ok && data.token) {
                        // Return an object that will be encoded in the JWT
                        return {
                            id: credentials.username,
                            username: credentials.username,
                            accessToken: data.token
                        };
                    }
                } catch (error) {
                    console.error('Authentication error:', error);
                }
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id,
                username: token.username,
                name: token.name,
                email: token.email,
            };
            session.accessToken = token.accessToken;
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, //セッション期間 1週間
    },
};