import React from "react";
import PostCard from "@/components/elements/Card/PostCard/PostCard";
import { Post } from "@/types/post";
import { Pagination } from "./Pagenation";

interface SearchResultsProps {
  results: {
    content: Post[];
    totalPages: number;
    number: number;
    size: number;
  };
  onPageChange: (page: number) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, onPageChange }) => {
  if (!results || !results.content || results.content.length === 0) {
    return <div className="text-center mt-4">検索結果がありません。</div>;
  }

  return (
    <div className="bg-slate-200">
      <div className="space-y-4 p-8 max-w-4xl mx-auto">
        {results.content.map((post) => (
          <div key={post.postId}>
            <PostCard post={post} />
          </div>
        ))}
        <Pagination
          currentPage={results.number}
          totalPages={results.totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

