'use client';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CommentPage } from "@/types/post";
import { ChevronsUpDown } from "lucide-react";
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
                        {comment.replies.length !==0 &&
                            <Collapsible>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost">
                                        <ChevronsUpDown className="h-4 w-4" />
                                        <span className="sr-only">Toggle</span>
                                        {`${comment.replies.length}件の返信`}
                                    </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <Reply replies={comment.replies} />
                                </CollapsibleContent>
                            </Collapsible>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
}