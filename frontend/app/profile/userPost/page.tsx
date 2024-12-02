import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { PostList } from "./components/PostList";

export default function userPost() {
    return (
        <div>
            <div className="p-8 container">
                <h1 className="text-2xl font-bold mb-6">自分の投稿</h1>
                <Suspense fallback={<div className="flex"><Loader2 className="h-36 w-36 animate-spin mx-auto mt-4" /></div>}>
                    <PostList />
                </Suspense>
            </div>
        </div>
    );
}
