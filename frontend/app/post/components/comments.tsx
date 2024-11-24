'use client';
import { CommentPage, postComment } from "@/types/post";
import { getPostById } from "@/utils/dendaitech/Post/GET/PostGET";
import { convertUTCtoJST } from "@/utils/timeFormatter/timeFormatter";
import { Loader2 } from 'lucide-react';
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
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
    const [contents, setContents] = useState<postComment[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isAddContent, setIsAddContent] = useState<boolean>(false);
    const [totalElements, setTotalElements] = useState<number>(comments?.totalElements || 0);

    const updateComments = useCallback(async () => {
        // TODO　コメントが１０件を超えないとリアルタイムで変化しない困った
        const response = await getPostById(String(postId), 0, Math.max(contents.length, 10), 0, 100);

        if (!response || !response.comments) {
            return;
        }

        const newComments = response.comments.content;
        const updatedContents = newComments.map(newComment => {
            const existingComment = contents.find(c => c.commentId === newComment.commentId);
            if (existingComment) {
                const mergedReplies = [
                    ...(existingComment.replies || []),
                    ...(newComment.replies || []).filter(newReply =>
                        !(existingComment.replies || []).some(existingReply =>
                            existingReply.replyId === newReply.replyId
                        )
                    )
                ];
                return { ...newComment, replies: mergedReplies };
            }
            return newComment;
        });

        setContents(updatedContents);
        setTotalElements(response.comments.totalElements);
        setCurrentPage(1);
    }, [postId, contents]);

    useEffect(() => {
        if (isAddContent) {
            updateComments();
            setIsAddContent(false);
        }
    }, [isAddContent, updateComments]);

    const loadMore = async () => {
        if (contents.length >= totalElements) {
            setHasMore(false);
            return;
        }
        const response = await getPostById(String(postId), currentPage, 10, 0, 100);

        if (!response || !response.comments || response.comments.empty) {
            setHasMore(false);
            return;
        }

        const newComments = response.comments.content.filter(
            newComment => !contents.some(existingComment => existingComment.commentId === newComment.commentId)
        );

        setContents(prevContents => [...prevContents, ...newComments]);
        setCurrentPage(prevPage => prevPage + 1);
        setTotalElements(response.comments.totalElements);
    }

    const handleContentAdded = () => {
        setIsAddContent(true);
        setHasMore(true);
    };

    const handleContentDeleted = useCallback(() => {
        updateComments();
    }, [updateComments]);

    const loader = <div className="mt-2" key={0}><Loader2 /></div>;

    if (!comments) {
        return null;
    }

    return (
        <div className="space-y-4">
            <FormContent
                type={"comment"}
                contentId={postId}
                onContentAdded={handleContentAdded} />

            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={loader}
                threshold={1000}>
                {contents.map(comment => (
                    <div key={`comment_${comment.commentId}`}>
                        <div className="flex gap-2">
                            <div className="grow-0 pt-2">
                                <AvatarPost src={`/user/icons/${comment.userId}.webp`} alt={comment.username} fallback={comment.username} size="md" />
                            </div>
                            <div className="flex flex-col grow pt-2">
                                <div className="flex items-center">
                                    <h2 className="text-base font-bold">{`${comment.username}`}</h2>
                                    <p className="ml-2 my-auto text-xs text-slate-600">{convertUTCtoJST(comment.createdAt)}</p>
                                    <div className="ml-auto">
                                        <DeleteContentEllipsisVertical
                                            type={"comment"}
                                            contentId={comment.commentId}
                                            userId={String(comment.userId)}
                                            onContentDeleted={handleContentDeleted}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="text">{`${comment.content}`}</p>
                                    <div>
                                        <Reply replies={comment.replies} commentId={comment.commentId} onContentAdded={handleContentAdded} onContentDeleted={handleContentDeleted} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}