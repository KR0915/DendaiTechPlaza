import { getUser } from "@/utils/dendaitech/User/GET/UserGET";
import { getBookmarkStatus } from "../../utils/getBookmarkStatus";
import PostListClient from "./PostListClient";
import { getUserPosts } from "@/utils/dendaitech/Post/GET/PostGET";

export async function PostList() {
    const userid = (await getUser()).userId.toString();
    const posts = await getUserPosts(userid);
    if (!(posts instanceof Error)) {
        const bookmarkStatus = await getBookmarkStatus(posts.content);
        // クライアントコンポーネントに切り出さないとエラーが出る
        return <PostListClient initialPosts={posts.content} initialBookmarkStatus={bookmarkStatus} />;
    } else {
        return <p>まだ投稿がありません</p>;
    }
}
