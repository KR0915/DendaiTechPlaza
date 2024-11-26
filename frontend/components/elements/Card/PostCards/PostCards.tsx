import { Post } from "@/types/post";
import PostCard from "../PostCard/PostCard";

interface PostCardProps{
    posts:Post[];
    bookmarkStatus?: Map<number, boolean>;
    bookmarkCount?: Map<number, number>;
    OnClickBookmarkButton?: (postId: number, type: string) => void;
}

export default function PostCards({posts, bookmarkStatus, bookmarkCount, OnClickBookmarkButton}:PostCardProps){
    return(
        <div>
          {posts.map(post => (
            <div key={post.postId}>
              <PostCard post={post} bookmarkStatus={bookmarkStatus} bookmarkCount={bookmarkCount} OnClickBookmarkButton={OnClickBookmarkButton}/>
            </div>
          ))}
        </div>
    )
}