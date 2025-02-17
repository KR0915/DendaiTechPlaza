import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    // 許可リンク集。ここにかいてあるリンクから始まるパスはログインして無くても見れる。
    const publicPaths = ['/signin', '/register', '/search','/header' , '/post', '/user/icons', '/confirmCurrentDirectory']

    // トップページまたは許可されたリンクかどうか調べる。
    const isPublicPath = request.nextUrl.pathname === '/' || publicPaths.some(path => request.nextUrl.pathname.startsWith(path))

    if (token) {
        // トークンの有効期限が切れているかチェック
        const expiration = token.exp
        if (typeof expiration === 'number' && Date.now() >= expiration * 1000) {
            // セッションが期限切れの場合、ログインページにリダイレクト
            const loginUrl = new URL('/signin', request.url)
            loginUrl.searchParams.set('callbackUrl', request.url)
            return NextResponse.redirect(loginUrl)
        }
    }

    if (!token && !isPublicPath) {
        // Redirect to login page if there's no valid token and it's not a public path
        const loginUrl = new URL('/signin', request.url)
        loginUrl.searchParams.set('callbackUrl', request.url)
        return NextResponse.redirect(loginUrl)
    }

    if (token && (request.nextUrl.pathname === '/signin' || request.nextUrl.pathname === '/register')) {
        // ユーザーがすでにログインしていて、ログインまたは登録ページにアクセスしようとしている場合は、ホームページにリダイレクトします。
        return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_URL as string, request.url))
    }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
    matcher: [
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            missing: [
                { type: 'header', key: 'next-action' },
            ],
        }
    ],
}