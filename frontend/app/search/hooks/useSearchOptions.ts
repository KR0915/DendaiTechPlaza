import { useState, useCallback, useEffect } from "react";

//searchUtilsで宣言してある検索条件の変数を保持する型
//ユーザの入力(searchText), チェックボックス選択解除(handleClear)も合わせて宣言
export type SearchOptionsReturn = {
  year: string;
  setYear: (value: string) => void;
  department: string;
  setDepartment: (value: string) => void;
  grade: string;
  setGrade: (value: string) => void;
  semester: string;
  setSemester: (value: string) => void;
  yearChecked: boolean;
  setYearChecked: (checked: boolean) => void;
  departmentChecked: boolean;
  setDepartmentChecked: (checked: boolean) => void;
  gradeChecked: boolean;
  setGradeChecked: (checked: boolean) => void;
  semesterChecked: boolean;
  setSemesterChecked: (checked: boolean) => void;
  searchText: string;
  setSearchText: (value: string) => void;
  handleClear: () => void;
};

//プルダウンの状態管理
export const useSearchOptions = (): SearchOptionsReturn => {
  const [year, setYear] = useState("2024");
  const [department, setDepartment] = useState("FI");
  const [grade, setGrade] = useState("3");
  const [semester, setSemester] = useState("前期");
  const [yearChecked, setYearChecked] = useState(false);
  const [departmentChecked, setDepartmentChecked] = useState(false);
  const [gradeChecked, setGradeChecked] = useState(false);
  const [semesterChecked, setSemesterChecked] = useState(false);
  const [searchText, setSearchText] = useState("");

  //初回レンダリング,ページのリロードで利用
  useEffect(() => {
    setYear(localStorage.getItem("year") || "2024");
    setDepartment(localStorage.getItem("department") || "FI");
    setGrade(localStorage.getItem("grade") || "3");
    setSemester(localStorage.getItem("semester") || "前期");
    setYearChecked(localStorage.getItem("yearChecked") === "true");
    setDepartmentChecked(localStorage.getItem("departmentChecked") === "true");
    setGradeChecked(localStorage.getItem("gradeChecked") === "true");
    setSemesterChecked(localStorage.getItem("semesterChecked") === "true");
    setSearchText(localStorage.getItem("searchText") || "");
  }, []);

  //ドロップダウン,検索ワード等をローカルストレージに保存
  useEffect(() => {
    localStorage.setItem("year", year);
    localStorage.setItem("department", department);
    localStorage.setItem("grade", grade);
    localStorage.setItem("semester", semester);
    localStorage.setItem("yearChecked", yearChecked.toString());
    localStorage.setItem("departmentChecked", departmentChecked.toString());
    localStorage.setItem("gradeChecked", gradeChecked.toString());
    localStorage.setItem("semesterChecked", semesterChecked.toString());
    localStorage.setItem("searchText", searchText);
  }, [
    year,
    department,
    grade,
    semester,
    yearChecked,
    departmentChecked,
    gradeChecked,
    semesterChecked,
    searchText,
  ]);

  //チェックボックスのチェックを外す処理
  const handleClear = useCallback(() => {
    setYearChecked(false);
    setDepartmentChecked(false);
    setGradeChecked(false);
    setSemesterChecked(false);
  }, []);

  return {
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
    searchText,
    setSearchText,
    handleClear,
  };
};
