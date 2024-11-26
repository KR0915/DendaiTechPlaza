"use client";

// export default function SearchPage() {
//   const searchOptions = useSearchOptions();
//   const [searchResults, setSearchResults] = useState<{
//     content: Post[];
//     totalPages: number;
//     number: number;
//     size: number;
//   }>({ content: [], totalPages: 0, number: 0, size: 10 });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [hasSearched, setHasSearched] = useState(false);

//   const handleSearch = useCallback(async (e: FormEvent<HTMLFormElement> | Event, page: number = 0) => {
//     if (e instanceof Event) {
//       e.preventDefault();
//     }
//     setIsLoading(true);
//     setHasSearched(true);
//     setError(null);
//     try {
//       const results = await getSearchPosts(
//         searchOptions.searchText || undefined,
//         searchOptions.yearChecked ? parseInt(searchOptions.year) : undefined,
//         searchOptions.gradeChecked ? parseInt(searchOptions.grade) : undefined,
//         searchOptions.departmentChecked ? searchOptions.department : undefined,
//         searchOptions.semesterChecked ? searchOptions.semester : undefined,
//         page,
//         10
//       );
//       if (isPostResponse(results)) {
//         setSearchResults({
//           content: results.content || [],
//           totalPages: results.totalPages || 0,
//           number: results.number || 0,
//           size: results.size || 10,
//         });
//         if (typeof window !== 'undefined') {
//           const searchParams = new URLSearchParams(window.location.search);
//           searchParams.set('q', searchOptions.searchText || '');
//           searchParams.set('page', page.toString());
//           window.history.pushState({}, '', `${window.location.pathname}?${searchParams}`);
//         }
//       } else {
//         throw new Error(results);
//       }
//     } catch (error) {
//       console.error("検索中にエラーが発生しました:", error);
//       if (error instanceof Error) {
//         setError(`検索中にエラーが発生しました: ${error.message}`);
//       } else {
//         setError("検索中に予期せぬエラーが発生しました。もう一度お試しください。");
//       }
//       setSearchResults({ content: [], totalPages: 0, number: 0, size: 10 });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [searchOptions]);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const searchParams = new URLSearchParams(window.location.search);
//       const query = searchParams.get('q');
//       if (query) {
//         searchOptions.setSearchText(query);
//         handleSearch(new Event('submit') as unknown as FormEvent<HTMLFormElement>);
//       }
//     }
//   }, [handleSearch, searchOptions]);

//   useEffect(() => {
//     const savedResults = localStorage.getItem('searchResults');
//     if (savedResults) {
//       setSearchResults(JSON.parse(savedResults));
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('searchResults', JSON.stringify(searchResults));
//     }
//   }, [searchResults]);

//   const handlePageChange = (page: number) => {
//     handleSearch(new Event('submit'), page);
//   };

//   return (
//     <div className="bg-slate-200 min-h-screen">
//       <div className="space-y-2 p-8 max-w-4xl mx-auto">
//         <SearchForm
//           searchOptions={searchOptions}
//           handleSearch={handleSearch}
//           handleClear={searchOptions.handleClear}
//           isLoading={isLoading}
//         />
//         {error && (
//           <div
//             className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//             role="alert"
//           >
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}
//         {isLoading ? (
//           <div className="text-center mt-4" aria-label="読み込み中">
//             読み込み中...
//           </div>
//         ) : hasSearched ? (
//           <SearchResults results={searchResults} onPageChange={handlePageChange} />
//         ) : null}
//       </div>
//     </div>
//   );
// }

export default function Hoge(){
  return(<p>koke</p>);
}