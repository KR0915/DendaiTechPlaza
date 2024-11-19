import BookmarkButton from "@/components/elements/Buttons/BookmarkButton/BookmarkButton";
import { getPostById } from "@/utils/dendaitech/Post/GET/PostGET";
import Ogps from "../components/ogps";

export default async function post({ params }: { params: Promise<{ id: string }> }) {
    const postParams = await params;
    const post = await getPostById(postParams.id, 0, 5, 0, 3);

    return (
        <>
            <div>このページは投稿番号{`${postParams.id}`}番のページである。</div>
            <BookmarkButton postId={Number(postParams.id)} />
            {post.sharedUrls
                ? <Ogps urls={post.sharedUrls} />
                : <p>none</p>}
        </>
    );
}