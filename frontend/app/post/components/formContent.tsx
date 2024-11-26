'use client';

import SubmitButton from "@/components/elements/Buttons/SubmitButton/SubmitButton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { addComment, addReply } from "@/utils/dendaitech/Post/POST/PostPOST";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AvatarPost from "./avatar";

interface FormContentProps {
    type: "comment" | "reply";
    contentId: number;
    onContentAdded?: () => void;
}

export default function FormContent({ type, contentId, onContentAdded }: FormContentProps) {
    const [newContent, setNewContent] = useState("");
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<Error | string>();
    const router = useRouter();
    const [isPress, setIsPress] = useState<boolean>(false);
    const { data: session, status } = useSession();
    const { toast } = useToast();


    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (newContent.trim() === "") return;
        setIsPress(true);
        try {
            if (type === "comment") {
                const result = await addComment(
                    contentId,
                    newContent
                );
                if (result === true) {
                    setNewContent("");
                    setIsInputFocused(false);
                    setErrorMessage("");
                    router.refresh();
                    if (onContentAdded) {
                        console.log("kiteruyo")
                        onContentAdded();
                    }
                    toast({
                        title: "コメント追加成功",
                        description: "コメントの追加に成功しました",
                    });
                }
            } else if (type === "reply") {
                const result = await addReply(
                    contentId,
                    newContent
                );
                if (result === true) {
                    setNewContent("");
                    setIsInputFocused(false);
                    setErrorMessage("");
                    router.refresh();
                    if (onContentAdded) {
                        onContentAdded();
                    }
                    toast({
                        title: "返信追加成功",
                        description: "返信の追加に成功しました",
                    });
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error);
            }
        } finally {
            setIsPress(false);
        }
    }


    return (
        <div>

            {(session && status === "authenticated")
                ?
                <form onSubmit={handleCommentSubmit} className="space-y-4 mt-2">
                    <div className="flex items-start gap-2">
                        {type === "comment"
                            ? <AvatarPost src={`/api/get-icon?id=${session?.user.id}`}  alt={`${session.user.name}`} fallback={`${session.user.name}`} size="md" />
                            : <AvatarPost src={`/api/get-icon?id=${session?.user.id}`}  alt={`${session.user.name}`} fallback={`${session.user.name}`} size="sm" />
                        }
                        <div className="flex flex-col flex-grow">
                            <Textarea
                                placeholder={type === "comment" ? "コメントする・・・" : "返信する・・・"}
                                value={newContent}
                                onFocus={() => setIsInputFocused(true)}
                                onChange={(e) => setNewContent(e.target.value)}
                                className="flex-grow"
                            />
                            {(isInputFocused) &&
                                <div className="mt-2 ml-auto flex">
                                    <Button variant={"outline"} onClick={() => setIsInputFocused(false)}>キャンセル</Button>
                                    <div className="ml-2">
                                        <SubmitButton disabled={isPress} preText={"コメント"} postText={"コメント送信中..."} />
                                    </div>
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
        </div>
    );
}