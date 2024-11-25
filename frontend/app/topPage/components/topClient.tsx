import PostCards from "@/components/elements/Card/PostCards/PostCards";
import { PostResponse } from "@/types/post";

interface TopClientComponentProps {
    fetchedPosts: PostResponse;
    bookmarkStatus: Map<number, boolean>;
}

export default function TopClientComponent({ fetchedPosts, bookmarkStatus}: TopClientComponentProps) {
    return (
        <PostCards posts={fetchedPosts.content} bookmarkStatus={bookmarkStatus} />
    );

}