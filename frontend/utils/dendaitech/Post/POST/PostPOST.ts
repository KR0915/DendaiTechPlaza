
'use server';

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export class PostPost {
    // APIへのURLを宣言
    static baseApiUrl: string = `${process.env.SPRING_REST_API_URL}`;

    /**
     * 投稿をIDで取得する
     *
     * @param postId - ブックマークしたい投稿のID
     * @returns ブックマークできたらtrue できなかったらfalse
     * @throws {Error} 投稿の取得に失敗した場合
     */
    static async addBookmark(postId: string): Promise<boolean> {
        const session = await getServerSession(authOptions);
        if (!session) {
            const loginUrl = `${process.env.NEXT_PUBLIC_URL}/signin/?callbackUrl=${process.env.NEXT_PUBLIC_URL}/post/${postId}`
            redirect(loginUrl);
        }
        const res = await fetch(`${this.baseApiUrl}/api/posts/${postId}/bookmark`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            },
        });
        if (!res.ok) {
            throw new Error('Failed to fetch posts');
        }
        return res.json();
    }
}