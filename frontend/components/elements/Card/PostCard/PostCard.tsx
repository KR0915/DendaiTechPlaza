'use client';
import Image from "@/node_modules/next/image";
import { Post } from "@/types/post";
import { convertUTCtoJST } from "@/utils/timeFormatter/timeFormatter";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BookmarkButton from "../../Buttons/BookmarkButton/BookmarkButton";
import BookmarkButtonWithCountFlat from "../../Buttons/BookmarkButton/BookmarkButtonWithCountFlat";

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
      className="my-2 border rounded-lg shadow-xl bg-white min-w-[300px] relative group"
    >

      <Link
        href={`/post/${post.postId}`}
        className="absolute inset-0 z-10"
      />
      <div className="relative transition-all duration-300 ease-in-out group-hover:bg-slate-800/10 flex">
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
            <div className="relative z-20">
              {pathname === "/"
                ? <BookmarkButton postId={post.postId} State={bookmarkStatus && bookmarkStatus.get(post.postId) || false} OnClickBookmarkButton={OnClickBookmarkButton} />
                : <BookmarkButtonWithCountFlat count={post.likesCount} postId={post.postId} />
              }
            </div>
            <div className="text-DendaiTechBlue">
              {bookmarkCount && bookmarkCount.get(post.postId)}
            </div>
          </div>
        </div>

        <div className="flex flex-grow flex-col space-y-2 py-2">
          <h3 className="text-lg font-bold">{post.title}</h3>
          <p className="text-sm">{post.description}</p>
          <div className="flex flex-wrap gap-2">
            <div className="bg-zinc-400 px-2 py-1 text-xs font-medium text-white rounded">
              {post.year}
            </div>
            <div className="bg-zinc-400 px-2 py-1 text-xs font-medium text-white rounded">
              {post.departmentName}
            </div>
            <div className="bg-zinc-400 px-2 py-1 text-xs font-medium text-white rounded">
              {post.grade}
            </div>
            <div className="bg-zinc-400 px-2 py-1 text-xs font-medium text-white rounded">
              {post.semester}
            </div>
            <div className="ml-auto pr-2  text-sm text-gray-500 self-end">
              {convertUTCtoJST(post.updatedAt)}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
