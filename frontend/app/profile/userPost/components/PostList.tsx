import { authOptions } from "@/lib/auth";
import { getUserPosts } from "@/utils/dendaitech/Post/GET/PostGET";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PostListClient from "./PostListClient";

export async function PostList() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/")
    }
    const posts = await getUserPosts(session?.user.id.toString());
    if (!(posts instanceof Error)) {
        // クライアントコンポーネントに切り出さないとエラーが出る
        return (
            <PostListClient initialPosts={posts.content} />
        );
    } else {
        return <p>まだ投稿がありません</p>;
    }
}
