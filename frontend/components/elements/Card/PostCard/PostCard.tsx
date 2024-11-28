'use client';
import Image from "@/node_modules/next/image";
import { Post } from "@/types/post";
import { convertUTCtoJST } from "@/utils/timeFormatter/timeFormatter";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import BookmarkButton from "../../Buttons/BookmarkButton/BookmarkButton";

interface PostCardProps {
  post: Post;
  bookmarkStatus?: Map<number, boolean>;
  bookmarkCount?: Map<number, number>;
  OnClickBookmarkButton?: (postId: number, type: string) => void;
}


export default function PostCards({ post, bookmarkStatus, bookmarkCount, OnClickBookmarkButton }: PostCardProps) {
  const pathname = usePathname();
  return (
    <div
      key={post.postId}
      className="my-2 grid grid-cols-[auto,1fr] gap-6 border rounded-lg shadow-xl bg-white hover:opacity-80 min-w-[300px]"
    >
      <div className="flex flex-col items-center">
        <div className="relative w-14 h-14 p-2">
          <Image
            src={`/api/get-icon?id=${post.userId}`}
            alt="アバター"
            fill
            sizes="56px"
            style={{
              objectFit: "contain",
              padding: "2px",
            }}
            className="rounded-full"
          />
        </div>
        <div className="flex items-center">
          <div>
            {pathname === "/"
              ? <BookmarkButton postId={post.postId} State={bookmarkStatus && bookmarkStatus.get(post.postId) || false} OnClickBookmarkButton={OnClickBookmarkButton} />
              : <BookmarkButton postId={post.postId} State={false} />
            }
          </div>
          <div className="text-DendaiTechBlue">
            <Suspense fallback={post.likesCount}>
              {bookmarkCount ? bookmarkCount.get(post.postId) : post.likesCount}
            </Suspense>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2 py-2">
        <Link href={`/post/${post.postId}`}>
          <h3 className="text-lg font-bold">{post.title}</h3>
          <p className="text-sm">{post.description}</p>
        </Link>
        <div className="flex flex-wrap gap-2">
          <Link href={"/search"}>
            <div className="bg-zinc-400 px-2 py-1 text-xs font-medium text-white rounded hover:bg-zinc-500">
              {post.year}
            </div>
          </Link>
          <Link href={"/search"}>
            <div className="bg-zinc-400 px-2 py-1 text-xs font-medium text-white rounded hover:bg-zinc-500">
              {post.departmentName}
            </div>
          </Link>
          <Link href={"/search"}>
            <div className="bg-zinc-400 px-2 py-1 text-xs font-medium text-white rounded hover:bg-zinc-500">
              {post.grade}
            </div>
          </Link>
          <Link href={"/search"}>
            <div className="bg-zinc-400 px-2 py-1 text-xs font-medium text-white rounded hover:bg-zinc-500">
              {post.semester}
            </div>
          </Link>
          <Link href={"/search"}>
            <div className="bg-zinc-400 px-2 py-1 text-xs font-medium text-white rounded hover:bg-zinc-500">
              {post.username}
            </div>
          </Link>
          <div className="ml-auto pr-2  text-sm text-gray-500 self-end">
            {convertUTCtoJST(post.updatedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
