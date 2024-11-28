"use client";
import { Post } from "@/types/post";
import { getSearchPosts } from "@/utils/dendaitech/Post/GET/PostGET";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { SearchForm } from "./components/SearchForm";
import { SearchResults } from "./components/SearchResults";
import { useSearchOptions } from "./hooks/useSearchOptions";
import { isPostResponse } from "./utils/searchUtils";
import Header from "@/components/elements/Header/Header";

export default function SearchPage() {
  //コンポーネントのマウント状態を記録
  const [isClient, setIsClient] = useState(false);

  //カスタムフック, ドロップダウンの状態を保持
  const searchOptions = useSearchOptions();

  //投稿の検索した結果を保持、ページネーション関連も保持
  const [searchResults, setSearchResults] = useState<{
    content: Post[];
    totalPages: number;
    number: number;
    size: number;
  }>(() => {
    if (typeof window !== "undefined") {
      const savedResults = localStorage.getItem("searchResults");
      return savedResults
        ? JSON.parse(savedResults)
        : { content: [], totalPages: 0, number: 0, size: 10 };
    }
    return { content: [], totalPages: 0, number: 0, size: 10 };
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasInitialSearched, setHasInitialSearched] = useState(false);
  const [prevSearchConditions, setPrevSearchConditions] = useState({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  //検索結果が変わるごとに保管する
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("searchResults", JSON.stringify(searchResults));
    }
  }, [isClient, searchResults]);

  const handleSearch = useCallback(
    async (e: FormEvent<HTMLFormElement> | Event, page: number = 0) => {
      e.preventDefault(); //ページのリロード(再レンダリング)を防止
      if (isLoading) return;

      const currentSearchConditions = {
        searchText: searchOptions.searchText,
        year: searchOptions.yearChecked ? searchOptions.year : undefined,
        grade: searchOptions.gradeChecked ? searchOptions.grade : undefined,
        department: searchOptions.departmentChecked
          ? searchOptions.department
          : undefined,
        semester: searchOptions.semesterChecked
          ? searchOptions.semester
          : undefined,
        page,
      };

      if (
        JSON.stringify(currentSearchConditions) ===
        JSON.stringify(prevSearchConditions)
      ) {
        return;
      }

      setPrevSearchConditions(currentSearchConditions);

      setIsLoading(true);
      setHasSearched(true);
      setError(null);
      try {
        const results = await getSearchPosts(
          searchOptions.searchText || undefined,
          searchOptions.yearChecked ? parseInt(searchOptions.year) : undefined,
          searchOptions.gradeChecked
            ? parseInt(searchOptions.grade)
            : undefined,
          searchOptions.departmentChecked
            ? searchOptions.department
            : undefined,
          searchOptions.semesterChecked ? searchOptions.semester : undefined,
          page,
          10
        );
        if (isPostResponse(results)) {
          setSearchResults({
            content: results.content || [],
            totalPages: results.totalPages || 0,
            number: results.number || 0,
            size: results.size || 10,
          });
          const searchParams = new URLSearchParams(window.location.search);
          searchParams.set("q", searchOptions.searchText || "");
          searchParams.set("page", page.toString());
          window.history.pushState(
            {},
            "",
            `${window.location.pathname}?${searchParams}`
          );
        } else {
          throw new Error(results);
        }
      } catch (error) {
        console.error("検索中にエラーが発生しました:", error);
        if (error instanceof Error) {
          setError(`検索中にエラーが発生しました: ${error.message}`);
        } else {
          setError(
            "検索中に予期せぬエラーが発生しました。もう一度お試しください。"
          );
        }
        setSearchResults({ content: [], totalPages: 0, number: 0, size: 10 });
      } finally {
        setIsLoading(false);
      }
    },
    [searchOptions, prevSearchConditions]
  );

  const setInitialSearchFromQuery = useCallback(() => {
    if (!isClient || hasInitialSearched) return;
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get("q");
    if (query) {
      searchOptions.setSearchText(query);
      handleSearch(
        new Event("submit") as unknown as FormEvent<HTMLFormElement>
      );
      setHasInitialSearched(true);
    }
  }, [isClient, hasInitialSearched, searchOptions, handleSearch]);

  useEffect(() => {
    setInitialSearchFromQuery();
  }, [setInitialSearchFromQuery]);

  const handlePageChange = useCallback(
    (page: number) => {
      handleSearch(new Event("submit"), page);
    },
    [handleSearch]
  );

  const memoizedSearchForm = useMemo(
    () => (
      <SearchForm
        searchOptions={searchOptions}
        handleSearch={handleSearch}
        handleClear={searchOptions.handleClear}
        isLoading={isLoading}
      />
    ),
    [searchOptions, handleSearch, isLoading]
  );

  const memoizedSearchResults = useMemo(
    () =>
      hasSearched ? (
        <SearchResults
          results={searchResults}
          onPageChange={handlePageChange}
        />
      ) : null,
    [hasSearched, searchResults, handlePageChange]
  );

  if (!isClient) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <Header />
      <div className="bg-slate-200 min-h-screen">
        <div className="space-y-2 p-8 max-w-4xl mx-auto">
          {memoizedSearchForm}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {isLoading ? (
            <div className="text-center mt-4" aria-label="読み込み中">
              読み込み中...
            </div>
          ) : (
            memoizedSearchResults
          )}
        </div>
      </div>
    </div>
  );
}
