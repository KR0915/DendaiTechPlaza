'use client';
import { postReply } from "@/types/post";

interface Replyprops {
    replies: postReply[] | undefined;
}

export default function Reply({ replies }: Replyprops) {
    if (!replies) {
        return <p>Not Comment</p>
    }

    return (
        <div>
            {replies.map(reply => (
                <div key={reply.replyId}>
                    <p>{reply.username}</p>
                    <p>{reply.content}</p>
                    <p>{reply.createdAt}</p>
                </div>
            ))}
        </div>
    );
}