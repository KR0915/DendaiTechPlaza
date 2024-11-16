'use server';

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// APIへのURLを宣言
const baseApiUrl: string = `${process.env.SPRING_REST_API_URL}`;

/**
 * 投稿をブックマークする
 *
 * @param postId - ブックマークしたい投稿のID
 * @returns ブックマークできたらtrue できなかったらfalse
 * @throws {Error} 投稿の取得に失敗した場合
 */
export async function addBookmark(postId: string): Promise<boolean> {
    const session = await getServerSession(authOptions);
    if (!session) {
        const loginUrl = `${process.env.NEXT_PUBLIC_URL}/signin/?callbackUrl=${process.env.NEXT_PUBLIC_URL}/post/${postId}`
        redirect(loginUrl);
    }
    const res = await fetch(`${baseApiUrl}/posts/${postId}/bookmark`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error('Failed to add bookmark');
    }
    return res.ok;
}

/**
 * 投稿をブックマークする
 *
 * @param postId - ブックマークしたい投稿のID
 * @returns ブックマークできたらtrue できなかったらfalse
 * @throws {Error} 投稿の取得に失敗した場合
 */
export async function addPost(postId: string): Promise<boolean> {
    const session = await getServerSession(authOptions);
    if (!session) {
        const loginUrl = `${process.env.NEXT_PUBLIC_URL}/signin/?callbackUrl=${process.env.NEXT_PUBLIC_URL}/post/${postId}`
        redirect(loginUrl);
    }
    const res = await fetch(`${baseApiUrl}/posts/${postId}/bookmark`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error('Failed to add bookmark');
    }
    return res.ok;
}