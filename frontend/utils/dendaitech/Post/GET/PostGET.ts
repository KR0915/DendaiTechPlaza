'use server';

import { authOptions } from "@/lib/auth";
import { Post, PostResponse } from "@/types/post";
import { getServerSession } from "next-auth";
import { z } from 'zod';

// APIへのURLを宣言
const baseApiUrl: string = `${process.env.SPRING_REST_API_URL}`;

/**
 * 指定されたIDの投稿を取得する
 * 
 * この関数は、指定されたIDの投稿とそれに関連するコメント、返信を非同期で取得します。
 * コメントと返信はページネーションされており、ページ番号とサイズを指定できます。
 * 
 * @param postId - 取得したい投稿のID
 * @param commentPage - コメントのページ番号 (デフォルト: 0)
 * @param commentSize - 1ページあたりのコメント数 (デフォルト: 10)
 * @param replyPage - 返信のページ番号 (デフォルト: 0)
 * @param replySize - 1ページあたりの返信数 (デフォルト: 10)
 * @returns {Promise<Post>} 指定されたIDの投稿データを含むPromise
 * @throws {Error} 投稿の取得に失敗した場合
 * 
 * @example
 * try {
 *   const post = await getPostById('123', 0, 5, 0, 3);
 *   console.log(post.title);
 *   console.log(post.comments.content); // 最初の5件のコメント
 *   console.log(post.comments.content[0].replies.content); // 最初のコメントの最初の3件の返信
 * } catch (error) {
 *   console.error('投稿の取得中にエラーが発生しました:', error);
 * }
 */
export async function getPostById(postId: string, commentPage = 0, commentSize = 10, replyPage = 0, replySize = 10): Promise<Post> {
    const res = await fetch(`${baseApiUrl}/posts/${postId}?commentPage=${commentPage}&commentSize=${commentSize}&replyPage=${replyPage}&replySize=${replySize}`,
        {
            method: 'GET',
            cache: "no-store",
        },);
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }
    return res.json();
}

/**
 * 指定された投稿がブックマークされているかを確認する
 * 
 * この関数は、現在のユーザーセッションを使用して、指定された投稿がブックマークされているかどうかを
 * サーバーに問い合わせます。ユーザーがログインしていない場合は、常にfalseを返します。
 * 
 * @param postId - ブックマークステータスを確認したい投稿のID
 * @returns {Promise<boolean>} 投稿がブックマークされている場合はtrue、そうでない場合はfalseを含むPromise
 * @throws {Error} サーバーリクエストが失敗した場合（ただし、エラーはキャッチされログに記録されます）
 * 
 * @example
 * const isBookmarked = await getIsBookmark('123');
 * console.log(isBookmarked); // true または false
 */
export async function getIsBookmark(postId: number): Promise<boolean> {
    const session = await getServerSession(authOptions);
    if (!session) {
        return false;
    }
    try {
        const res = await fetch(`${baseApiUrl}/posts/${postId}/isBookmark`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            },
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const text = await res.text();
        return text.toLowerCase() === 'true';
    } catch (error) {
        console.error('Error fetching bookmark status:', error);
        return false;
    }
}

/**
 * 特定のユーザーの投稿を取得する
 * 
 * この関数は、指定されたユーザーIDに基づいて投稿をページネーション形式で非同期に取得します。
 * 取得したデータはページネーション情報を含む PostResponse オブジェクトとして返されます。
 * 
 * @param userId - 投稿を取得したいユーザーのID
 * @param page - 取得するページ番号 (デフォルト: 0)
 * @param size - 1ページあたりの投稿数 (デフォルト: 10)
 * @returns {Promise<PostResponse>} ユーザーの投稿データとページネーション情報を含む Promise
 * @throws {Error} ユーザーの投稿の取得に失敗した場合
 * 
 * @example
 * try {
 *   const userPosts = await getUserPosts('123', 0, 20);
 *   console.log(userPosts.content); // ユーザーの投稿の配列
 *   console.log(userPosts.totalPages); // 総ページ数
 * } catch (error) {
 *   console.error('ユーザーの投稿の取得中にエラーが発生しました:', error);
 * }
 */
export async function getUserPosts(userId: string, page = 0, size = 10): Promise<PostResponse> {
    const res = await fetch(`${baseApiUrl}/posts/user/${userId}?page=${page}&size=${size}`,
        {
            method: 'GET',
            next: { revalidate: 0 }
        });
    if (!res.ok) {
        throw new Error('Failed to fetch user posts');
    }
    return res.json();
}

/**
 * 投稿を検索する
 * 
 * この関数は、指定された条件に基づいて投稿を検索し、結果をページネーション形式で非同期に取得します。
 * 各パラメータは検証され、無効な値の場合はエラーメッセージが返されます。
 * 
 * @param keyword - 検索キーワード（オプション、最大50文字）
 * @param year - 検索対象年度（オプション、1800から現在の年まで）
 * @param grade - 学年（オプション、1から4まで）
 * @param department - 学科コード（オプション、指定された学科コードのみ有効）
 * @param semester - 学期（オプション、'前期', '後期', 'その他'のみ有効）
 * @param page - ページ番号（デフォルト: 0）
 * @param size - 1ページあたりの投稿数（デフォルト: 10）
 * @returns {Promise<PostResponse | string>} 検索結果の投稿データとページネーション情報を含むPromise、
 *                                           またはバリデーションエラーメッセージ
 * @throws {Error} 投稿の検索に失敗した場合
 * 
 * @example
 * try {
 *   const result = await getSearchPosts('プログラミング', 2023, 2, 'AD', '前期');
 *   if (typeof result === 'string') {
 *     console.error('検索パラメータエラー:', result);
 *   } else {
 *     console.log('検索結果:', result.content);
 *     console.log('総ページ数:', result.totalPages);
 *   }
 * } catch (error) {
 *   console.error('検索中にエラーが発生しました:', error);
 * }
 */
