import { getUserBookmarks } from "@/utils/dendaitech/User/GET/UserGET";
import BookmarkListClient from "./BookmarkListClient";

export async function BookmarkList() {
    const bookmarks = await getUserBookmarks();
    if (!(bookmarks instanceof Error)) {
        // クライアントコンポーネントに切り出さないとエラーが出る
        return <BookmarkListClient initialBookmarks={bookmarks.content} />;
    } else {
        return <p>ブックマークがありません</p>;
    }
}
