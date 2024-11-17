import { DendaiUser } from "@/types/user";
import { getUserByToken } from "@/utils/dendaitech/User/GET/UserGET";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            name?: string | null;
            userEmail: string;
        };
        accessToken: string;
        error?: string;
    }

    interface User {
        id: string;
        username: string;
        accessToken: string;
        name?: string;
        userEmail: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        username: string;
        userEmail: string;
        accessToken: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                userEmail: { label: "UserEmail", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.userEmail || !credentials?.password) {
                    return null;
                }
                try {
                    const res = await fetch(`${process.env.SPRING_REST_API_URL}/auth/login`, {
                        method: 'POST',
                        body: JSON.stringify({
                            email: credentials.userEmail,
                            password: credentials.password
                        }),
                        headers: { "Content-Type": "application/json" }
                    });
                    const data = await res.json();
                    if (res.ok && data.token) {
                        // Return an object that will be encoded in the JWT
                        let id: number | string = credentials.userEmail;
                        let username: string = credentials.userEmail;
                        const userInfo: DendaiUser | Error = await getUserByToken(data.token);
                        if (!(userInfo instanceof Error)) {
                            id = userInfo.userId;
                            username = userInfo.username;
                        } else {
                            console.error('ユーザー情報取得エラー:', userInfo.message);
                        }
                        return {
                            id: id.toString(),
                            username: username,
                            userEmail: credentials.userEmail,
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
                token.userEmail = user.userEmail;
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id,
                username: token.username,
                name: token.name,
                userEmail: token.userEmail,
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