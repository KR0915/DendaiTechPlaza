"use client";
import Image from "@/node_modules/next/image";
import { convertUTCtoJST } from "@/utils/timeFormatter/timeFormatter";
import BookmarkButton from "../Buttons/BookmarkButton/BookmarkButton";
import { Post } from "@/types/post";

interface PostCardProps{
    post:Post
}

export default function PostCard({post}:PostCardProps) {


  return(
    <div
      key={post.postId}
      className="grid grid-cols-[auto,1fr] gap-6 border rounded-lg shadow-sm bg-white"
    >
      <div className="flex flex-col items-center">
        <div className="relative w-14 h-14 p-2">
          <Image
            src="/user/icons/1.webp"
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
          <span className="text-dendaitechBlue">
            <BookmarkButton postId={post.postId} />
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-2 py-2">
        <h3 className="text-lg font-bold">{post.title}</h3>
        <p className="text-sm">{post.description}</p>
        <div className="flex flex-wrap gap-2">
          <p className="bg-zinc-400 px-2 py-1 text-xs font-medium text-white rounded">
            {post.year}
          </p>
          <p className="bg-zinc-400 px-2 py-1 text-xs font-medium text-white rounded">
            {post.departmentName}
          </p>
          <p className="bg-zinc-400 px-2 py-1 text-xs font-medium text-white rounded">
            {post.grade}
          </p>
          <p className="bg-zinc-400 px-2 py-1 text-xs font-medium text-white rounded">
            {post.semester}
          </p>
          <p className="bg-zinc-400 px-2 py-1 text-xs font-medium text-white rounded">
            {post.username}
          </p>
          <div className="ml-auto pr-2  text-sm text-gray-500 self-end">
            {convertUTCtoJST(post.updatedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