export async function getSearchPosts(keyword?: string, year?: number, grade?: number, department?: string, semester?: string, page = 0, size = 10): Promise<PostResponse | string> {
    const targetUrl = new URL(`${baseApiUrl}/posts/search`);
    targetUrl.searchParams.append('page', page.toString());
    targetUrl.searchParams.append('size', size.toString());
    if (keyword) {
        const verification = z.string().max(50, '検索文字列は50文字以内でお願いします').safeParse(keyword);
        if (!verification.success) {
            return verification.error.errors[0].message;
        }
        targetUrl.searchParams.append('keyword', keyword);
    }
    if (year) {
        const d = new Date();
        const thisYear = d.getFullYear();
        const verification = z.number().min(1800, "yearの値は1800以上でお願いします。").max(thisYear, `yearの値は${thisYear}以下でお願いします。`).safeParse(year);
        if (!verification.success) {
            return verification.error.errors[0].message;
        }
        targetUrl.searchParams.append('year', year.toString());
    }
    if (grade) {
        const verification = z.number().min(1, "gradeの値は1以上でお願いします。").max(4, `gradeの値は4以下でお願いします。`).safeParse(year);
        if (!verification.success) {
            return verification.error.errors[0].message;
        }
        targetUrl.searchParams.append('grade', grade.toString());
    }
    if (department) {
        const verification = z.enum([
            'AD', 'AJ', 'EK', 'EF', 'ES', 'EC', 'EJ', 'EH', 'FI', 'FA',
            'FR', 'NC', 'NM', 'NE', 'RB', 'RE', 'RD', 'RU', 'RM', 'RG'
        ]);
        try {
            verification.parse(department);
            targetUrl.searchParams.append('department', department);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return `${department}は東京電機大学に存在しません`;
            }
        }
    }
    if (semester) {
        const verification = z.enum([
            '前期', '後期', 'その他'
        ]);
        try {
            verification.parse(semester);
            targetUrl.searchParams.append('semester', semester);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return `${semester}は学期の入力として不適切です。`;
            }
        }
    }

    const res = await fetch(targetUrl, { method: 'GET' });
    if (!res.ok) {
        throw new Error('投稿の検索に失敗しました。');
    }
    return res.json();
}


/**
 * 最近の投稿を取得する
 * 
 * この関数は、最近の投稿をページネーション形式で非同期に取得します。
 * 取得したデータはページネーション情報を含む PostResponse オブジェクトとして返されます。
 * 
 * @param page - 取得するページ番号 (デフォルト: 0)
 * @param size - 1ページあたりの投稿数 (デフォルト: 10)
 * @returns {Promise<PostResponse>} 最近の投稿データとページネーション情報を含む Promise
 * @throws {Error} 投稿の取得に失敗した場合
 * 
 * @example
 * try {
 *   const recentPosts = await getRecentPosts(0, 20);
 *   console.log(recentPosts.content); // 最近の投稿の配列
 *   console.log(recentPosts.totalPages); // 総ページ数
 * } catch (error) {
 *   console.error('最近の投稿の取得中にエラーが発生しました:', error);
 * }
 */
export async function getRecentPosts(page = 0, size = 10): Promise<PostResponse> {
    const targetUrl = new URL(`${baseApiUrl}/posts/recent`);
    targetUrl.searchParams.append('page', page.toString());
    targetUrl.searchParams.append('size', size.toString());
    const res = await fetch(targetUrl, {
        method: 'GET',
        next: { revalidate: 0 }
    });
    if (!res.ok) {
        throw new Error('最近の投稿の取得に失敗しました。');
    }
    return res.json();
}


/**
 * 人気の投稿を取得する
 * 
 * この関数は、人気の投稿をページネーション形式で非同期に取得します。
 * 取得したデータはページネーション情報を含む PostResponse オブジェクトとして返されます。
 * 
 * @param page - 取得するページ番号 (デフォルト: 0)
 * @param size - 1ページあたりの投稿数 (デフォルト: 10)
 * @returns {Promise<PostResponse>} 人気の投稿データとページネーション情報を含む Promise
 * @throws {Error} 投稿の取得に失敗した場合
 * 
 * @example
 * try {
 *   const popularPosts = await getPopularPosts(0, 20);
 *   console.log(popularPosts.content); // 人気の投稿の配列
 *   console.log(popularPosts.totalPages); // 総ページ数
 * } catch (error) {
 *   console.error('人気の投稿の取得中にエラーが発生しました:', error);
 * }
 */
export async function getPopularPosts(page = 0, size = 10): Promise<PostResponse> {
    const targetUrl = new URL(`${baseApiUrl}/posts/popular`);
    targetUrl.searchParams.append('page', page.toString());
    targetUrl.searchParams.append('size', size.toString());
    const res = await fetch(targetUrl, {
        method: 'GET',
        next: { revalidate: 60 }
    });
    if (!res.ok) {
        throw new Error('人気の投稿の取得に失敗しました。');
    }
    return res.json();
}