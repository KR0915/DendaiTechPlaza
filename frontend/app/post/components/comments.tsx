'use client';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import { CommentPage } from "@/types/post";
import { convertUTCtoJST } from "@/utils/timeFormatter/timeFormatter";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import AvatarPost from "./avatar";
import Reply from "./reply";

interface Commentsprops {
    commnents: CommentPage | undefined;
}

export default function Comments({ commnents }: Commentsprops) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [newComment, setNewComment] = useState("");
    const { data: session, status } = useSession();
    
    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement comment submission logic
        console.log("Submitting comment:", newComment)
        setNewComment("")
    }
    if (!commnents) {
        return <p>Not Comment</p>
    }

    return (
        <div className="space-y-4">
            <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div className="flex items-start gap-2">
                    <AvatarPost src={`/user/icons/${session?.user.id}.webp`} alt={session?.user.name} fallback={username} size="md" />
                    <Textarea
                        placeholder="コメントを入力..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-grow min-h-[100px]"
                    />
                </div>
                <Button type="submit" className="ml-auto">コメントする</Button>
            </form>
            
            {commnents.content.map(comment => (
                <div key={comment.commentId}>
                    <div className="flex gap-2">
                        <div className="grow-0 pt-2">
                            <AvatarPost src={`/user/icons/${comment.userId}.webp`} alt={comment.username} fallback={comment.username} size="md" />
                        </div>
                        <div className="flex flex-col grow pt-2">
                            <div className="flex items-center">
                                <h2 className="text-base font-bold">{`${comment.username}`}</h2>
                                <p className="ml-2 my-auto text-xs text-slate-600">{convertUTCtoJST(comment.createdAt)}</p>
                            </div>
                            <div>
                                <p>{comment.content}</p>
                                <div>
                                    {comment.replies.length !== 0 &&
                                        <Collapsible
                                            open={isOpen}
                                            onOpenChange={setIsOpen}
                                        >
                                            <CollapsibleTrigger asChild>
                                                <Button variant="ghost">
                                                    {isOpen
                                                        ? <ChevronUp className="h-4 w-4" />
                                                        : <ChevronDown className="h-4 w-4" />
                                                    }
                                                    <span className="sr-only">Toggle</span>
                                                    {`${comment.replies.length}件の返信`}
                                                </Button>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="ml-2">
                                                <Reply replies={comment.replies} />
                                            </CollapsibleContent>
                                        </Collapsible>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}