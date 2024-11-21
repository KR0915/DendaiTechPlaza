'use client';
import { postReply } from "@/types/post";
import { convertUTCtoJST } from "@/utils/timeFormatter/timeFormatter";
import AvatarPost from "./avatar";

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
        <div key={reply.commentId}>
          <div className="flex gap-2">
            <div className="grow-0 pt-2">
              <AvatarPost src={`/user/icons/${reply.userId}.webp`} alt={reply.username} fallback={reply.username} size="sm" />
            </div>
            <div className="flex flex-col grow pt-2">
              <div className="flex items-center">
                <h2 className="text-base font-bold">{`${reply.username}`}</h2>
                <p className="ml-2 my-auto text-xs text-slate-600">{convertUTCtoJST(reply.createdAt)}</p>
              </div>
              <div>
                <p>{reply.content}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}