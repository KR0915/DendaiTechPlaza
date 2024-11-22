'use client';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { postReply } from "@/types/post";
import { convertUTCtoJST } from "@/utils/timeFormatter/timeFormatter";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import AvatarPost from "./avatar";
import FormContent from "./formContent";

interface Replyprops {
    commentId: number;
    replies: postReply[] | undefined;
}

export default function Reply({ commentId, replies }: Replyprops) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isReply, setIsReply] = useState<boolean>(false);

    if (!replies) {
        return <p>Not Comment</p>
    }

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <div className="mt-1 flex items-center">
                <CollapsibleTrigger asChild>
                    <Button variant="ghost">
                        {isOpen
                            ? <ChevronUp className="h-4 w-4" />
                            : <ChevronDown className="h-4 w-4" />
                        }
                        <span className="sr-only">Toggle</span>
                        {`${replies.length}件の返信`}
                    </Button>
                </CollapsibleTrigger>
                <Button onClick={() => setIsReply((prevOpen) => !prevOpen)} variant="ghost">
                    返信
                </Button>
            </div>
            {isReply &&
                <FormContent type={"reply"} contentId={commentId} />
            }
            <CollapsibleContent className="ml-2">
                {replies.map(reply => (
                    <div key={reply.replyId}>
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
            </CollapsibleContent>
        </Collapsible >
    );
}