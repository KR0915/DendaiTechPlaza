import React, { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/elements/Buttons/SubmitButton/SubmitButton";
import { CheckboxSelect } from "../components/CheckboxSelect";
import { yearOptions, departmentOptions, gradeOptions, semesterOptions } from "../utils/searchUtils";
import { SearchOptionsReturn } from "../hooks/useSearchOptions";

interface SearchFormProps {
  searchOptions: SearchOptionsReturn;
  handleSearch: (e: FormEvent<HTMLFormElement> | Event, page?: number) => Promise<void>;
  handleClear: () => void;
  isLoading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = React.memo(({
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
    handleClear: _, // avoid naming conflict
  } = searchOptions;

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSearch(e);
    }} aria-label="検索フォーム">
      <div className="space-y-2">
        <div className="bg-white rounded-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="キーワード or 投稿ID"
            className="pl-10 w-full"
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch(new Event('submit') as unknown as FormEvent<HTMLFormElement>);
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
                  e.preventDefault();
                  handleClear();
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
});

SearchForm.displayName = "SearchForm";