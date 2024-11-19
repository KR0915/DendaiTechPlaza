'use client';
import StarButton from "@/components/elements/Buttons/BookmarkButton/StarButton";
import { Button } from "@/components/ui/button";
import { deleteBookmark } from "@/utils/dendaitech/Post/DELETE/PostDELTE";
import { getIsBookmark } from "@/utils/dendaitech/Post/GET/PostGET";
import { addBookmark } from "@/utils/dendaitech/Post/POST/PostPOST";
import { useEffect, useState } from "react";

interface bookmarkCountButtonProps {
    count: number;
    postId: number;
}

export default function BookmarkCountButton({ count, postId }: bookmarkCountButtonProps) {
    const [bookmarkCount, setBookmarkCount] = useState<number>(count);
    const [isBookmark, setIsBookmark] = useState<boolean>(false);
    useEffect(() => {
        const fetchBookmarkStatus = async () => {
            try {
                const isPreBookmark = await getIsBookmark(postId);
                setIsBookmark(isPreBookmark);
            } catch (error) {
                console.error('Error fetching bookmark status:', error);
            }
        };

        fetchBookmarkStatus();
    }, [postId])

    // TODO 表示に難あり　解決する
    const pushBookmark = async () => {
        if (isBookmark == false) {
            await addBookmark(postId);
            setBookmarkCount((prevCount) => prevCount + 1);
            console.log(bookmarkCount)
        } else {
            await deleteBookmark(postId);
            setBookmarkCount((prevCount) => prevCount - 1);
        }
        setIsBookmark(!isBookmark)
    }


    return (
        <Button variant="outline" className="flex gap-2"  onClick={pushBookmark}>
            <StarButton isBookmark={isBookmark} color="DendaiTechBlue" />
            <span className="sr-only">ブックマーク</span>
            {isBookmark
            ?<div className="font-bold text-DendaiTechBlue">{count}</div>
            :<div className="text-black">{bookmarkCount}</div>
            }
        </Button>
    );
}