import { Post } from "@/types/post"
import PostCard from "../PostCard/PostCard"

interface PostCardProps{
    posts:Post[]
}

export default function PostCards({posts}:PostCardProps){
    return(
        <div>
          {posts.map(post => (
            <div key={post.postId}>
              <PostCard post={post}/>
            </div>
          ))}
        </div>
    )
}