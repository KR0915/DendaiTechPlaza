import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

//ページネーションの配列を返す  //現在のページが5の場合
//[0, "....", 2, 4, 6, 7, 8, "...", 14]
//ただし、上記はプログラムのインデックスであり下記のような見た目になる(ようは+1加算されて表示される)
//[1, "...", 3, 4, 5, 6, 7, "..."]
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis: boolean = totalPages > 7; //取得した情報のページが7より大きいならばTrue

    if (!showEllipsis) {
      //7ページ未満なら、TotalPagesの数までの配列を作成してreturnする(例：[1,2,3])
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    pages.push(0); //ボタンの左端を生成

    //現在のページの前後2つ前の番号を代入
    const start = Math.max(1, currentPage - 2); //ただし、2未満にならない
    const end = Math.min(totalPages - 2, currentPage + 2); //ただし、最大ページ数の2つ前を超えない

    //現在のページが5以上になるときから...の省略を使う(現在のページの前後2つのボタンは表示)
    //ただし、プログラムのインデックスは4
    if (start > 1) {
      pages.push("...");
    }

    //現在のページの前後の数字を配列に入れる
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    //
    if (end < totalPages - 2) {
      pages.push("...");
    }

    //ボタンの右端
    pages.push(totalPages - 1);

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* 「<」このようなボタンの表示 */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* 数字のページネーションボタンの作成 */}
      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <Button
            key={index}
            variant={currentPage === page ? "default" : "outline"}
            className={cn(
              "min-w-[40px]",
              currentPage === page &&
                "bg-DendaiTechBlue text-primary-foreground hover:bg-primary/90"
            )}
            onClick={() => onPageChange(page)}
          >
            {page + 1}
          </Button>
        ) : (
          <span key={index} className="px-2">
            {page}
          </span>
        )
      )}

      {/* 「>」このようなボタンの作成 */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
