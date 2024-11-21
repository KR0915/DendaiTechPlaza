'use client';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { CommentPage } from "@/types/post";
import { addComment } from "@/utils/dendaitech/Post/POST/PostPOST";
import { convertUTCtoJST } from "@/utils/timeFormatter/timeFormatter";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import AvatarPost from "./avatar";
import Reply from "./reply";

interface Commentsprops {
    commnents: CommentPage | undefined;
    postId: number;
}

export default function Comments({ commnents, postId }: Commentsprops) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [newComment, setNewComment] = useState("");
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<Error | string>();
    const { data: session, status } = useSession();

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (newComment.trim() === "") return;
        try {
            const result = await addComment(
                postId,
                `${newComment}`
            );
            if (result === true) {
                console.log("メッセージが正常に追加されました。")
                setNewComment("");
                setIsInputFocused(false);
                setErrorMessage("");
            }
        } catch (error) {
           if (error instanceof Error) {
            setErrorMessage(error);
           }
        }
    }
    if (!commnents) {
        return <p>Not Comment</p>
    }

    return (
        <div className="space-y-4">
            {(session && status === "authenticated")
                ?
                <form onSubmit={handleCommentSubmit} className="space-y-4 mt-2">
                    <div className="flex items-start gap-2">
                        <AvatarPost src={`/user/icons/${session?.user.id}.webp`} alt={`${session.user.name}`} fallback={`${session.user.name}`} size="md" />
                        <div className="flex flex-col flex-grow">
                            <Input
                                type="text"
                                placeholder="コメントする..."
                                value={newComment}
                                onFocus={() => setIsInputFocused(true)}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="flex-grow"
                            />
                            {isInputFocused &&
                                <div className="mt-2 ml-auto">
                                    <Button variant={"outline"} onClick={() => setIsInputFocused(false)}>キャンセル</Button>
                                    <Button type="submit" className="ml-2" disabled={newComment.trim() === ""}>コメント</Button>
                                </div>
                            }
                            <div className="text-red-500">
                                {errorMessage && `${errorMessage}`}
                            </div>
                        </div>
                    </div>
                </form>

                :
                <div>
                    none
                </div>//TODO セッションが無い時の表示
            }


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