"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { CheckboxSelect } from "./components/checkboxSelect";
import { useCheckboxOption } from "./components/useCheckboxOption";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/elements/Buttons/SubmitButton/SubmitButton";

export default function search() {
  const {
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
    handleClear,
    yearOptions,
    departmentOptions,
    gradeOptions,
    semesterOptions,
  } = useCheckboxOption();

  return (
    <div className="bg-slate-200 min-h-screen">
      <div className="space-y-2 p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="キーワード or 投稿ID" className="pl-10 w-full" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <CheckboxSelect
                label={"年度"}
                value={year}
                onValueChange={setYear}
                checked={yearChecked}
                onCheckedChange={setYearChecked}
                options={yearOptions}
              />
              <CheckboxSelect
                label={"学科"}
                value={department}
                onValueChange={setDepartment}
                checked={departmentChecked}
                onCheckedChange={setDepartmentChecked}
                options={departmentOptions}
              />
              <CheckboxSelect
                label={"学年"}
                value={grade}
                onValueChange={setGrade}
                checked={gradeChecked}
                onCheckedChange={setGradeChecked}
                options={gradeOptions}
              />
              <CheckboxSelect
                label={"開講時期"}
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
                onClick={handleClear}
                className="bg-white"
              >
                入力をクリア
              </Button>
            </div>
          </div>
          <SubmitButton
            preText={"検索"}
            postText={"検索中..."}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
}
