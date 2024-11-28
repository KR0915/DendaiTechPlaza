import SubmitButton from "@/components/elements/Buttons/SubmitButton/SubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FormEvent } from "react";
import { CheckboxSelect } from "../components/CheckboxSelect";
import { SearchOptionsReturn } from "../hooks/useSearchOptions";
import {
  departmentOptions,
  gradeOptions,
  semesterOptions,
  yearOptions,
} from "../utils/searchUtils";

interface SearchFormProps {
  searchOptions: SearchOptionsReturn;
  handleSearch: (
    e: FormEvent<HTMLFormElement> | Event,
    page?: number
  ) => Promise<void>;
  handleClear: () => void;
  isLoading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  searchOptions,
  handleSearch,
  handleClear,
  isLoading,
}) => {
  const {
    searchText,
    setSearchText,
    year,
    setYear,
    department,
    setDepartment,
    grade,
    setGrade,
    semester,
    setSemester,
    yearChecked,
    setYearChecked,
    departmentChecked,
    setDepartmentChecked,
    gradeChecked,
    setGradeChecked,
    semesterChecked,
    setSemesterChecked,
  } = searchOptions;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); //検索時、ページのリロード(再レンダリング)を防止
        handleSearch(e);
      }}
    >
      <div className="space-y-2">
        <div className="bg-white rounded-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="キーワード or 投稿ID"
            className="pl-10 w-full"
            onChange={(e) => setSearchText(e.target.value)} //入力された文字列をセット
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); //検索時、ページのリロード(再レンダリング)を防止
                handleSearch(
                  new Event("submit") as unknown as FormEvent<HTMLFormElement>
                );//Enterを押しても「検索」ボタンを押したときと同じ動作をする
              }
            }}
            value={searchText}
            aria-label="検索キーワードまたは投稿ID"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <CheckboxSelect
                label="年度"
                value={year}
                onValueChange={setYear}
                checked={yearChecked}
                onCheckedChange={setYearChecked}
                options={yearOptions}
              />
              <CheckboxSelect
                label="学科"
                value={department}
                onValueChange={setDepartment}
                checked={departmentChecked}
                onCheckedChange={setDepartmentChecked}
                options={departmentOptions}
              />
              <CheckboxSelect
                label="学年"
                value={grade}
                onValueChange={setGrade}
                checked={gradeChecked}
                onCheckedChange={setGradeChecked}
                options={gradeOptions}
              />
              <CheckboxSelect
                label="開講時期"
                value={semester}
                onValueChange={setSemester}
                checked={semesterChecked}
                onCheckedChange={setSemesterChecked}
                options={semesterOptions}
              />
            </div>
            <div className="mt-2 md:ml-auto md:self-end">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault(); //検索時、ページのリロード(再レンダリング)
                  handleClear(); //チェックを外す
                }}
                className="bg-white"
                aria-label="入力をクリア"
              >
                入力をクリア
              </Button>
            </div>
          </div>
          <SubmitButton
            preText="検索"
            postText="検索中..."
            width="w-full"
            disabled={isLoading}
          />
        </div>
      </div>
    </form>
  );
};
