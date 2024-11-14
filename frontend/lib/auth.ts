import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
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



interface RefreshedTokens {
    accessToken: string;
    expiresIn: number;
    refreshToken?: string;
}

interface ExtendedToken extends JWT {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
    error?: string;
}

async function refreshAccessToken(token: ExtendedToken): Promise<ExtendedToken> {
    try {
        const response = await fetch('http://your-spring-boot-api/api/auth/refresh', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refreshToken: token.refreshToken,
            }),
        });

        const refreshedTokens: RefreshedTokens = await response.json();

        if (!response.ok) {
            throw new Error('Failed to refresh access token');
        }

        return {
            ...token,
            accessToken: refreshedTokens.accessToken,
            accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000,
            refreshToken: refreshedTokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
        };
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
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
                console.log(credentials);
                const res = await fetch(`${process.env.SPRING_REST_API_URL}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });
                console.log(res);
                const user = await res.json();

                if (res.ok && user) {
                    return user;
                }
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }): Promise<ExtendedToken> {
            // 初回のサインイン
            if (account && user) {
                return {
                    accessToken: account.access_token as string,
                    accessTokenExpires: Date.now() + (account.expires_in as number) * 1000,
                    refreshToken: account.refresh_token as string,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    },
                } as ExtendedToken;
            }

            // トークンが有効期限内の場合は返す
            if (Date.now() < (token as ExtendedToken).accessTokenExpires) {
                return token as ExtendedToken;
            }

            // アクセストークンの有効期限が切れている場合は更新
            return refreshAccessToken(token as ExtendedToken);
        },
        async session({ session, token }) {
            const extendedToken = token as ExtendedToken;
            session.user = {
                id: token.id,
                username: token.username,
                name: token.name,
                email: token.email,
            };
            session.accessToken = extendedToken.accessToken;
            session.error = extendedToken.error;

            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, //セッション期間 1週間
    },
};