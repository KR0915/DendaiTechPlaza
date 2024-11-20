'use client';
import { CommentPage } from "@/types/post";
import AvatarPost from "./avatar";
import Reply from "./reply";

interface Commentsprops {
    commnents: CommentPage | undefined;
}

export default function Comments({ commnents }: Commentsprops) {
    if (!commnents) {
        return <p>Not Comment</p>
    }

    return (
        <div>
            {commnents.content.map(comment => (
                <div key={comment.commentId}>
                    <div className="flex items-center gap-2">
                        <AvatarPost src={`/user/icons/${comment.userId}.webp`} alt={comment.username} fallback={comment.username} size="sm" />
                        <h2 className="font-medium">{`${comment.username}`}</h2>
                    </div>
                    <p>{comment.content}</p>
                    <p>{comment.createdAt}</p>
                    <div>
                        <Reply replies={comment.replies} />
                    </div>
                </div>
            ))}
        </div>
    );
}