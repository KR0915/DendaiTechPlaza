'use server';

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// APIへのURLを宣言
const baseApiUrl: string = `${process.env.SPRING_REST_API_URL}`;

/**
 * 投稿のブックマークを削除する
 *
 * @param DELETEId - 削除したいブックマークがある投稿ID
 * @returns ブックマークが削除できたらtrue できなかったらfalse
 * @throws {Error} ブックマークの削除に失敗した場合
 */
export async function deleteBookmark(postId: number): Promise<boolean> {
    const session = await getServerSession(authOptions);
    if (!session) {
        const loginUrl = `${process.env.NEXT_PUBLIC_URL}/signin/?callbackUrl=${process.env.NEXT_PUBLIC_URL}/post/${postId}`
        redirect(loginUrl);
    }
    const res = await fetch(`${baseApiUrl}/posts/${postId}/bookmark`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error('Failed to delete bookmark');
    }
    return res.ok;
}