import { Post } from "@/types/post";
import PostCard from "../PostCard/PostCard";

interface PostCardProps{
    posts:Post[];
    bookmarkStatus: Map<number, boolean>;
}

export default function PostCards({posts, bookmarkStatus}:PostCardProps){
    return(
        <div>
          {posts.map(post => (
            <div key={post.postId}>
              <PostCard post={post} bookmarkStatus={bookmarkStatus}/>
            </div>
          ))}
        </div>
    )
}