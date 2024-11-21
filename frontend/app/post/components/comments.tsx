'use client';
import { CommentPage } from "@/types/post";
import { convertUTCtoJST } from "@/utils/timeFormatter/timeFormatter";
import "../styles/postStyle.css";
import AvatarPost from "./avatar";
import DeleteContentEllipsisVertical from "./ellipsis-vertical";
import FormContent from "./formContent";
import Reply from "./reply";

interface Commentsprops {
    comments: CommentPage | undefined;
    postId: number;
}

export default function Comments({ comments, postId }: Commentsprops) {
    if (!comments) {
        return null;
    }

    return (
        <div className="space-y-4">
            <FormContent type={"comment"} contentId={postId} />


            {comments.content.map(comment => (
                <div key={comment.commentId}>
                    <div className="flex gap-2">
                        <div className="grow-0 pt-2">
                            <AvatarPost src={`/user/icons/${comment.userId}.webp`} alt={comment.username} fallback={comment.username} size="md" />
                        </div>
                        <div className="flex flex-col grow pt-2">
                            <div className="flex items-center">
                                <h2 className="text-base font-bold">{`${comment.username}`}</h2>
                                <p className="ml-2 my-auto text-xs text-slate-600">{convertUTCtoJST(comment.createdAt)}</p>
                                <div className="ml-auto">
                                    <DeleteContentEllipsisVertical type={"comment"} contentId={comment.commentId} userId={String(comment.userId)} />
                                </div>
                            </div>
                            <div>
                                <p className="text">{`${comment.content}`}</p>
                                <div>
                                    <Reply replies={comment.replies} commentId={comment.commentId} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}