import { getUserBookmarks } from "@/utils/dendaitech/User/GET/UserGET";
import { getBookmarkStatus } from "../../utils/getBookmarkStatus";
import BookmarkListClient from "./BookmarkListClient";

export async function BookmarkList() {
    const bookmarks = await getUserBookmarks();
    if (!(bookmarks instanceof Error)) {
        const bookmarkStatus = await getBookmarkStatus(bookmarks.content);
        // クライアントコンポーネントに切り出さないとエラーが出る
        return <BookmarkListClient initialBookmarks={bookmarks.content} initialBookmarkStatus={bookmarkStatus} />;
    } else {
        return <p>ブックマークがありません</p>;
    }
}
