'use server';

import { authOptions } from "@/lib/auth";
import { PostResponse } from "@/types/post";
import { DendaiUser } from "@/types/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// APIへのURLを宣言
const baseApiUrl: string = `${process.env.SPRING_REST_API_URL}`;

/**
 * 現在のユーザー情報を取得する
 * 
 * @param callbackUrl - コールバックURL（オプション）
 * @returns ユーザー情報（DendaiUser）、または取得失敗時にErrorオブジェクト
 * @throws {Error} セッションが存在しない場合（ログインページにリダイレクト）
 * 
 * @example
 * // ユーザー情報取得成功の例
 * const result = await getUser();
 * if (!(result instanceof Error)) {
 *   console.log('ユーザー情報:', result);
 * } else {
 *   console.error('ユーザー情報取得エラー:', result.message);
 * }
 * 
 * @example
 * // ユーザー情報取得失敗の例
 * const result = await getUser('/profile');
 * if (result instanceof Error) {
 *   console.error('ユーザー情報取得エラー:', result.message);
 * }
 */
export async function getUser(callbackUrl?:string): Promise<DendaiUser | Error> {
    const session = await getServerSession(authOptions);
    if (!session) {
        const loginUrl = new URL(`${process.env.NEXT_PUBLIC_URL}/signin`);
        if (callbackUrl) {
            loginUrl.searchParams.append('callbackUrl', callbackUrl)
        }
        redirect(loginUrl.href);
    }

    try {
        const res = await fetch(`${baseApiUrl}/user/info`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            },
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    } catch (error) {
        return new Error(`ユーザー情報の取得に失敗しました:\n${error}`);
    }
}

/**
 * ユーザーのブックマークした投稿を取得する
 * 
 * @param page - ページ番号（デフォルト: 0）
 * @param size - 1ページあたりの投稿数（デフォルト: 10）
 * @param callbackUrl - コールバックURL（オプション）
 * @returns ブックマークした投稿情報（PostResponse）、または取得失敗時にErrorオブジェクト
 * @throws {Error} セッションが存在しない場合（ログインページにリダイレクト）
 * 
 * @example
 * // ブックマーク投稿取得成功の例
 * const result = await getUserBookmarks(0, 5);
 * if (!(result instanceof Error)) {
 *   console.log('ブックマークした投稿:', result.content);
 *   console.log('総ページ数:', result.totalPages);
 * } else {
 *   console.error('ブックマーク投稿取得エラー:', result.message);
 * }
 * 
 * @example
 * // ブックマーク投稿取得失敗の例
 * const result = await getUserBookmarks(1, 10, '/bookmarks');
 * if (result instanceof Error) {
 *   console.error('ブックマーク投稿取得エラー:', result.message);
 * }
 */
export async function getUserBookmarks(page=0, size=10,callbackUrl?:string): Promise<PostResponse | Error> {
    const session = await getServerSession(authOptions);
    if (!session) {
        const loginUrl = new URL(`${process.env.NEXT_PUBLIC_URL}/signin`);
        if (callbackUrl) {
            loginUrl.searchParams.append('callbackUrl', callbackUrl)
        }
        redirect(loginUrl.href);
    }

    const targetUrl = new URL(`${baseApiUrl}/user/bookmarks`);
    targetUrl.searchParams.append('page', page.toString());
    targetUrl.searchParams.append('size', size.toString());

    try {
        const res = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            },
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    } catch (error) {
        return new Error(`ユーザーブックマークした投稿の情報の取得に失敗しました:\n${error}`);
    }
}