import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { BookmarkList } from "./components/BookmarkList";

export default async function userBookmark() {
    return (
        <div>
            <div className="p-8 container">
                <h1 className="text-2xl font-bold mb-6">ブックマークした投稿</h1>
                <Suspense fallback={<div className="flex"><Loader2 className="h-36 w-36 animate-spin mx-auto mt-4" /></div>}>
                    <BookmarkList />
                </Suspense>
            </div>
        </div>
    );
}
